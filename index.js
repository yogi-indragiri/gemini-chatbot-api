import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { GoogleGenAI, HarmCategory, HarmBlockThreshold } from "@google/genai";

// Memuat environment variables dari file .env
dotenv.config();

// Menginisialisasi aplikasi Express
const app = express();
const PORT = process.env.PORT || 3000;

// Menginisialisasi client Gemini AI menggunakan API key
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// Variabel global untuk model Gemini default
const DEFAULT_MODEL = "gemini-2.5-flash-lite";

// Middleware: CORS, parsing JSON, dan serving static files (UI)
app.use(cors());
app.use(express.json());
app.use(express.static(".")); // Melayani index.html, style.css, script.js

// Endpoint percakapan multi-turn dengan Gemini AI
app.post("/api/chat", async (req, res) => {
    try {
        const { conversation } = req.body;

        // Validasi: conversation harus berupa array
        if (!Array.isArray(conversation)) {
            return res.status(400).json({ error: "conversation harus berupa array" });
        }

        // Mengubah setiap pesan ke format yang kompatibel dengan Gemini
        const contents = conversation.map((msg) => ({
            role: msg.role === "user" ? "user" : "model",
            parts: [{ text: msg.text }],
        }));

        // Mengirim pesan ke Gemini dengan konfigurasi
        const response = await ai.models.generateContent({
            model: DEFAULT_MODEL,
            contents,
            config: {
                temperature: 0.7,
                systemInstruction: `Anda adalah "MediChat", asisten AI yang HANYA memiliki pengetahuan di bidang KESEHATAN, PENYAKIT, dan OBAT-OBATAN.
ATURAN KETAT:
1. Hanya jawab pertanyaan tentang: gejala penyakit, penjelasan kondisi medis, cara penggunaan obat (secara umum), tips gaya hidup sehat, nutrisi, dan pertolongan pertama.
2. JANGAN menjawab pertanyaan di luar topik kesehatan. Jika pengguna bertanya tentang: politik, teknologi, pemrograman, hiburan, sejarah, matematika, atau topik umum lainnya, Anda WAJIB menolak dengan kalimat: "Mohon maaf, saya adalah asisten spesialis kesehatan. Saya hanya dapat menjawab pertanyaan seputar kesehatan, penyakit, dan obat-obatan."
3. JANGAN melakukan percakapan santai (chit-chat) yang tidak relevan dengan kesehatan.
4. Gunakan Bahasa Indonesia yang formal, profesional, dan empatik.
5. DISCLAIMER WAJIB: Setiap jawaban yang memberikan saran atau penjelasan medis HARUS diakhiri dengan kalimat: "PENTING: Informasi ini hanya bersifat edukasi. Harap berkonsultasi dengan dokter profesional untuk diagnosa dan penanganan medis yang akurat."
6. FORMAT JAWABAN: Gunakan format bullet points (menggunakan simbol - atau *) untuk menjelaskan daftar gejala, langkah-langkah, atau informasi yang terdiri dari beberapa poin agar mudah dibaca. Gunakan baris baru antar poin agar rapi.`,
                safetySettings: [
                    {
                        // Allow all sexually explicit content
                        category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
                        threshold: HarmBlockThreshold.BLOCK_NONE,
                    },
                    {
                        // Block all hate speech
                        category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
                        threshold: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE,
                    },
                    {
                        // Allow medium+ dangerous content
                        category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
                        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
                    },
                    {
                        // Allow high harrassment
                        category: HarmCategory.HARM_CATEGORY_HARASSMENT,
                        threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
                    },
                ],
            },
        });

        // Mengembalikan respons AI sesuai spec: { result: "..." }
        res.json({ result: response.text });
    } catch (error) {
        console.error("Gemini API Error:", error); // Log full error
        res.status(500).json({ error: "Gagal menghasilkan respons dari Gemini", details: error.message });
    }
});

// Menjalankan server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
