import React from 'react';
import { FormulaLayout } from './FormulaLayout';
import { FORMULA_STORIES } from './FormulaStoryData';

const storyData = FORMULA_STORIES.find((s) => s.id === 'if')!;

export interface IfSceneProps {
  mode?: 'definition' | 'story';
  val1?: number;
  val2?: number;
  onParam1Change?: (v: number) => void;
  onParam2Change?: (v: number) => void;
}

export const IfScene: React.FC<IfSceneProps> = ({ mode = 'story', val1, val2, onParam1Change, onParam2Change }) => {
  return (
    <FormulaLayout
      story={storyData}
      mode={mode}
      val1={val1}
      val2={val2}
      onParam1Change={onParam1Change}
      onParam2Change={onParam2Change}
      render3D={(val1, val2, accent) => {

    const w = val1 / 400;
    const drawerDepth = val1 < 500 ? 350 / 300 : 450 / 300;
    const isNarrow = val1 < 500;
    return (
      <group position={[0, -0.2, 0]}>
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[w, 2.0, 1.4]} />
          <meshStandardMaterial color="#64748b" wireframe transparent opacity={0.35} />
        </mesh>
        <mesh position={[0, -0.3, (drawerDepth * 0.5) - 0.35]}>
          <boxGeometry args={[w * 0.88, 0.55, drawerDepth]} />
          <meshStandardMaterial color={isNarrow ? '#6366f1' : '#4338ca'} metalness={0.2} roughness={0.3} />
        </mesh>
        <mesh position={[0, 1.2, 0]}>
          <cylinderGeometry args={[0.015, 0.015, w, 16]} rotation={[0, 0, Math.PI / 2]} />
          <meshBasicMaterial color={accent} />
        </mesh>
      </group>
    );
      }}
    />
  );
};
