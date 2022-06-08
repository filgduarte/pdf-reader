import { useEffect } from 'react';
import { Document, Page } from 'react-pdf';
import { pdfjs } from 'react-pdf';
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;
import './styles.css';
import PDFLoader from '../PDFLoader';
import { useDocumentStore } from '../../stores/document';

const PDFViewer = ({file}) => {
    const documentPdf = useDocumentStore(state => state.documentPdf);
    const setNumPages = useDocumentStore(state => state.setNumPages);
    const setLoadedPages = useDocumentStore(state => state.setLoadedPages);
    const setCurrentPage = useDocumentStore(state => state.setCurrentPage);
    const setPageSize = useDocumentStore(state => state.setPageSize);
    const setAspectRatioMultiplier = useDocumentStore(state => state.setAspectRatioMultiplier);

    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
    }

    function setDocumentAspectRatio() {
        const currentAspectRatioMultiplier = documentPdf.aspectRatioMultiplier;
        let newAspectRatioMultiplier = 2;
        const isFirstPage = (documentPdf.currentPage == 1) ? true : false;
        const isLastPage = (documentPdf.currentPage == documentPdf.numPages) ? true : false;
        const lastPageIsEven = (documentPdf.numPages % 2 == 0) ? true : false;

        if (isFirstPage || (isLastPage && lastPageIsEven)) {
            newAspectRatioMultiplier = 1;
        }

        if (newAspectRatioMultiplier != currentAspectRatioMultiplier) {
            setAspectRatioMultiplier(newAspectRatioMultiplier);
        }
    }

    function setDocumentSize() {
        const pdfDocument = document.querySelector('.pdf-document');
        const pageCanvas = document.querySelector('.react-pdf__Page__canvas');
        const pageElements = [...document.querySelectorAll('.pdf-page')];
        const pageSize = {
            width: pageCanvas.offsetWidth,
            height: pageCanvas.offsetHeight,
            aspectRatio: pageCanvas.offsetWidth / pageCanvas.offsetHeight
        }

        pdfDocument.style.width = `${documentPdf.numPages * 100}%`;
        pageElements.map(pageElement => {
            pageElement.style.aspectRatio = pageSize.aspectRatio;
        });
        setPageSize(pageSize);
    }

    useEffect(() => {
        if (documentPdf.loadedPages.includes(1)) {
            setDocumentSize();
            setCurrentPage(1);
        }
    }, [documentPdf.loadedPages]);

    useEffect(() => {
        setDocumentAspectRatio();
    }, [documentPdf.currentPage]);

    return(
        <main className="pdf-container">
            <PDFLoader loadingText='Carregando...' />
            <div className="pdf-document-wrapper" style={{aspectRatio: documentPdf.pageSize.aspectRatio * documentPdf.aspectRatioMultiplier}}>
                <Document
                    className='pdf-document'
                    file={file}
                    onLoadSuccess={onDocumentLoadSuccess}
                >
                    {Array.from(new Array(documentPdf.numPages), (el, index) => (
                        <Page
                            className="pdf-page"
                            key={`page_${index + 1}`}
                            pageNumber={index + 1}
                            onRenderSuccess={() => setLoadedPages([...documentPdf.loadedPages, index + 1])}
                            renderTextLayer={false}
                            renderAnnotationLayer={false}
                        />
                    ))}
                </Document>
            </div>
        </main>
    );
}

export default PDFViewer;