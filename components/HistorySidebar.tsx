
import React from 'react';
import { LessonPlan } from '../types';

interface HistorySidebarProps {
  history: LessonPlan[];
  onSelect: (plan: LessonPlan) => void;
  onDelete: (id: string) => void;
  onNew: () => void;
  currentId?: string;
}

export const HistorySidebar: React.FC<HistorySidebarProps> = ({ history, onSelect, onDelete, onNew, currentId }) => {
  return (
    <div className="flex flex-col h-full bg-[#F3F4F6] border-r border-slate-200">
      <div className="p-6">
        <h2 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-6">Recherches précédentes</h2>
        <div className="space-y-4 max-h-[calc(100vh-250px)] overflow-y-auto">
          {history.map((plan) => (
            <div
              key={plan.id}
              className={`group relative p-3 rounded-xl cursor-pointer transition-all ${
                currentId === plan.id
                  ? 'bg-white shadow-sm font-semibold'
                  : 'hover:bg-white/50 text-slate-600'
              }`}
              onClick={() => onSelect(plan)}
            >
              <p className="text-sm truncate pr-6">{plan.question}</p>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(plan.id);
                }}
                className="absolute right-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 text-slate-400 hover:text-red-500 p-1"
              >
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>
          ))}
          {history.length === 0 && (
            <p className="text-xs text-slate-400 italic">Aucune recherche.</p>
          )}
        </div>
      </div>
      
      <div className="mt-auto p-6 space-y-4">
        <button
          onClick={onNew}
          className="w-full flex items-center justify-center gap-3 bg-white border border-slate-200 py-3 rounded-2xl shadow-sm hover:shadow-md transition-all font-bold text-slate-800"
        >
          <i className="fa-regular fa-pen-to-square text-indigo-600"></i>
          Nouvelle question
        </button>
      </div>
    </div>
  );
};
