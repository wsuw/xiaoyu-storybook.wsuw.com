import React from 'react';
import { FormulaLayout } from '../FormulaLayout';
import { FORMULA_STORIES } from '../FormulaStoryData';

const storyData = FORMULA_STORIES.find((s) => s.id === 'sign')!;

export interface SignSceneProps {
  mode?: 'definition' | 'story';
  val1?: number;
  val2?: number;
  onParam1Change?: (v: number) => void;
  onParam2Change?: (v: number) => void;
}

export const SignScene: React.FC<SignSceneProps> = ({
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

    // sign(#MoveOffset)
    const signVal = Math.sign(val1);
    const posX = (val1 / 100) * 0.8;
    return (
      <group position={[0, -0.2, 0]}>
        {/* 顶部双轨吊轨 */}
        <mesh position={[0, 0.8, 0]}>
          <boxGeometry args={[2.5, 0.06, 0.15]} />
          <meshStandardMaterial color="#94a3b8" metalness={0.8} />
        </mesh>
        {/* 移门主体 */}
        <mesh position={[posX, 0, 0]}>
          <boxGeometry args={[0.85, 1.5, 0.06]} />
          <meshStandardMaterial color="#6366f1" metalness={0.3} roughness={0.4} />
        </mesh>
        {/* 根据 sign(+1/-1) 输出的逆向缓冲弹簧指向 */}
        <mesh position={[posX - signVal * 0.6, 0.8, 0]} rotation={[0, 0, signVal > 0 ? Math.PI : 0]}>
          <coneGeometry args={[0.12, 0.35, 16]} />
          <meshStandardMaterial color="#4f46e5" />
        </mesh>
      </group>
    );
      }}
    />
  );
};
