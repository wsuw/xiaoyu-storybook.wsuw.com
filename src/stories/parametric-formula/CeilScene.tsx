import React from 'react';
import { FormulaLayout } from './FormulaLayout';
import { FORMULA_STORIES } from './FormulaStoryData';

const storyData = FORMULA_STORIES.find((s) => s.id === 'ceil')!;

export interface CeilSceneProps {
  mode?: 'definition' | 'story';
  val1?: number;
  val2?: number;
  onParam1Change?: (v: number) => void;
  onParam2Change?: (v: number) => void;
}

export const CeilScene: React.FC<CeilSceneProps> = ({ mode = 'story', val1, val2, onParam1Change, onParam2Change }) => {
  return (
    <FormulaLayout
      story={storyData}
      mode={mode}
      val1={val1}
      val2={val2}
      onParam1Change={onParam1Change}
      onParam2Change={onParam2Change}
      render3D={(val1, val2, accent) => {

    const count = Math.ceil(val1 / 400);
    const h = val1 / 1000;
    const step = h / count;
    return (
      <group position={[0, 0, 0]}>
        <mesh position={[-0.8, 0, 0]}>
          <boxGeometry args={[0.06, h, 0.8]} />
          <meshStandardMaterial color="#94a3b8" />
        </mesh>
        <mesh position={[0.8, 0, 0]}>
          <boxGeometry args={[0.06, h, 0.8]} />
          <meshStandardMaterial color="#94a3b8" />
        </mesh>
        {Array.from({ length: count + 1 }).map((_, i) => (
          <mesh key={i} position={[0, -h / 2 + i * step, 0]}>
            <boxGeometry args={[1.54, 0.05, 0.78]} />
            <meshStandardMaterial color="#06b6d4" metalness={0.4} />
          </mesh>
        ))}
      </group>
    );
      }}
    />
  );
};
