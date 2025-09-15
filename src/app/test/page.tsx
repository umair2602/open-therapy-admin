"use client";

import { useState } from "react";

export default function StreamTestPage() {
  const [input, setInput] = useState("");
  const [responseText, setResponseText] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    setResponseText("");
    setLoading(true);

    try {
      const response = await fetch("http://127.0.0.1:8000/api/v1/chat/store/stream", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3NTcxMzkzNDcsInN1YiI6IlRlc3QgRmFyaGFuIDk2MEQifQ.uLz8Gw5LMnfATL9U1Jlulfv7HbHy159kxEUAnb-aJpk",
        },
        body: JSON.stringify({
          category: "general",
          content: input,
        }),
      });

      if (!response.body) throw new Error("No response body");

      const reader = response.body.getReader();
      const decoder = new TextDecoder("utf-8");

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split("\n\n");

        for (const line of lines) {
          if (line.startsWith("data: ")) {
            const data = line.replace("data: ", "").trim();

            if (data === "[END]") {
              setLoading(false);
              return;
            }

            if (data && data !== "[ERROR]") {
              setResponseText((prev) => prev + data);
            }
          }
        }
      }
    } catch (err) {
      console.error("Stream error:", err);
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-xl font-bold mb-4">Stream Test</h1>
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          className="border rounded p-2 flex-1"
          placeholder="Type something..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          onClick={handleSend}
          disabled={loading}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          {loading ? "Streaming..." : "Send"}
        </button>
      </div>
      <div style={{whiteSpace: 'pre-wrap'}} className="border rounded p-4 min-h-[200px] whitespace-pre-wrap">
        {responseText ? responseText : <p className="text-gray-500">No response yet...</p>}
      </div>
    </div>
  );
}
