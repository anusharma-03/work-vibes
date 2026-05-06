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
            title="Auto-generate tasks from GitHub"
            className="absolute right-3 text-rose-500 hover:text-rose-600 hover:scale-110 transition-all p-1 bg-rose-50 rounded-md shadow-sm"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-sparkles">
              <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.937A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .962 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.582a.5.5 0 0 1 0 .962L15.5 14.063A2 2 0 0 0 14.063 15.5l-1.582 6.135a.5.5 0 0 1-.962 0z" />
              <path d="M20 3v4" />
              <path d="M22 5h-4" />
              <path d="M4 17v2" />
              <path d="M5 18H3" />
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
