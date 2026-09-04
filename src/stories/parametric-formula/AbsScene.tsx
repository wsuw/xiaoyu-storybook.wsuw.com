import React from 'react';
import { FormulaLayout } from './FormulaLayout';
import { FORMULA_STORIES } from './FormulaStoryData';

const storyData = FORMULA_STORIES.find((s) => s.id === 'abs')!;

export interface AbsSceneProps {
  mode?: 'definition' | 'story';
  val1?: number;
  val2?: number;
  onParam1Change?: (v: number) => void;
  onParam2Change?: (v: number) => void;
}

export const AbsScene: React.FC<AbsSceneProps> = ({ mode = 'story', val1, val2, onParam1Change, onParam2Change }) => {
  return (
    <FormulaLayout
      story={storyData}
      mode={mode}
      val1={val1}
      val2={val2}
      onParam1Change={onParam1Change}
      onParam2Change={onParam2Change}
      render3D={(val1, val2, accent) => {

    const offset = val1 / 100;
    const cutoutAbs = Math.abs(val1) / 100;
    return (
      <group position={[0, 0, 0]}>
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[2.2, 1.6, 0.08]} />
          <meshStandardMaterial color="#e2e8f0" />
        </mesh>
        <mesh position={[offset * 0.8, 0.4, 0.05]}>
          <boxGeometry args={[cutoutAbs * 0.8, 0.8, 0.1]} />
          <meshStandardMaterial color="#84cc16" metalness={0.4} />
        </mesh>
      </group>
    );
      }}
    />
  );
};
