import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, ContactShadows } from '@react-three/drei';

export interface RoundStorySceneProps {
  rawVal?: number;
}

/**
 * 方案一：高定 CNC 数控精密切割工作台模型
 * 业务核心：round(#PanelSize, 1)
 * 前端 3D 自由交互产生的任意浮点数毛刺尺寸（如 485.625mm），
 * 通过四舍五入瞬间卡位为工业制造标准公差 485.6mm（或 1mm 整数 486mm）。
 * 3D 场景内：精密工业铝型材工作台、高定板件、激光红外准直对齐线、高精度合金钨钢锯片。
 */
const CncCuttingTableMesh: React.FC<RoundStorySceneProps> = ({
  rawVal = 485.625,
}) => {
  // 精确四舍五入到 0.1mm (保留一位小数)
  const roundedMm = Math.round(rawVal * 10) / 10;
  // 整数 1mm
  const roundedIntMm = Math.round(rawVal);
  // 毛刺偏差微米值
  const diffMm = (rawVal - roundedMm).toFixed(3);

  // 尺寸换算（米为单位）
  // 假定基准宽度约 0.48m，板件长度 1.1m，板厚 18mm (0.018m)
  const panelWM = roundedMm / 1000;
  const rawPanelWM = rawVal / 1000;
  const panelLM = 1.1;
  const panelThickM = 0.022;

  // 工作台尺寸
  const tableWM = 1.6;
  const tableLM = 1.4;
  const tableH = 0.68;
  const tableTopY = -0.15;

  return (
    <group position={[0, 0, 0]}>
      {/* ================= 0. 数字化车间地面环境 ================= */}
      {/* 调整地面位置在 -0.85，并与阴影微分离以彻底消除 Z-fighting 闪烁 */}
      <mesh position={[0, -0.85, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[8, 8]} />
        <meshStandardMaterial color="#f1f5f9" roughness={0.8} />
      </mesh>

      {/* ================= 1. CNC 数控裁板加工中心工作台 ================= */}
      <group position={[0, tableTopY, 0]}>
        {/* ① 工业工作台面 (现代高精亮银阳极氧化铝合金台面) */}
        <mesh position={[0, -0.02, 0]}>
          <boxGeometry args={[tableWM, 0.04, tableLM]} />
          <meshStandardMaterial color="#cbd5e1" metalness={0.85} roughness={0.3} />
        </mesh>

        {/* 台面上的高精度不锈钢导轨滑槽 (质感冷灰金属线) */}
        {[-0.5, 0, 0.5].map((xPos, idx) => (
          <mesh key={`groove-${idx}`} position={[xPos, 0.001, 0]}>
            <boxGeometry args={[0.018, 0.004, tableLM - 0.04]} />
            <meshStandardMaterial color="#64748b" metalness={0.9} roughness={0.2} />
          </mesh>
        ))}

        {/* ② 工业工作台 4 根刚性方钢支腿 (现代工业浅灰白) */}
        {[
          [-tableWM / 2 + 0.08, -tableLM / 2 + 0.08],
          [tableWM / 2 - 0.08, -tableLM / 2 + 0.08],
          [-tableWM / 2 + 0.08, tableLM / 2 - 0.08],
          [tableWM / 2 - 0.08, tableLM / 2 - 0.08],
        ].map(([xPos, zPos], idx) => (
          <mesh key={`leg-${idx}`} position={[xPos, -tableH / 2 - 0.02, zPos]}>
            <boxGeometry args={[0.06, tableH, 0.06]} />
            <meshStandardMaterial color="#94a3b8" metalness={0.65} roughness={0.35} />
          </mesh>
        ))}

        {/* ③ 桌面中央固定式合金圆锯片与切槽缝 (台锯标准结构：锯片位置绝对固定在 X = 0) */}
        {/* 台面正中下陷锯缝 */}
        <mesh position={[0, 0.001, 0]}>
          <boxGeometry args={[0.012, 0.003, tableLM * 0.9]} />
          <meshStandardMaterial color="#0f172a" roughness={0.5} />
        </mesh>
        {/* 工作台正中固定露出的钨钢合金圆锯片 */}
        <group position={[0, 0.05, 0.05]}>
          <mesh rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.09, 0.09, 0.004, 32]} />
            <meshStandardMaterial color="#cbd5e1" metalness={0.95} roughness={0.15} />
          </mesh>
          <mesh rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.03, 0.03, 0.016, 16]} />
            <meshStandardMaterial color="#475569" metalness={0.9} roughness={0.2} />
          </mesh>
        </group>

        {/* 固定在锯片正上方的红外激光对准器 (投影在锯缝中心 X = 0) */}
        <group position={[0, 0.4, 0]}>
          <mesh position={[0, 0.02, 0]}>
            <boxGeometry args={[0.03, 0.025, tableLM * 0.8]} />
            <meshStandardMaterial color="#64748b" metalness={0.8} roughness={0.3} />
          </mesh>
          <mesh position={[0, -0.01, 0]}>
            <cylinderGeometry args={[0.01, 0.012, 0.03, 16]} />
            <meshStandardMaterial color="#334155" metalness={0.9} roughness={0.1} />
          </mesh>
          {/* 向下直射的红外激光线 */}
          <mesh position={[0, -0.19, 0]}>
            <planeGeometry args={[0.002, 0.36]} />
            <meshBasicMaterial color="#14b8a6" transparent opacity={0.45} />
          </mesh>
        </group>

        {/* ================= 2. 真实推台锯工作原理：锯片在 X=0，板件右侧被切，左侧靠尺决定板宽 ================= */}
        {(() => {
          // 锯片中心固定在 X = 0。被裁切出的标准板件右边缘固定在 X = 0。
          // 所以板件左边缘在 X = -panelWM，中心在 X = -panelWM / 2。
          const panelCenterX = -panelWM / 2;
          const rawPanelCenterX = -rawPanelWM / 2;
          const fenceX = -panelWM - 0.018; // 数控定位靠尺紧贴板件左侧

          return (
            <group position={[0, 0, 0]}>
              {/* ① 数控伺服电机驱动的精密定位靠尺 (随设定宽度 #PanelSize 移动定规) */}
              <group position={[fenceX, 0.03, 0]}>
                <mesh>
                  <boxGeometry args={[0.036, 0.06, tableLM * 0.95]} />
                  <meshStandardMaterial color="#94a3b8" metalness={0.9} roughness={0.2} />
                </mesh>
                {/* 靠尺刻度镶嵌金线 */}
                <mesh position={[0.017, 0.015, 0]}>
                  <boxGeometry args={[0.002, 0.01, tableLM * 0.9]} />
                  <meshStandardMaterial color="#0d9488" emissive="#0d9488" emissiveIntensity={0.8} />
                </mesh>
              </group>

              {/* ② 标准高定饰面板 (右边沿对准锯片 X=0 进行裁切) */}
              <mesh position={[panelCenterX, panelThickM / 2, 0]}>
                <boxGeometry args={[panelWM, panelThickM, panelLM]} />
                <meshStandardMaterial color="#ede4d8" roughness={0.4} />
              </mesh>

              {/* 锯切边上的激光对准发光线 (X = 0) */}
              <mesh position={[0, panelThickM + 0.002, 0]}>
                <boxGeometry args={[0.003, 0.002, panelLM]} />
                <meshStandardMaterial color="#14b8a6" emissive="#14b8a6" emissiveIntensity={2.5} />
              </mesh>

              {/* ③ 原始随意拖拽的毛刺尺寸虚影 (对比：多出的微米碎屑) */}
              {Math.abs(rawVal - roundedMm) > 0.001 && (
                <mesh position={[rawPanelCenterX, panelThickM / 2 + 0.001, 0]}>
                  <boxGeometry args={[rawPanelWM, panelThickM + 0.002, panelLM * 1.002]} />
                  <meshStandardMaterial color="#f43f5e" wireframe transparent opacity={0.35} />
                </mesh>
              )}

              {/* ④ 悬浮高精度数控测量标注尺 (标出当前靠尺到锯片的距离) */}
              <group position={[panelCenterX, panelThickM + 0.06, panelLM / 2 + 0.06]}>
                {/* 标注横杆 */}
                <mesh position={[0, 0, 0]}>
                  <boxGeometry args={[panelWM, 0.005, 0.005]} />
                  <meshStandardMaterial color="#0d9488" emissive="#0d9488" emissiveIntensity={0.8} />
                </mesh>
                {/* 左右端点刻度竖线 */}
                <mesh position={[-panelWM / 2, 0, 0]}>
                  <boxGeometry args={[0.005, 0.025, 0.005]} />
                  <meshStandardMaterial color="#0d9488" emissive="#0d9488" emissiveIntensity={0.8} />
                </mesh>
                <mesh position={[panelWM / 2, 0, 0]}>
                  <boxGeometry args={[0.005, 0.025, 0.005]} />
                  <meshStandardMaterial color="#0d9488" emissive="#0d9488" emissiveIntensity={0.8} />
                </mesh>
              </group>
            </group>
          );
        })()}
      </group>
    </group>
  );
};

