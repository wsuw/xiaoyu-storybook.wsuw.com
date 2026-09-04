import type { Meta, StoryObj } from '@storybook/react-vite';
import { IfScene } from './IfScene';
import { FORMULA_STORIES } from '../FormulaStoryData';

const storyData = FORMULA_STORIES.find((s) => s.id === 'if')!;

const meta = {
  title: '公式/逻辑与条件/if 条件判断',
  component: IfScene,
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    val1: {
      name: storyData.paramDef.label,
      control: {
        type: 'range',
        min: storyData.paramDef.min,
        max: storyData.paramDef.max,
        step: storyData.paramDef.step,
      },
      description: '实时调节参数 1，驱动 3D 模型变化',
    },
    
  },
} satisfies Meta<typeof IfScene>;

export default meta;
type Story = StoryObj<typeof meta>;

// Story 1: 公式定义与功能说明
export const 公式定义: Story = {
  name: '1. 公式定义与说明',
  args: {
    mode: 'definition',
  },
};

// Story 2: 3D 场景故事与参数实时交互
export const 故事演练: Story = {
  name: '2. 3D 故事与交互演练',
  args: {
    mode: 'story',
    val1: storyData.paramDef.defaultVal,
    
  },
};
