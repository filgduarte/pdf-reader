import PDFViewer from './components/PDFViewer';
import './assets/styles.css';

const App = () => {
  const pdfFile = './catalogo_loccitane.pdf';

  return(
    <div>
      <PDFViewer file={pdfFile} />
    </div>
  )
}

export default App
