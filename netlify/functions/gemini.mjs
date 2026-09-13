import { GoogleGenAI } from '@google/genai'

const ai = new GoogleGenAI({})

const SYSTEM_CONTEXT = `
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
`

export default async (req) => {
  if (req.method !== 'POST') {
    return Response.json({ error: 'Method Not Allowed' }, { status: 405 })
  }

  try {
    const { message } = await req.json()

    if (!message) {
      return Response.json({ error: 'Message is required' }, { status: 400 })
    }

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: message,
      config: {
        systemInstruction: SYSTEM_CONTEXT,
      },
    })

    return Response.json({ reply: response.text })
  } catch (error) {
    console.error('Function Error:', error)
    return Response.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
