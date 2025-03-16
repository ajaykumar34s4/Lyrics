import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MusicIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="size-6 mr-2"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="m9 9 10.5-3m0 6.553v3.75a2.25 2.25 0 0 1-1.632 2.163l-1.32.377a1.803 1.803 0 1 1-.99-3.467l2.31-.66a2.25 2.25 0 0 0 1.632-2.163Zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 0 1-1.632 2.163l-1.32.377a1.803 1.803 0 0 1-.99-3.467l2.31-.66A2.25 2.25 0 0 0 9 15.553Z"
    />
  </svg>
);

const Lyrics = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [lyrics, setLyrics] = useState("");
  const [correctTitle, setCorrectTitle] = useState("");
  const [guess, setGuess] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const generateLyrics = async () => {
    setIsGenerating(true);
    setLyrics("");
    setErrorMessage("");

    try {
      const response = await fetch("http://localhost:5000/generate-lyrics", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });

      const data = await response.json();
      if (data.lyrics && data.title) {
        setLyrics(data.lyrics);
        setCorrectTitle(data.title);
        toast.success("Lyrics generated successfully!");
      } else {
        throw new Error("No lyrics received");
      }
    } catch (error) {
      console.error("Error fetching lyrics:", error);
      setErrorMessage("Failed to generate lyrics. Try again.");
      toast.error("Failed to generate lyrics. Try again.");
    }

    setIsGenerating(false);
  };

  const checkGuess = () => {
    if (guess.trim().toLowerCase() === correctTitle.toLowerCase()) {
      toast.success("Correct Guess Wonderful! ");
    } else {
      toast.error(`Wrong! The correct answer was: ${correctTitle}`);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen px-4 py-8 bg-gradient-to-br from-blue-200 to-purple-300">
      <div className="w-full max-w-xl bg-white shadow-lg rounded-lg border-2 p-6 text-center">
        <h1 className="flex justify-center items-center text-2xl md:text-3xl font-bold text-gray-800">
          <MusicIcon />
          AI Lyrics Generator
        </h1>

        <button
          onClick={generateLyrics}
          className={`mt-6 py-3 px-6 bg-gradient-to-r from-red-400 to-pink-300 text-white font-semibold rounded-lg shadow-md transition-transform transform hover:scale-105 hover:shadow-xl w-[50%] text-center ${
            isGenerating ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={isGenerating}
        >
          {isGenerating ? "Generating..." : "Generate"}
        </button>

        {errorMessage && (
          <p className="mt-3 text-red-600 font-semibold">{errorMessage}</p>
        )}

        <div className="w-full mt-5">
          <textarea
            value={lyrics}
            placeholder="Generated lyrics will appear here..."
            className="w-full h-32 border-2 border-gray-400 bg-yellow-50 text-gray-700 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            readOnly
          />
        </div>

        <div className="mt-6">
          <h2 className="text-lg font-semibold text-gray-700">
            Guess the Song
          </h2>
          <input
            type="text"
            value={guess}
            onChange={(e) => setGuess(e.target.value)}
            placeholder="Enter song name"
            className="w-full p-3 border-2 border-gray-400 bg-red-100 text-gray-800 rounded-md mt-2 focus:outline-none focus:ring-2 focus:ring-red-400"
          />
        </div>

        <button
          onClick={checkGuess}
          className="mt-6 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-lg shadow-md transition-transform transform hover:scale-105 hover:shadow-xl w-[40%]"
        >
          Guess
        </button>

        <ToastContainer position="top-right" autoClose={3000} />
      </div>
    </div>
  );
};

export default Lyrics;
