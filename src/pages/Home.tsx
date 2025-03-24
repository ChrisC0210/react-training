import { Link } from "react-router-dom";
import { useEffect } from "react";

export default function Home() {
	// 增加滾動進場動畫效果
	useEffect(() => {
		// 簡單動畫效果，當元素進入視窗時添加動畫
		const observer = new IntersectionObserver((entries) => {
			entries.forEach(entry => {
				if (entry.isIntersecting) {
					entry.target.classList.add('animate__animated', 'animate__fadeIn');
					((entry.target) as HTMLElement).style.opacity = "1";
				}
			});
		}, {
			threshold: 0.1
		});

		document.querySelectorAll('.animate-on-scroll').forEach(el => {
			((el) as HTMLElement).style.opacity = "0";
			observer.observe(el);
		});

		return () => observer.disconnect();
	}, []);

	return (
		<div className="shopping-home">
			{/* Hero 區塊 */}
			<div className="hero-banner py-5" style={{
				background: "linear-gradient(135deg, #fdfcfb 0%, #e2d1c3 100%)",
				boxShadow: "inset 0 0 100px rgba(0,0,0,0.05)"
			}}>
				<div className="container py-4">
					<div className="row align-items-center">
						<div className="col-md-6">
							<h1 className="display-4 fw-bold" style={{
								color: "#5a3e36",
								textShadow: "1px 1px 2px rgba(0,0,0,0.1)"
							}}>歡迎光臨 Cat's Store</h1>
							<p className="lead" style={{ color: "#5a3e36" }}>
								為您與愛貓量身打造的專屬好物，立即探索精彩商品！
							</p>
							<Link to="/products" className="btn btn-lg rounded-pill shadow-sm" style={{
								background: "#f79329",
								color: "white",
								padding: "0.8rem 2rem",
								transition: "all 0.3s ease",
								border: "none"
							}} onMouseOver={(e) => e.currentTarget.style.background = "#ff8300"}
								onMouseOut={(e) => e.currentTarget.style.background = "#f79329"}>
								立即選購 <i className="bi bi-arrow-right ms-2"></i>
							</Link>
						</div>
						<div className="col-md-6">
							<img
								src="https://images.unsplash.com/photo-1592194996308-7b43878e84a6?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
								alt="愛貓"
								className="img-fluid rounded shadow"
								style={{ transform: "scale(1.05)" }}
							/>
						</div>
					</div>
				</div>
			</div>

			{/* 商品分類 區塊 */}
			<div className="categories-section py-5 animate-on-scroll">
				<div className="container">
					<h2 className="text-center mb-4 fw-bold section-title" style={{ color: "#5a3e36" }}>依分類選購</h2>
					<div className="row">
						{[
							{ name: "貓糧", image: "https://images.unsplash.com/photo-1601758003122-43d6ea36eec6?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80" },
							{ name: "玩具", image: "https://images.unsplash.com/photo-1598511728310-d2439fa99599?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80" },
							{ name: "貓窩", image: "https://images.unsplash.com/photo-1576725487018-3cebce9d768b?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80" },
							{ name: "保健", image: "https://images.unsplash.com/photo-1605296867304-46d5465a13f1?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80" },
							{ name: "配件", image: "https://images.unsplash.com/photo-1583336669672-22bbfb8a3b4a?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80" }
						].map((category) => (
							<div key={category.name} className="col-6 col-md-4 col-lg-2 mb-4">
								<div className="card category-card h-100 border-0 shadow-sm transition-hover">
									<img src={category.image} className="card-img-top" alt={category.name} height="150" style={{ objectFit: "cover" }} />
									<div className="card-body text-center">
										<h5 className="card-title">{category.name}</h5>
										<Link to="/products" className="btn btn-sm btn-outline-primary rounded-pill">
											逛逛
										</Link>
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>

			{/* 精選商品 區塊 */}
			<div className="featured-products py-5 animate-on-scroll" style={{ background: "#f8f9fa" }}>
				<div className="container">
					<h2 className="text-center mb-4 fw-bold section-title" style={{ color: "#5a3e36" }}>精選商品</h2>
					<div className="row">
						{[
							{ id: 1, name: "高級貓糧", price: 299, image: "https://images.unsplash.com/photo-1601758123927-5ba12a0a18ad?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80" },
							{ id: 2, name: "互動玩具", price: 199, image: "https://images.unsplash.com/photo-1573497491208-6b1acb260507?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80" },
							{ id: 3, name: "舒睡貓窩", price: 399, image: "https://images.unsplash.com/photo-1611415510929-2a1d3fbd36b7?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80" },
							{ id: 4, name: "貓抓板", price: 149, image: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80" }
						].map((product) => (
							<div key={product.id} className="col-6 col-md-3 mb-4">
								<div className="card product-card h-100 border-0 shadow-sm">
									<div className="position-relative">
										<img src={product.image} className="card-img-top" alt={product.name} height="200" style={{ objectFit: "cover" }} />
										<div className="position-absolute top-0 end-0 m-2">
											<span className="badge bg-primary rounded-pill">新品</span>
										</div>
									</div>
									<div className="card-body">
										<h5 className="card-title">{product.name}</h5>
										<p className="card-text text-primary fw-bold">${product.price}</p>
										<div className="d-flex justify-content-between">
											<Link to="/products" className="btn btn-sm btn-outline-primary rounded-pill">
												加入購物車
											</Link>
											<Link to="/products" className="btn btn-sm btn-outline-secondary rounded-pill">
												了解更多
											</Link>
										</div>
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>

			{/* 特惠活動 區塊 */}
			<div className="special-offers py-5 animate-on-scroll">
				<div className="container">
					<div className="row">
						<div className="col-12 col-md-6 mb-4">
							<div className="card border-0 rounded shadow overflow-hidden">
								<img
									src="https://images.unsplash.com/photo-1587560699334-1d450ebb52bd?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
									className="card-img"
									alt="特惠活動"
								/>
								<div
									className="card-img-overlay d-flex flex-column justify-content-end"
									style={{ background: "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0) 70%)" }}
								>
									<h3 className="card-title text-white">特惠活動</h3>
									<p className="card-text text-white">高級貓糧限時5折優惠！</p>
									<Link to="/products" className="btn btn-light rounded-pill shadow-sm">
										立即搶購
									</Link>
								</div>
							</div>
						</div>
						<div className="col-12 col-md-6 mb-4">
							<div className="card border-0 rounded shadow overflow-hidden">
								<img
									src="https://images.unsplash.com/photo-1611095973514-e3c6b43a9c6d?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
									className="card-img"
									alt="最新上架"
								/>
								<div
									className="card-img-overlay d-flex flex-column justify-content-end"
									style={{ background: "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0) 70%)" }}
								>
									<h3 className="card-title text-white">最新上架</h3>
									<p className="card-text text-white">探索最新貓咪玩具系列</p>
									<Link to="/products" className="btn btn-light rounded-pill shadow-sm">
										查看詳情
									</Link>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* 客戶好評 區塊 */}
			<div className="customer-reviews py-5 animate-on-scroll" style={{ background: "#f8f9fa" }}>
				<div className="container">
					<h2 className="text-center mb-4 fw-bold section-title" style={{ color: "#5a3e36" }}>客戶好評</h2>
					<div className="row">
						{[
							{ name: "小王", comment: "這裡的貓糧品質優良，我家毛孩超愛！", rating: 5 },
							{ name: "阿美", comment: "貓抓板設計新穎，價格合理，很推薦！", rating: 4 },
							{ name: "志明", comment: "快速配送，服務滿意，下次還會再購！", rating: 5 }
						].map((review, idx) => (
							<div key={idx} className="col-12 col-md-4 mb-4">
								<div className="card border-0 shadow-sm h-100">
									<div className="card-body">
										<div className="mb-2">
											{[...Array(review.rating)].map((_, i) => (
												<i key={i} className="bi bi-star-fill text-warning me-1">★</i>
											))}
										</div>
										<p className="card-text">"{review.comment}"</p>
										<p className="card-text text-end fw-bold">— {review.name}</p>
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>

			{/* 訂閱電子報 區塊 */}
			<div className="newsletter py-5" style={{
				background: "linear-gradient(135deg, #ffe8cc 0%, #f7d9c4 100%)",
				boxShadow: "inset 0 0 50px rgba(0,0,0,0.03)"
			}}>
				<div className="container">
					<div className="row justify-content-center">
						<div className="col-md-8 text-center">
							<h3 className="fw-bold" style={{ color: "#5a3e36" }}>訂閱電子報</h3>
							<p className="text-muted">隨時掌握最新商品資訊與專屬優惠</p>
							<div className="input-group mb-3 shadow-sm">
								<input type="email" className="form-control form-control-lg border-0" placeholder="請輸入電子信箱" style={{ padding: "0.8rem 1.5rem" }} />
								<button className="btn px-4" type="button" style={{
									background: "#f79329",
									color: "white",
									border: "none"
								}}>
									訂閱
								</button>
							</div>
							<p className="small text-muted mt-2">我們保證只寄送與貓咪相關的資訊，不會有垃圾郵件！</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
