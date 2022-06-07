import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faAngleLeft,
    faAngleRight,
    faAnglesLeft,
    faAnglesRight,
} from "@fortawesome/free-solid-svg-icons";
import { useDocumentStore } from "../../stores/document";

const PDFController = () => {
    const documentPdf = useDocumentStore(state => state.documentPdf);
    const setCurrentPage = useDocumentStore(state => state.setCurrentPage);
    const lastOddPage = Math.ceil(documentPdf.numPages / 2) * 2 - 1;

    return(
        <header>
            <nav>
                <button onClick={() => setCurrentPage(1)}><FontAwesomeIcon icon={faAnglesLeft} /></button>
                <button onClick={() => setCurrentPage((documentPdf.currentPage - 2))}><FontAwesomeIcon icon={faAngleLeft} /></button>
                <div className="current-page">{documentPdf.currentPage}-{documentPdf.currentPage + 1} / {documentPdf.numPages}</div>
                <button onClick={() => setCurrentPage((documentPdf.currentPage + 2))}><FontAwesomeIcon icon={faAngleRight} /></button>
                <button onClick={() => setCurrentPage(lastOddPage)}><FontAwesomeIcon icon={faAnglesRight} /></button>
            </nav>
        </header>
    );
};

export default PDFController;