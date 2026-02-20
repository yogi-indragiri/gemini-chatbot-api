const chatForm = document.getElementById("chat-form");
const userInput = document.getElementById("user-input");
const chatBox = document.getElementById("chat-box");

// Simpan riwayat percakapan di client-side
let conversationHistory = [];

/**
 * Menambahkan pesan ke dalam chat box di DOM
 * @param {string} role - 'user' atau 'bot'
 * @param {string} text - Isi pesan
 * @returns {HTMLElement} Elemen pesan yang baru dibuat
 */
function appendMessage(role, text) {
  const messageDiv = document.createElement("div");
  messageDiv.classList.add("message", role);
  messageDiv.textContent = text;
  chatBox.appendChild(messageDiv);

  // Auto-scroll ke bawah
  chatBox.scrollTop = chatBox.scrollHeight;

  return messageDiv;
}

chatForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const message = userInput.value.trim();
  if (!message) return;

  // 1. Tambahkan pesan user ke chat box dan riwayat
  appendMessage("user", message);
  conversationHistory.push({ role: "user", text: message });

  // Bersihkan input
  userInput.value = "";

  // 2. Tampilkan pesan "Sedang berpikir..." sementara
  const thinkingMessage = appendMessage("bot", "Sedang berpikir...");

  try {
    // 3. Kirim request ke backend
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        conversation: conversationHistory,
      }),
    });

    if (!response.ok) {
      throw new Error("Server error");
    }

    const data = await response.json();

    // 4. Update riwayat dan ganti text "Sedang berpikir..." dengan jawaban asli
    if (data && data.result) {
      thinkingMessage.textContent = data.result;
      conversationHistory.push({ role: "model", text: data.result });
    } else {
      thinkingMessage.textContent = "Maaf, tidak ada tanggapan yang diterima.";
    }
  } catch (error) {
    console.error("Fetch Error:", error);
    thinkingMessage.textContent = "Gagal mendapatkan tanggapan dari server.";
  }
});
