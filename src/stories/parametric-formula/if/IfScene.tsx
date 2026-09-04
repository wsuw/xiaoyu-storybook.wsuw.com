import React from 'react';
import { FormulaLayout } from '../FormulaLayout';
import { FORMULA_STORIES } from '../FormulaStoryData';

const storyData = FORMULA_STORIES.find((s) => s.id === 'if')!;

export interface IfSceneProps {
  mode?: 'definition' | 'story';
  val1?: number;
  val2?: number;
  onParam1Change?: (v: number) => void;
  onParam2Change?: (v: number) => void;
}

export const IfScene: React.FC<IfSceneProps> = ({
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

    // if(#W < 500, 350, 450)
    // 真实玄关柜：双门框体 + 底部自适应抽屉 + 顶部装饰线条
    const w = val1 / 400; // 柜体宽
    const drawerDepth = val1 < 500 ? 350 / 300 : 450 / 300;
    const isNarrow = val1 < 500;
    return (
      <group position={[0, -0.3, 0]}>
        {/* 玄关顶板 */}
        <mesh position={[0, 1.25, 0]}>
          <boxGeometry args={[w + 0.1, 0.06, 1.3]} />
          <meshStandardMaterial color="#475569" roughness={0.3} />
        </mesh>
        {/* 柜体侧板 */}
        <mesh position={[-w / 2, 0.2, 0]}>
          <boxGeometry args={[0.04, 2.0, 1.2]} />
          <meshStandardMaterial color="#64748b" roughness={0.4} />
        </mesh>
        <mesh position={[w / 2, 0.2, 0]}>
          <boxGeometry args={[0.04, 2.0, 1.2]} />
          <meshStandardMaterial color="#64748b" roughness={0.4} />
        </mesh>
        {/* 柜体背板 */}
        <mesh position={[0, 0.2, -0.58]}>
          <boxGeometry args={[w, 2.0, 0.02]} />
          <meshStandardMaterial color="#cbd5e1" />
        </mesh>
        {/* 上层双开悬挂区横杆 */}
        <mesh position={[0, 0.9, 0]}>
          <cylinderGeometry args={[0.02, 0.02, w * 0.95, 16]} rotation={[0, 0, Math.PI / 2]} />
          <meshStandardMaterial color="#e2e8f0" metalness={0.8} roughness={0.2} />
        </mesh>
        {/* 下方自适应抽屉：抽屉随公式深度前后智能推拉 */}
        <group position={[0, -0.45, (drawerDepth * 0.5) - 0.45]}>
          <mesh>
            <boxGeometry args={[w * 0.92, 0.5, drawerDepth]} />
            <meshStandardMaterial
              color={isNarrow ? '#6366f1' : '#4338ca'}
              metalness={0.3}
              roughness={0.2}
            />
          </mesh>
          {/* 金属抽屉拉手 */}
          <mesh position={[0, 0, drawerDepth / 2 + 0.03]}>
            <boxGeometry args={[0.16, 0.02, 0.03]} />
            <meshStandardMaterial color="#f8fafc" metalness={0.9} roughness={0.1} />
          </mesh>
        </group>
        {/* 地面踢脚板 */}
        <mesh position={[0, -0.78, 0]}>
          <boxGeometry args={[w, 0.12, 1.15]} />
          <meshStandardMaterial color="#334155" />
        </mesh>
      </group>
    );
      }}
    />
  );
};
