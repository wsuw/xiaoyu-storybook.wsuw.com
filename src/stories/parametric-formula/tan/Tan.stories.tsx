import type { Meta, StoryObj } from '@storybook/react-vite';
import { TanDefinition } from './TanDefinition';
import { TanStoryScene } from './TanStoryScene';
import { FormulaPracticeQuiz } from '../common/FormulaPracticeQuiz';
import { tanQuizData } from './tanQuizData';

const meta = {
  title: '参数化家装手记/空间几何/tan 正切斜率',
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta;

export default meta;

// Story 1: 公式定义与说明 (独立组件，无参数输入干扰)
export const 公式定义: StoryObj = {
  name: '1. 公式定义与说明',
  render: () => <TanDefinition />,
};

// Story 2: 3D 故事与交互演练 (独立 3D 场景组件，参数在 Storybook Controls 中随意修改)
export const 故事演练: StoryObj = {
  name: '2. 3D 故事与交互演练',
  argTypes: {
    stairAngle: {
      name: '楼梯踏步坡度角 (θ°)',
      control: {
        type: 'range',
        min: 25,
        max: 45,
        step: 1,
      },
      description: '楼梯整体倾斜坡度角 (θ)，在 Storybook Controls 中实时修改此值即可驱动阶梯柜高度与楼梯斜梁联动',
    },
  },
  args: {
    stairAngle: 32,
  },
  render: (args) => <TanStoryScene {...args} />,
};

// Story 3: 练习闯关与实战测试
export const 练习闯关: StoryObj = {
  name: '3. 练习闯关与实战测试',
  render: () => <FormulaPracticeQuiz data={tanQuizData} />,
};
