import type { FormulaQuizData } from '../common/quizTypes';

export const trimavgQuizData: FormulaQuizData = {
  formulaName: 'trimavg 剔除非公式项平均',
  formulaSymbol: 'trimavg(...)',
  category: '数值运算',
  themeColor: '#0284c7',
  description: '掌握嵌入式蒸烤箱锁定仓后、其余动态收纳格的自适应均摊开料算法。',
  questions: [
    {
      id: 'trimavg-1',
      title: '剔除嵌入式蒸烤箱锁定仓后均分剩余收纳格',
      scenario: '一组高柜由 3 个纵向单元组成，总内空高 2100mm。中间锁定为 450mm 高的嵌入式蒸烤箱独立仓。若采用 trimavg 剔除该锁定常数项，上下两组自由收纳格的平均可用净高度是多少？',
      formula: 'trimavg: (2100 - 450) / 2',
      type: 'choice',
      options: [
        { label: 'A. 700 mm', value: '700', hint: '2100/3 未剔除锁定项' },
        { label: 'B. 825 mm', value: '825', hint: '(2100 - 450) / 2 = 1650 / 2 = 825mm' },
        { label: 'C. 800 mm', value: '800', hint: '估算' },
        { label: 'D. 900 mm', value: '900', hint: '偏大' },
      ],
      correctAnswer: '825',
      explanation: '【代入公式计算】：\n剔除 450mm 锁定项后，剩余总高 1650mm。由剩余 2 个动态格均摊：1650 / 2 = 825 mm。\n【工程意义】：上下各生成 825mm 门板，保证电器完美居中且上下两门高度完全一致对称。',
    },
    {
      id: 'trimavg-2',
      title: '书架剔除最下层放重物的高格后均分剩余层高',
      scenario: '书架总净高 1800mm，划分为 4 层。最底层锁死 480mm 用于放置大画册与收纳箱。使用 trimavg 公式计算其余 3 个标准书本格的均摊高度是多少毫米？',
      formula: '(1800 - 480) / 3',
      type: 'input',
      placeholder: '请输入整数毫米值，如 440',
      correctAnswer: '440',
      tolerance: 0,
      unit: 'mm',
      explanation: '【代入公式计算】：\n(1800 - 480) / 3 = 1320 / 3 = 440 mm。\n【工程意义】：剩余 3 层均分 440mm，每一层都能轻松放下 A4 尺寸立式文件夹。',
    },
    {
      id: 'trimavg-3',
      title: '多格柜体剔除两端封边收口条后的中间格均宽',
      scenario: '整墙衣柜总开间 2400mm，左右两端各锁死 60mm 墙面找平调整条。中间 4 扇大平开门的单扇均分门板宽度为多少毫米？',
      formula: '(2400 - 60 × 2) / 4',
      type: 'choice',
      options: [
        { label: 'A. 600 mm', value: '600', hint: '未扣除调整板' },
        { label: 'B. 570 mm', value: '570', hint: '(2400 - 120) / 4 = 2280 / 4 = 570mm' },
        { label: 'C. 550 mm', value: '550', hint: '偏小' },
        { label: 'D. 580 mm', value: '580', hint: '仅扣除一侧' },
      ],
      correctAnswer: '570',
      explanation: '【代入公式计算】：\n(2400 - 120) / 4 = 2280 / 4 = 570 mm。\n【工程意义】：四扇柜门单扇门宽 570mm，在 450~600mm 单门舒适开合黄金宽度区间内。',
    },
  ],
};
