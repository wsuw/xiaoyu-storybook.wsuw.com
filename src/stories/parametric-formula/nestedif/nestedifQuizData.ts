import type { FormulaQuizData } from '../common/quizTypes';

export const nestedifQuizData: FormulaQuizData = {
  formulaName: 'nestedif 阶梯判断',
  formulaSymbol: 'nestedif(cond1, v1, cond2, v2, ...)',
  category: '逻辑与条件',
  themeColor: '#7c3aed',
  description: '掌握柜体跨度多级分腔、阶梯厚度选材、阶梯计价与结构分级的算法。',
  questions: [
    {
      id: 'nestedif-1',
      title: '柜体总宽多级分腔算法匹配',
      scenario: '衣柜内部分腔阶梯规则为：宽度 ≤ 800mm 为 1 腔；≤ 1500mm 为 2 腔；≤ 2200mm 为 3 腔；超过 2200mm 为 4 腔。某客户定制的主卧整墙大衣柜实测总宽度 W = 1800mm，公式将为其分配几腔结构？',
      formula: 'nestedif(W<=800, 1, W<=1500, 2, W<=2200, 3, 4)',
      type: 'choice',
      options: [
        { label: 'A. 1 腔', value: '1', hint: '800mm 以内' },
        { label: 'B. 2 腔', value: '2', hint: '1500mm 以内' },
        { label: 'C. 3 腔', value: '3', hint: '1800 <= 2200 命中第3分支，分配 3 腔（每腔约 600mm）' },
        { label: 'D. 4 腔', value: '4', hint: '需 > 2200mm' },
      ],
      correctAnswer: '3',
      explanation: '【代入公式计算】：\n1800 <= 800 (假) -> 1800 <= 1500 (假) -> 1800 <= 2200 (真) -> 返回 3。\n【工程意义】：1800mm 分为 3 腔，每腔净宽约 580mm，正好对应 3 扇标准挂衣柜门，结构最稳定。',
    },
    {
      id: 'nestedif-2',
      title: '超大跨度整墙柜的兜底默认值匹配',
      scenario: '当上述公式面对 W = 2500mm 的豪华衣帽间整墙柜时，最终将触发第几级分腔（返回几腔）？',
      formula: 'nestedif(2500<=800, 1, 2500<=1500, 2, 2500<=2200, 3, 4)',
      type: 'input',
      placeholder: '请输入整数腔数，如 4',
      correctAnswer: '4',
      tolerance: 0,
      unit: '腔',
      explanation: '【代入公式计算】：\n前三个条件均不满足，执行最后的默认分支值 4。\n【工程意义】：2500mm 划分为 4 腔（每腔约 625mm），防止单跨层板过长下凹变形。',
    },
    {
      id: 'nestedif-3',
      title: '短路求值特性判定',
      scenario: '对于嵌套阶梯公式，若判断顺序为 W <= 1200 返回 A，W <= 600 返回 B。当 W = 500 时，系统会返回哪项？',
      formula: 'nestedif(W <= 1200, "A", W <= 600, "B", "C")',
      type: 'choice',
      options: [
        { label: 'A. 返回 A', value: 'A', hint: '500 <= 1200 首先满足即短路返回，无法到达 B！' },
        { label: 'B. 返回 B', value: 'B', hint: '逻辑被前序分支截胡' },
        { label: 'C. 返回 C', value: 'C', hint: '不满足才进' },
        { label: 'D. 报错', value: 'error', hint: '语法合法但逻辑有缺陷' },
      ],
      correctAnswer: 'A',
      explanation: '【代入公式计算】：\n程序从左往右执行，500 <= 1200 为真立即返回 A 退出。\n【工程警示】：编写 nestedif 阶梯条件时，必须从小到大（或从大到小）严格单调排列，避免大范围分支遮挡小范围分支！',
    },
  ],
};
