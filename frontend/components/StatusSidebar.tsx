import React from 'react';

export function StatusSidebar() {
  return (
    <div className="space-y-8">
      {/* Live Preview */}
      <div className="lg:sticky lg:top-24 h-fit">
        <section className="bg-gray-900 p-6 rounded-2xl shadow-xl text-gray-100 overflow-hidden relative">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <svg xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-send" aria-hidden="true">
              <path d="M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z"></path>
              <path d="m21.854 2.147-10.94 10.939"></path>
            </svg>
          </div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-blue-400">Live Preview</h2>
          </div>
          <div className="relative group">
            <div className="bg-gray-800 rounded-xl p-4 font-mono text-sm leading-relaxed text-gray-300 min-h-[400px] whitespace-pre-wrap border border-gray-700 break-all">
              <div className="h-full flex flex-col items-center justify-center text-gray-600 space-y-2 py-12">
                <p>Complete the form to see your report</p>
                <div className="w-12 h-1 bg-gray-700 rounded-full"></div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Recent History */}
      <div className="lg:sticky lg:top-24 h-fit" style={{ maxHeight: 'calc(-100px + 100vh)' }}>
        <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col h-full">
          <div className="flex justify-between items-center mb-4">
            <a href="/status/admin" data-discover="true">
              <h2 className="text-lg font-semibold text-gray-800">Recent History</h2>
            </a>
            <div className="flex items-center gap-2">
              <button className="p-1 text-gray-400 hover:text-blue-500 transition-colors" title="Refresh">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-refresh-ccw" aria-hidden="true">
                  <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path>
                  <path d="M3 3v5h5"></path>
                  <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16"></path>
                  <path d="M16 16h5v5"></path>
                </svg>
              </button>
              <a className="p-1 text-gray-400 hover:text-blue-500 transition-colors" title="View full history" href="/status/history" data-discover="true">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-history" aria-hidden="true">
                  <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path>
                  <path d="M3 3v5h5"></path>
                  <path d="M12 7v5l4 2"></path>
                </svg>
              </a>
            </div>
          </div>
          <div className="flex-1 flex items-center justify-center text-gray-400 text-sm">
            No recent reports found.
          </div>
        </section>
      </div>
    </div>
  );
}
