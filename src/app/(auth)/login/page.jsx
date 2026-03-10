"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import sidebarLogo from "@/app/(dashboard)/assets/images/sidebar-logo.png"
import { Outfit400, Outfit500, Outfit600 } from "@/fonts/index"

// Email    = admin@tripnxt.com
// Password = Abcd!234

export default function LoginPage() {
  const router = useRouter()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleLogin = (e) => {
    e.preventDefault()
    setLoading(true)

    // Simulate login delay
    setTimeout(() => {
      if (email === "admin@test.com" && password === "123456") {
        router.push("/dashboard")
      } else {
        alert("Invalid credentials")
        setLoading(false)
      }
    }, 500)
  }

  return (
    <>
      <div className="login-page-wrapper">
        <div className="login-container">
          {/* LOGIN LOGO */}
          <div className="brand-logo-column">
            <Link href="/">
              <Image 
                src={sidebarLogo}
                alt="Trip Nxt"
                className="brand-logo img-fluid"
                priority
              />
            </Link>
          </div>

          {/* LOGIN FORM */}
          <form onSubmit={handleLogin} className="login-form">
            <div className="form-group">
                <i className="fa-regular fa-envelope input-icon"></i>
                <input
                  type="email"
                  id="email"
                  className={`form-control login-input ${Outfit400.className}`}
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
            </div>

            <div className="form-group">
                <i className="fas fa-lock input-icon"></i>
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  className={`form-control login-input ${Outfit400.className}`}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <i className={`fa-regular ${showPassword ? "fa-eye-slash" : "fa-eye"}`}></i>
                </button>
            </div>

            {/* <div className="form-options">
              <div className="remember-me">
                <input type="checkbox" id="remember" />
                <label htmlFor="remember" className={`${Outfit400.className}`}>Remember me</label>
              </div>
              <Link href="/forgot-password" className={`forgot-link ${Outfit400.className}`}>
                Forgot password?
              </Link>
            </div> */}

            <button 
              type="submit" 
              className={`login-btn ${Outfit500.className}`}
              disabled={loading}
            >
              {loading ? (
                <span><i className="fa-solid fa-circle-notch fa-spin"></i> Signing in...</span>
              ) : (
                "Sign In"
              )}
            </button>
          </form>
        </div>
      </div>
    </>
  )
}
