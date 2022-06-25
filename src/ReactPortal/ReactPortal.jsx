import Modal from "../components/Modal/Modal";
import { createPortal } from "react-dom";

const ReactPortal = ({children}) => {


    return createPortal(children, document.getElementById("modal-root"));
}

export default ReactPortal;
