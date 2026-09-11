import type { FormulaQuizData } from '../common/quizTypes';

export const signQuizData: FormulaQuizData = {
  formulaName: 'sign 符号判定',
  formulaSymbol: 'sign(x)',
  category: '数值运算',
  themeColor: '#0ea5e9',
  description: '掌握阻尼移门向左/向右滑移动态阻尼方向判断、正负矢量朝向提取。',
  questions: [
    {
      id: 'sign-1',
      title: '大移门向左推移时的滑动方向判定',
      scenario: '两轨移门衣柜，移动坐标系中以向右为正方向。当用户向左推拉门板产生位移 offset = -60mm 时，利用 sign(offset) 函数返回的阻尼受力方向值是多少？',
      formula: 'Direction = sign(offset)',
      type: 'choice',
      options: [
        { label: 'A. 1', value: '1', hint: '向右' },
        { label: 'B. -1', value: '-1', hint: '负数返回 -1，驱动左侧阻尼器介入缓冲' },
        { label: 'C. 0', value: '0', hint: '静止无位移' },
        { label: 'D. -60', value: '-60', hint: '未提取纯符号' },
      ],
      correctAnswer: '-1',
      explanation: '【代入公式计算】：\nsign(-60) = -1。\n【工程意义】：移门向左推拉时 sign 返回 -1，控制系统精准触发左侧缓冲器启动反向制动，避免撞击左边框。',
    },
    {
      id: 'sign-2',
      title: '移门完全静止闭合时的 sign 返回值',
      scenario: '当移门处于关闭原点静止不动，位移 offset = 0 时，sign(0) 的标准返回值是多少？',
      formula: 'sign(0)',
      type: 'input',
      placeholder: '请输入数值，如 0',
      correctAnswer: '0',
      tolerance: 0,
      unit: '',
      explanation: '【代入公式计算】：\nsign(0) = 0。\n【工程意义】：位移为 0 时返回 0，阻尼机构处于自由待机状态，不施加任何预紧阻尼力。',
    },
    {
      id: 'sign-3',
      title: '向右快速推拉门板的符号萃取',
      scenario: '门板被向右拉开产生 +120mm 的位移量，sign(+120) 的结果为：',
      formula: 'sign(120)',
      type: 'choice',
      options: [
        { label: 'A. 0', value: '0', hint: '静止' },
        { label: 'B. 1', value: '1', hint: '正数返回 1' },
        { label: 'C. -1', value: '-1', hint: '反向' },
        { label: 'D. 120', value: '120', hint: '标量' },
      ],
      correctAnswer: '1',
      explanation: '【代入公式计算】：\nsign(+120) = 1。\n【工程意义】：正方向位移触发右侧防跳轮与缓冲卡扣生效。',
    },
  ],
};
