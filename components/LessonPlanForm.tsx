
import React, { useState } from 'react';
import { GradeLevel, LessonPlanRequest } from '../types';

interface LessonPlanFormProps {
  onSubmit: (request: LessonPlanRequest) => void;
  isLoading: boolean;
  initialValue?: string;
}

const SUGGESTED_QUESTIONS = {
  featured: [
    "Comment appliquer le pluriel des noms en « eu, eau » et « s, x, z » ?",
    "Effectuer des opérations sur les nombres de 100 à 500 ?"
  ],
  français: [
    "Comment identifier le sujet et le remplacer par un pronom personnel ?",
    "Expliquer l'accord de l'adjectif qualificatif avec le nom (ex: corps frêle).",
    "Distinguer l'utilisation de « à » (préposition) et « a » (auxiliaire).",
    "Comment conjuguer les verbes du 2ème groupe au présent de l'indicatif ?",
    "Formation du pluriel des noms en « ail » (ex: portail, travail).",
    "Compréhension de texte : comment relever des synonymes dans un récit ?",
    "Expliquer la règle d'écriture de g, ge et gu (ex: mangue, orangeade)."
  ],
  mathématiques: [
    "Comment classer des nombres par ordre croissant ou décroissant ?",
    "Expliquer la différence entre la moitié et le double d'un nombre (CE1).",
    "Technique de la soustraction avec retenue (méthode de l'emprunt).",
    "Comment tracer des droites perpendiculaires et identifier l'angle droit ?",
    "Conversion des unités de mesure de capacité (L, dl, cl, ml).",
    "Résolution de problèmes : comment identifier une question intermédiaire ?",
    "Comment estimer et convertir des masses (g, kg) et des longueurs (m, cm) ?"
  ]
};

