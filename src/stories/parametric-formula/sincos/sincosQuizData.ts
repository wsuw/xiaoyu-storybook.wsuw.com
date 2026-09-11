import type { FormulaQuizData } from '../common/quizTypes';

export const sincosQuizData: FormulaQuizData = {
  formulaName: 'sin(θ) 与 cos(θ) 三角圆周',
  formulaSymbol: 'sin(θ), cos(θ)',
  category: '空间几何',
  themeColor: '#f43f5e',
  description: '掌握隐形门、旋转电视柱、玄关旋转鞋架等回转半径与防碰包络线精确物理坐标计算。',
  questions: [
    {
      id: 'sincos-1',
      title: '隐形门 90° 全开通行时横向开间占用',
      scenario: '卧室隐形门门扇净宽 W = 860mm，当旋转开门角度达到 θ = 90° 全开状态时，该门扇在墙体开间横向（X轴方向）的投影尺寸是多少？',
      formula: 'X = W · cos(θ)',
      type: 'choice',
      options: [
        { label: 'A. 860 mm', value: '860', hint: '门扇完全挡住门口' },
        { label: 'B. 0 mm', value: '0', hint: '门扇转入室内进深方向，横向完全释放' },
        { label: 'C. 430 mm', value: '430', hint: '45° 折半状态' },
        { label: 'D. 608 mm', value: '608', hint: '30° 倾斜状态' },
      ],
      correctAnswer: '0',
      explanation: '【代入公式计算】：\nX = W · cos(90°) = 860 × 0 = 0 mm。\n【工程意义】：当门扇旋转到 90° 时，cos(90°) = 0，门扇与墙面垂直，横向门口开间完全释放，通道无任何阻碍。',
    },
    {
      id: 'sincos-2',
      title: '开门 30° 时向前推入室内进深的净空占用 (Z 轴)',
      scenario: '客餐厅有一扇 W = 800mm 的平开门，在开门至 θ = 30° 时，门扇外边缘向前探入房间内部（Z 轴进深方向）的净尺寸为多少毫米？',
      formula: 'Z = W · sin(θ)',
      type: 'input',
      placeholder: '请输入计算数值，如 400',
      correctAnswer: '400',
      tolerance: 1,
      unit: 'mm',
      explanation: '【代入公式计算】：\nZ = W · sin(30°) = 800 × 0.5 = 400 mm。\n【工程意义】：门扇向前探入室内 400mm，设计时必须保证该 400mm 纵深范围内无开关插座、绿植花架或餐椅阻碍，否则开门即磕碰！',
    },
    {
      id: 'sincos-3',
      title: '玄关 360° 旋转鞋架转角极值干涉半径校核',
      scenario: '玄关鞋柜内置 360° 旋转五金鞋架，其长方体外廓尺寸为宽 700mm、深 300mm。若以几何中心为回转轴，该旋转鞋架旋转一周所需柜体内胆的最小无干涉净内径（即对角线包络直径）是多少？',
      formula: 'R = sqrt((W/2)² + (D/2)²), 包络圆直径 Φ = 2R = sqrt(W² + D²)',
      type: 'choice',
      options: [
        { label: 'A. 700 mm', value: '700', hint: '仅满足宽度，转动即卡死' },
        { label: 'B. 762 mm', value: '762', hint: '对角线净直径：sqrt(700² + 300²) ≈ 761.58' },
        { label: 'C. 1000 mm', value: '1000', hint: '宽加深线性相加，过分浪费空间' },
        { label: 'D. 650 mm', value: '650', hint: '小于极限尺寸' },
      ],
      correctAnswer: '762',
      explanation: '【代入公式计算】：\n由于鞋架随角度 θ 旋转时，端点坐标为 (X, Z) = (R·cosθ, R·sinθ)，回转包络线为以外接圆对角线为直径的圆：\nΦ = sqrt(700² + 300²) = sqrt(490000 + 90000) = sqrt(580000) ≈ 761.58 mm ≈ 762 mm。\n【工程意义】：因此定制玄关柜内胆净宽与净深至少需要保留 ≥ 780mm（预留安全安装缝隙），避免旋转时蹭刮侧板。',
    },
  ],
};
