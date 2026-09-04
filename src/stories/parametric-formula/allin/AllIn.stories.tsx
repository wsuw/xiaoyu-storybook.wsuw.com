import type { Meta, StoryObj } from '@storybook/react-vite';
import { AllInDefinition } from './AllInDefinition';
import { AllInStoryScene } from './AllInStoryScene';

const meta = {
  title: '公式/逻辑与条件/AllIn 集合包含',
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta;

export default meta;

// Story 1: 公式定义与说明 (独立组件，无参数输入干扰)
export const 公式定义: StoryObj = {
  name: '1. 公式定义与说明',
  render: () => <AllInDefinition />,
};

// Story 2: 3D 故事与交互演练 (独立 3D 场景组件，参数在 Storybook Controls 中随意修改)
export const 故事演练: StoryObj = {
  name: '2. 3D 故事与交互演练',
  argTypes: {
    selectedMask: {
      name: '勾选设备组合(1:蒸箱, 2:烤箱, 4:洗碗机, 7:全选)',
      control: {
        type: 'range',
        min: 0,
        max: 7,
        step: 1,
      },
      description: '勾选设备组合(1:蒸箱, 2:烤箱, 4:洗碗机, 7:全选)，在 Storybook Controls 中实时修改此值即可驱动 3D 变化',
    },
  },
  args: {
    selectedMask: 7,
  },
  render: (args) => <AllInStoryScene {...args} />,
};
