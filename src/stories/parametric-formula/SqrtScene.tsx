import React from 'react';
import { FormulaLayout } from './FormulaLayout';
import { FORMULA_STORIES } from './FormulaStoryData';

const storyData = FORMULA_STORIES.find((s) => s.id === 'sqrt')!;

export interface SqrtSceneProps {
  mode?: 'definition' | 'story';
  val1?: number;
  val2?: number;
  onParam1Change?: (v: number) => void;
  onParam2Change?: (v: number) => void;
}

export const SqrtScene: React.FC<SqrtSceneProps> = ({ mode = 'story', val1, val2, onParam1Change, onParam2Change }) => {
  return (
    <FormulaLayout
      story={storyData}
      mode={mode}
      val1={val1}
      val2={val2}
      onParam1Change={onParam1Change}
      onParam2Change={onParam2Change}
      render3D={(val1, val2, accent) => {

    const w = val1 / 350;
    const h = (val2 || 600) / 350;
    const diag = Math.sqrt(w * w + h * h);
    const diagAngle = Math.atan2(h, w);
    return (
      <group position={[0, 0, 0]}>
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[w, h, 0.08]} />
          <meshStandardMaterial color="#cbd5e1" wireframe />
        </mesh>
        <mesh position={[0, 0, 0]} rotation={[0, 0, diagAngle]}>
          <cylinderGeometry args={[0.02, 0.02, diag, 16]} />
          <meshStandardMaterial color="#10b981" metalness={0.8} />
        </mesh>
        <mesh position={[0, 0, 0]} rotation={[0, 0, -diagAngle]}>
          <cylinderGeometry args={[0.02, 0.02, diag, 16]} />
          <meshStandardMaterial color="#10b981" metalness={0.8} />
        </mesh>
      </group>
    );
      }}
    />
  );
};
