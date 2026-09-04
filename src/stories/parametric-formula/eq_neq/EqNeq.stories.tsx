import type { Meta, StoryObj } from '@storybook/react-vite';
import { EqNeqDefinition } from './EqNeqDefinition';
import { EqNeqStoryScene } from './EqNeqStoryScene';

const meta = {
  title: '公式/逻辑与条件/== 与 != 比较',
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta;

export default meta;

// Story 1: 公式定义与说明 (独立组件，无参数输入干扰)
export const 公式定义: StoryObj = {
  name: '1. 公式定义与说明',
  render: () => <EqNeqDefinition />,
};

// Story 2: 3D 故事与交互演练 (独立 3D 场景组件，参数在 Storybook Controls 中随意修改)
export const 故事演练: StoryObj = {
  name: '2. 3D 故事与交互演练',
  argTypes: {
    doorType: {
      name: '门板材质类型 (0:实木, 1:玻璃铝框)',
      control: {
        type: 'range',
        min: 0,
        max: 1,
        step: 1,
      },
      description: '门板材质类型 (0:实木, 1:玻璃铝框)，在 Storybook Controls 中实时修改此值即可驱动 3D 变化',
    },
  },
  args: {
    doorType: 1,
  },
  render: (args) => <EqNeqStoryScene {...args} />,
};
