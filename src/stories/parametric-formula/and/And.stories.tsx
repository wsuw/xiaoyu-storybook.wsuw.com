import type { Meta, StoryObj } from '@storybook/react-vite';
import { AndDefinition } from './AndDefinition';
import { AndStoryScene } from './AndStoryScene';
import { FormulaPracticeQuiz } from '../common/FormulaPracticeQuiz';
import { andQuizData } from './andQuizData';

const meta = {
  title: '公式/逻辑与条件/and 逻辑与',
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta;

export default meta;

// Story 1: 公式定义与说明 (独立组件，无参数输入干扰)
export const 公式定义: StoryObj = {
  name: '1. 公式定义与说明',
  render: () => <AndDefinition />,
};

// Story 2: 3D 故事与交互演练 (独立 3D 场景组件，参数在 Storybook Controls 中随意修改)
export const 故事演练: StoryObj = {
  name: '2. 3D 故事与交互演练',
  argTypes: {
    h: {
      name: '门板高度 (#H)',
      control: {
        type: 'range',
        min: 1600,
        max: 2700,
        step: 50,
      },
      description: '衣柜单门高度 (#H，单位 mm)。>= 2400 时满足超高条件',
    },
    w: {
      name: '门板宽度 (#W)',
      control: {
        type: 'range',
        min: 350,
        max: 700,
        step: 10,
      },
      description: '衣柜单门宽度 (#W，单位 mm)。>= 500 时满足超宽条件',
    },
  },
  args: {
    h: 2500,
    w: 550,
  },
  render: (args) => <AndStoryScene {...args} />,
};

// Story 3: 练习闯关与实战测试
export const 练习闯关: StoryObj = {
  name: '3. 练习闯关与实战测试',
  render: () => <FormulaPracticeQuiz data={andQuizData} />,
};
