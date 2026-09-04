import React from 'react';
import { FormulaLayout } from './FormulaLayout';
import { FORMULA_STORIES } from './FormulaStoryData';

const storyData = FORMULA_STORIES.find((s) => s.id === 'comparisons')!;

export interface ComparisonsSceneProps {
  mode?: 'definition' | 'story';
  val1?: number;
  val2?: number;
  onParam1Change?: (v: number) => void;
  onParam2Change?: (v: number) => void;
}

export const ComparisonsScene: React.FC<ComparisonsSceneProps> = ({ mode = 'story', val1, val2, onParam1Change, onParam2Change }) => {
  return (
    <FormulaLayout
      story={storyData}
      mode={mode}
      val1={val1}
      val2={val2}
      onParam1Change={onParam1Change}
      onParam2Change={onParam2Change}
      render3D={(val1, val2, accent) => {

    const fillerW = val1 <= 550 ? 0.08 : 0.22;
    return (
      <group position={[0, 0, 0]}>
        <mesh position={[-0.2, 0, 0]}>
          <boxGeometry args={[1.4, 1.8, 1.0]} />
          <meshStandardMaterial color="#64748b" metalness={0.2} />
        </mesh>
        <mesh position={[0.5 + fillerW / 2, 0, 0]}>
          <boxGeometry args={[fillerW, 1.8, 1.0]} />
          <meshStandardMaterial color="#475569" metalness={0.5} />
        </mesh>
      </group>
    );
      }}
    />
  );
};
