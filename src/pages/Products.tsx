import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import ReactLoading from "react-loading";
// import Navbar from "../components/Navbar";
import Toast from "../components/Toast";
import { useDispatch } from "react-redux";
import { showToast } from "../redux/slices/toastSlice";

const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_PATH = import.meta.env.VITE_API_PATH;

interface Product {
  id: number | string;
  title: string;
  imageUrl: string;
  price: number;
  origin_price: number;
  category?: string; // 建議給個可選屬性作為類別
}

interface CartItem {
  id: number | string;
  title: string;
  price: number;
  quantity: number;
}

interface ProductsProps {
  cart: CartItem[];
  setCart: React.Dispatch<React.SetStateAction<CartItem[]>>;
}

const Products: React.FC<ProductsProps> = ({ cart, setCart }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  
  // 分類篩選
  const [categoryFilter, setCategoryFilter] = useState("全部");
  
  // 分頁
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // 每頁顯示商品數量

  const dispatch = useDispatch();

  // 取得產品資料
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${BASE_URL}/v2/api${API_PATH}/products`);
        setProducts(res.data.products);
      } catch (error) {
        alert("取得產品失敗");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // 新增至購物車
  const handleAddToCart = async (product: Product) => {
    setLoading(true);
    try {
      await axios.post(`${BASE_URL}/v2/api${API_PATH}/cart`, {
        data: { product_id: product.id, qty: 1 },
      });
      setCart((prev) => {
        const found = prev.find((item) => item.id === product.id);
        if (found) {
          return prev.map((item) =>
            item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
          );
        }
        return [...prev, { ...product, quantity: 1 }];
      });
      dispatch(showToast("已加入購物車"));
    } catch (error) {
      console.error(error);
      alert("加入購物車失敗");
    } finally {
      setLoading(false);
    }
  };

  // 從購物車移除
  const handleDeleteFromCart = async (cartItemId: string | number) => {
    setLoading(true);
    try {
      await axios.delete(`${BASE_URL}/v2/api${API_PATH}/cart/${cartItemId}`);
      setCart((prev) => prev.filter((item) => item.id !== cartItemId));
      dispatch(showToast("已從購物車移除產品"));
    } catch (error) {
      console.error(error);
      alert("從購物車移除產品失敗");
    } finally {
      setLoading(false);
    }
  };

  // 依照 categoryFilter 篩選（預設顯示全部）
  const filteredProducts = categoryFilter === "全部"
    ? products
    : products.filter((p) => p.category === categoryFilter);

  // 分頁計算
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = currentPage * itemsPerPage;
  const pageProducts = filteredProducts.slice(startIndex, endIndex);

  // 點選切換分類
  const handleCategoryChange = (newCategory: string) => {
    setCategoryFilter(newCategory);
    setCurrentPage(1); // 切換分類時，回到第一頁
  };

  // 切換頁面
  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  return (
    <>
      {/* <Navbar /> */}
      <Toast />
      <div className="container mt-4">
        {loading && <ReactLoading type="spin" color="#000" className="d-block mx-auto" />}

        {/* 分類篩選按鈕 */}
        <div className="mb-3">
          <span className="me-2">分類篩選:</span>
          {["全部", "貓砂", "貓砂盆", "貓糧"].map((cat) => (
            <button
              key={cat}
              className={`btn me-2 ${categoryFilter === cat ? "btn-primary" : "btn-outline-primary"}`}
              onClick={() => handleCategoryChange(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* 標題＋查看購物車 */}
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h1 className="m-0">產品列表</h1>
          <Link to="/cart" className="btn btn-danger">
            查看購物車
          </Link>
        </div>

        {/* 產品列表 (套用分頁後的結果) */}
        <table className="table align-middle">
          <thead>
            <tr>
              <th>圖片</th>
              <th>商品名稱</th>
              <th>價格</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {pageProducts.map((product) => (
              <tr key={product.id}>
                <td style={{ width: "200px" }}>
                  <img className="img-fluid" src={product.imageUrl} alt={product.title} />
                </td>
                <td>{product.title}</td>
                <td>
                  <del className="h6">原價 {product.origin_price} 元</del>
                  <div className="h5">特價 {product.price} 元</div>
                </td>
                <td>
                  <div className="btn-group btn-group-sm">
                    <Link to={`/products/${product.id}`} className="btn btn-outline-secondary">
                      查看更多
                    </Link>
                    <button
                      onClick={() => handleAddToCart(product)}
                      type="button"
                      className="btn btn-outline-danger"
                    >
                      加到購物車
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* 分頁按鈕 (上一頁 / 下一頁) */}
        <div className="d-flex justify-content-center align-items-center mb-5">
          <button
            className="btn btn-secondary me-2"
            onClick={handlePrevPage}
            disabled={currentPage === 1}
          >
            上一頁
          </button>
          <span>
            第 {currentPage} / {totalPages} 頁
          </span>
          <button
            className="btn btn-secondary ms-2"
            onClick={handleNextPage}
            disabled={currentPage === totalPages || totalPages === 0}
          >
            下一頁
          </button>
        </div>

        {/* 購物車清單 */}
        {cart.length > 0 && (
          <div className="mt-5">
            <h2>購物車</h2>
            <table className="table align-middle">
              <thead>
                <tr>
                  <th></th>
                  <th>品名</th>
                  <th>數量</th>
                  <th className="text-end">單價</th>
                  <th className="text-end">小計</th>
                </tr>
              </thead>
              <tbody>
                {cart.map((item) => (
                  <tr key={item.id}>
                    <td>
                      <button
                        type="button"
                        className="btn btn-outline-danger btn-sm"
                        onClick={() => handleDeleteFromCart(item.id)}
                      >
                        x
                      </button>
                    </td>
                    <td>{item.title}</td>
                    <td>{item.quantity}</td>
                    <td className="text-end">{item.price}</td>
                    <td className="text-end">{item.price * item.quantity}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan={4} className="text-end">
                    總計：
                  </td>
                  <td className="text-end">
                    {cart.reduce((acc, item) => acc + item.price * item.quantity, 0)}
                  </td>
                </tr>
              </tfoot>
            </table>
            <div className="text-end">
              <button
                className="btn btn-danger"
                onClick={() => {
                  setCart([]);
                  dispatch(showToast("購物車已清空"));
                }}
              >
                清空購物車
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Products;
