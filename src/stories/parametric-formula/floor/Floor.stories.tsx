import type { Meta, StoryObj } from '@storybook/react-vite';
import { FloorDefinition } from './FloorDefinition';
import { FloorStoryScene } from './FloorStoryScene';
import { FormulaPracticeQuiz } from '../common/FormulaPracticeQuiz';
import { floorQuizData } from './floorQuizData';

const meta = {
  title: '参数化家装手记/数值运算/floor 向下取整',
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta;

export default meta;

// Story 1: 公式定义与说明 (独立组件，无参数输入干扰)
export const 公式定义: StoryObj = {
  name: '1. 公式定义与说明',
  render: () => <FloorDefinition />,
};

// Story 2: 3D 故事与交互演练 (独立 3D 场景组件，参数在 Storybook Controls 中随意修改)
export const 故事演练: StoryObj = {
  name: '2. 3D 故事与交互演练',
  argTypes: {
    netH: {
      name: '柜体净高 (#NetH)',
      control: {
        type: 'range',
        min: 450,
        max: 950,
        step: 15,
      },
      description: '柜体净高 (#NetH)，在 Storybook Controls 中实时修改此值即可驱动 3D 变化',
    },
  },
  args: {
    netH: 720,
  },
  render: (args) => <FloorStoryScene {...args} />,
};

// Story 3: 练习闯关与实战测试
export const 练习闯关: StoryObj = {
  name: '3. 练习闯关与实战测试',
  render: () => <FormulaPracticeQuiz data={floorQuizData} />,
};
