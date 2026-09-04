import React from 'react';
import { FormulaLayout } from '../FormulaLayout';
import { FORMULA_STORIES } from '../FormulaStoryData';

const storyData = FORMULA_STORIES.find((s) => s.id === 'abs')!;

export interface AbsSceneProps {
  mode?: 'definition' | 'story';
  val1?: number;
  val2?: number;
  onParam1Change?: (v: number) => void;
  onParam2Change?: (v: number) => void;
}

export const AbsScene: React.FC<AbsSceneProps> = ({
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

    // abs(#OffsetX) * #Depth
    const offset = val1 / 100;
    const cutoutAbs = Math.abs(val1) / 100;
    return (
      <group position={[0, -0.2, 0]}>
        {/* 完整板材基板 */}
        <mesh position={[0, 0.2, 0]}>
          <boxGeometry args={[2.2, 1.5, 0.08]} />
          <meshStandardMaterial color="#cbd5e1" />
        </mesh>
        {/* 凸柱开缺挖孔块（展示绝对值大小） */}
        <mesh position={[offset * 0.7, 0.5, 0.05]}>
          <boxGeometry args={[cutoutAbs * 0.7, 0.7, 0.1]} />
          <meshStandardMaterial color="#84cc16" metalness={0.5} />
        </mesh>
      </group>
    );
      }}
    />
  );
};
