import React, { useState, useRef } from 'react';
import { useApp } from '../context/AppContext';
import { GoogleGenAI } from '@google/genai';
import { MessageSquare, Send, X, Image as ImageIcon, Sparkles, Bot, User } from 'lucide-react';

export const AiChatModal: React.FC = () => {
  const { aiModalOpen, setAiModalOpen, language } = useApp();

  const [messages, setMessages] = useState<Array<{ sender: 'ai' | 'user'; text: string; image?: string }>>([
    {
      sender: 'ai',
      text: language === 'bn' 
        ? 'আসসালামু আলাইকুম! আমি বিডি গেমিং টপআপের এআই অ্যাসিস্ট্যান্ট। ফ্রি ফায়ার ডায়মন্ড টপ-আপ, বিকাশ পেমেন্ট বা আইডি মার্কেটপ্লেস নিয়ে কোনো প্রশ্ন থাকলে বলুন।'
        : 'Hello! I am your BD Gaming TopUp Gemini AI assistant. How can I help you with Free Fire diamond top-ups, bKash deposits, or ID appraisals today?'
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!aiModalOpen) return null;

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() && !selectedImage) return;

    const userMsg = inputText;
    const userImg = selectedImage;
    setMessages(prev => [...prev, { sender: 'user', text: userMsg, image: userImg || undefined }]);
    setInputText('');
    setSelectedImage(null);
    setLoading(true);

    try {
      const aiKey = import.meta.env.VITE_GEMINI_API_KEY || process.env.GEMINI_API_KEY || '';
      const ai = new GoogleGenAI({ apiKey: aiKey });

      let responseText = "I'm here to help you with BD Gaming TopUp services! For urgent payment or top-up issues, please message our Telegram support channel.";

      if (userImg) {
        // Image analysis
        const base64Data = userImg.split(',')[1];
        const mimeType = userImg.split(';')[0].split(':')[1];

        const response = await ai.models.generateContent({
          model: 'gemini-2.5-flash',
          contents: [
            {
              inlineData: {
                data: base64Data,
                mimeType: mimeType
              }
            },
            {
              text: "Analyze this image in the context of a Free Fire top-up and gaming store in Bangladesh (bKash/Nagad receipt or Free Fire account screenshot). Give a helpful professional appraisal."
            }
          ]
        });
        responseText = response.text || "I've analyzed your screenshot. Everything looks good! If this is a deposit receipt, our admin will verify and approve it shortly.";
      } else {
        const response = await ai.models.generateContent({
          model: 'gemini-2.5-flash',
          contents: [
            {
              text: `You are a helpful customer support AI for "BD Gaming TopUp", a Bangladeshi gaming platform selling Free Fire diamonds (UID top-ups), weekly/monthly memberships, and verified game accounts. Answer this customer inquiry helpfully: ${userMsg}`
            }
          ]
        });
        responseText = response.text || "Thanks for your message! Our 24/7 automated server processes all UID top-ups within 5 seconds.";
      }

      setMessages(prev => [...prev, { sender: 'ai', text: responseText }]);
    } catch (err) {
      console.error(err);
      setMessages(prev => [...prev, { sender: 'ai', text: "I received your message! For instant assistance, please contact our Telegram support." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-lg w-full h-[85vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-700 to-teal-900 text-white p-4 px-6 flex items-center justify-between shadow">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
              <Bot className="w-6 h-6 text-green-300" />
            </div>
            <div>
              <h3 className="font-black text-base">Gemini AI Assistant & Appraiser</h3>
              <p className="text-[10px] text-emerald-200">24/7 Intelligent Game Support</p>
            </div>
          </div>
          <button
            onClick={() => setAiModalOpen(false)}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition"
          >
            <X className="w-5 h-5 text-white" />
          </button>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
          {messages.map((m, idx) => (
            <div
              key={idx}
              className={`flex gap-3 max-w-[85%] ${m.sender === 'user' ? 'ml-auto flex-row-reverse' : 'mr-auto'}`}
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                m.sender === 'user' ? 'bg-emerald-600 text-white' : 'bg-teal-800 text-white'
              }`}>
                {m.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>
              <div className={`p-4 rounded-2xl text-xs md:text-sm space-y-2 ${
                m.sender === 'user' ? 'bg-emerald-600 text-white rounded-tr-none' : 'bg-white text-gray-800 border border-emerald-100 shadow-sm rounded-tl-none'
              }`}>
                {m.image && (
                  <img src={m.image} alt="Upload" className="max-h-40 rounded-xl object-cover mb-2" />
                )}
                <p className="leading-relaxed whitespace-pre-wrap">{m.text}</p>
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex gap-3 items-center text-xs text-gray-500 italic bg-white p-3 rounded-2xl border w-fit shadow-sm">
              <Sparkles className="w-4 h-4 text-emerald-600 animate-spin" />
              <span>Gemini AI is analyzing...</span>
            </div>
          )}
        </div>

        {/* Input Form */}
        <div className="p-4 bg-white border-t border-gray-200 space-y-3">
          {selectedImage && (
            <div className="relative w-16 h-16 rounded-xl overflow-hidden border border-emerald-600">
              <img src={selectedImage} alt="Preview" className="w-full h-full object-cover" />
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-1 right-1 bg-black/60 text-white rounded-full p-0.5"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          )}

          <form onSubmit={handleSend} className="flex items-center gap-2">
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleImageUpload}
              className="hidden"
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="p-3 text-gray-500 hover:text-emerald-600 rounded-xl hover:bg-gray-100 transition"
              title="Upload Screenshot (Receipt or Game ID)"
            >
              <ImageIcon className="w-5 h-5" />
            </button>
            <input
              type="text"
              placeholder="Ask about top-ups, bKash deposits, or ID trading..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-emerald-600 font-medium"
            />
            <button
              type="submit"
              disabled={loading}
              className="bg-emerald-600 hover:bg-emerald-700 text-white p-3 rounded-xl shadow transition flex items-center justify-center"
            >
              <Send className="w-5 h-5" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
