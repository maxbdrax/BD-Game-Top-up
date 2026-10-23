import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Settings, ShieldCheck, DollarSign, ClipboardList, CheckCircle2, XCircle, Plus, Trash2, Users, ShoppingBag, Lock, LogOut } from 'lucide-react';

export const AdminPanel: React.FC = () => {
  const { currentUser, orders, deposits, listings, packages, users, updateOrderStatus, updateDepositStatus, updateListingStatus, savePackage, deletePackage, settings, updateSettings, isAdminUnlocked, setAdminUnlocked, setActiveTab } = useApp();

  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState(false);
  const [activeSubTab, setActiveSubTab] = useState<'orders' | 'deposits' | 'packages' | 'users' | 'listings' | 'settings'>('orders');

  // New/Edit Package Modal State
  const [isPkgModalOpen, setIsPkgModalOpen] = useState(false);
  const [pkgId, setPkgId] = useState('');
  const [pkgName, setPkgName] = useState('');
  const [pkgDiamonds, setPkgDiamonds] = useState(100);
  const [pkgBonus, setPkgBonus] = useState(5);
  const [pkgPrice, setPkgPrice] = useState(72);
  const [pkgCategory, setPkgCategory] = useState<'uid' | 'weekly' | 'monthly' | 'levelup'>('uid');

  const handleUnlockAdmin = (e: React.FormEvent) => {
    e.preventDefault();
    // Secret admin PIN code
    if (pinInput === '7777' || pinInput === 'bdadmin2026') {
      setAdminUnlocked(true);
      setPinError(false);
    } else {
      setPinError(true);
    }
  };

  if (!isAdminUnlocked) {
    return (
      <div className="max-w-md mx-auto px-4 py-24">
        <div className="bg-white rounded-3xl p-8 border border-emerald-100 shadow-2xl text-center space-y-6">
          <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto shadow-inner border border-emerald-100">
            <Lock className="w-8 h-8" />
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-black text-gray-900">Admin Control Center</h2>
            <p className="text-xs text-gray-500">Enter secure admin passcode to proceed (Default PIN: 7777)</p>
          </div>

          {pinError && (
            <div className="bg-red-50 text-red-700 text-xs py-2.5 px-4 rounded-xl border border-red-200 font-bold">
              ভুল পিন কোড দেওয়া হয়েছে! (সঠিক পিন: 7777)
            </div>
          )}

          <form onSubmit={handleUnlockAdmin} className="space-y-4">
            <input
              type="password"
              required
              maxLength={8}
              placeholder="••••"
              value={pinInput}
              onChange={(e) => setPinInput(e.target.value)}
              className="w-full text-center tracking-widest text-2xl font-black bg-gray-50 border border-gray-300 rounded-2xl py-3.5 focus:outline-none focus:border-emerald-600"
            />
            <button
              type="submit"
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-black py-4 rounded-2xl shadow-lg shadow-emerald-600/30 transition text-base"
            >
              প্রবেশ করুন (Unlock Admin)
            </button>
          </form>
        </div>
      </div>
    );
  }

  const handleSavePkgSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await savePackage({
      id: pkgId || `pkg-${Date.now()}`,
      name: pkgName,
      diamonds: Number(pkgDiamonds),
      bonusDiamonds: Number(pkgBonus),
      price: Number(pkgPrice),
      category: pkgCategory,
      inStock: true,
      displayOrder: packages.length + 1,
    });
    setIsPkgModalOpen(false);
    setPkgId('');
    setPkgName('');
  };

  const totalRevenue = orders.filter(o => o.status === 'Completed').reduce((sum, o) => sum + o.price, 0);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 pb-24 md:pb-12 space-y-8">
      {/* Admin Header with Logout Lock */}
      <div className="bg-gradient-to-r from-emerald-900 via-teal-950 to-gray-900 rounded-3xl p-6 md:p-10 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center md:text-left">
          <div className="flex items-center gap-2 justify-center md:justify-start">
            <span className="bg-amber-500 text-white text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              Admin Master Panel
            </span>
            <span className="bg-green-500/20 text-green-300 text-[11px] font-bold px-3 py-1 rounded-full">
              Live Firebase DB
            </span>
          </div>
          <h2 className="text-2xl md:text-4xl font-black">BD Gaming TopUp Management</h2>
          <p className="text-emerald-200 text-xs md:text-sm">
            Manage diamond offers, approve Add Money requests, update bKash/Nagad/Rocket numbers, and monitor users.
          </p>
        </div>

        <div className="flex items-center gap-4">
          <div className="grid grid-cols-2 gap-3 bg-white/10 backdrop-blur-md p-3.5 rounded-2xl border border-white/20 text-center">
            <div>
              <span className="text-[10px] text-emerald-200 block uppercase">Revenue</span>
              <span className="text-lg font-black text-green-300">৳{totalRevenue.toLocaleString()}</span>
            </div>
            <div>
              <span className="text-[10px] text-emerald-200 block uppercase">Users</span>
              <span className="text-lg font-black text-cyan-300">{users.length}</span>
            </div>
          </div>

          <button
            onClick={() => setAdminUnlocked(false)}
            className="bg-red-500 hover:bg-red-600 text-white p-3.5 rounded-2xl shadow transition"
            title="Lock Admin Panel"
          >
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Admin Navigation SubTabs */}
      <div className="flex gap-2 border-b border-gray-200 overflow-x-auto pb-2">
        {[
          { id: 'orders', label: `📦 Top-Up Orders (${orders.length})` },
          { id: 'deposits', label: `💰 Deposit Requests (${deposits.filter(d => d.status === 'Pending').length})` },
          { id: 'packages', label: `💎 Diamond Offers (${packages.length})` },
          { id: 'users', label: `👥 All Users (${users.length})` },
          { id: 'listings', label: `🛡️ Marketplace (${listings.length})` },
          { id: 'settings', label: '⚙️ Merchant Numbers & Settings' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveSubTab(tab.id as any)}
            className={`px-5 py-3 rounded-2xl font-bold text-sm transition whitespace-nowrap shadow-sm ${
              activeSubTab === tab.id
                ? 'bg-emerald-600 text-white shadow-md'
                : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* SubTab 1: Orders Management */}
      {activeSubTab === 'orders' && (
        <div className="bg-white rounded-3xl p-6 border border-emerald-100 shadow-sm space-y-4 overflow-x-auto">
          <h3 className="text-lg font-black text-gray-900">Manage Customer Top-Up Orders</h3>
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-gray-200 text-xs font-bold text-gray-500 uppercase">
                <th className="pb-3">Order #</th>
                <th className="pb-3">Customer</th>
                <th className="pb-3">Package & UID</th>
                <th className="pb-3">Price</th>
                <th className="pb-3">Payment</th>
                <th className="pb-3">Status</th>
                <th className="pb-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 font-medium">
              {orders.map((ord) => (
                <tr key={ord.id} className="hover:bg-gray-50/50">
                  <td className="py-4 font-mono font-bold text-emerald-800">{ord.orderNumber}</td>
                  <td className="py-4 text-gray-900">{ord.userName}</td>
                  <td className="py-4">
                    <p className="font-bold">{ord.packageName}</p>
                    <p className="text-xs text-gray-500">UID: {ord.playerUid} ({ord.playerName})</p>
                  </td>
                  <td className="py-4 font-bold text-emerald-700">৳{ord.price}</td>
                  <td className="py-4 text-xs font-bold text-gray-600">{ord.paymentMethod}</td>
                  <td className="py-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                      ord.status === 'Completed' ? 'bg-green-100 text-green-800' :
                      ord.status === 'Processing' ? 'bg-blue-100 text-blue-800' : 'bg-amber-100 text-amber-800'
                    }`}>
                      {ord.status}
                    </span>
                  </td>
                  <td className="py-4 text-right space-x-2">
                    <button
                      onClick={() => updateOrderStatus(ord.id, 'Completed', 'Top-up successfully delivered.')}
                      className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded-lg text-xs font-bold transition shadow"
                    >
                      Complete
                    </button>
                    <button
                      onClick={() => updateOrderStatus(ord.id, 'Cancelled', 'Cancelled by admin.')}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg text-xs font-bold transition shadow"
                    >
                      Cancel
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* SubTab 2: Deposits Management (Approve/Reject Add Money) */}
      {activeSubTab === 'deposits' && (
        <div className="bg-white rounded-3xl p-6 border border-emerald-100 shadow-sm space-y-4 overflow-x-auto">
          <h3 className="text-lg font-black text-gray-900">Review & Approve / Reject Add Money Requests</h3>
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-gray-200 text-xs font-bold text-gray-500 uppercase">
                <th className="pb-3">User</th>
                <th className="pb-3">Method & Amount</th>
                <th className="pb-3">Sender & TrxID</th>
                <th className="pb-3">Status</th>
                <th className="pb-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 font-medium">
              {deposits.map((dep) => (
                <tr key={dep.id} className="hover:bg-gray-50/50">
                  <td className="py-4 text-gray-900 font-bold">{dep.userName}</td>
                  <td className="py-4">
                    <span className="font-bold text-emerald-700">{dep.paymentMethod}</span>
                    <p className="text-xs font-black">৳{dep.amount}</p>
                  </td>
                  <td className="py-4 font-mono text-xs">
                    <p>Phone: {dep.senderNumber}</p>
                    <p className="font-bold text-emerald-800">TrxID: {dep.transactionId}</p>
                  </td>
                  <td className="py-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                      dep.status === 'Approved' ? 'bg-green-100 text-green-800' :
                      dep.status === 'Rejected' ? 'bg-red-100 text-red-800' : 'bg-amber-100 text-amber-800'
                    }`}>
                      {dep.status}
                    </span>
                  </td>
                  <td className="py-4 text-right space-x-2">
                    {dep.status === 'Pending' && (
                      <>
                        <button
                          onClick={() => updateDepositStatus(dep.id, 'Approved', 'Verified with transaction log.')}
                          className="bg-emerald-600 hover:bg-emerald-700 text-white px-3.5 py-1.5 rounded-xl text-xs font-bold transition shadow"
                        >
                          Approve & Credit Wallet
                        </button>
                        <button
                          onClick={() => updateDepositStatus(dep.id, 'Rejected', 'Transaction ID not matched.')}
                          className="bg-red-500 hover:bg-red-600 text-white px-3.5 py-1.5 rounded-xl text-xs font-bold transition shadow"
                        >
                          Reject
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* SubTab 3: Diamond Packages / Offers Management */}
      {activeSubTab === 'packages' && (
        <div className="bg-white rounded-3xl p-6 border border-emerald-100 shadow-sm space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-black text-gray-900">Manage Diamond Offers & Packages</h3>
            <button
              onClick={() => {
                setPkgId('');
                setPkgName('');
                setPkgDiamonds(100);
                setPkgBonus(5);
                setPkgPrice(72);
                setIsPkgModalOpen(true);
              }}
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-5 py-2.5 rounded-xl text-sm transition flex items-center gap-1.5 shadow"
            >
              <Plus className="w-4 h-4" /> Add New Diamond Offer
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {packages.map((pkg) => (
              <div key={pkg.id} className="border border-gray-200 rounded-2xl p-5 bg-gray-50 flex justify-between items-center shadow-sm">
                <div className="space-y-1">
                  <h4 className="font-bold text-gray-900 text-base">{pkg.name}</h4>
                  <p className="text-xs text-emerald-700 font-bold">৳{pkg.price} BDT</p>
                  <p className="text-[10px] text-gray-500 font-medium">+{pkg.bonusDiamonds} Bonus Diamonds</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => deletePackage(pkg.id)}
                    className="p-2.5 bg-red-100 hover:bg-red-200 text-red-600 rounded-xl transition"
                    title="Delete Package"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SubTab 4: All Users Information */}
      {activeSubTab === 'users' && (
        <div className="bg-white rounded-3xl p-6 border border-emerald-100 shadow-sm space-y-4 overflow-x-auto">
          <h3 className="text-lg font-black text-gray-900">All Registered Users ({users.length})</h3>
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-gray-200 text-xs font-bold text-gray-500 uppercase">
                <th className="pb-3">Name</th>
                <th className="pb-3">Email & Phone</th>
                <th className="pb-3">Role</th>
                <th className="pb-3">Wallet Balance</th>
                <th className="pb-3">Registration Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 font-medium">
              {users.map((u) => (
                <tr key={u.id} className="hover:bg-gray-50/50">
                  <td className="py-4 font-bold text-gray-900">{u.name}</td>
                  <td className="py-4 text-xs">
                    <p>{u.email}</p>
                    <p className="font-mono text-gray-500">{u.phone}</p>
                  </td>
                  <td className="py-4">
                    <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-2.5 py-0.5 rounded-full uppercase">
                      {u.role}
                    </span>
                  </td>
                  <td className="py-4 font-bold text-emerald-700">৳{u.walletBalance}</td>
                  <td className="py-4 text-xs text-gray-500">{new Date(u.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* SubTab 5: Marketplace Listings */}
      {activeSubTab === 'listings' && (
        <div className="bg-white rounded-3xl p-6 border border-emerald-100 shadow-sm space-y-4 overflow-x-auto">
          <h3 className="text-lg font-black text-gray-900">Moderate Marketplace Account Listings</h3>
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-gray-200 text-xs font-bold text-gray-500 uppercase">
                <th className="pb-3">Ref #</th>
                <th className="pb-3">Title</th>
                <th className="pb-3">Seller</th>
                <th className="pb-3">Price</th>
                <th className="pb-3">Status</th>
                <th className="pb-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 font-medium">
              {listings.map((lst) => (
                <tr key={lst.id} className="hover:bg-gray-50/50">
                  <td className="py-4 font-mono font-bold text-emerald-800">{lst.referenceNo}</td>
                  <td className="py-4 text-gray-900 max-w-xs truncate">{lst.title}</td>
                  <td className="py-4 text-gray-600">{lst.sellerName}</td>
                  <td className="py-4 font-bold text-emerald-700">৳{lst.price.toLocaleString()}</td>
                  <td className="py-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                      lst.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'
                    }`}>
                      {lst.status}
                    </span>
                  </td>
                  <td className="py-4 text-right space-x-2">
                    {lst.status !== 'Active' && (
                      <button
                        onClick={() => updateListingStatus(lst.id, 'Active')}
                        className="bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-1 rounded-lg text-xs font-bold transition shadow"
                      >
                        Approve
                      </button>
                    )}
                    <button
                      onClick={() => updateListingStatus(lst.id, 'Rejected')}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg text-xs font-bold transition shadow"
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* SubTab 6: Settings (bKash, Nagad, Rocket Merchant Numbers) */}
      {activeSubTab === 'settings' && (
        <div className="bg-white rounded-3xl p-6 md:p-8 border border-emerald-100 shadow-sm space-y-6 max-w-2xl">
          <h3 className="text-lg font-black text-gray-900">Change bKash, Nagad & Rocket Numbers</h3>

          <div className="space-y-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-700">bKash Number (Personal/Merchant)</label>
              <input
                type="text"
                value={settings.bKashNumber}
                onChange={(e) => updateSettings({ bKashNumber: e.target.value })}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-emerald-600 font-medium"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-700">Nagad Number (Personal/Merchant)</label>
              <input
                type="text"
                value={settings.nagadNumber}
                onChange={(e) => updateSettings({ nagadNumber: e.target.value })}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-emerald-600 font-medium"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-700">Rocket Number (Personal/Merchant)</label>
              <input
                type="text"
                value={settings.rocketNumber}
                onChange={(e) => updateSettings({ rocketNumber: e.target.value })}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-emerald-600 font-medium"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-700">Notice Banner Text</label>
              <textarea
                rows={2}
                value={settings.noticeBanner}
                onChange={(e) => updateSettings({ noticeBanner: e.target.value })}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-emerald-600 font-medium"
              ></textarea>
            </div>

            <button
              onClick={() => alert('Numbers updated successfully in Firebase!')}
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-6 py-3.5 rounded-xl shadow transition"
            >
              Save Numbers to Firebase
            </button>
          </div>
        </div>
      )}

      {/* Add/Edit Package Modal */}
      {isPkgModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-6 shadow-2xl">
            <h3 className="text-xl font-black text-gray-900">Add Diamond Offer</h3>
            <form onSubmit={handleSavePkgSubmit} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-700">Package Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 100 Diamond"
                  value={pkgName}
                  onChange={(e) => setPkgName(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm font-medium"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-700">Diamonds</label>
                  <input
                    type="number"
                    required
                    value={pkgDiamonds}
                    onChange={(e) => setPkgDiamonds(Number(e.target.value))}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm font-medium"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-700">Bonus Diamonds</label>
                  <input
                    type="number"
                    required
                    value={pkgBonus}
                    onChange={(e) => setPkgBonus(Number(e.target.value))}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm font-medium"
                  />
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-700">Price (BDT)</label>
                <input
                  type="number"
                  required
                  value={pkgPrice}
                  onChange={(e) => setPkgPrice(Number(e.target.value))}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm font-medium"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 rounded-xl shadow transition"
              >
                Save Offer to Firebase
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
