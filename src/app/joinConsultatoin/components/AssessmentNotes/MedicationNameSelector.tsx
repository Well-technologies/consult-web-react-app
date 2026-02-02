import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { ClinicalCommonDataDetails } from '@/api/consult/consult.types';

interface MedicationNameSelectorProps {
  value: string;
  onChange: (value: string) => void;
  suggestions: ClinicalCommonDataDetails[];
  onSearch: (query: string) => void;
  isLoading?: boolean;
  placeholder?: string;
  className?: string;
  autoFocus?: boolean;
}


export const MedicationNameSelector = ({
  value,
  onChange,
  suggestions,
  onSearch,
  isLoading = false,
  placeholder,
  className = "w-full px-4 py-2 bg-gray-50 border border-gray-100 rounded-xl text-sm focus:ring-1 focus:ring-[#e32933] outline-none transition-all",
  autoFocus
}: MedicationNameSelectorProps) => {
  console.log('suggessions', suggestions)
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);

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
    const newValue = e.target.value;
    onChange(newValue);
    onSearch(newValue);
    setIsOpen(true);
    setActiveIndex(-1);
  };

  const handleSelectItem = (item: ClinicalCommonDataDetails) => {
    onChange(item.name);
    setIsOpen(false);
    setActiveIndex(-1);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {

    // Total navigable items: suggestions
    // Note: We don't really need a "Add new" button in the dropdown because typing ITSELF is adding new. 
    // Usually "Add new" in ClinicalItemSelector adds it to a list of chips. Here we are just setting the text.
    // So we just select from suggestions or keep what we typed.
    // However, ClinicalItemSelector shows "Add 'foo'" logic. Let's see if we need it.
    // User said "select or type".
    // If I type "Para", suggestions: "Paracetamol".
    // If I press Enter on "Paracetamol", it selects it.
    // If I type "Paracetamol", it matches.
    // If I type "ParaX", no matches. Value is "ParaX". That's fine.
    
    // So we only navigate suggestions.
    const totalOptions = suggestions?.length || 0;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (!isOpen) {
        setIsOpen(true);
        // Only trigger search if we don't have suggestions yet? 
        // Or assume suggestions are there from previous type.
        if (!suggestions || suggestions.length === 0) onSearch(value);
      }
      setActiveIndex(prev => (prev < totalOptions - 1 ? prev + 1 : prev));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex(prev => (prev > 0 ? prev - 1 : prev));
    } else if (e.key === 'Enter') {
      if (isOpen && activeIndex >= 0 && activeIndex < totalOptions) {
        e.preventDefault();
        handleSelectItem(suggestions[activeIndex]);
      } else {
        // Just let it be, the value is already in the input.
        setIsOpen(false);
      }
    } else if (e.key === 'Escape') {
      setIsOpen(false);
      setActiveIndex(-1);
    }
  };

  return (
    <div className="relative" ref={containerRef}>
      <input
        type="text"
        autoFocus={autoFocus}
        value={value}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        onFocus={() => {
           setIsOpen(true);
           onSearch(value);
        }}
        className={className}
        placeholder={placeholder}
      />

      {isOpen && (suggestions && suggestions.length > 0) && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-100 rounded-xl shadow-2xl max-h-60 overflow-y-auto animate-in slide-in-from-top-2 duration-200 left-0">
          {isLoading ? (
            <div className="p-4 text-center text-gray-400 text-sm flex items-center justify-center gap-2">
              <div className="w-4 h-4 border-2 border-[#e32933] border-t-transparent rounded-full animate-spin"></div>
              {t('joinConsultation.assessment.common.searching')}
            </div>
          ) : (
            suggestions.map((suggestion, index) => (
              <button
                key={suggestion.id}
                type="button"
                className={`w-full text-left px-4 py-3 transition-colors text-sm border-b border-gray-50 last:border-none flex items-center justify-between group ${
                  activeIndex === index ? 'bg-red-50 text-[#e32933]' : 'hover:bg-red-50 hover:text-[#e32933]'
                }`}
                onClick={() => handleSelectItem(suggestion)}
                onMouseEnter={() => setActiveIndex(index)}
              >
                <span className="font-medium">{suggestion.name}</span>
                {/* Optional: 'Select' badge or similar if needed. ClinicalItemSelector has it. */}
              </button>
            ))
          )}
        </div>
      )}
    </div>
  );
};
