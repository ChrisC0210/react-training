import React from 'react';

interface Coupon {
	id?: string | number;
	title: string;
	is_enabled: number;
	percent: number;
	due_date: number;
	code: string;
}

interface CouponModalProps {
	modalRef: React.RefObject<HTMLDivElement>;
	modalMode: 'create' | 'edit';
	tempCoupon: Coupon;
	setTempCoupon: React.Dispatch<React.SetStateAction<Coupon>>;
	onSaveCoupon: () => void;
	onCloseModal: () => void;
}

const CouponModal: React.FC<CouponModalProps> = ({
	modalRef,
	modalMode,
	tempCoupon,
	setTempCoupon,
	onSaveCoupon,
	onCloseModal
}) => {

	// 處理表單輸入
	const handleInputChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
	) => {
		const { name, value } = e.target;
		// 針對 is_enabled 做特殊轉型 (string -> number)
		if (name === 'is_enabled') {
			setTempCoupon((prev) => ({ ...prev, [name]: Number(value) }));
		} else if (name === 'percent') {
			setTempCoupon((prev) => ({ ...prev, [name]: Number(value) }));
		} else if (name === 'due_date') {
			setTempCoupon((prev) => ({ ...prev, [name]: Number(value) }));
		} else {
			setTempCoupon((prev) => ({ ...prev, [name]: value }));
		}
	};

	return (
		<div
			className="modal fade"
			ref={modalRef}
			tabIndex={-1}
			aria-labelledby="couponModalLabel"
			aria-hidden="true"
		>
			<div className="modal-dialog">
				<div className="modal-content">
					<div className="modal-header">
						<h5 className="modal-title" id="couponModalLabel">
							{modalMode === 'create' ? '新增優惠券' : '編輯優惠券'}
						</h5>
						<button
							type="button"
							className="btn-close"
							aria-label="Close"
							onClick={onCloseModal}
						></button>
					</div>
					<div className="modal-body">
						<div className="mb-3">
							<label htmlFor="title" className="form-label">
								優惠券名稱
							</label>
							<input
								type="text"
								id="title"
								name="title"
								className="form-control"
								value={tempCoupon.title}
								onChange={handleInputChange}
							/>
						</div>
						<div className="mb-3">
							<label htmlFor="code" className="form-label">
								優惠碼
							</label>
							<input
								type="text"
								id="code"
								name="code"
								className="form-control"
								value={tempCoupon.code}
								onChange={handleInputChange}
							/>
						</div>
						<div className="mb-3">
							<label htmlFor="percent" className="form-label">
								折扣（%）
							</label>
							<input
								type="number"
								id="percent"
								name="percent"
								className="form-control"
								value={tempCoupon.percent}
								onChange={handleInputChange}
							/>
						</div>
						<div className="mb-3">
							<label htmlFor="due_date" className="form-label">
								到期日 (UNIX Timestamp)
							</label>
							<input
								type="number"
								id="due_date"
								name="due_date"
								className="form-control"
								value={tempCoupon.due_date}
								onChange={handleInputChange}
							/>
							<small className="text-muted">
								例如 1691779200 (2023/08/12) ，可透過線上 Epoch Converter 查看
							</small>
						</div>
						<div className="mb-3">
							<label htmlFor="is_enabled" className="form-label">
								是否啟用
							</label>
							<select
								id="is_enabled"
								name="is_enabled"
								className="form-select"
								value={tempCoupon.is_enabled}
								onChange={handleInputChange}
							>
								<option value={0}>未啟用</option>
								<option value={1}>啟用</option>
							</select>
						</div>
					</div>
					<div className="modal-footer">
						<button
							type="button"
							className="btn btn-secondary"
							onClick={onCloseModal}
						>
							取消
						</button>
						<button
							type="button"
							className="btn btn-primary"
							onClick={onSaveCoupon}
						>
							確定
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CouponModal;
