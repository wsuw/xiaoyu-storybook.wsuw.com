import type { Meta, StoryObj } from '@storybook/react-vite';
import { CeilDefinition } from './CeilDefinition';
import { CeilStoryScene } from './CeilStoryScene';
import { FormulaPracticeQuiz } from '../common/FormulaPracticeQuiz';
import { ceilQuizData } from './ceilQuizData';

const meta = {
  title: '公式/数值运算/ceil 向上取整',
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta;

export default meta;

// Story 1: 公式定义与说明 (独立组件，无参数输入干扰)
export const 公式定义: StoryObj = {
  name: '1. 公式定义与说明',
  render: () => <CeilDefinition />,
};

// Story 2: 3D 故事与交互演练 (独立 3D 场景组件，参数在 Storybook Controls 中随意修改)
export const 故事演练: StoryObj = {
  name: '2. 3D 故事与交互演练',
  argTypes: {
    h: {
      name: '架体总高 (#H)',
      control: {
        type: 'range',
        min: 1200,
        max: 2800,
        step: 100,
      },
      description: '架体总高 (#H)，在 Storybook Controls 中实时修改此值即可驱动 3D 变化',
    },
  },
  args: {
    h: 2200,
  },
  render: (args) => <CeilStoryScene {...args} />,
};

// Story 3: 练习闯关与实战测试
export const 练习闯关: StoryObj = {
  name: '3. 练习闯关与实战测试',
  render: () => <FormulaPracticeQuiz data={ceilQuizData} />,
};
