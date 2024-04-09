// TODO: Stub for function that submits score
export async function submitScore(score, gameName) {
    const response = await fetch("/api/write/score", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ score: score, gameName: "flappypenguin" })
    });
  
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error("Failed to upload score", errorData);
    }
}