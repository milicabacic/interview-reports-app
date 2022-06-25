import "./modal.scss";
import close from "../../images/cancelIcon.png";

const Modal = () => {

    return (
        <div className="modal-background">
        <img src={close}></img>
            <div className="modal-content">This is modal</div>
        </div>
    )
}

export default Modal;