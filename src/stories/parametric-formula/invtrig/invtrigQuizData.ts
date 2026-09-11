import type { FormulaQuizData } from '../common/quizTypes';

export const invtrigQuizData: FormulaQuizData = {
  formulaName: '反三角函数 (asin, acos, atan)',
  formulaSymbol: 'asin, acos, atan',
  category: '空间几何',
  themeColor: '#0ea5e9',
  description: '掌握厨房上翻吊柜气撑开合角度反算、顶吸油烟机防碰干涉、倾角回算的物理算法。',
  questions: [
    {
      id: 'invtrig-1',
      title: '上翻吊柜门板抬升高度反算当前仰角',
      scenario: '厨房重型折叠上翻门高度门长 L = 400mm。在气撑顶杆推升下，门板下沿垂直离地净抬升高度达到 H = 200mm。请利用反正弦函数计算出当前门板与水平线之间的仰角 θ 是多少度？',
      formula: 'θ = asin(H / L) · (180° / π)',
      type: 'choice',
      options: [
        { label: 'A. 45°', value: '45', hint: 'sin(45°) ≈ 0.707' },
        { label: 'B. 30°', value: '30', hint: 'sin(30°) = 200 / 400 = 0.5' },
        { label: 'C. 60°', value: '60', hint: 'sin(60°) ≈ 0.866' },
        { label: 'D. 90°', value: '90', hint: 'sin(90°) = 1.0' },
      ],
      correctAnswer: '30',
      explanation: '【代入公式计算】：\nsin(θ) = H / L = 200 / 400 = 0.5。\nθ = asin(0.5) = 30°。\n【工程意义】：门板开启角度为 30°，气压杆处于第一档阻尼平衡位。',
    },
    {
      id: 'invtrig-2',
      title: '利用直角两边尺寸反求楼梯坡度倾角 (atan)',
      scenario: '楼梯间实测踏步高度净差 H = 700mm，踏步水平净跨总长 W = 1000mm。若要通过参数化公式反算楼梯斜梁的真实坡度夹角 θ（取整到整数度数），请问是多少度？（arctan(0.7) ≈ 34.99°）',
      formula: 'θ = atan(H / W) · (180° / π)',
      type: 'input',
      placeholder: '请输入整数角度值，如 35',
      correctAnswer: '35',
      tolerance: 1,
      unit: '°',
      explanation: '【代入公式计算】：\ntan(θ) = H / W = 700 / 1000 = 0.7。\nθ = atan(0.7) ≈ 34.992° ≈ 35°。\n【工程意义】：家用室内楼梯最舒适人体工程学坡度在 30°~38° 之间，35° 坡度兼顾行走轻便与节约空间。',
    },
    {
      id: 'invtrig-3',
      title: '油烟机上方吊柜门开门仰角极限避碰',
      scenario: '顶吸式油烟机上方的上翻柜门，若门板总长 L = 500mm，天花板下挂装饰石膏线在门轴上方净高度仅留有 H = 353mm。门板上翻时的最大极限安全仰角（不碰天花板）大约为多少度？（353/500 ≈ 0.7071）',
      formula: 'θ_max = asin(353 / 500)',
      type: 'choice',
      options: [
        { label: 'A. 30°', value: '30', hint: '仍有较大上翻余量' },
        { label: 'B. 45°', value: '45', hint: 'asin(0.7071) = 45°' },
        { label: 'C. 60°', value: '60', hint: '超出天花板必撞' },
        { label: 'D. 90°', value: '90', hint: '垂直直立' },
      ],
      correctAnswer: '45',
      explanation: '【代入公式计算】：\nsin(θ) = 353 / 500 = 0.706 ≈ 0.7071。\nθ = asin(0.7071) = 45°。\n【工程意义】：气撑五金必须选配带 45° 机械限位停顿功能的气撑杆，否则门板一旦完全撑起即会狠狠撞击天花石膏吊顶！',
    },
  ],
};
