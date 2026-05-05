import React, { useState, useEffect } from 'react';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { apiService } from '../../../src/services/apiService';
import toast, { Toaster } from 'react-hot-toast';

export function SettingsPage() {
  const [tokens, setTokens] = useState<Record<string, string>>({
    testesfera11: '',
    webexpertesfera: '',
    clickripple: '',
    micaela: '',
    krunk: ''
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const settings: any = await apiService.getSettings();
      if (settings.github_tokens) {
        setTokens(prev => ({ ...prev, ...settings.github_tokens }));
      }
    } catch (error) {
      console.error('Failed to fetch settings:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveToken = async (account: string) => {
    try {
      const updatedTokens = { ...tokens };
      await apiService.updateSetting('github_tokens', updatedTokens);
      toast.success(`Token for ${account} saved successfully`);
    } catch (error) {
      toast.error(`Failed to save token for ${account}`);
    }
  };

  const handleTokenChange = (account: string, value: string) => {
    setTokens(prev => ({ ...prev, [account]: value }));
  };

  const accounts = [
    { id: 'testesfera11', label: 'testesfera11' },
    { id: 'webexpertesfera', label: 'webexpertesfera' },
    { id: 'clickripple', label: 'clickripple' },
    { id: 'micaela', label: 'micaela' },
    { id: 'krunk', label: 'krunk' }
  ];

  return (
    <AdminLayout title="Settings" subtitle="GitHub account tokens (same as Settings page)">
      <Toaster position="top-right" />
      <div className="mt-4">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
          {/* Card Header */}
          <div className="px-8 py-6 border-b border-gray-100 flex items-center gap-3">
            <div className="p-2 bg-indigo-50 rounded-lg">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#4f46e5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-key-round">
                <path d="M2 18v3c0 .6.4 1 1 1h4v-3h3v-3h2l1.4-1.4a6.5 6.5 0 1 0-4-4Z" />
                <circle cx="16.5" cy="7.5" r=".5" fill="currentColor" />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-gray-800">Account configuration</h2>
          </div>

          {/* Card Body */}
          <div className="p-8">
            {isLoading ? (
              <div className="flex justify-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-8">
                {accounts.map((account) => (
                  <div key={account.id} className="space-y-2">
                    <label className="block text-sm font-medium text-gray-600 ml-1">{account.label}</label>
                    <div className="relative group">
                      <div className="flex items-center gap-2 bg-[#f8f9fc] border border-gray-200 rounded-xl px-4 py-3 focus-within:ring-2 focus-within:ring-indigo-500/20 focus-within:border-indigo-500 transition-all">
                        <input
                          type="password"
                          value={tokens[account.id] || ''}
                          onChange={(e) => handleTokenChange(account.id, e.target.value)}
                          placeholder="GitHub Personal Access Token"
                          className="w-full bg-transparent text-gray-700 outline-none text-sm placeholder:text-gray-400"
                        />
                        <button
                          onClick={() => handleSaveToken(account.id)}
                          className="p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-lg shadow-blue-500/30 transition-all active:scale-95"
                          title="Save Token"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-save">
                            <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
                            <polyline points="17 21 17 13 7 13 7 21" />
                            <polyline points="7 3 7 8 15 8" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
