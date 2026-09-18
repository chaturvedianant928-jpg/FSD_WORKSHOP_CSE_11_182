import { useState } from "react";
import axios from "axios";

function ApiTester() {
  const [method, setMethod] = useState("GET");
  const [url, setUrl] = useState("http://localhost:3000/");
  const [requestBody, setRequestBody] = useState({
    name: "Rahul Kumar",
    email: "rahul@gmail.com",
    rollNo: "CS101",
    branch: "CSE",
    year: 2,
  });
  const [response, setResponse] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const sendRequest = async () => {
    setLoading(true);
    setResponse("");
    setStatus("");

    try {
      const res = await axios({
        method: method,
        url: url,
        data: requestBody,
      });

      setStatus(res.status);
      setResponse(JSON.stringify(res.data, null, 2));
    } catch (err) {
      if (err.response) {
        setStatus(err.response.status);
        setResponse(JSON.stringify(err.response.data, null, 2));
      } else {
        setStatus("Error");
        setResponse(err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h2>API Tester</h2>

      <div style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
        <select value={method} onChange={(e) => setMethod(e.target.value)}>
          <option value="GET">GET</option>
          <option value="POST">POST</option>
          <option value="PUT">PUT</option>
          <option value="DELETE">DELETE</option>
        </select>

        <input
          type="text"
          placeholder="Enter URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          style={{ flex: 1 }}
        />

        <button onClick={sendRequest} disabled={loading}>
          {loading ? "Sending..." : "Send Request"}
        </button>
      </div>

      <textarea
        placeholder="Request body (JSON)"
        value={requestBody}
        onChange={(e) => setRequestBody(e.target.value)}
        rows={5}
        style={{ width: "100%", marginBottom: "10px" }}
      />

      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
        <strong>Response</strong>
        <strong>Status: {status}</strong>
      </div>

      <pre style={{ background: "#111", color: "#0f0", padding: "10px", minHeight: "150px", overflow: "auto" }}>
        {response}
      </pre>
    </div>
  );
}

export default ApiTester;