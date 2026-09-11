import type { Meta, StoryObj } from '@storybook/react-vite';
import { AllInDefinition } from './AllInDefinition';
import { AllInStoryScene } from './AllInStoryScene';
import { FormulaPracticeQuiz } from '../common/FormulaPracticeQuiz';
import { allinQuizData } from './allinQuizData';

const meta = {
  title: '参数化家装手记/逻辑与条件/AllIn 集合包含',
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
    isFloating: {
      name: '配置 1: 极简悬空壁挂 (无地脚)',
      control: {
        type: 'boolean',
      },
      description: '【必备三大重载项之一】悬空离地 280mm，底部无柜脚支撑，完全依赖墙面悬挑',
    },
    hasSinteredStone: {
      name: '配置 2: 大理石岩板厚台面',
      control: {
        type: 'boolean',
      },
      description: '【必备三大重载项之一】沉重大理石岩板台面（自重大、刚性强）',
    },
    hasDoubleBasin: {
      name: '配置 3: 豪华双人双台盆',
      control: {
        type: 'boolean',
      },
      description: '【必备三大重载项之一】双下沉陶瓷盆（盛水自重超 80kg）',
    },
    hasLedMirror: {
      name: '配置 4: 智能除雾 LED 镜柜',
      control: {
        type: 'boolean',
      },
      description: '【可选配件】顶部配套大面宽防雾智能镜柜（多选不影响三大件包含状态）',
    },
    hasBottomSensorLight: {
      name: '配置 5: 底部感应悬浮夜灯',
      control: {
        type: 'boolean',
      },
      description: '【可选配件】柜底智能感应线性夜灯（多选不影响三大件包含状态）',
    },
  },
  args: {
    isFloating: true,
    hasSinteredStone: true,
    hasDoubleBasin: true,
    hasLedMirror: true,
    hasBottomSensorLight: true,
  },
  render: (args) => <AllInStoryScene {...args} />,
};

// Story 3: 练习闯关与实战测试
export const 练习闯关: StoryObj = {
  name: '3. 练习闯关与实战测试',
  render: () => <FormulaPracticeQuiz data={allinQuizData} />,
};
