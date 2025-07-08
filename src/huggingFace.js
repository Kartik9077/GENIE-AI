import { prevUser } from "./context/UserContext";


export async function query(prompt) {
  const response = await fetch(
    "https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-xl-base-1.0",
    {
      
      headers: {
        Authorization: "Bearer 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",
        "Content-Type": "application/json",
      },
	  method: "POST",
      body: JSON.stringify({
        inputs:prevUser.prompt
      }),
    }
  );
  const result = await response.blob(); // 👈 you get a Blob directly here
  return result;
}
