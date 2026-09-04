import React from 'react';
import { FormulaLayout } from '../FormulaLayout';
import { FORMULA_STORIES } from '../FormulaStoryData';

const storyData = FORMULA_STORIES.find((s) => s.id === 'tan')!;

export interface TanSceneProps {
  mode?: 'definition' | 'story';
  val1?: number;
  val2?: number;
  onParam1Change?: (v: number) => void;
  onParam2Change?: (v: number) => void;
}

export const TanScene: React.FC<TanSceneProps> = ({
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

    // ΔH = Depth * tan(#RoofAngle)
    const angleRad = (val1 * Math.PI) / 180;
    const tanSlope = Math.tan(angleRad);
    return (
      <group position={[0, -0.2, 0]}>
        {/* 倾斜的阁楼天花板 */}
        <mesh position={[0, 0.9, 0]} rotation={[0, 0, -angleRad]}>
          <boxGeometry args={[2.5, 0.05, 1.2]} />
          <meshStandardMaterial color="#f97316" transparent opacity={0.6} />
        </mesh>
        {/* 削顶竖立板序列 */}
        {[-0.6, -0.2, 0.2, 0.6].map((x, idx) => {
          const deltaH = (x + 0.8) * tanSlope;
          const h = Math.max(0.4, 1.6 - deltaH);
          return (
            <mesh key={idx} position={[x, -0.7 + h / 2, 0]}>
              <boxGeometry args={[0.08, h, 0.9]} />
              <meshStandardMaterial color="#c2410c" metalness={0.3} />
            </mesh>
          );
        })}
      </group>
    );
      }}
    />
  );
};
