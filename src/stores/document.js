import create from 'zustand';

const useStore = create(set => ({
    documentPdf: {
        numPages: 0,
        loadedPages: [],
        currentPage: 0,
        pageSize: {
            width: 0,
            height: 0,
            aspectRatio: 0,
        },
        aspectRatioMultiplier: 1,
    },

    setNumPages: (numPages) => {
        set(
            (state) => ({
                documentPdf: {...state.documentPdf, numPages: numPages}
            })
        );
    },

    setLoadedPages: (loadedPages) => {
        set(
            (state) => ({
                documentPdf: {...state.documentPdf, loadedPages: loadedPages}
            })
        );
    },

    setCurrentPage: (currentPage) => {
        set(
            (state) => ({
                documentPdf: {...state.documentPdf, currentPage: currentPage}
            })
        );
    },

    setPageSize: (pageSize) => {
        set(
            (state) => ({
                documentPdf: {...state.documentPdf, pageSize: pageSize}
            })
        );
    },

    setAspectRatioMultiplier: (aspectRatioMultiplier) => {
        set(
            (state) => ({
                documentPdf: {...state.documentPdf, aspectRatioMultiplier: aspectRatioMultiplier}
            })
        );
    },

}));

export const useDocumentStore = useStore;