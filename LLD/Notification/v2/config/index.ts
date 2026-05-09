
export const config = {
    sendgrid: {
        apiKey: process.env.SENDGRID_API_KEY || "",
        fromEmail: process.env.FROM_EMAIL || "noreply@app.com",
    },
    twilio: {
        accountSid: process.env.TWILIO_ACCOUNT_SID || "",
        authToken: process.env.TWILIO_AUTH_TOKEN || "",
        fromNumber: process.env.TWILIO_FROM_NUMBER || "",
    },
    whatsapp: {
        apiUrl: process.env.WHATSAPP_API_URL || "",
        apiKey: process.env.WHATSAPP_API_KEY || "",
        fromNumber: process.env.WHATSAPP_FROM_NUMBER || "",
    },
}