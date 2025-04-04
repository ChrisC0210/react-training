import { useEffect, useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'; // 引入 bootstrap
// import '@/styles/all.scss'; // 引入自訂的 scss 檔案
import Login from '../components/Login/Login';
import Product from '../components/Product/Product';
// import Navbar from '../components/Navbar';
import Toast from '../components/Toast';
import { Link } from 'react-router-dom';

// 添加全局配置
axios.defaults.withCredentials = true;

function Admin() {
  //定義 API 網址和路徑
  const BASE_URL = import.meta.env.VITE_BASE_URL; // 從 .env 取得 API 網址
  // const API_PATH = import.meta.env.VITE_API_PATH; // 從 .env 取得 API 路徑

  const [isAuth, setIsAuth] = useState(false); // 是否登入
  // const [account, setAccount] = useState({
  //   username: '',
  //   password: ''
  // })

  useEffect(() => {
    const checkUserLogin = async () => {
      try {
        await axios.post(`${BASE_URL}/v2/api/user/check`);
        // alert("使用者已登入");
        // getProducts();
        setIsAuth(true);
      } catch (error) {
        console.error(error);
        setIsAuth(false);
      }
    };
    const token = document.cookie.replace(
      /(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/,
      "$1",
    );
    axios.defaults.headers.common['Authorization'] = token;
    checkUserLogin();
  }, [BASE_URL]);

  // 登入
  const handleLogin = (username: string, password: string) => {
    // console.log({ username, password })
    // Update to use the BASE_URL constant
    axios.post(`${BASE_URL}/v2/admin/signin`, { username, password })
      .then((res: AxiosResponse) => {
        const { token, expired } = res.data; //解構賦值
        // console.log(token, expired) // 顯示 token 和 expired
        // 添加 SameSite 和 Secure 屬性
        // 設定 cookie
        document.cookie = `hexToken=${token}; expires=${new Date(expired)}; path=/; SameSite=None; Secure`;
        axios.defaults.headers.common['Authorization'] = token;

        if (res.data.success === true) {
          alert('登入成功');
          // window.location.href = '/';
          // getProducts(); // 取得產品列表
          setIsAuth(true);// 登入成功
        }
      })
      .catch((error) => {
        console.error(error);
        alert('登入失敗');
        setIsAuth(false);// 登入失敗

      });
  }
  return (
    <>
      {/* <Navbar 
      isAuth={isAuth} 
      onLogout={() => setIsAuth(false)} 
    /> */}
      <Toast />
      {isAuth ? (
        <>
          {/* 已登入狀態下，顯示「前往優惠券管理」連結 */}
          <div className="container my-3">
            <Link to="/admin/coupon" className="btn btn-outline-primary me-2">
              優惠券管理
            </Link>
            {/* 前往後台訂單管理 */}
            <Link to="/admin/order" className="btn btn-outline-primary me-2">
              訂單管理
            </Link>
          </div>

          {/* 已登入則顯示產品管理頁 (Product) */}
          <Product
            isAuth={isAuth}
            token={axios.defaults.headers.common['Authorization'] as string}
          />
        </>
      ) : (
        // 尚未登入就顯示登入畫面
        <Login handleLogin={handleLogin} />
      )}
    </>
  )
}

export default Admin;
