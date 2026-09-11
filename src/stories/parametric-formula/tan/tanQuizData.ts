import type { FormulaQuizData } from '../common/quizTypes';

export const tanQuizData: FormulaQuizData = {
  formulaName: 'tan(θ) 正切斜率',
  formulaSymbol: 'tan(θ)',
  category: '空间几何',
  themeColor: '#059669',
  description: '掌握楼梯斜梁坡度、阶梯收纳柜高度递增与斜顶阁楼吊顶尺寸联动推导。',
  questions: [
    {
      id: 'tan-1',
      title: '楼梯踏步下沿阶梯柜单步高差联动',
      scenario: '某复式住宅钢结构楼梯倾斜角 θ = 35°。楼梯下方规划做阶梯式储物柜，已知每个独立收纳柜单元的宽度踏深 W = 400mm，那么相邻两级储物柜的高度差 ΔH 应设定为多少毫米才能精准贴合楼梯斜梁？（tan(35°) ≈ 0.700）',
      formula: 'ΔH = W · tan(θ)',
      type: 'choice',
      options: [
        { label: 'A. 280 mm', value: '280', hint: '400 × 0.700 = 280mm' },
        { label: 'B. 400 mm', value: '400', hint: '45° 才会相等' },
        { label: 'C. 200 mm', value: '200', hint: '相差过大，产生巨大三角缝隙' },
        { label: 'D. 350 mm', value: '350', hint: '角度与高度混淆' },
      ],
      correctAnswer: '280',
      explanation: '【代入公式计算】：\nΔH = W · tan(θ) = 400 × tan(35°) ≈ 400 × 0.700 = 280 mm。\n【工程意义】：每向前推进 400mm 宽度，柜顶高度抬高 280mm，柜体上沿与楼梯斜梁下口保持平齐严丝合缝。',
    },
    {
      id: 'tan-2',
      title: '斜顶阁楼斜切端头最高柜体落差计算',
      scenario: '阁楼屋顶倾斜夹角 θ = 30°（tan(30°) ≈ 0.577）。定制一组沿斜顶延伸的总长 L = 1200mm 的矮柜，由于屋顶倾斜下压，柜体最高点与最低点的高度落差 H 为多少毫米？（取整到毫米）',
      formula: 'H = L · tan(θ)',
      type: 'input',
      placeholder: '请输入整数毫米值，如 692',
      correctAnswer: '692',
      tolerance: 2,
      unit: 'mm',
      explanation: '【代入公式计算】：\nH = 1200 × tan(30°) = 1200 × 0.57735 ≈ 692.8 mm ≈ 692 mm。\n【工程意义】：下料切角斜封板时，立板净高度落差必须精确保留 692mm，方可顺应斜梁斜角严密收边。',
    },
    {
      id: 'tan-3',
      title: '坡度 45° 极限斜角阶梯柜特征',
      scenario: '对于特殊陡坡阁楼折叠梯，其坡度角刚好达到 θ = 45°。若单格抽屉宽度为 300mm，那么每级柜体的高度递增值是多少？',
      formula: 'tan(45°) = 1.0, ΔH = W · 1.0 = W',
      type: 'choice',
      options: [
        { label: 'A. 150 mm', value: '150', hint: '折半' },
        { label: 'B. 300 mm', value: '300', hint: 'tan(45°)=1，步高与步宽 1:1 等长' },
        { label: 'C. 424 mm', value: '424', hint: '斜边对角线混淆' },
        { label: 'D. 600 mm', value: '600', hint: '加倍' },
      ],
      correctAnswer: '300',
      explanation: '【代入公式计算】：\n因为 tan(45°) = 1.0，所以 ΔH = W · tan(45°) = 300 × 1 = 300 mm。\n【工程意义】：45度坡度下宽与高 1:1 等比例对称，阶梯柜正好呈现正方形网格阶跃。',
    },
  ],
};
