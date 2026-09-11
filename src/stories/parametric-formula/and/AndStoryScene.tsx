import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, ContactShadows } from '@react-three/drei';

export interface AndStorySceneProps {
  h?: number;
  w?: number;
}

/**
 * 3D 柜体与半开门板模型
 */
const WardrobeDoorMesh: React.FC<AndStorySceneProps> = ({
  h = 2500,
  w = 550,
}) => {
  // 转换米制比例 (例如 2500mm -> 2.5m, 550mm -> 0.55m)
  const doorH = Math.max(1.6, Math.min(2.8, h / 1000));
  const doorW = Math.max(0.35, Math.min(0.75, w / 1000));
  const doorThick = 0.022; // 22mm 门板

  const cabinetD = 0.6;
  const cabinetW = doorW + 0.1; // 柜体稍宽于门板
  const cabinetH = doorH + 0.06;
  const boardThick = 0.03;

  // 严格 and 逻辑判断：高度 >= 2400 且 门宽 >= 500
  const isOverHeight = h >= 2400;
  const isOverWidth = w >= 500;
  const isReinforced = isOverHeight && isOverWidth;

  // 铰链位置计算：未超限 3 铰链；超限触发 5 铰链
  const hingeCount = isReinforced ? 5 : 3;
  const hingeYs = isReinforced
    ? [
        doorH / 2 - 0.12,
        doorH / 2 - 0.28,
        0,
        -doorH / 2 + 0.28,
        -doorH / 2 + 0.12,
      ]
    : [
        doorH / 2 - 0.15,
        0,
        -doorH / 2 + 0.15,
      ];

  // 门板半开角度 (约 45 度，能同时清晰看清正面、背面与侧边铰链)
  const doorOpenAngle = -0.78;

  return (
    <group position={[0, -0.1, 0]}>
      {/* ================= 1. 衣柜柜体主体 (暖白木纹、清爽通透) ================= */}
      <group position={[0, 0, 0]}>
        {/* 柜体顶板 */}
        <mesh position={[0, cabinetH / 2 - boardThick / 2, 0]}>
          <boxGeometry args={[cabinetW, boardThick, cabinetD]} />
          <meshStandardMaterial color="#ede4d8" roughness={0.3} />
        </mesh>
        {/* 柜体底板 */}
        <mesh position={[0, -cabinetH / 2 + boardThick / 2, 0]}>
          <boxGeometry args={[cabinetW, boardThick, cabinetD]} />
          <meshStandardMaterial color="#ede4d8" roughness={0.3} />
        </mesh>
        {/* 柜体左侧板 (铰链安装侧) */}
        <mesh position={[-cabinetW / 2 + boardThick / 2, 0, 0]}>
          <boxGeometry args={[boardThick, cabinetH, cabinetD]} />
          <meshStandardMaterial color="#dfd3c3" roughness={0.35} />
        </mesh>
        {/* 柜体右侧板 */}
        <mesh position={[cabinetW / 2 - boardThick / 2, 0, 0]}>
          <boxGeometry args={[boardThick, cabinetH, cabinetD]} />
          <meshStandardMaterial color="#dfd3c3" roughness={0.35} />
        </mesh>
        {/* 浅米细布纹背板 */}
        <mesh position={[0, 0, -cabinetD / 2 + 0.01]}>
          <boxGeometry args={[cabinetW - boardThick * 2, cabinetH - boardThick * 2, 0.016]} />
          <meshStandardMaterial color="#f6f2eb" roughness={0.5} />
        </mesh>

        {/* 柜内精美结构：上层叠衣层板 + 横向香槟金金属挂衣杆 */}
        <mesh position={[0, doorH * 0.3, 0]}>
          <boxGeometry args={[cabinetW - boardThick * 2, boardThick, cabinetD - 0.04]} />
          <meshStandardMaterial color="#ede4d8" roughness={0.3} />
        </mesh>
        {/* 金属挂衣杆 */}
        <mesh position={[0, doorH * 0.18, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.015, 0.015, cabinetW - boardThick * 2 - 0.02, 16]} />
          <meshStandardMaterial color="#d4af37" metalness={0.9} roughness={0.15} />
        </mesh>
      </group>

      {/* ================= 2. 铰链连接系统 (固定在柜体侧板前沿) ================= */}
      <group position={[-cabinetW / 2 + boardThick, 0, cabinetD / 2 - 0.02]}>
        {hingeYs.map((y, idx) => (
          <group key={`hinge-${idx}`} position={[0, y, 0]}>
            {/* 铰链底座 (固定在侧板) */}
            <mesh position={[-0.01, 0, 0]}>
              <boxGeometry args={[0.018, 0.048, 0.035]} />
              <meshStandardMaterial color="#64748b" metalness={0.9} roughness={0.2} />
            </mesh>
            {/* 铰链转臂与缓冲阻尼液压缸 */}
            <mesh position={[0.008, 0, 0.01]}>
              <boxGeometry args={[0.022, 0.028, 0.028]} />
              <meshStandardMaterial
                color={isReinforced ? '#f59e0b' : '#94a3b8'}
                metalness={0.92}
                roughness={0.15}
              />
            </mesh>
          </group>
        ))}
      </group>

      {/* ================= 3. 半开的高定大单门门板 (旋转枢轴位于左侧铰链轴线) ================= */}
      <group position={[-cabinetW / 2 + boardThick, 0, cabinetD / 2 - 0.01]}>
        <group rotation={[0, doorOpenAngle, 0]}>
          {/* 门板本体 (高雅肤感奶白，边缘精细微倒角) */}
          <mesh position={[doorW / 2, 0, doorThick / 2]}>
            <boxGeometry args={[doorW, doorH, doorThick]} />
            <meshStandardMaterial color="#fdfbf7" roughness={0.28} />
          </mesh>

          {/* 门板正面：极简内嵌香槟金通长竖拉手 */}
          <mesh position={[doorW - 0.03, 0, doorThick + 0.008]}>
            <boxGeometry args={[0.014, doorH * 0.45, 0.016]} />
            <meshStandardMaterial color="#f59e0b" metalness={0.92} roughness={0.15} />
          </mesh>

          {/* 门板背面安装的铰链臂连接件 */}
          {hingeYs.map((y, idx) => (
            <mesh key={`door-hinge-plate-${idx}`} position={[0.035, y, -0.002]}>
              <boxGeometry args={[0.045, 0.04, 0.006]} />
              <meshStandardMaterial
                color={isReinforced ? '#f59e0b' : '#64748b'}
                metalness={0.9}
                roughness={0.2}
              />
            </mesh>
          ))}

          {/* ================= 4. 核心：AND 双条件同时满足时触发的【通顶金属拉直器】 ================= */}
          {isReinforced && (
            <group position={[doorW * 0.58, 0, -0.003]}>
              {/* 开槽内嵌拉直器铝合金主型材 (贯穿门板 92% 高度) */}
              <mesh>
                <boxGeometry args={[0.024, doorH * 0.92, 0.01]} />
                <meshStandardMaterial
                  color="#f59e0b"
                  metalness={0.92}
                  roughness={0.15}
                  emissive="#f59e0b"
                  emissiveIntensity={0.25}
                />
              </mesh>

              {/* 上部双向调平调节六角螺栓盒 */}
              <group position={[0, (doorH * 0.92) / 2 - 0.06, 0.003]}>
                <mesh>
                  <cylinderGeometry args={[0.022, 0.022, 0.012, 24]} rotation={[Math.PI / 2, 0, 0]} />
                  <meshStandardMaterial color="#b45309" metalness={0.95} roughness={0.1} />
                </mesh>
                <mesh position={[0, 0, 0.006]}>
                  <cylinderGeometry args={[0.01, 0.01, 0.006, 6]} rotation={[Math.PI / 2, 0, 0]} />
                  <meshStandardMaterial color="#fbbf24" metalness={0.95} roughness={0.1} />
                </mesh>
              </group>

              {/* 下部双向调平调节六角螺栓盒 */}
              <group position={[0, -(doorH * 0.92) / 2 + 0.06, 0.003]}>
                <mesh>
                  <cylinderGeometry args={[0.022, 0.022, 0.012, 24]} rotation={[Math.PI / 2, 0, 0]} />
                  <meshStandardMaterial color="#b45309" metalness={0.95} roughness={0.1} />
                </mesh>
                <mesh position={[0, 0, 0.006]}>
                  <cylinderGeometry args={[0.01, 0.01, 0.006, 6]} rotation={[Math.PI / 2, 0, 0]} />
                  <meshStandardMaterial color="#fbbf24" metalness={0.95} roughness={0.1} />
                </mesh>
              </group>

              {/* 拉直器发光点缀（强调工艺精工科技感） */}
              <pointLight position={[0, 0, 0.1]} intensity={0.9} color="#f59e0b" distance={1.2} />
            </group>
          )}
        </group>
      </group>
    </group>
  );
};

