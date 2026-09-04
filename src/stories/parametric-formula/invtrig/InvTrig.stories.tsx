import type { Meta, StoryObj } from '@storybook/react-vite';
import { InvTrigDefinition } from './InvTrigDefinition';
import { InvTrigStoryScene } from './InvTrigStoryScene';

const meta = {
  title: '公式/空间几何/反三角函数 (asin, acos, atan)',
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta;

export default meta;

// Story 1: 公式定义与说明 (独立组件，无参数输入干扰)
export const 公式定义: StoryObj = {
  name: '1. 公式定义与说明',
  render: () => <InvTrigDefinition />,
};

// Story 2: 3D 故事与交互演练 (独立 3D 场景组件，参数在 Storybook Controls 中随意修改)
export const 故事演练: StoryObj = {
  name: '2. 3D 故事与交互演练',
  argTypes: {
    liftH: {
      name: '门板抬升高度',
      control: {
        type: 'range',
        min: 50,
        max: 400,
        step: 10,
      },
      description: '门板抬升高度，在 Storybook Controls 中实时修改此值即可驱动 3D 变化',
    },
  },
  args: {
    liftH: 240,
  },
  render: (args) => <InvTrigStoryScene {...args} />,
};
