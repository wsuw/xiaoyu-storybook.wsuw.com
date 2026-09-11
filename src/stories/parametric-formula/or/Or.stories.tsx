import type { Meta, StoryObj } from '@storybook/react-vite';
import { OrDefinition } from './OrDefinition';
import { OrStoryScene } from './OrStoryScene';

const meta = {
  title: '公式/逻辑与条件/or 逻辑或',
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta;

export default meta;

// Story 1: 公式定义与说明 (独立组件，无参数输入干扰)
export const 公式定义: StoryObj = {
  name: '1. 公式定义与说明',
  render: () => <OrDefinition />,
};

// Story 2: 3D 故事与交互演练 (独立 3D 场景组件，参数在 Storybook Controls 中随意修改)
export const 故事演练: StoryObj = {
  name: '2. 3D 故事与交互演练',
  argTypes: {
    h: {
      name: '门板高度 (#H)',
      control: {
        type: 'range',
        min: 1400,
        max: 2700,
        step: 50,
      },
      description: '门板高度 (#H)，超标红线 2000mm（一门到顶）',
    },
    w: {
      name: '门板宽度 (#W)',
      control: {
        type: 'range',
        min: 350,
        max: 850,
        step: 25,
      },
      description: '门板宽度 (#W)，超标红线 600mm（单扇大门力矩过大）',
    },
  },
  args: {
    h: 2400,
    w: 500,
  },
  render: (args) => <OrStoryScene {...args} />,
};
