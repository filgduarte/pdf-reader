import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faAngleLeft,
    faAngleRight,
    faAnglesLeft,
    faAnglesRight,
} from "@fortawesome/free-solid-svg-icons";

const PDFController = (props) => {
    const { currentPage, numPages } = props;
    return(
        <header>
            <nav>
                <button><FontAwesomeIcon icon={faAnglesLeft} /></button>
                <button><FontAwesomeIcon icon={faAngleLeft} /></button>
                <button><FontAwesomeIcon icon={faAngleRight} /></button>
                <button><FontAwesomeIcon icon={faAnglesRight} /></button>
            </nav>
        </header>
    );
};

export default PDFController;