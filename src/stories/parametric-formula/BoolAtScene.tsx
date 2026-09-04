import React from 'react';
import { FormulaLayout } from './FormulaLayout';
import { FORMULA_STORIES } from './FormulaStoryData';

const storyData = FORMULA_STORIES.find((s) => s.id === 'boolat')!;

export interface BoolAtSceneProps {
  mode?: 'definition' | 'story';
  val1?: number;
  val2?: number;
  onParam1Change?: (v: number) => void;
  onParam2Change?: (v: number) => void;
}

export const BoolAtScene: React.FC<BoolAtSceneProps> = ({ mode = 'story', val1, val2, onParam1Change, onParam2Change }) => {
  return (
    <FormulaLayout
      story={storyData}
      mode={mode}
      val1={val1}
      val2={val2}
      onParam1Change={onParam1Change}
      onParam2Change={onParam2Change}
      render3D={(val1, val2, accent) => {

    const isExact = val1 === 3;
    return (
      <group position={[0, 0, 0]}>
        <mesh>
          <boxGeometry args={[1.8, 2.0, 1.0]} />
          <meshStandardMaterial color="#0d9488" metalness={0.1} roughness={0.4} />
        </mesh>
        <mesh>
          <boxGeometry args={[1.84, 2.04, 1.04]} />
          <meshStandardMaterial color={isExact ? '#14b8a6' : '#cbd5e1'} wireframe />
        </mesh>
      </group>
    );
      }}
    />
  );
};
