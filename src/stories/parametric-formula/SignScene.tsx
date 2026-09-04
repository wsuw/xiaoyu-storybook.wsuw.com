import React from 'react';
import { FormulaLayout } from './FormulaLayout';
import { FORMULA_STORIES } from './FormulaStoryData';

const storyData = FORMULA_STORIES.find((s) => s.id === 'sign')!;

export interface SignSceneProps {
  mode?: 'definition' | 'story';
  val1?: number;
  val2?: number;
  onParam1Change?: (v: number) => void;
  onParam2Change?: (v: number) => void;
}

export const SignScene: React.FC<SignSceneProps> = ({ mode = 'story', val1, val2, onParam1Change, onParam2Change }) => {
  return (
    <FormulaLayout
      story={storyData}
      mode={mode}
      val1={val1}
      val2={val2}
      onParam1Change={onParam1Change}
      onParam2Change={onParam2Change}
      render3D={(val1, val2, accent) => {

    const signVal = Math.sign(val1);
    const posX = (val1 / 100) * 0.8;
    return (
      <group position={[0, 0, 0]}>
        <mesh position={[0, 0, 0]}>
          <cylinderGeometry args={[0.02, 0.02, 2.4, 16]} rotation={[0, 0, Math.PI / 2]} />
          <meshStandardMaterial color="#94a3b8" metalness={0.8} />
        </mesh>
        <mesh position={[posX, -0.4, 0]}>
          <boxGeometry args={[0.8, 1.3, 0.06]} />
          <meshStandardMaterial color="#6366f1" metalness={0.3} />
        </mesh>
        <mesh position={[posX - signVal * 0.55, 0.5, 0]} rotation={[0, 0, signVal > 0 ? Math.PI : 0]}>
          <coneGeometry args={[0.14, 0.35, 16]} />
          <meshStandardMaterial color="#4f46e5" />
        </mesh>
      </group>
    );
      }}
    />
  );
};
