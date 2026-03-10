import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "../globals.css";
import "../responsive2.css";

export const metadata = {
  title: "Login - Trip Nxt",
  description: "",
};

export default function AuthLayout({ children }) {
  return (
    <html lang="en">
      <body cz-shortcut-listen="true">
        <div className="d-flex" style={{ height:"100vh" }}>
            {children}
        </div>
      </body>
    </html>
  );
}