export const RoundStoryScene: React.FC<RoundStorySceneProps> = (props) => {
  const rawVal = props.rawVal ?? 485.625;
  const rounded1 = Math.round(rawVal * 10) / 10;
  const rounded0 = Math.round(rawVal);
  const diffMicron = ((rawVal - rounded1) * 1000).toFixed(1);

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
          background: 'linear-gradient(135deg, #14b8a60f 0%, #5eead41a 100%)',
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
          round(#A, 2)
        </h2>
        <div
          style={{
            background: '#ffffff',
            border: '1px solid #5eead460',
            padding: '8px 18px',
            borderRadius: '10px',
            fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
            fontSize: '14px',
            fontWeight: 700,
            color: '#0f766e',
            boxShadow: '0 4px 12px -2px #14b8a615',
          }}
        >
          round(#PanelSize, 1)
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
            background: 'radial-gradient(circle at 50% 45%, #ffffff 0%, #f8fafc 65%, #f0fdfa 100%)',
          }}
        >
          <Canvas camera={{ position: [0.9, 0.8, 2.3], fov: 42 }} gl={{ antialias: true }}>
            <color attach="background" args={['#fafafa']} />
            <ambientLight intensity={1.5} />
            <directionalLight position={[6, 12, 8]} intensity={1.6} castShadow />
            <directionalLight position={[-6, 8, 4]} intensity={0.9} />
            <directionalLight position={[0, -2, 4]} intensity={0.4} />

            {/* CNC 数控开料裁板工作台模型 */}
            <CncCuttingTableMesh {...props} />

            <ContactShadows
              position={[0, -0.848, 0]}
              opacity={0.35}
              scale={6}
              blur={2.4}
              far={2.5}
              color="#334155"
            />
            <OrbitControls target={[0, -0.05, 0]} enableZoom={true} maxPolarAngle={Math.PI / 2 + 0.04} />
          </Canvas>

          {/* 实时状态悬浮卡片 */}
          <div
            style={{
              position: 'absolute',
              top: '16px',
              left: '20px',
              background: 'rgba(255, 255, 255, 0.96)',
              backdropFilter: 'blur(12px)',
              border: '1.5px solid #14b8a6',
              padding: '14px 20px',
              borderRadius: '12px',
              boxShadow: '0 6px 20px rgba(20, 184, 166, 0.15)',
              fontSize: '13px',
              color: '#334155',
              minWidth: '360px',
            }}
          >
            <div style={{ fontWeight: 700, color: '#0f172a', marginBottom: '8px', fontSize: '14px' }}>
              3D 随意拖拽毛刺尺寸：
              <code style={{ background: '#fef2f2', color: '#b91c1c', padding: '2px 6px', borderRadius: '4px', border: '1px solid #fecaca' }}>
                #PanelSize = {rawVal} mm
              </code>
            </div>

            {/* round 精确规整计算 */}
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
              <span><code>round</code> 数控激光规整尺寸：</span>
              <span
                style={{
                  fontWeight: 800,
                  color: '#0f766e',
                  background: '#ccfbf1',
                  padding: '3px 10px',
                  borderRadius: '6px',
                  border: '1px solid #99f6e4',
                }}
              >
                {rounded1} mm
              </span>
              <span style={{ fontSize: '12px', color: '#64748b' }}>
                (保留 1 位小数)
              </span>
            </div>

            {/* 规整成整数对比 */}
            <div style={{ fontSize: '12px', color: '#475569', marginTop: '6px' }}>
              若生产开料规整为整毫米：<code>round({rawVal}, 0) = {rounded0} mm</code>
            </div>

            {/* 工业公差说明 */}
            <div
              style={{
                fontSize: '12px',
                color: '#0f766e',
                marginTop: '8px',
                lineHeight: '1.6',
                background: '#f0fdfa',
                padding: '8px 10px',
                borderRadius: '6px',
              }}
            >
              ✦ 激光校正仪自动抹除 <strong>{diffMicron} μm</strong> 浮点毛刺！消除微米级累积公差，杜绝数控机床崩边与排钻孔错位。
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
            ✦ 3D 视口：按住鼠标左键旋转观察钨钢合金锯片与激光对齐面 · 右键平移 · 滚轮缩放
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
              📖 业务故事：数控开料机与激光封边机标准公差对齐
            </h4>
            <p
              style={{
                margin: 0,
                fontSize: '13px',
                lineHeight: '1.6',
                color: '#475569',
              }}
            >
              设计师在前端 3D 场景中随意拖拽柜板，或者经过多级缩放、比例划分后，板件宽度往往会产生诸如 <code>485.625mm</code> 这类带有微米级小数碎屑的浮点数。若把这种毛刺图纸直接发给工厂，开料锯与数控排钻机无法识别微米碎屑。小宇通过 <code>round(#PanelSize, 1)</code> 瞬间规整为 <strong>485.6mm</strong>（或 <code>round(#PanelSize, 0) = 486mm</code>），与工业生产加工公差完美无缝契合！
            </p>
          </div>
          <div
            style={{
              fontSize: '13px',
              lineHeight: '1.6',
              color: '#134e4a',
              background: '#14b8a60d',
              borderLeft: '3px solid #14b8a6',
              padding: '10px 14px',
              borderRadius: '0 8px 8px 0',
            }}
          >
            <strong>💡 工业制造价值：</strong>
            <code>round</code> 是连接“前端自由设计”与“后端自动化柔性生产”的精密桥梁。它消除了计算机图形学中的微米浮点噪声，确保下料清单、BOM 物料表、ERP 成本核算以及数控机床开料锯的绝对规整与一致性。
          </div>
        </div>
      </div>
    </div>
  );
};
