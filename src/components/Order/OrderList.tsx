import React, { useCallback, useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { Modal } from 'bootstrap';
import { useDispatch } from 'react-redux';
import { showToast } from '../../redux/slices/toastSlice';
import { Link } from 'react-router-dom';

// 這些你可自行拆分至獨立檔案
import OrderModal from './OrderModal';
import DeleteOrderModal from './DeleteOrderModal';
import Pagination from './Pagination';

const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_PATH = 'product-backend'; // 假設為 /v2/api/product-backend/...

// 訂單資料結構
interface Order {
	id: string;
	user: {
		name: string;
		email: string;
		tel: string;
		address: string;
	};
	create_at: number;
	is_paid: boolean;
	message: string;
	products: {
		[key: string]: {
			id: string;
			product_id: string;
			qty: number;
		}
	};
	num: number; // 訂單編號或其他資訊
}

// 分頁資訊
interface PageInfo {
	total_pages: number;
	current_page: number;
	has_pre?: boolean;
	has_next?: boolean;
	category?: string;
}

interface OrderListProps {
	token?: string;     // 從外部傳入的 token, 若已在 axios.defaults 也可不傳
	isAuth?: boolean;   // 若要驗證使用者是否登入
}

const OrderList: React.FC<OrderListProps> = ({ token }) => {
	const dispatch = useDispatch();

	// 訂單列表
	const [orderList, setOrderList] = useState<Order[]>([]);
	// 分頁資訊
	const [pageInfo, setPageInfo] = useState<PageInfo>({
		total_pages: 0,
		current_page: 1,
	});

	// Modal 狀態
	const [modalMode, setModalMode] = useState<'view' | 'edit'>('view');
	const defaultOrder: Order = {
		id: '',
		user: { name: '', email: '', tel: '', address: '' },
		create_at: 0,
		is_paid: false,
		message: '',
		products: {},
		num: 0
	};
	const [tempOrder, setTempOrder] = useState<Order>(defaultOrder);

	// modal 參考
	const orderModalRef = useRef<HTMLDivElement>(null);
	const delOrderModalRef = useRef<HTMLDivElement>(null);

	// 初始化 axios (token)
	useEffect(() => {
		if (token) {
			axios.defaults.headers.common['Authorization'] = token;
		}
	}, [token]);

	/* ---------------- 取得訂單列表 ---------------- */
	const getOrders = useCallback(
		async (page = 1) => {
			try {
				const res = await axios.get(
					`${BASE_URL}/v2/api/${API_PATH}/admin/orders?page=${page}`
				);
				setOrderList(res.data.orders);        // 設定訂單資料
				setPageInfo(res.data.pagination);     // 設定分頁資訊
				dispatch(showToast('成功取得訂單列表'));
			} catch (error) {
				console.error(error);
				alert('取得訂單失敗');
			}
		},
		[dispatch]
	);

	// 首次/切頁 時取得訂單列表
	useEffect(() => {
		getOrders(1);
	}, [getOrders]);

	/* ---------------- Modal 初始化 ---------------- */
	useEffect(() => {
		new Modal(orderModalRef.current!);
		new Modal(delOrderModalRef.current!);
	}, []);

	/* ---------------- 開/關 Modal ---------------- */
	const openOrderModal = (mode: 'view' | 'edit', order: Order) => {
		setModalMode(mode);
		setTempOrder({ ...order });
		const modalInstance = Modal.getInstance(orderModalRef.current!);
		modalInstance?.show();
	};

	const closeOrderModal = () => {
		const modalInstance = Modal.getInstance(orderModalRef.current!);
		modalInstance?.hide();
		setTempOrder({ ...defaultOrder });
	};

	// 刪除彈窗
	const openDelOrderModal = (order: Order) => {
		setTempOrder({ ...order });
		const modalInstance = Modal.getInstance(delOrderModalRef.current!);
		modalInstance?.show();
	};
	const closeDelOrderModal = () => {
		const modalInstance = Modal.getInstance(delOrderModalRef.current!);
		modalInstance?.hide();
		setTempOrder({ ...defaultOrder });
	};

	/* ---------------- 更新訂單 (例如切換付款狀態) ---------------- */
	const updateOrder = async () => {
		// PUT /v2/api/product-backend/admin/orders/{id}
		// {
		//   "data": { ...tempOrder }
		// }
		await axios.put(`${BASE_URL}/v2/api/${API_PATH}/admin/orders/${tempOrder.id}`, {
			data: { ...tempOrder }
		});
	};

	const handleSaveOrder = async () => {
		try {
			await updateOrder();
			dispatch(showToast('訂單更新成功'));
			getOrders(pageInfo.current_page);
			closeOrderModal();
		} catch (error) {
			console.error(error);
			alert('更新訂單失敗');
		}
	};

	/* ---------------- 刪除單筆訂單 ---------------- */
	const deleteOrder = async () => {
		// DELETE /v2/api/product-backend/admin/orders/{id}
		await axios.delete(`${BASE_URL}/v2/api/${API_PATH}/admin/orders/${tempOrder.id}`);
	};

	const handleDeleteOrder = async () => {
		try {
			await deleteOrder();
			dispatch(showToast('刪除訂單成功'));
			getOrders(pageInfo.current_page);
			closeDelOrderModal();
		} catch (error) {
			console.error(error);
			alert('刪除訂單失敗');
		}
	};

	/* ---------------- 刪除所有訂單 ---------------- */
	const deleteAllOrders = async () => {
		// DELETE /v2/api/product-backend/admin/orders/all
		await axios.delete(`${BASE_URL}/v2/api/${API_PATH}/admin/orders/all`);
	};

	const handleDeleteAllOrders = async () => {
		if (!window.confirm("確定要刪除所有訂單嗎？")) return;
		try {
			await deleteAllOrders();
			dispatch(showToast('已刪除所有訂單'));
			getOrders(1);
		} catch (error) {
			console.error(error);
			alert('刪除全部訂單失敗');
		}
	};

	/* ---------------- 分頁 ---------------- */
	const handlePageChange = (page: number) => {
		getOrders(page);
	};

	return (
		<div className="container mt-2">
			{/* 回到admin.tsx */}
			<Link to="/Admin" className="btn btn-outline-primary me-2 mb-4">
				回到管理頁面
			</Link>
			<h2 className="fw-bold mb-3">訂單管理</h2>

			{/* 刪除全部訂單 */}
			<div className="text-end mb-4">
				<button className="btn btn-danger" onClick={handleDeleteAllOrders}>
					刪除全部訂單
				</button>
			</div>

			{/* 訂單列表 */}
			<table className="table">
				<thead>
					<tr>
						<th>訂單編號</th>
						<th>訂購人</th>
						<th>Email</th>
						<th>建立時間</th>
						<th>付款狀態</th>
						<th>操作</th>
					</tr>
				</thead>
				<tbody>
					{orderList.map((order) => (
						<tr key={order.id}>
							<td>{order.num}</td>
							<td>{order.user.name}</td>
							<td>{order.user.email}</td>
							<td>
								{new Date(order.create_at * 1000).toLocaleString()}
							</td>
							<td>
								{order.is_paid ? (
									<span className="text-success fw-bold">已付款</span>
								) : (
									<span className="text-danger">未付款</span>
								)}
							</td>
							<td>
								{/* 查看 / 編輯 */}
								<button
									className="btn btn-sm btn-info me-2"
									onClick={() => openOrderModal('view', order)}
								>
									查看
								</button>
								<button
									className="btn btn-sm btn-primary me-2"
									onClick={() => openOrderModal('edit', order)}
								>
									編輯
								</button>
								{/* 刪除 */}
								<button
									className="btn btn-sm btn-danger"
									onClick={() => openDelOrderModal(order)}
								>
									刪除
								</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>

			{/* 分頁 */}
			<div className="d-flex justify-content-center">
				<Pagination pageInfo={pageInfo} handlePageChange={handlePageChange} />
			</div>

			{/* 詳細 & 編輯 Modal */}
			<OrderModal
				orderModalRef={orderModalRef}
				tempOrder={tempOrder}
				setTempOrder={setTempOrder}
				modalMode={modalMode}
				onCloseModal={closeOrderModal}
				onSaveOrder={handleSaveOrder}
			/>

			{/* 刪除彈窗 */}
			<DeleteOrderModal
				delOrderModalRef={delOrderModalRef}
				tempOrder={tempOrder}
				onCloseModal={closeDelOrderModal}
				onDeleteOrder={handleDeleteOrder}
			/>
		</div>
	);
};

export default OrderList;
