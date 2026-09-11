import type { FormulaQuizData } from '../common/quizTypes';

export const floorQuizData: FormulaQuizData = {
  formulaName: 'floor 向下取整',
  formulaSymbol: 'floor(x)',
  category: '数值运算',
  themeColor: '#3b82f6',
  description: '掌握抽屉分层数量、货架隔板排列等硬性物理包络线内的安全安装公差计算。',
  questions: [
    {
      id: 'floor-1',
      title: '橱柜地柜抽屉数量安全排布计算',
      scenario: '某岛台地柜可用净高度 NetH = 720mm。设计要求每个滑轨大抽屉预留 200mm 的标准安装单元高度，为防止顶部抽屉拉出时与石膏线/台面下唇卡死摩擦，请问最多能安全排布几个完整抽屉？',
      formula: 'Count = floor(NetH / 200)',
      type: 'choice',
      options: [
        { label: 'A. 4 个', value: '4', hint: '需 800mm，柜体爆框安装失败' },
        { label: 'B. 3 个', value: '3', hint: 'floor(720 / 200) = floor(3.6) = 3，余 120mm 作为安全间隙' },
        { label: 'C. 3.6 个', value: '3.6', hint: '现实中不存在小数抽屉' },
        { label: 'D. 2 个', value: '2', hint: '过于浪费纵向储物空间' },
      ],
      correctAnswer: '3',
      explanation: '【代入公式计算】：\n720 / 200 = 3.6。向下取整 floor(3.6) = 3 个。\n【工程意义】：3个抽屉占用 600mm 高度，余下的 120mm 作为上抽屉把手空间及安全活动公差，杜绝现场现场返工。',
    },
    {
      id: 'floor-2',
      title: '高定红酒柜蜂窝木质插格列数排布',
      scenario: '餐边柜设计了一处横向红酒展示区，内空净宽度净开间 W = 850mm。每个标准红酒格的开间跨度需要 95mm（含隔板厚度）。在不突破两侧柜板的前提下，这块区域最多能并排做几列红酒格？',
      formula: 'Columns = floor(850 / 95)',
      type: 'input',
      placeholder: '请输入整数列数，如 8',
      correctAnswer: '8',
      tolerance: 0,
      unit: '列',
      explanation: '【代入公式计算】：\n850 / 95 ≈ 8.947。floor(8.947) = 8 列。\n【工程意义】：8列占用 8 × 95 = 760mm，剩余 90mm 可作为两端平衡均分的收口调整条。如果取整为9列则需 855mm，直接撞击柜身侧板！',
    },
    {
      id: 'floor-3',
      title: '抽屉滑轨负荷重量整袋配件装填限额',
      scenario: '每套阻尼骑马抽滑轨标称最大动态承重 35kg。抽屉自重 6.8kg，净承重余量为 28.2kg。若用于收纳整袋装烘焙面粉（每袋净重 4.5kg），最多安全放置几整袋面粉？',
      formula: 'Bags = floor(28.2 / 4.5)',
      type: 'choice',
      options: [
        { label: 'A. 7 袋', value: '7', hint: '31.5kg，超重导致阻尼齿轮损坏' },
        { label: 'B. 6 袋', value: '6', hint: 'floor(6.26) = 6 袋，安全承载 27kg < 28.2kg' },
        { label: 'C. 5 袋', value: '5', hint: '未达最佳收纳效率' },
        { label: 'D. 6.26 袋', value: '6.26', hint: '非整数' },
      ],
      correctAnswer: '6',
      explanation: '【代入公式计算】：\n28.2 / 4.5 ≈ 6.26。floor(6.26) = 6。\n【工程意义】：必须向下舍弃小数，安全承载 6 袋（共 27kg），确保滑轨常年推拉顺畅不脱轨。',
    },
  ],
};
