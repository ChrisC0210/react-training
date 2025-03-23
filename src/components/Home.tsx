import { FC } from 'react'

const Home: FC = () => {
	return (
		<div className="shopping-home">
			{/* Hero Banner */}
			<div className="hero-banner">
				<div className="container">
					<div className="row align-items-center">
						<div className="col-md-6">
							<h1 className="display-4">Summer Collection 2023</h1>
							<p className="lead">Discover the latest trends and exclusive deals on our newest arrivals.</p>
							<button className="btn btn-primary btn-lg">Shop Now</button>
						</div>
						<div className="col-md-6">
							<img src="https://via.placeholder.com/600x400" alt="Summer Collection" className="img-fluid rounded" />
						</div>
					</div>
				</div>
			</div>

			{/* Categories Section */}
			<div className="categories-section py-5">
				<div className="container">
					<h2 className="text-center mb-4">Shop by Category</h2>
					<div className="row">
						{['Men', 'Women', 'Kids', 'Accessories', 'Home'].map((category) => (
							<div key={category} className="col-6 col-md-4 col-lg-2 mb-4">
								<div className="card category-card">
									<div className="card-body text-center">
										<h5 className="card-title">{category}</h5>
										<a href="#" className="stretched-link"></a>
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>

			{/* Featured Products */}
			<div className="featured-products py-5 bg-light">
				<div className="container">
					<h2 className="text-center mb-4">Featured Products</h2>
					<div className="row">
						{[1, 2, 3, 4].map((product) => (
							<div key={product} className="col-md-3 mb-4">
								<div className="card product-card h-100">
									<img src={`https://via.placeholder.com/300x300?text=Product${product}`} className="card-img-top" alt={`Product ${product}`} />
									<div className="card-body">
										<h5 className="card-title">Product Name</h5>
										<p className="card-text text-muted">$99.99</p>
										<div className="d-flex justify-content-between">
											<button className="btn btn-sm btn-outline-primary">Add to Cart</button>
											<button className="btn btn-sm btn-outline-secondary">Details</button>
										</div>
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>

			{/* Special Offers */}
			<div className="special-offers py-5">
				<div className="container">
					<div className="row">
						<div className="col-md-6 mb-4">
							<div className="card bg-dark text-white">
								<img src="https://via.placeholder.com/600x300?text=Special+Offer" className="card-img" alt="Special Offer" />
								<div className="card-img-overlay d-flex flex-column justify-content-end">
									<h3 className="card-title">Special Offer</h3>
									<p className="card-text">Get up to 50% off on selected items</p>
									<button className="btn btn-light align-self-start">Shop Now</button>
								</div>
							</div>
						</div>
						<div className="col-md-6 mb-4">
							<div className="card bg-dark text-white">
								<img src="https://via.placeholder.com/600x300?text=New+Arrivals" className="card-img" alt="New Arrivals" />
								<div className="card-img-overlay d-flex flex-column justify-content-end">
									<h3 className="card-title">New Arrivals</h3>
									<p className="card-text">Check out our latest collection</p>
									<button className="btn btn-light align-self-start">Explore</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Newsletter */}
			<div className="newsletter py-5 bg-light">
				<div className="container">
					<div className="row justify-content-center">
						<div className="col-md-8 text-center">
							<h3>Subscribe to Our Newsletter</h3>
							<p className="text-muted">Stay updated with our latest offers and products</p>
							<div className="input-group mb-3">
								<input type="email" className="form-control" placeholder="Enter your email" />
								<button className="btn btn-primary" type="button">Subscribe</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Home;