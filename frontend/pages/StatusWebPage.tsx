
import React from 'react';
import { StatusHeader } from '../components/StatusHeader';
import { StatusSidebar } from '../components/StatusSidebar';
import { UserSelectionModal } from '../components/UserSelectionModal';

export function StatusWebPage({ navigate }: { navigate?: (path: string) => void }) {
  return (
    <div className="status-page-wrapper">
      <div className="min-h-screen pb-12">
        <StatusHeader navigate={navigate} />

        <main className="max-w-[95%] mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-6">
            <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <div className="group flex justify-between items-start">
                <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">General Info</h2>
                <button className="text-rose-600 hover:text-rose-700 font-medium text-sm transition-all opacity-0 group-hover:opacity-100">Clear</button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Report Type</label>
                  <select className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 text-gray-800 focus:ring-2 focus:ring-rose-500 outline-none transition-all">
                    <option value="Start of day (SOD)">SOD (Start of Day)</option>
                    <option value="End of day (EOD)">EOD (End of Day)</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Date</label>
                  <input className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 text-gray-800 focus:ring-2 focus:ring-rose-500 outline-none transition-all" type="date" defaultValue="2026-05-04" />
                </div>
              </div>
            </section>

            <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-gray-800">Projects & Tasks</h2>
                <button className="flex items-center gap-1 text-rose-600 hover:text-rose-700 font-medium text-sm transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-circle-plus" aria-hidden="true">
                    <circle cx="12" cy="12" r="10"></circle>
                    <path d="M8 12h8"></path>
                    <path d="M12 8v8"></path>
                  </svg>
                  Add Project
                </button>
              </div>
              <div className="space-y-8">
                <div className="relative group border-b border-gray-100 pb-8 last:border-0 last:pb-0">
                  <div className="absolute -top-1 -right-1 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity z-10"></div>
                  <div className="space-y-4">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-gray-400 uppercase">Project Name</label>
                      <div className="relative">
                        <div className="MuiAutocomplete-root MuiAutocomplete-hasClearIcon css-1tlcqt-MuiAutocomplete-root">
                          <div className="MuiFormControl-root MuiFormControl-fullWidth MuiTextField-root css-1txs6a0-MuiFormControl-root-MuiTextField-root">
                            <div className="MuiInputBase-root MuiOutlinedInput-root MuiInputBase-colorPrimary MuiInputBase-fullWidth MuiInputBase-formControl MuiInputBase-sizeSmall MuiInputBase-adornedEnd MuiAutocomplete-inputRoot css-1n04w30-MuiInputBase-root-MuiOutlinedInput-root">
                              <input aria-invalid="false" autoComplete="off" id="_r_0_" placeholder="Select or type project name..." className="MuiInputBase-input MuiOutlinedInput-input MuiInputBase-inputSizeSmall MuiInputBase-inputAdornedEnd MuiAutocomplete-input MuiAutocomplete-inputFocused css-13meb6w-MuiInputBase-input-MuiOutlinedInput-input" aria-autocomplete="list" aria-expanded="false" autoCapitalize="none" spellCheck="false" role="combobox" type="text" />
                              <div className="MuiAutocomplete-endAdornment css-1uhhrmm-MuiAutocomplete-endAdornment">
                                <button className="MuiButtonBase-root MuiIconButton-root MuiIconButton-sizeMedium MuiAutocomplete-clearIndicator css-1x7n7v0-MuiButtonBase-root-MuiIconButton-root-MuiAutocomplete-clearIndicator" tabIndex="-1" type="button" aria-label="Clear" title="Clear">
                                  <svg className="MuiSvgIcon-root MuiSvgIcon-fontSizeSmall css-120dh41-MuiSvgIcon-root" focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="CloseIcon">
                                    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path>
                                  </svg>
                                </button>
                              </div>
                              <fieldset aria-hidden="true" className="MuiOutlinedInput-notchedOutline css-18p5xg2-MuiNotchedOutlined-root-MuiOutlinedInput-notchedOutline">
                                <legend className="css-1nf2c5d-MuiNotchedOutlined-root">
                                  <span className="notranslate" aria-hidden="true"></span>
                                </legend>
                              </fieldset>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="group flex justify-between items-center">
                        <label className="text-xs font-bold text-gray-400 uppercase">Tasks</label>
                      </div>
                      <div className="space-y-3">
                        <div className="flex gap-2">
                          <div className="mt-2.5">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-circle-check text-gray-300" aria-hidden="true">
                              <circle cx="12" cy="12" r="10"></circle>
                              <path d="m9 12 2 2 4-4"></path>
                            </svg>
                          </div>
                          <textarea id="task-input-bb4e8bbd-6de3-4188-bd03-c511623fcac4" placeholder="What did you work on?" rows="1" className="w-full bg-transparent border-b border-gray-100 text-gray-700 focus:border-rose-400 focus:outline-none resize-none overflow-hidden min-h-[36px] break-all"></textarea>
                          <button className="text-gray-300 hover:text-red-500 hover:bg-red-50 p-1 rounded transition-colors" title="Remove Task">
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-trash2 lucide-trash-2" aria-hidden="true">
                              <path d="M10 11v6"></path>
                              <path d="M14 11v6"></path>
                              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"></path>
                              <path d="M3 6h18"></path>
                              <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                            </svg>
                          </button>
                        </div>
                      </div>
                      <button className="flex items-center gap-1.5 text-xs font-semibold text-rose-600 hover:text-rose-700 bg-rose-50 px-2.5 py-1 rounded-md transition-colors mt-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-plus" aria-hidden="true">
                          <path d="M5 12h14"></path>
                          <path d="M12 5v14"></path>
                        </svg>
                        Add Task
                      </button>
                    </div>
                  </div>
                </div>
                <button className="flex items-center gap-1 text-rose-600 hover:text-rose-700 font-medium text-sm transition-colors mt-4 pt-4 border-t border-gray-100">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-circle-plus" aria-hidden="true">
                    <circle cx="12" cy="12" r="10"></circle>
                    <path d="M8 12h8"></path>
                    <path d="M12 8v8"></path>
                  </svg>
                  Add Project
                </button>
              </div>
            </section>
          </div>

          {/* Sidebar Area */}
          <div className="space-y-6">
            <StatusSidebar />
          </div>
        </main>
      </div>

      <UserSelectionModal />

      <div data-rht-toaster="" style={{ position: 'fixed', zIndex: '9999', inset: '16px', pointerEvents: 'none' }}></div>
    </div>
  );
}
