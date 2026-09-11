import type { Meta, StoryObj } from '@storybook/react-vite';
import { SinCosDefinition } from './SinCosDefinition';
import { SinCosStoryScene } from './SinCosStoryScene';
import { FormulaPracticeQuiz } from '../common/FormulaPracticeQuiz';
import { sincosQuizData } from './sincosQuizData';

const meta = {
  title: '参数化家装手记/空间几何/sin 与 cos 三角圆周',
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta;

export default meta;

// Story 1: 公式定义与说明 (独立组件，无参数输入干扰)
export const 公式定义: StoryObj = {
  name: '1. 公式定义与说明',
  render: () => <SinCosDefinition />,
};

// Story 2: 3D 故事与交互演练 (独立 3D 场景组件，参数在 Storybook Controls 中随意修改)
export const 故事演练: StoryObj = {
  name: '2. 3D 故事与交互演练',
  argTypes: {
    angle: {
      name: '隐形门开启角度 (0°-90°)',
      control: {
        type: 'range',
        min: 0,
        max: 90,
        step: 2,
      },
      description: '隐形门开启角度，在 Storybook Controls 中实时修改此值即可驱动 3D 变化',
    },
  },
  args: {
    angle: 45,
  },
  render: (args) => <SinCosStoryScene {...args} />,
};

// Story 3: 练习闯关与实战测试
export const 练习闯关: StoryObj = {
  name: '3. 练习闯关与实战测试',
  render: () => <FormulaPracticeQuiz data={sincosQuizData} />,
};
