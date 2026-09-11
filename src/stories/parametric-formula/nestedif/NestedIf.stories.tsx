import type { Meta, StoryObj } from '@storybook/react-vite';
import { NestedIfDefinition } from './NestedIfDefinition';
import { NestedIfStoryScene } from './NestedIfStoryScene';
import { FormulaPracticeQuiz } from '../common/FormulaPracticeQuiz';
import { nestedifQuizData } from './nestedifQuizData';

const meta = {
  title: '参数化家装手记/逻辑与条件/nestedif 阶梯判断',
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta;

export default meta;

// Story 1: 公式定义与说明 (独立组件，无参数输入干扰)
export const 公式定义: StoryObj = {
  name: '1. 公式定义与说明',
  render: () => <NestedIfDefinition />,
};

// Story 2: 3D 故事与交互演练 (独立 3D 场景组件，参数在 Storybook Controls 中随意修改)
export const 故事演练: StoryObj = {
  name: '2. 3D 故事与交互演练',
  argTypes: {
    w: {
      name: '柜体宽度 (#W)',
      control: {
        type: 'range',
        min: 600,
        max: 2600,
        step: 50,
      },
      description: '柜体总宽 (#W)：跨度 ≤800 为1腔，≤1500 为2腔，≤2200 为3腔，>2200 为4腔整墙大柜',
    },
  },
  args: {
    w: 1200,
  },
  render: (args) => <NestedIfStoryScene {...args} />,
};

// Story 3: 练习闯关与实战测试
export const 练习闯关: StoryObj = {
  name: '3. 练习闯关与实战测试',
  render: () => <FormulaPracticeQuiz data={nestedifQuizData} />,
};
