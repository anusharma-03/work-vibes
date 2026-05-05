import React, { useState, useEffect } from 'react';
import { apiService } from '../../src/services/apiService';

interface UserSelectionModalProps {
  onClose?: () => void;
  onConfirm?: (name: string) => void;
}

export function UserSelectionModal({ onClose, onConfirm }: UserSelectionModalProps) {
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [users, setUsers] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await apiService.getUsers();
        setUsers(data);
      } catch (error) {
        console.error('Failed to fetch users');
      } finally {
        setIsLoading(false);
      }
    };
    fetchUsers();
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-opacity">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden transform transition-all scale-100 flex flex-col max-h-[90vh]">
        <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-rose-100 text-rose-600">
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
            <p className="text-sm text-gray-600">Select your name from the list to personalize your status reports.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[40vh] overflow-y-auto mt-4">
              {isLoading ? (
                <div className="col-span-full py-12 text-center text-gray-500">Loading team members...</div>
              ) : users.length === 0 ? (
                <div className="col-span-full py-12 text-center text-gray-500">
                  <p>No team members found.</p>
                  <p className="text-xs mt-1">Please add users in the Admin panel.</p>
                </div>
              ) : (
                users.map(user => (
                  <button
                    key={user._id}
                    onClick={() => setSelectedUser(user.name)}
                    className={`flex items-center justify-between px-4 py-3 rounded-xl border text-gray-800 text-left transition-all ${selectedUser === user.name
                        ? 'border-rose-500 bg-rose-50 ring-2 ring-rose-200'
                        : 'border-gray-200 hover:border-rose-300 hover:bg-gray-50'
                      }`}
                  >
                    <div className="flex flex-col">
                      <span className={`font-medium ${selectedUser === user.name ? 'text-rose-700' : ''}`}>{user.name}</span>
                    </div>
                    {selectedUser === user.name && (
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-rose-600"><polyline points="20 6 9 17 4 12" /></svg>
                    )}
                  </button>
                ))
              )}
            </div>
          </div>
        </div>
        <div className="p-6 border-t border-gray-100 bg-gray-50/50 flex justify-between items-center">
          <div className="ml-auto w-full flex justify-end">
            <button
              onClick={() => selectedUser && onConfirm?.(selectedUser)}
              disabled={!selectedUser}
              className="flex items-center gap-2 px-6 py-2.5 bg-rose-600 hover:bg-rose-700 text-white rounded-xl font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-rose-500/30"
            >
              Confirm Selection
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
