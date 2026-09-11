import type { Meta, StoryObj } from '@storybook/react-vite';
import { EqNeqDefinition } from './EqNeqDefinition';
import { EqNeqStoryScene } from './EqNeqStoryScene';
import { FormulaPracticeQuiz } from '../common/FormulaPracticeQuiz';
import { eqNeqQuizData } from './eqNeqQuizData';

const meta = {
  title: '参数化家装手记/逻辑与条件/== 与 != 比较',
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
    hasDoor: {
      name: '是否带门 (#HasDoor)',
      control: {
        type: 'inline-radio',
      },
      options: [0, 1],
      description: '1 代表带门封闭柜（#HasDoor == 1 为真），0 代表开放式展示书架（#HasDoor == 1 为假）',
    },
  },
  args: {
    hasDoor: 1,
  },
  render: (args) => <EqNeqStoryScene {...args} />,
};

// Story 3: 练习闯关与实战测试
export const 练习闯关: StoryObj = {
  name: '3. 练习闯关与实战测试',
  render: () => <FormulaPracticeQuiz data={eqNeqQuizData} />,
};
