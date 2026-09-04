import React from 'react';
import { FormulaLayout } from '../FormulaLayout';
import { FORMULA_STORIES } from '../FormulaStoryData';

const storyData = FORMULA_STORIES.find((s) => s.id === 'mean')!;

export interface MeanSceneProps {
  mode?: 'definition' | 'story';
  val1?: number;
  val2?: number;
  onParam1Change?: (v: number) => void;
  onParam2Change?: (v: number) => void;
}

export const MeanScene: React.FC<MeanSceneProps> = ({
  mode = 'story',
  val1,
  val2,
  onParam1Change,
  onParam2Change,
}) => {
  return (
    <FormulaLayout
      story={storyData}
      mode={mode}
      val1={val1}
      val2={val2}
      onParam1Change={onParam1Change}
      onParam2Change={onParam2Change}
      render3D={(val1, val2, accent) => {

    // mean([y1, y2, y3])
    const diff = val1 / 100;
    const y1 = -0.4 - diff * 0.4;
    const y2 = 0.1 + diff * 0.2;
    const y3 = 0.6 + diff * 0.5;
    const avg = (y1 + y2 + y3) / 3;
    return (
      <group position={[0, -0.1, 0]}>
        {/* 三块错乱板材 */}
        {[y1, y2, y3].map((y, idx) => (
          <mesh key={idx} position={[0, y, 0]}>
            <boxGeometry args={[1.5, 0.05, 0.8]} />
            <meshStandardMaterial color="#8b5cf6" metalness={0.3} />
          </mesh>
        ))}
        {/* 均值黄金基准指示面 */}
        <mesh position={[0, avg, 0]}>
          <boxGeometry args={[1.7, 0.02, 0.85]} />
          <meshBasicMaterial color="#7c3aed" />
        </mesh>
      </group>
    );
      }}
    />
  );
};
