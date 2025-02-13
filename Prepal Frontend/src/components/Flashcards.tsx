"use client";

import { useState } from "react";
import { useDropzone } from "react-dropzone";
import * as pdfjs from "pdfjs-dist";
import pdfjsWorker from "pdfjs-dist/build/pdf.worker?url"; // Import worker correctly in Vite
import Button from "./Button";
import Card from "./Card";
import { generateFlashcardsFromHuggingFace } from "./openaiUtils"; // Import Hugging Face summarization function

pdfjs.GlobalWorkerOptions.workerSrc = pdfjsWorker; // Set worker source

const Flashcards = () => {
  const [flashcards, setFlashcards] = useState<string[]>([]);
  const [topic, setTopic] = useState<string>(""); // State for user input
  const [loading, setLoading] = useState<boolean>(false);

  const { getRootProps, getInputProps } = useDropzone({
    accept:{ "application/pdf":[]},
    onDrop: async (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (file) {
        setLoading(true);
        try {
          const extractedText = await extractTextFromPDF(file);
          const cards = await generateFlashcards(extractedText);
          setFlashcards(cards);
        } catch (error) {
          console.error("Error processing PDF:", error);
          setFlashcards(["Error extracting flashcards from PDF."]);
        } finally {
          setLoading(false);
        }
      }
    },
  });

  // Function to generate flashcards from topic input
  const handleGenerateFlashcards = async () => {
    if (!topic.trim()) {
      alert("Please enter a topic!");
      return;
    }

    setLoading(true);
    setFlashcards(["Generating flashcards..."]); // Temporary state

    try {
      const cards = await generateFlashcardsFromHuggingFace(topic);
      setFlashcards(cards);
    } catch (error) {
      console.error("Error generating flashcards:", error);
      setFlashcards(["Error generating flashcards."]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-gray-100 rounded-lg shadow-xl">
      <h2 className="text-3xl font-bold text-center mb-6">Flashcards</h2>

      {/* Input for topic-based flashcards */}
      <div className="mb-6 flex flex-col gap-4">
        <input
          type="text"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="Enter your Topic"
          className="w-full p-3 border rounded-lg shadow-sm focus:outline-none"
        />
        <Button
          className="w-full text-white py-2 rounded-lg"
          onClick={handleGenerateFlashcards}
          disabled={loading}
        >
          {loading ? "Generating..." : "Generate Card"}
        </Button>
      </div>

      {/* PDF Upload Section */}
      <div
        {...getRootProps()}
        className="mt-6 border-2 border-dashed border-gray-400 p-6 rounded-lg text-center cursor-pointer bg-white hover:bg-gray-200"
      >
        <input {...getInputProps()} />
        <p className="text-gray-700">
          Drag & drop a PDF file here, or click to select one
        </p>
      </div>

      {/* Display Flashcards */}
      <div className="mt-6 space-y-4">
        {flashcards.map((content, index) => (
          <Card key={index} title={`Flashcard ${index + 1}`}>
            <p>{content}</p>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Flashcards;

const extractTextFromPDF = async (file: File): Promise<string> => {
  const reader = new FileReader();

  return new Promise((resolve, reject) => {
    reader.onload = async () => {
      try {
        const typedArray = new Uint8Array(reader.result as ArrayBuffer);
        const pdf = await pdfjs.getDocument({ data: typedArray }).promise;

        let extractedText = "";
        for (let i = 1; i <= pdf.numPages; i++) {
          const page = await pdf.getPage(i);
          const textContent = await page.getTextContent();
          const pageText = textContent.items
            .map((item) => ("str" in item ? item.str : ""))
            .join(" ");
          extractedText += pageText + "\n";
        }

        resolve(extractedText);
      } catch (error) {
        reject("Error extracting text from PDF: " + error);
      }
    };

    reader.onerror = () => reject("Error reading PDF file");
    reader.readAsArrayBuffer(file);
  });
};

const generateFlashcards = async (text: string): Promise<string[]> => {
  // Try using Hugging Face for flashcards
  try {
    const apiFlashcards = await generateFlashcardsFromHuggingFace(text);
    if (apiFlashcards.length >= 5) return apiFlashcards;
  } catch (error) {
    console.error("Hugging Face API Error:", error);
  }

  // Fallback: Extract sentences manually if API fails
  const sentences = text.split(". ").map((s) => s.trim());
  return sentences.slice(0, 5); // Return the first 5 sentences as flashcards
};
