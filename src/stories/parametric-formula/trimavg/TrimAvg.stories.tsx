import type { Meta, StoryObj } from '@storybook/react-vite';
import { TrimAvgDefinition } from './TrimAvgDefinition';
import { TrimAvgStoryScene } from './TrimAvgStoryScene';

const meta = {
  title: '公式/数值运算/trimavg 剔除非公式项平均',
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta;

export default meta;

// Story 1: 公式定义与说明 (独立组件，无参数输入干扰)
export const 公式定义: StoryObj = {
  name: '1. 公式定义与说明',
  render: () => <TrimAvgDefinition />,
};

// Story 2: 3D 故事与交互演练 (独立 3D 场景组件，参数在 Storybook Controls 中随意修改)
export const 故事演练: StoryObj = {
  name: '2. 3D 故事与交互演练',
  argTypes: {
    lockedW: {
      name: '锁定固定格宽度',
      control: {
        type: 'range',
        min: 400,
        max: 800,
        step: 20,
      },
      description: '锁定固定格宽度，在 Storybook Controls 中实时修改此值即可驱动 3D 变化',
    },
  },
  args: {
    lockedW: 550,
  },
  render: (args) => <TrimAvgStoryScene {...args} />,
};
