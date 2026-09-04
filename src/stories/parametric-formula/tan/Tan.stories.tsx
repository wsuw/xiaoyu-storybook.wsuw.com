import type { Meta, StoryObj } from '@storybook/react-vite';
import { TanDefinition } from './TanDefinition';
import { TanStoryScene } from './TanStoryScene';

const meta = {
  title: '公式/空间几何/tan 正切斜率',
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
    roofAngle: {
      name: '屋顶倾角 (#RoofAngle)',
      control: {
        type: 'range',
        min: 10,
        max: 50,
        step: 1,
      },
      description: '屋顶倾角 (#RoofAngle)，在 Storybook Controls 中实时修改此值即可驱动 3D 变化',
    },
  },
  args: {
    roofAngle: 28,
  },
  render: (args) => <TanStoryScene {...args} />,
};
