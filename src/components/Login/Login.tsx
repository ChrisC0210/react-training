import React, { useState } from 'react';

interface LoginProps {
  handleLogin: (username: string, password: string) => void;
}

const Login: React.FC<LoginProps> = ({ handleLogin }) => {
  const [account, setAccount] = useState({
    username: '',
    password: ''
  });

  // 監聽表單輸入
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAccount((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  // 提交登入
  const onSubmitLogin = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    handleLogin(account.username, account.password);
  };

  return (
    <section
      className="position-relative min-vh-100"
      style={{
        background: "linear-gradient(135deg, #ff7e5f 0%, #feb47b 100%)"
      }}
    >
      {/* SVG Wave 置底 */}
      <div
        className="position-absolute bottom-0 start-0 w-100 overflow-hidden"
        style={{ lineHeight: 0 }}
      >
        <svg
          style={{
            position: "relative",
            display: "block",
            width: "calc(100% + 1.3px)",
            height: "100px"
          }}
          preserveAspectRatio="none"
          viewBox="0 0 360 30"
        >
          <path
            d="M0,0 C60,20 300,0 360,20 V30 H0 Z"
            style={{ fill: "#fff" }}
          />
        </svg>
      </div>

      {/* 登入表單容器 */}
      <div className="d-flex flex-column justify-content-center align-items-center min-vh-100">
        <h1 className="mb-3 text-white fw-bold">請先登入</h1>

        {/* 半透明 / 玻璃感容器 */}
        <form
          className="d-flex flex-column gap-4 p-4 shadow rounded-3"
          style={{
            width: "min(90%, 400px)",
            background: "rgba(255, 255, 255, 0.2)",
            backdropFilter: "blur(8px)"
          }}
        >
          <div className="form-floating">
            <input
              type="email"
              className="form-control"
              id="username"
              placeholder="name@example.com"
              name="username"
              value={account.username}
              onChange={handleInputChange}
            />
            <label htmlFor="username">Email address</label>
          </div>

          <div className="form-floating">
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Password"
              name="password"
              value={account.password}
              onChange={handleInputChange}
            />
            <label htmlFor="password">Password</label>
          </div>

          <button
            className="btn btn-light fw-bold"
            onClick={onSubmitLogin}
          >
            登入
          </button>
        </form>
      </div>
    </section>
  );
};

export default Login;
