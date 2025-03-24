import React, { useCallback, useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { Modal } from 'bootstrap';
import { useDispatch } from 'react-redux';
import { showToast } from '../../redux/slices/toastSlice';
import { Link } from 'react-router-dom';

// 既有的共用元件
import CouponModal from './CouponModal';
import DeleteCouponModal from './DeleteCouponModal';
import Pagination from './Pagination';

// 環境變數 (若不同，可自行調整)
const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_PATH = 'product-backend'; // 假設是 /v2/api/product-backend/...

// 定義 Coupon 介面
interface Coupon {
	id?: string | number;
	title: string;
	is_enabled: number;  // 1=啟用, 0=未啟用
	percent: number;
	due_date: number;    // UNIX 時間戳
	code: string;
}

// 分頁資訊介面
interface PageInfo {
	total_pages: number;
	current_page: number;
	has_pre?: boolean;
	has_next?: boolean;
}

interface CouponProps {
	token?: string;    // 傳入的後端 token
}

// const CouponPage: React.FC<CouponProps> = ({ isAuth, token }) => {
const CouponPage: React.FC<CouponProps> = ({ token }) => {
	const dispatch = useDispatch();

	// 優惠券列表
	const [couponList, setCouponList] = useState<Coupon[]>([]);

	// 分頁資訊
	const [pageInfo, setPageInfo] = useState<PageInfo>({
		total_pages: 0,
		current_page: 1
	});

	// Modal 狀態
	const [modalMode, setModalMode] = useState<'create' | 'edit'>('create');
	// 用於存放單筆 Coupon 資料
	const defaultCoupon: Coupon = {
		id: '',
		title: '',
		is_enabled: 0,
		percent: 0,
		due_date: 0,
		code: ''
	};
	const [tempCoupon, setTempCoupon] = useState<Coupon>(defaultCoupon);

	// Modal 參考 (Bootstrap)
	const couponModalRef = useRef<HTMLDivElement>(null);
	const delCouponModalRef = useRef<HTMLDivElement>(null);

	// 通用 headers
	useEffect(() => {
		if (token) {
			axios.defaults.headers.common['Authorization'] = token;
		}
	}, [token]);

	/* ---------------- 取得優惠券列表 (含分頁) ---------------- */
	const getCoupons = useCallback(
		async (page = 1) => {
			try {
				// GET /v2/api/product-backend/admin/coupons?page=${page}
				const res = await axios.get(
					`${BASE_URL}/v2/api/${API_PATH}/admin/coupons?page=${page}`
				);
				// 取得成功後，更新列表與分頁資訊
				setCouponList(res.data.coupons);
				setPageInfo(res.data.pagination);
				dispatch(showToast('取得優惠券列表成功'));
			} catch (error) {
				console.error(error);
				alert('取得優惠券失敗');
			}
		},
		[dispatch]
	);

	// 首次載入 / 分頁切換時呼叫
	useEffect(() => {
		getCoupons(1);
	}, [getCoupons]);

	/* ---------------- Bootstrap Modal 初始化 ---------------- */
	useEffect(() => {
		// 只在首次渲染後做 Modal 初始化
		new Modal(couponModalRef.current!);
		new Modal(delCouponModalRef.current!);
	}, []);

	/* ---------------- 開啟 / 關閉 Modal ---------------- */
	const openCouponModal = (mode: 'create' | 'edit', coupon?: Coupon) => {
		setModalMode(mode);
		if (coupon) {
			// 編輯模式：帶入既有資料
			setTempCoupon({ ...coupon });
		} else {
			// 新增模式：清空
			setTempCoupon({ ...defaultCoupon });
		}
		const modalInstance = Modal.getInstance(couponModalRef.current!);
		modalInstance?.show();
	};

	const closeCouponModal = () => {
		const modalInstance = Modal.getInstance(couponModalRef.current!);
		modalInstance?.hide();
		// 重置 tempCoupon
		setTempCoupon({ ...defaultCoupon });
	};

	// 開啟刪除確認視窗
	const openDelCouponModal = (coupon: Coupon) => {
		setTempCoupon({ ...coupon });
		const modalInstance = Modal.getInstance(delCouponModalRef.current!);
		modalInstance?.show();
	};

	const closeDelCouponModal = () => {
		const modalInstance = Modal.getInstance(delCouponModalRef.current!);
		modalInstance?.hide();
		setTempCoupon({ ...defaultCoupon });
	};

	/* ---------------- 新增 / 更新 優惠券 ---------------- */
	const createCoupon = async () => {
		// POST /v2/api/product-backend/admin/coupon
		// { data: { title, is_enabled, percent, due_date, code } }
		await axios.post(`${BASE_URL}/v2/api/${API_PATH}/admin/coupon`, {
			data: { ...tempCoupon }
		});
	};

	const updateCoupon = async () => {
		// PUT /v2/api/product-backend/admin/coupon/{id}
		await axios.put(`${BASE_URL}/v2/api/${API_PATH}/admin/coupon/${tempCoupon.id}`, {
			data: { ...tempCoupon }
		});
	};

	// 確認儲存（Modal 中點「確定」）:
	const handleSaveCoupon = async () => {
		try {
			if (modalMode === 'create') {
				await createCoupon();
				dispatch(showToast('新增優惠券成功'));
			} else {
				await updateCoupon();
				dispatch(showToast('更新優惠券成功'));
			}
			getCoupons(pageInfo.current_page); // 重新取得當前頁
			closeCouponModal();
		} catch (error) {
			console.error(error);
			alert('優惠券儲存失敗');
		}
	};

	/* ---------------- 刪除優惠券 ---------------- */
	const deleteCoupon = async () => {
		// DELETE /v2/api/product-backend/admin/coupon/{id}
		await axios.delete(`${BASE_URL}/v2/api/${API_PATH}/admin/coupon/${tempCoupon.id}`);
	};

	// 刪除確認（Modal 中點「確定」）
	const handleDeleteCoupon = async () => {
		try {
			await deleteCoupon();
			dispatch(showToast('刪除優惠券成功'));
			getCoupons(pageInfo.current_page);
			closeDelCouponModal();
		} catch (error) {
			console.error(error);
			alert('刪除優惠券失敗');
		}
	};

	/* ---------------- 分頁切換 ---------------- */
	const handlePageChange = (page: number) => {
		getCoupons(page);
	};

	return (
		<section className="container mt-5">
			{/* 回到admin.tsx */}
			<Link to="/Admin" className="btn btn-outline-primary me-2 mb-4">
				回到管理頁面
			</Link>
			<h2 className="fw-bold mb-3">優惠券管理</h2>

			{/* 新增按鈕 */}
			<div className="mb-4 text-end">
				<button
					className="btn btn-primary"
					onClick={() => openCouponModal('create')}
				>
					<i className="bi bi-plus-lg"></i> 建立新的優惠券
				</button>
			</div>

			{/* 優惠券列表 */}
			<table className="table">
				<thead>
					<tr>
						<th>優惠券名稱</th>
						<th>代碼</th>
						<th>折扣（%）</th>
						<th>到期日</th>
						<th>是否啟用</th>
						<th>操作</th>
					</tr>
				</thead>
				<tbody>
					{couponList.map((coupon) => (
						<tr key={coupon.id}>
							<td>{coupon.title}</td>
							<td>{coupon.code}</td>
							<td>{coupon.percent}%</td>
							<td>{new Date(coupon.due_date * 1000).toLocaleDateString()}</td>
							<td>
								{coupon.is_enabled === 1 ? (
									<span className="text-success fw-bold">啟用</span>
								) : (
									<span className="text-danger">未啟用</span>
								)}
							</td>
							<td>
								<button
									className="btn btn-sm btn-primary me-2"
									onClick={() => openCouponModal('edit', coupon)}
								>
									<i className="bi bi-pencil-square"></i> 編輯
								</button>
								<button
									className="btn btn-sm btn-danger"
									onClick={() => openDelCouponModal(coupon)}
								>
									<i className="bi bi-trash3-fill"></i> 刪除
								</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>

			{/* 分頁元件 */}
			<div className="d-flex justify-content-center">
				<Pagination pageInfo={pageInfo} handlePageChange={handlePageChange} />
			</div>

			{/* 新增 / 編輯 Modal */}
			<CouponModal
				modalRef={couponModalRef}
				tempCoupon={tempCoupon}
				setTempCoupon={setTempCoupon}
				modalMode={modalMode}
				onSaveCoupon={handleSaveCoupon}
				onCloseModal={closeCouponModal}
			/>

			{/* 刪除確認 Modal */}
			<DeleteCouponModal
				modalRef={delCouponModalRef}
				tempCoupon={tempCoupon}
				onCloseModal={closeDelCouponModal}
				onDeleteCoupon={handleDeleteCoupon}
			/>
		</section>
	);
};

export default CouponPage;
