import { Link } from 'react-router-dom';

const HomePage = () => {
	return (
		<div>
			{/* Hero 區塊 */}
			<section className="bg-light text-center py-4" style={{ backgroundImage: "url('https://storage.googleapis.com/vue-course-api.appspot.com/product-backend/1742749472222.jpg')", backgroundSize: "cover", backgroundPosition: "center", height: "350px" }}>
				<h1 className="display-4 mt-4 fw-bold text-gradient">歡迎來到 Cat's Store</h1>
				<p className="lead fw-bold text-gradient-blue text-shadow">為您的毛孩選最棒的商品</p>
				<Link to="/products" className="btn btn-warning btn-lg mt-3">立即選購</Link>
			</section>

			{/* 熱門分類 */}
			<section className="container my-5">
				<h2 className="text-center mb-4 fw-bold text-gradient">熱門分類</h2>
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
					<h2 className="text-center mb-4 fw-bold text-gradient">精選推薦</h2>
					<div className="row text-center">
						<div className="col-md-4 mb-3">
							<div className="card p-3">
								<h5>超人氣貓糧</h5>
								<Link to="/products/-OM4pQo1-CnRBAkPN-MB" className="btn btn-outline-primary mt-2">查看產品</Link>
							</div>
						</div>
						<div className="col-md-4 mb-3">
							<div className="card p-3">
								<h5>智能貓砂盆</h5>
								<Link to="/products/-OM4go69eEB8pIw41URw" className="btn btn-outline-primary mt-2">查看產品</Link>
							</div>
						</div>
						<div className="col-md-4 mb-3">
							<div className="card p-3">
								<h5>逗貓神器</h5>
								<Link to="/products/-OM4j8V33AwIShu1zABj" className="btn btn-outline-primary mt-2">查看產品</Link>
							</div>
						</div>
					</div>
				</div>
			</section>
			{/* 訂閱電子報 區塊 */}
			<div className="newsletter py-5" style={{ background: "#e9ecef" }}>
				<div className="container">
					<div className="row justify-content-center">
						<div className="col-md-8 text-center">
							<h3 className="fw-bold" style={{ color: "#5a3e36" }}>訂閱電子報</h3>
							<p className="text-muted">隨時掌握最新商品資訊與專屬優惠</p>
							<div className="input-group mb-3 shadow-sm">
								<input type="email" className="form-control form-control-lg border-0" placeholder="請輸入電子信箱" />
								<button className="btn btn-primary" type="button">
									訂閱
								</button>
							</div>
							<p className="small text-muted mt-2">我們保證只寄送與貓咪相關的資訊，不會有垃圾郵件！</p>
						</div>
					</div>
				</div>
			</div>
			{/* 關於我們 */}
			<section className="container my-5 text-center">
				<h2 className="text-center mb-4 fw-bold text-gradient">關於我們</h2>
				<p className="text-center">Cat's Store 致力於提供高品質、創新的貓咪用品，讓每一隻貓咪都能擁有幸福生活。</p>
				<p className="text-center">我們的熱情和專業將為您提供最好的貓咪生活體驗。</p>
				<Link to="/about" className="btn btn-warning">了解更多</Link>
			</section>

			{/* 聯絡我們 */}
			<section className="bg-gradient-orange text-white text-center py-5">
				<h2 className="text-center mb-4 fw-bold">聯絡我們</h2>
				<p>電話: 02-1234-5678</p>
				<p className="text-center fw-bold">有任何問題歡迎來信：christinachen149@gmail.com</p>
			</section>
		</div>
	);
};

export default HomePage;
