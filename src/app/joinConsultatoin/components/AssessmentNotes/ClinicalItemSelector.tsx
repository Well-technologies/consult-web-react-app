import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { ClinicalCommonDataDetails } from '@/api/consult/consult.types';

interface ClinicalItemSelectorProps {
  label: string;
  selectedItems: ClinicalCommonDataDetails[];
  onItemsChange: (items: ClinicalCommonDataDetails[]) => void;
  suggestions: ClinicalCommonDataDetails[];
  onSearch: (query: string) => void;
  placeholder?: string;
  isLoading?: boolean;
  notes: string;
  onNotesChange: (notes: string) => void;
}

export const ClinicalItemSelector: React.FC<ClinicalItemSelectorProps> = ({
  label,
  selectedItems,
  onItemsChange,
  suggestions,
  onSearch,
  placeholder,
  isLoading = false,
  notes,
  onNotesChange,
}) => {
  const { t } = useTranslation();
  const [inputValue, setInputValue] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [showNotes, setShowNotes] = useState(notes.length > 0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (notes.length > 0) {
      setShowNotes(true);
    }
  }, [notes]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    onSearch(value);
    setIsOpen(true);
    setActiveIndex(-1);
  };

  const addItem = (item: ClinicalCommonDataDetails) => {
    if (!selectedItems.find(i => i.id === item.id)) {
      onItemsChange([...selectedItems, item]);
    }
    setInputValue('');
    setIsOpen(false);
    setActiveIndex(-1);
  };

  const addNewItem = () => {
    if (inputValue.trim()) {
      const newItem: ClinicalCommonDataDetails = {
        id: `new-${Date.now()}`,
        name: inputValue.trim(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      addItem(newItem);
    }
  };

  const removeItem = (id: string) => {
    onItemsChange(selectedItems.filter(i => i.id !== id));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const showAddNew = inputValue.trim() && !(suggestions && suggestions.find(s => s.name.toLowerCase() === inputValue.trim().toLowerCase()));
    const totalOptions = (suggestions?.length || 0) + (showAddNew ? 1 : 0);

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setIsOpen(true);
      setActiveIndex(prev => (prev < totalOptions - 1 ? prev + 1 : prev));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex(prev => (prev > 0 ? prev - 1 : prev));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      
      if (activeIndex >= 0 && activeIndex < (suggestions?.length || 0)) {
        addItem(suggestions[activeIndex]);
      } else if (activeIndex === (suggestions?.length || 0) && showAddNew) {
        addNewItem();
      } else if (inputValue.trim()) {
        const exactMatch = suggestions.find(s => s.name.toLowerCase() === inputValue.trim().toLowerCase());
        if (exactMatch) {
          addItem(exactMatch);
        } else {
          addNewItem();
        }
      }
    } else if (e.key === 'Escape') {
      setIsOpen(false);
      setActiveIndex(-1);
    }
  };

  console.log('selectedItems', selectedItems);

  const defaultPlaceholder = t('joinConsultation.assessment.common.searchPlaceholder');

  return (
    <div className="space-y-2 md:space-y-3" ref={containerRef}>
      <h4 className="text-base font-bold text-[#333]">{label}</h4>
      <div className="relative">
        <div className="min-h-[45px] md:min-h-[50px] p-1.5 md:p-2 border border-[#e32933] rounded-xl flex flex-wrap gap-1.5 md:gap-2 items-center focus-within:ring-1 focus-within:ring-[#e32933] bg-white shadow-sm transition-all focus-within:border-[#e32933]">
          {selectedItems.map((item) => (
            <span key={item.id} className="bg-red-50 text-[#e32933] px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-2 border border-red-100 animate-in fade-in zoom-in duration-200">
              {item.name}
              <button 
                type="button"
                onClick={() => removeItem(item.id)} 
                className="hover:text-red-700 transition-colors p-0.5 rounded-full hover:bg-red-200"
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </span>
          ))}
          <input
            type="text"
            className="flex-1 outline-none text-sm p-2 min-w-[150px] bg-transparent text-[#333]"
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            onFocus={() => setIsOpen(true)}
            placeholder={selectedItems.length === 0 ? (placeholder || defaultPlaceholder) : ""}
          />
          {!showNotes && (
            <button
              type="button"
              onClick={() => setShowNotes(true)}
              className="text-[10px] md:text-xs font-bold text-[#e32933] hover:bg-red-50 px-2.5 py-1 rounded-lg transition-colors border border-transparent hover:border-red-100"
            >
              + {t('joinConsultation.assessment.common.addNote')}
            </button>
          )}
        </div>

        {isOpen && (inputValue.trim() || (suggestions && suggestions.length > 0)) && (
          <div className="absolute z-50 w-full mt-2 bg-white border border-gray-100 rounded-xl shadow-2xl max-h-60 overflow-y-auto animate-in slide-in-from-top-2 duration-200">
            {isLoading ? (
              <div className="p-4 text-center text-gray-400 text-sm flex items-center justify-center gap-2">
                <div className="w-4 h-4 border-2 border-[#e32933] border-t-transparent rounded-full animate-spin"></div>
                {t('joinConsultation.assessment.common.searching')}
              </div>
            ) : (
              <>
                {suggestions && suggestions.length > 0 && suggestions.map((suggestion, index) => (
                  <button
                    key={suggestion.id}
                    type="button"
                    className={`w-full text-left px-4 py-3 transition-colors text-sm border-b border-gray-50 last:border-none flex items-center justify-between group ${
                      activeIndex === index ? 'bg-red-50 text-[#e32933]' : 'hover:bg-red-50 hover:text-[#e32933]'
                    }`}
                    onClick={() => addItem(suggestion)}
                    onMouseEnter={() => setActiveIndex(index)}
                  >
                    <span className="font-medium">{suggestion.name}</span>
                    <span className={`text-[10px] px-1.5 py-0.5 rounded transition-colors ${
                      activeIndex === index ? 'bg-red-200 text-[#e32933]' : 'bg-gray-100 text-gray-500 group-hover:bg-red-200 group-hover:text-[#e32933]'
                    }`}>{t('joinConsultation.assessment.common.select')}</span>
                  </button>
                ))}
                {inputValue.trim() && !(suggestions && suggestions.find(s => s.name.toLowerCase() === inputValue.trim().toLowerCase())) && (
                  <button
                    type="button"
                    className={`w-full text-left px-4 py-4 transition-colors text-sm flex items-center justify-between bg-gray-50/50 group ${
                      activeIndex === (suggestions?.length || 0) ? 'bg-red-50 text-[#e32933]' : 'hover:bg-red-50 hover:text-[#e32933]'
                    }`}
                    onClick={addNewItem}
                    onMouseEnter={() => setActiveIndex(suggestions?.length || 0)}
                  >
                    <div className="flex flex-col">
                      <span className="text-xs text-gray-500 mb-0.5">{t('joinConsultation.assessment.common.notFoundAdd')}</span>
                      <span className={`font-bold transition-colors ${
                        activeIndex === (suggestions?.length || 0) ? 'text-[#e32933]' : 'text-[#333] group-hover:text-[#e32933]'
                      }`}>"{inputValue}"</span>
                    </div>
                    <div className={`p-1 rounded-full shadow-sm transition-colors ${
                      activeIndex === (suggestions?.length || 0) ? 'bg-[#e32933] text-white' : 'bg-gray-200 text-gray-500 group-hover:bg-[#e32933] group-hover:text-white'
                    }`}>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                    </div>
                  </button>
                )}
              </>
            )}
          </div>
        )}
      </div>
      {showNotes && (
        <div className="relative group animate-in slide-in-from-top-1 duration-200">
          <textarea
            className="w-full p-2.5 md:p-3 pr-10 border border-gray-100 rounded-xl text-sm text-[#333] focus:ring-1 focus:ring-[#e32933] focus:outline-none transition-all resize-none shadow-sm min-h-[50px] md:min-h-[60px]"
            placeholder={t('joinConsultation.assessment.common.notesPlaceholder', { label: label.toLowerCase() })}
            value={notes}
            onChange={(e) => onNotesChange(e.target.value)}
            autoFocus={notes.length === 0}
          />
          {notes.length === 0 && (
            <button
              type="button"
              onClick={() => setShowNotes(false)}
              className="absolute top-2 right-2 text-gray-400 hover:text-red-500 transition-colors p-1.5 hover:bg-red-50 rounded-full"
              title={t('global.modal.close')}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
      )}
    </div>
  );
};
