import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div>
      {/* Hero 區塊 */}
      <section className="bg-light text-center py-5">
        <h1 className="display-4 fw-bold">歡迎來到 Cat's Store</h1>
        <p className="lead">為您的毛孩子挑選最棒的商品</p>
        <Link to="/products" className="btn btn-primary btn-lg mt-3">立即選購</Link>
      </section>

      {/* 熱門分類 */}
      <section className="container my-5">
        <h2 className="text-center mb-4">熱門分類</h2>
        <div className="row text-center">
          <div className="col-md-4 mb-3">
            <div className="card p-3">
              <h5>貓咪飼料</h5>
            </div>
          </div>
          <div className="col-md-4 mb-3">
            <div className="card p-3">
              <h5>玩具 & 配件</h5>
            </div>
          </div>
          <div className="col-md-4 mb-3">
            <div className="card p-3">
              <h5>貓砂用品</h5>
            </div>
          </div>
        </div>
      </section>

      {/* 推薦產品 */}
      <section className="bg-light py-5">
        <div className="container">
          <h2 className="text-center mb-4">精選推薦</h2>
          <div className="row text-center">
            <div className="col-md-4 mb-3">
              <div className="card p-3">
                <h5>超人氣貓糧</h5>
                <Link to="/products" className="btn btn-outline-primary mt-2">查看產品</Link>
              </div>
            </div>
            <div className="col-md-4 mb-3">
              <div className="card p-3">
                <h5>智能貓砂盆</h5>
                <Link to="/products" className="btn btn-outline-primary mt-2">查看產品</Link>
              </div>
            </div>
            <div className="col-md-4 mb-3">
              <div className="card p-3">
                <h5>逗貓神器</h5>
                <Link to="/products" className="btn btn-outline-primary mt-2">查看產品</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 關於我們 */}
      <section className="container my-5">
        <h2 className="text-center mb-4">關於我們</h2>
        <p className="text-center">Cat's Store 致力於提供高品質、創新的貓咪用品，讓每一隻貓咪都能擁有幸福生活。</p>
      </section>

      {/* 聯絡我們 */}
      <section className="bg-dark text-white text-center py-5">
        <h2>聯絡我們</h2>
        <p>有任何問題歡迎來信：christinachen149@gmail.com</p>
      </section>
    </div>
  );
};

export default HomePage;
