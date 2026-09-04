import type { Meta, StoryObj } from '@storybook/react-vite';
import { MeanDefinition } from './MeanDefinition';
import { MeanStoryScene } from './MeanStoryScene';

const meta = {
  title: '公式/数值运算/mean 算术平均',
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta;

export default meta;

// Story 1: 公式定义与说明 (独立组件，无参数输入干扰)
export const 公式定义: StoryObj = {
  name: '1. 公式定义与说明',
  render: () => <MeanDefinition />,
};

// Story 2: 3D 故事与交互演练 (独立 3D 场景组件，参数在 Storybook Controls 中随意修改)
export const 故事演练: StoryObj = {
  name: '2. 3D 故事与交互演练',
  argTypes: {
    yDiff: {
      name: '离散错位幅度',
      control: {
        type: 'range',
        min: 0,
        max: 150,
        step: 5,
      },
      description: '离散错位幅度，在 Storybook Controls 中实时修改此值即可驱动 3D 变化',
    },
  },
  args: {
    yDiff: 80,
  },
  render: (args) => <MeanStoryScene {...args} />,
};
