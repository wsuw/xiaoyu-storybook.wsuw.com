import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, ContactShadows } from '@react-three/drei';

export interface MeanStorySceneProps {
  yDiff?: number;
}

/**
 * 现代轻奢开放展示陈列柜
 * 业务核心：mean([#Y1, #Y2, #Y3])
 * 柜内 3 块活动层板随着参数发生错落浮动，
 * 外门上的【通体香槟金长拉手】与【中腰线基准锚点】始终智能锚定在 3 块层板的算术平均高度中心。
 */
const LuxuryDisplayCabinetMesh: React.FC<MeanStorySceneProps> = ({
  yDiff = 80,
}) => {
  // 基础柜体尺寸 (米)
  const cabinetW = 1.0;
  const cabinetH = 2.0;
  const cabinetD = 0.48;
  const boardThick = 0.025;

  // 根据用户滑块 yDiff (0 ~ 150) 计算三块层板的高度
  // 基准分布：0.35m, 0.95m, 1.55m (相对于柜底内部净高)
  // 当 yDiff = 0 时均匀分布；yDiff 增大时呈现高低错落差异化展位
  const offsetM = (yDiff / 100) * 0.22;
  const y1Mm = Math.round(350 - yDiff * 1.2); // 底部矮展位 (如 350 -> 254mm)
  const y2Mm = Math.round(950 + yDiff * 0.6); // 中部展位 (如 950 -> 998mm)
  const y3Mm = Math.round(1550 + yDiff * 1.5); // 顶部高展位 (如 1550 -> 1670mm)
  const meanYMm = Math.round((y1Mm + y2Mm + y3Mm) / 3);

  // 换算成 3D 局部米坐标 (柜体中心在 Y = 0，内部 Y 范围约从 -0.95 到 +0.95)
  const cabinetInnerBottom = -cabinetH / 2 + boardThick;
  const shelfY1 = cabinetInnerBottom + y1Mm / 1000;
  const shelfY2 = cabinetInnerBottom + y2Mm / 1000;
  const shelfY3 = cabinetInnerBottom + y3Mm / 1000;
  const meanY = (shelfY1 + shelfY2 + shelfY3) / 3;

  return (
    <group position={[0, 0, 0]}>
      {/* ================= 0. 空间环境与底台 ================= */}
      {/* 极简温馨人字拼木质地面 */}
      <mesh position={[0, -cabinetH / 2 - 0.01, cabinetD / 2]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[3.2, 2.2]} />
        <meshStandardMaterial color="#ebe6e0" roughness={0.6} />
      </mesh>

      {/* ================= 1. 意式极简展示柜主体 (黑曜深灰 + 暖白布纹背板) ================= */}
      <group position={[0, 0, 0]}>
        {/* 顶板 */}
        <mesh position={[0, cabinetH / 2 - boardThick / 2, 0]}>
          <boxGeometry args={[cabinetW, boardThick, cabinetD]} />
          <meshStandardMaterial color="#1e293b" roughness={0.35} />
        </mesh>
        {/* 底板 */}
        <mesh position={[0, -cabinetH / 2 + boardThick / 2, 0]}>
          <boxGeometry args={[cabinetW, boardThick, cabinetD]} />
          <meshStandardMaterial color="#1e293b" roughness={0.35} />
        </mesh>
        {/* 左右侧板 */}
        <mesh position={[-cabinetW / 2 + boardThick / 2, 0, 0]}>
          <boxGeometry args={[boardThick, cabinetH, cabinetD]} />
          <meshStandardMaterial color="#1e293b" roughness={0.35} />
        </mesh>
        <mesh position={[cabinetW / 2 - boardThick / 2, 0, 0]}>
          <boxGeometry args={[boardThick, cabinetH, cabinetD]} />
          <meshStandardMaterial color="#1e293b" roughness={0.35} />
        </mesh>

        {/* 暖杏布纹质感背板 */}
        <mesh position={[0, 0, -cabinetD / 2 + 0.01]}>
          <boxGeometry args={[cabinetW - boardThick * 2, cabinetH - boardThick * 2, 0.016]} />
          <meshStandardMaterial color="#f6f2ec" roughness={0.5} />
        </mesh>

        {/* 顶部内置柔和双射灯 */}
        <mesh position={[-0.25, cabinetH / 2 - boardThick - 0.008, 0]}>
          <cylinderGeometry args={[0.035, 0.035, 0.015, 16]} />
          <meshStandardMaterial color="#f59e0b" metalness={0.9} roughness={0.2} />
        </mesh>
        <mesh position={[0.25, cabinetH / 2 - boardThick - 0.008, 0]}>
          <cylinderGeometry args={[0.035, 0.035, 0.015, 16]} />
          <meshStandardMaterial color="#f59e0b" metalness={0.9} roughness={0.2} />
        </mesh>
        <pointLight position={[0, cabinetH / 2 - 0.2, 0]} intensity={1.2} color="#fde047" distance={1.8} />

        {/* 内缩踢脚线 */}
        <mesh position={[0, -cabinetH / 2 + 0.03, 0]}>
          <boxGeometry args={[cabinetW - 0.06, 0.06, cabinetD - 0.04]} />
          <meshStandardMaterial color="#0f172a" roughness={0.4} />
        </mesh>
      </group>

      {/* ================= 2. 柜内 3 块参差错落活动层板与陈列品 ================= */}
      {/* --- 第 1 块层板 (矮层板 #Y1) --- */}
      <group position={[0, shelfY1, 0]}>
        <mesh>
          <boxGeometry args={[cabinetW - boardThick * 2 - 0.004, 0.024, cabinetD - 0.04]} />
          <meshStandardMaterial color="#c2b4a3" roughness={0.35} />
        </mesh>
        {/* 前沿香槟金微收口嵌条 */}
        <mesh position={[0, -0.006, (cabinetD - 0.04) / 2 + 0.001]}>
          <boxGeometry args={[cabinetW - boardThick * 2 - 0.004, 0.008, 0.004]} />
          <meshStandardMaterial color="#f59e0b" metalness={0.9} roughness={0.2} />
        </mesh>
        {/* 展品：精装厚画册书堆 */}
        <group position={[-0.22, 0.035, 0]}>
          <mesh position={[0, 0, 0]}>
            <boxGeometry args={[0.26, 0.03, 0.18]} />
            <meshStandardMaterial color="#334155" roughness={0.4} />
          </mesh>
          <mesh position={[0.02, 0.028, 0.01]} rotation={[0, 0.08, 0]}>
            <boxGeometry args={[0.24, 0.026, 0.17]} />
            <meshStandardMaterial color="#7c3aed" roughness={0.35} />
          </mesh>
        </group>
        {/* 金属收纳托盘 */}
        <mesh position={[0.24, 0.018, 0.02]}>
          <boxGeometry args={[0.2, 0.015, 0.2]} />
          <meshStandardMaterial color="#f59e0b" metalness={0.85} roughness={0.2} />
        </mesh>
      </group>

      {/* --- 第 2 块层板 (中层板 #Y2) --- */}
      <group position={[0, shelfY2, 0]}>
        <mesh>
          <boxGeometry args={[cabinetW - boardThick * 2 - 0.004, 0.024, cabinetD - 0.04]} />
          <meshStandardMaterial color="#c2b4a3" roughness={0.35} />
        </mesh>
        <mesh position={[0, -0.006, (cabinetD - 0.04) / 2 + 0.001]}>
          <boxGeometry args={[cabinetW - boardThick * 2 - 0.004, 0.008, 0.004]} />
          <meshStandardMaterial color="#f59e0b" metalness={0.9} roughness={0.2} />
        </mesh>
        {/* 展品：极简现代双色陶瓷艺术花瓶 */}
        <mesh position={[-0.2, 0.09, 0.01]}>
          <cylinderGeometry args={[0.045, 0.03, 0.16, 20]} />
          <meshStandardMaterial color="#fafaf9" roughness={0.2} />
        </mesh>
        <mesh position={[-0.11, 0.065, 0.04]}>
          <cylinderGeometry args={[0.035, 0.025, 0.11, 20]} />
          <meshStandardMaterial color="#a78bfa" roughness={0.25} />
        </mesh>
        {/* 艺术香薰 */}
        <mesh position={[0.22, 0.05, 0]}>
          <cylinderGeometry args={[0.03, 0.03, 0.08, 16]} />
          <meshStandardMaterial color="#475569" roughness={0.3} />
        </mesh>
      </group>

      {/* --- 第 3 块层板 (高展位 #Y3) --- */}
      <group position={[0, shelfY3, 0]}>
        <mesh>
          <boxGeometry args={[cabinetW - boardThick * 2 - 0.004, 0.024, cabinetD - 0.04]} />
          <meshStandardMaterial color="#c2b4a3" roughness={0.35} />
        </mesh>
        <mesh position={[0, -0.006, (cabinetD - 0.04) / 2 + 0.001]}>
          <boxGeometry args={[cabinetW - boardThick * 2 - 0.004, 0.008, 0.004]} />
          <meshStandardMaterial color="#f59e0b" metalness={0.9} roughness={0.2} />
        </mesh>
        {/* 展品：现代金属几何抽象雕塑 */}
        <mesh position={[0, 0.09, 0]} rotation={[0.4, 0.4, 0]}>
          <octahedronGeometry args={[0.075]} />
          <meshStandardMaterial color="#f59e0b" metalness={0.95} roughness={0.15} />
        </mesh>
      </group>

      {/* ================= 3. 核心机制：mean([Y1, Y2, Y3]) 算术平均重心锚定 ================= */}
      {/* ① 水平贯通的紫色黄金重心基准线 */}
      <group position={[0, meanY, cabinetD / 2 + 0.02]}>
        {/* 水平微光发光基准条 */}
        <mesh>
          <boxGeometry args={[cabinetW + 0.14, 0.008, 0.006]} />
          <meshStandardMaterial
            color="#8b5cf6"
            emissive="#8b5cf6"
            emissiveIntensity={1.8}
            roughness={0.2}
          />
        </mesh>

        {/* 左右两端的重心基准标头 */}
        <mesh position={[-(cabinetW + 0.14) / 2, 0, 0]}>
          <boxGeometry args={[0.012, 0.04, 0.01]} />
          <meshStandardMaterial color="#7c3aed" emissive="#7c3aed" emissiveIntensity={1.2} />
        </mesh>
        <mesh position={[(cabinetW + 0.14) / 2, 0, 0]}>
          <boxGeometry args={[0.012, 0.04, 0.01]} />
          <meshStandardMaterial color="#7c3aed" emissive="#7c3aed" emissiveIntensity={1.2} />
        </mesh>
      </group>

      {/* ② 外挂通体香槟金超长轻奢长拉手 (锁孔中心智能对准 meanY) */}
      <group position={[cabinetW / 2 - 0.045, meanY, cabinetD / 2 + 0.035]}>
        {/* 长拉手主体 (长 0.82m) */}
        <mesh>
          <boxGeometry args={[0.012, 0.82, 0.014]} />
          <meshStandardMaterial color="#f59e0b" metalness={0.95} roughness={0.12} />
        </mesh>

        {/* 上下两枚金属固定支脚 */}
        <mesh position={[0, 0.35, -0.015]}>
          <cylinderGeometry args={[0.008, 0.008, 0.025, 12]} rotation={[Math.PI / 2, 0, 0]} />
          <meshStandardMaterial color="#d97706" metalness={0.9} roughness={0.2} />
        </mesh>
        <mesh position={[0, -0.35, -0.015]}>
          <cylinderGeometry args={[0.008, 0.008, 0.025, 12]} rotation={[Math.PI / 2, 0, 0]} />
          <meshStandardMaterial color="#d97706" metalness={0.9} roughness={0.2} />
        </mesh>

        {/* 正中心拉手持握黄金点微光提示环 */}
        <mesh position={[0, 0, 0.008]}>
          <boxGeometry args={[0.016, 0.024, 0.004]} />
          <meshStandardMaterial color="#8b5cf6" emissive="#8b5cf6" emissiveIntensity={2} />
        </mesh>
      </group>

      {/* ③ 半透微反光极简灰玻柜门边框轮廓 (微开 12 度，增加立体深度) */}
      <group position={[-cabinetW / 2 + boardThick, 0, cabinetD / 2 + 0.005]} rotation={[0, 0.22, 0]}>
        {/* 铝合金极窄边框 */}
        <mesh position={[cabinetW / 2 - 0.01, 0, 0]}>
          <boxGeometry args={[cabinetW - 0.02, cabinetH - 0.03, 0.01]} />
          <meshStandardMaterial
            color="#94a3b8"
            transparent
            opacity={0.18}
            roughness={0.1}
            metalness={0.8}
          />
        </mesh>
      </group>
    </group>
  );
};

