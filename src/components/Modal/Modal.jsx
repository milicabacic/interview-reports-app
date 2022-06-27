import "./modal.scss";
import close from "../../images/close.png";
import { createPortal } from "react-dom";

const Modal = ({children, open, onClose}) => {

    if(!open) return null;

  return createPortal(
    <div className="modal-background">
      <img src={close} onClick = {onClose}></img>
      <div className="modal-content">{children}</div>
    </div>,
    document.getElementById("modal-root")
  );
};

export default Modal;
