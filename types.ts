
export type GradeLevel = 'CE1' | 'CE2';

export interface LessonSection {
  title: string;
  content: string;
}

export interface LessonPlan {
  id: string;
  timestamp: number;
  topic: string;
  gradeLevel: GradeLevel;
  question: string;
  rappelCours: string;
  sequencePedagogique: string;
  exercices: string;
}

export interface LessonPlanRequest {
  topic: string;
  gradeLevel: GradeLevel;
}
