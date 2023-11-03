require("dotenv").config();
const { Configuration, OpenAIApi } = require("openai");

async function callChatGPT(prompt) {
  const configuration = new Configuration({
    apiKey: process.env.OpenAI_API_KEY,
  });

  try {
    const openai = new OpenAIApi(configuration);

    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: "Hello world" }],
    });
    return response.data.choices[0].messages;
  } catch (error) {
    console.error("Error calling ChatGPT API:", error);
    return null;
  }
}

module.exports = { callChatGPT };