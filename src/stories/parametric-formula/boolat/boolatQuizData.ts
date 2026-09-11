import type { FormulaQuizData } from '../common/quizTypes';

export const boolatQuizData: FormulaQuizData = {
  formulaName: 'BoolAt 严格一致',
  formulaSymbol: 'BoolAt(vector, index, expected)',
  category: '逻辑与条件',
  themeColor: '#8b5cf6',
  description: '掌握多模块衣帽间按固定索引位严格比对特征（长衣区、首饰抽、茶玻门）的严密逻辑。',
  questions: [
    {
      id: 'boolat-1',
      title: '模块索引位置严格一致性判定',
      scenario: '某组合衣柜由 3 个独立功能模块位组成：[位置0: 长衣悬挂区, 位置1: 首饰抽屉裤架, 位置2: 铝框茶玻展示柜]。若设计方案在位置1配置了首饰抽屉（即布尔数组为 [1, 1, 1]），则 BoolAt(Modules, 1, true) 的判定结果为？',
      formula: 'BoolAt(Modules, 1, true)',
      type: 'choice',
      options: [
        { label: 'A. true（严格一致）', value: 'true', hint: '索引1处的值确实为 true' },
        { label: 'B. false（不一致）', value: 'false', hint: '相符' },
        { label: 'C. 报错', value: 'error', hint: '索引合法' },
        { label: 'D. null', value: 'null', hint: '布尔类型确定' },
      ],
      correctAnswer: 'true',
      explanation: '【代入公式计算】：\nModules[1] 的布尔值为 true，与期望值 true 严格一致，返回 true。\n【工程意义】：精准定位特定开间插槽，触发该插槽专属爱马仕橙丝绒内胆首饰抽屉五金放样。',
    },
    {
      id: 'boolat-2',
      title: '某功能模块缺席时的判定',
      scenario: '若用户将位置2的茶玻展示柜关闭，仅保留板木门（Modules[2] = false）。此时公式 BoolAt(Modules, 2, true) 的返回布尔数字是 0 还是 1？',
      formula: 'BoolAt([1, 1, 0], 2, true)',
      type: 'input',
      placeholder: '请输入 0 或 1',
      correctAnswer: '0',
      tolerance: 0,
      unit: '',
      explanation: '【代入公式计算】：\n实际值 false 与期望值 true 不符，返回 0 (false)。\n【工程意义】：位置2不满足茶玻配置，取消内嵌式感应变色灯条与名品展示架渲染。',
    },
    {
      id: 'boolat-3',
      title: 'BoolAt 的位掩码校验工程优势',
      scenario: '在现代模块化家具参数系统中，BoolAt 相比离散变量传参的最大优势是：',
      formula: 'BoolAt(位向量系统)',
      type: 'choice',
      options: [
        { label: 'A. 能够以固定卡槽顺序进行严密校验，避免模块位置错乱和顺序冲突', value: 'slot_safe', hint: '保证各功能区对号入座，不会把首饰抽错放到悬挂区' },
        { label: 'B. 占用内存更小', value: 'mem', hint: '非主要因素' },
        { label: 'C. 渲染速度更快', value: 'speed', hint: '逻辑层非渲染层' },
        { label: 'D. 无需任何参数', value: 'noparam', hint: '需要数组与索引' },
      ],
      correctAnswer: 'slot_safe',
      explanation: '【工程解析】：\nBoolAt 实现了强类型的插槽位置绑定，确保在整墙组合定制中，特定五金结构精准且严格地装配在预设空间工位上。',
    },
  ],
};
