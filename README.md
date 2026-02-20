# MediChat - Asisten Kesehatan AI

MediChat adalah aplikasi chatbot spesialis kesehatan yang dikembangkan menggunakan **Google Gemini AI**. Proyek ini merupakan aplikasi latihan untuk **Final Project Hacktiv8: Maju Bareng AI for IT Professional**.

## 🌟 Fitur Utama

- **Spesialis Kesehatan**: AI dikonfigurasi secara ketat untuk hanya menjawab pertanyaan seputar kesehatan, penyakit, obat-obatan, dan gaya hidup sehat.
- **Multi-turn Conversation**: Mendukung percakapan mengalir dengan konteks yang terjaga.
- **Safety Settings**: Dilengkapi dengan konfigurasi keamanan untuk memfilter konten berbahaya sesuai kebijakan platform.
- **Formatting Rapi**: Jawaban AI disajikan dalam format *bullet points* untuk memudahkan pembacaan informasi medis.
- **Antarmuka Glassmorphism**: UI yang modern dan responsif dengan estetika premium.

## 🛠️ Teknologi yang Digunakan

- **Backend**: Node.js, Express.js
- **AI Engine**: @google/genai (Gemini AI SDK)
- **Frontend**: HTML5, Vanilla CSS (Glassmorphism), JavaScript (Fetch API)
- **Environment**: Dotenv for secret management

## 🚀 Cara Menjalankan Proyek

### 1. Prasyarat

Pastikan Anda sudah menginstal:
- [Node.js](https://nodejs.org/) (versi terbaru direkomendasikan)
- [NPM](https://www.npmjs.com/)

### 2. Persiapan API Key

1. Kunjungi [Google AI Studio](https://aistudio.google.com/).
2. Buat API Key untuk project Anda.

### 3. Instalasi

Clone repository ini dan masuk ke direktori proyek:

```bash
cd gemini-chatbot-api
npm install
```

### 4. Konfigurasi Environment

Buat file `.env` di root direktori dan tambahkan API Key Anda:

```env
PORT=3000
GEMINI_API_KEY=YOUR_GEMINI_API_KEY_HERE
```

### 5. Menjalankan Aplikasi

Jalankan server pengembangan:

```bash
node index.js
```

Aplikasi akan berjalan di `http://localhost:3000`.

## 🛡️ Aturan Penggunaan (System Instructions)

Asisten ini telah diprogram dengan aturan ketat:
1. Hanya menjawab topik kesehatan.
2. Menolak pertanyaan di luar topik (politik, teknologi, dll).
3. Memberikan disclaimer medis di setiap jawaban penting.

## 📝 Catatan Proyek

Proyek ini dibuat sebagai bagian dari pemenuhan tugas **Maju Bareng AI for IT Professional** di Hacktiv8.

---
**PENTING**: Informasi dari AI ini hanya bersifat edukasi. Selalu konsultasikan kondisi medis Anda dengan dokter profesional.
