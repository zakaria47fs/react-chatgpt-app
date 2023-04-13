const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const { Configuration, OpenAIApi } = require("openai");

const config = new Configuration({
    apiKey: "",
})

const openai = new OpenAIApi(config);

// setup Server
const app = express();
app.use(bodyParser.json());
app.use(cors())

// endpoint for ChatGpt
app.post("/chat", async (req, res) => {
    const { input } = req.body;
    const completion = await openai.createCompletion({
        model: 'text-davinci-003',
        prompt: input,
        temperature: 0,
        max_tokens: 50,
    });
    console.log(`User: ${input}`);
    const answer = completion.data.choices[0].text;
    res.send(answer);
    console.log(`Bot: ${answer}`)
})

const port = 8080;
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
