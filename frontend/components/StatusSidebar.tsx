import React from 'react';

export function StatusSidebar() {
  return (
    <div className="space-y-8">
      {/* Recent History */}
      <div className="lg:sticky lg:top-24 h-fit" style={{ maxHeight: 'calc(-100px + 100vh)' }}>
        <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col h-full">
          <div className="flex justify-between items-center mb-4">
            <a href="/status/admin" data-discover="true">
              <h2 className="text-lg font-semibold text-gray-800">Recent History</h2>
            </a>
            <div className="flex items-center gap-2">
              <button className="p-1 text-gray-400 hover:text-rose-500 transition-colors" title="Refresh">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-refresh-ccw" aria-hidden="true">
                  <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path>
                  <path d="M3 3v5h5"></path>
                  <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16"></path>
                  <path d="M16 16h5v5"></path>
                </svg>
              </button>
              <a className="p-1 text-gray-400 hover:text-rose-500 transition-colors" title="View full history" href="/status/history" data-discover="true">
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