export const MeanStoryScene: React.FC<MeanStorySceneProps> = (props) => {
  const yDiff = props.yDiff ?? 80;
  const y1 = Math.round(350 - yDiff * 1.2);
  const y2 = Math.round(950 + yDiff * 0.6);
  const y3 = Math.round(1550 + yDiff * 1.5);
  const meanY = Math.round((y1 + y2 + y3) / 3);

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
          background: 'linear-gradient(135deg, #8b5cf60f 0%, #c4b5fd1a 100%)',
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
          mean([x1, x2, ...])
        </h2>
        <div
          style={{
            background: '#ffffff',
            border: '1px solid #c4b5fd60',
            padding: '8px 18px',
            borderRadius: '10px',
            fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
            fontSize: '14px',
            fontWeight: 700,
            color: '#7c3aed',
            boxShadow: '0 4px 12px -2px #8b5cf615',
          }}
        >
          mean([#Y1, #Y2, #Y3])
        </div>
      </div>

      {/* 3D 视口画布 */}
      <div style={{ flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column' }}>
        <div
          style={{
            flex: 1,
            minHeight: 0,
            width: '100%',
            position: 'relative',
            background: 'radial-gradient(circle at 50% 42%, #ffffff 0%, #f8fafc 65%, #f1f5f9 100%)',
          }}
        >
          <Canvas camera={{ position: [0.75, 0.35, 2.7], fov: 42 }} gl={{ antialias: true }}>
            <color attach="background" args={['#fafafa']} />
            <ambientLight intensity={1.15} />
            <directionalLight position={[6, 12, 8]} intensity={1.3} castShadow />
            <directionalLight position={[-6, 6, 4]} intensity={0.65} />
            <directionalLight position={[0, -3, 3]} intensity={0.25} />

            {/* 轻奢陈列柜模型 */}
            <LuxuryDisplayCabinetMesh {...props} />

            <ContactShadows
              position={[0, -1.0, 0]}
              opacity={0.36}
              scale={5}
              blur={2.4}
              far={3.0}
              color="#475569"
            />
            <OrbitControls target={[0, 0.05, 0]} enableZoom={true} maxPolarAngle={Math.PI / 2 + 0.04} />
          </Canvas>

          {/* 实时状态悬浮卡片 */}
          <div
            style={{
              position: 'absolute',
              top: '16px',
              left: '20px',
              background: 'rgba(255, 255, 255, 0.96)',
              backdropFilter: 'blur(12px)',
              border: '1.5px solid #8b5cf6',
              padding: '14px 20px',
              borderRadius: '12px',
              boxShadow: '0 6px 20px rgba(139, 92, 246, 0.15)',
              fontSize: '13px',
              color: '#334155',
              minWidth: '360px',
            }}
          >
            <div style={{ fontWeight: 700, color: '#0f172a', marginBottom: '8px', fontSize: '14px' }}>
              参差活动层板各自标高：
            </div>

            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '8px' }}>
              <span style={{ background: '#f5f3ff', padding: '3px 8px', borderRadius: '4px', border: '1px solid #ddd6fe' }}>
                #Y1(矮展位) = <strong>{y1}</strong> mm
              </span>
              <span style={{ background: '#f5f3ff', padding: '3px 8px', borderRadius: '4px', border: '1px solid #ddd6fe' }}>
                #Y2(中展位) = <strong>{y2}</strong> mm
              </span>
              <span style={{ background: '#f5f3ff', padding: '3px 8px', borderRadius: '4px', border: '1px solid #ddd6fe' }}>
                #Y3(高展位) = <strong>{y3}</strong> mm
              </span>
            </div>

            {/* mean 算术平均计算 */}
            <div
              style={{
                display: 'flex',
                gap: '8px',
                alignItems: 'center',
                borderTop: '1px dashed #e2e8f0',
                paddingTop: '8px',
                marginTop: '6px',
              }}
            >
              <span><code>mean</code> 智能加权重心：</span>
              <span
                style={{
                  fontWeight: 800,
                  color: '#6d28d9',
                  background: '#ede9fe',
                  padding: '3px 10px',
                  borderRadius: '6px',
                  border: '1px solid #c4b5fd',
                }}
              >
                mean([{y1}, {y2}, {y3}]) = {meanY} mm
              </span>
            </div>

            {/* 联动美学解释 */}
            <div
              style={{
                fontSize: '12px',
                color: '#6d28d9',
                marginTop: '8px',
                lineHeight: '1.6',
                background: '#faf5ff',
                padding: '8px 10px',
                borderRadius: '6px',
              }}
            >
              ✦ 柜门通体金色长拉手锁定在 <strong>{meanY}mm</strong> 黄金重心点！无论内部层板如何随意错落调高，外观门把手永远保持最佳视觉对称与平衡。
            </div>
          </div>

          {/* 3D 视角提示 */}
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
            ✦ 3D 视口：按住鼠标左键旋转查看柜门微开与长拉手联动 · 右键平移 · 滚轮缩放
          </div>
        </div>

        {/* 底部故事与价值说明 */}
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
              📖 业务故事：高低错落层板与通体长拉手美学居中定位
            </h4>
            <p
              style={{
                margin: 0,
                fontSize: '13px',
                lineHeight: '1.6',
                color: '#475569',
              }}
            >
              高端展示柜内设置了 3 块错落高低不一的活动展位（矮格摆书画册、中格摆陶瓷花瓶、高格陈列雕塑）。当用户调整内部层板标高时，外挂铝框玻璃门上的<strong>通体金色长拉手与五金安装孔</strong>，通过 <code>mean([#Y1, #Y2, #Y3])</code> 瞬间计算并锚定在三者的算术重心上，无论内部层板怎么调，门外立面始终规整大方、稳定居中！
            </p>
          </div>
          <div
            style={{
              fontSize: '13px',
              lineHeight: '1.6',
              color: '#4c1d95',
              background: '#8b5cf60d',
              borderLeft: '3px solid #8b5cf6',
              padding: '10px 14px',
              borderRadius: '0 8px 8px 0',
            }}
          >
            <strong>💡 工业制造价值：</strong>
            <code>mean</code> 是参数化“几何对齐与美学重心计算”的灵魂函数。在多构件离散非均匀分布时，一键提取整体物理中轴，广泛用于拉手打孔打点定位、腰线中剖、射灯对焦与智能立面排版。
          </div>
        </div>
      </div>
    </div>
  );
};
