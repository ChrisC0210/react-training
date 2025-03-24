import React from 'react';

interface Coupon {
	id?: string | number;
	title: string;
	is_enabled: number;
	percent: number;
	due_date: number;
	code: string;
}

interface DeleteCouponModalProps {
	modalRef: React.RefObject<HTMLDivElement>;
	tempCoupon: Coupon;
	onCloseModal: () => void;
	onDeleteCoupon: () => void;
}

const DeleteCouponModal: React.FC<DeleteCouponModalProps> = ({
	modalRef,
	tempCoupon,
	onCloseModal,
	onDeleteCoupon
}) => {
	return (
		<div
			className="modal fade"
			ref={modalRef}
			tabIndex={-1}
			aria-labelledby="deleteCouponModalLabel"
			aria-hidden="true"
		>
			<div className="modal-dialog">
				<div className="modal-content">
					<div className="modal-header">
						<h5 className="modal-title" id="deleteCouponModalLabel">
							刪除優惠券
						</h5>
						<button
							type="button"
							className="btn-close"
							onClick={onCloseModal}
							aria-label="Close"
						></button>
					</div>
					<div className="modal-body">
						確定要刪除「{tempCoupon.title}」嗎？
					</div>
					<div className="modal-footer">
						<button type="button" className="btn btn-secondary" onClick={onCloseModal}>
							取消
						</button>
						<button type="button" className="btn btn-danger" onClick={onDeleteCoupon}>
							確定刪除
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default DeleteCouponModal;
