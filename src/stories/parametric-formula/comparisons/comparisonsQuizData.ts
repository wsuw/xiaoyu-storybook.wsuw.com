import type { FormulaQuizData } from '../common/quizTypes';

export const comparisonsQuizData: FormulaQuizData = {
  formulaName: '数值区间比较 (<, >, <=, >=)',
  formulaSymbol: '<, >, <=, >=',
  category: '逻辑与条件',
  themeColor: '#eab308',
  description: '掌握吊柜离地安全红线 1550mm 防碰头警告、台面高度人体工学区间判别。',
  questions: [
    {
      id: 'comp-1',
      title: '厨房吊柜人体工学离地净高安全红线',
      scenario: '厨房吊柜离地安装高度 H 若低于 1550mm，做饭切菜、洗碗时极易发生额头磕碰；若 ≥ 1550mm 则判定为安全放行。若安装师傅实测 H = 1450mm，公式 IsSafe = (H >= 1550) 的判定结果为？',
      formula: 'IsSafe = (H >= 1550)',
      type: 'choice',
      options: [
        { label: 'A. true（安全放行）', value: 'true', hint: '1450 < 1550' },
        { label: 'B. false（碰头警报，违规拦截）', value: 'false', hint: '1450 >= 1550 不成立，触发严重碰头预警' },
        { label: 'C. 无法计算', value: 'error', hint: '数值比较确定' },
        { label: 'D. null', value: 'null', hint: '标准布尔结果' },
      ],
      correctAnswer: 'false',
      explanation: '【代入公式计算】：\n1450 >= 1550 为假 (false)。\n【工程意义】：系统判定不安全，自动在三维视图中将吊柜边缘渲染为高亮红色警示条，提醒设计师重新抬升挂柜标高。',
    },
    {
      id: 'comp-2',
      title: '临界高度刚好压在 1550mm 线上',
      scenario: '当吊柜实测高度 H 恰好等于 1550mm 时，在 >= 1550 的判定下，返回值是 1 (true) 还是 0 (false)？',
      formula: '1550 >= 1550',
      type: 'input',
      placeholder: '请输入 0 或 1',
      correctAnswer: '1',
      tolerance: 0,
      unit: '',
      explanation: '【代入公式计算】：\n1550 >= 1550 成立，返回 1 (true)。\n【工程意义】：大于等于包含端点边界，1550mm 刚好跨过人体工学及格线。',
    },
    {
      id: 'comp-3',
      title: '地柜台面人体工学舒适黄金区间复合比较',
      scenario: '人体工学地柜台面推荐高度为 800mm 到 900mm 之间。判断公式写作 (H >= 800) && (H <= 900)。若实测台面高度 H = 850mm，判定结果是？',
      formula: '(850 >= 800) && (850 <= 900)',
      type: 'choice',
      options: [
        { label: 'A. true（处于舒适区间）', value: 'true', hint: '800 <= 850 <= 900' },
        { label: 'B. false（太高或太矮）', value: 'false', hint: '未超标' },
        { label: 'C. 警告', value: 'warn', hint: '已满足' },
        { label: 'D. 报错', value: 'error', hint: '语法正确' },
      ],
      correctAnswer: 'true',
      explanation: '【代入公式计算】：\n850 在 [800, 900] 区间内，返回 true。\n【工程意义】：850mm 为中国大多数家庭主妇/主夫备菜舒适高度，无需弯腰也不会耸肩。',
    },
  ],
};
