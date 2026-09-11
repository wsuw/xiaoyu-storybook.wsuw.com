import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, ContactShadows } from '@react-three/drei';

export interface BoolAtStorySceneProps {
  hasHanger?: boolean;
  hasJewelry?: boolean;
  hasGlass?: boolean;
}

/**
 * 现代高定衣帽间整体模型
 */
const BoolAtClosetMesh: React.FC<BoolAtStorySceneProps> = ({
  hasHanger = true,
  hasJewelry = true,
  hasGlass = true,
}) => {
  // 判定是否严格全配齐豪华三件套 BoolAt(#Modules, [1, 2, 3])
  const isAllExactMatch = Boolean(hasHanger && hasJewelry && hasGlass);

  // 尺寸定义：宽 3.0 米，高 2.5 米，深 0.65 米的豪华尺度
  const cabinetW = 3.0;
  const cabinetH = 2.5;
  const cabinetD = 0.65;
  const boardThick = 0.036;
  const colW = (cabinetW - boardThick * 4) / 3; // 约 0.95m 每单元

  // 高端配色系统（明亮雅致暖调）
  const cabinetWoodColor = '#ede4d8'; // 浅暖杏白木纹
  const cabinetAccentColor = '#dfd3c3'; // 柔沙暖灰收边
  const backboardColor = '#f6f2eb'; // 浅米细布纹背板
  const metalGoldColor = isAllExactMatch ? '#f59e0b' : '#cbd5e1'; // 香槟金 / 基础铝灰

  return (
    <group position={[0, -0.15, 0]}>
      {/* ================= 1. 柜体基础外框 (顶板、底板、左右侧板、背板) ================= */}
      {/* 顶板 */}
      <mesh position={[0, cabinetH / 2 - boardThick / 2, 0]}>
        <boxGeometry args={[cabinetW, boardThick, cabinetD]} />
        <meshStandardMaterial color={cabinetWoodColor} roughness={0.3} />
      </mesh>
      {/* 底板 */}
      <mesh position={[0, -cabinetH / 2 + boardThick / 2, 0]}>
        <boxGeometry args={[cabinetW, boardThick, cabinetD]} />
        <meshStandardMaterial color={cabinetWoodColor} roughness={0.3} />
      </mesh>
      {/* 左侧外立板 */}
      <mesh position={[-cabinetW / 2 + boardThick / 2, 0, 0]}>
        <boxGeometry args={[boardThick, cabinetH, cabinetD]} />
        <meshStandardMaterial color={cabinetAccentColor} roughness={0.35} />
      </mesh>
      {/* 右侧外立板 */}
      <mesh position={[cabinetW / 2 - boardThick / 2, 0, 0]}>
        <boxGeometry args={[boardThick, cabinetH, cabinetD]} />
        <meshStandardMaterial color={cabinetAccentColor} roughness={0.35} />
      </mesh>
      {/* 大幅温润浅米布纹背板 */}
      <mesh position={[0, 0, -cabinetD / 2 + 0.01]}>
        <boxGeometry args={[cabinetW - boardThick * 2, cabinetH - boardThick * 2, 0.018]} />
        <meshStandardMaterial color={backboardColor} roughness={0.5} />
      </mesh>

      {/* 两根中间分腔立板 */}
      {[-colW / 2 - boardThick / 2, colW / 2 + boardThick / 2].map((x, i) => (
        <group key={`col-${i}`} position={[x, 0, 0]}>
          <mesh>
            <boxGeometry args={[boardThick, cabinetH - boardThick * 2, cabinetD - 0.02]} />
            <meshStandardMaterial color={cabinetWoodColor} roughness={0.3} />
          </mesh>
          {/* 套餐激活独享：中立柱前沿奢华拉丝金属封边型材 */}
          {isAllExactMatch && (
            <mesh position={[0, 0, cabinetD / 2 - 0.005]}>
              <boxGeometry args={[boardThick + 0.008, cabinetH - boardThick * 2, 0.015]} />
              <meshStandardMaterial color="#f59e0b" metalness={0.85} roughness={0.2} />
            </mesh>
          )}
        </group>
      ))}

      {/* ================= 2. 模块 1：左侧【豪华长大衣挂衣区】 ================= */}
      <group position={[-colW - boardThick, 0, 0]}>
        {hasHanger ? (
          <>
            {/* 上部顶帽收纳层板 */}
            <mesh position={[0, 0.85, 0]}>
              <boxGeometry args={[colW, boardThick, cabinetD - 0.04]} />
              <meshStandardMaterial color={cabinetWoodColor} roughness={0.3} />
            </mesh>
            {/* 顶帽层上的高档皮质收纳箱 */}
            <group position={[0, 0.98, 0]}>
              <mesh>
                <boxGeometry args={[colW * 0.6, 0.22, cabinetD * 0.6]} />
                <meshStandardMaterial color="#d4b896" roughness={0.6} />
              </mesh>
              {/* 收纳箱金属提手 */}
              <mesh position={[0, 0, cabinetD * 0.3 + 0.01]}>
                <boxGeometry args={[0.08, 0.02, 0.01]} />
                <meshStandardMaterial color="#b45309" metalness={0.9} roughness={0.2} />
              </mesh>
            </group>

            {/* 真正的横向贯通香槟金金属挂衣杆 */}
            <group position={[0, 0.72, 0]}>
              {/* 两端固定五金法兰座 */}
              <mesh position={[-colW / 2 + 0.015, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
                <cylinderGeometry args={[0.03, 0.03, 0.02, 24]} />
                <meshStandardMaterial color={metalGoldColor} metalness={0.9} roughness={0.15} />
              </mesh>
              <mesh position={[colW / 2 - 0.015, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
                <cylinderGeometry args={[0.03, 0.03, 0.02, 24]} />
                <meshStandardMaterial color={metalGoldColor} metalness={0.9} roughness={0.15} />
              </mesh>
              {/* 横向挂衣杆本体 (严格水平沿 X 轴) */}
              <mesh rotation={[0, 0, Math.PI / 2]}>
                <cylinderGeometry args={[0.016, 0.016, colW - 0.03, 24]} />
                <meshStandardMaterial color={metalGoldColor} metalness={0.9} roughness={0.15} />
              </mesh>
            </group>

            {/* 挂衣杆上悬挂的 3 件立体大衣/西装与木质衣架 */}
            {/* 衣物 A：优雅驼色双排扣羊绒长大衣 */}
            <group position={[-colW * 0.25, 0.15, 0]}>
              {/* 金属衣钩 */}
              <mesh position={[0, 0.54, 0]}>
                <torusGeometry args={[0.025, 0.004, 12, 24, Math.PI * 1.3]} />
                <meshStandardMaterial color="#f59e0b" metalness={0.9} roughness={0.15} />
              </mesh>
              {/* 原木衣架肩架 */}
              <mesh position={[0, 0.5, 0]} rotation={[0, 0, 0]}>
                <boxGeometry args={[0.42, 0.022, 0.03]} />
                <meshStandardMaterial color="#c29b74" roughness={0.5} />
              </mesh>
              {/* 大衣主体 (饱满立体垂坠) */}
              <mesh position={[0, -0.05, 0]}>
                <boxGeometry args={[0.38, 1.05, 0.14]} />
                <meshStandardMaterial color="#b98d68" roughness={0.8} />
              </mesh>
              {/* 大衣驳领折痕 */}
              <mesh position={[0, 0.28, 0.075]}>
                <boxGeometry args={[0.22, 0.35, 0.015]} />
                <meshStandardMaterial color="#a77b56" roughness={0.7} />
              </mesh>
            </group>

            {/* 衣物 B：精致藏青色剪裁西装 */}
            <group position={[colW * 0.05, 0.28, 0]}>
              <mesh position={[0, 0.41, 0]}>
                <torusGeometry args={[0.025, 0.004, 12, 24, Math.PI * 1.3]} />
                <meshStandardMaterial color="#f59e0b" metalness={0.9} roughness={0.15} />
              </mesh>
              <mesh position={[0, 0.37, 0]}>
                <boxGeometry args={[0.4, 0.022, 0.03]} />
                <meshStandardMaterial color="#c29b74" roughness={0.5} />
              </mesh>
              <mesh position={[0, 0.0, 0]}>
                <boxGeometry args={[0.36, 0.72, 0.12]} />
                <meshStandardMaterial color="#1e293b" roughness={0.75} />
              </mesh>
              {/* 西装白衬衫露出小领口 */}
              <mesh position={[0, 0.26, 0.065]}>
                <boxGeometry args={[0.1, 0.12, 0.01]} />
                <meshStandardMaterial color="#f8fafc" roughness={0.4} />
              </mesh>
            </group>

            {/* 衣物 C：米白优雅轻风衣 */}
            <group position={[colW * 0.3, 0.2, 0]}>
              <mesh position={[0, 0.49, 0]}>
                <torusGeometry args={[0.025, 0.004, 12, 24, Math.PI * 1.3]} />
                <meshStandardMaterial color="#f59e0b" metalness={0.9} roughness={0.15} />
              </mesh>
              <mesh position={[0, 0.45, 0]}>
                <boxGeometry args={[0.38, 0.022, 0.03]} />
                <meshStandardMaterial color="#c29b74" roughness={0.5} />
              </mesh>
              <mesh position={[0, 0.02, 0]}>
                <boxGeometry args={[0.34, 0.84, 0.1]} />
                <meshStandardMaterial color="#e5e0d8" roughness={0.85} />
              </mesh>
            </group>

            {/* 挂衣区底部：高档软包置鞋置物台面 */}
            <mesh position={[0, -0.92, 0]}>
              <boxGeometry args={[colW, boardThick, cabinetD - 0.04]} />
              <meshStandardMaterial color={cabinetWoodColor} roughness={0.3} />
            </mesh>
            {/* 底部摆放的高级手提小鞋包 */}
            <mesh position={[0, -0.79, 0.04]}>
              <boxGeometry args={[0.32, 0.18, 0.26]} />
              <meshStandardMaterial color="#78350f" roughness={0.5} />
            </mesh>
          </>
        ) : (
          /* 未选配模块 1 时：退化为普通空架光板 */
          <>
            {[-0.6, 0, 0.6].map((y, i) => (
              <mesh key={`hanger-empty-${i}`} position={[0, y, 0]}>
                <boxGeometry args={[colW, boardThick, cabinetD - 0.05]} />
                <meshStandardMaterial color="#cbd5e1" roughness={0.5} />
              </mesh>
            ))}
            <mesh position={[0, -0.1, 0]}>
              <boxGeometry args={[colW - 0.04, cabinetH - boardThick * 2 - 0.1, cabinetD - 0.08]} />
              <meshStandardMaterial color="#94a3b8" transparent opacity={0.15} wireframe />
            </mesh>
          </>
        )}
      </group>

      {/* ================= 3. 模块 2：中间【叠衣区 + 奢华双层丝绒手表首饰抽 + 悬挂裤架】 ================= */}
      <group position={[0, 0, 0]}>
        {hasJewelry ? (
          <>
            {/* 上部：两层开放叠放层板 */}
            <mesh position={[0, 0.85, 0]}>
              <boxGeometry args={[colW, boardThick, cabinetD - 0.04]} />
              <meshStandardMaterial color={cabinetWoodColor} roughness={0.3} />
            </mesh>
            <mesh position={[0, 0.45, 0]}>
              <boxGeometry args={[colW, boardThick, cabinetD - 0.04]} />
              <meshStandardMaterial color={cabinetWoodColor} roughness={0.3} />
            </mesh>
            {/* 叠放整齐的羊绒衣物模型 */}
            <group position={[-colW * 0.2, 0.54, 0.02]}>
              <mesh position={[0, 0, 0]}>
                <boxGeometry args={[0.32, 0.09, 0.38]} />
                <meshStandardMaterial color="#d1d5db" roughness={0.8} />
              </mesh>
              <mesh position={[0, 0.07, 0]}>
                <boxGeometry args={[0.3, 0.07, 0.36]} />
                <meshStandardMaterial color="#f3f4f6" roughness={0.8} />
              </mesh>
            </group>
            <group position={[colW * 0.2, 0.54, 0.02]}>
              <mesh position={[0, 0, 0]}>
                <boxGeometry args={[0.3, 0.08, 0.38]} />
                <meshStandardMaterial color="#e0a96d" roughness={0.8} />
              </mesh>
              <mesh position={[0, 0.07, 0]}>
                <boxGeometry args={[0.28, 0.06, 0.36]} />
                <meshStandardMaterial color="#9ca3af" roughness={0.8} />
              </mesh>
            </group>

            {/* 核心亮点：奢华双层首饰多宝格大抽屉（向外微拉 16cm 呈现内胆） */}
            <group position={[0, 0.05, 0.16]}>
              {/* 抽屉外壳 (高级哑光暖灰烤漆) */}
              <mesh>
                <boxGeometry args={[colW * 0.96, 0.22, cabinetD * 0.78]} />
                <meshStandardMaterial color="#f1f5f9" roughness={0.25} />
              </mesh>
              {/* 抽屉正面香槟金极简反弹斜边拉手 */}
              <mesh position={[0, -0.09, cabinetD * 0.39 + 0.005]}>
                <boxGeometry args={[colW * 0.4, 0.015, 0.01]} />
                <meshStandardMaterial color="#f59e0b" metalness={0.9} roughness={0.15} />
              </mesh>

              {/* 抽屉顶部高透钢化玻璃盖板 */}
              <mesh position={[0, 0.115, 0]}>
                <boxGeometry args={[colW * 0.94, 0.008, cabinetD * 0.76]} />
                <meshStandardMaterial color="#bae6fd" transparent opacity={0.35} roughness={0.05} />
              </mesh>

              {/* 内部爱马仕橙奢华丝绒多宝格底衬 */}
              <mesh position={[0, 0.02, 0]}>
                <boxGeometry args={[colW * 0.92, 0.04, cabinetD * 0.72]} />
                <meshStandardMaterial color="#ea580c" roughness={0.65} />
              </mesh>

              {/* 多宝格网格隔条 */}
              {[-0.26, -0.08, 0.08, 0.26].map((x, i) => (
                <mesh key={`grid-x-${i}`} position={[x, 0.05, 0]}>
                  <boxGeometry args={[0.01, 0.06, cabinetD * 0.7]} />
                  <meshStandardMaterial color="#c2410c" roughness={0.5} />
                </mesh>
              ))}
              {[-0.12, 0.12].map((z, i) => (
                <mesh key={`grid-z-${i}`} position={[0, 0.05, z]}>
                  <boxGeometry args={[colW * 0.88, 0.06, 0.01]} />
                  <meshStandardMaterial color="#c2410c" roughness={0.5} />
                </mesh>
              ))}

              {/* 格子内部陈列：高档腕表表枕与珠宝收纳小盒 */}
              <group position={[-0.17, 0.065, 0]}>
                <mesh rotation={[Math.PI / 6, 0, 0]}>
                  <cylinderGeometry args={[0.035, 0.035, 0.06, 16]} />
                  <meshStandardMaterial color="#1e293b" roughness={0.6} />
                </mesh>
                <mesh position={[0, 0.036, 0]}>
                  <boxGeometry args={[0.04, 0.015, 0.04]} />
                  <meshStandardMaterial color="#f59e0b" metalness={0.95} roughness={0.1} />
                </mesh>
              </group>
              <group position={[0.17, 0.065, 0]}>
                <mesh>
                  <boxGeometry args={[0.09, 0.04, 0.09]} />
                  <meshStandardMaterial color="#475569" roughness={0.4} />
                </mesh>
                <mesh position={[0, 0.025, 0]}>
                  <sphereGeometry args={[0.018, 16, 16]} />
                  <meshStandardMaterial color="#e0e7ff" metalness={0.3} roughness={0.1} />
                </mesh>
              </group>
            </group>

            {/* 抽屉下方固定隔板 */}
            <mesh position={[0, -0.15, 0]}>
              <boxGeometry args={[colW, boardThick, cabinetD - 0.04]} />
              <meshStandardMaterial color={cabinetWoodColor} roughness={0.3} />
            </mesh>

            {/* 下部：高定推拉式西裤架区域 */}
            <group position={[0, -0.48, 0]}>
              {/* 4 根金属西裤防滑横杆 */}
              {[-0.14, -0.04, 0.06, 0.16].map((z, i) => (
                <group key={`pants-${i}`} position={[0, 0, z]}>
                  <mesh rotation={[0, 0, Math.PI / 2]}>
                    <cylinderGeometry args={[0.01, 0.01, colW * 0.88, 16]} />
                    <meshStandardMaterial color="#64748b" metalness={0.8} roughness={0.2} />
                  </mesh>
                  {/* 搭挂整齐的深色西裤 */}
                  <mesh position={[0, -0.18, 0]}>
                    <boxGeometry args={[colW * 0.75, 0.36, 0.02]} />
                    <meshStandardMaterial
                      color={i % 2 === 0 ? '#334155' : '#475569'}
                      roughness={0.7}
                    />
                  </mesh>
                </group>
              ))}
            </group>

            {/* 底部备用收纳层板 */}
            <mesh position={[0, -0.92, 0]}>
              <boxGeometry args={[colW, boardThick, cabinetD - 0.04]} />
              <meshStandardMaterial color={cabinetWoodColor} roughness={0.3} />
            </mesh>
          </>
        ) : (
          /* 未选配模块 2：退化为单调普通木抽屉 */
          <>
            {[-0.6, 0.2, 0.6].map((y, i) => (
              <mesh key={`jew-empty-${i}`} position={[0, y, 0]}>
                <boxGeometry args={[colW, boardThick, cabinetD - 0.05]} />
                <meshStandardMaterial color="#cbd5e1" roughness={0.5} />
              </mesh>
            ))}
            <mesh position={[0, -0.2, 0]}>
              <boxGeometry args={[colW * 0.94, 0.35, cabinetD * 0.8]} />
              <meshStandardMaterial color="#94a3b8" roughness={0.4} />
            </mesh>
          </>
        )}
      </group>

      {/* ================= 4. 模块 3：右侧【极窄黑钛茶玻智能展示高柜】 ================= */}
      <group position={[colW + boardThick, 0, 0]}>
        {hasGlass ? (
          <>
            {/* 柜内 4 层悬浮玻璃层板 */}
            {[-0.65, -0.2, 0.25, 0.72].map((y, i) => (
              <mesh key={`glass-shelf-${i}`} position={[0, y, 0]}>
                <boxGeometry args={[colW, 0.015, cabinetD - 0.06]} />
                <meshStandardMaterial
                  color="#e0f2fe"
                  transparent
                  opacity={0.65}
                  roughness={0.1}
                />
              </mesh>
            ))}

            {/* 玻璃展柜内的高价值陈列品 */}
            {/* 第 3 层陈列：轻奢高定女士真皮手提包 */}
            <group position={[0, 0.42, 0.05]}>
              {/* 包身 */}
              <mesh>
                <boxGeometry args={[0.28, 0.24, 0.15]} />
                <meshStandardMaterial color="#991b1b" roughness={0.4} />
              </mesh>
              {/* 手提包正面金属搭扣 */}
              <mesh position={[0, 0.03, 0.078]}>
                <boxGeometry args={[0.036, 0.036, 0.01]} />
                <meshStandardMaterial color="#f59e0b" metalness={0.95} roughness={0.1} />
              </mesh>
              {/* 提手与包顶接合处的两颗香槟金金属卡扣 */}
              {[-0.072, 0.072].map((x, i) => (
                <mesh key={`d-ring-${i}`} position={[x, 0.12, 0]}>
                  <boxGeometry args={[0.022, 0.014, 0.024]} />
                  <meshStandardMaterial color="#f59e0b" metalness={0.95} roughness={0.1} />
                </mesh>
              ))}
              {/* 手挽提带 (底脚精准深入包顶，消除悬空) */}
              <mesh position={[0, 0.105, 0]}>
                <torusGeometry args={[0.075, 0.011, 16, 24, Math.PI]} />
                <meshStandardMaterial color="#7f1d1d" roughness={0.4} />
              </mesh>
            </group>

            {/* 第 2 层陈列：水晶香水瓶与香氛礼盒 */}
            <group position={[-colW * 0.15, -0.06, 0.05]}>
              <mesh>
                <boxGeometry args={[0.1, 0.14, 0.06]} />
                <meshStandardMaterial color="#fef08a" transparent opacity={0.7} roughness={0.1} />
              </mesh>
              {/* 金色瓶盖 */}
              <mesh position={[0, 0.09, 0]}>
                <cylinderGeometry args={[0.018, 0.018, 0.04, 16]} />
                <meshStandardMaterial color="#f59e0b" metalness={0.95} roughness={0.1} />
              </mesh>
            </group>
            <group position={[colW * 0.18, -0.07, 0.05]}>
              <mesh>
                <boxGeometry args={[0.16, 0.18, 0.14]} />
                <meshStandardMaterial color="#1e293b" roughness={0.5} />
              </mesh>
            </group>

            {/* 第 1 层陈列：名贵手袋/收纳礼盒 */}
            <group position={[0, -0.5, 0.05]}>
              <mesh>
                <boxGeometry args={[0.34, 0.2, 0.24]} />
                <meshStandardMaterial color="#e2d8cc" roughness={0.4} />
              </mesh>
              {/* 丝带装饰 */}
              <mesh position={[0, 0.005, 0]}>
                <boxGeometry args={[0.345, 0.02, 0.245]} />
                <meshStandardMaterial color="#b45309" roughness={0.3} />
              </mesh>
            </group>

            {/* 核心亮点：铝合金极窄边框茶色玻璃门（优雅半开 28 度，展示高透与开合灵动） */}
            <group position={[-colW / 2 + 0.01, 0, cabinetD / 2]}>
              <group rotation={[0, -0.48, 0]}>
                {/* 茶色半透防爆玻璃面（通透、高雅、不黑压压） */}
                <mesh position={[colW / 2, 0, 0.01]}>
                  <boxGeometry args={[colW - 0.03, cabinetH - boardThick * 2 - 0.02, 0.012]} />
                  <meshStandardMaterial
                    color="#b45309"
                    transparent
                    opacity={0.28}
                    roughness={0.05}
                    metalness={0.6}
                  />
                </mesh>

                {/* 极窄钛黑铝合金外框四周型材 */}
                <mesh position={[colW / 2, (cabinetH - boardThick * 2) / 2 - 0.01, 0.01]}>
                  <boxGeometry args={[colW - 0.02, 0.02, 0.02]} />
                  <meshStandardMaterial color="#1e293b" metalness={0.8} roughness={0.3} />
                </mesh>
                <mesh position={[colW / 2, -(cabinetH - boardThick * 2) / 2 + 0.01, 0.01]}>
                  <boxGeometry args={[colW - 0.02, 0.02, 0.02]} />
                  <meshStandardMaterial color="#1e293b" metalness={0.8} roughness={0.3} />
                </mesh>
                <mesh position={[0.01, 0, 0.01]}>
                  <boxGeometry args={[0.02, cabinetH - boardThick * 2 - 0.02, 0.02]} />
                  <meshStandardMaterial color="#1e293b" metalness={0.8} roughness={0.3} />
                </mesh>
                <mesh position={[colW - 0.02, 0, 0.01]}>
                  <boxGeometry args={[0.02, cabinetH - boardThick * 2 - 0.02, 0.02]} />
                  <meshStandardMaterial color="#1e293b" metalness={0.8} roughness={0.3} />
                </mesh>

                {/* 现代极简通长香槟金长把手 */}
                <mesh position={[colW - 0.04, 0, 0.03]}>
                  <boxGeometry args={[0.016, 1.2, 0.024]} />
                  <meshStandardMaterial color="#f59e0b" metalness={0.92} roughness={0.15} />
                </mesh>
              </group>
            </group>
          </>
        ) : (
          /* 未选配模块 3：退化为最普通的封闭木门板（平平无奇） */
          <group position={[0, 0, cabinetD / 2 - 0.01]}>
            <mesh>
              <boxGeometry args={[colW - 0.01, cabinetH - boardThick * 2 - 0.02, 0.022]} />
              <meshStandardMaterial color="#cbd5e1" roughness={0.6} />
            </mesh>
            {/* 普通银色短拉手 */}
            <mesh position={[colW / 2 - 0.06, 0, 0.02]}>
              <boxGeometry args={[0.016, 0.16, 0.02]} />
              <meshStandardMaterial color="#94a3b8" metalness={0.5} roughness={0.3} />
            </mesh>
          </group>
        )}
      </group>

      {/* ================= 5. 套餐三件套全配齐豪华激活：【全室内嵌智能线性光幕系统】 ================= */}
      {isAllExactMatch && (
        <group>
          {/* ① 顶部贯通式 3000K 隐形暖金洗墙主灯带 */}
          <mesh position={[0, cabinetH / 2 - boardThick - 0.01, cabinetD / 2 - 0.04]}>
            <boxGeometry args={[cabinetW - boardThick * 2, 0.016, 0.025]} />
            <meshStandardMaterial
              color="#fbbf24"
              emissive="#f59e0b"
              emissiveIntensity={2.8}
              roughness={0.1}
            />
          </mesh>

          {/* ② 左右内立柱内侧的垂直嵌入式侧发光线性导光条 */}
          {[-colW / 2 - boardThick, colW / 2].map((x, i) => (
            <mesh key={`v-led-${i}`} position={[x, 0, cabinetD / 2 - 0.05]}>
              <boxGeometry args={[0.012, cabinetH - boardThick * 2 - 0.04, 0.015]} />
              <meshStandardMaterial
                color="#fde047"
                emissive="#f59e0b"
                emissiveIntensity={2.2}
                roughness={0.1}
              />
            </mesh>
          ))}

          {/* ③ 首饰抽内部点亮的高精度珠宝射灯 */}
          <pointLight position={[0, 0.28, 0.25]} intensity={1.8} color="#fef08a" distance={1.6} />

          {/* ④ 长衣区柔和下照光 */}
          <pointLight position={[-colW - boardThick, 0.65, 0.2]} intensity={1.5} color="#fef3c7" distance={1.8} />

          {/* ⑤ 玻璃展柜内晶莹漫射光 */}
          <pointLight position={[colW + boardThick, 0.1, 0.15]} intensity={1.8} color="#fde68a" distance={2.2} />
        </group>
      )}
    </group>
  );
};

export const BoolAtStoryScene: React.FC<BoolAtStorySceneProps> = (props) => {
  const hasHanger = props.hasHanger ?? true;
  const hasJewelry = props.hasJewelry ?? true;
  const hasGlass = props.hasGlass ?? true;

  const isExact = Boolean(hasHanger && hasJewelry && hasGlass);

  // 计算当前选配的列表
  const selectedList: number[] = [];
  if (hasHanger) selectedList.push(1);
  if (hasJewelry) selectedList.push(2);
  if (hasGlass) selectedList.push(3);

  return (
    <div
      style={{
        width: '100%',
        height: '100vh',
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        background: '#ffffff',
        fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        color: '#1e293b',
      }}
    >
      {/* 顶部标题栏 */}
      <div
        style={{
          flexShrink: 0,
          padding: '14px 28px',
          borderBottom: '1px solid #f1f5f9',
          background: 'linear-gradient(135deg, #0d94880f 0%, #2dd4bf1a 100%)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '16px',
        }}
      >
        <h2
          style={{
            margin: 0,
            fontSize: '24px',
            fontWeight: 800,
            color: '#0f172a',
            letterSpacing: '-0.5px',
          }}
        >
          BoolAt(list1, list2)
        </h2>
        <div
          style={{
            background: '#ffffff',
            border: '1px solid #2dd4bf60',
            padding: '8px 18px',
            borderRadius: '10px',
            fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
            fontSize: '14px',
            fontWeight: 700,
            color: '#0d9488',
            boxShadow: '0 4px 12px -2px #0d948815',
          }}
        >
          BoolAt(#Modules, [1, 2, 3])
        </div>
      </div>

      {/* 中间 3D 画布区域 */}
      <div style={{ flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column' }}>
        <div
          style={{
            flex: 1,
            minHeight: 0,
            width: '100%',
            position: 'relative',
            background: isExact
              ? 'radial-gradient(circle at 50% 45%, #ffffff 0%, #fef3c730 65%, #f59e0b1a 100%)'
              : 'radial-gradient(circle at 50% 45%, #ffffff 0%, #f8fafc 70%, #f1f5f9 100%)',
            transition: 'background 0.5s ease',
          }}
        >
          {/* 明亮清爽的顶级展厅采光配置，彻底告别死黑沉闷 */}
          <Canvas camera={{ position: [0, 0.05, 4.3], fov: 45 }} gl={{ antialias: true }}>
            <color attach="background" args={['#fafafa']} />
            {/* 充沛的全局环境光与多维补光 */}
            <ambientLight intensity={1.15} />
            <directionalLight position={[6, 12, 8]} intensity={1.4} castShadow />
            <directionalLight position={[-6, 6, 4]} intensity={0.9} />
            <directionalLight position={[0, -4, 4]} intensity={0.35} />

            {/* 套餐点亮时外置展厅主金光 */}
            {isExact && <pointLight position={[0, 2.2, 2.8]} intensity={1.5} color="#fbbf24" />}

            {/* 衣柜主体 */}
            <BoolAtClosetMesh {...props} />

            {/* 接地柔和阴影 */}
            <ContactShadows
              position={[0, -1.4, 0]}
              opacity={0.4}
              scale={10}
              blur={2.2}
              far={3.5}
              color={isExact ? '#d97706' : '#64748b'}
            />
            <OrbitControls target={[0, 0, 0]} enableZoom={true} maxPolarAngle={Math.PI / 2 + 0.04} />
          </Canvas>

          {/* 实时状态悬浮卡片 */}
          <div
            style={{
              position: 'absolute',
              top: '16px',
              left: '20px',
              background: 'rgba(255, 255, 255, 0.96)',
              backdropFilter: 'blur(12px)',
              border: isExact ? '1.5px solid #f59e0b' : '1px solid #e2e8f0',
              padding: '14px 20px',
              borderRadius: '12px',
              boxShadow: isExact ? '0 6px 20px rgba(245, 158, 11, 0.22)' : '0 4px 14px rgba(0,0,0,0.06)',
              fontSize: '13px',
              color: '#334155',
              minWidth: '320px',
            }}
          >
            <div style={{ fontWeight: 700, color: '#0f172a', marginBottom: '8px', fontSize: '14px' }}>
              当前选配清单：<code style={{ background: '#f1f5f9', padding: '2px 6px', borderRadius: '4px' }}>[{selectedList.join(', ')}]</code>
            </div>
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '6px' }}>
              <span>判定 <code>BoolAt(#Modules, [1, 2, 3])</code>：</span>
              <span
                style={{
                  fontWeight: 800,
                  color: isExact ? '#b45309' : '#64748b',
                  background: isExact ? '#fef3c7' : '#f1f5f9',
                  padding: '3px 10px',
                  borderRadius: '6px',
                  border: isExact ? '1px solid #fde68a' : '1px solid #e2e8f0',
                }}
              >
                {isExact ? 'True（三件套精准大满贯！）' : 'False（未凑齐三件套）'}
              </span>
            </div>
            <div
              style={{
                fontSize: '12px',
                color: isExact ? '#b45309' : '#64748b',
                marginTop: '6px',
                lineHeight: '1.6',
                borderTop: '1px dashed #e2e8f0',
                paddingTop: '6px',
              }}
            >
              {isExact
                ? '✨ 尊享特权已激活：全室内嵌 3000K 智能暖光幕 + 金线型材封边！'
                : '⚠ 常规木工排产：未完全集齐套餐，关闭全柜专属隐藏灯带回路'}
            </div>
          </div>

          {/* 3D 操作提示 */}
          <div
            style={{
              position: 'absolute',
              bottom: '12px',
              right: '16px',
              background: 'rgba(255,255,255,0.92)',
              backdropFilter: 'blur(8px)',
              border: '1px solid #e2e8f0',
              padding: '6px 12px',
              borderRadius: '8px',
              fontSize: '12px',
              color: '#64748b',
              boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
              pointerEvents: 'none',
            }}
          >
            ✦ 3D 视口：按住鼠标左键旋转 · 右键平移 · 滚轮缩放查看细节
          </div>
        </div>

        {/* 底部故事与行业价值说明 */}
        <div
          style={{
            flexShrink: 0,
            padding: '16px 32px',
            background: '#ffffff',
            borderTop: '1px solid #f1f5f9',
            display: 'grid',
            gridTemplateColumns: '1.2fr 1fr',
            gap: '24px',
            alignItems: 'center',
          }}
        >
          <div>
            <h4
              style={{
                margin: '0 0 6px 0',
                fontSize: '15px',
                fontWeight: 700,
                color: '#0f172a',
              }}
            >
              📖 业务故事：高定衣帽间尊享三件套精准匹配
            </h4>
            <p
              style={{
                margin: 0,
                fontSize: '13px',
                lineHeight: '1.6',
                color: '#475569',
              }}
            >
              豪华衣帽间有 3 大奢华标杆模块：<strong>1-长衣悬挂区（含西装风衣衣架）、2-爱马仕橙丝绒双层首饰多宝格抽与西裤架、3-极窄铝框半开茶玻展示柜</strong>。小宇在参数化逻辑中严密约定：只有这 3 件<strong>不多、不少、不混杂</strong>精准全配齐时，工厂才自动激活开通全柜通体嵌入式暖光线性灯带与香槟金型材收口！在 Controls 中勾选体验套餐的激活仪式感。
            </p>
          </div>
          <div
            style={{
              fontSize: '13px',
              lineHeight: '1.6',
              color: '#334155',
              background: '#0d94880d',
              borderLeft: '3px solid #0d9488',
              padding: '10px 14px',
              borderRadius: '0 8px 8px 0',
            }}
          >
            <strong>💡 工业制造价值：</strong>
            <code>BoolAt</code> 是严格集合相等比对。杜绝前端销售人员漏选少配、错选混搭，确保全套电路走线与预埋变压器结构一次性精准装配，真正做到“所见即所得、下单即高定”。
          </div>
        </div>
      </div>
    </div>
  );
};
