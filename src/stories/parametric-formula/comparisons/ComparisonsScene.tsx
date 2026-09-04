import React from 'react';
import { FormulaLayout } from '../FormulaLayout';
import { FORMULA_STORIES } from '../FormulaStoryData';

const storyData = FORMULA_STORIES.find((s) => s.id === 'comparisons')!;

export interface ComparisonsSceneProps {
  mode?: 'definition' | 'story';
  val1?: number;
  val2?: number;
  onParam1Change?: (v: number) => void;
  onParam2Change?: (v: number) => void;
}

export const ComparisonsScene: React.FC<ComparisonsSceneProps> = ({
  mode = 'story',
  val1,
  val2,
  onParam1Change,
  onParam2Change,
}) => {
  return (
    <FormulaLayout
      story={storyData}
      mode={mode}
      val1={val1}
      val2={val2}
      onParam1Change={onParam1Change}
      onParam2Change={onParam2Change}
      render3D={(val1, val2, accent) => {

    // if(#W <= 550, 15, 30)
    const fillerW = val1 <= 550 ? 0.08 : 0.22;
    return (
      <group position={[0, -0.2, 0]}>
        {/* 主浴室柜 */}
        <mesh position={[-0.2, 0.2, 0]}>
          <boxGeometry args={[1.4, 1.7, 1.0]} />
          <meshStandardMaterial color="#64748b" metalness={0.2} />
        </mesh>
        {/* 右侧自适应填缝条 */}
        <mesh position={[0.5 + fillerW / 2, 0.2, 0]}>
          <boxGeometry args={[fillerW, 1.7, 1.0]} />
          <meshStandardMaterial color="#475569" metalness={0.6} />
        </mesh>
        {/* 模拟右侧墙体 */}
        <mesh position={[0.5 + fillerW + 0.15, 0.2, 0]}>
          <boxGeometry args={[0.2, 2.2, 1.4]} />
          <meshStandardMaterial color="#e2e8f0" />
        </mesh>
      </group>
    );
      }}
    />
  );
};
