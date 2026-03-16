## Admin APIs – Payments, Earnings & Analytics

Base URL: `http://<HOST>:<PORT>/api/v1`

All admin endpoints require:
- **Auth** header: `Authorization: Bearer <admin_jwt>`
- User must have **ADMIN** role in `Users.role`.

---

## 1. Unified Earnings Analytics (Existing)

### GET `/analytics/earnings`

**Description (Weekly / Monthly / Yearly earnings):**  
High‑level admin earnings analytics using **legacy commission logic**, grouped by **time period**.  
This is what you use for **weekly / monthly / yearly charts per module**:

- `hotelBooking` ⇒ hotel/accommodation earnings (admin commission).
- `carRide` ⇒ ride module earnings.
- `restaurantOrder` ⇒ restaurant/food module earnings.

**Auth:** Admin only.

**Query params:**
- `period` (optional): `"weekly" | "monthly" | "yearly"` (default: `"monthly"`)

**Response (200):**
- `period`: the effective period.
- `summary`:
  - `hotelBooking`: **total admin commission** from hotel bookings in this period.
  - `carRide`: **total admin commission** from rides in this period.
  - `restaurantOrder`: **total admin commission** from restaurant/food orders in this period.
  - `total`: sum of all three.
- `pieChartData`: ready‑to‑use for Recharts PieChart (breakdown by module for the full range).
- `barChartData`: ready‑to‑use for Recharts BarChart (one row per week/month/year, with:
  - `hotelBooking`
  - `carRide`
  - `restaurantOrder`
  - `total`)

> **Use‑case cheat sheet**
> - **Admin wants: “last 12 months earnings by Hotel / Ride / Restaurant”** → call  
>   `GET /analytics/earnings?period=monthly` and render `barChartData`.
> - **Admin wants: “weekly trend for each module”** → `period=weekly`, again use `barChartData`.

### GET `/analytics/users-stats`

**Description:**  
Admin user registration stats (weekly, monthly, yearly) for charts.

**Auth:** Admin only.

**Response (200):**
- `weekly[]`, `monthly[]`, `yearly[]` – each item:
  - `label`: e.g. `"Mon"` or `"Jan 2026"` or `"2024"`.
  - `registered`: number of users registered.
  - `completed`: number of active users (`isActive = 1`).

---

## 2. Revenue from Unified `Payments` Table

These APIs use the new polymorphic `Payments` table:
- `payableType`: `"hotel_booking" | "ride" | "food_order"`
- `direction`: `"charge" | "payout"`
- `platformCommissionAmount`, `vendorAmount`, etc.

### GET `/analytics/revenue-summary`

**Description:**  
Total platform commission and gross revenue across all types (hotel, food, ride) in a date range.

**Auth:** Admin only.

**Query params:**
- `from` (optional): start date, `YYYY-MM-DD`
- `to` (optional): end date, `YYYY-MM-DD`

**Response (200):**
- `totalCommission`: sum of `platformCommissionAmount` for all successful `charge` payments.
- `totalGross`: sum of `amount` for all successful `charge` payments.
- `from` / `to`: echo effective date bounds (if provided).

### GET `/analytics/revenue-by-type`

**Description:**  
Commission breakdown by `payableType` (hotel bookings vs rides vs food orders).

**Auth:** Admin only.

**Query params:**
- `from` (optional): `YYYY-MM-DD`
- `to` (optional): `YYYY-MM-DD`

**Response (200):**
- `hotel_booking`: total commission from hotel bookings.
- `ride`: total commission from rides only.
- `food_order`: total commission from food orders only.
- `from` / `to`: effective date bounds.

### GET `/analytics/vendor/:vendorId`

**Description:**  
Per‑vendor earnings analytics using `Payments` (both charges and payouts).

**Auth:** Admin only.

**Path params:**
- `vendorId`: numeric vendor identifier.

**Response (200):**
- `vendorId`
- `totalGross`: sum of `amount` for successful `charge` payments where `vendorId` matches.
- `totalCommission`: sum of `platformCommissionAmount`.
- `totalNet`: sum of `vendorAmount`.
- `totalPayouts`: sum of payout `amount` (direction = `"payout"`).
- `pendingBalance`: `totalNet - totalPayouts`.

---

## 3. Vendor Earnings & Withdrawals (Vendor‑facing)

These are not admin‑only, but useful for admin to understand vendor flow.

### GET `/vendor/earnings/summary`

**Description:**  
For the authenticated vendor, returns combined earnings from:
- Hotel/restaurant owned by this user (`vendorId = userId`),
- Rides where this user is the cab vendor (`vendorId = CabVendor.id` mapped from `userId`).

**Auth:** Vendor (logged‑in user).

**Response (200):**
- `totalGross`
- `totalCommission`
- `totalNet`
- `totalPayouts`
- `pendingBalance`

### GET `/vendor/withdrawals`

**Description:**  
List all withdrawal requests created by the current vendor.

**Auth:** Vendor.

**Response (200):**  
Array of rows from `VendorWithdrawalRequests`:
- `id`
- `vendorId`
- `requestedAmount`
- `currency`
- `status` (`pending | approved | rejected`)
- `adminNotes`
- `createdAt`, `updatedAt`

### POST `/vendor/withdrawals/request`

**Description:**  
Create a new withdrawal request. For now this is **virtual** only (no real payout via Stripe/bank).

**Auth:** Vendor.

**Body (JSON):**
- `requestedAmount` (number, required): must be `> 0` and `<= pendingBalance`.
- `currency` (string, optional): default `"NGN"`.

**Behavior:**
- Validates `requestedAmount` against current `pendingBalance`.
- Inserts a `VendorWithdrawalRequest` row with `status = "pending"`.

**Response (201):**
- Created request row (plain object).

---

## 4. Notes on Commission Logic

- Global platform commission is controlled via:
  - `PLATFORM_COMMISSION_RATE` in `src/constant.ts` (default `0.01` = 1%).
- For each successful **charge**:
  - `platformCommissionAmount = amount * PLATFORM_COMMISSION_RATE`
  - `vendorAmount = amount - platformCommissionAmount`
  - Money actually goes to **platform Stripe account** only (no automatic vendor payouts yet).
- Vendor withdrawals are **manual**:
  - Admin can pay vendor offline (bank transfer etc.).
  - Later we can add an admin API to:
    - mark withdrawal as `approved`,
    - create a `Payments` row with `direction = "payout"` and `paymentProvider = "manual"` or `"stripe"`.

