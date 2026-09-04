import React from 'react';
import { FormulaLayout } from './FormulaLayout';
import { FORMULA_STORIES } from './FormulaStoryData';

const storyData = FORMULA_STORIES.find((s) => s.id === 'or')!;

export interface OrSceneProps {
  mode?: 'definition' | 'story';
  val1?: number;
  val2?: number;
  onParam1Change?: (v: number) => void;
  onParam2Change?: (v: number) => void;
}

export const OrScene: React.FC<OrSceneProps> = ({ mode = 'story', val1, val2, onParam1Change, onParam2Change }) => {
  return (
    <FormulaLayout
      story={storyData}
      mode={mode}
      val1={val1}
      val2={val2}
      onParam1Change={onParam1Change}
      onParam2Change={onParam2Change}
      render3D={(val1, val2, accent) => {

    const h = val1 / 1000;
    const isThick = val1 > 2400;
    const thickness = isThick ? 0.18 : 0.08;
    return (
      <group position={[0, 0, 0]}>
        <mesh position={[-0.8, 0, 0]}>
          <boxGeometry args={[thickness, h, 1.0]} />
          <meshStandardMaterial color={isThick ? '#ea580c' : '#cbd5e1'} metalness={0.2} />
        </mesh>
        <mesh position={[0.8, 0, 0]}>
          <boxGeometry args={[thickness, h, 1.0]} />
          <meshStandardMaterial color={isThick ? '#ea580c' : '#cbd5e1'} metalness={0.2} />
        </mesh>
      </group>
    );
      }}
    />
  );
};
