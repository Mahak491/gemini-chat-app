export default {
  cors: {
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"]
  },
  server: {
    port: process.env.PORT || 5000
  },
  gemini: {
    model: "gemini-2.5-flash"
  }
};