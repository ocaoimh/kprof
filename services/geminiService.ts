
import { GoogleGenAI, Type } from "@google/genai";
import { LessonPlan, LessonPlanRequest } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

const lessonPlanSchema = {
  type: Type.OBJECT,
  properties: {
    rappelCours: {
      type: Type.STRING,
      description: "Un rappel clair et structuré du cours pour les élèves. Utilisez le format Markdown."
    },
    sequencePedagogique: {
      type: Type.STRING,
      description: "Une séquence pédagogique détaillée pour l'enseignant, incluant les étapes de la leçon. Utilisez le format Markdown."
    },
    exercices: {
      type: Type.STRING,
      description: "Une série d'exercices variés (compréhension, application) adaptés au niveau. Utilisez le format Markdown."
    }
  },
  required: ["rappelCours", "sequencePedagogique", "exercices"]
};

export const generateLessonPlan = async (request: LessonPlanRequest): Promise<LessonPlan> => {
  const prompt = `
    En tant que kPROF, l'assistant IA des enseignants sénégalais, aide-moi à préparer un cours sur : "${request.topic}".
    Niveau : ${request.gradeLevel} (Sénégal).
    
    Fournis une réponse structurée en trois parties :
    1. Rappel du cours : Fiche synthétique pour les élèves.
    2. Séquence pédagogique : Guide pour le maître (Objectifs, Durée, Déroulement).
    3. Exercices : Évaluations pour la classe.
    
    Respecte les standards du Ministère de l'Éducation Nationale (MEN) du Sénégal pour les classes de l'Étape 2 (CE1/CE2).
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: lessonPlanSchema,
        systemInstruction: "Tu es kPROF, un assistant pédagogique virtuel intelligent conçu par Bibliothèques Sans Frontières pour accompagner les enseignants sénégalais. Tu es expert du curriculum national du Sénégal (CE1-CE2). Tu t'exprimes de manière bienveillante, professionnelle et précise."
      }
    });

    const data = JSON.parse(response.text);
    
    return {
      ...data,
      id: crypto.randomUUID(),
      timestamp: Date.now(),
      topic: request.topic,
      gradeLevel: request.gradeLevel,
      question: request.topic
    };
  } catch (error) {
    console.error("Error generating lesson plan:", error);
    throw new Error("Désolé, une erreur est survenue lors de la génération de la réponse.");
  }
};
