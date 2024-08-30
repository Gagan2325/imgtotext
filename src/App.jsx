// src/App.jsx
import React, { useState } from 'react';
import Tesseract from 'tesseract.js';

function App() {
  const [image, setImage] = useState(null);
  const [text, setText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleImageChange = (e) => {
    setImage(URL.createObjectURL(e.target.files[0]));
  };

  const extractText = () => {
    setIsLoading(true);
    Tesseract.recognize(
      image,
      'eng',
      {
        logger: (m) => console.log(m),
      }
    )
      .then(({ data: { text } }) => {
        setText(text);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setIsLoading(false);
      });
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Tesseract.js OCR Example</h1>
      <input type="file" onChange={handleImageChange} />
      {image && <img src={image} alt="Uploaded" style={{ maxWidth: '100%', marginTop: '10px' }} />}
      <br />
      <button onClick={extractText} disabled={!image || isLoading} style={{ marginTop: '10px' }}>
        {isLoading ? 'Extracting...' : 'Extract Text'}
      </button>
      <div style={{ marginTop: '20px', whiteSpace: 'pre-wrap' }}>
        <h2>Extracted Text:</h2>
        <p>{text}</p>
      </div>
    </div>
  );
}

export default App;
