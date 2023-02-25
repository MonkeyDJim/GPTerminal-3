const axios = require("axios");

const sendMessageToChatGPT = async (message) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: "<YOUR_API_KEY>",
    },
  };

  try {
    const response = await axios.post(
      "https://api.openai.com/v1/engines/text-davinci-003/completions",
      {
        prompt: message,
        temperature: 0.5,
        max_tokens: 2048,
        frequency_penalty: 0,
        presence_penalty: 0,
      },
      config
    );

    if (response && response.data && response.data.choices.length > 0) {
      const chatGptResponse = response.data.choices[0].text.trim();
      return chatGptResponse;
    } else {
      console.error("La réponse de l'API n'est pas disponible ou incorrecte");
      return "La réponse de l'API n'est pas disponible ou incorrecte";
    }
  } catch (error) {
    console.error(
      "Erreur lors de la récupération de la réponse de l'API :",
      error
    );
    return "Erreur lors de la récupération de la réponse de l'API, vérifiez le code ereur.";
  }
};

const main = async () => {
  const inquirer = require("inquirer");
  console.log("Que puis-je pour vous ?");

  while (true) {
  const { message } = await inquirer.prompt([
    {
      type: "input",
      name: "message",
      message: "Vous: ",
    },
  ]);

  if (message.toLowerCase() === 'exit') {
    break;
  }

  const chatGptResponse = await sendMessageToChatGPT(message);
  console.log("ChatGPT:", chatGptResponse);
  }
};

main();