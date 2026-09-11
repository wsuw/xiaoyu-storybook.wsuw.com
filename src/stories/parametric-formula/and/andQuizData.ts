import type { FormulaQuizData } from '../common/quizTypes';

export const andQuizData: FormulaQuizData = {
  formulaName: 'and 逻辑与',
  formulaSymbol: 'and(cond1, cond2, ...)',
  category: '逻辑与条件',
  themeColor: '#2563eb',
  description: '掌握门板超高且超宽双重过载下加装门板拉直器、重型铰链的双保险判定。',
  questions: [
    {
      id: 'and-1',
      title: '一门到顶超高且超宽触发加装铝合金拉直器',
      scenario: '某高定品牌防弯曲工艺标准：当门板高度 H ≥ 2400mm 且 门板宽度 W ≥ 500mm 时，两者必须同时满足才强制加装内置式铝合金拉直器并增配双重型合页。若当前门板 H = 2500mm，W = 550mm，判断结果为？',
      formula: 'NeedStraightener = and(H >= 2400, W >= 500)',
      type: 'choice',
      options: [
        { label: 'A. true（加装拉直器）', value: 'true', hint: '2500>=2400 且 550>=500 均成立，返回真' },
        { label: 'B. false（不加装）', value: 'false', hint: '只要一个不满足才为假' },
        { label: 'C. 报错', value: 'error', hint: '逻辑运算合法' },
        { label: 'D. 无法判定', value: 'unknown', hint: '数据齐全' },
      ],
      correctAnswer: 'true',
      explanation: '【代入公式计算】：\n2500 >= 2400 (真) AND 550 >= 500 (真) -> true。\n【工程意义】：双重超标意味着门板内部各向异性应力极大，拉直器可提供持续反向预拉力，防止木门香蕉弯。',
    },
    {
      id: 'and-2',
      title: '高宽仅一项超标时的 and 判定结果',
      scenario: '门板高度 H = 2600mm（超高），但宽度仅 W = 400mm（极窄门）。在 and(H >= 2400, W >= 500) 判定下，返回布尔值是 1 还是 0？',
      formula: 'and(2600 >= 2400, 400 >= 500)',
      type: 'input',
      placeholder: '请输入 0 或 1',
      correctAnswer: '0',
      tolerance: 0,
      unit: '',
      explanation: '【代入公式计算】：\n真 AND 假 -> 假 (0)。\n【工程意义】：极窄门由于截面惯性矩小且自重轻，单侧铰链拉力足以约束，不需要额外耗费成本开槽埋设拉直器。',
    },
    {
      id: 'and-3',
      title: '三条件并列 and 逻辑短路特性',
      scenario: '对于 and(条件1, 条件2, 条件3)，如果条件1为假，后续条件是否还会改变整体结果？',
      formula: 'and(false, ...)',
      type: 'choice',
      options: [
        { label: 'A. 永远为假 (false)', value: 'false', hint: 'and 只要有一项为假，全局必然为假' },
        { label: 'B. 可能为真', value: 'true', hint: 'or 才会' },
        { label: 'C. 取决于条件3', value: 'cond3', hint: '错误' },
        { label: 'D. 返回 null', value: 'null', hint: '布尔逻辑确定' },
      ],
      correctAnswer: 'false',
      explanation: '【代入公式计算】：\n根据布尔代数，0 × X × Y = 0。\n【工程意义】：参数化渲染引擎检测到首个条件不满足时会立即终止，节省服务器三维拓扑运算资源。',
    },
  ],
};
