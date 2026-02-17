
import { GoogleGenAI, Type, Schema } from "@google/genai";
import { LessonPlan, LessonPlanRequest } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

const lessonPlanSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    query: { type: Type.STRING },
    username: { type: Type.STRING },
    result: {
      type: Type.OBJECT,
      properties: {
        type: { type: Type.STRING },
        meta_tags: { type: Type.STRING },
        popularity: { type: Type.STRING },
        question: { type: Type.STRING },
        activity: { type: Type.STRING },
        palier: { type: Type.INTEGER },
        classe: { type: Type.STRING },
        fiche_no: { type: Type.STRING },
        introductory_text: { type: Type.STRING },
        lesson_meta: {
          type: Type.OBJECT,
          properties: {
            titre: { type: Type.STRING },
            domaine: { type: Type.STRING },
            sous_domaine: { type: Type.STRING },
            lesson: { type: Type.STRING },
            duree: { type: Type.STRING },
            date: { type: Type.STRING },
          }
        },
        answer: { 
            type: Type.STRING,
            description: "Contient le Rappel du cours (Section 1) et la Fiche Pédagogique (Section 2) en format Markdown." 
        },
        situations: { 
            type: Type.STRING, 
            description: "Contient les Situations Significatives d'Integration (SSI) en format Markdown."
        },
        exercises: { 
            type: Type.STRING, 
            description: "Contient les Exercices avec corriges en format Markdown."
        },
        audio_answer: { type: Type.STRING },
        sources: { 
            type: Type.OBJECT, 
            properties: {
                url: { type: Type.STRING }
            } 
        },
        id_qa: { type: Type.STRING },
      }
    }
  },
  required: ["query", "result"]
};

export const generateLessonPlan = async (request: LessonPlanRequest): Promise<LessonPlan> => {
  const prompt = `
    En tant que kPROF, l'assistant IA des enseignants sénégalais, aide-moi à préparer un cours sur : "${request.topic}".
    Niveau cible: ${request.gradeLevel} (Sénégal).
    
    Structure la réponse strictement selon le format JSON demandé.
    
    Détails du contenu attendu dans les champs JSON:
    - result.introductory_text: Un petit mot d'introduction pour l'enseignant.
    - result.answer: Doit contenir "1. Rappel du cours" (synthèse élèves) et "2. Fiche Pédagogique" (guide maître avec Objectifs, Durée, Déroulement). Utilise le format Markdown.
    - result.situations: Doit contenir les "Situations Significatives d'Integration (SSI)" et la "Remediation". Utilise le format Markdown.
    - result.exercises: Doit contenir "3. Exercices avec corriges". Utilise le format Markdown.
    - result.lesson_meta: Remplis les métadonnées de la leçon (titre, domaine, sous_domaine, etc.).
    - result.classe: Indique la classe (ex: CE1, CE2).
    
    Adapte le contenu au contexte sénégalais (matériel local, culture).
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
    
    // Fallback if username/query are missing from generation
    if (!data.query) data.query = request.topic;
    if (!data.username) data.username = "Enseignant";

    return {
      ...data,
      id: crypto.randomUUID(),
      timestamp: Date.now(),
    };
  } catch (error) {
    console.error("Error generating lesson plan:", error);
    throw new Error("Désolé, une erreur est survenue lors de la génération de la réponse.");
  }
};
