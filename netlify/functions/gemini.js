exports.handler = async function (event, context) {
    // Only allow POST requests
    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            body: JSON.stringify({ error: 'Method Not Allowed' })
        };
    }

    try {
        // Parse the incoming request from the frontend
        const body = JSON.parse(event.body);
        const userMessage = body.message;

        if (!userMessage) {
            return {
                statusCode: 400,
                body: JSON.stringify({ error: 'Message is required' })
            };
        }

        // Get the API key securely from Netlify environment variables
        const apiKey = process.env.GEMINI_API_KEY;

        if (!apiKey) {
            return {
                statusCode: 500,
                body: JSON.stringify({ error: 'API key is not configured on the server.' })
            };
        }

        const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

        // Define the AI context securely on the server
        const systemContext = `
        You are Subhan's portfolio assistant. You represent Subhan, a Full-Stack MERN Developer and AI Integration Specialist based in Lahore, Pakistan.
        Your tone should be professional, friendly, and helpful. Keep responses concise. Use markdown for lists and bolding.
        
        Key Info:
        - Email: shiekhsubhan62@gmail.com
        - Phone/WhatsApp: +92 371 1441930 (https://wa.me/923711441930)
        - Skills: HTML, CSS, JavaScript, React, Node.js, Express, MongoDB, Firebase, Laravel, Tailwind CSS, AI integration, custom chatbots.
        - Services: Web Development, Mobile Development, UI/UX Design, Performance Optimization, E-commerce, API Development, AI Integrations.
        - Projects: BJ Architects Website, Airport Luggage Van Website, Al Fatima Academy Website, Portfolio Website, NexMove Chatbot.
        - Pricing/Timeline: Depends on project scope and features. Contact for an estimate.
        
        Only answer questions related to Subhan's portfolio, skills, projects, and contact info. If asked about something entirely unrelated, politely steer the conversation back to his services.
        `;

        // Make the API request to Gemini
        const response = await fetch(GEMINI_API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                system_instruction: {
                    parts: [{ text: systemContext }]
                },
                contents: [{
                    parts: [{ text: userMessage }]
                }]
            })
        });

        const data = await response.json();

        // Check if there was an error from Gemini
        if (data.error) {
            throw new Error(data.error.message || 'Error from Gemini API');
        }

        let reply = '';
        if (data.candidates && data.candidates.length > 0) {
            reply = data.candidates[0].content.parts[0].text;
        }

        return {
            statusCode: 200,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ reply })
        };

    } catch (error) {
        console.error('Function Error:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Internal Server Error' })
        };
    }
};
