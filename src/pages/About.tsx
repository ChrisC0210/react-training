import { useEffect } from "react";

function About() {

  useEffect(() => {
    // 選取所有要做淡入效果的元素
    const sections = document.querySelectorAll(".fade-in-section");

    // 建立 IntersectionObserver
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // 進入視窗：加上 show，觸發淡入
            entry.target.classList.add("show");
          } else {
            // 離開視窗：移除 show，讓動畫可以再次播放
            entry.target.classList.remove("show");
          }
        });
      },
      {
        threshold: 0.2, // 元素有 20% 進入視窗範圍就觸發
      }
    );

    // 讓每個目標元素都被監聽
    sections.forEach((section) => observer.observe(section));

    // 組件卸載時，停止觀察
    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, []);

  return (
    <div className="container my-5">
      <h1 className="mb-4 fw-bold text-center text-orange">關於我們</h1>

      {/* 品牌故事 (含圖片) */}
      <section className="row align-items-center mb-5 fade-in-section">
        <div className="col-md-4 mb-3 mb-md-0">
          <img
            src="https://storage.googleapis.com/vue-course-api.appspot.com/product-backend/1742746264593.jpg"
            alt="Brand Story"
            className="img-fluid rounded shadow"
            style={{ height: "auto" }}
          />
        </div>
        <div className="col-md-6">
          <h2 className="fs-4 mb-3 fw-bold text-orange">品牌故事</h2>
          <p>
            Cat's Store 由一群熱愛貓咪、並相信「貓咪就是家人」理念的夥伴所創立。最初，我們在一間小小的工作室裡，從客製化貓咪玩具開始，秉持著「給毛孩子更好生活」的初衷，一步步擴展至目前提供全方位貓咪用品的平台。
          </p>
          <p>
            經過不斷摸索與學習，我們深深瞭解到，只有用心投入並關注每個細節，才能帶給貓咪與飼主最舒適安心的體驗。
          </p>
        </div>
      </section>

      {/* 我們的使命 (卡片式呈現) */}
      <section className="mb-5 fade-in-section">
        <h2 className="fs-4 mb-3 fw-bold text-orange">我們的使命</h2>
        <div className="card shadow-sm border-0">
          <div className="card-body">
            <p className="card-text">
              在 Cat's Store，我們始終堅持提供高品質、符合貓咪生理與心理需求的商品。我們與多家優質品牌與飼育專家合作，積極研發符合國際安全標準的貓咪糧食、玩具及周邊商品，只為了確保每一位貓奴都能在這裡找到最適合自家寶貝的產品。
            </p>
          </div>
        </div>
      </section>

      {/* 核心價值 (Icon + 文字) */}
      <section className="mb-5 fade-in-section">
        <h2 className="fs-4 mb-4 fw-bold text-orange">核心價值</h2>
        <div className="row text-center g-4">
          <div className="col-md-3">
            <div className="bg-light rounded p-4 shadow-sm h-100">
              <i className="bi bi-shield-check fs-1 mb-3"></i>
              <h5 className="mb-2">專業</h5>
              <p className="text-muted">
                透過飼養經驗、專業課程與不斷學習，提供最完整的養貓知識與服務。
              </p>
            </div>
          </div>
          <div className="col-md-3">
            <div className="bg-light rounded p-4 shadow-sm h-100">
              <i className="bi bi-heart fs-1 mb-3"></i>
              <h5 className="mb-2 fw-bold">關懷</h5>
              <p className="text-muted">
                將貓咪視為家人，重視牠們的健康、快樂與舒適，並持續投入產品研發與改良。
              </p>
            </div>
          </div>
          <div className="col-md-3">
            <div className="bg-light rounded p-4 shadow-sm h-100">
              <i className="bi bi-star fs-1 mb-3"></i>
              <h5 className="mb-2 fw-bold">可靠</h5>
              <p className="text-muted">
                所有商品皆經過嚴謹篩選與測試，給消費者最安心的購物體驗。
              </p>
            </div>
          </div>
          <div className="col-md-3">
            <div className="bg-light rounded p-4 shadow-sm h-100">
              <i className="bi bi-lightbulb fs-1 mb-3"></i>
              <h5 className="mb-2 fw-bold">創新</h5>
              <p className="text-muted">
                與貓咪行為學家、設計師合作，不斷推出更好、更有趣的產品，讓貓咪和飼主都能感到驚喜。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 社群與公益 */}
      <section className="row align-items-center mb-5 fade-in-section">
        <div className="col-md-6 order-md-2 mb-3 mb-md-0">
          <img
            src="https://storage.googleapis.com/vue-course-api.appspot.com/product-backend/1742746560094.jpg"
            alt="Community and Charity"
            className="img-fluid rounded shadow"
          />
        </div>
        <div className="col-md-6 order-md-1">
          <h2 className="fs-4 mb-3 fw-bold text-orange">社群與公益</h2>
          <p>
            我們深知仍有許多流浪貓需要關懷與幫助，因此 Cat's Store
            會將部分收益捐贈給動物救援機構，以助力於浪浪救援、醫療與中途照顧。同時我們也定期舉辦線上線下活動，邀請愛貓人士一起分享養貓經驗。
          </p>
          <p>
            推廣正確的飼養觀念，期望有一天，所有的貓咪都能得到應有的照顧與愛。
          </p>
        </div>
      </section>

      {/* 展望未來 */}
      <section className="mb-5 fade-in-section">
        <h2 className="fs-4 mb-3 fw-bold text-orange">展望未來</h2>
        <p>
          Cat's Store 不僅是購買貓咪用品的商店，更是所有貓奴們共享熱情、快樂與知識的交流空間。我們會持續開發與引進新穎、優質的貓咪商品，並且提供更多專業文章與活動，讓每一位貓奴都能與自家毛孩子一起擁有更美好、更健康的生活。
        </p>
      </section>

      <div className="bg-light p-4 rounded shadow text-center fade-in-section">
        <p className="text-secondary mb-0 fw-bold">
          <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 512 512"><path fill="currentColor" d="M363.656 30.03c-41.495.564-83.634 22.155-110.844 69.282c-41.912-117.77-236.492-76.29-232 64.5c4.682 146.597 214.483 232.04 237.063 316.313c20.666-77.113 240.752-175.82 236.344-316.313c-2.65-84.358-65.832-134.66-130.564-133.78zm-154.03 58.657c15.38 22.305 27.868 49.554 4.093 51.438c-23.2 1.84-14.18-28.684-4.095-51.438zm97.186 0c10.087 22.754 19.136 53.28-4.062 51.438c-23.776-1.884-11.318-29.133 4.063-51.438zm79.282 56.938c3.65 24.62 4.21 56.43-17.656 48.47c-22.412-8.164-3.117-31.078 17.656-48.47m-264.031 5.594c22.394 15.26 43.843 36.17 22.343 46.5c-20.976 10.074-23.553-21.644-22.344-46.5zm99.28.624c12.818.15 24.67 14.076 27.157 32.625c2.652 19.784-6.356 37.34-20.125 39.186s-27.098-12.715-29.75-32.5s6.388-37.31 20.156-39.156a18 18 0 0 1 2.564-.156zm73.782 0c.854-.01 1.702.04 2.563.156c13.768 1.846 22.776 19.37 20.125 39.156c-2.652 19.785-15.95 34.346-29.72 32.5c-13.768-1.845-22.776-19.402-20.124-39.187c2.485-18.55 14.338-32.477 27.155-32.626zM161.5 206.72c12.172-.038 25.272 10.956 31.47 27.56c7.343 19.68 2.194 39.797-11.5 44.907c-13.697 5.11-30.75-6.695-38.095-26.375s-2.195-39.795 11.5-44.906a19 19 0 0 1 6.625-1.187zm191.406.53q2.694-.075 5.344.625c14.132 3.737 21.246 23.224 15.875 43.53c-5.37 20.31-21.18 33.74-35.313 30c-14.132-3.736-21.245-23.223-15.875-43.53c4.7-17.77 17.402-30.28 29.97-30.625zm-94.75 28.344c18.32 0 33.624 19.908 37.563 46.594c.605.163 1.204.323 1.81.5c34.163 9.926 57.242 36.7 51.533 59.812c-5.71 23.11-38.027 33.802-72.188 23.875c-6.65-1.933-12.884-4.504-18.563-7.563a95 95 0 0 1-18.53 7.563c-34.162 9.927-66.478-.764-72.188-23.875c-5.71-23.11 17.338-49.886 51.5-59.813c.482-.14.956-.274 1.437-.406c3.917-26.732 19.285-46.686 37.626-46.686z" /></svg>
          <span className="mx-2">
            感謝你選擇並信任 Cat's Store，我們期待與你和你的毛孩子攜手共度每一個溫暖動人的日常時刻。
          </span>
        </p>
      </div>
    </div>
  );
}

export default About;