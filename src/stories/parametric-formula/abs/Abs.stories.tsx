import type { Meta, StoryObj } from '@storybook/react-vite';
import { AbsDefinition } from './AbsDefinition';
import { AbsStoryScene } from './AbsStoryScene';

const meta = {
  title: '公式/数值运算/abs 绝对值',
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta;

export default meta;

// Story 1: 公式定义与说明 (独立组件，无参数输入干扰)
export const 公式定义: StoryObj = {
  name: '1. 公式定义与说明',
  render: () => <AbsDefinition />,
};

// Story 2: 3D 故事与交互演练 (独立 3D 场景组件，参数在 Storybook Controls 中随意修改)
export const 故事演练: StoryObj = {
  name: '2. 3D 故事与交互演练',
  argTypes: {
    offsetX: {
      name: '墙柱偏移量(负代表左, 正代表右)',
      control: {
        type: 'range',
        min: -200,
        max: 200,
        step: 10,
      },
      description: '墙柱偏移量(负代表左, 正代表右)，在 Storybook Controls 中实时修改此值即可驱动 3D 变化',
    },
  },
  args: {
    offsetX: -120,
  },
  render: (args) => <AbsStoryScene {...args} />,
};
