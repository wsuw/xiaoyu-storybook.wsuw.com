import type { FormulaQuizData } from '../common/quizTypes';

export const ceilQuizData: FormulaQuizData = {
  formulaName: 'ceil 向上取整',
  formulaSymbol: 'ceil(x)',
  category: '数值运算',
  themeColor: '#6366f1',
  description: '掌握立柱加固横撑、高柜防倾倒膨胀螺栓、包装整包耗材等必须完全覆盖的安全冗余算法。',
  questions: [
    {
      id: 'ceil-1',
      title: '通顶高书架背板加固横撑数量计算',
      scenario: '某客餐厅定制通顶书架总高 H = 2600mm。行业防变形安全标准要求：竖向每隔至多 600mm 跨度必须增设一道实木抗弯横撑。请问至少需要安装几道加固横撑才能完全覆盖并满足刚度要求？',
      formula: 'Braces = ceil(H / 600)',
      type: 'choice',
      options: [
        { label: 'A. 4 道', value: '4', hint: '4×600=2400mm，顶部遗留200mm悬空，刚度不足' },
        { label: 'B. 5 道', value: '5', hint: 'ceil(2600 / 600) = ceil(4.333) = 5 道，全高度无死角加固' },
        { label: 'C. 4.3 道', value: '4.3', hint: '工程构件必须为整数' },
        { label: 'D. 6 道', value: '6', hint: '过度加固增加成本' },
      ],
      correctAnswer: '5',
      explanation: '【代入公式计算】：\n2600 / 600 ≈ 4.333。向上取整 ceil(4.333) = 5 道。\n【工程意义】：涉及结构安全性与荷载支撑时，必须用 ceil 向上取整，宁可多设一道加固横撑，也绝不能让跨距超标产生弯曲形变。',
    },
    {
      id: 'ceil-2',
      title: '高柜入墙防倾倒重型胀栓整包采购数',
      scenario: '全屋 3 组儿童房大衣柜共计需要打入 14 颗重型金属膨胀防倾倒螺栓。五金供应商只提供整盒包装（每盒 4 颗，不拆散零卖）。请问采购人员至少需要订购几整盒膨胀螺栓？',
      formula: 'Boxes = ceil(14 / 4)',
      type: 'input',
      placeholder: '请输入整数盒数，如 4',
      correctAnswer: '4',
      tolerance: 0,
      unit: '盒',
      explanation: '【代入公式计算】：\n14 / 4 = 3.5。ceil(3.5) = 4 盒。\n【工程意义】：4 盒共 16 颗，满足 14 颗安装需求并备用 2 颗余量。如果向下取整买 3 盒（12颗），现场将缺件停工！',
    },
    {
      id: 'ceil-3',
      title: '衣柜内置 LED 变压器驱动功率模组配额',
      scenario: '通长铝槽内嵌低压灯带总实测功率为 78W。为了保证恒压电源不发烫，工厂常备 30W 的模块化小型安全驱动器。若采用多变压器并联供电，至少需要并联几个 30W 变压器？',
      formula: 'Drivers = ceil(78 / 30)',
      type: 'choice',
      options: [
        { label: 'A. 2 个', value: '2', hint: '仅 60W，过载保护断电' },
        { label: 'B. 3 个', value: '3', hint: 'ceil(2.6) = 3 个，总额定 90W > 78W，留有安全余量' },
        { label: 'C. 4 个', value: '4', hint: '过度配置' },
        { label: 'D. 2.6 个', value: '2.6', hint: '电源无小数' },
      ],
      correctAnswer: '3',
      explanation: '【代入公式计算】：\n78 / 30 = 2.6。ceil(2.6) = 3 个。\n【工程意义】：向上取整后总输出功率 90W，负载率仅约 86%，有效防止夏季柜内散热不良烧坏电器件。',
    },
  ],
};
