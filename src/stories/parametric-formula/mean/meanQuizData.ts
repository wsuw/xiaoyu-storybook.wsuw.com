import type { FormulaQuizData } from '../common/quizTypes';

export const meanQuizData: FormulaQuizData = {
  formulaName: 'mean 算术平均',
  formulaSymbol: 'mean(a, b, ...)',
  category: '数值运算',
  themeColor: '#14b8a6',
  description: '掌握开放格均分宽度、多孔位排钻间距平衡、多段标高取平的工程算法。',
  questions: [
    {
      id: 'mean-1',
      title: '客餐厅书柜 4 个开放格平均宽度计算',
      scenario: '某书柜总内空有效净宽度为 1400mm，中间由 3 块隔板划分为 4 个均等储物格（每块竖隔板厚度 18mm，3块共占 54mm）。剩余可用净开间为 1400 - 54 = 1346mm。请问每个储物格的平均净宽度为多少毫米？',
      formula: 'CellW = mean(1346 / 4)',
      type: 'choice',
      options: [
        { label: 'A. 350 mm', value: '350', hint: '未扣除隔板厚度' },
        { label: 'B. 336.5 mm', value: '336.5', hint: '1346 / 4 = 336.5mm' },
        { label: 'C. 320 mm', value: '320', hint: '扣除过多' },
        { label: 'D. 300 mm', value: '300', hint: '误差过大' },
      ],
      correctAnswer: '336.5',
      explanation: '【代入公式计算】：\n(1400 - 54) / 4 = 1346 / 4 = 336.5 mm。\n【工程意义】：4个储物格严格等距排布，每个格净空 336.5mm，视觉对称韵律感最佳。',
    },
    {
      id: 'mean-2',
      title: '三块活动层板高度标高平均值',
      scenario: '衣柜内打孔排布 3 块活动层板，离地高度分别为 450mm、900mm、1350mm。这三块层板的高度的算术平均值是多少毫米？',
      formula: 'mean(450, 900, 1350)',
      type: 'input',
      placeholder: '请输入整数毫米值，如 900',
      correctAnswer: '900',
      tolerance: 0,
      unit: 'mm',
      explanation: '【代入公式计算】：\n(450 + 900 + 1350) / 3 = 2700 / 3 = 900 mm。\n【工程意义】：等差数列中心点正好落在 900mm（人体站立悬臂取物黄金高度区）。',
    },
    {
      id: 'mean-3',
      title: '玄关鞋柜层板承重测试四点均值',
      scenario: '对定制加厚蜂窝层板做静压测试，四角受力点承重示数分别为 22kg, 28kg, 24kg, 26kg。该层板承受的平均载荷是多少？',
      formula: 'mean(22, 28, 24, 26)',
      type: 'choice',
      options: [
        { label: 'A. 25 kg', value: '25', hint: '(22+28+24+26)/4 = 100/4 = 25kg' },
        { label: 'B. 24 kg', value: '24', hint: '偏低' },
        { label: 'C. 26 kg', value: '26', hint: '偏高' },
        { label: 'D. 28 kg', value: '28', hint: '最大值' },
      ],
      correctAnswer: '25',
      explanation: '【代入公式计算】：\n(22 + 28 + 24 + 26) / 4 = 100 / 4 = 25 kg。\n【工程意义】：平均单点荷载 25kg，符合承重五金标准。',
    },
  ],
};
