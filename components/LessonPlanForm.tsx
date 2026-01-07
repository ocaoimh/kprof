
import React, { useState } from 'react';
import { GradeLevel, LessonPlanRequest } from '../types';

interface LessonPlanFormProps {
  onSubmit: (request: LessonPlanRequest) => void;
  isLoading: boolean;
  initialValue?: string;
}

const GRADE_LEVELS: GradeLevel[] = ['CE1', 'CE2'];

export const LessonPlanForm: React.FC<LessonPlanFormProps> = ({ onSubmit, isLoading, initialValue = '' }) => {
  const [topic, setTopic] = useState(initialValue);
  const [gradeLevel, setGradeLevel] = useState<GradeLevel>('CE1');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic.trim()) return;
    onSubmit({ topic, gradeLevel });
  };

  return (
    <div className="w-full max-w-3xl mx-auto flex flex-col items-center">
      <div className="mb-12 flex flex-col items-center gap-6">
        <div className="flex items-center gap-2">
           <img 
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3d/Logo_Biblioth%C3%A8ques_sans_Fronti%C3%A8res.png/300px-Logo_Biblioth%C3%A8ques_sans_Fronti%C3%A8res.png" 
            alt="BSF" 
            className="h-8 opacity-0" 
            onError={(e) => e.currentTarget.style.display = 'none'}
          />
        </div>
        <div className="text-center">
          <h1 className="text-7xl font-extrabold flex items-center justify-center gap-1">
            <span className="text-[#1E3A8A]">k</span>
            <span className="kprof-gradient-text">PROF</span>
          </h1>
        </div>
        <p className="text-2xl text-[#1E3A8A] font-semibold text-center mt-4">
          Bonjour, je suis à ta disposition pour <br /> t'aider à préparer tes cours.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="w-full space-y-4">
        <div className="relative group">
          <div className="kprof-input-border p-1 rounded-[24px]">
            <div className="bg-white rounded-[20px] flex items-center px-6 py-4 shadow-xl">
              <textarea
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="Ex: Comment effectuer des opérations sur les nombres de 100 à 500 ?"
                className="flex-1 text-lg outline-none resize-none h-16 bg-transparent placeholder-slate-400 font-medium"
                disabled={isLoading}
              />
              <div className="flex items-center gap-4 ml-4">
                <i className="fa-solid fa-microphone text-[#1E3A8A] text-xl cursor-pointer hover:scale-110 transition-all"></i>
                <button
                  type="submit"
                  disabled={isLoading || !topic.trim()}
                  className="w-10 h-10 bg-slate-200 rounded-full flex items-center justify-center text-slate-400 hover:bg-indigo-600 hover:text-white transition-all disabled:opacity-50"
                >
                  <i className="fa-solid fa-arrow-right"></i>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-center gap-4 mt-6">
          {GRADE_LEVELS.map((level) => (
            <button
              key={level}
              type="button"
              onClick={() => setGradeLevel(level)}
              className={`px-8 py-2 rounded-full font-bold transition-all border-2 ${
                gradeLevel === level
                  ? 'bg-indigo-600 text-white border-indigo-600 shadow-lg'
                  : 'bg-white text-slate-500 border-slate-200 hover:border-indigo-300'
              }`}
            >
              Classe de {level}
            </button>
          ))}
        </div>

        <div className="mt-12 text-center no-print">
          <h3 className="text-orange-500 font-bold italic mb-4">Les questions les plus posées :</h3>
          <div className="space-y-3">
            {["Comment appliquer le pluriel des noms en « eu, eau » et « s, x, z » ?", "Effectuer des opérations sur les nombres de 100 à 500 ?"].map((q, idx) => (
              <button 
                key={idx}
                type="button"
                onClick={() => setTopic(q)}
                className="block w-full text-left bg-[#FFF4E5] p-3 rounded-xl text-sm font-semibold text-slate-700 hover:bg-[#FFE8CC] transition-all flex items-center gap-3"
              >
                <i className="fa-solid fa-comment-dots text-indigo-600"></i>
                {q}
              </button>
            ))}
          </div>
          <button type="button" className="text-[10px] font-bold text-slate-800 uppercase tracking-wider mt-4 underline">Voir plus de questions</button>
        </div>
      </form>
    </div>
  );
};
