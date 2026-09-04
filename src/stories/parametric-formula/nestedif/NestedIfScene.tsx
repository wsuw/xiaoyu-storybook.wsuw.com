import React from 'react';
import { FormulaLayout } from '../FormulaLayout';
import { FORMULA_STORIES } from '../FormulaStoryData';

const storyData = FORMULA_STORIES.find((s) => s.id === 'nestedif')!;

export interface NestedIfSceneProps {
  mode?: 'definition' | 'story';
  val1?: number;
  val2?: number;
  onParam1Change?: (v: number) => void;
  onParam2Change?: (v: number) => void;
}

export const NestedIfScene: React.FC<NestedIfSceneProps> = ({
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

    // nestedif(#D<=350, 250, #D<=400, 300, 350)
    // 阶梯五金托架与立柱挂通
    const depth = val1 / 300;
    let bracketLen = 250 / 300;
    let tierName = '250型轻便托架';
    let tierColor = '#a78bfa';
    if (val1 <= 350) {
      bracketLen = 250 / 300;
      tierColor = '#a78bfa';
    } else if (val1 <= 400) {
      bracketLen = 300 / 300;
      tierColor = '#8b5cf6';
    } else {
      bracketLen = 350 / 300;
      tierColor = '#6d28d9';
    }
    return (
      <group position={[0, -0.2, 0]}>
        {/* 后侧墙面安装背板 */}
        <mesh position={[0, 0.4, -depth / 2]}>
          <boxGeometry args={[2.0, 1.8, 0.05]} />
          <meshStandardMaterial color="#f1f5f9" />
        </mesh>
        {/* 柜体侧截面轮廓虚线盒 */}
        <mesh position={[0, 0.4, 0]}>
          <boxGeometry args={[1.9, 1.7, depth]} />
          <meshStandardMaterial color="#cbd5e1" wireframe transparent opacity={0.35} />
        </mesh>
        {/* 左右两侧重载金属滑动法兰托架 */}
        {[-0.8, 0.8].map((x, idx) => (
          <group key={idx} position={[x, 0.4, -depth / 2 + bracketLen / 2]}>
            {/* 托臂 */}
            <mesh>
              <boxGeometry args={[0.05, 0.08, bracketLen]} />
              <meshStandardMaterial color={tierColor} metalness={0.8} roughness={0.15} />
            </mesh>
            {/* 挂孔环 */}
            <mesh position={[0, 0.08, bracketLen / 2 - 0.05]}>
              <cylinderGeometry args={[0.04, 0.04, 0.06, 16]} />
              <meshStandardMaterial color="#e2e8f0" metalness={0.9} />
            </mesh>
          </group>
        ))}
        {/* 横向挂衣铝合金通管 */}
        <mesh position={[0, 0.48, -depth / 2 + bracketLen - 0.05]}>
          <cylinderGeometry args={[0.03, 0.03, 1.65, 32]} rotation={[0, 0, Math.PI / 2]} />
          <meshStandardMaterial color="#e2e8f0" metalness={0.9} roughness={0.1} />
        </mesh>
      </group>
    );
      }}
    />
  );
};
