import type { FormulaQuizData } from '../common/quizTypes';

export const absQuizData: FormulaQuizData = {
  formulaName: 'abs 绝对值',
  formulaSymbol: 'abs(x)',
  category: '数学与统计',
  themeColor: '#d97706',
  description: '掌握双向悬挑偏心距、装配对称间隙公差、非负几何跨距求取算法。',
  questions: [
    {
      id: 'abs-1',
      title: '靠窗/靠床双向悬挑书桌外挑净跨距计算',
      scenario: '卧室飘窗连体书桌，设计参数化滑块控制桌板左右伸展偏移量 DeskOffset。当 DeskOffset = -350mm（负号代表向左侧靠窗延伸悬挑）时，需要加装隐形三角工字钢托架的实际物理悬挑跨距是多少？',
      formula: 'Span = abs(DeskOffset)',
      type: 'choice',
      options: [
        { label: 'A. -350 mm', value: '-350', hint: '物理世界不存在负数跨度' },
        { label: 'B. 350 mm', value: '350', hint: 'abs(-350) = 350mm，不论左右均需按 350mm 选用角钢' },
        { label: 'C. 0 mm', value: '0', hint: '误以为相互抵消' },
        { label: 'D. 700 mm', value: '700', hint: '过度放量' },
      ],
      correctAnswer: '350',
      explanation: '【代入公式计算】：\nSpan = abs(-350) = 350 mm。\n【工程意义】：不论桌板朝左靠窗 (-350) 还是朝右靠床 (+350)，悬空自重均相同，必须取绝对值 350mm 触发角钢支撑五金件生成。',
    },
    {
      id: 'abs-2',
      title: '对开门中缝实测拼缝与理论间隙公差偏离值',
      scenario: '双对开衣柜门规范理论中缝标准为 2.0mm。实测某套柜门中缝为 1.2mm，求实测间隙与标准间隙的绝对偏差值是多少毫米？',
      formula: 'Dev = abs(1.2 - 2.0)',
      type: 'input',
      placeholder: '请输入正数毫米值，如 0.8',
      correctAnswer: '0.8',
      tolerance: 0.05,
      unit: 'mm',
      explanation: '【代入公式计算】：\n1.2 - 2.0 = -0.8。Dev = abs(-0.8) = 0.8 mm。\n【工程意义】：门板拼缝公差以绝对误差判定（需控制在 ≤ 0.5mm 范围内），0.8mm 超标，需现场调节铰链螺丝纠偏。',
    },
    {
      id: 'abs-3',
      title: '重力对称分布中心距离校核',
      scenario: '某中岛台面两端分别悬挑 -280mm 和 +310mm，两个悬挑端的净跨度绝对值之和为多少毫米？',
      formula: 'Total = abs(-280) + abs(310)',
      type: 'choice',
      options: [
        { label: 'A. 30 mm', value: '30', hint: '直接相加相消，严重错误' },
        { label: 'B. 590 mm', value: '590', hint: '280 + 310 = 590mm' },
        { label: 'C. 620 mm', value: '620', hint: '取最大值翻倍' },
        { label: 'D. 280 mm', value: '280', hint: '遗漏右侧' },
      ],
      correctAnswer: '590',
      explanation: '【代入公式计算】：\nabs(-280) + abs(310) = 280 + 310 = 590 mm。\n【工程意义】：两端悬挑总净跨为 590mm，用于校核中岛石材大板的整体配重与抗倾覆力矩。',
    },
  ],
};