export const LessonPlanForm: React.FC<LessonPlanFormProps> = ({ onSubmit, isLoading, initialValue = '' }) => {
  const [topic, setTopic] = useState(initialValue);
  const [showAllQuestions, setShowAllQuestions] = useState(false);
  // Defaulting to CE1 internally since UI selection is removed, 
  // but the API still expects a grade level.
  const gradeLevel: GradeLevel = 'CE1'; 

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic.trim()) return;
    onSubmit({ topic, gradeLevel });
  };

  const selectQuestion = (q: string) => {
    setTopic(q);
    setShowAllQuestions(false);
  };

  return (
    <div className="w-full max-w-3xl mx-auto flex flex-col items-center">
      <div className="mb-12 flex flex-col items-center">
        {/* Main Logo Title */}
        <div className="text-center mb-16">
          <h1 className="text-8xl md:text-9xl font-extrabold flex items-center justify-center gap-1 tracking-tighter">
            <span className="text-[#1E3A8A]">k</span>
            <span className="kprof-gradient-text">PROF</span>
          </h1>
        </div>

        {/* Mascot and Greeting Section */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-10 w-full max-w-2xl px-4">
          <div className="flex-shrink-0 relative group">
            {/* The cute lion mascot container */}
            <div className="w-28 h-28 md:w-40 md:h-40 relative flex items-center justify-center">
               <div className="absolute inset-0 bg-gradient-to-tr from-orange-50 to-white rounded-full border-4 border-white shadow-xl"></div>
               <img 
                src="https://www.svgrepo.com/show/401804/lion.svg" 
                alt="Cute Lion Mascot" 
                className="w-full h-full object-contain relative z-10 p-4 animate-in zoom-in duration-700"
                onError={(e) => {
                  e.currentTarget.src = "https://cdn-icons-png.flaticon.com/512/616/616412.png";
                }}
              />
              
              {/* Floating icon menu dots */}
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
                <div className="w-5 h-5 rounded-full bg-[#00D1B2] border-2 border-white shadow-md flex items-center justify-center">
                  <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                </div>
                <div className="w-5 h-5 rounded-full bg-[#FFB300] border-2 border-white shadow-md flex items-center justify-center">
                  <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                </div>
                <div className="w-5 h-5 rounded-full bg-[#FF3860] border-2 border-white shadow-md flex items-center justify-center">
                  <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="text-center md:text-left">
            <p className="text-2xl md:text-3xl text-[#1E3A8A] font-bold leading-[1.2]">
              Bonjour, je suis à votre disposition pour <br className="hidden md:block" /> vous aider à préparer vos cours.
            </p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="w-full space-y-6">
        <div className="relative group">
          <div className="kprof-input-border p-1 rounded-[28px] shadow-2xl shadow-indigo-100 transition-all duration-300 group-hover:shadow-indigo-200">
            <div className="bg-white rounded-[24px] flex items-center px-7 py-6">
              <textarea
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="Montrez-moi une fiche pédagogique sur..."
                className="flex-1 text-xl md:text-2xl outline-none resize-none h-16 bg-transparent placeholder-slate-300 font-medium"
                disabled={isLoading}
              />
              <div className="flex items-center gap-6 ml-4">
                {/* Microphone removed as requested */}
                <button
                  type="submit"
                  disabled={isLoading || !topic.trim()}
                  className={`w-14 h-14 rounded-full flex items-center justify-center transition-all ${
                    isLoading || !topic.trim() 
                      ? 'bg-slate-50 text-slate-200' 
                      : 'bg-[#F1F3F9] text-[#1E3A8A] hover:bg-indigo-600 hover:text-white hover:scale-105 shadow-sm'
                  }`}
                >
                  <i className="fa-solid fa-arrow-right text-xl"></i>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Grade selection buttons removed as requested */}

        <div className="mt-20 text-center no-print w-full">
          <h3 className="text-[#FF8A00] font-bold italic mb-6 text-xl">Les questions les plus posées :</h3>
          
          <div className="space-y-4 max-w-2xl mx-auto">
            {!showAllQuestions ? (
              <>
                {SUGGESTED_QUESTIONS.featured.map((q, idx) => (
                  <button 
                    key={idx}
                    type="button"
                    onClick={() => selectQuestion(q)}
                    className="block w-full text-left bg-[#FFF0D9] p-5 rounded-2xl text-lg font-semibold text-slate-700 hover:bg-[#FFE8CC] transition-all flex items-center gap-4 border border-orange-100/50 shadow-sm"
                  >
                    <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm">
                      <i className="fa-solid fa-question text-indigo-600 text-sm"></i>
                    </div>
                    {q}
                  </button>
                ))}
                <button 
                  type="button" 
                  onClick={() => setShowAllQuestions(true)}
                  className="text-xs font-black text-slate-800 uppercase tracking-[0.25em] mt-10 underline decoration-2 underline-offset-8 hover:text-indigo-600 transition-colors"
                >
                  VOIR PLUS DE QUESTIONS
                </button>
              </>
            ) : (
              <div className="animate-in fade-in slide-in-from-top-4 duration-500 text-left space-y-8 pb-10">
                <div className="flex justify-between items-center mb-4">
                  <h4 className="text-[#1E3A8A] font-bold uppercase tracking-widest text-sm">Toutes les suggestions</h4>
                  <button 
                    onClick={() => setShowAllQuestions(false)}
                    className="text-slate-400 hover:text-indigo-600"
                  >
                    <i className="fa-solid fa-xmark text-xl"></i>
                  </button>
                </div>

                <section>
                  <h5 className="text-orange-600 font-bold mb-3 flex items-center gap-2">
                    <i className="fa-solid fa-book"></i> Langue et Communication
                  </h5>
                  <div className="grid gap-2">
                    {SUGGESTED_QUESTIONS.français.map((q, idx) => (
                      <button 
                        key={idx}
                        type="button"
                        onClick={() => selectQuestion(q)}
                        className="text-left bg-white p-3 rounded-xl text-sm font-medium text-slate-600 hover:bg-indigo-50 hover:text-indigo-700 border border-slate-100 transition-all"
                      >
                        {q}
                      </button>
                    ))}
                  </div>
                </section>

                <section>
                  <h5 className="text-emerald-600 font-bold mb-3 flex items-center gap-2">
                    <i className="fa-solid fa-calculator"></i> Mathématiques
                  </h5>
                  <div className="grid gap-2">
                    {SUGGESTED_QUESTIONS.mathématiques.map((q, idx) => (
                      <button 
                        key={idx}
                        type="button"
                        onClick={() => selectQuestion(q)}
                        className="text-left bg-white p-3 rounded-xl text-sm font-medium text-slate-600 hover:bg-emerald-50 hover:text-emerald-700 border border-slate-100 transition-all"
                      >
                        {q}
                      </button>
                    ))}
                  </div>
                </section>
                
                <div className="flex justify-center pt-4">
                  <button 
                    type="button" 
                    onClick={() => setShowAllQuestions(false)}
                    className="text-xs font-black text-slate-400 uppercase tracking-[0.25em] hover:text-slate-800 transition-colors"
                  >
                    RÉDUIRE LA LISTE
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};
