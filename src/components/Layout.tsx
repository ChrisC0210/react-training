// layout page
import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar';
import Toast from './Toast';

const Layout: React.FC = () => {
  const [isAuth, setIsAuth] = useState(true); // 是否登入
  const [cartCount] = useState(0); // 新增購物車數量狀態
  return (
    <>
      <div style={{
        background: "linear-gradient(to right, #ffecd2 0%, #fcb69f 100%)",
        boxShadow: "0 2px 10px rgba(0,0,0,0.1)"
      }}>
        <Navbar
          isAuth={isAuth}
          onLogout={() => setIsAuth(false)} // 登出後將 isAuth 設為 false
          cartCount={cartCount} // 將購物車數量傳遞給 Navbar
        />
        <Toast />
      </div>
      <Outlet />
      <footer style={{
        background: "linear-gradient(to right, #5a3e36, #9c7a6b)",
        color: "white",
        padding: "2rem 0",
        marginTop: "3rem"
      }}>
        <div className="container">
          <div className="row">
            <div className="col-12 col-md-4 mb-4 text-center text-md-start">
              <h5 className="fw-bold mb-3">Cat's Store</h5>
              <p>為您的貓咪提供最優質的商品和服務</p>
              <div className="d-flex justify-content-center justify-content-md-start">
                <a href="#" className="me-3 text-white fs-5"><i className="bi bi-facebook"></i></a>
                <a href="#" className="me-3 text-white fs-5"><i className="bi bi-instagram"></i></a>
                <a href="#" className="text-white fs-5"><i className="bi bi-line"></i></a>
              </div>
            </div>
            <div className="col-12 col-md-4 mb-4 text-center text-md-start">
              <h5 className="fw-bold mb-3">聯絡資訊</h5>
              <p><i className="bi bi-geo-alt me-2"></i>台北市貓貓區喵喵路88號</p>
              <p><i className="bi bi-telephone me-2"></i>(02) 1234-5678</p>
              <p><i className="bi bi-envelope me-2"></i>service@catsstore.com</p>
            </div>
            <div className="col-12 col-md-4 mb-4 text-center text-md-start">
              <h5 className="fw-bold mb-3">營業時間</h5>
              <p>週一至週五: 10:00 - 21:00</p>
              <p>週六至週日: 11:00 - 22:00</p>
            </div>
          </div>
          <hr className="mt-4 mb-4" style={{ borderColor: "rgba(255,255,255,0.2)" }} />
          <p className="text-center mb-0">© 2025 Cat's Store. All Rights Reserved.</p>
        </div>
      </footer>
    </>
  );
}

export default Layout;