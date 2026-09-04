import type { Meta, StoryObj } from '@storybook/react-vite';
import { IfDefinition } from './IfDefinition';
import { IfStoryScene } from './IfStoryScene';

const meta = {
  title: '公式/逻辑与条件/if 条件判断',
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta;

export default meta;

// Story 1: 公式定义与说明 (独立组件，无参数输入干扰)
export const 公式定义: StoryObj = {
  name: '1. 公式定义与说明',
  render: () => <IfDefinition />,
};

// Story 2: 3D 故事与交互演练 (独立 3D 场景组件，参数在 Storybook Controls 中随意修改)
export const 故事演练: StoryObj = {
  name: '2. 3D 故事与交互演练',
  argTypes: {
    w: {
      name: '柜体宽度 (#W)',
      control: {
        type: 'range',
        min: 300,
        max: 800,
        step: 10,
      },
      description: '柜体宽度 (#W)，在 Storybook Controls 中实时修改此值即可驱动 3D 变化',
    },
  },
  args: {
    w: 460,
  },
  render: (args) => <IfStoryScene {...args} />,
};
