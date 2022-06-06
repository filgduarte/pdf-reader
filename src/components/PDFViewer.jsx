import { useState } from 'react';
import { Document, Page } from 'react-pdf';
import { pdfjs } from 'react-pdf';
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;
import Loader from './Loader';

const PDFViewer = ({file}) => {
    const [numPages, setNumPages] = useState(null);

    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
    }

    function confirmLoaded(page) {
        const pageLoaded = document.getElementById(`loader-${page}`);
        pageLoaded.classList.add('is-loaded');
    }

    return(
        <div>
            <Loader numPages={numPages} />
            <Document file={file} onLoadSuccess={onDocumentLoadSuccess}>
                {Array.from(new Array(numPages), (el, index) => (
                    <Page key={`page_${index + 1}`} pageNumber={index + 1} onRenderSuccess={() => confirmLoaded(`page_${index + 1}`)} />
                ))}
            </Document>
        </div>
    );
}

export default PDFViewer;