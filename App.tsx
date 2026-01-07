
import React, { useState, useEffect } from 'react';
import { LessonPlan, LessonPlanRequest } from './types';
import { generateLessonPlan } from './services/geminiService';
import { LessonPlanForm } from './components/LessonPlanForm';
import { LessonPlanDisplay } from './components/LessonPlanDisplay';
import { HistorySidebar } from './components/HistorySidebar';

const App: React.FC = () => {
  const [currentPlan, setCurrentPlan] = useState<LessonPlan | null>(null);
  const [history, setHistory] = useState<LessonPlan[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isNewQuestion, setIsNewQuestion] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem('kprof_history');
    if (saved) {
      try {
        setHistory(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to load history", e);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('kprof_history', JSON.stringify(history));
  }, [history]);

  const handleGenerate = async (request: LessonPlanRequest) => {
    setIsLoading(true);
    setError(null);
    try {
      const plan = await generateLessonPlan(request);
      setCurrentPlan(plan);
      setHistory(prev => [plan, ...prev.filter(p => p.question !== plan.question)].slice(0, 15));
      setIsNewQuestion(false);
    } catch (err: any) {
      setError(err.message || 'Une erreur inattendue est survenue.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectPlan = (plan: LessonPlan) => {
    setCurrentPlan(plan);
    setIsNewQuestion(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDeletePlan = (id: string) => {
    setHistory(prev => prev.filter(p => p.id !== id));
    if (currentPlan?.id === id) {
      setCurrentPlan(null);
      setIsNewQuestion(true);
    }
  };

  const startNewQuestion = () => {
    setCurrentPlan(null);
    setIsNewQuestion(true);
    setError(null);
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Brand Header Bar */}
      <div className="kprof-orange-bar no-print flex items-center px-4 justify-between">
        <span className="text-white font-bold text-sm tracking-widest">kProf</span>
        <div className="flex gap-4">
          <div className="w-3 h-3 border border-white rounded-sm"></div>
          <div className="w-3 h-3 border border-white rounded-sm"></div>
          <div className="w-3 h-3 bg-white/20 rounded-sm"></div>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        {!isNewQuestion && (
          <aside className="hidden md:block w-72 h-[calc(100vh-48px)] sticky top-0 no-print">
            <HistorySidebar 
              history={history} 
              onSelect={handleSelectPlan} 
              onDelete={handleDeletePlan}
              onNew={startNewQuestion}
              currentId={currentPlan?.id}
            />
          </aside>
        )}

        {/* Main Workspace */}
        <main className="flex-1 overflow-y-auto bg-[#F9FAFB]">
          <div className={`p-6 md:p-12 mx-auto w-full ${isNewQuestion ? 'max-w-4xl pt-24' : 'max-w-5xl'}`}>
            
            {isNewQuestion ? (
              <div className="animate-in fade-in zoom-in duration-500">
                <LessonPlanForm onSubmit={handleGenerate} isLoading={isLoading} />
              </div>
            ) : (
              <div className="space-y-12">
                {/* Result View */}
                {isLoading ? (
                  <div className="flex flex-col items-center justify-center py-20 space-y-6">
                    <div className="w-16 h-16 border-4 border-indigo-100 border-t-indigo-600 rounded-full animate-spin"></div>
                    <p className="text-xl font-bold text-slate-500 animate-pulse italic">kPROF prépare ta réponse pour le Sénégal...</p>
                  </div>
                ) : (
                  currentPlan && (
                    <div className="animate-in slide-in-from-bottom-6 duration-500">
                       <LessonPlanDisplay plan={currentPlan} />
                       
                       {/* Footer Branding from Screenshot */}
                       <div className="mt-16 flex flex-col md:flex-row items-center justify-between gap-8 pt-12 border-t border-slate-200 no-print">
                          <div className="text-center md:text-left">
                            <p className="text-xs font-bold text-slate-500 uppercase mb-4">Un assistant IA proposé par</p>
                            <div className="flex items-center gap-6">
                              <img src="https://www.bibliosansfrontieres.org/wp-content/uploads/2021/01/logo-bsf-long.png" alt="BSF" className="h-10 grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all cursor-pointer" />
                              <div className="h-8 w-[1px] bg-slate-200"></div>
                              <div className="flex flex-col items-center">
                                <span className="font-bold text-slate-800 text-lg">MEN</span>
                                <span className="text-[8px] uppercase font-bold text-slate-400">Ministère de l'Éducation Nationale</span>
                              </div>
                            </div>
                          </div>

                          <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100 flex items-center gap-6">
                             <div className="text-indigo-600">
                                <i className="fa-solid fa-circle-info text-2xl"></i>
                             </div>
                             <div>
                                <h4 className="font-bold text-xs text-slate-500 uppercase tracking-widest mb-1">Ton feedback est important !</h4>
                                <div className="flex items-center gap-4">
                                  <span className="text-sm font-bold text-slate-700 italic">Est-ce que j'ai répondu à ta question ?</span>
                                  <div className="flex gap-2">
                                    <button className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center hover:bg-emerald-100"><i className="fa-solid fa-thumbs-up"></i></button>
                                    <button className="w-10 h-10 bg-red-50 text-red-600 rounded-xl flex items-center justify-center hover:bg-red-100"><i className="fa-solid fa-thumbs-down"></i></button>
                                  </div>
                                </div>
                             </div>
                          </div>
                       </div>
                    </div>
                  )
                )}
              </div>
            )}

            {error && (
              <div className="mt-8 p-4 bg-red-50 border border-red-100 rounded-2xl text-red-600 flex items-center gap-3">
                <i className="fa-solid fa-circle-exclamation"></i>
                <p className="font-bold">{error}</p>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;
