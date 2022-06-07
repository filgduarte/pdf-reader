import './styles.css';

const Loader = (props) => {
    const { loadedPages, numPages, loadingText } = props;
    const progressBarStyles = {};

    if (loadedPages > 0)
    {
        progressBarStyles.width = `${loadedPages * 100 / numPages}%`;
    }

    return(
        <div className={`loader-container ${ loadedPages == numPages ? 'all-loaded' : ''}`}>
            <div className="loading-text">{loadingText}</div>
            <div className="loader">
                <div className="progress-bar" style={progressBarStyles}></div>
                <div className="loaded-label">{loadedPages} / {numPages}</div>
            </div>
        </div>
    )
}

export default Loader;