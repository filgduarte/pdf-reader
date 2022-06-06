const Loader = ({numPages}) => {
    return(
        <div className="loader">
            {Array.from(new Array(numPages), (el, index) => (
                <div key={`page_${index + 1}`} id={`loader-page_${index + 1}`}></div>
            ))}
        </div>
    )
}

export default Loader;