import React from 'react';
import { FormulaLayout } from '../FormulaLayout';
import { FORMULA_STORIES } from '../FormulaStoryData';

const storyData = FORMULA_STORIES.find((s) => s.id === 'allin')!;

export interface AllInSceneProps {
  mode?: 'definition' | 'story';
  val1?: number;
  val2?: number;
  onParam1Change?: (v: number) => void;
  onParam2Change?: (v: number) => void;
}

export const AllInScene: React.FC<AllInSceneProps> = ({
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

    // AllIn(#Selected, [0, 1, 2]) -> 蒸箱(0)、烤箱(1)、洗碗机(2)
    const isAllIn = val1 === 7;
    const hasSteam = Boolean(val1 & 1);
    const hasOven = Boolean(val1 & 2);
    const hasDishwasher = Boolean(val1 & 4);
    return (
      <group position={[0, -0.2, 0]}>
        {/* 地柜台面 */}
        <mesh position={[0, 0.8, 0]}>
          <boxGeometry args={[2.7, 0.08, 1.2]} />
          <meshStandardMaterial color="#e2e8f0" roughness={0.1} metalness={0.2} />
        </mesh>
        {/* 蒸箱柜位 */}
        <group position={[-0.85, 0.05, 0]}>
          <mesh>
            <boxGeometry args={[0.75, 1.3, 1.05]} />
            <meshStandardMaterial color={hasSteam ? '#0284c7' : '#f8fafc'} metalness={hasSteam ? 0.7 : 0.1} />
          </mesh>
          {hasSteam && (
            <mesh position={[0, 0, 0.54]}>
              <boxGeometry args={[0.65, 0.4, 0.02]} />
              <meshStandardMaterial color="#38bdf8" roughness={0.1} />
            </mesh>
          )}
        </group>
        {/* 烤箱柜位 */}
        <group position={[0, 0.05, 0]}>
          <mesh>
            <boxGeometry args={[0.75, 1.3, 1.05]} />
            <meshStandardMaterial color={hasOven ? '#0369a1' : '#f8fafc'} metalness={hasOven ? 0.7 : 0.1} />
          </mesh>
          {hasOven && (
            <mesh position={[0, 0, 0.54]}>
              <boxGeometry args={[0.65, 0.5, 0.02]} />
              <meshStandardMaterial color="#0ea5e9" roughness={0.1} />
            </mesh>
          )}
        </group>
        {/* 洗碗机柜位 */}
        <group position={[0.85, 0.05, 0]}>
          <mesh>
            <boxGeometry args={[0.75, 1.3, 1.05]} />
            <meshStandardMaterial color={hasDishwasher ? '#075985' : '#f8fafc'} metalness={hasDishwasher ? 0.7 : 0.1} />
          </mesh>
          {hasDishwasher && (
            <mesh position={[0, 0, 0.54]}>
              <boxGeometry args={[0.65, 0.9, 0.02]} />
              <meshStandardMaterial color="#7dd3fc" roughness={0.1} />
            </mesh>
          )}
        </group>
        {/* 底部重载钢结构托梁：当三件套全部被选中(掩码=7)时，双倍加固底梁降临 */}
        <mesh position={[0, -0.72, 0]}>
          <boxGeometry args={[2.65, isAllIn ? 0.22 : 0.06, 1.08]} />
          <meshStandardMaterial
            color={isAllIn ? '#0284c7' : '#94a3b8'}
            metalness={isAllIn ? 0.9 : 0.2}
            roughness={0.2}
          />
        </mesh>
        {/* 4只工业承重脚 */}
        {[-1.15, 1.15].map((x, i) =>
          [-0.45, 0.45].map((z, j) => (
            <mesh key={} position={[x, -0.9, z]}>
              <cylinderGeometry args={[0.04, 0.06, 0.2, 16]} />
              <meshStandardMaterial color="#334155" metalness={0.8} />
            </mesh>
          ))
        )}
      </group>
    );
      }}
    />
  );
};
