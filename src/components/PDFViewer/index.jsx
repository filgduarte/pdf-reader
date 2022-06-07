import { useEffect, useState } from 'react';
import { Document, Page } from 'react-pdf';
import { pdfjs } from 'react-pdf';
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;
import './styles.css';
import PDFLoader from '../PDFLoader';
import PDFController from '../PDFController';

const PDFViewer = ({file}) => {
    const [numPages, setNumPages] = useState(null);
    const [loadedPages, setLoadedPages] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);

    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
    }

    function setDocumentSize() {
        const pdfDocumentWrapper  = document.querySelector('.pdf-document-wrapper');
        const pdfDocument = document.querySelector('.pdf-document');
        const pageCanvas = document.querySelector('.react-pdf__Page__canvas');
        const pageElements = [...document.querySelectorAll('.pdf-page')];
        const aspectRatio = pageCanvas.offsetWidth / pageCanvas.offsetHeight;

        pdfDocumentWrapper.style.aspectRatio = aspectRatio  * 2;
        pdfDocument.style.width = `${numPages * 100}%`;
        pageElements.map(pageElement => {
            pageElement.style.aspectRatio = aspectRatio;
        });
    }

    useEffect(() => {
        if (loadedPages.includes(1)) {
            setDocumentSize();
        }
    }, [loadedPages]);

    return(
        <div>
            <PDFController currentPage={currentPage} numPages={numPages} />
            <main className="pdf-container">
                <PDFLoader
                    numPages={numPages}
                    loadedPages={loadedPages.length}
                    loadingText='Carregando...'
                />
                <div className="pdf-document-wrapper">
                    <Document
                        className='pdf-document'
                        file={file}
                        onLoadSuccess={onDocumentLoadSuccess}
                    >
                        {Array.from(new Array(numPages), (el, index) => (
                            <Page
                                className="pdf-page"
                                key={`page_${index + 1}`}
                                pageNumber={index + 1}
                                onRenderSuccess={() => setLoadedPages((p) => [...p, index])}
                                renderTextLayer={false}
                                renderAnnotationLayer={false}
                            />
                        ))}
                    </Document>
                </div>
            </main>
        </div>
    );
}

export default PDFViewer;