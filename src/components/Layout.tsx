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
      <div className="bg-body-tertiary">
        <nav className="navbar navbar-expand-lg container">
          <div className="container-fluid">
            {/* <a className="navbar-brand fw-bold" href="https://chrisc0210.github.io/react-training/#/">REACT TRAINING</a> */}
            {/* <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button> */}
            {/* <div className="collapse navbar-collapse" id="navbarText"> */}
              <Navbar
                isAuth={isAuth}
                onLogout={() => setIsAuth(true)} // 登出後將 isAuth 設為 false
                cartCount={cartCount} // 將購物車數量傳遞給 Navbar
              />
              {/* <span className="navbar-text">
              LOGIN
            </span> */}
            {/* </div> */}
          </div>
        </nav>
        {/* TITLE */}
        <Toast />
        {/* <main>
        <section>
          <h1>Layout</h1>
        </section>
      </main> */}
      </div>
      <Outlet />
      <footer>
        <div className="container py-2">
          <p className="text-center">© 2025 React Training. All rights reserved.</p>
        </div>
      </footer>
    </>
  );
}

export default Layout;