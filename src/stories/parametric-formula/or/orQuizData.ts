import type { FormulaQuizData } from '../common/quizTypes';

export const orQuizData: FormulaQuizData = {
  formulaName: 'or 逻辑或',
  formulaSymbol: 'or(cond1, cond2, ...)',
  category: '逻辑与条件',
  themeColor: '#f97316',
  description: '掌握门板单项超标加固、超高或超宽任一触发加强横梁的安全预警机制。',
  questions: [
    {
      id: 'or-1',
      title: '一门到顶超高或超宽任一超标触发安全防变形梁',
      scenario: '设计安全规范：若门板高度 H > 2000mm（一门到顶） 或者 门板宽度 W > 600mm（单门过宽），满足任意一个条件就必须加配加强横梁或加厚封边。现有门板尺寸 H = 2400mm，W = 500mm，公式判定结果是？',
      formula: 'NeedReinforce = or(H > 2000, W > 600)',
      type: 'choice',
      options: [
        { label: 'A. true（触发加固）', value: 'true', hint: 'H>2000 成立，or 满足其一即为真' },
        { label: 'B. false（不加固）', value: 'false', hint: 'and 才会为假' },
        { label: 'C. 报错', value: 'error', hint: '合法' },
        { label: 'D. 无法判定', value: 'unknown', hint: '条件充足' },
      ],
      correctAnswer: 'true',
      explanation: '【代入公式计算】：\n2400 > 2000 (真) OR 500 > 600 (假) -> true。\n【工程意义】：只要有一项超标，整体刚度即受威胁，or 逻辑提供单点触发的容错与安全底线保障。',
    },
    {
      id: 'or-2',
      title: '高宽两项均在安全范围内的 or 返回结果',
      scenario: '某标品矮柜门尺寸 H = 1500mm，W = 450mm。对于公式 or(H > 2000, W > 600)，返回值是 1 还是 0？',
      formula: 'or(1500 > 2000, 450 > 600)',
      type: 'input',
      placeholder: '请输入 0 或 1',
      correctAnswer: '0',
      tolerance: 0,
      unit: '',
      explanation: '【代入公式计算】：\n假 OR 假 -> 假 (0)。\n【工程意义】：两项均在标准安全尺寸内，采用常规工艺装配，无需额外加固成本。',
    },
    {
      id: 'or-3',
      title: '多条件 or 逻辑的真值传播特性',
      scenario: '对于 or(A, B, C)，只要其中任意一个变量为真（true），整体表达式的结果就是？',
      formula: 'or(true, ...)',
      type: 'choice',
      options: [
        { label: 'A. true', value: 'true', hint: '任一为真即全真' },
        { label: 'B. false', value: 'false', hint: '需全部为假' },
        { label: 'C. 待定', value: 'pending', hint: '已短路确定' },
        { label: 'D. null', value: 'null', hint: '逻辑确定' },
      ],
      correctAnswer: 'true',
      explanation: '【代入公式计算】：\n1 + X + Y ≥ 1，始终为真。\n【工程意义】：常用于风控、红线警报、违规拦截等“一票否决”或“单点触发”场景。',
    },
  ],
};
