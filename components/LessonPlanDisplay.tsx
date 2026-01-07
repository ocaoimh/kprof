
import React, { useState } from 'react';
import { LessonPlan } from '../types';

interface LessonPlanDisplayProps {
  plan: LessonPlan;
}

const MarkdownContent: React.FC<{ content: string }> = ({ content }) => {
  // Simple markdown-to-html formatter for bold, lists, and headers
  const formatted = content
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/^# (.*$)/gim, '<h1 class="text-2xl font-bold mt-4 mb-2">$1</h1>')
    .replace(/^## (.*$)/gim, '<h2 class="text-xl font-bold mt-3 mb-2">$1</h2>')
    .replace(/^### (.*$)/gim, '<h3 class="text-lg font-bold mt-2 mb-1">$1</h3>')
    .replace(/^\* (.*$)/gim, '<li class="ml-4 list-disc">$1</li>')
    .replace(/^- (.*$)/gim, '<li class="ml-4 list-disc">$1</li>')
    .replace(/\n/g, '<br />');

  return <div className="text-slate-800 leading-relaxed" dangerouslySetInnerHTML={{ __html: formatted }} />;
};

export const LessonPlanDisplay: React.FC<LessonPlanDisplayProps> = ({ plan }) => {
  const [activeSection, setActiveSection] = useState<'cours' | 'sequence' | 'exercices'>('cours');

  return (
    <div className="w-full space-y-8 print-container">
      {/* Question Header */}
      <div className="bg-white border-2 border-orange-200 rounded-3xl p-6 shadow-sm">
        <h2 className="text-3xl font-extrabold text-orange-500">{plan.question}</h2>
      </div>

      {/* Grade Info Banner */}
      <div className="bg-white border-2 border-orange-200 rounded-3xl p-6 shadow-sm relative no-print">
        <button className="absolute top-4 right-4 text-orange-400 hover:text-orange-600">
           <i className="fa-solid fa-circle-xmark text-2xl"></i>
        </button>
        <div className="flex items-start gap-4">
          <div className="text-orange-500 mt-1">
             <i className="fa-solid fa-triangle-exclamation text-xl"></i>
          </div>
          <div>
            <p className="text-slate-800">
              <span className="font-bold">⚠️ Cette réponse est adaptée pour la classe de <span className="underline">{plan.gradeLevel}</span> que tu as sélectionnée.</span> 
              Mais je peux aussi te proposer des réponses adaptées pour les classes suivantes :
            </p>
            <div className="flex gap-4 mt-4">
              <button className="flex-1 bg-white border border-orange-200 py-3 rounded-xl font-bold text-orange-700 flex justify-between px-6 hover:bg-orange-50 transition-all">
                <span>{plan.gradeLevel === 'CE1' ? 'CE2' : 'CE1'}</span>
                <i className="fa-solid fa-arrow-right"></i>
              </button>
              <button className="flex-1 bg-white border border-orange-200 py-3 rounded-xl font-bold text-orange-700 flex justify-between px-6 hover:bg-orange-50 transition-all">
                <span>CP</span>
                <i className="fa-solid fa-arrow-right"></i>
              </button>
            </div>
            <p className="text-xs italic text-orange-600/70 mt-3">Clique sur la classe de ton choix pour voir la réponse adaptée.</p>
          </div>
        </div>
      </div>

      {/* Content Sections */}
      <div className="space-y-4">
        <h3 className="text-2xl font-extrabold text-[#1E3A8A] mb-6">Pour la classe de {plan.gradeLevel}</h3>
        
        {/* Rappel du cours */}
        <div className="space-y-4">
          <button 
            onClick={() => setActiveSection('cours')}
            className={`w-full flex items-center gap-4 p-4 rounded-2xl border transition-all ${
              activeSection === 'cours' ? 'bg-[#FFF0D9] border-orange-200' : 'bg-white border-slate-100'
            }`}
          >
            <div className="w-10 h-10 bg-[#1E3A8A] rounded-lg flex items-center justify-center text-white">
              <i className="fa-solid fa-book-open"></i>
            </div>
            <span className="font-extrabold text-slate-800 uppercase tracking-widest">Rappel du cours</span>
          </button>
          {activeSection === 'cours' && (
            <div className="p-6 bg-white rounded-3xl border border-slate-100 shadow-sm animate-in fade-in slide-in-from-top-2 duration-300">
              <MarkdownContent content={plan.rappelCours} />
            </div>
          )}

          {/* Séquence Pédagogique */}
          <button 
            onClick={() => setActiveSection('sequence')}
            className={`w-full flex items-center gap-4 p-4 rounded-2xl border transition-all ${
              activeSection === 'sequence' ? 'bg-[#FFF0D9] border-orange-200' : 'bg-white border-slate-100'
            }`}
          >
            <div className="w-10 h-10 bg-[#1E3A8A] rounded-lg flex items-center justify-center text-white">
              <i className="fa-solid fa-chalkboard-user"></i>
            </div>
            <span className="font-extrabold text-slate-800 uppercase tracking-widest">Séquence pédagogique</span>
          </button>
          {activeSection === 'sequence' && (
            <div className="p-6 bg-white rounded-3xl border border-slate-100 shadow-sm animate-in fade-in slide-in-from-top-2 duration-300">
              <MarkdownContent content={plan.sequencePedagogique} />
            </div>
          )}

          {/* Exercices */}
          <button 
            onClick={() => setActiveSection('exercices')}
            className={`w-full flex items-center gap-4 p-4 rounded-2xl border transition-all ${
              activeSection === 'exercices' ? 'bg-[#FFF0D9] border-orange-200' : 'bg-white border-slate-100'
            }`}
          >
            <div className="w-10 h-10 bg-[#1E3A8A] rounded-lg flex items-center justify-center text-white">
              <i className="fa-solid fa-pencil-square"></i>
            </div>
            <span className="font-extrabold text-slate-800 uppercase tracking-widest">Exercices</span>
          </button>
          {activeSection === 'exercices' && (
            <div className="p-6 bg-white rounded-3xl border border-slate-100 shadow-sm animate-in fade-in slide-in-from-top-2 duration-300">
              <MarkdownContent content={plan.exercices} />
            </div>
          )}
        </div>
      </div>
      
      <div className="flex justify-center pt-8 no-print">
         <button onClick={() => window.print()} className="bg-indigo-600 text-white px-8 py-3 rounded-2xl font-bold shadow-lg flex items-center gap-3 hover:bg-indigo-700 transition-all">
           <i className="fa-solid fa-download"></i>
           Télécharger la réponse
         </button>
      </div>
    </div>
  );
};
