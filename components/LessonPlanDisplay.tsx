
import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { LessonPlan } from '../types';

interface LessonPlanDisplayProps {
  plan: LessonPlan;
  onNewQuestion: () => void;
}

export const LessonPlanDisplay: React.FC<LessonPlanDisplayProps> = ({ plan, onNewQuestion }) => {
  const [activeSection, setActiveSection] = useState<'answer' | 'situations' | 'exercises'>('answer');
  const { result } = plan;

  return (
    <div className="w-full space-y-8 print-container">
      {/* Question Header */}
      <div className="bg-white border-2 border-orange-200 rounded-3xl p-6 shadow-sm flex justify-between items-start gap-4">
        <div>
           <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">
             {result.lesson_meta?.domaine} • {result.lesson_meta?.sous_domaine}
           </div>
           <h2 className="text-3xl font-extrabold text-orange-500">{result.question}</h2>
        </div>
        <button 
          onClick={onNewQuestion}
          className="no-print bg-orange-50 text-orange-500 hover:bg-orange-100 w-10 h-10 rounded-full flex items-center justify-center transition-colors flex-shrink-0"
          title="Retour à l'accueil"
        >
          <i className="fa-solid fa-house"></i>
        </button>
      </div>

      {/* Intro Text */}
      {result.introductory_text && (
        <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-6 text-indigo-900 italic">
          <i className="fa-solid fa-quote-left text-indigo-200 mr-2"></i>
          {result.introductory_text}
        </div>
      )}

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
              <span className="font-bold">⚠️ Cette réponse est proposée pour le niveau <span className="underline">{result.classe || 'primaire'}</span>.</span> 
              Mais je peux aussi te proposer des réponses adaptées pour les autres classes.
            </p>
          </div>
        </div>
      </div>

      {/* Content Sections */}
      <div className="space-y-4">
        <h3 className="text-2xl font-extrabold text-[#1E3A8A] mb-6">Contenu de la leçon</h3>
        
        {/* Fiche Pédagogique (Answer) */}
        <div className="space-y-4">
          <button 
            onClick={() => setActiveSection('answer')}
            className={`w-full flex items-center gap-4 p-4 rounded-2xl border transition-all ${
              activeSection === 'answer' ? 'bg-[#FFF0D9] border-orange-200' : 'bg-white border-slate-100'
            }`}
          >
            <div className="w-10 h-10 bg-[#1E3A8A] rounded-lg flex items-center justify-center text-white">
              <i className="fa-solid fa-chalkboard-user"></i>
            </div>
            <span className="font-extrabold text-slate-800 uppercase tracking-widest">Fiche Pédagogique</span>
          </button>
          {activeSection === 'answer' && (
            <div className="p-6 bg-white rounded-3xl border border-slate-100 shadow-sm animate-in fade-in slide-in-from-top-2 duration-300">
              <article className="prose prose-slate max-w-none prose-headings:font-bold prose-headings:text-[#1E3A8A] prose-a:text-indigo-600 prose-strong:text-slate-900 prose-li:marker:text-orange-500">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {result.answer}
                </ReactMarkdown>
              </article>
            </div>
          )}

          {/* Situations d'intégration */}
          <button 
            onClick={() => setActiveSection('situations')}
            className={`w-full flex items-center gap-4 p-4 rounded-2xl border transition-all ${
              activeSection === 'situations' ? 'bg-[#FFF0D9] border-orange-200' : 'bg-white border-slate-100'
            }`}
          >
            <div className="w-10 h-10 bg-[#1E3A8A] rounded-lg flex items-center justify-center text-white">
              <i className="fa-solid fa-users-rectangle"></i>
            </div>
            <span className="font-extrabold text-slate-800 uppercase tracking-widest">Situations d'Intégration</span>
          </button>
          {activeSection === 'situations' && (
            <div className="p-6 bg-white rounded-3xl border border-slate-100 shadow-sm animate-in fade-in slide-in-from-top-2 duration-300">
              <article className="prose prose-slate max-w-none prose-headings:font-bold prose-headings:text-[#1E3A8A] prose-a:text-indigo-600 prose-strong:text-slate-900 prose-li:marker:text-emerald-500">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {result.situations}
                </ReactMarkdown>
              </article>
            </div>
          )}

          {/* Exercices */}
          <button 
            onClick={() => setActiveSection('exercises')}
            className={`w-full flex items-center gap-4 p-4 rounded-2xl border transition-all ${
              activeSection === 'exercises' ? 'bg-[#FFF0D9] border-orange-200' : 'bg-white border-slate-100'
            }`}
          >
            <div className="w-10 h-10 bg-[#1E3A8A] rounded-lg flex items-center justify-center text-white">
              <i className="fa-solid fa-pencil-square"></i>
            </div>
            <span className="font-extrabold text-slate-800 uppercase tracking-widest">Exercices et Corrigés</span>
          </button>
          {activeSection === 'exercises' && (
            <div className="p-6 bg-white rounded-3xl border border-slate-100 shadow-sm animate-in fade-in slide-in-from-top-2 duration-300">
              <article className="prose prose-slate max-w-none prose-headings:font-bold prose-headings:text-[#1E3A8A] prose-a:text-indigo-600 prose-strong:text-slate-900 prose-li:marker:text-indigo-500">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {result.exercises}
                </ReactMarkdown>
              </article>
            </div>
          )}
        </div>
      </div>
      
      <div className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-8 no-print">
         <button 
           onClick={() => window.print()} 
           className="w-full sm:w-auto bg-indigo-600 text-white px-8 py-3.5 rounded-2xl font-bold shadow-lg flex items-center justify-center gap-3 hover:bg-indigo-700 transition-all"
         >
           <i className="fa-solid fa-download"></i>
           Télécharger la réponse
         </button>
         <button 
           onClick={onNewQuestion} 
           className="w-full sm:w-auto bg-white text-indigo-600 border-2 border-indigo-600 px-8 py-3.5 rounded-2xl font-bold shadow-sm flex items-center justify-center gap-3 hover:bg-indigo-50 transition-all"
         >
           <i className="fa-regular fa-pen-to-square"></i>
           Poser une autre question
         </button>
      </div>
    </div>
  );
};
