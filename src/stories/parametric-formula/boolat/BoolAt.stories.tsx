import type { Meta, StoryObj } from '@storybook/react-vite';
import { BoolAtDefinition } from './BoolAtDefinition';
import { BoolAtStoryScene } from './BoolAtStoryScene';

const meta = {
  title: '公式/逻辑与条件/BoolAt 严格一致',
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta;

export default meta;

// Story 1: 公式定义与说明 (独立组件，无参数输入干扰)
export const 公式定义: StoryObj = {
  name: '1. 公式定义与说明',
  render: () => <BoolAtDefinition />,
};

// Story 2: 3D 故事与交互演练 (独立 3D 场景组件，参数在 Storybook Controls 中随意修改)
export const 故事演练: StoryObj = {
  name: '2. 3D 故事与交互演练',
  argTypes: {
    packageId: {
      name: '套餐匹配码(输入3触发严格限定版)',
      control: {
        type: 'range',
        min: 1,
        max: 5,
        step: 1,
      },
      description: '套餐匹配码(输入3触发严格限定版)，在 Storybook Controls 中实时修改此值即可驱动 3D 变化',
    },
  },
  args: {
    packageId: 3,
  },
  render: (args) => <BoolAtStoryScene {...args} />,
};
