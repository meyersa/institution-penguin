// TODO: Stub for function that submits score
export async function submitScore(score, gameName) {
    // Validate incoming fields
    if (Number(score) <= 0) {
      throw new Error("Score is not valid")

    }
    if (String(gameName) == null) {
      throw new Error("Name is not valid") 

    }
    
    const response = await fetch("/api/write/score", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ score: score, gameName: gameName })
    });
  
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error("Failed to upload score", errorData);
    }
}