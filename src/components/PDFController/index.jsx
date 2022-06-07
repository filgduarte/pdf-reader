import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faAngleLeft,
    faAngleRight,
    faAnglesLeft,
    faAnglesRight,
} from "@fortawesome/free-solid-svg-icons";
import './styles.css';
import { useDocumentStore } from "../../stores/document";

const PDFController = () => {
    const documentPdf = useDocumentStore(state => state.documentPdf);
    const setCurrentPage = useDocumentStore(state => state.setCurrentPage);
    const lastOddPage = Math.ceil(documentPdf.numPages / 2) * 2 - 1;

    const moveDocument = (toPage) => {
        const moveAmount = (toPage - 1) * documentPdf.pageSize.width * -1;
        document.querySelector('.pdf-document').style.transform = `translateX(${moveAmount}px)`;
    }

    const handleClick = (action) => {
        switch (action) {
            case 'first':
                setCurrentPage(1);
                moveDocument(1);
            break;
            case 'prev':
                if (documentPdf.currentPage > 1) {
                    const prevPage = documentPdf.currentPage - 2;
                    setCurrentPage(prevPage);
                    moveDocument(prevPage);
                }
            break;
            case 'next':
                if (documentPdf.currentPage < lastOddPage) {
                    const nextPage = documentPdf.currentPage + 2;
                    setCurrentPage(nextPage);
                    moveDocument(nextPage);
                }
            break;
            case 'last':
                setCurrentPage(lastOddPage);
                moveDocument(lastOddPage);
            break;
        }
    }

    return(
        <header className='pdf-controller'>
            <nav>
                <button onClick={() => handleClick('first')}><FontAwesomeIcon icon={faAnglesLeft} /></button>
                <button onClick={() => handleClick('prev')}><FontAwesomeIcon icon={faAngleLeft} /></button>
                <div className="current-page">{documentPdf.currentPage}-{documentPdf.currentPage + 1} / {documentPdf.numPages}</div>
                <button onClick={() => handleClick('next')}><FontAwesomeIcon icon={faAngleRight} /></button>
                <button onClick={() => handleClick('last')}><FontAwesomeIcon icon={faAnglesRight} /></button>
            </nav>
        </header>
    );
};

export default PDFController;