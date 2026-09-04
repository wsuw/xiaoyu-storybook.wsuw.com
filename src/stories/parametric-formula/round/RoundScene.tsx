import React from 'react';
import { FormulaLayout } from '../FormulaLayout';
import { FORMULA_STORIES } from '../FormulaStoryData';

const storyData = FORMULA_STORIES.find((s) => s.id === 'round')!;

export interface RoundSceneProps {
  mode?: 'definition' | 'story';
  val1?: number;
  val2?: number;
  onParam1Change?: (v: number) => void;
  onParam2Change?: (v: number) => void;
}

export const RoundScene: React.FC<RoundSceneProps> = ({
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

    // round(#PanelSize, 1)
    const rounded = Math.round(val1 * 10) / 10;
    const scaleX = rounded / 300;
    return (
      <group position={[0, -0.2, 0]}>
        {/* 规整后的数控板材 */}
        <mesh position={[0, 0.2, 0]}>
          <boxGeometry args={[scaleX, 1.4, 0.8]} />
          <meshStandardMaterial color="#14b8a6" metalness={0.5} roughness={0.2} />
        </mesh>
        {/* 激光测量对齐标尺 */}
        <mesh position={[0, -0.7, 0]}>
          <cylinderGeometry args={[0.015, 0.015, scaleX, 16]} rotation={[0, 0, Math.PI / 2]} />
          <meshBasicMaterial color="#0d9488" />
        </mesh>
      </group>
    );
      }}
    />
  );
};