export const AndStoryScene: React.FC<AndStorySceneProps> = (props) => {
  const h = props.h ?? 2500;
  const w = props.w ?? 550;

  const isOverHeight = h >= 2400;
  const isOverWidth = w >= 500;
  const isReinforced = isOverHeight && isOverWidth;

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
          background: 'linear-gradient(135deg, #f59e0b0f 0%, #fbbf241a 100%)',
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
          条件1 and 条件2
        </h2>
        <div
          style={{
            background: '#ffffff',
            border: '1px solid #fbbf2460',
            padding: '8px 18px',
            borderRadius: '10px',
            fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
            fontSize: '14px',
            fontWeight: 700,
            color: '#f59e0b',
            boxShadow: '0 4px 12px -2px #f59e0b15',
          }}
        >
          #H &gt;= 2400 and #W &gt;= 500
        </div>
      </div>

      {/* 3D 交互画布区域 */}
      <div style={{ flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column' }}>
        <div
          style={{
            flex: 1,
            minHeight: 0,
            width: '100%',
            position: 'relative',
            background: isReinforced
              ? 'radial-gradient(circle at 50% 45%, #ffffff 0%, #fef3c730 65%, #f59e0b18 100%)'
              : 'radial-gradient(circle at 50% 45%, #ffffff 0%, #f8fafc 70%, #f1f5f9 100%)',
            transition: 'background 0.4s ease',
          }}
        >
          <Canvas camera={{ position: [0.3, 0.1, 4.4], fov: 42 }} gl={{ antialias: true }}>
            <color attach="background" args={['#fafafa']} />
            <ambientLight intensity={1.1} />
            <directionalLight position={[6, 10, 8]} intensity={1.3} castShadow />
            <directionalLight position={[-6, 5, 4]} intensity={0.7} />
            <directionalLight position={[0, -4, 3]} intensity={0.3} />

            {/* 柜门主体与拉直器五金 */}
            <WardrobeDoorMesh {...props} />

            <ContactShadows
              position={[0, -1.45, 0]}
              opacity={0.4}
              scale={8}
              blur={2.2}
              far={3.5}
              color={isReinforced ? '#d97706' : '#64748b'}
            />
            <OrbitControls target={[0, 0, 0]} enableZoom={true} maxPolarAngle={Math.PI / 2 + 0.04} />
          </Canvas>

          {/* 实时状态浮窗 */}
          <div
            style={{
              position: 'absolute',
              top: '16px',
              left: '20px',
              background: 'rgba(255, 255, 255, 0.96)',
              backdropFilter: 'blur(12px)',
              border: isReinforced ? '1.5px solid #f59e0b' : '1px solid #e2e8f0',
              padding: '14px 20px',
              borderRadius: '12px',
              boxShadow: isReinforced ? '0 6px 20px rgba(245, 158, 11, 0.2)' : '0 4px 14px rgba(0,0,0,0.06)',
              fontSize: '13px',
              color: '#334155',
              minWidth: '330px',
            }}
          >
            <div style={{ fontWeight: 700, color: '#0f172a', marginBottom: '8px', fontSize: '14px' }}>
              当前门板尺寸：高度 <code>#H = {h}mm</code> · 宽度 <code>#W = {w}mm</code>
            </div>

            {/* 拆解两个条件 */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', marginBottom: '8px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>条件 1：超高 <code>#H &gt;= 2400</code></span>
                <span style={{ fontWeight: 700, color: isOverHeight ? '#16a34a' : '#dc2626' }}>
                  {isOverHeight ? '✓ 满足 (真)' : '✗ 不满足 (假)'}
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>条件 2：超宽 <code>#W &gt;= 500</code></span>
                <span style={{ fontWeight: 700, color: isOverWidth ? '#16a34a' : '#dc2626' }}>
                  {isOverWidth ? '✓ 满足 (真)' : '✗ 不满足 (假)'}
                </span>
              </div>
            </div>

            {/* AND 终判 */}
            <div
              style={{
                display: 'flex',
                gap: '8px',
                alignItems: 'center',
                borderTop: '1px dashed #e2e8f0',
                paddingTop: '8px',
                marginTop: '4px',
              }}
            >
              <span><code>and</code> 逻辑与终判：</span>
              <span
                style={{
                  fontWeight: 800,
                  color: isReinforced ? '#b45309' : '#64748b',
                  background: isReinforced ? '#fef3c7' : '#f1f5f9',
                  padding: '3px 10px',
                  borderRadius: '6px',
                  border: isReinforced ? '1px solid #fde68a' : '1px solid #e2e8f0',
                }}
              >
                {isReinforced ? 'True（同时满足，加固激活）' : 'False（任一不满足，无需加固）'}
              </span>
            </div>

            {/* 动作描述 */}
            <div
              style={{
                fontSize: '12px',
                color: isReinforced ? '#b45309' : '#64748b',
                marginTop: '6px',
                lineHeight: '1.6',
              }}
            >
              {isReinforced
                ? '🛡️ 双重超限高危！门背开槽加装【通顶拉直器】+ 升级【5 个重型铰链】防下垂！'
                : '✓ 轻量安全标准：门板受力在公差内，保持标准【3 个铰链】，免开槽省成本。'}
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
            ✦ 3D 视口：按住鼠标左键旋转查看门背拉直器 · 右键平移 · 滚轮缩放
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
              📖 业务故事：极简一门到顶大单门的抗翘曲“双限保护”
            </h4>
            <p
              style={{
                margin: 0,
                fontSize: '13px',
                lineHeight: '1.6',
                color: '#475569',
              }}
            >
              高定极简一门到顶大衣柜极具美感，但大门板容易因受潮变形弓起。为什么必须用 <code>and</code>？若门板很高但极窄（如 350mm），受力面窄不易翘；若门板较宽但很矮（如 1.5m 矮柜），自重短也不翘。<strong>只有“超高（#H≥2400）且超宽（#W≥500）”同时发生时</strong>，系统才强制介入拉直器并升级 5 铰链。试着单独把一个参数拖小，观察拉直器的智能消隐。
            </p>
          </div>
          <div
            style={{
              fontSize: '13px',
              lineHeight: '1.6',
              color: '#334155',
              background: '#f59e0b0d',
              borderLeft: '3px solid #f59e0b',
              padding: '10px 14px',
              borderRadius: '0 8px 8px 0',
            }}
          >
            <strong>💡 工业制造价值：</strong>
            <code>and</code> 是严谨的“交集风控”。既避免了在非危险场景滥装拉直器（增加开槽工时与五金成本），又在真正的形变高发区死守力学安全底线，实现质量与成本的最优平衡。
          </div>
        </div>
      </div>
    </div>
  );
};
