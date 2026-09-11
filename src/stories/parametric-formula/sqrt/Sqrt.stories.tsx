import type { Meta, StoryObj } from '@storybook/react-vite';
import { SqrtDefinition } from './SqrtDefinition';
import { SqrtStoryScene } from './SqrtStoryScene';
import { FormulaPracticeQuiz } from '../common/FormulaPracticeQuiz';
import { sqrtQuizData } from './sqrtQuizData';

const meta = {
  title: '参数化家装手记/空间几何/sqrt 勾股开方',
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta;

export default meta;

// Story 1: 公式定义与说明 (独立组件，无参数输入干扰)
export const 公式定义: StoryObj = {
  name: '1. 公式定义与说明',
  render: () => <SqrtDefinition />,
};

// Story 2: 3D 故事与交互演练 (独立 3D 场景组件，参数在 Storybook Controls 中随意修改)
export const 故事演练: StoryObj = {
  name: '2. 3D 故事与交互演练',
  argTypes: {
    w: {
      name: '框架宽度 (#W)',
      control: {
        type: 'range',
        min: 400,
        max: 1000,
        step: 20,
      },
      description: '框架宽度 (#W)，在 Storybook Controls 中实时修改此值即可驱动 3D 变化',
    },
    h: {
      name: '框架高度 (#H)',
      control: {
        type: 'range',
        min: 400,
        max: 1000,
        step: 20,
      },
      description: '框架高度 (#H)，在 Storybook Controls 中实时修改此值即可驱动 3D 变化',
    },
  },
  args: {
    w: 700,
    h: 600,
  },
  render: (args) => <SqrtStoryScene {...args} />,
};

// Story 3: 练习闯关与实战测试
export const 练习闯关: StoryObj = {
  name: '3. 练习闯关与实战测试',
  render: () => <FormulaPracticeQuiz data={sqrtQuizData} />,
};
