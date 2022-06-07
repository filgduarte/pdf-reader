import { useDocumentStore } from '../../stores/document';
import './styles.css';

const PDFLoader = (props) => {
    const { loadingText } = props;
    const documentPdf = useDocumentStore(state => state.documentPdf);
    const progressBarStyles = {};

    if (documentPdf.loadedPages.length > 0)
    {
        progressBarStyles.width = `${documentPdf.loadedPages.length * 100 / documentPdf.numPages}%`;
    }

    return(
        <div className={`loader-container ${ documentPdf.loadedPages.length == documentPdf.numPages ? 'all-loaded' : null}`}>
            <div className="loading-text">{loadingText}</div>
            <div className="loader">
                <div className="progress-bar" style={progressBarStyles}></div>
                <div className="loaded-label">{documentPdf.loadedPages.length} / {documentPdf.numPages}</div>
            </div>
        </div>
    )
}

export default PDFLoader;