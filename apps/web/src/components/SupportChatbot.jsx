import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send } from "lucide-react";
import { Button, Input } from "@nathanpass/ui";
import faq from "./support-faq.json";
import levenshtein from "fast-levenshtein";

const MOCK_BOT_RESPONSE = [
  "Olá! Como posso ajudar você hoje?",
  "Para dúvidas sobre lançamentos financeiros, clique na aba Financeiro.",
  "Se precisar cadastrar um cliente, use a aba Clientes.",
  "Em breve, nosso suporte IA será ainda mais inteligente!"
];

function findFaqAnswer(userInput) {
  const input = userInput.toLowerCase();
  let best = { dist: Infinity, answer: null };
  for (const item of faq) {
    const q = item.question.toLowerCase();
    const dist = levenshtein.get(input, q);
    if (dist < best.dist) {
      best = { dist, answer: item.answer };
    }
    // Busca por palavras-chave (fallback)
    if (input.includes(q) || q.includes(input)) return item.answer;
    const inputWords = input.split(/\s+/);
    if (inputWords.some(word => q.includes(word))) return item.answer;
  }
  // Se a distância for razoável (ex: até 12), retorna a resposta
  if (best.dist <= 12) return best.answer;
  return null;
}

export default function SupportChatbot({ context = "" }) {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: "bot", text: "Olá! Sou o assistente virtual. Como posso ajudar?" }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const chatRef = useRef(null);

  useEffect(() => {
    if (open && chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages, open]);

  async function sendMessage(e) {
    e.preventDefault();
    if (!input.trim()) return;
    const userMsg = { from: "user", text: input };
    setMessages((msgs) => [...msgs, userMsg]);
    setInput("");
    setLoading(true);
    setTimeout(() => {
      let botText = findFaqAnswer(userMsg.text);
      if (!botText) {
        // Contexto extra se não encontrar na FAQ
        if (context.includes("merchant")) {
          botText = "[Painel do Comerciante] " + MOCK_BOT_RESPONSE[Math.floor(Math.random() * MOCK_BOT_RESPONSE.length)];
        } else if (context.includes("wellness")) {
          botText = "[Portal do Colaborador] Para agendar consultas, clique em Parceiros ou Minhas Consultas. " + MOCK_BOT_RESPONSE[Math.floor(Math.random() * MOCK_BOT_RESPONSE.length)];
        } else if (context.includes("dashboard")) {
          botText = "[Dashboard] " + MOCK_BOT_RESPONSE[Math.floor(Math.random() * MOCK_BOT_RESPONSE.length)];
        } else {
          botText = MOCK_BOT_RESPONSE[Math.floor(Math.random() * MOCK_BOT_RESPONSE.length)];
        }
      }
      const botMsg = {
        from: "bot",
        text: botText
      };
      setMessages((msgs) => [...msgs, botMsg]);
      setLoading(false);
    }, 900);
    // Para integração real, troque o setTimeout por chamada à API
  }

  return (
    <>
      {/* Botão flutuante */}
      {!open && (
        <button
          className="fixed bottom-6 right-6 z-50 bg-primary text-white rounded-full p-4 shadow-lg hover:bg-primary/90 transition"
          onClick={() => setOpen(true)}
          aria-label="Abrir chat de suporte"
        >
          <MessageCircle className="w-6 h-6" />
        </button>
      )}
      {/* Modal de chat */}
      {open && (
        <div className="fixed bottom-6 right-6 z-50 w-80 max-w-[95vw] bg-white rounded-xl shadow-2xl flex flex-col border border-primary/20">
          <div className="flex items-center justify-between p-4 border-b">
            <span className="font-bold text-primary">Suporte IA</span>
            <button onClick={() => setOpen(false)} className="text-gray-400 hover:text-gray-600"><X className="w-5 h-5" /></button>
          </div>
          <div ref={chatRef} className="flex-1 overflow-y-auto p-4 space-y-2 bg-primary/5" style={{ maxHeight: 320 }}>
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.from === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`px-3 py-2 rounded-lg text-sm max-w-[80%] ${msg.from === "user" ? "bg-primary text-white" : "bg-white border"}`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start"><div className="px-3 py-2 rounded-lg text-sm bg-white border animate-pulse">Digitando...</div></div>
            )}
          </div>
          <form onSubmit={sendMessage} className="flex items-center gap-2 p-3 border-t bg-white">
            <Input
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Digite sua dúvida..."
              className="flex-1"
              disabled={loading}
              autoFocus
            />
            <Button type="submit" size="icon" disabled={loading || !input.trim()} className="bg-primary text-white">
              <Send className="w-4 h-4" />
            </Button>
          </form>
        </div>
      )}
    </>
  );
} 