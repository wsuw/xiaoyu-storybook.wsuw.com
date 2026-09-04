import React from 'react';
import { FormulaLayout } from './FormulaLayout';
import { FORMULA_STORIES } from './FormulaStoryData';

const storyData = FORMULA_STORIES.find((s) => s.id === 'allin')!;

export interface AllInSceneProps {
  mode?: 'definition' | 'story';
  val1?: number;
  val2?: number;
  onParam1Change?: (v: number) => void;
  onParam2Change?: (v: number) => void;
}

export const AllInScene: React.FC<AllInSceneProps> = ({ mode = 'story', val1, val2, onParam1Change, onParam2Change }) => {
  return (
    <FormulaLayout
      story={storyData}
      mode={mode}
      val1={val1}
      val2={val2}
      onParam1Change={onParam1Change}
      onParam2Change={onParam2Change}
      render3D={(val1, val2, accent) => {

    const isAllIn = val1 === 7;
    return (
      <group position={[0, 0, 0]}>
        {[-0.8, 0, 0.8].map((x, idx) => {
          const hasItem = Boolean(val1 & (1 << idx));
          return (
            <group key={idx} position={[x, 0, 0]}>
              <mesh>
                <boxGeometry args={[0.7, 1.4, 1.0]} />
                <meshStandardMaterial color={hasItem ? '#0284c7' : '#e2e8f0'} transparent opacity={hasItem ? 0.9 : 0.4} />
              </mesh>
            </group>
          );
        })}
        <mesh position={[0, -0.85, 0]}>
          <boxGeometry args={[2.5, isAllIn ? 0.22 : 0.06, 1.05]} />
          <meshStandardMaterial color={isAllIn ? '#0284c7' : '#cbd5e1'} metalness={0.7} roughness={0.2} />
        </mesh>
      </group>
    );
      }}
    />
  );
};
