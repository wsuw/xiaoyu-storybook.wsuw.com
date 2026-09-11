import type { Meta, StoryObj } from '@storybook/react-vite';
import { SignDefinition } from './SignDefinition';
import { SignStoryScene } from './SignStoryScene';
import { FormulaPracticeQuiz } from '../common/FormulaPracticeQuiz';
import { signQuizData } from './signQuizData';

const meta = {
  title: '参数化家装手记/数值运算/sign 符号判定',
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta;

export default meta;

// Story 1: 公式定义与说明 (独立组件，无参数输入干扰)
export const 公式定义: StoryObj = {
  name: '1. 公式定义与说明',
  render: () => <SignDefinition />,
};

// Story 2: 3D 故事与交互演练 (独立 3D 场景组件，参数在 Storybook Controls 中随意修改)
export const 故事演练: StoryObj = {
  name: '2. 3D 故事与交互演练',
  argTypes: {
    moveOffset: {
      name: '移门拖动位移(正右负左)',
      control: {
        type: 'range',
        min: -100,
        max: 100,
        step: 5,
      },
      description: '移门拖动位移(正右负左)，在 Storybook Controls 中实时修改此值即可驱动 3D 变化',
    },
  },
  args: {
    moveOffset: -60,
  },
  render: (args) => <SignStoryScene {...args} />,
};

// Story 3: 练习闯关与实战测试
export const 练习闯关: StoryObj = {
  name: '3. 练习闯关与实战测试',
  render: () => <FormulaPracticeQuiz data={signQuizData} />,
};
