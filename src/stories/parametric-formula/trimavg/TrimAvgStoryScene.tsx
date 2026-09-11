import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, ContactShadows } from '@react-three/drei';

export interface TrimAvgStorySceneProps {
  lockedW?: number;
}

/**
 * 方案一：高定满墙四门衣柜「长款大衣区硬性锁定 × 剩余仓位智能自适应均分」
 * 业务核心：trimavg(#TotalW, #W1, #W2, #W3)
 * 总净宽 2400mm，左侧第一仓为硬性指定锁定的长款大衣区 (lockedW，如 400~800mm)；
 * trimavg 自动扣除该指定常数项后，将其余可用空间精确均分给右侧剩余 3 组收纳仓（短衣区、叠放区、抽屉配件区）。
 */
const WardrobeTrimAvgMesh: React.FC<TrimAvgStorySceneProps> = ({
  lockedW = 550,
}) => {
  // 衣柜整体尺寸参数 (米)
  const totalNetWMm = 2400; // 内部总净宽 2400mm
  const totalNetW = totalNetWMm / 1000;
  const wardrobeH = 2.2;
  const wardrobeD = 0.6;
  const boardThick = 0.025; // 25mm 柜身板件厚度

  // 计算：扣除锁定项后剩余的均分宽度
  const lockedWM = lockedW / 1000;
  const remainingTotalMm = totalNetWMm - lockedW;
  const remainingSlotCount = 3; // 右侧剩余 3 个自由均分仓位
  const avgSlotWMm = Math.round(remainingTotalMm / remainingSlotCount);
  const avgSlotW = avgSlotWMm / 1000;

  // 内部空间基准：柜内左起点在 X = -totalNetW / 2
  const innerStartX = -totalNetW / 2;

  // 锁定仓 (仓 0) 的中心与宽度
  const slot0X = innerStartX + lockedWM / 2;

  // 均分仓 (仓 1, 2, 3) 的中心位置
  const slot1X = innerStartX + lockedWM + avgSlotW * 0.5;
  const slot2X = innerStartX + lockedWM + avgSlotW * 1.5;
  const slot3X = innerStartX + lockedWM + avgSlotW * 2.5;

  return (
    <group position={[0, -0.05, 0]}>
      {/* ================= 0. 空间环境地面 ================= */}
      <mesh position={[0, -wardrobeH / 2 - 0.015, 0.2]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[4.5, 3.2]} />
        <meshStandardMaterial color="#f1f5f9" roughness={0.7} />
      </mesh>

      {/* ================= 1. 衣柜外围箱体 (雅致暖灰白烤漆肤感) ================= */}
      <group position={[0, 0, 0]}>
        {/* 顶板 */}
        <mesh position={[0, wardrobeH / 2 - boardThick / 2, 0]}>
          <boxGeometry args={[totalNetW + boardThick * 2, boardThick, wardrobeD]} />
          <meshStandardMaterial color="#e2e8f0" roughness={0.35} />
        </mesh>
        {/* 底板 */}
        <mesh position={[0, -wardrobeH / 2 + boardThick / 2, 0]}>
          <boxGeometry args={[totalNetW + boardThick * 2, boardThick, wardrobeD]} />
          <meshStandardMaterial color="#e2e8f0" roughness={0.35} />
        </mesh>
        {/* 最左外侧板 */}
        <mesh position={[-totalNetW / 2 - boardThick / 2, 0, 0]}>
          <boxGeometry args={[boardThick, wardrobeH, wardrobeD]} />
          <meshStandardMaterial color="#cbd5e1" roughness={0.4} />
        </mesh>
        {/* 最右外侧板 */}
        <mesh position={[totalNetW / 2 + boardThick / 2, 0, 0]}>
          <boxGeometry args={[boardThick, wardrobeH, wardrobeD]} />
          <meshStandardMaterial color="#cbd5e1" roughness={0.4} />
        </mesh>
        {/* 暖白布纹背板 */}
        <mesh position={[0, 0, -wardrobeD / 2 + 0.01]}>
          <boxGeometry args={[totalNetW, wardrobeH - boardThick * 2, 0.016]} />
          <meshStandardMaterial color="#f8fafc" roughness={0.5} />
        </mesh>

        {/* 底部内缩踢脚线 */}
        <mesh position={[0, -wardrobeH / 2 + 0.03, 0]}>
          <boxGeometry args={[totalNetW + boardThick * 2 - 0.04, 0.06, wardrobeD - 0.04]} />
          <meshStandardMaterial color="#1e293b" roughness={0.4} />
        </mesh>
      </group>

      {/* ================= 2. 内部竖向立板分割 (3 根内部竖立板自适应定位) ================= */}
      {/* 竖隔板 1：划分锁定区与均分区 (X = innerStartX + lockedWM) */}
      <mesh position={[innerStartX + lockedWM, 0, 0]}>
        <boxGeometry args={[boardThick, wardrobeH - boardThick * 2, wardrobeD - 0.03]} />
        <meshStandardMaterial color="#94a3b8" metalness={0.4} roughness={0.3} />
      </mesh>
      {/* 竖隔板 2：划分均分区仓 1 与仓 2 (X = innerStartX + lockedWM + avgSlotW) */}
      <mesh position={[innerStartX + lockedWM + avgSlotW, 0, 0]}>
        <boxGeometry args={[boardThick, wardrobeH - boardThick * 2, wardrobeD - 0.03]} />
        <meshStandardMaterial color="#cbd5e1" roughness={0.4} />
      </mesh>
      {/* 竖隔板 3：划分均分区仓 2 与仓 3 (X = innerStartX + lockedWM + avgSlotW * 2) */}
      <mesh position={[innerStartX + lockedWM + avgSlotW * 2, 0, 0]}>
        <boxGeometry args={[boardThick, wardrobeH - boardThick * 2, wardrobeD - 0.03]} />
        <meshStandardMaterial color="#cbd5e1" roughness={0.4} />
      </mesh>

      {/* ================= 3. 仓位 0：【🔒 强行锁定长款大衣区】(专属硬核高光) ================= */}
      <group position={[slot0X, 0, 0]}>
        {/* ① 专属硬核锁定金色徽标与微光框 */}
        <group position={[0, wardrobeH / 2 - 0.12, wardrobeD / 2 - 0.04]}>
          {/* 金色锁具底座 */}
          <mesh position={[0, 0, 0]}>
            <boxGeometry args={[0.07, 0.06, 0.02]} />
            <meshStandardMaterial color="#f59e0b" metalness={0.95} roughness={0.15} />
          </mesh>
          {/* 锁环 */}
          <mesh position={[0, 0.04, 0]}>
            <torusGeometry args={[0.024, 0.007, 12, 24, Math.PI]} />
            <meshStandardMaterial color="#f59e0b" metalness={0.95} roughness={0.15} />
          </mesh>
        </group>

        {/* 顶部通长高定金属挂衣杆 */}
        <mesh position={[0, wardrobeH / 2 - 0.22, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.014, 0.014, Math.max(lockedWM - 0.04, 0.1), 16]} />
          <meshStandardMaterial color="#f59e0b" metalness={0.92} roughness={0.15} />
        </mesh>

        {/* 陈列：悬挂的长款毛呢大衣/经典风衣 */}
        <group position={[0, 0.2, 0]}>
          {/* 衣架 */}
          <mesh position={[0, 0.65, 0]}>
            <boxGeometry args={[Math.min(lockedWM * 0.7, 0.44), 0.02, 0.02]} />
            <meshStandardMaterial color="#b45309" roughness={0.4} />
          </mesh>
          {/* 长款风衣主体 */}
          <mesh position={[0, 0.05, 0]}>
            <boxGeometry args={[Math.min(lockedWM * 0.75, 0.42), 1.15, 0.24]} />
            <meshStandardMaterial color="#334155" roughness={0.7} />
          </mesh>
          {/* 底部摆放的高定登机行李箱 */}
          <mesh position={[0, -0.78, 0]}>
            <boxGeometry args={[Math.min(lockedWM * 0.7, 0.38), 0.38, 0.26]} />
            <meshStandardMaterial color="#78350f" metalness={0.3} roughness={0.4} />
          </mesh>
        </group>

        {/* 锁定区暖金独立顶射灯 */}
        <pointLight position={[0, wardrobeH / 2 - 0.18, 0]} intensity={1.1} color="#fef08a" distance={1.6} />
      </group>

      {/* ================= 4. 仓位 1：【均分自适应 A - 短衬衫挂衣区】 ================= */}
      <group position={[slot1X, 0, 0]}>
        {/* 挂衣杆 */}
        <mesh position={[0, wardrobeH / 2 - 0.22, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.012, 0.012, Math.max(avgSlotW - 0.03, 0.1), 16]} />
          <meshStandardMaterial color="#94a3b8" metalness={0.9} roughness={0.2} />
        </mesh>
        {/* 短外套/衬衫陈列 */}
        <group position={[0, 0.45, 0]}>
          <mesh position={[0, 0.18, 0]}>
            <boxGeometry args={[Math.min(avgSlotW * 0.75, 0.4), 0.015, 0.015]} />
            <meshStandardMaterial color="#64748b" />
          </mesh>
          <mesh position={[0, -0.15, 0]}>
            <boxGeometry args={[Math.min(avgSlotW * 0.72, 0.38), 0.62, 0.22]} />
            <meshStandardMaterial color="#475569" roughness={0.65} />
          </mesh>
        </group>
        {/* 下方隔板与鞋盒 */}
        <mesh position={[0, -0.2, 0]}>
          <boxGeometry args={[Math.max(avgSlotW - 0.01, 0.05), boardThick, wardrobeD - 0.04]} />
          <meshStandardMaterial color="#cbd5e1" roughness={0.4} />
        </mesh>
        <mesh position={[0, -0.32, 0]}>
          <boxGeometry args={[Math.min(avgSlotW * 0.7, 0.32), 0.16, 0.26]} />
          <meshStandardMaterial color="#e2e8f0" roughness={0.4} />
        </mesh>
      </group>

      {/* ================= 5. 仓位 2：【均分自适应 B - 多层羊绒衫叠放区】 ================= */}
      <group position={[slot2X, 0, 0]}>
        {[-0.5, -0.1, 0.3, 0.7].map((yOffset, i) => (
          <group key={`shelf-${i}`} position={[0, yOffset, 0]}>
            {/* 隔板 */}
            <mesh>
              <boxGeometry args={[Math.max(avgSlotW - 0.01, 0.05), boardThick, wardrobeD - 0.04]} />
              <meshStandardMaterial color="#cbd5e1" roughness={0.4} />
            </mesh>
            {/* 叠放整齐的衣物 */}
            {i < 3 && (
              <mesh position={[0, 0.08, 0]}>
                <boxGeometry args={[Math.min(avgSlotW * 0.75, 0.36), 0.12, 0.3]} />
                <meshStandardMaterial
                  color={i === 0 ? '#cbd5e1' : i === 1 ? '#94a3b8' : '#e2e8f0'}
                  roughness={0.8}
                />
              </mesh>
            )}
          </group>
        ))}
      </group>

      {/* ================= 6. 仓位 3：【均分自适应 C - 双层静音抽屉配件区】 ================= */}
      <group position={[slot3X, 0, 0]}>
        {/* 上方挂包与配饰区 */}
        <mesh position={[0, 0.35, 0]}>
          <boxGeometry args={[Math.max(avgSlotW - 0.01, 0.05), boardThick, wardrobeD - 0.04]} />
          <meshStandardMaterial color="#cbd5e1" roughness={0.4} />
        </mesh>
        {/* 陈列皮包 */}
        <mesh position={[0, 0.52, 0]}>
          <boxGeometry args={[Math.min(avgSlotW * 0.6, 0.26), 0.24, 0.14]} />
          <meshStandardMaterial color="#475569" roughness={0.3} />
        </mesh>

        {/* 底层两组高定阻尼抽屉 */}
        {[-0.68, -0.38].map((yOffset, i) => (
          <group key={`drawer-${i}`} position={[0, yOffset, 0]}>
            {/* 抽屉面 */}
            <mesh position={[0, 0, wardrobeD / 2 - 0.02]}>
              <boxGeometry args={[Math.max(avgSlotW - 0.02, 0.05), 0.26, 0.02]} />
              <meshStandardMaterial color="#334155" roughness={0.35} />
            </mesh>
            {/* 金属极简微拉手 */}
            <mesh position={[0, 0.06, wardrobeD / 2]}>
              <boxGeometry args={[0.12, 0.01, 0.01]} />
              <meshStandardMaterial color="#f59e0b" metalness={0.9} roughness={0.2} />
            </mesh>
          </group>
        ))}
      </group>

      {/* ================= 7. 顶部多段发光尺寸标注对比标尺 ================= */}
      <group position={[0, wardrobeH / 2 + 0.14, wardrobeD / 2]}>
        {/* ① 锁定区标注尺 (高亮金色) */}
        <group position={[slot0X, 0, 0]}>
          <mesh>
            <boxGeometry args={[lockedWM, 0.006, 0.006]} />
            <meshStandardMaterial color="#f59e0b" emissive="#f59e0b" emissiveIntensity={1.5} />
          </mesh>
          {/* 端点竖线 */}
          <mesh position={[-lockedWM / 2, 0, 0]}>
            <boxGeometry args={[0.004, 0.03, 0.004]} />
            <meshStandardMaterial color="#f59e0b" emissive="#f59e0b" emissiveIntensity={1.5} />
          </mesh>
          <mesh position={[lockedWM / 2, 0, 0]}>
            <boxGeometry args={[0.004, 0.03, 0.004]} />
            <meshStandardMaterial color="#f59e0b" emissive="#f59e0b" emissiveIntensity={1.5} />
          </mesh>
        </group>

        {/* ② 均分区标注总线 (亮紫色/品红) */}
        {[slot1X, slot2X, slot3X].map((posX, i) => (
          <group key={`dim-${i}`} position={[posX, 0, 0]}>
            <mesh>
              <boxGeometry args={[avgSlotW * 0.96, 0.005, 0.005]} />
              <meshStandardMaterial color="#d946ef" emissive="#d946ef" emissiveIntensity={1.2} />
            </mesh>
            <mesh position={[-avgSlotW / 2, 0, 0]}>
              <boxGeometry args={[0.003, 0.024, 0.003]} />
              <meshStandardMaterial color="#d946ef" emissive="#d946ef" emissiveIntensity={1.2} />
            </mesh>
            <mesh position={[avgSlotW / 2, 0, 0]}>
              <boxGeometry args={[0.003, 0.024, 0.003]} />
              <meshStandardMaterial color="#d946ef" emissive="#d946ef" emissiveIntensity={1.2} />
            </mesh>
          </group>
        ))}
      </group>
    </group>
  );
};

