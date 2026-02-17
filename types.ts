
export type GradeLevel = 'CE1' | 'CE2';

export interface LessonMeta {
  titre: string;
  domaine: string;
  sous_domaine: string;
  lesson: string;
  duree: string;
  date: string;
}

export interface LessonPlanResult {
  type: string;
  meta_tags: string;
  popularity: string;
  question: string;
  activity: string;
  palier: number;
  classe: string;
  fiche_no: string;
  introductory_text: string;
  lesson_meta: LessonMeta;
  answer: string;
  situations: string;
  exercises: string;
  audio_answer: string;
  sources: any;
  id_qa: string;
}

export interface LessonPlan {
  id: string;
  timestamp: number;
  query: string;
  username: string;
  result: LessonPlanResult;
}

export interface LessonPlanRequest {
  topic: string;
  gradeLevel: GradeLevel;
}
