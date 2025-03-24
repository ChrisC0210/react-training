import React from 'react';

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
	num: number;
}

interface OrderModalProps {
	orderModalRef: React.RefObject<HTMLDivElement>;
	tempOrder: Order;
	setTempOrder: React.Dispatch<React.SetStateAction<Order>>;
	modalMode: 'view' | 'edit';
	onCloseModal: () => void;
	onSaveOrder: () => void;
}

const OrderModal: React.FC<OrderModalProps> = ({
	orderModalRef,
	tempOrder,
	setTempOrder,
	modalMode,
	onCloseModal,
	onSaveOrder
}) => {

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const { name, value, type } = e.target;
		// 若為 checkbox (is_paid), 則先將 target 型別轉為 HTMLInputElement 以取得 checked 屬性
		if (type === 'checkbox') {
			const target = e.target as HTMLInputElement;
			setTempOrder((prev) => ({ ...prev, [name]: target.checked }));
		} else {
			setTempOrder((prev) => ({ ...prev, [name]: value }));
		}
	};

	return (
		<div
			className="modal fade"
			ref={orderModalRef}
			tabIndex={-1}
			aria-labelledby="orderModalLabel"
			aria-hidden="true"
		>
			<div className="modal-dialog modal-lg"> {/* 彈窗可加大 */}
				<div className="modal-content">
					<div className="modal-header">
						<h5 className="modal-title">
							{modalMode === 'view' ? '查看訂單' : '編輯訂單'}
						</h5>
						<button type="button" className="btn-close" onClick={onCloseModal}></button>
					</div>
					<div className="modal-body">
						{/* 訂單基本資訊 */}
						<div className="mb-3 row">
							<label className="col-sm-3 col-form-label">訂單編號</label>
							<div className="col-sm-9">
								<input
									type="text"
									readOnly
									className="form-control"
									value={tempOrder.num}
								/>
							</div>
						</div>

						<div className="mb-3 row align-items-center">
							<label className="col-sm-3 col-form-label">付款狀態</label>
							<div className="col-sm-9">
								{modalMode === 'view' ? (
									<span>
										{tempOrder.is_paid ? '已付款' : '未付款'}
									</span>
								) : (
									<div className="form-check">
										<input
											className="form-check-input"
											type="checkbox"
											id="is_paid"
											name="is_paid"
											checked={tempOrder.is_paid}
											onChange={handleInputChange}
										/>
										<label className="form-check-label" htmlFor="is_paid">
											是否已付款
										</label>
									</div>
								)}
							</div>
						</div>

						{/* 訂購人資訊 */}
						<hr />
						<h6>訂購人資料</h6>
						<div className="mb-3 row">
							<label className="col-sm-3 col-form-label">姓名</label>
							<div className="col-sm-9">
								<input
									type="text"
									name="user.name"
									className="form-control"
									readOnly={modalMode === 'view'} // 僅在 edit 模式下可改
									value={tempOrder.user.name}
									onChange={(e) => {
										setTempOrder((prev) => ({
											...prev,
											user: { ...prev.user, name: e.target.value }
										}));
									}}
								/>
							</div>
						</div>
						<div className="mb-3 row">
							<label className="col-sm-3 col-form-label">Email</label>
							<div className="col-sm-9">
								<input
									type="text"
									name="user.email"
									className="form-control"
									readOnly={modalMode === 'view'}
									value={tempOrder.user.email}
									onChange={(e) => {
										setTempOrder((prev) => ({
											...prev,
											user: { ...prev.user, email: e.target.value }
										}));
									}}
								/>
							</div>
						</div>
						<div className="mb-3 row">
							<label className="col-sm-3 col-form-label">電話</label>
							<div className="col-sm-9">
								<input
									type="text"
									name="user.tel"
									className="form-control"
									readOnly={modalMode === 'view'}
									value={tempOrder.user.tel}
									onChange={(e) => {
										setTempOrder((prev) => ({
											...prev,
											user: { ...prev.user, tel: e.target.value }
										}));
									}}
								/>
							</div>
						</div>
						<div className="mb-3 row">
							<label className="col-sm-3 col-form-label">地址</label>
							<div className="col-sm-9">
								<input
									type="text"
									name="user.address"
									className="form-control"
									readOnly={modalMode === 'view'}
									value={tempOrder.user.address}
									onChange={(e) => {
										setTempOrder((prev) => ({
											...prev,
											user: { ...prev.user, address: e.target.value }
										}));
									}}
								/>
							</div>
						</div>

						{/* 留言 */}
						<hr />
						<div className="mb-3">
							<label className="form-label">留言</label>
							{modalMode === 'view' ? (
								<div>{tempOrder.message}</div>
							) : (
								<textarea
									className="form-control"
									name="message"
									rows={3}
									value={tempOrder.message}
									onChange={handleInputChange}
								></textarea>
							)}
						</div>

						{/* 購買產品清單 (簡易呈現) */}
						<hr />
						<h6>產品清單</h6>
						<ul>
							{Object.values(tempOrder.products).map((p) => (
								<li key={p.id}>
									產品ID: {p.product_id}, 數量: {p.qty}
								</li>
							))}
						</ul>
					</div>
					<div className="modal-footer">
						{modalMode === 'edit' && (
							<button className="btn btn-primary" onClick={onSaveOrder}>
								儲存
							</button>
						)}
						<button className="btn btn-secondary" onClick={onCloseModal}>
							關閉
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default OrderModal;