export const TrimAvgStoryScene: React.FC<TrimAvgStorySceneProps> = (props) => {
  const lockedW = props.lockedW ?? 550;
  const totalNetW = 2400;
  const remainingTotal = totalNetW - lockedW;
  const avgSlotW = Math.round(remainingTotal / 3);

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
          background: 'linear-gradient(135deg, #d946ef0f 0%, #f0abfc1a 100%)',
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
          trimavg(#W, #W1, #W2, ...)
        </h2>
        <div
          style={{
            background: '#ffffff',
            border: '1px solid #f0abfc60',
            padding: '8px 18px',
            borderRadius: '10px',
            fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
            fontSize: '14px',
            fontWeight: 700,
            color: '#c026d3',
            boxShadow: '0 4px 12px -2px #d946ef15',
          }}
        >
          trimavg(#TotalW, #LockedW)
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
            background: 'radial-gradient(circle at 50% 45%, #ffffff 0%, #f8fafc 65%, #fdf4ff 100%)',
          }}
        >
          <Canvas camera={{ position: [0.7, 0.4, 3.6], fov: 42 }} gl={{ antialias: true }}>
            <color attach="background" args={['#fafafa']} />
            <ambientLight intensity={1.2} />
            <directionalLight position={[6, 12, 8]} intensity={1.35} castShadow />
            <directionalLight position={[-6, 6, 4]} intensity={0.65} />
            <directionalLight position={[0, -2, 4]} intensity={0.3} />

            {/* 高定衣柜模型 */}
            <WardrobeTrimAvgMesh {...props} />

            <ContactShadows
              position={[0, -1.16, 0]}
              opacity={0.35}
              scale={7}
              blur={2.4}
              far={3.2}
              color="#334155"
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
              border: '1.5px solid #d946ef',
              padding: '14px 20px',
              borderRadius: '12px',
              boxShadow: '0 6px 20px rgba(217, 70, 239, 0.15)',
              fontSize: '13px',
              color: '#334155',
              minWidth: '380px',
            }}
          >
            <div style={{ fontWeight: 700, color: '#0f172a', marginBottom: '8px', fontSize: '14px' }}>
              柜体总净宽：<code>#TotalW = 2400 mm</code>
            </div>

            {/* 锁定项与扣除 */}
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '8px' }}>
              <span
                style={{
                  background: '#fef3c7',
                  color: '#b45309',
                  padding: '3px 8px',
                  borderRadius: '6px',
                  border: '1px solid #fde68a',
                  fontWeight: 600,
                }}
              >
                🔒 硬性锁定大衣区：{lockedW} mm
              </span>
              <span style={{ background: '#f5f3ff', padding: '3px 8px', borderRadius: '4px', border: '1px solid #ddd6fe' }}>
                待均分净余量：2400 - {lockedW} = <strong>{remainingTotal}</strong> mm
              </span>
            </div>

            {/* trimavg 计算 */}
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
              <span><code>trimavg</code> 剩余 3 仓自适应均分：</span>
              <span
                style={{
                  fontWeight: 800,
                  color: '#a21caf',
                  background: '#fae8ff',
                  padding: '3px 10px',
                  borderRadius: '6px',
                  border: '1px solid #f5d0fe',
                }}
              >
                {avgSlotW} mm / 仓
              </span>
            </div>

            {/* 联动解释 */}
            <div
              style={{
                fontSize: '12px',
                color: '#86198f',
                marginTop: '8px',
                lineHeight: '1.6',
                background: '#fdf4ff',
                padding: '8px 10px',
                borderRadius: '6px',
              }}
            >
              ✦ 无论大衣区是定死 400mm 还是 800mm，<code>trimavg</code> 自动过滤锁定常数项，让右侧短衣区、叠放区、抽屉区像手风琴般精密等宽伸缩，永不挤爆柜体！
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
            ✦ 3D 视口：按住鼠标左键旋转查看长风衣大衣区与各均分仓 · 右键平移 · 滚轮缩放
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
              📖 业务故事：大衣长挂衣区硬性锁定与其余收纳仓自适应均分
            </h4>
            <p
              style={{
                margin: 0,
                fontSize: '13px',
                lineHeight: '1.6',
                color: '#475569',
              }}
            >
              在满墙四门大衣柜中，客户要求必须专门空出一段固定宽度（如 <code>550mm</code>）用来收纳过膝长款风衣与拉杆行李箱。小宇用 <code>trimavg(#TotalW, #LockedW)</code> 智能剔除这个指定锁死的常数项，提取剩余的净空间，自动平摊均分给剩下三组收纳仓（短外套区、多层叠放区、静音抽屉区），实现空间利用率最大化与严丝合缝的自适应排版！
            </p>
          </div>
          <div
            style={{
              fontSize: '13px',
              lineHeight: '1.6',
              color: '#701a75',
              background: '#d946ef0d',
              borderLeft: '3px solid #d946ef',
              padding: '10px 14px',
              borderRadius: '0 8px 8px 0',
            }}
          >
            <strong>💡 工业制造价值：</strong>
            <code>trimavg</code> 是参数化设计中解决“非对称混合约束”的高阶核心工具。它使得定制系统既能满足用户对局部特殊功能格（如保险箱、大衣区、嵌入式蒸烤箱）的死尺寸要求，又能让其余大面积标准柜门与层板保持完全均等对称，避免机械死板的均分导致的尺寸冲突。
          </div>
        </div>
      </div>
    </div>
  );
};
