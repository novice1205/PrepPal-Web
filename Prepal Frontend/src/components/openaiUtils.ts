export const generateFlashcardsFromHuggingFace = async (topic: string): Promise<string[]> => {
  try {
    const response = await fetch(
      "https://api-inference.huggingface.co/models/tiiuae/falcon-7b-instruct", // Changed model
      {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${import.meta.env.HUGGING_FACE}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          inputs: `Create 5 educational flashcards about "${topic}". Each flashcard should be on a new line and contain a key fact.`,
          parameters: { max_new_tokens: 250 }, // Allow longer output
        }),
      }
    );

    const data = await response.json();
    console.log("API Response:", data);

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} - ${JSON.stringify(data)}`);
    }

    // Extract and structure response
    const text = data?.[0]?.generated_text || data?.[0]?.summary_text || "";
    if (!text) throw new Error("No meaningful response received.");

    // Process text into flashcards
    const flashcards = text
      .split(/\n/)
      .map((line: string) => line.replace(/^\d+\.\s*/, "").trim()) // Remove numbering
      .filter((line: string) => line.length > 5) // Remove short/empty lines
      .slice(0, 5); // Ensure exactly 5 flashcards

    return flashcards;
  } catch (error) {
    console.error("Hugging Face API Error:", error);
    return ["Error generating flashcards."];
  }
};
