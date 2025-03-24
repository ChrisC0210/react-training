import { Link, NavLink } from "react-router-dom";
import axios from "axios";
import { Collapse } from "bootstrap";

// 新增 cartCount 屬性，預設為 0
interface NavbarProps {
  isAuth?: boolean;
  onLogout?: () => void;
  cartCount?: number;  // 新增購物車數量
}

const Navbar: React.FC<NavbarProps> = ({ isAuth, onLogout, cartCount = 0 }) => {
  const handleLogout = async () => {
    try {
      const BASE_URL = import.meta.env.VITE_BASE_URL;
      await axios.post(`${BASE_URL}/v2/logout`, {}, { withCredentials: true });

      document.cookie = "hexToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      axios.defaults.headers.common['Authorization'] = '';

      if (onLogout) onLogout();
      alert('登出成功');
      window.location.href = 'https://chrisc0210.github.io/react-training/#/';
    } catch (error) {
      console.error('登出失敗', error);
      alert('登出失敗');
    }
  };
  const handleToggle = () => {
    const collapseElement = document.getElementById("navbarNav");
    if (collapseElement) {
      let bsCollapse = Collapse.getInstance(collapseElement);
      if (!bsCollapse) {
        bsCollapse = new Collapse(collapseElement, { toggle: false });
      }
      bsCollapse.toggle();
    }
  };
  
  return (
    <nav className="navbar navbar-expand-lg py-2"
    >
      <div className="container">
        <Link className="navbar-brand" to="/" style={{
          display: "flex",
          alignItems: "center",
          transition: "transform 0.3s ease"
        }} onMouseOver={(e) => e.currentTarget.style.transform = "scale(1.05)"}
          onMouseOut={(e) => e.currentTarget.style.transform = "scale(1)"}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 128 128"><path fill="#2f2f2f" d="M74.92 113.83s-5.7-.45-5.93-3.79l-3.24-9.41l14.09-13.1s10.33-.2 10.92-.2c.6 0 3.37 13.3 3.37 13.3l-4.96 8.14z" /><path fill="#f79329" d="M75.03 53.73c.31 2.76.9 5.17 2.83 7.2c1.55 1.62 3.17 3 4.6 4.73c4.12 4.99 11.06 6.71 15.32 11.94c2.84 3.49 4.77 7.77 5.75 12.11c1.1 4.88 1.78 10.27.42 15.07c-1.87 6.58-7.62 7.38-13.63 8.29c-2.76.42-5.57.66-8.37.74c-2.23.06-4.81.34-7.04.03c-1.95-.28-2.32-2.92-1.79-4.47c.56-1.67 2.24-2.3 3.81-2.6c.77-.15 1.58.07 2.36-.06c1.45-.23 2.06-1.18 2.09-2.63c.03-1.98.71-3.63 1.62-5.36c.41-.78 1.1-1.47 1.76-2.06c.67-.62 1.83-1.47 1.19-2.55c-1.1-1.88-4.44-.15-5.57.66c-1.75 1.24-2.99 3.12-3.53 5.19c-.77 2.87-1.36 3.06-4.04 4.08c-1.58.61-3.04 1.62-3.64 3.19c-.73 1.95.49 4.25-.77 5.95c-.99 1.36-2.91 2.11-4.67 2.04c-4.54-.2-7.58-1.31-6.63-5.93c.6-2.9.41-6.08.59-9.09c.06-1.13.17-2.86-.96-3.65c-.44-.32-1.05-.37-1.56-.34c-.35.01-1.23-.04-1.56.07c-.97.31-.74 1.87-.73 2.69c.01 1.58-.02 3.19-.06 4.75c-.04 1.85.16 3.68.18 5.51c.01 1.2.12 2.68-.87 3.53c-1.13 1-2.86 1.22-4.4 1.27c-1.85.07-3.96-.07-5.5-1.15c-3.15-2.22-2.08-7.31-1.79-10.28c.19-1.93.05-3.94 0-5.92c-.04-1.78-.09-3.57-.13-5.37c-.02-.74-.12-1.54-.08-2.3c.15-2.1-.28-4.25-.34-6.43c-.1-4-.31-8.07-.31-12.14c0-1.74.3-3.65.8-5.3c.27-.88.56-2.06 1.03-2.83c.74-1.23 2.02-2.33 3.09-3.29c1.38-1.23 3.02-1.85 4.6-2.8c2.05-1.24 4.19-2.41 6.41-3.36c3.9-1.66 8.07-3.08 12.43-3.24c1.53-.06 2.68-.3 4.16-.64c1.49-.34 2.23.66 2.5 2.06c.23.87.33 1.78.43 2.69m-15.9-28.8s-2.13-2.61-7.09-9.78C48.98 10.71 39.33-1.79 34.45.8c-7.53 3.98-6.69 32.18-6.69 32.18zm3.16.34s2.63-2.1 8.97-8.1c3.93-3.7 15.96-13.91 20.2-10.38c6.54 5.46-.15 32.87-.15 32.87z" /><defs><path id="notoV1Cat0" d="M95.31 51.88c.33-8.71-3.73-18.15-10.88-24.49c-5.78-5.14-14.36-8.35-22.99-9.24c-8.63-.92-17.68.44-24.4 4.25c-8.32 4.72-14.24 13.1-15.74 21.7c-1.42 8.16-.62 16.61 6.43 23.13c3.91 3.61 8.96 6.32 14.28 8.05c2.02.66 7.26 2.25 12.85 2.84c5.61.59 11.57.18 13.69-.05c5.56-.59 11.07-2.18 15.64-4.89c8.27-4.92 10.81-13.02 11.12-21.3" /></defs><use fill="#f79329" href="#notoV1Cat0" /><g fill="#2f2f2f"><path d="M45.82 48.62c-.34 3.21-2.93 5.57-5.78 5.27s-4.9-3.14-4.56-6.36s2.93-5.58 5.78-5.28c2.85.31 4.89 3.15 4.56 6.37m24.05 2.53c-.34 3.21 1.7 6.06 4.55 6.36s5.44-2.06 5.78-5.27c.34-3.22-1.7-6.07-4.55-6.37c-2.86-.29-5.44 2.06-5.78 5.28M56.72 64.69c-.05 0-.11 0-.16-.01c-.85-.09-1.47-.85-1.38-1.71l.6-5.71c.09-.85.86-1.43 1.71-1.38c.85.09 1.47.85 1.38 1.71l-.6 5.7c-.09.8-.76 1.4-1.55 1.4" /><path d="M52.19 68.42c-1.57-.01-3.15-.49-4.3-1.37c-.91-.7-2.36-2.82-.87-3.63c.24-.13.51-.2.78-.23c.43-.06.78.05 1.14.32c.58.43 1.07 1.2 1.79 1.34c2.25.46 4.19-.69 4.73-2.95c.14-.61.19-.9.91-.97c1.75-.16 2.17 2.04 1.69 3.35c-.43 1.17-.99 2.43-2.08 3.13c-1.12.71-2.47 1.02-3.79 1.01" /><path d="M60.38 69.16c1.55.28 3.19.09 4.49-.56c1.02-.53 2.84-2.34 1.52-3.41c-.83-.67-1.56-.4-2.37.12c-2.06 1.33-4.88.39-5.57-2.01c-.15-.55.06-1.42-.19-1.91c-.12-.23-.31-.18-.59-.28c-.19-.07-.31-.15-.52-.16c-.97-.06-1.53.98-1.68 1.8c-.08.44-.17.81-.1 1.25c.21 1.24.53 2.57 1.48 3.46c.96.92 2.23 1.46 3.53 1.7" /><path d="M52 57.63c-.03 1.07.58 2.25 1.61 3.05c.84.65 2.08 1.07 3.31 1.19c1.23.13 2.53-.02 3.48-.47c1.18-.57 2.02-1.59 2.21-2.65c.19-1 .06-2.06-.97-2.88c-.56-.46-1.29-.8-2.06-1.02c-.28-.09-1.04-.3-1.84-.38c-.81-.09-1.66-.05-1.96-.02c-.79.06-1.58.25-2.23.57c-1.17.59-1.52 1.58-1.55 2.61" /></g><path fill="#f79329" d="M97.64 99.25c1.22-.81 2.5-.45 3.86-.29c5.86.68 12.5 5.82 12.74 11.94c.29 7.86-6.7 13.54-13.66 15.41c-5.07 1.36-10.56 1.36-15.78 1.15c-2.28-.09-6.4.29-8.41-.99c-.72-.45-1.35-1.39-1.68-2.16c-1.21-2.81 1.23-4.77 3.84-4.76c1.9.01 3.8.04 5.71.02c4.16-.03 8.34.28 12.45-.54c3.74-.74 9.22-3.67 8.99-8.23c-.17-3.35-3.89-4.01-6.57-4.41c-.68-.1-1.35-.32-2.13-.34c-1.53-.04-1.46-1.48-1.35-2.6c.16-1.59.41-2.92 1.74-4.01c.05-.06.15-.13.25-.19M23.75 49.72q-.15 0-.3-.03l-8.22-1.61c-.84-.16-1.39-.98-1.22-1.82c.16-.84 1-1.4 1.82-1.22l8.22 1.62c.84.16 1.39.98 1.22 1.81c-.15.73-.8 1.25-1.52 1.25m-8.45 6.3c-.77 0-1.43-.57-1.53-1.35c-.12-.85.48-1.62 1.33-1.74l8.31-1.09c.83-.12 1.62.48 1.74 1.33c.11.85-.49 1.63-1.33 1.74L15.51 56c-.07.02-.13.02-.21.02m2.45 7c-.67 0-1.29-.44-1.49-1.13c-.24-.82.24-1.67 1.07-1.91l8.05-2.3c.82-.23 1.68.24 1.92 1.07c.23.82-.24 1.68-1.07 1.91l-8.05 2.3c-.15.04-.29.06-.43.06m73.96-7.31c-.78 0-1.45-.59-1.54-1.38a1.55 1.55 0 0 1 1.37-1.71l8.33-.93c.83-.07 1.62.52 1.71 1.37c.1.86-.52 1.62-1.37 1.71l-8.33.93c-.06 0-.12.01-.17.01m7.88 6.99c-.11 0-.22-.01-.34-.04l-8.18-1.79a1.55 1.55 0 0 1-1.18-1.84c.19-.83 1.01-1.36 1.84-1.18l8.19 1.79c.83.18 1.37 1.01 1.18 1.84c-.15.72-.8 1.22-1.51 1.22m-3.01 6.76c-.18 0-.37-.03-.55-.1L88.2 66.4c-.8-.3-1.21-1.2-.9-2c.3-.8 1.2-1.2 2-.9l7.84 2.96c.8.31 1.2 1.2.9 2c-.24.62-.83 1-1.46 1" /><path fill="#fcd4b5" d="M36 12.52c-.73 1.9-2.2 7.37-1.28 11.26c.27 1.16 1.75 1.68 2.8 1.18c2.19-1.05 5.61-2.9 6.89-3.54c2.18-1.07 2.93-2.4 1.75-4.03c-1.5-2.08-5.24-6.39-7.45-6.81c-1.26-.24-2.23.71-2.71 1.94m51.6 5.26c.41 2 .93 7.63-.63 11.33c-.46 1.09-2.01 1.36-2.96.69c-1.98-1.4-5.03-3.8-6.2-4.64c-1.96-1.42-2.49-2.86-1.05-4.27c1.82-1.8 6.23-5.43 8.48-5.47c1.29-.03 2.1 1.07 2.36 2.36" /></svg>
          <span className="fw-bold ms-2" style={{
            color: "#5a3e36",
            fontSize: "1.4rem",
            letterSpacing: "0.5px",
            fontFamily: "'Noto Sans TC', sans-serif"
          }}>
            Cat's Store
          </span>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          // data-bs-toggle="collapse"
          // data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
          onClick={handleToggle}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-center">
            {/* 首頁 */}
            <li className="nav-item mx-1">
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? "nav-link active px-3 py-2 rounded-pill fw-medium"
                    : "nav-link px-3 py-2 rounded-pill fw-medium"
                }
                style={({ isActive }) => ({
                  background: isActive ? "#f79329" : "transparent",
                  color: isActive ? "white" : "#5a3e36",
                  transition: "all 0.3s ease",
                })}
                to="/"
              >
                首頁
              </NavLink>
            </li>

            {/* 產品頁 */}
            <li className="nav-item mx-1">
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? "nav-link active px-3 py-2 rounded-pill fw-medium"
                    : "nav-link px-3 py-2 rounded-pill fw-medium"
                }
                style={({ isActive }) => ({
                  background: isActive ? "#f79329" : "transparent",
                  color: isActive ? "white" : "#5a3e36",
                  transition: "all 0.3s ease",
                })}
                to="/products"
              >
                產品頁
              </NavLink>
            </li>

            {/* 購物車 (顯示數量徽章) */}
            <li className="nav-item position-relative mx-1">
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? "nav-link active px-3 py-2 rounded-pill fw-medium"
                    : "nav-link px-3 py-2 rounded-pill fw-medium"
                }
                style={({ isActive }) => ({
                  background: isActive ? "#f79329" : "transparent",
                  color: isActive ? "white" : "#5a3e36",
                  transition: "all 0.3s ease",
                })}
                to="/cart"
              >
                <i className="bi bi-cart me-1"></i>購物車
                {/* 若 cartCount > 0 時，顯示 badge */}
                {cartCount > 0 && (
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                    style={{ transform: "translate(-50%, -30%)" }}>
                    {cartCount}
                  </span>
                )}
              </NavLink>
            </li>

            {/* 關於我們 */}
            <li className="nav-item mx-1">
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? "nav-link active px-3 py-2 rounded-pill fw-medium"
                    : "nav-link px-3 py-2 rounded-pill fw-medium"
                }
                style={({ isActive }) => ({
                  background: isActive ? "#f79329" : "transparent",
                  color: isActive ? "white" : "#5a3e36",
                  transition: "all 0.3s ease",
                })}
                to="/about"
              >
                關於我們
              </NavLink>
            </li>
            {/* 後台登入 */}
            <li className="nav-item mx-1">
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? "nav-link active px-3 py-2 rounded-pill fw-medium"
                    : "nav-link px-3 py-2 rounded-pill fw-medium"
                }
                style={({ isActive }) => ({
                  background: isActive ? "#f79329" : "transparent",
                  color: isActive ? "white" : "#5a3e36",
                  transition: "all 0.3s ease",
                })}
                to="/Admin"
              >
                後台登入
              </NavLink>
            </li>

            {/* 已登入才顯示登出按鈕 */}
            {isAuth && (
              <li className="nav-item mx-1">
                <button
                  className="nav-link btn px-3 py-2 rounded-pill fw-medium"
                  style={{
                    background: "#5a3e36",
                    color: "white",
                    border: "none",
                    transition: "all 0.3s ease",
                  }}
                  onClick={handleLogout}
                  onMouseOver={(e) => e.currentTarget.style.background = "#7a5e56"}
                  onMouseOut={(e) => e.currentTarget.style.background = "#5a3e36"}
                >
                  <i className="bi bi-box-arrow-right me-1"></i>登出
                </button>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
