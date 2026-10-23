import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ShieldCheck, Search, Filter, Plus, Eye, ShoppingCart, CheckCircle, AlertCircle, X } from 'lucide-react';
import { MarketplaceListing } from '../types';

export const Marketplace: React.FC = () => {
  const { listings, currentUser, createListing, setAuthModalOpen, language } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRank, setSelectedRank] = useState('All');
  const [selectedListing, setSelectedListing] = useState<MarketplaceListing | null>(null);
  const [isSellModalOpen, setIsSellModalOpen] = useState(false);
  const [buySuccess, setBuySuccess] = useState(false);

  // New Listing Form State
  const [newTitle, setNewTitle] = useState('');
  const [newLevel, setNewLevel] = useState(65);
  const [newRank, setNewRank] = useState('Heroic');
  const [newSeason, setNewSeason] = useState('Season 48');
  const [newPrice, setNewPrice] = useState(3500);
  const [newDesc, setNewDesc] = useState('');
  const [newFeatures, setNewFeatures] = useState('EVO Gun, Rare Bundle, 20+ Emotes');

  const filteredListings = listings.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || item.referenceNo.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRank = selectedRank === 'All' || item.rank === selectedRank;
    return matchesSearch && matchesRank && item.status === 'Active';
  });

  const handleSellSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) {
      setAuthModalOpen(true, 'login');
      return;
    }
    createListing({
      title: newTitle,
      sellerId: currentUser.id,
      sellerName: currentUser.name,
      sellerVerified: true,
      level: Number(newLevel),
      rank: newRank,
      season: newSeason,
      price: Number(newPrice),
      description: newDesc,
      images: ['https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=800&q=80'],
      features: newFeatures.split(',').map(s => s.trim()),
    });
    setIsSellModalOpen(false);
    alert('Account submitted successfully! It will be reviewed and published by admin.');
  };

  const handleBuyAccount = (listing: MarketplaceListing) => {
    if (!currentUser) {
      setAuthModalOpen(true, 'login');
      return;
    }
    setBuySuccess(true);
    setTimeout(() => {
      setBuySuccess(false);
      setSelectedListing(null);
      alert(`Purchase request for ${listing.referenceNo} submitted successfully! Our support team will contact you for secure Gmail transfer.`);
    }, 1500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 pb-24 md:pb-12 space-y-8">
      {/* Marketplace Header */}
      <div className="bg-gradient-to-r from-teal-800 to-emerald-900 rounded-3xl p-6 md:p-10 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-3 text-center md:text-left">
          <span className="bg-white/20 text-green-300 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
            {language === 'bn' ? 'সুরক্ষিত অ্যাকাউন্ট মার্কেটপ্লেস' : 'Secure Account Marketplace'}
          </span>
          <h2 className="text-2xl md:text-4xl font-black tracking-tight">The Vault — Free Fire ID Market</h2>
          <p className="text-emerald-100 text-xs md:text-sm max-w-xl">
            Browse verified Free Fire accounts with high levels, rare EVO skins, Criminal bundles, and instant Gmail transfer with 100% security.
          </p>
        </div>
        <button
          onClick={() => {
            if (!currentUser) setAuthModalOpen(true, 'login');
            else setIsSellModalOpen(true);
          }}
          className="bg-white text-emerald-950 font-bold px-6 py-3.5 rounded-2xl shadow-lg hover:bg-emerald-50 transition flex items-center gap-2 shrink-0"
        >
          <Plus className="w-5 h-5 text-emerald-600" />
          <span>{language === 'bn' ? 'আপনার আইডি বিক্রি করুন' : 'Sell Your Account'}</span>
        </button>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-white p-4 rounded-2xl border border-emerald-100 shadow-sm">
        <div className="relative w-full md:w-96">
          <Search className="w-5 h-5 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by title or reference # (e.g. FFID-5092)"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-11 pr-4 py-2.5 text-sm focus:outline-none focus:border-emerald-600 font-medium"
          />
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
          <Filter className="w-4 h-4 text-gray-500 shrink-0" />
          {['All', 'Grandmaster', 'Heroic'].map((rank) => (
            <button
              key={rank}
              onClick={() => setSelectedRank(rank)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap ${
                selectedRank === rank ? 'bg-emerald-600 text-white shadow' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {rank}
            </button>
          ))}
        </div>
      </div>

      {/* Listings Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredListings.map((listing) => (
          <div
            key={listing.id}
            className="bg-white rounded-3xl border border-emerald-100 shadow-md hover:shadow-xl transition overflow-hidden flex flex-col justify-between group"
          >
            <div>
              <div className="relative h-52 overflow-hidden bg-gray-900">
                <img
                  src={listing.images[0]}
                  alt={listing.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500 opacity-90"
                />
                <div className="absolute top-3 left-3 bg-emerald-600 text-white text-xs font-black px-3 py-1 rounded-xl shadow-md">
                  {listing.referenceNo}
                </div>
                <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-md text-white text-xs font-bold px-3 py-1 rounded-xl">
                  Level {listing.level}
                </div>
                <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-md text-green-300 text-[11px] font-bold px-3 py-1 rounded-lg">
                  {listing.rank} • {listing.season}
                </div>
              </div>

              <div className="p-5 space-y-3">
                <h3 className="font-black text-gray-900 text-base line-clamp-2 leading-snug">
                  {listing.title}
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {listing.features.slice(0, 3).map((feat, idx) => (
                    <span key={idx} className="bg-emerald-50 text-emerald-800 text-[10px] font-bold px-2.5 py-1 rounded-md border border-emerald-200">
                      {feat}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-5 pt-0 flex items-center justify-between border-t border-gray-100 mt-4">
              <div>
                <p className="text-[10px] text-gray-500 font-semibold uppercase">Price</p>
                <p className="text-xl font-black text-emerald-700">৳{listing.price.toLocaleString()} BDT</p>
              </div>
              <button
                onClick={() => setSelectedListing(listing)}
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-5 py-2.5 rounded-xl text-sm shadow transition flex items-center gap-1.5"
              >
                <Eye className="w-4 h-4" />
                <span>View Details</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Listing Details Modal */}
      {selectedListing && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 md:p-8 space-y-6 relative shadow-2xl">
            <button
              onClick={() => setSelectedListing(null)}
              className="absolute top-6 right-6 p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 transition"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-2">
              <span className="bg-emerald-100 text-emerald-800 font-bold px-3 py-1 rounded-full text-xs">
                {selectedListing.referenceNo}
              </span>
              <h2 className="text-xl md:text-2xl font-black text-gray-900">{selectedListing.title}</h2>
            </div>

            <div className="grid grid-cols-2 gap-4 bg-gray-50 p-4 rounded-2xl border border-gray-200 text-sm">
              <div>
                <span className="text-gray-500 text-xs block">Account Level</span>
                <span className="font-bold text-gray-900">Level {selectedListing.level}</span>
              </div>
              <div>
                <span className="text-gray-500 text-xs block">Rank & Season</span>
                <span className="font-bold text-gray-900">{selectedListing.rank} ({selectedListing.season})</span>
              </div>
              <div>
                <span className="text-gray-500 text-xs block">Seller</span>
                <span className="font-bold text-emerald-700 flex items-center gap-1">
                  {selectedListing.sellerName} <ShieldCheck className="w-4 h-4 text-emerald-600" />
                </span>
              </div>
              <div>
                <span className="text-gray-500 text-xs block">Price</span>
                <span className="font-bold text-emerald-700 text-base">৳{selectedListing.price.toLocaleString()} BDT</span>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="font-bold text-gray-900 text-sm">Account Description</h4>
              <p className="text-sm text-gray-600 leading-relaxed bg-gray-50 p-4 rounded-xl border border-gray-200">
                {selectedListing.description}
              </p>
            </div>

            <div className="space-y-2">
              <h4 className="font-bold text-gray-900 text-sm">Key Features & Bundles</h4>
              <div className="flex flex-wrap gap-2">
                {selectedListing.features.map((feat, idx) => (
                  <span key={idx} className="bg-emerald-50 text-emerald-800 text-xs font-bold px-3 py-1.5 rounded-lg border border-emerald-200">
                    ✓ {feat}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 text-xs text-amber-800 flex items-start gap-2">
              <AlertCircle className="w-5 h-5 text-amber-600 shrink-0" />
              <span>
                Account trading is processed via secure Gmail/Facebook transfer with administrator escrow protection. Never share raw credentials outside official channels.
              </span>
            </div>

            <div className="pt-2 flex gap-4">
              <button
                onClick={() => handleBuyAccount(selectedListing)}
                disabled={buySuccess}
                className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-black py-4 rounded-2xl shadow-lg transition flex items-center justify-center gap-2"
              >
                <ShoppingCart className="w-5 h-5" />
                <span>{buySuccess ? 'Processing Order...' : `Buy Now for ৳${selectedListing.price.toLocaleString()}`}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Sell Account Modal */}
      {isSellModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full max-h-[90vh] overflow-y-auto p-6 md:p-8 space-y-6 relative shadow-2xl">
            <button
              onClick={() => setIsSellModalOpen(false)}
              className="absolute top-6 right-6 p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 transition"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-black text-gray-900">List Your Free Fire Account</h3>

            <form onSubmit={handleSellSubmit} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-700">Listing Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Level 75 Max Account with Cobra MP40"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-emerald-600 font-medium"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-700">Account Level</label>
                  <input
                    type="number"
                    required
                    value={newLevel}
                    onChange={(e) => setNewLevel(Number(e.target.value))}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-emerald-600 font-medium"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-700">Price (BDT)</label>
                  <input
                    type="number"
                    required
                    value={newPrice}
                    onChange={(e) => setNewPrice(Number(e.target.value))}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-emerald-600 font-medium"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-700">Rank</label>
                  <select
                    value={newRank}
                    onChange={(e) => setNewRank(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-emerald-600 font-medium"
                  >
                    <option value="Grandmaster">Grandmaster</option>
                    <option value="Heroic">Heroic</option>
                    <option value="Diamond">Diamond</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-700">Season</label>
                  <input
                    type="text"
                    value={newSeason}
                    onChange={(e) => setNewSeason(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-emerald-600 font-medium"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-700">Features (comma separated)</label>
                <input
                  type="text"
                  value={newFeatures}
                  onChange={(e) => setNewFeatures(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-emerald-600 font-medium"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-700">Description</label>
                <textarea
                  rows={3}
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  placeholder="Describe account details..."
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-emerald-600 font-medium"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-black py-4 rounded-2xl shadow-lg transition"
              >
                Submit Listing for Approval
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
