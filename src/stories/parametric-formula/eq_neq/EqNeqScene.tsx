import React from 'react';
import { FormulaLayout } from '../FormulaLayout';
import { FORMULA_STORIES } from '../FormulaStoryData';

const storyData = FORMULA_STORIES.find((s) => s.id === 'eq_neq')!;

export interface EqNeqSceneProps {
  mode?: 'definition' | 'story';
  val1?: number;
  val2?: number;
  onParam1Change?: (v: number) => void;
  onParam2Change?: (v: number) => void;
}

export const EqNeqScene: React.FC<EqNeqSceneProps> = ({
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

    // #DoorType == 1
    const isGlass = val1 === 1;
    return (
      <group position={[0, -0.1, 0]}>
        {/* 柜体 */}
        <mesh position={[0, 0.2, -0.3]}>
          <boxGeometry args={[1.6, 2.0, 0.6]} />
          <meshStandardMaterial color="#1e293b" roughness={0.4} />
        </mesh>
        {/* 门板：实木与高透玻璃切换 */}
        <mesh position={[0, 0.2, 0.02]}>
          <boxGeometry args={[1.56, 1.96, 0.04]} />
          <meshStandardMaterial
            color={isGlass ? '#ec4899' : '#d97706'}
            transparent
            opacity={isGlass ? 0.35 : 0.95}
            roughness={isGlass ? 0.05 : 0.7}
            metalness={isGlass ? 0.9 : 0.1}
          />
        </mesh>
        {/* 铝合金极窄边框 */}
        {isGlass && (
          <mesh position={[0, 0.2, 0.04]}>
            <boxGeometry args={[1.58, 1.98, 0.02]} />
            <meshStandardMaterial color="#f472b6" wireframe />
          </mesh>
        )}
      </group>
    );
      }}
    />
  );
};
