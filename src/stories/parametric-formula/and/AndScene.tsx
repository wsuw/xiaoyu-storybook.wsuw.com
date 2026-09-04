import React from 'react';
import { FormulaLayout } from '../FormulaLayout';
import { FORMULA_STORIES } from '../FormulaStoryData';

const storyData = FORMULA_STORIES.find((s) => s.id === 'and')!;

export interface AndSceneProps {
  mode?: 'definition' | 'story';
  val1?: number;
  val2?: number;
  onParam1Change?: (v: number) => void;
  onParam2Change?: (v: number) => void;
}

export const AndScene: React.FC<AndSceneProps> = ({
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

    // #W > 600 and #D > 380
    const w = val1 / 350;
    const d = val2 / 300;
    const isRisk = val1 > 600 && val2 > 380;
    return (
      <group position={[0, -0.2, 0]}>
        {/* 柜体框架 */}
        <mesh position={[0, 0.3, 0]}>
          <boxGeometry args={[w, 2.0, d]} />
          <meshStandardMaterial color="#cbd5e1" wireframe transparent opacity={0.35} />
        </mesh>
        {/* 顶部与底部横梁板 */}
        {[-0.65, 0.65, 1.25].map((y, idx) => (
          <mesh key={idx} position={[0, y, 0]}>
            <boxGeometry args={[w * 0.98, 0.06, d * 0.95]} />
            <meshStandardMaterial color="#f59e0b" metalness={0.3} roughness={0.3} />
          </mesh>
        ))}
        {/* 中央防弯竖隔板：只有宽超标且深超标，双条件同时触发时出现 */}
        {isRisk && (
          <group position={[0, 0.3, 0]}>
            <mesh>
              <boxGeometry args={[0.06, 1.8, d * 0.92]} />
              <meshStandardMaterial color="#d97706" metalness={0.6} roughness={0.2} />
            </mesh>
            {/* 紧固角码 */}
            {[-0.5, 0.5].map((y, i) => (
              <mesh key={i} position={[0.05, y, 0]}>
                <boxGeometry args={[0.04, 0.04, 0.08]} />
                <meshStandardMaterial color="#78350f" metalness={0.9} />
              </mesh>
            ))}
          </group>
        )}
      </group>
    );
      }}
    />
  );
};
