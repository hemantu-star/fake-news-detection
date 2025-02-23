import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [news, setNews] = useState("");
  const [result, setResult] = useState(null);

  const handleSubmit = async () => {
    if (!news.trim()) {
      setResult("Please enter some news text.");
      return;
    }

    setResult("Checking news...");

    try {
      const response = await fetch("http://127.0.0.1:8000/check-news", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: news }),
      });

      const data = await response.json();
      setResult(data.status);
    } catch (error) {
      setResult("Error checking news. Please try again.");
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center">Fake News Detection</h2>
      <div className="mb-3">
        <textarea
          className="form-control"
          rows="4"
          placeholder="Enter news text here..."
          value={news}
          onChange={(e) => setNews(e.target.value)}
        ></textarea>
      </div>
      <button className="btn btn-primary w-100" onClick={handleSubmit}>
        Check News
      </button>
      {result && <p className="mt-3 text-center">{result}</p>}
    </div>
  );
}

export default App;
