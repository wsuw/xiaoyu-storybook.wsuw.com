import type { FormulaQuizData } from '../common/quizTypes';

export const eqNeqQuizData: FormulaQuizData = {
  formulaName: '== 与 != 比较',
  formulaSymbol: '==, !=',
  category: '逻辑与条件',
  themeColor: '#10b981',
  description: '掌握材质工艺完全一致性匹配、开放柜与带门封闭柜形态枚举判别。',
  questions: [
    {
      id: 'eq-1',
      title: '是否带门封闭柜状态布尔判定',
      scenario: '柜体参数枚举中定义了 #HasDoor（1 为带门封闭柜，0 为开放式书架）。当设计方案选择 #HasDoor = 1 时，公式 (#HasDoor == 1) 的返回值是？',
      formula: '#HasDoor == 1',
      type: 'choice',
      options: [
        { label: 'A. true（真）', value: 'true', hint: '1 == 1 成立，驱动生成木质柜门与金属拉手' },
        { label: 'B. false（假）', value: 'false', hint: '不相等时才为假' },
        { label: 'C. 1', value: '1', hint: '布尔值概念' },
        { label: 'D. 报错', value: 'error', hint: '标准等值比较' },
      ],
      correctAnswer: 'true',
      explanation: '【代入公式计算】：\n1 == 1 返回 true。\n【工程意义】：触发 3D 渲染引擎加载掩门模型、铰链安装孔位与拉手开料。',
    },
    {
      id: 'eq-2',
      title: '不等号 (!=) 判定非开放式状态',
      scenario: '若判断条件为 (#HasDoor != 0)，当客户选择开放式展示柜 (#HasDoor = 0) 时，公式返回值是 0 还是 1？',
      formula: '0 != 0',
      type: 'input',
      placeholder: '请输入 0 或 1',
      correctAnswer: '0',
      tolerance: 0,
      unit: '',
      explanation: '【代入公式计算】：\n0 不等于 0 不成立，返回 0 (false)。\n【工程意义】：表示“当前非开放柜”条件不满足，不生成门板构件。',
    },
    {
      id: 'eq-3',
      title: '门板材质与铝框玻璃门联动内置层板灯',
      scenario: '当门板材质 DoorMaterial == "Glass" 时，内部层板必须自动切换为带 45° 铝槽的内嵌式暖光感应灯带。若当前材质为 "Wood"（实木烤漆），公式 DoorMaterial == "Glass" 的判定结果为？',
      formula: '"Wood" == "Glass"',
      type: 'choice',
      options: [
        { label: 'A. false', value: 'false', hint: '字符串不匹配，保持常规无灯板' },
        { label: 'B. true', value: 'true', hint: '完全不一致' },
        { label: 'C. 警告', value: 'warn', hint: '普通布尔比较' },
        { label: 'D. 报错', value: 'error', hint: '支持字符串对比' },
      ],
      correctAnswer: 'false',
      explanation: '【代入公式计算】：\n"Wood" 与 "Glass" 不相等，返回 false。\n【工程意义】：只有装配通透玻璃门时才需展示柜内照明，实木封闭门无需浪费灯带成本。',
    },
  ],
};
