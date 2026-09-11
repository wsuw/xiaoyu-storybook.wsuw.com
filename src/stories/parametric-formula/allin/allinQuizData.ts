import type { FormulaQuizData } from '../common/quizTypes';

export const allinQuizData: FormulaQuizData = {
  formulaName: 'AllIn 集合包含',
  formulaSymbol: 'AllIn(targetSet, subset)',
  category: '逻辑与条件',
  themeColor: '#059669',
  description: '掌握重型浴室柜「悬空无地脚 + 大理石岩板台面 + 双人双台盆」三大重载项必须全集包含的安全工字钢加固算法。',
  questions: [
    {
      id: 'allin-1',
      title: '重型浴室柜三联重载全集包含判定',
      scenario: '结构安全规范要求：当浴室柜同时包含三大重载配置：①极简悬空壁挂 (isFloating) ②大理石岩板台面 (hasSinteredStone) ③双人双台盆 (hasDoubleBasin) 时，必须全集包含才强制在墙体内预埋加厚重型镀锌方管承重钢架。若用户选配了这三项以及智能LED镜柜与感应夜灯，判定结果是？',
      formula: 'AllIn(选配集合, [悬空, 岩板, 双盆])',
      type: 'choice',
      options: [
        { label: 'A. true（三大件全部包含，触发预埋钢架）', value: 'true', hint: '三大必选项属于选配集合的子集，AllIn 成立' },
        { label: 'B. false（未全部包含）', value: 'false', hint: '缺一不可' },
        { label: 'C. 无法判定', value: 'unknown', hint: '条件充足' },
        { label: 'D. 报错', value: 'error', hint: '集合运算合法' },
      ],
      correctAnswer: 'true',
      explanation: '【代入公式计算】：\n目标集合包含所有这三项，AllIn 返回 true。\n【工程意义】：双盆盛水加上沉重岩板悬挑总重超 100kg，全集命中立即生成 3.0mm 壁厚三角钢托架，防止多年使用后拉裂瓷砖坠落。',
    },
    {
      id: 'allin-2',
      title: '仅选配其中两项时的 AllIn 严格子集判定',
      scenario: '用户选配了「极简悬空」和「大理石岩板」，但选配的是普通单台盆（未勾选双台盆）。对于 AllIn(用户配置, [悬空, 岩板, 双盆])，返回的布尔值是 1 还是 0？',
      formula: 'AllIn([悬空, 岩板], [悬空, 岩板, 双盆])',
      type: 'input',
      placeholder: '请输入 0 或 1',
      correctAnswer: '0',
      tolerance: 0,
      unit: '',
      explanation: '【代入公式计算】：\n子集缺少“双盆”，AllIn 判定失败，返回 0 (false)。\n【工程意义】：单盆自重在标准膨胀螺栓安全荷载内，无需动用昂贵的预埋焊制钢架，为客户节约非必要五金成本。',
    },
    {
      id: 'allin-3',
      title: 'AllIn 与 逻辑 Or 的核心差异',
      scenario: '在五金安全防坠设计中，为何必须使用 AllIn 集合包含，而不是简单的 Or 逻辑或？',
      formula: 'AllIn(全集包含) vs Or(任一满足)',
      type: 'choice',
      options: [
        { label: 'A. 因为只有当所有重载危险因素全部叠加集中时，才真正突破了常规轻型五金的物理承载极限', value: 'accurate', hint: '精准风控，避免过度设计或漏报' },
        { label: 'B. 因为运算速度更快', value: 'speed', hint: '非核心原因' },
        { label: 'C. 语法要求', value: 'syntax', hint: '设计逻辑驱动' },
        { label: 'D. 随意选取的', value: 'random', hint: '不严谨' },
      ],
      correctAnswer: 'accurate',
      explanation: '【工程解析】：\n如果用 Or，只要用户选了悬空就强制买大型钢架，会造成严重过度设计；如果不用全集包含，一旦三者齐备容易因普通螺栓断裂发生坠落事故。AllIn 是精准风控的黄金法则。',
    },
  ],
};
