// 参数化公式系统故事数据模型与公式定义

export interface FormulaStory {
  id: string;
  name: string;
  category: 'logic' | 'math' | 'geometry';
  categoryName: string;
  formula: string;
  sampleInput: string;
  storyTitle: string;
  subtitle: string;
  narrative: string;
  roleExplanation: string;
  colorTheme: string;
  accent: string;
  // 3D 演示交互参数初始值与配置
  paramDef: {
    name: string;
    label: string;
    min: number;
    max: number;
    step: number;
    defaultVal: number;
    unit?: string;
  };
  // 辅助参数（如第二个输入项）
  paramDef2?: {
    name: string;
    label: string;
    min: number;
    max: number;
    step: number;
    defaultVal: number;
    unit?: string;
  };
}

export const FORMULA_STORIES: FormulaStory[] = [
  // 1. if
  {
    id: 'if',
    name: 'if(条件, 值1, 值2)',
    category: 'logic',
    categoryName: '条件逻辑',
    formula: 'if(#W < 500, 350, 450)',
    sampleInput: '#W < 500 ? 350 : 450',
    storyTitle: '窄道玄关柜与抽屉避让',
    subtitle: 'Chapter 01: The Conditional Choice',
    narrative:
      '客户家玄关空间狭长。小宇设定：当柜体宽度 #W 小于 500mm 时，抽屉深度自动收缩为 350mm 灵巧避门；一旦扩宽至 500mm 以上，深抽屉立即延展到 450mm 扩容大收纳。',
    roleExplanation: '通过条件判断，使同一套柜体模型在不同空间尺寸下自动切换组件规格，免去人工重做模型的繁琐。',
    colorTheme: '#6366f1',
    accent: '#818cf8',
    paramDef: { name: 'W', label: '柜体宽度 (#W)', min: 300, max: 800, step: 10, defaultVal: 460, unit: 'mm' },
  },
  // 2. nestedif
  {
    id: 'nestedif',
    name: 'nestedif(...)',
    category: 'logic',
    categoryName: '条件逻辑',
    formula: 'nestedif(#D<=350, 250, #D<=400, 300, 350)',
    sampleInput: '多梯度层级五金匹配',
    storyTitle: '铰链阻尼三档无缝适配',
    subtitle: 'Chapter 02: Multi-Tier Hierarchy',
    narrative:
      '柜深 #D 从薄玄关柜、中进深书架到深衣柜连续变化。小宇设立三档托架梯级：深 ≤350mm 配 250 托架，≤400mm 配 300 托架，更深则配 350 工业级标准托架。',
    roleExplanation: '无需层层嵌套 if 括号，直观声明阶梯式工艺档位，让五金选配与柜体深度严密对应。',
    colorTheme: '#8b5cf6',
    accent: '#a78bfa',
    paramDef: { name: 'D', label: '柜体深度 (#D)', min: 280, max: 550, step: 10, defaultVal: 340, unit: 'mm' },
  },
  // 3. AllIn
  {
    id: 'allin',
    name: 'AllIn(list1, list2)',
    category: 'logic',
    categoryName: '条件逻辑',
    formula: 'AllIn(#Selected, [0, 1, 2])',
    sampleInput: '集合完全包含判断',
    storyTitle: '高端厨电三件套与重载底座',
    subtitle: 'Chapter 03: The Essential Union',
    narrative:
      '橱柜提供蒸箱(0)、烤箱(1)、洗碗机(2)等设备选配。当客户将核心三大件全部齐集选中时，地柜底部立刻触发双倍加固的高承重金属底梁。',
    roleExplanation: '校验多元件集合依赖关系，一旦满足全部必备配置，立刻激活关联的加固构件或强化工艺。',
    colorTheme: '#0284c7',
    accent: '#38bdf8',
    paramDef: { name: 'Mask', label: '已勾选电器集合 (0~7掩码)', min: 0, max: 7, step: 1, defaultVal: 7 },
  },
  // 4. BoolAt
  {
    id: 'boolat',
    name: 'BoolAt(list1, list2)',
    category: 'logic',
    categoryName: '条件逻辑',
    formula: 'BoolAt(#Modules, [0, 1, 2])',
    sampleInput: '集合完全一致判断',
    storyTitle: '初春限定尊享套餐与一体封边',
    subtitle: 'Chapter 04: Exact Match Craft',
    narrative:
      '定制品牌推出了“初春极简三件套”。小宇规定：只有当勾选的模块不多不少严格为地柜、吊柜和免拉手灯条时，才启用专属一体化激光无缝封边。',
    roleExplanation: '严格判定两组选项完全相等，用于限定款、套餐包与专属特定工艺的绝对匹配。',
    colorTheme: '#0d9488',
    accent: '#2dd4bf',
    paramDef: { name: 'ModuleCode', label: '套餐组合码 (精确匹配 3)', min: 1, max: 5, step: 1, defaultVal: 3 },
  },
  // 5. and
  {
    id: 'and',
    name: '条件1 and 条件2',
    category: 'logic',
    categoryName: '条件逻辑',
    formula: '#W > 600 and #D > 380',
    sampleInput: '#W > 600 && #D > 380',
    storyTitle: '大跨度超深书架与中央防弯立柱',
    subtitle: 'Chapter 05: The Dual Defense',
    narrative:
      '客户要一个巨型书架。若柜宽超过 600mm 且层板进深也超过 380mm，层板在长期重压下有断裂风险。小宇设置双条件满足时，中央防弯竖板立即出现。',
    roleExplanation: '只有在多项结构风险同时存在时才介入加固构件，兼顾空间通透与力学安全。',
    colorTheme: '#f59e0b',
    accent: '#fbbf24',
    paramDef: { name: 'W', label: '书架总宽 (#W)', min: 400, max: 900, step: 20, defaultVal: 680, unit: 'mm' },
    paramDef2: { name: 'D', label: '书架进深 (#D)', min: 250, max: 500, step: 10, defaultVal: 420, unit: 'mm' },
  },
  // 6. or
  {
    id: 'or',
    name: '条件1 or 条件2',
    category: 'logic',
    categoryName: '条件逻辑',
    formula: 'if(#H > 2400 or #W > 800, 25, 18)',
    sampleInput: '#H > 2400 || #W > 800',
    storyTitle: '超高或超宽的侧板厚度升级',
    subtitle: 'Chapter 06: Universal Threshold',
    narrative:
      '一门到顶的柜子，高度超过 2400mm 会发生微弯；宽度超过 800mm 则侧向应力激增。只要满足任意一条，小宇就自动将侧板从 18mm 升级为 25mm 稳固板。',
    roleExplanation: '设置多重安全阈值。任意单一指标超标即可触发防护机制，防止设计出缺陷产品。',
    colorTheme: '#ea580c',
    accent: '#fb923c',
    paramDef: { name: 'H', label: '柜体高度 (#H)', min: 1800, max: 2800, step: 50, defaultVal: 2500, unit: 'mm' },
  },
  // 7. == / !=
  {
    id: 'eq_neq',
    name: '== (等于) / != (不等于)',
    category: 'logic',
    categoryName: '条件逻辑',
    formula: '#DoorType == 1 (玻璃门背板透光)',
    sampleInput: '#DoorType == 1',
    storyTitle: '玻璃高显门与免拉手激光打孔',
    subtitle: 'Chapter 07: Precise Identity',
    narrative:
      '当柜门类型等于 1 时，实木门瞬间变为通透的高显铝框玻璃门，背板开启氛围灯带；当不等于 0 时，拉手打孔槽位精准联动呈现。',
    roleExplanation: '通过枚举判断切换模型材质网格、显示槽位与五金孔位预留。',
    colorTheme: '#ec4899',
    accent: '#f472b6',
    paramDef: { name: 'DoorType', label: '门板材质类型 (0: 实木, 1: 玻璃)', min: 0, max: 1, step: 1, defaultVal: 1 },
  },
  // 8. <= / >= / < / >
  {
    id: 'comparisons',
    name: '比较运算符 (<, >, <=, >=)',
    category: 'logic',
    categoryName: '条件逻辑',
    formula: 'if(#W <= 550, 15, 30)',
    sampleInput: '#W <= 550',
    storyTitle: '卫生间马桶侧边填缝板自适应',
    subtitle: 'Chapter 08: Clearance Sizing',
    narrative:
      '卫生间紧邻马桶的小浴室柜，宽度小于等于 550mm 时只能容纳 15mm 极窄防霉封边条；大于 550mm 时则预留 30mm 标准检修填缝口。',
    roleExplanation: '对空间尺寸建立硬性上下限，确保家具不仅美观，更能实际运抵现场并顺利安装。',
    colorTheme: '#64748b',
    accent: '#94a3b8',
    paramDef: { name: 'W', label: '浴室柜宽 (#W)', min: 400, max: 750, step: 25, defaultVal: 500, unit: 'mm' },
  },
  // 9. abs
  {
    id: 'abs',
    name: 'abs(#A)',
    category: 'math',
    categoryName: '数值数学',
    formula: 'abs(#OffsetX) * #Depth',
    sampleInput: 'abs(-150)',
    storyTitle: '左右凸柱包管避让缺口算料',
    subtitle: 'Chapter 09: Magnitude Without Direction',
    narrative:
      '房间墙角可能在左侧（偏移负数），也可能在右侧（偏移正数）。在计算避让板材挖空的扣减总面积时，小宇使用绝对值，让损耗面积计算永远为正。',
    roleExplanation: '剥离空间坐标的正负方向性，提取纯粹的位移标量用于材料加工与耗材统计。',
    colorTheme: '#84cc16',
    accent: '#a3e635',
    paramDef: { name: 'OffsetX', label: '墙柱偏移量 (可正可负)', min: -200, max: 200, step: 10, defaultVal: -120, unit: 'mm' },
  },
  // 10. round
  {
    id: 'round',
    name: 'round(#A, 2)',
    category: 'math',
    categoryName: '数值数学',
    formula: 'round(#PanelSize, 1)',
    sampleInput: 'round(485.678, 1)',
    storyTitle: '数控开料机防崩齿四舍五入',
    subtitle: 'Chapter 10: Manufacturing Precision',
    narrative:
      '设计师在 3D 里用鼠标随意一拉，柜板宽度变成了 485.678mm 的毛刺数值。若直接送到车间，数控机床无法对齐。小宇用四舍五入锁定一位小数：485.7mm！',
    roleExplanation: '将交互端随意的连续浮点数，规整为符合工业公差与生产加工的精准尺寸。',
    colorTheme: '#14b8a6',
    accent: '#5eead4',
    paramDef: { name: 'RawVal', label: '三维浮动测量值', min: 400, max: 600, step: 0.123, defaultVal: 485.678, unit: 'mm' },
  },
  // 11. ceil
  {
    id: 'ceil',
    name: 'ceil(#A)',
    category: 'math',
    categoryName: '数值数学',
    formula: 'ceil(#H / 400)',
    sampleInput: 'ceil(2300 / 400) = 6',
    storyTitle: '展示货架绝不悬空的隔板计算',
    subtitle: 'Chapter 11: The Ceiling Safety',
    narrative:
      '高 2300mm 的陈列架，按 400mm 一档算出来是 5.75 层。如果少做一层，顶头就会留下一大截丑陋的空档。小宇用向上取整，坚决生成 6 层隔板！',
    roleExplanation: '向上补齐，宁可多算一组构件与五金，也绝不让结构出现跨度不足或布局脱节。',
    colorTheme: '#06b6d4',
    accent: '#67e8f9',
    paramDef: { name: 'H', label: '架体总高 (#H)', min: 1200, max: 2800, step: 100, defaultVal: 2200, unit: 'mm' },
  },
  // 12. floor
  {
    id: 'floor',
    name: 'floor(#A)',
    category: 'math',
    categoryName: '数值数学',
    formula: 'floor(#NetH / 200)',
    sampleInput: 'floor(710 / 200) = 3',
    storyTitle: '下地柜抽屉防顶爆安全算量',
    subtitle: 'Chapter 12: The Ground Floor',
    narrative:
      '地柜净高 710mm，每个抽屉高 200mm。若向上取整做 4 个，第 4 个抽屉就会硬顶穿台面。小宇用向下取整稳妥定下 3 个抽屉，余量设计为散热透气缝。',
    roleExplanation: '向下取整，在固定物理包络线内确保机械组件绝对无挤压与干涉。',
    colorTheme: '#3b82f6',
    accent: '#60a5fa',
    paramDef: { name: 'NetH', label: '柜体净高 (#NetH)', min: 450, max: 950, step: 15, defaultVal: 720, unit: 'mm' },
  },
  // 13. sign
  {
    id: 'sign',
    name: 'sign(#A)',
    category: 'math',
    categoryName: '数值数学',
    formula: 'sign(#MoveOffset)',
    sampleInput: 'sign(-45) = -1, sign(45) = 1',
    storyTitle: '双向移门阻尼缓冲器的逆向弹力',
    subtitle: 'Chapter 13: The Directional Pulse',
    narrative:
      '衣柜移门向左推偏移为负，向右推为正。小宇利用 sign 函数提取出纯粹的 +1 / -1 动量方向，使防撞阻尼器无论门往哪边滑动，都能迎面释放缓冲阻力。',
    roleExplanation: '无视位移大小，瞬间解析出物体的朝向与运动趋势，专门用于机械反作用力与方向指示。',
    colorTheme: '#6366f1',
    accent: '#a5b4fc',
    paramDef: { name: 'MoveOffset', label: '移门拖动位移', min: -100, max: 100, step: 5, defaultVal: -60, unit: 'mm' },
  },
  // 14. mean
  {
    id: 'mean',
    name: 'mean([x1, x2, ...])',
    category: 'math',
    categoryName: '数值数学',
    formula: 'mean([#Y1, #Y2, #Y3])',
    sampleInput: 'mean([100, 240, 560])',
    storyTitle: '参差层板一键回归黄金重心',
    subtitle: 'Chapter 14: Perfect Harmony',
    narrative:
      '客户随意拖动调整了书柜三块活动层板，高度错乱无章。小宇点击一键居中，mean 函数瞬间计算出三块板材的平均质心位置，令书架恢复对称与典雅。',
    roleExplanation: '快速计算多个构件或参考基准面的算术重心，实现智能排版与视觉平衡。',
    colorTheme: '#8b5cf6',
    accent: '#c4b5fd',
    paramDef: { name: 'YDiff', label: '离散错位幅度', min: 0, max: 150, step: 5, defaultVal: 80, unit: 'mm' },
  },
  // 15. trimavg
  {
    id: 'trimavg',
    name: 'trimavg(#W, #W1, #W2, ...)',
    category: 'math',
    categoryName: '数值数学',
    formula: 'trimavg(#TotalW, #W1, #W2, #W3)',
    sampleInput: '剔除用户固定项后的剩余均分',
    storyTitle: '风衣专区锁定与剩余格子自适应',
    subtitle: 'Chapter 15: Adaptive Redistribution',
    narrative:
      '四门大衣柜中，客户强行锁定了左侧第一格 600mm 放长款大衣。小宇用 trimavg 自动剔除这个非公式的固定值，将剩余的总空间精准平分给剩下三格。',
    roleExplanation: '智能过滤用户手动指定的常数项，仅对未锁定的自由变量执行空间再分配。',
    colorTheme: '#d946ef',
    accent: '#f0abfc',
    paramDef: { name: 'LockedW', label: '用户锁定固定格宽度', min: 400, max: 800, step: 20, defaultVal: 550, unit: 'mm' },
  },
  // 16. sin & cos
  {
    id: 'sincos',
    name: 'sin(θ) 与 cos(θ)',
    category: 'geometry',
    categoryName: '空间几何',
    formula: 'X = R*cos(θ), Z = R*sin(θ)',
    sampleInput: '极坐标转三维圆周运动',
    storyTitle: '转角地柜飞碟转篮的丝滑盘旋',
    subtitle: 'Chapter 16: Circular Orbital Elegance',
    narrative:
      '厨房 L 型拐角深不可及。小宇设计了一套飞碟旋转托盘。当角度从 0° 旋转至 90° 时，正弦与余弦函数实时推演盘面中心轨迹，让转盘优雅滑出柜体。',
    roleExplanation: '利用三角函数构建三维空间内的圆弧与旋转轨迹，驱动旋转门与五金机构动态模拟。',
    colorTheme: '#f43f5e',
    accent: '#fb7185',
    paramDef: { name: 'Angle', label: '托盘旋出角度 (0° ~ 100°)', min: 0, max: 100, step: 1, defaultVal: 45, unit: '°' },
  },
  // 17. tan
  {
    id: 'tan',
    name: 'tan(θ)',
    category: 'geometry',
    categoryName: '空间几何',
    formula: 'ΔH = #Depth * tan(#RoofAngle)',
    sampleInput: 'tan(30°)',
    storyTitle: '斜顶阁楼衣柜的严丝合缝贴角',
    subtitle: 'Chapter 17: The Tangent Slope',
    narrative:
      '阁楼天花板有着 25° 的倾角。每一块竖向柜侧板随着进深后退，顶部都必须切掉一段高度。小宇利用正切比率，自动计算每一块板的削角下刀斜度。',
    roleExplanation: '通过斜率正切比率，把平面倾角投射为垂直高度差，实现异形倾斜空间的精准裁切。',
    colorTheme: '#f97316',
    accent: '#fdba74',
    paramDef: { name: 'RoofAngle', label: '屋顶倾角 (#RoofAngle)', min: 10, max: 50, step: 1, defaultVal: 28, unit: '°' },
  },
  // 18. asin / acos / atan
  {
    id: 'invtrig',
    name: 'asin / acos / atan (反三角函数)',
    category: 'geometry',
    categoryName: '空间几何',
    formula: 'θ = asin(#LiftH / #ArmLength)',
    sampleInput: '反向动力学 (IK) 角度推算',
    storyTitle: '气撑上翻吊柜机械连杆逆向解算',
    subtitle: 'Chapter 18: Inverse Kinematics',
    narrative:
      '设计师只想输入吊柜门抬高了 300mm，底层的机械支撑臂到底应该旋转多少度？小宇运用反正弦与反正切逆向反推，算出了支撑杆轴心的微弧度偏转。',
    roleExplanation: '在已知抬升位移或空间点坐标时，反向求解旋转关节的角度，实现高级五金机构的联动。',
    colorTheme: '#eab308',
    accent: '#fde047',
    paramDef: { name: 'LiftH', label: '门板抬升高度', min: 50, max: 400, step: 10, defaultVal: 240, unit: 'mm' },
  },
  // 19. sqrt
  {
    id: 'sqrt',
    name: 'sqrt(x)',
    category: 'geometry',
    categoryName: '空间几何',
    formula: 'sqrt(#W*#W + #H*#H)',
    sampleInput: 'sqrt(W² + H²)',
    storyTitle: '工业风金属背架对角防晃拉杆',
    subtitle: 'Chapter 19: The Diagonal Root',
    narrative:
      '工业风格书架后方需要两根交叉的 X 形不锈钢防晃拉杆。不论柜子被用户拉伸得更宽还是更高，勾股定理开方函数确保拉杆长度每一分都不差。',
    roleExplanation: '计算欧氏对角线距离与三维模长，使对角线支撑件和空间连接杆能够自适应伸缩下料。',
    colorTheme: '#10b981',
    accent: '#6ee7b7',
    paramDef: { name: 'W', label: '框架宽度 (#W)', min: 400, max: 1000, step: 20, defaultVal: 700, unit: 'mm' },
    paramDef2: { name: 'H', label: '框架高度 (#H)', min: 400, max: 1000, step: 20, defaultVal: 600, unit: 'mm' },
  },
];
