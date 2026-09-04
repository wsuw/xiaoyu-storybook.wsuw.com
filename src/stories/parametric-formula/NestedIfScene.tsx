import React from 'react';
import { FormulaLayout } from './FormulaLayout';
import { FORMULA_STORIES } from './FormulaStoryData';

const storyData = FORMULA_STORIES.find((s) => s.id === 'nestedif')!;

export interface NestedIfSceneProps {
  mode?: 'definition' | 'story';
  val1?: number;
  val2?: number;
  onParam1Change?: (v: number) => void;
  onParam2Change?: (v: number) => void;
}

export const NestedIfScene: React.FC<NestedIfSceneProps> = ({ mode = 'story', val1, val2, onParam1Change, onParam2Change }) => {
  return (
    <FormulaLayout
      story={storyData}
      mode={mode}
      val1={val1}
      val2={val2}
      onParam1Change={onParam1Change}
      onParam2Change={onParam2Change}
      render3D={(val1, val2, accent) => {

    const depth = val1 / 300;
    let tierColor = '#8b5cf6';
    let bracketScale = 1;
    if (val1 <= 350) {
      tierColor = '#a78bfa';
      bracketScale = 0.75;
    } else if (val1 <= 400) {
      tierColor = '#8b5cf6';
      bracketScale = 1.0;
    } else {
      tierColor = '#6d28d9';
      bracketScale = 1.3;
    }
    return (
      <group position={[0, 0, 0]}>
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[1.8, 2.2, depth]} />
          <meshStandardMaterial color="#94a3b8" transparent opacity={0.25} wireframe />
        </mesh>
        <mesh position={[0, 0.2, 0]}>
          <cylinderGeometry args={[0.04, 0.04, depth * 0.85 * bracketScale, 16]} rotation={[Math.PI / 2, 0, 0]} />
          <meshStandardMaterial color={tierColor} metalness={0.6} roughness={0.2} />
        </mesh>
        <mesh position={[0, 0.2, 0]}>
          <torusGeometry args={[0.32 * bracketScale, 0.035, 16, 32]} />
          <meshStandardMaterial color={tierColor} />
        </mesh>
      </group>
    );
      }}
    />
  );
};
