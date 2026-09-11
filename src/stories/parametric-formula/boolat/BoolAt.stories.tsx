import type { Meta, StoryObj } from '@storybook/react-vite';
import { BoolAtDefinition } from './BoolAtDefinition';
import { BoolAtStoryScene } from './BoolAtStoryScene';
import { FormulaPracticeQuiz } from '../common/FormulaPracticeQuiz';
import { boolatQuizData } from './boolatQuizData';

const meta = {
  title: '参数化家装手记/逻辑与条件/BoolAt 严格一致',
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
    hasHanger: {
      name: '模块 1: 长衣大衣悬挂区',
      control: {
        type: 'boolean',
      },
      description: '模块编号 1：长衣挂衣杆、木质衣架与西装大衣、底部皮质鞋包台',
    },
    hasJewelry: {
      name: '模块 2: 丝绒手表首饰抽+裤架',
      control: {
        type: 'boolean',
      },
      description: '模块编号 2：爱马仕橙丝绒首饰多宝格大抽屉与推拉西裤架',
    },
    hasGlass: {
      name: '模块 3: 铝框茶玻展示高柜',
      control: {
        type: 'boolean',
      },
      description: '模块编号 3：极窄黑钛茶色玻璃门展示柜与名包香水陈列',
    },
  },
  args: {
    hasHanger: true,
    hasJewelry: true,
    hasGlass: true,
  },
  render: (args) => <BoolAtStoryScene {...args} />,
};

// Story 3: 练习闯关与实战测试
export const 练习闯关: StoryObj = {
  name: '3. 练习闯关与实战测试',
  render: () => <FormulaPracticeQuiz data={boolatQuizData} />,
};
