import React from 'react';
import { FormulaLayout } from '../FormulaLayout';
import { FORMULA_STORIES } from '../FormulaStoryData';

const storyData = FORMULA_STORIES.find((s) => s.id === 'invtrig')!;

export interface InvTrigSceneProps {
  mode?: 'definition' | 'story';
  val1?: number;
  val2?: number;
  onParam1Change?: (v: number) => void;
  onParam2Change?: (v: number) => void;
}

export const InvTrigScene: React.FC<InvTrigSceneProps> = ({
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

    // θ = asin(#LiftH / #ArmLength)
    const liftNorm = val1 / 400;
    const angle = Math.asin(Math.min(0.95, liftNorm));
    return (
      <group position={[0, -0.1, 0]}>
        {/* 吊柜主体 */}
        <mesh position={[0, 0.4, -0.4]}>
          <boxGeometry args={[1.8, 1.2, 0.8]} />
          <meshStandardMaterial color="#e2e8f0" wireframe transparent opacity={0.4} />
        </mesh>
        {/* 掀起的上翻门板 */}
        <mesh position={[0, 1.0, 0]} rotation={[-angle, 0, 0]}>
          <boxGeometry args={[1.76, 1.16, 0.04]} />
          <meshStandardMaterial color="#eab308" metalness={0.3} roughness={0.3} />
        </mesh>
        {/* 反求角度驱动的机械伸缩杆 */}
        <mesh position={[0.7, 0.5, 0]} rotation={[angle * 1.2, 0, 0]}>
          <cylinderGeometry args={[0.02, 0.02, 0.9, 16]} />
          <meshStandardMaterial color="#ca8a04" metalness={0.8} />
        </mesh>
      </group>
    );
      }}
    />
  );
};
