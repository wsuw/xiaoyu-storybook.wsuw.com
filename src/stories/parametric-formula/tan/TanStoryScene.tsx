import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

export interface TanStorySceneProps {
  stairAngle?: number;
}

/**
 * 家装最经典、最具几何美感与实用价值的现代豪宅场景：
 * 【现代实木楼梯下阶梯式多功能收纳一体柜】
 *
 * 核心数学与参数化几何：
 * - 底边总跨度 L = 4 * 门宽(StepW, 400mm) = 1600mm
 * - 倾斜坡度角 θ (25° ~ 42°)
 * - 每一级阶梯柜高度增量：ΔH = StepW * tan(θ)
 * - 4 组阶梯柜高度：H1 = 1*ΔH, H2 = 2*ΔH, H3 = 3*ΔH, H4 = 4*ΔH
 * - 楼梯踏步板直接铺设于阶梯柜上方，踏面宽与柜宽严格整数倍对应，几何极为纯粹工整！
 */
const LuxuryStaircaseStorage: React.FC<TanStorySceneProps> = ({
  stairAngle = 32,
}) => {
  // 限制坡度角在 26° ~ 40° 之间，确保家装人机工程学真实比例
  const clampedAngle = Math.min(Math.max(stairAngle, 26), 40);
  const rad = (clampedAngle * Math.PI) / 180;
  const tanVal = Math.tan(rad);

  // 基础规格 (单位: 米)
  const numUnits = 4;
  const unitW = 0.4; // 每组柜子宽度 400mm
  const totalW = numUnits * unitW; // 1.6m
  const depth = 0.6; // 柜体与楼梯深度 600mm
  const floorY = -0.75; // 室内地面高度

  // 每一级门板高度递进：ΔH = unitW * tan(rad)
  const deltaH = unitW * tanVal;
  const totalH = totalW * tanVal; // 最右侧最高点高度

  // 每组柜顶设有 2 级实木楼梯踏步（共 8 级踏步，每级踏宽 200mm）
  const stepsPerUnit = 2;
  const totalSteps = numUnits * stepsPerUnit; // 8 级
  const treadRun = totalW / totalSteps; // 0.2m = 200mm 踏宽
  const riserHeight = treadRun * tanVal; // 每级踏步高度 200 * tan(θ)
  const treadThick = 0.035; // 35mm 加厚高定原木踏板

  return (
    <group position={[-totalW / 2 + 0.1, 0, 0]}>
      {/* ================= 0. 空间环境：温馨室内大平层背景墙与人字拼实木地板 ================= */}
      {/* 背景浅暖灰高定乳胶漆墙面 */}
      <mesh position={[totalW / 2 + 0.1, 0.45, -depth / 2 - 0.04]}>
        <boxGeometry args={[3.6, 2.6, 0.04]} />
        <meshStandardMaterial color="#f8fafc" roughness={0.5} />
      </mesh>
      {/* 极简深灰踢脚线 */}
      <mesh position={[totalW / 2 + 0.1, floorY + 0.03, -depth / 2 - 0.015]}>
        <boxGeometry args={[3.6, 0.06, 0.01]} />
        <meshStandardMaterial color="#cbd5e1" roughness={0.3} />
      </mesh>
      {/* 温馨人字拼实木地板地面 */}
      <mesh position={[totalW / 2 + 0.1, floorY - 0.005, 0.4]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[3.8, 2.8]} />
        <meshStandardMaterial color="#ebe5df" roughness={0.65} />
      </mesh>

      {/* ================= 1. 楼梯下方 4 组阶梯式极简高定收纳柜 ================= */}
      {Array.from({ length: numUnits }).map((_, i) => {
        const unitX = i * unitW + unitW / 2;
        // 核心公式：H_i = (i + 1) * deltaH
        const currentH = (i + 1) * deltaH;
        const currentCenterY = floorY + currentH / 2;

        return (
          <group key={`unit-${i}`} position={[unitX, currentCenterY, 0]}>
            {/* 柜体侧板与背板框架 (浅木纹内胆) */}
            <mesh position={[0, 0, 0]}>
              <boxGeometry args={[unitW - 0.008, currentH, depth]} />
              <meshStandardMaterial color="#ded7cc" roughness={0.4} />
            </mesh>

            {/* 高定象牙白肤感门板 (前脸平整大板，留 2mm 微缝) */}
            <mesh position={[0, 0, depth / 2 + 0.008]}>
              <boxGeometry args={[unitW - 0.014, currentH - 0.01, 0.018]} />
              <meshStandardMaterial color="#fdfbf7" roughness={0.25} />
            </mesh>

            {/* 门板五金与抽屉分缝 */}
            {i < 2 ? (
              // 第 1、2 组矮柜：双层分类换鞋抽屉 (大抽屉横缝 + 哑光暖橙嵌入拉手)
              <>
                <mesh position={[0, 0, depth / 2 + 0.018]}>
                  <boxGeometry args={[unitW - 0.03, 0.002, 0.002]} />
                  <meshBasicMaterial color="#cbd5e1" />
                </mesh>
                <mesh position={[0, currentH / 4, depth / 2 + 0.02]}>
                  <boxGeometry args={[0.1, 0.008, 0.006]} />
                  <meshStandardMaterial color="#ea580c" metalness={0.9} roughness={0.15} />
                </mesh>
                <mesh position={[0, -currentH / 4, depth / 2 + 0.02]}>
                  <boxGeometry args={[0.1, 0.008, 0.006]} />
                  <meshStandardMaterial color="#ea580c" metalness={0.9} roughness={0.15} />
                </mesh>
              </>
            ) : (
              // 第 3、4 组高柜：通高单开大衣柜/家政杂物柜 (高定侧装金色极细长拉手)
              <mesh position={[unitW / 2 - 0.025, 0, depth / 2 + 0.02]}>
                <boxGeometry args={[0.01, Math.min(currentH * 0.6, 0.75), 0.008]} />
                <meshStandardMaterial color="#ea580c" metalness={0.9} roughness={0.15} />
              </mesh>
            )}
          </group>
        );
      })}

      {/* ================= 2. 纯粹实木楼梯踏步大板系统 (4 级整体大板，与 4 组柜顶 100% 满铺贴合) ================= */}
      {Array.from({ length: numUnits }).map((_, i) => {
        const stepX = i * unitW + unitW / 2;
        // 踏步高度严格等于柜体高度：Y = floorY + (i + 1) * deltaH
        const currentH = (i + 1) * deltaH;
        const stepY = floorY + currentH;

        return (
          <group key={`step-${i}`} position={[stepX, stepY, 0]}>
            {/* 满铺加厚天然白蜡木实木踏面板 (宽度等于整扇门宽 unitW + 挑出，完整封住整扇柜顶！) */}
            <mesh position={[0, treadThick / 2, 0]}>
              <boxGeometry args={[unitW + 0.015, treadThick, depth + 0.05]} />
              <meshStandardMaterial color="#d4b996" roughness={0.35} />
            </mesh>

            {/* 踏板前端悬挑下方感应式极细暖光线性微灯带 */}
            <mesh position={[0, 0, depth / 2 + 0.024]}>
              <boxGeometry args={[unitW, 0.004, 0.008]} />
              <meshStandardMaterial color="#ffffff" emissive="#fef08a" emissiveIntensity={1.8} />
            </mesh>
          </group>
        );
      })}

      {/* ================= 3. 极简透光玻璃护栏与原木扶手压边 ================= */}
      {/* 玻璃护栏斜梁总斜边跨长 */}
      {(() => {
        const hypLen = totalW / Math.cos(rad);
        return (
          <group position={[0, floorY, 0]} rotation={[0, 0, rad]}>
            {/* 现代极简透光玻璃护栏板 */}
            <mesh position={[hypLen / 2, 0.45, depth / 2 + 0.02]}>
              <boxGeometry args={[hypLen + 0.06, 0.82, 0.012]} />
              <meshPhysicalMaterial
                color="#ffffff"
                transmission={0.92}
                opacity={0.3}
                transparent
                roughness={0.08}
                ior={1.5}
              />
            </mesh>

            {/* 胡桃木实木扶手顶面极简收口压条 */}
            <mesh position={[hypLen / 2, 0.88, depth / 2 + 0.02]}>
              <boxGeometry args={[hypLen + 0.06, 0.032, 0.022]} />
              <meshStandardMaterial color="#78350f" roughness={0.3} />
            </mesh>
          </group>
        );
      })()}

      {/* ================= 4. 直角三角形数学几何标尺：tan(θ) = 对边H / 邻边L ================= */}
      {/* ① 直角三角形水平底边 L (青色发光线，总开间 1.6m) */}
      <mesh position={[totalW / 2, floorY + 0.01, depth / 2 + 0.05]}>
        <boxGeometry args={[totalW, 0.006, 0.006]} />
        <meshStandardMaterial color="#0284c7" emissive="#0284c7" emissiveIntensity={2.5} />
      </mesh>

      {/* ② 直角三角形竖直对边 H (橙色发光线，总高度差 totalH) */}
      <mesh position={[totalW, floorY + totalH / 2, depth / 2 + 0.05]}>
        <boxGeometry args={[0.006, totalH, 0.006]} />
        <meshStandardMaterial color="#ea580c" emissive="#ea580c" emissiveIntensity={2.5} />
      </mesh>

      {/* ③ 斜边切线 (金色发光线，从地面起点 (0, floorY) 直达最高点 (totalW, floorY + totalH)) */}
      <group position={[0, floorY, depth / 2 + 0.05]} rotation={[0, 0, rad]}>
        <mesh position={[(totalW / Math.cos(rad)) / 2, 0, 0]}>
          <boxGeometry args={[totalW / Math.cos(rad), 0.006, 0.006]} />
          <meshStandardMaterial color="#f59e0b" emissive="#f59e0b" emissiveIntensity={2.5} />
        </mesh>
      </group>

      {/* ④ 单门阶梯增量 ΔH (翡翠绿发光标尺，直观标示第 1 扇至第 2 扇的高度台阶步进) */}
      <mesh position={[unitW, floorY + deltaH + deltaH / 2, depth / 2 + 0.05]}>
        <boxGeometry args={[0.006, deltaH, 0.006]} />
        <meshStandardMaterial color="#10b981" emissive="#10b981" emissiveIntensity={3.0} />
      </mesh>
    </group>
  );
};

