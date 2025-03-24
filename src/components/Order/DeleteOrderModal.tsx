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

interface DeleteOrderModalProps {
  delOrderModalRef: React.RefObject<HTMLDivElement>;
  tempOrder: Order;
  onCloseModal: () => void;
  onDeleteOrder: () => void;
}

const DeleteOrderModal: React.FC<DeleteOrderModalProps> = ({
  delOrderModalRef,
  tempOrder,
  onCloseModal,
  onDeleteOrder,
}) => {
  return (
    <div
      className="modal fade"
      ref={delOrderModalRef}
      tabIndex={-1}
      aria-labelledby="deleteOrderModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="deleteOrderModalLabel">
              刪除訂單
            </h5>
            <button type="button" className="btn-close" onClick={onCloseModal}></button>
          </div>
          <div className="modal-body">
            確定要刪除「訂單編號 {tempOrder.num}」嗎？
          </div>
          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={onCloseModal}>
              取消
            </button>
            <button className="btn btn-danger" onClick={onDeleteOrder}>
              確定刪除
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteOrderModal;
