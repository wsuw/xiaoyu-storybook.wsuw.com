import React from 'react';
import { FormulaLayout } from './FormulaLayout';
import { FORMULA_STORIES } from './FormulaStoryData';

const storyData = FORMULA_STORIES.find((s) => s.id === 'and')!;

export interface AndSceneProps {
  mode?: 'definition' | 'story';
  val1?: number;
  val2?: number;
  onParam1Change?: (v: number) => void;
  onParam2Change?: (v: number) => void;
}

export const AndScene: React.FC<AndSceneProps> = ({ mode = 'story', val1, val2, onParam1Change, onParam2Change }) => {
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
    const d = val2 / 300;
    const isRisk = val1 > 600 && val2 > 380;
    return (
      <group position={[0, 0, 0]}>
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[w, 2.0, d]} />
          <meshStandardMaterial color="#94a3b8" wireframe transparent opacity={0.3} />
        </mesh>
        {[-0.5, 0.5].map((y, i) => (
          <mesh key={i} position={[0, y, 0]}>
            <boxGeometry args={[w * 0.96, 0.06, d * 0.9]} />
            <meshStandardMaterial color="#f59e0b" metalness={0.3} />
          </mesh>
        ))}
        {isRisk && (
          <mesh position={[0, 0, 0]}>
            <boxGeometry args={[0.06, 1.06, d * 0.88]} />
            <meshStandardMaterial color="#d97706" metalness={0.5} roughness={0.2} />
          </mesh>
        )}
      </group>
    );
      }}
    />
  );
};
