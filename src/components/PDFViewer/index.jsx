import { useEffect, useState } from 'react';
import { Document, Page } from 'react-pdf';
import { pdfjs } from 'react-pdf';
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;
import './styles.css';
import Loader from '../Loader';

const PDFViewer = ({file}) => {
    const [numPages, setNumPages] = useState(null);
    const [loadedPages, setLoadedPages] = useState(0);
    const [pageRatio, setPageRatio] = useState(0);

    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
    }

    useEffect(() => {
        if (loadedPages == numPages) {
            setDocumentSize();
        }
    }, [loadedPages]);

    function setDocumentSize() {
        const pageCanvas = document.querySelector('.react-pdf__Page__canvas');
        const aspectRatio = pageCanvas.offsetWidth / pageCanvas.offsetHeight
        setPageRatio(aspectRatio);
        document.querySelector('.pdf-document').style.width = `${numPages * 100}%`;

        const pageElements = document.querySelectorAll('.pdf-page');
        [...pageElements].map(pageElement => {
            pageElement.style.aspectRatio = aspectRatio;
        });
    }

    return(
        <div className="pdf-container">
            <Loader numPages={numPages} loadedPages={loadedPages} loadingText='Carregando...' />
            <div className="pdf-document-wrapper" style={{aspectRatio: pageRatio  * 2}}>
            <Document className='pdf-document' file={file} onLoadSuccess={onDocumentLoadSuccess}>
                {Array.from(new Array(numPages), (el, index) => (
                    <Page className="pdf-page" key={`page_${index + 1}`} pageNumber={index + 1} onRenderSuccess={() => setLoadedPages((p) => p + 1)} renderTextLayer={false} renderAnnotationLayer={false} />
                ))}
            </Document>
            </div>
        </div>
    );
}

export default PDFViewer;