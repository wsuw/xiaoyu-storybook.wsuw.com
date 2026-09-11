export type QuestionType = 'choice' | 'input';

export interface QuizOption {
  label: string;
  value: string;
  hint?: string;
}

export interface QuizQuestion {
  id: string;
  title: string;
  scenario: string; // 真实家装工程背景
  formula: string; // 涉及的参数化公式
  type: QuestionType;
  options?: QuizOption[]; // choice 模式下的选项
  correctAnswer: string; // 正确答案（选择题为选项value，填空题为标准数值字符）
  tolerance?: number; // 填空题数值允许的绝对误差范围（如 ±1）
  unit?: string; // 填空题输入框后缀单位（如 mm, 个, °, 度）
  placeholder?: string;
  explanation: string; // 详尽公式代入计算步骤与工程背景解析
}

export interface FormulaQuizData {
  formulaName: string;
  formulaSymbol: string;
  category: string;
  themeColor: string; // 主题色 HEX
  description: string;
  questions: QuizQuestion[];
}