export const TanStoryScene: React.FC<TanStorySceneProps> = (props) => {
  const stairAngle = props.stairAngle ?? 32;
  const clampedAngle = Math.min(Math.max(stairAngle, 26), 40);
  const rad = (clampedAngle * Math.PI) / 180;
  const tanVal = Math.tan(rad);

  const stepWMm = 400; // 单扇柜宽 400mm
  const deltaHMm = Math.round(stepWMm * tanVal); // 单步高度增量 ΔH

  // 4 组阶梯柜的真实落地高度
  const heights = [
    deltaHMm,
    deltaHMm * 2,
    deltaHMm * 3,
    deltaHMm * 4,
  ];

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
          background: 'linear-gradient(135deg, #f973160f 0%, #fdba741a 100%)',
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
          tan(θ) 正切函数
        </h2>
        <div
          style={{
            background: '#ffffff',
            border: '1px solid #fdba7460',
            padding: '8px 18px',
            borderRadius: '10px',
            fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
            fontSize: '14px',
            fontWeight: 700,
            color: '#ea580c',
            boxShadow: '0 4px 12px -2px #f9731615',
          }}
        >
          ΔH = StepW · tan(θ)
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
            background: 'radial-gradient(circle at 50% 40%, #ffffff 0%, #fff7ed 65%, #ffedd5 100%)',
          }}
        >
          <Canvas camera={{ position: [0.65, 0.35, 2.7], fov: 38 }} gl={{ antialias: true }}>
            <color attach="background" args={['#fafafa']} />
            <ambientLight intensity={1.35} />
            <directionalLight position={[6, 10, 7]} intensity={1.2} />
            <directionalLight position={[-5, 5, 3]} intensity={0.55} />
            <directionalLight position={[0, -2, 4]} intensity={0.3} />

            {/* 真实复式实木楼梯下阶梯式多功能收纳柜模型 */}
            <LuxuryStaircaseStorage {...props} />

            <OrbitControls target={[0.1, -0.15, 0]} enableZoom={true} maxPolarAngle={Math.PI / 2 + 0.04} />
          </Canvas>

          {/* 实时参数与正切斜率推导悬浮卡片 */}
          <div
            style={{
              position: 'absolute',
              top: '16px',
              left: '20px',
              background: 'rgba(255, 255, 255, 0.96)',
              backdropFilter: 'blur(12px)',
              border: '1.5px solid #f97316',
              padding: '14px 20px',
              borderRadius: '12px',
              boxShadow: '0 6px 20px rgba(249, 115, 22, 0.15)',
              fontSize: '13px',
              color: '#334155',
              minWidth: '430px',
            }}
          >
            <div style={{ fontWeight: 700, color: '#0f172a', marginBottom: '8px', fontSize: '14px' }}>
              楼梯坡度角：
              <code style={{ background: '#ffedd5', color: '#c2410c', padding: '2px 6px', borderRadius: '4px', marginRight: '6px' }}>
                θ = {clampedAngle}°
              </code>
              <span style={{ fontSize: '12px', color: '#64748b' }}>
                (斜率 tanθ = {tanVal.toFixed(3)})
              </span>
            </div>

            {/* 正切步进高度差实时解析 */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', borderTop: '1px dashed #fed7aa', paddingTop: '8px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: '#0284c7' }}>
                  <strong>底边单门宽度 (StepW)</strong>:
                </span>
                <span style={{ fontFamily: 'ui-monospace, monospace', fontWeight: 700, color: '#0284c7' }}>
                  {stepWMm} mm
                </span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: '#059669' }}>
                  <strong>单步高度阶梯增量 (ΔH)</strong>: <code>{stepWMm} × tan({clampedAngle}°)</code>
                </span>
                <span style={{ fontWeight: 800, color: '#059669', background: '#d1fae5', padding: '2px 8px', borderRadius: '4px' }}>
                  +{deltaHMm} mm/扇
                </span>
              </div>

              {/* 4 级门板阶梯高度一览 */}
              <div
                style={{
                  background: '#fff7ed',
                  border: '1px solid #ffedd5',
                  padding: '8px 10px',
                  borderRadius: '6px',
                  marginTop: '4px',
                  display: 'grid',
                  gridTemplateColumns: 'repeat(4, 1fr)',
                  gap: '6px',
                  textAlign: 'center',
                }}
              >
                {heights.map((h, i) => (
                  <div key={i} style={{ fontSize: '11px' }}>
                    <div style={{ color: '#9a3412', fontWeight: 600 }}>第 {i + 1} 扇</div>
                    <div style={{ fontWeight: 800, color: '#ea580c', marginTop: '2px' }}>{h}mm</div>
                  </div>
                ))}
              </div>
            </div>

            {/* BIM 下料提示 */}
            <div
              style={{
                fontSize: '12px',
                color: '#9a3412',
                marginTop: '8px',
                lineHeight: '1.5',
                background: '#fff7ed',
                padding: '6px 10px',
                borderRadius: '6px',
              }}
            >
              ✓ <strong>阶梯梯级严丝合缝</strong>：调节坡度角 θ，4 组柜门以 <code>ΔH = 400 × tan(θ)</code> 阶梯伸缩，实木踏板与柜身浑然一体！
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
            ✦ 3D 视口：按住鼠标左键旋转查看阶梯收纳柜与踏步联动 · 右键平移 · 滚轮缩放
          </div>
        </div>

        {/* 底部故事与工程价值 */}
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
              📖 业务故事：复式豪宅实木楼梯下「阶梯式多功能黄金收纳柜」
            </h4>
            <p
              style={{
                margin: 0,
                fontSize: '13px',
                lineHeight: '1.6',
                color: '#475569',
              }}
            >
              在复式与叠拼别墅户型中，楼梯下方空间往往成为鸡肋的暗角。设计师将楼梯踏步与下方定制储物柜深度一体化（踏步即柜顶，低处设大进深换鞋抽屉，高处设次净衣挂衣柜与家政柜）。利用 <code>ΔH = StepW · tan(θ)</code>，小宇根据楼梯实测坡度，自动算出每一节柜门的高度增量，使阶梯立面与楼梯坡度 100% 严谨咬合，空间利用率与美学秩序感完美统一！
            </p>
          </div>
          <div
            style={{
              fontSize: '13px',
              lineHeight: '1.6',
              color: '#9a3412',
              background: '#f973160d',
              borderLeft: '3px solid #f97316',
              padding: '10px 14px',
              borderRadius: '0 8px 8px 0',
            }}
          >
            <strong>💡 家装参数化与工程价值：</strong>
            <code>tan(θ)</code> 是三角几何中的“斜率转化器”，将建筑结构中的坡度倾角（楼梯、斜山墙、阁楼）实时映射为每一组定制构件的高度台阶，是异形收纳空间模块化参数设计的核心算法。
          </div>
        </div>
      </div>
    </div>
  );
};
