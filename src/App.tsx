import { pdfjs } from "react-pdf";

import { AppRoutes } from "./routing/AppRoutes";

pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

function App() {
  return (
    <>
      <AppRoutes />
    </>
  );
}

export default App;
