//import jsPDF from 'jspdf';



export default function Header ({resumeBodyRef}) {
    return (
        <header className="header">
            <div>
                <h1>CV Application</h1>
                <p>Build Your CV In Minutes</p>
            </div>
            <DownloadButton startDownload={resumeBodyRef} />
        </header>
    )
}

function DownloadButton ({startDownload}) {
    
    const handeDownloadePDF = () => {
        const resumeElement = startDownload.current;
            if (!resumeElement) {
                alert("Resume content not found. Please ensure the CV is rendered.");
                return;
            } 
        window.print();
    }
          return (
            <div>
              <button
                onClick={handeDownloadePDF}
                style={{ marginTop: '10px', padding: '10px 15px', cursor: 'pointer' }}
              >
                Download as PDF
              </button>
            </div>
          );
}