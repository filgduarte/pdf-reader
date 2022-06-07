import PDFViewer from './components/PDFViewer';
import PDFController from './components/PDFController';
import './assets/global.css';

const App = () => {
  const pdfFile = './catalogo_loccitane.pdf';

  return(
    <div>
      <PDFController />
      <PDFViewer file={pdfFile} />
    </div>
  )
}

export default App
