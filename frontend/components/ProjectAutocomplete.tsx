import React, { useState, useEffect, useRef } from 'react';

interface Project {
  _id: string;
  name: string;
  account?: string;
}

interface ProjectAutocompleteProps {
  value: string;
  onChange: (value: string) => void;
  onFetchGitHub?: () => void;
  projects: Project[];
  placeholder?: string;
  hasTrackingUrl?: boolean;
}

export function ProjectAutocomplete({ value, onChange, onFetchGitHub, projects, placeholder, hasTrackingUrl }: ProjectAutocompleteProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState(value);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>(projects);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setSearchTerm(value);
  }, [value]);

  useEffect(() => {
    const results = projects.filter(p => 
      p.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProjects(results);
  }, [searchTerm, projects]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (name: string) => {
    onChange(name);
    setSearchTerm(name);
    setIsOpen(false);
  };

  return (
    <div ref={wrapperRef} className="relative w-full">
      <div className="relative flex items-center">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            onChange(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          placeholder={placeholder}
          className="w-full bg-gray-50 border border-gray-200 rounded-lg pl-4 pr-10 py-2 text-gray-800 focus:ring-2 focus:ring-rose-500 outline-none transition-all"
        />
        {hasTrackingUrl && onFetchGitHub && (
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onFetchGitHub();
            }}
            type="button"
            title="Fetch from GitHub"
            className="absolute right-3 text-gray-400 hover:text-gray-900 transition-colors p-1"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-github">
              <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
              <path d="M9 18c-4.51 2-5-2-7-2" />
            </svg>
          </button>
        )}
      </div>
      
      {isOpen && filteredProjects.length > 0 && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-xl shadow-xl max-h-60 overflow-y-auto animate-in fade-in slide-in-from-top-1 duration-200">
          <div className="p-1">
            {filteredProjects.map((project) => (
              <button
                key={project._id}
                onClick={() => handleSelect(project.name)}
                className="w-full text-left px-4 py-2.5 text-sm hover:bg-rose-50 hover:text-rose-600 rounded-lg transition-colors flex flex-col"
              >
                <span className="font-semibold">{project.name}</span>
                {project.account && (
                  <span className="text-xs text-gray-400 font-medium">{project.account}</span>
                )}
              </button>
            ))}
          </div>
        </div>
      )}
      
      {isOpen && filteredProjects.length === 0 && searchTerm && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-xl shadow-xl p-4 text-center text-sm text-gray-500 animate-in fade-in slide-in-from-top-1 duration-200">
          No projects found matching "{searchTerm}"
        </div>
      )}
    </div>
  );
}
