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
				<h2 className="text-center mb-4 fw-bold text-gradient">
					<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-fire text-orange me-2" viewBox="0 0 16 16">
						<path d="M8 16c3.314 0 6-2 6-5.5 0-1.5-.5-4-2.5-6 .25 1.5-1.25 2-1.25 2C11 4 9 .5 6 0c.357 2 .5 4-2 6-1.25 1-2 2.729-2 4.5C2 14 4.686 16 8 16m0-1c-1.657 0-3-1-3-2.75 0-.75.25-2 1.25-3C6.125 10 7 10.5 7 10.5c-.375-1.25.5-3.25 2-3.5-.179 1-.25 2 1 3 .625.5 1 1.364 1 2.25C11 14 9.657 15 8 15" />
					</svg>
					熱門分類
					<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-fire text-orange me-2" viewBox="0 0 16 16">
						<path d="M8 16c3.314 0 6-2 6-5.5 0-1.5-.5-4-2.5-6 .25 1.5-1.25 2-1.25 2C11 4 9 .5 6 0c.357 2 .5 4-2 6-1.25 1-2 2.729-2 4.5C2 14 4.686 16 8 16m0-1c-1.657 0-3-1-3-2.75 0-.75.25-2 1.25-3C6.125 10 7 10.5 7 10.5c-.375-1.25.5-3.25 2-3.5-.179 1-.25 2 1 3 .625.5 1 1.364 1 2.25C11 14 9.657 15 8 15" />
					</svg>
				</h2>
				<div className="row text-center">
					<div className="col-md-4 mb-3">
						<Link to="/products" className="card p-3 text-decoration-none">
							<div>
								<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 512 512"><path fill="currentColor" d="M373.344 38.504c-.43.009-18.834 14.371-18.834 14.371l-28.965-5.792c-.212.06-24.143 22.862-24.143 22.862l-25.648-1.539l-15.46 16.824l-28.073-.722l-18.516 20.615l-25.371 2.928l-17.123 18.37l-27.215 8.95l-16.062 22.598l-23.72 6.224L91.21 184.67l-21.152 11.289l-7.401 21.78l-23.668 13.95l-3.076 23.899c14.712-5.336 28.468.705 38.951 8.4l25.725-15.97l34.922-5.55l30.017-27.085l45.21-5.291l32.97-29.707l32.682-8.178l20.254-26.588c10.445-5.84 25.525-9.99 38.857-15.558l9.799-24.895l28.314-10.77c.154-.168.32-.341.473-.51l3.082-18.761l20.486-15.564q.071-.185.139-.368L381.87 53.25zM256 207.496l-.705.004a864 864 0 0 1-8.63 5.045a852 852 0 0 1-24.214 13.402a1238 1238 0 0 1 33.549-.45c61.422 0 117.054 4.476 156.81 11.575c19.879 3.55 35.834 7.816 46.086 12.145c5.127 2.164 8.794 4.391 10.635 5.998c.795.693 1.053 1.042 1.23 1.281c-.177.24-.435.588-1.23 1.281c-1.84 1.607-5.508 3.834-10.635 5.998c-10.252 4.329-26.207 8.595-46.085 12.145c-39.757 7.1-95.39 11.576-156.811 11.576c-60.185 0-114.771-4.304-154.35-11.156c-1.062.294-2.148.61-3.197.89c-14.957 3.99-28.503 6.543-40.469 7.438c10.618 3.378 23.344 6.348 38.041 8.973c41.316 7.377 97.685 11.855 159.975 11.855s118.659-4.478 159.975-11.855c20.658-3.69 37.506-8.041 49.923-13.284c6.21-2.62 11.343-5.418 15.47-9.02c4.126-3.6 7.632-8.675 7.632-14.84c0-6.167-3.506-11.242-7.633-14.843c-4.126-3.6-9.26-6.398-15.469-9.02c-12.417-5.242-29.265-9.594-49.923-13.282c-41.316-7.378-97.685-11.856-159.975-11.856m224 80.926c-17.886 9.361-42.297 15.703-70.854 21.017c-44.267 8.238-98.66 12.433-153.084 12.815c-54.423.382-108.8-3.051-153.021-10.316c-22.11-3.633-41.675-8.208-57.629-13.9c-4.795-1.712-9.272-3.5-13.412-5.42v112.495c54.727 19.858 139.481 30.383 224 30.383s169.273-10.525 224-30.383zM23.354 421.135a16.2 16.2 0 0 0-.354 3.361c0 6.166 3.506 11.24 7.633 14.842c4.126 3.601 9.26 6.398 15.469 9.02c12.417 5.242 29.265 9.594 49.923 13.283c41.316 7.377 97.685 11.855 159.975 11.855s118.659-4.478 159.975-11.855c20.658-3.69 37.506-8.041 49.923-13.284c6.21-2.62 11.343-5.418 15.47-9.02c4.126-3.6 7.632-8.675 7.632-14.84c0-1.16-.125-2.282-.354-3.362c-58.527 21.982-145.45 32.361-232.646 32.361s-174.119-10.38-232.646-32.361" /></svg>
							</div>
							<h5>貓咪飼料</h5>
						</Link>
					</div>
					<div className="col-md-4 mb-3">
						<Link to="/products" className="card p-3 text-decoration-none">
							<div>
								<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M3.5 17.5q8.5 7 17 0" /><path d="M19 18.5L17 10l1-2l2 1l1.5-1.5L19 3c-5.052.218-5.99 3.133-7 6H6a3 3 0 0 0-3 3m2 6.5L7 9" /><path d="m8 20l2-5h4l2 5" /></g></svg>
							</div>
							<h5>玩具 & 配件</h5>
						</Link>
					</div>
					<div className="col-md-4 mb-3">
						<Link to="/products" className="card p-3 text-decoration-none">
							<div>
								<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24"><g fill="none"><path fill="currentColor" d="m19.98 9.063l.75.002v-.002zm-15.96 0h-.75v.002zM19.1 10.66l-.573.485l.084.1l.114.065zm-.272-1.265a.75.75 0 0 0-.888 1.21zM4.02 15h-.75zm2.04-4.395a.75.75 0 1 0-.888-1.21zM12 5.656c-.772 0-1.21.041-1.556.084c-.34.042-.512.072-.838.072v1.5c.44 0 .725-.047 1.02-.083c.29-.036.666-.073 1.374-.073zm0 1.5c.708 0 1.085.037 1.373.073c.296.036.58.083 1.021.083v-1.5c-.326 0-.498-.03-.838-.072A12 12 0 0 0 12 5.656zm2.394.157c.213 0 .412-.061.555-.114c.156-.058.317-.134.472-.214c.305-.157.659-.367.983-.554c.34-.195.66-.373.947-.503c.308-.14.484-.178.554-.178v-1.5c-.408 0-.83.157-1.171.31a13 13 0 0 0-1.078.571c-.354.204-.658.385-.922.52q-.194.1-.306.141c-.087.032-.087.02-.034.02zm3.511-1.563c.345 0 .675.103.907.303c.212.182.418.51.418 1.135h1.5c0-1-.352-1.766-.939-2.272c-.566-.487-1.272-.666-1.886-.666zm1.325 1.438v1.875h1.5V7.188zM9.606 5.813c.053 0 .053.011-.034-.02a3 3 0 0 1-.306-.141c-.264-.136-.568-.317-.922-.52c-.34-.196-.716-.408-1.078-.571c-.34-.154-.763-.311-1.171-.311v1.5c.07 0 .246.039.554.178c.287.13.608.308.947.503c.324.187.678.397.983.554c.155.08.316.156.472.214c.143.053.342.114.555.114zM6.095 4.25c-.614 0-1.32.179-1.886.666c-.587.505-.939 1.272-.939 2.271h1.5c0-.625.206-.952.418-1.134c.232-.2.563-.303.907-.303zM3.27 7.188v1.875h1.5V7.187zM12 20.75c1.431 0 3.54-.285 5.32-1.104c1.784-.82 3.41-2.273 3.41-4.646h-1.5c0 1.533-1.007 2.58-2.536 3.284s-3.412.966-4.694.966zm7.672-10.574a5 5 0 0 0-.844-.78l-.888 1.208q.358.267.587.54zM19.23 9.06c0 .198-.041.61-.138.895c-.055.159-.086.155-.03.11a.42.42 0 0 1 .412-.055l-.749 1.3c.18.104.402.18.65.167c.255-.013.466-.114.626-.242c.287-.23.432-.566.51-.796c.168-.491.218-1.08.22-1.374zM12 19.25c-1.282 0-3.163-.262-4.694-.966C5.776 17.58 4.77 16.533 4.77 15h-1.5c0 2.373 1.626 3.826 3.41 4.646c1.78.82 3.889 1.104 5.32 1.104zM4.77 15c0-.788-.057-1.437.019-2.128c.07-.645.253-1.218.684-1.727l-1.145-.97c-.68.805-.938 1.693-1.03 2.534c-.087.797-.028 1.66-.028 2.291zm.703-3.855a3.4 3.4 0 0 1 .587-.54l-.888-1.21q-.493.364-.844.78zM3.27 9.065c.001.294.051.883.219 1.374c.078.23.223.566.51.796c.16.128.371.229.625.242c.249.012.47-.063.651-.167l-.749-1.3a.42.42 0 0 1 .411.055c.057.045.026.049-.029-.11a3.3 3.3 0 0 1-.138-.895z" /><path stroke="currentColor" stroke-width="1.5" d="M12.826 16c0 .173-.361.313-.806.313s-.807-.14-.807-.313s.361-.312.807-.312c.445 0 .806.14.806.312Zm2.674-2.406c0 .431-.217.781-.484.781s-.484-.35-.484-.781s.217-.781.484-.781s.484.35.484.78Zm-6 0c0 .431-.217.781-.484.781s-.484-.35-.484-.781s.217-.781.484-.781s.484.35.484.78Z" /><path stroke="currentColor" stroke-linecap="round" stroke-width="1.5" d="M22 15.469c-.483-.313-2.58-1.094-3.387-1.094m1.774 3.594c-.484-.313-1.613-1.094-2.42-1.094M2 15.469c.484-.313 2.58-1.094 3.387-1.094m-1.774 3.594c.484-.313 1.613-1.094 2.42-1.094" /></g></svg>
							</div>
							<h5>貓砂用品</h5>
						</Link>
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
								<Link to="/products/-OM4kct--FDEuZ1nIupA" className="btn btn-outline-primary mt-2">查看產品</Link>
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
