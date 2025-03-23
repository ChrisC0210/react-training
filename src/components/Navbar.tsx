import { Link, NavLink } from "react-router-dom";
import axios from "axios";

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
      window.location.href = '/';
    } catch (error) {
      console.error('登出失敗', error);
      alert('登出失敗');
    }
  };

  return (
    <nav className="container navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          Cat's Store
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            {/* 首頁 */}
            <li className="nav-item">
              <NavLink
                className={({ isActive }) =>
                  isActive ? "nav-link active" : "nav-link"
                }
                to="/"
              >
                首頁
              </NavLink>
            </li>

            {/* 產品頁 */}
            <li className="nav-item">
              <NavLink
                className={({ isActive }) =>
                  isActive ? "nav-link active" : "nav-link"
                }
                to="/products"
              >
                產品頁
              </NavLink>
            </li>

            {/* 購物車 (顯示數量徽章) */}
            <li className="nav-item position-relative">
              <NavLink
                className={({ isActive }) =>
                  isActive ? "nav-link active" : "nav-link"
                }
                to="/cart"
              >
                購物車
                {/* 若 cartCount > 0 時，顯示 badge */}
                {cartCount > 0 && (
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    {cartCount}
                  </span>
                )}
              </NavLink>
            </li>

            {/* 後台登入 */}
            <li className="nav-item">
              <NavLink
                className={({ isActive }) =>
                  isActive ? "nav-link active" : "nav-link"
                }
                to="/Admin"
              >
                後台登入
              </NavLink>
            </li>

            {/* 已登入才顯示登出按鈕 */}
            {isAuth && (
              <li className="nav-item">
                <button
                  className="nav-link btn btn-link"
                  onClick={handleLogout}
                >
                  登出
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
