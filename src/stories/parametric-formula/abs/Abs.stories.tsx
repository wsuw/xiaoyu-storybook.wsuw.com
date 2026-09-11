import type { Meta, StoryObj } from '@storybook/react-vite';
import { AbsDefinition } from './AbsDefinition';
import { AbsStoryScene } from './AbsStoryScene';
import { FormulaPracticeQuiz } from '../common/FormulaPracticeQuiz';
import { absQuizData } from './absQuizData';

const meta = {
  title: '参数化家装手记/数学与统计/abs 绝对值',
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
    deskOffset: {
      name: '桌板双向悬挑偏移量 (#DeskOffset)',
      control: {
        type: 'range',
        min: -500,
        max: 500,
        step: 20,
      },
      description: '负数表示向左靠窗悬挑伸展，正数表示向右靠床悬挑伸展。通过 abs 取净跨度绝对值，超过 200mm 自动加装工字钢与灯带',
    },
  },
  args: {
    deskOffset: -350,
  },
  render: (args) => <AbsStoryScene {...args} />,
};

// Story 3: 练习闯关与实战测试
export const 练习闯关: StoryObj = {
  name: '3. 练习闯关与实战测试',
  render: () => <FormulaPracticeQuiz data={absQuizData} />,
};
