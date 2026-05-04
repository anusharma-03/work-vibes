import React from 'react';

interface UserSelectionModalProps {
  onClose?: () => void;
  onConfirm?: (name: string) => void;
}

export function UserSelectionModal({ onClose, onConfirm }: UserSelectionModalProps) {
  const users = [
    "Shobhit", "Uday", "Pardeep", "Monika", "Prince Raj", "Nitin", 
    "Amreek", "Gurdeep", "Tahir", "Tejwant", "Ayushi", "Rishu", 
    "Prabhat", "Anupam", "Akshita", "Manpreet", "Rohit", "Vaibhav"
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-opacity">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden transform transition-all scale-100 flex flex-col max-h-[90vh]">
        <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-blue-100 text-blue-600">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-user" aria-hidden="true">
                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900">Who are you?</h3>
              <p className="text-xs text-gray-500">Step 1 of 2</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors p-1 hover:bg-gray-100 rounded-full"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-x" aria-hidden="true">
              <path d="M18 6 6 18"></path>
              <path d="m6 6 12 12"></path>
            </svg>
          </button>
        </div>
        <div className="p-6 overflow-y-auto flex-1">
          <div className="space-y-4">
            <p className="text-sm text-gray-600">Enter your name or select from the list to personalize your status reports.</p>
            <div className="relative">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" aria-hidden="true">
                <path d="m21 21-4.34-4.34"></path>
                <circle cx="11" cy="11" r="8"></circle>
              </svg>
              <input placeholder="Enter or search your name..." className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium" type="text" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[40vh] overflow-y-auto mt-4">
              {users.map(name => (
                <button 
                  key={name} 
                  onClick={() => onConfirm?.(name)}
                  className="flex items-center justify-between px-4 py-3 rounded-xl border text-left transition-all border-gray-200 hover:border-blue-300 hover:bg-gray-50"
                >
                  <div className="flex flex-col"><span className="font-medium">{name}</span></div>
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="p-6 border-t border-gray-100 bg-gray-50/50 flex justify-between items-center">
          <div className="ml-auto w-full flex justify-end">
            <button disabled className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-blue-500/30">
              Confirm
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-right" aria-hidden="true">
                <path d="M5 12h14"></path>
                <path d="m12 5 7 7-7 7"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
