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
    const lastPage = documentPdf.numPages;
    const lastPageIsEven = (lastPage % 2 == 0) ? true : false;

    const moveDocument = (toPage) => {
        let divider = 2;
        if (toPage >= lastPage - 1) {
            divider = 1;
        }
        const moveAmount = (toPage - 1) * -100 / documentPdf.numPages / divider;
        document.querySelector('.pdf-document').style.transform = `translateX(${moveAmount}%)`;
    }

    const handleClick = (action) => {
        const currentPage = documentPdf.currentPage;
        const isFirstPage = (currentPage == 1) ? true : false;
        const isSecondPage = (currentPage == 2) ? true : false;
        const isPenultimatePage = (currentPage == lastPage - 1) ? true : false;
    
        switch (action) {
            case 'first':
                setCurrentPage(1);
                moveDocument(1);
            break;
            case 'prev':
                let prevPage = currentPage - 2;

                if (isSecondPage) {
                    prevPage = currentPage - 1;
                }

                if (currentPage > 1) {
                    setCurrentPage(prevPage);
                    moveDocument(prevPage);
                }
            break;
            case 'next':
                let nextPage = currentPage + 2;

                if (isFirstPage || (isPenultimatePage && lastPageIsEven)) {
                    nextPage = currentPage + 1;
                }

                if (currentPage < lastPage - 1) {
                    setCurrentPage(nextPage);
                    moveDocument(nextPage);
                }
            break;
            case 'last':
                let goTo = lastPage - 1;
                if (lastPageIsEven) {
                    goTo = lastPage
                }
                setCurrentPage(goTo);
                moveDocument(goTo);
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