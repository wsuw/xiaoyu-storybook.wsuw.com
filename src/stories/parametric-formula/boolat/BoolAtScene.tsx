import React from 'react';
import { FormulaLayout } from '../FormulaLayout';
import { FORMULA_STORIES } from '../FormulaStoryData';

const storyData = FORMULA_STORIES.find((s) => s.id === 'boolat')!;

export interface BoolAtSceneProps {
  mode?: 'definition' | 'story';
  val1?: number;
  val2?: number;
  onParam1Change?: (v: number) => void;
  onParam2Change?: (v: number) => void;
}

export const BoolAtScene: React.FC<BoolAtSceneProps> = ({
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

    // BoolAt(#Selected, [0, 1, 2])
    const isExact = val1 === 3;
    return (
      <group position={[0, -0.1, 0]}>
        {/* 主柜体 */}
        <mesh position={[0, 0.2, 0]}>
          <boxGeometry args={[1.8, 1.8, 1.0]} />
          <meshStandardMaterial color="#0d9488" roughness={0.3} metalness={0.2} />
        </mesh>
        {/* 门缝极简分割 */}
        <mesh position={[0, 0.2, 0.51]}>
          <boxGeometry args={[0.01, 1.76, 0.02]} />
          <meshStandardMaterial color="#042f2e" />
        </mesh>
        {/* 专属一体化激光封边光泽外框：仅当严格等于套餐组合码3时激活动态边框 */}
        <mesh position={[0, 0.2, 0]}>
          <boxGeometry args={[1.82, 1.82, 1.02]} />
          <meshStandardMaterial
            color={isExact ? '#14b8a6' : '#cbd5e1'}
            metalness={isExact ? 0.9 : 0.1}
            wireframe={true}
          />
        </mesh>
      </group>
    );
      }}
    />
  );
};
