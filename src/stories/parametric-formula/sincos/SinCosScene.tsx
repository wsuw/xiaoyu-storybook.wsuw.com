import React from 'react';
import { FormulaLayout } from '../FormulaLayout';
import { FORMULA_STORIES } from '../FormulaStoryData';

const storyData = FORMULA_STORIES.find((s) => s.id === 'sincos')!;

export interface SinCosSceneProps {
  mode?: 'definition' | 'story';
  val1?: number;
  val2?: number;
  onParam1Change?: (v: number) => void;
  onParam2Change?: (v: number) => void;
}

export const SinCosScene: React.FC<SinCosSceneProps> = ({
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

    // X = R*cos(θ), Z = R*sin(θ)
    const rad = (val1 * Math.PI) / 180;
    const r = 0.95;
    const posX = r * Math.sin(rad);
    const posZ = r * Math.cos(rad) - r;
    return (
      <group position={[0, -0.2, 0]}>
        {/* L 型拐角地柜外壳 */}
        <mesh position={[0, 0.2, 0]}>
          <boxGeometry args={[1.8, 1.6, 1.8]} />
          <meshStandardMaterial color="#cbd5e1" wireframe transparent opacity={0.35} />
        </mesh>
        {/* 盘旋滑出的飞碟旋转托盘 */}
        <group position={[posX, 0.2, posZ]}>
          <mesh rotation={[0, rad * 1.5, 0]}>
            <cylinderGeometry args={[0.7, 0.7, 0.08, 32]} />
            <meshStandardMaterial color="#f43f5e" metalness={0.4} roughness={0.3} />
          </mesh>
          <mesh position={[0, 0.12, 0]}>
            <torusGeometry args={[0.68, 0.02, 16, 32]} />
            <meshStandardMaterial color="#e11d48" />
          </mesh>
        </group>
      </group>
    );
      }}
    />
  );
};
