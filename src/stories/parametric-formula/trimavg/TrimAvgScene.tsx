import React from 'react';
import { FormulaLayout } from '../FormulaLayout';
import { FORMULA_STORIES } from '../FormulaStoryData';

const storyData = FORMULA_STORIES.find((s) => s.id === 'trimavg')!;

export interface TrimAvgSceneProps {
  mode?: 'definition' | 'story';
  val1?: number;
  val2?: number;
  onParam1Change?: (v: number) => void;
  onParam2Change?: (v: number) => void;
}

export const TrimAvgScene: React.FC<TrimAvgSceneProps> = ({
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

    // trimavg(#TotalW, #W1, #W2, #W3)
    const lockedW = val1 / 400;
    const totalSpace = 2.4;
    const remainingW = (totalSpace - lockedW) / 3;
    return (
      <group position={[0, -0.2, 0]}>
        {/* 左侧被用户焊死锁定的固定格 */}
        <mesh position={[-totalSpace / 2 + lockedW / 2, 0.2, 0]}>
          <boxGeometry args={[lockedW, 1.8, 0.8]} />
          <meshStandardMaterial color="#d946ef" metalness={0.4} />
        </mesh>
        {/* 其余自适应均分的 3 个格子 */}
        {[0, 1, 2].map((idx) => {
          const posX = -totalSpace / 2 + lockedW + remainingW * (idx + 0.5);
          return (
            <mesh key={idx} position={[posX, 0.2, 0]}>
              <boxGeometry args={[remainingW * 0.92, 1.8, 0.8]} />
              <meshStandardMaterial color="#f0abfc" transparent opacity={0.6} wireframe />
            </mesh>
          );
        })}
      </group>
    );
      }}
    />
  );
};
