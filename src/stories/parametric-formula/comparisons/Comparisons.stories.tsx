import type { Meta, StoryObj } from '@storybook/react-vite';
import { ComparisonsDefinition } from './ComparisonsDefinition';
import { ComparisonsStoryScene } from './ComparisonsStoryScene';

const meta = {
  title: '公式/逻辑与条件/数值区间比较 (<, >, <=, >=)',
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta;

export default meta;

// Story 1: 公式定义与说明 (独立组件，无参数输入干扰)
export const 公式定义: StoryObj = {
  name: '1. 公式定义与说明',
  render: () => <ComparisonsDefinition />,
};

// Story 2: 3D 故事与交互演练 (独立 3D 场景组件，参数在 Storybook Controls 中随意修改)
export const 故事演练: StoryObj = {
  name: '2. 3D 故事与交互演练',
  argTypes: {
    h: {
      name: '吊柜离地净高 (#H)',
      control: {
        type: 'range',
        min: 1350,
        max: 1750,
        step: 25,
      },
      description: '吊柜离地安装高度 (#H)，人体工学安全红线 1550mm：>=1550 安全放行，<1550 碰头警报',
    },
  },
  args: {
    h: 1600,
  },
  render: (args) => <ComparisonsStoryScene {...args} />,
};
