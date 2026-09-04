import type { Meta, StoryObj } from '@storybook/react-vite';
import { NestedIfDefinition } from './NestedIfDefinition';
import { NestedIfStoryScene } from './NestedIfStoryScene';

const meta = {
  title: '公式/逻辑与条件/nestedif 阶梯判断',
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
    d: {
      name: '柜体深度 (#D)',
      control: {
        type: 'range',
        min: 280,
        max: 550,
        step: 10,
      },
      description: '柜体深度 (#D)，在 Storybook Controls 中实时修改此值即可驱动 3D 变化',
    },
  },
  args: {
    d: 340,
  },
  render: (args) => <NestedIfStoryScene {...args} />,
};
