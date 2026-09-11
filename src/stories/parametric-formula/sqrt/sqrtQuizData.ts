import type { FormulaQuizData } from '../common/quizTypes';

export const sqrtQuizData: FormulaQuizData = {
  formulaName: 'sqrt 勾股开方',
  formulaSymbol: 'sqrt(x)',
  category: '空间几何',
  themeColor: '#8b5cf6',
  description: '掌握书架后背 X 形交叉拉杆、酒柜斜撑、对角线方正度检验的精确开料算法。',
  questions: [
    {
      id: 'sqrt-1',
      title: '极简工业风书架对角 X 型拉杆精确下料长度',
      scenario: '某开放式金属框架书柜，单组矩形跨度为宽 W = 800mm，高 H = 600mm。为保证受力抗剪切不晃动，需要制作一根对角交叉不锈钢拉杆，请问这根拉杆两端固定孔心间的净跨距 L 为多少？',
      formula: 'L = sqrt(W² + H²)',
      type: 'choice',
      options: [
        { label: 'A. 1400 mm', value: '1400', hint: 'W + H 线性相加，过长' },
        { label: 'B. 1000 mm', value: '1000', hint: 'sqrt(800² + 600²) = sqrt(640000 + 360000) = 1000' },
        { label: 'C. 900 mm', value: '900', hint: '经验估算' },
        { label: 'D. 1150 mm', value: '1150', hint: '误差巨大' },
      ],
      correctAnswer: '1000',
      explanation: '【代入公式计算】：\nL = sqrt(800² + 600²) = sqrt(640000 + 360000) = sqrt(1000000) = 1000 mm（刚好为 3:4:5 经典勾股数）。\n【工程意义】：拉杆打孔中心距必须分毫不差锁定 1000mm，方可在张紧时形成坚固三角形桁架结构。',
    },
    {
      id: 'sqrt-2',
      title: '大衣柜安装对角线方正度校核公差',
      scenario: '衣柜现场组装时，柜体外廓宽度 W = 900mm，高度 H = 1200mm。安装师傅测量对角线长度以验证柜体是否呈严格直角矩形，该柜体标准的理论对角线长度应该是多少毫米？',
      formula: 'L = sqrt(900² + 1200²)',
      type: 'input',
      placeholder: '请输入整数毫米值，如 1500',
      correctAnswer: '1500',
      tolerance: 1,
      unit: 'mm',
      explanation: '【代入公式计算】：\nL = sqrt(900² + 1200²) = sqrt(810000 + 1440000) = sqrt(2250000) = 1500 mm。\n【工程意义】：两条对角线实测值与 1500mm 的偏差不得超过 ±1.5mm，否则安装抽屉导轨或挂门板后会出现严重偏斜擦挂。',
    },
    {
      id: 'sqrt-3',
      title: '正方形格子柜斜向隔板下料放样',
      scenario: '红酒展示柜内有一个正方形储酒格，边长为 300mm × 300mm。计划安装一块 X 形交叉斜插隔板，单片对角斜隔板的长度为多少毫米？（结果取整到毫米，sqrt(2) ≈ 1.414）',
      formula: 'L = sqrt(2 · 300²) = 300 · sqrt(2)',
      type: 'choice',
      options: [
        { label: 'A. 300 mm', value: '300', hint: '等于边长' },
        { label: 'B. 424 mm', value: '424', hint: '300 × 1.4142 ≈ 424.26 mm' },
        { label: 'C. 600 mm', value: '600', hint: '周长折半' },
        { label: 'D. 450 mm', value: '450', hint: '过度放量' },
      ],
      correctAnswer: '424',
      explanation: '【代入公式计算】：\nL = sqrt(300² + 300²) = 300 × sqrt(2) ≈ 300 × 1.4142 = 424.26 mm ≈ 424 mm。\n【工程意义】：数控机床开料时若设为 424mm，正好严丝合缝嵌入正方形内格。',
    },
  ],
};
