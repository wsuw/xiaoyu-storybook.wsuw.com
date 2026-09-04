import React from 'react';
import { FormulaLayout } from './FormulaLayout';
import { FORMULA_STORIES } from './FormulaStoryData';

const storyData = FORMULA_STORIES.find((s) => s.id === 'floor')!;

export interface FloorSceneProps {
  mode?: 'definition' | 'story';
  val1?: number;
  val2?: number;
  onParam1Change?: (v: number) => void;
  onParam2Change?: (v: number) => void;
}

export const FloorScene: React.FC<FloorSceneProps> = ({ mode = 'story', val1, val2, onParam1Change, onParam2Change }) => {
  return (
    <FormulaLayout
      story={storyData}
      mode={mode}
      val1={val1}
      val2={val2}
      onParam1Change={onParam1Change}
      onParam2Change={onParam2Change}
      render3D={(val1, val2, accent) => {

    const count = Math.floor(val1 / 200);
    const totalH = val1 / 500;
    return (
      <group position={[0, 0, 0]}>
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[1.6, totalH, 1.0]} />
          <meshStandardMaterial color="#cbd5e1" wireframe transparent opacity={0.4} />
        </mesh>
        {Array.from({ length: count }).map((_, i) => (
          <mesh key={i} position={[0, -totalH / 2 + 0.25 + i * 0.45, 0]}>
            <boxGeometry args={[1.4, 0.36, 0.95]} />
            <meshStandardMaterial color="#3b82f6" metalness={0.3} roughness={0.3} />
          </mesh>
        ))}
      </group>
    );
      }}
    />
  );
};
