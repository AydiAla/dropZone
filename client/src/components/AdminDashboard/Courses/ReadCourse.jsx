import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { pdfjs } from 'react-pdf';
import PdfComp from "./PdfComp"
import CustomAccordion from "./CustomAccordion";
import { useDropzone } from "react-dropzone";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.js",
  import.meta.url
).toString();

function ReadCourse() {
  const [name, setName] = useState("");
  const [file, setFile] = useState(null);
  const { courseId } = useParams();
  const [allImage, setAllImage] = useState("");
  const [pdfFile, setPdfFile] = useState("");
  const [moduleName, setModuleName] = useState("");
  const [modules, setModules] = useState([]);

  useEffect(() => {
    getPdf();
  }, [courseId, allImage]);

  const showPdf = (file) => {
    const absoluteFilePath = `http://localhost:3000/api/courses/get-files/${file}`;
    const pdfWindow = window.open();
    pdfjs.getDocument(absoluteFilePath).promise.then(pdf => {
      const numPages = pdf.numPages;
      const pagesPromises = Array.from({ length: numPages }, (_, i) =>
        pdf.getPage(i + 1).then(page => {
          const scale = 1.5;
          const viewport = page.getViewport({ scale });
          const canvas = document.createElement('canvas');
          const context = canvas.getContext('2d');
          canvas.height = viewport.height;
          canvas.width = viewport.width;
          const renderContext = {
            canvasContext: context,
            viewport: viewport
          };
          return page.render(renderContext).promise.then(() => canvas);
        })
      );
      Promise.all(pagesPromises).then(pages => {
        pages.forEach(canvas => {
          pdfWindow.document.body.appendChild(canvas);
        });
      });
    });
  };

  const getPdf = async () => {
    try {
      const result = await axios.get(`http://localhost:3000/api/courses/get-files/${courseId}`);
      setAllImage(result.data.data);
    } catch (error) {
      console.error("Error fetching PDF files:", error);
    }
  };

  const onDrop = (acceptedFiles) => {
    setFile(acceptedFiles[0]);
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const submitImage = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("file", file);

    try {
      const result = await axios.post(
        `http://localhost:3000/api/courses/upload/${courseId}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      setTimeout(getPdf, 1000);
    } catch (error) {
      console.error("Error uploading PDF:", error);
    }
  };

  const handleAddModule = (e) => {
    e.preventDefault();
    if (moduleName.trim() !== "") {
      const newModule = { id: modules.length + 1, name: moduleName.trim() };
      setModules([...modules, newModule]);
      setModuleName("");
    }
  };

  return (
    <div className="App">
      <form className="formStyle" onSubmit={submitImage}>
        <h4>Upload Pdf</h4>
        <input
          type="text"
          className="form-control"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          name="name"
        />
        <div {...getRootProps()} className="dropzone">
          <input {...getInputProps()} accept="application/pdf" />
          <p>Drag 'n' drop some files here, or click to select files</p>
        </div>
        <button className="btn btn-primary" type="submit">
          Submit
        </button>
      </form>
      <form onSubmit={handleAddModule}>
        <input
          type="text"
          value={moduleName}
          onChange={(e) => setModuleName(e.target.value)}
          placeholder="Enter module name"
        />
        <button type="submit">Add Module</button>
      </form>
      <div className="uploaded">
        <h4>Uploaded PDF:</h4>
        <div className="output-div">
          {allImage && allImage.length > 0
            ? allImage.map((data) => {
              return (
                <div className="inner-div" key={data.id}>
                  <h6>Title: {data.name}</h6>
                  <button
                    className="btn btn-primary"
                    onClick={() => {
                      if (data.file) {
                        showPdf(data.file);
                      } else {
                        console.log("No file specified");
                      }
                    }}
                  >
                    Show Pdf
                  </button>
                  <CustomAccordion title={data.name} courseId={courseId} />
                </div>
              );
            })
            : "No PDFs uploaded"}
        </div>
      </div>
      {pdfFile && <PdfComp file={pdfFile} />}
      {modules.map((module) => (
        <CustomAccordion key={module.id} title={module.name} moduleId={courseId} />
      ))}
    </div>
  );
}

export default ReadCourse;
