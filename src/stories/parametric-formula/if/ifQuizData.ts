import type { FormulaQuizData } from '../common/quizTypes';

export const ifQuizData: FormulaQuizData = {
  formulaName: 'if 条件判断',
  formulaSymbol: 'if(condition, a, b)',
  category: '逻辑与条件',
  themeColor: '#e11d48',
  description: '掌握单开门与对开门自动切换、铰链数量智能升档、自适应五金选型算法。',
  questions: [
    {
      id: 'if-1',
      title: '柜体单开门与对开双门自动切换分水岭',
      scenario: '某餐边地柜门洞开间宽度为 W。按人体工程学与铰链承载标准：当门洞宽度 W ≤ 600mm 时生成单扇平开门；当宽度 W > 600mm 时自动切换为对开双门。若某客户定制的柜体宽度 W = 750mm，生成的门板结构形态与单扇门板下料宽度大约是？',
      formula: 'if(W > 600, "对开双门", "单开门")',
      type: 'choice',
      options: [
        { label: 'A. 生成单扇门，宽 750mm', value: 'single', hint: '力矩过大易下垂变形' },
        { label: 'B. 生成对开双门，每扇宽约 373mm', value: 'double', hint: 'W > 600 触发对开双门，(750 - 中缝4mm) / 2 ≈ 373mm' },
        { label: 'C. 无法生成', value: 'error', hint: '参数在合法范围内' },
        { label: 'D. 生成推拉门', value: 'sliding', hint: '非配置设定' },
      ],
      correctAnswer: 'double',
      explanation: '【代入公式计算】：\n750 > 600 为真，if 条件命中对开双门分支。\n【工程意义】：单扇门板超过 600mm 开启力矩激增，铰链极易松脱下坠。自动切换为对开双门，兼顾美观与使用寿命。',
    },
    {
      id: 'if-2',
      title: '门板超高自动增加铰链数量',
      scenario: '平开门铰链算法规则为：if(H > 2000, 4, 3)，即当门高超过 2000mm 时需要 4 只铰链，否则 3 只。已知定制通顶衣柜门实测高度 H = 2200mm，请问需要安装几只铰链？',
      formula: 'Hinges = if(H > 2000, 4, 3)',
      type: 'input',
      placeholder: '请输入整数数量，如 4',
      correctAnswer: '4',
      tolerance: 0,
      unit: '只',
      explanation: '【代入公式计算】：\n2200 > 2000 为真，返回 4。\n【工程意义】：2200mm 属于大门板，增加第四只铰链可有效约束中上部受拉形变，防止门板翘曲。',
    },
    {
      id: 'if-3',
      title: '临界值 W = 600mm 的逻辑真假边界',
      scenario: '公式为 if(W <= 600, 1, 2)。当客户柜体宽度恰好等于 600mm 时，公式返回值为多少？',
      formula: 'if(600 <= 600, 1, 2)',
      type: 'choice',
      options: [
        { label: 'A. 1（单门）', value: '1', hint: '600 <= 600 为真，返回 1' },
        { label: 'B. 2（双门）', value: '2', hint: '为假时才返回' },
        { label: 'C. 0', value: '0', hint: '不存在' },
        { label: 'D. 报错', value: 'error', hint: '语法完全正确' },
      ],
      correctAnswer: '1',
      explanation: '【代入公式计算】：\n600 <= 600 条件成立（真），返回 1。\n【工程意义】：600mm 正好压在线上，仍属于单开门极限安全值。',
    },
  ],
};
