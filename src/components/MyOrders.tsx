import React from 'react';
import { useApp } from '../context/AppContext';
import { ClipboardList, CheckCircle2, Clock, XCircle, ShieldCheck, ArrowRight } from 'lucide-react';

export const MyOrders: React.FC = () => {
  const { orders, currentUser, setActiveTab, language } = useApp();

  const userOrders = orders.filter(o => currentUser && o.userId === currentUser.id);

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 pb-24 md:pb-12 space-y-8">
      <div className="bg-gradient-to-r from-emerald-700 to-teal-900 rounded-3xl p-6 md:p-10 text-white shadow-xl flex items-center justify-between">
        <div>
          <span className="bg-green-400 text-emerald-950 text-xs font-bold px-3 py-1 rounded-full uppercase">
            Order Tracking & History
          </span>
          <h2 className="text-2xl md:text-3xl font-black mt-2">My Top-Up Orders</h2>
          <p className="text-emerald-100 text-xs md:text-sm mt-1">
            Track real-time status of your diamond packages and membership deliveries.
          </p>
        </div>
        <div className="hidden md:flex w-16 h-16 rounded-2xl bg-white/10 items-center justify-center backdrop-blur-sm">
          <ClipboardList className="w-8 h-8 text-green-300" />
        </div>
      </div>

      <div className="space-y-4">
        {userOrders.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-emerald-100 shadow-sm space-y-4">
            <ClipboardList className="w-12 h-12 text-gray-300 mx-auto" />
            <h3 className="font-bold text-gray-800 text-base">No orders found</h3>
            <p className="text-xs text-gray-500">You haven't placed any diamond top-up orders yet.</p>
            <button
              onClick={() => setActiveTab('topup')}
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-6 py-2.5 rounded-xl text-sm transition shadow"
            >
              Start Top-Up Now
            </button>
          </div>
        ) : (
          userOrders.map((ord) => (
            <div
              key={ord.id}
              className="bg-white rounded-2xl p-6 border border-emerald-100 shadow-sm hover:shadow-md transition flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-3">
                  <span className="font-black text-emerald-800 text-base">{ord.orderNumber}</span>
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
                    ord.status === 'Completed' ? 'bg-green-100 text-green-800' :
                    ord.status === 'Processing' ? 'bg-blue-100 text-blue-800' :
                    ord.status === 'Payment Verification' ? 'bg-amber-100 text-amber-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {ord.status}
                  </span>
                </div>
                <h4 className="font-bold text-gray-900 text-sm md:text-base">{ord.packageName}</h4>
                <p className="text-xs text-gray-500">
                  UID: <span className="font-bold text-gray-800">{ord.playerUid}</span> ({ord.playerName}) • Paid via <span className="font-bold text-emerald-700">{ord.paymentMethod}</span>
                </p>
                {ord.adminNotes && (
                  <p className="text-[11px] text-emerald-700 bg-emerald-50 px-3 py-1 rounded-lg border border-emerald-200 mt-2">
                    Note: {ord.adminNotes}
                  </p>
                )}
              </div>

              <div className="text-right space-y-1 shrink-0">
                <span className="text-lg font-black text-emerald-700">৳{ord.price} BDT</span>
                <p className="text-[10px] text-gray-400">{new Date(ord.createdAt).toLocaleString()}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
