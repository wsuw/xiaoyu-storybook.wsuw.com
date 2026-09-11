import type { FormulaQuizData } from '../common/quizTypes';

export const roundQuizData: FormulaQuizData = {
  formulaName: 'round 四舍五入',
  formulaSymbol: 'round(x)',
  category: '数值运算',
  themeColor: '#10b981',
  description: '掌握浮点数毫米下料归整、激光封边机开料公差、规整整数尺寸换算。',
  questions: [
    {
      id: 'round-1',
      title: '浮点尺寸四舍五入下料规整到整数毫米',
      scenario: '数控开料机软件解析出某异形异宽层板的理论计算宽度为 485.625mm。数控裁板锯仅支持整数毫米输入，请问经过 round 函数归整后的最终下料尺寸是？',
      formula: 'Width = round(485.625)',
      type: 'choice',
      options: [
        { label: 'A. 485 mm', value: '485', hint: '向下截断' },
        { label: 'B. 486 mm', value: '486', hint: '0.625 >= 0.5，四舍五入进位为 486mm' },
        { label: 'C. 485.6 mm', value: '485.6', hint: '仍带小数' },
        { label: 'D. 490 mm', value: '490', hint: '过度进位' },
      ],
      correctAnswer: '486',
      explanation: '【代入公式计算】：\nround(485.625) = 486 mm。\n【工程意义】：小数位 0.625 大于等于 0.5，按照四舍五入进位至最近的整数 486mm，符合机加工精度要求。',
    },
    {
      id: 'round-2',
      title: '三等分均分尺寸四舍五入计算',
      scenario: '衣柜总内空净宽 W = 1000mm，中间需要均分安装两块竖隔板划分成 3 个完全相等的储物单元（忽略板厚）。单格理论宽度为 1000 / 3 ≈ 333.333mm。使用 round 函数处理后的整数宽度是多少毫米？',
      formula: 'CellW = round(1000 / 3)',
      type: 'input',
      placeholder: '请输入整数毫米值，如 333',
      correctAnswer: '333',
      tolerance: 0,
      unit: 'mm',
      explanation: '【代入公式计算】：\n1000 / 3 = 333.3333...。round(333.333) = 333 mm。\n【工程意义】：前两个格子取 333mm，最后一个格子自动分配 1000 - 333×2 = 334mm，吸收 1mm 公差。',
    },
    {
      id: 'round-3',
      title: '临界值 0.499mm 的取舍判断',
      scenario: '某吊滑门滑轮行程理论测量值为 120.499mm，若使用标准 round 函数四舍五入取整，结果为多少？',
      formula: 'Val = round(120.499)',
      type: 'choice',
      options: [
        { label: 'A. 120 mm', value: '120', hint: '0.499 < 0.5，坚定舍去' },
        { label: 'B. 121 mm', value: '121', hint: '误以为接近 0.5 就进位' },
        { label: 'C. 120.5 mm', value: '120.5', hint: '保留一位小数' },
        { label: 'D. 0 mm', value: '0', hint: '错误' },
      ],
      correctAnswer: '120',
      explanation: '【代入公式计算】：\nround(120.499) = 120。\n【工程意义】：四舍五入严格以 0.5 为界，0.499 哪怕只差 0.001 也必须舍弃为 120。',
    },
  ],
};
