import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { User, Wallet, ShieldCheck, LifeBuoy, Send, LogOut, Phone, Mail, CheckCircle } from 'lucide-react';

export const CustomerDashboard: React.FC = () => {
  const { currentUser, logout, tickets, createTicket, replyTicket, language } = useApp();

  const [newSubject, setNewSubject] = useState('');
  const [newCategory, setNewCategory] = useState<'Top-Up Issue' | 'Payment/Deposit' | 'ID Marketplace' | 'Account' | 'Other'>('Top-Up Issue');
  const [newPriority, setNewPriority] = useState<'Low' | 'Medium' | 'High'>('Medium');
  const [newMessage, setNewMessage] = useState('');
  const [selectedTicketId, setSelectedTicketId] = useState<string | null>(null);
  const [replyText, setReplyText] = useState('');

  if (!currentUser) {
    return (
      <div className="max-w-md mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-xl font-bold text-gray-800">Please Login to view your dashboard</h2>
      </div>
    );
  }

  const userTickets = tickets.filter(t => t.userId === currentUser.id);
  const activeTicket = tickets.find(t => t.id === selectedTicketId);

  const handleCreateTicket = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSubject || !newMessage) return;
    createTicket(newSubject, newCategory, newPriority, newMessage);
    setNewSubject('');
    setNewMessage('');
    alert('Support ticket created successfully!');
  };

  const handleReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText || !selectedTicketId) return;
    replyTicket(selectedTicketId, replyText);
    setReplyText('');
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 pb-24 md:pb-12 space-y-8">
      {/* Profile Overview Card */}
      <div className="bg-gradient-to-r from-emerald-800 to-teal-900 rounded-3xl p-6 md:p-10 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-5">
          <div className="w-20 h-20 rounded-2xl bg-white/20 border-2 border-white/30 flex items-center justify-center text-3xl font-black shadow-lg">
            {currentUser.name.charAt(0)}
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h2 className="text-2xl font-black">{currentUser.name}</h2>
              <span className="bg-green-400 text-emerald-950 text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase">
                {currentUser.role}
              </span>
            </div>
            <p className="text-emerald-200 text-xs flex items-center gap-2">
              <Mail className="w-3.5 h-3.5" /> {currentUser.email}
            </p>
            <p className="text-emerald-200 text-xs flex items-center gap-2">
              <Phone className="w-3.5 h-3.5" /> {currentUser.phone}
            </p>
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/20 text-center md:text-right space-y-1">
          <span className="text-xs text-emerald-200 font-semibold uppercase">Wallet Balance</span>
          <h3 className="text-3xl font-black text-green-300">৳{currentUser.walletBalance} BDT</h3>
          <button
            onClick={logout}
            className="mt-2 text-xs bg-red-500/80 hover:bg-red-600 text-white px-4 py-1.5 rounded-xl font-bold transition flex items-center gap-1 mx-auto md:ml-auto md:mr-0"
          >
            <LogOut className="w-3.5 h-3.5" /> Logout
          </button>
        </div>
      </div>

      {/* Customer Support & Tickets Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Create Ticket Form */}
        <div className="bg-white rounded-3xl p-6 md:p-8 border border-emerald-100 shadow-sm space-y-6">
          <h3 className="text-lg font-black text-gray-900 flex items-center gap-2">
            <LifeBuoy className="w-5 h-5 text-emerald-600" />
            <span>Create Support Ticket</span>
          </h3>

          <form onSubmit={handleCreateTicket} className="space-y-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-700">Subject</label>
              <input
                type="text"
                required
                placeholder="e.g. Diamond not received for Order #89214"
                value={newSubject}
                onChange={(e) => setNewSubject(e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-emerald-600 font-medium"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-700">Category</label>
                <select
                  value={newCategory}
                  onChange={(e: any) => setNewCategory(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-emerald-600 font-medium"
                >
                  <option value="Top-Up Issue">Top-Up Issue</option>
                  <option value="Payment/Deposit">Payment/Deposit</option>
                  <option value="ID Marketplace">ID Marketplace</option>
                  <option value="Account">Account</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-700">Priority</label>
                <select
                  value={newPriority}
                  onChange={(e: any) => setNewPriority(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-emerald-600 font-medium"
                >
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-700">Describe Issue</label>
              <textarea
                rows={3}
                required
                placeholder="Explain your problem..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-emerald-600 font-medium"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 rounded-2xl shadow transition"
            >
              Submit Ticket
            </button>
          </form>
        </div>

        {/* Tickets List & Chat */}
        <div className="md:col-span-2 bg-white rounded-3xl p-6 md:p-8 border border-emerald-100 shadow-sm space-y-6">
          <h3 className="text-lg font-black text-gray-900">Support Tickets & Replies</h3>

          {userTickets.length === 0 ? (
            <p className="text-xs text-gray-500 text-center py-8">No support tickets submitted yet.</p>
          ) : (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {userTickets.map((tic) => (
                  <div
                    key={tic.id}
                    onClick={() => setSelectedTicketId(tic.id)}
                    className={`p-4 rounded-2xl border-2 cursor-pointer transition ${
                      selectedTicketId === tic.id ? 'border-emerald-600 bg-emerald-50/50' : 'border-gray-200 hover:border-emerald-300'
                    }`}
                  >
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-xs font-bold text-emerald-800">{tic.category}</span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                        tic.status === 'Resolved' ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'
                      }`}>
                        {tic.status}
                      </span>
                    </div>
                    <h4 className="font-bold text-gray-900 text-sm truncate">{tic.subject}</h4>
                    <p className="text-[11px] text-gray-500 mt-2">{new Date(tic.createdAt).toLocaleString()}</p>
                  </div>
                ))}
              </div>

              {/* Active Ticket Chat Thread */}
              {activeTicket && (
                <div className="bg-gray-50 border border-gray-200 rounded-2xl p-5 space-y-4">
                  <div className="flex justify-between items-center border-b border-gray-200 pb-3">
                    <div>
                      <h4 className="font-bold text-gray-900 text-sm">{activeTicket.subject}</h4>
                      <span className="text-xs text-gray-500">Ticket ID: {activeTicket.id}</span>
                    </div>
                    <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full">
                      {activeTicket.status}
                    </span>
                  </div>

                  <div className="space-y-3 max-h-60 overflow-y-auto pr-2">
                    {activeTicket.messages.map((msg) => (
                      <div
                        key={msg.id}
                        className={`p-3 rounded-2xl text-xs space-y-1 max-w-lg ${
                          msg.sender === 'admin'
                            ? 'bg-emerald-600 text-white ml-auto'
                            : 'bg-white border border-gray-200 text-gray-800 mr-auto'
                        }`}
                      >
                        <div className="flex justify-between font-bold text-[10px] opacity-80">
                          <span>{msg.senderName}</span>
                          <span>{new Date(msg.createdAt).toLocaleTimeString()}</span>
                        </div>
                        <p>{msg.message}</p>
                      </div>
                    ))}
                  </div>

                  <form onSubmit={handleReply} className="flex gap-2 pt-2">
                    <input
                      type="text"
                      placeholder="Type your reply..."
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      className="flex-1 bg-white border border-gray-300 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-emerald-600 font-medium"
                    />
                    <button
                      type="submit"
                      className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2 rounded-xl font-bold text-sm transition flex items-center gap-1"
                    >
                      <Send className="w-4 h-4" />
                      <span>Send</span>
                    </button>
                  </form>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
