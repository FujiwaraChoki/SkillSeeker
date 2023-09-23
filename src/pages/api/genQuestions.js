const handler = async (req, res) => {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed, please use POST' });
    }

    const { jobTitle, qualities, apiKey } = req.body;

    console.log('Creating questions for job title:', jobTitle);

    // Call your ChatGPT API here to generate questions
    const prompt = `Generate questions for a Job Interview.We want to know if the candidate is a good fit for the job.
        Generate Questions based on these qualities: ${qualities.join(', ')}
        We are currently hiring for the position of ${jobTitle}.

        Please send it to me in pure text with just the array, no comment from your side.

        Give me the questions in a JSON Array.`;
    try {
        const gptResponse = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`,
            },
            body: JSON.stringify({
                messages: [{ "role": "system", "content": "You are an H.R. Recruiter for the position" + jobTitle }, { "role": "user", "content": prompt }],
                model: 'gpt-3.5-turbo'
            }),
        }).then((response) => response.json());
        console.log(gptResponse);
        console.log(gptResponse.choices[0].message.content);

        try {
            const questions = gptResponse.choices[0].message.content.map((questionObj) => questionObj.question);
            return res.status(200).json(questions);
        } catch (error) {
            console.log(error);
            const questions = JSON.parse(gptResponse.choices[0].message.content).map((questionObj) => questionObj.question);
            return res.status(200).json(questions);
        }
    } catch (error) {
        if (error.response) {
            console.log(error.response.status);
            return console.log(error.response.data);
        } else {
            return console.log(error.message);
        }
    }
};

export default handler;
