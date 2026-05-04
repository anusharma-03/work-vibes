import React from 'react';

interface SidebarProps {
  activePage: string;
  navigate: (path: string) => void;
}

export function Sidebar({ activePage, navigate }: SidebarProps) {
  const links = [
    { path: '/dashboard', icon: 'fas fa-stream', label: 'Project Story' },
    { path: '/mood', icon: 'fas fa-smile', label: 'Team Mood' },
    { path: '/client-portal', icon: 'fas fa-user-tie', label: 'Client Portal' },
    { path: '/productivity', icon: 'fas fa-chart-line', label: 'Productivity' },
  ];

  const projects = [
    { color: '#e11d48', label: 'Zenova Rebrand' },
    { color: '#f59e0b', label: 'Solaris App' },
  ];

  return (
    <aside className="sidebar">
      {/* Brand */}
      <div
        style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '40px', cursor: 'pointer' }}
        onClick={() => navigate('/')}
      >
        <div className="brand-icon" style={{ width: '32px', height: '32px', borderRadius: '8px', fontSize: '15px' }}>
          <i className="fas fa-wave-square" style={{ color: 'white' }}></i>
        </div>
        <span className="brand-name" style={{ fontSize: '20px' }}>Work Vibes</span>
      </div>

      {/* Primary Nav */}
      <nav style={{ flex: 1 }}>
        <ul className="nav-menu">
          {links.map((link) => (
            <li key={link.path} className="nav-item">
              <a
                href="#"
                className={`nav-link${activePage === link.path ? ' active' : ''}`}
                onClick={(e) => { e.preventDefault(); navigate(link.path); }}
              >
                <i className={link.icon}></i>
                <span className="nav-text">{link.label}</span>
              </a>
            </li>
          ))}
        </ul>

        {/* Active Projects */}
        <div style={{ marginTop: '40px' }}>
          <p style={{ fontSize: '11px', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '1.2px', marginBottom: '12px', paddingLeft: '14px', fontWeight: 600 }}>
            Active Projects
          </p>
          <ul className="nav-menu">
            {projects.map((p) => (
              <li key={p.label} className="nav-item">
                <a href="#" className="nav-link" onClick={(e) => e.preventDefault()}>
                  <span style={{ width: '10px', height: '10px', borderRadius: '3px', background: p.color, marginRight: '12px', flexShrink: 0, display: 'inline-block' }}></span>
                  <span className="nav-text">{p.label}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Bottom Mood Widget */}
      <div className="glass-card" style={{ padding: '16px', background: 'rgba(225, 29, 72, 0.05)', marginTop: 'auto', borderColor: 'rgba(225, 29, 72, 0.15)' }}>
        <p style={{ fontSize: '13px', marginBottom: '8px', color: 'var(--text-secondary)' }}>Workspace Mood</p>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: '24px' }}>🔥</span>
          <span style={{ fontWeight: 700, color: 'var(--accent-purple)', fontSize: '14px' }}>Crushing it!</span>
        </div>
      </div>
    </aside>
  );
}
