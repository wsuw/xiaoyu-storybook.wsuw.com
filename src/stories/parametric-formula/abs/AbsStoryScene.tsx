import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, ContactShadows } from '@react-three/drei';

export interface AbsStorySceneProps {
  deskOffset?: number;
}

/**
 * 高定柜体一体化双向悬空悬挑书桌 3D 模型
 */
const FloatingDeskMesh: React.FC<AbsStorySceneProps> = ({
  deskOffset = -350,
}) => {
  // 核心公式：无论向左伸出 (负) 还是向右伸出 (正)，悬挑净长度永远为正绝对值
  const absOffsetMm = Math.abs(deskOffset);
  const offsetM = deskOffset / 1000;
  const absOffsetM = absOffsetMm / 1000;

  // 当悬挑绝对长度 >= 200mm 时触发受力防下弯工字钢梁与悬浮灯带
  const isOverhanging = absOffsetMm >= 200;

  // 主柜尺寸 (宽 1.0m, 高 2.2m, 深 0.6m)
  const cabinetW = 1.0;
  const cabinetH = 2.2;
  const cabinetD = 0.6;
  const boardThick = 0.03;

  // 书桌基础尺寸 (深 0.6m, 厚 0.05m 加厚轻奢大板, 基础宽 0.8m)
  const baseDeskW = 0.8;
  const deskD = 0.58;
  const deskThick = 0.048;
  const deskY = -0.28; // 离地标准书桌高度 (约 750mm)

  // 书桌总长度 = 基础搭接宽 + 悬挑延伸绝对值
  const actualDeskW = baseDeskW + absOffsetM;
  // 书桌中心 X 坐标：向左伸则往左偏，向右伸则往右偏
  const deskCenterX = offsetM < 0
    ? -cabinetW / 2 - (baseDeskW - 0.2) / 2 - absOffsetM / 2 + 0.1
    : cabinetW / 2 + (baseDeskW - 0.2) / 2 + absOffsetM / 2 - 0.1;

  return (
    <group position={[0, -0.05, 0]}>
      {/* ================= 0. 空间环境：后方整墙与温馨木地板 ================= */}
      <mesh position={[0, 0.45, -cabinetD / 2 - 0.02]}>
        <boxGeometry args={[3.6, 2.5, 0.04]} />
        <meshStandardMaterial color="#f8fafc" roughness={0.4} />
      </mesh>
      {/* 踢脚线 */}
      <mesh position={[0, -cabinetH / 2 + 0.04, -cabinetD / 2]}>
        <boxGeometry args={[3.6, 0.08, 0.01]} />
        <meshStandardMaterial color="#cbd5e1" roughness={0.3} />
      </mesh>
      {/* 极简温馨人字拼木地板/地砖地面 */}
      <mesh position={[0, -cabinetH / 2 - 0.01, cabinetD / 2]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[3.6, 2.2]} />
        <meshStandardMaterial color="#ebe5df" roughness={0.65} />
      </mesh>

      {/* ================= 1. 高定主衣柜 (雅致浅暖杏白肤感烤漆) ================= */}
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
        {/* 柜体左右立板 */}
        <mesh position={[-cabinetW / 2 + boardThick / 2, 0, 0]}>
          <boxGeometry args={[boardThick, cabinetH, cabinetD]} />
          <meshStandardMaterial color="#dfd3c3" roughness={0.35} />
        </mesh>
        <mesh position={[cabinetW / 2 - boardThick / 2, 0, 0]}>
          <boxGeometry args={[boardThick, cabinetH, cabinetD]} />
          <meshStandardMaterial color="#dfd3c3" roughness={0.35} />
        </mesh>
        {/* 浅米细布纹背板 */}
        <mesh position={[0, 0, -cabinetD / 2 + 0.01]}>
          <boxGeometry args={[cabinetW - boardThick * 2, cabinetH - boardThick * 2, 0.016]} />
          <meshStandardMaterial color="#f6f2eb" roughness={0.5} />
        </mesh>

        {/* 柜门 (现代极简高定，带整根通顶香槟金长拉手) */}
        <mesh position={[0, 0, cabinetD / 2 + 0.01]}>
          <boxGeometry args={[cabinetW - 0.01, cabinetH - 0.02, 0.02]} />
          <meshStandardMaterial color="#fdfbf7" roughness={0.28} />
        </mesh>
        <mesh position={[0.02, 0, cabinetD / 2 + 0.025]}>
          <boxGeometry args={[0.012, 1.2, 0.015]} />
          <meshStandardMaterial color="#f59e0b" metalness={0.92} roughness={0.15} />
        </mesh>
      </group>

      {/* ================= 2. 悬空一体书桌 / 吧台桌板 (与主柜一体化穿插咬合) ================= */}
      <group position={[deskCenterX, deskY, 0]}>
        {/* 加厚轻奢书桌台面 (高档原木/柔沙暖木纹) */}
        <mesh>
          <boxGeometry args={[actualDeskW, deskThick, deskD]} />
          <meshStandardMaterial color="#e5d5c0" roughness={0.3} />
        </mesh>

        {/* 桌边香槟金微收口型材 */}
        <mesh position={[0, -deskThick / 2 + 0.004, deskD / 2 + 0.001]}>
          <boxGeometry args={[actualDeskW, 0.008, 0.004]} />
          <meshStandardMaterial color="#f59e0b" metalness={0.9} roughness={0.15} />
        </mesh>

        {/* 桌上办公/轻奢陈列品 (超薄笔记本电脑、咖啡杯、笔筒) */}
        <group position={[0, deskThick / 2 + 0.01, 0]}>
          {/* 笔记本电脑底座 */}
          <mesh position={[0, 0.005, 0.02]}>
            <boxGeometry args={[0.28, 0.008, 0.19]} />
            <meshStandardMaterial color="#334155" metalness={0.8} roughness={0.2} />
          </mesh>
          {/* 笔记本屏幕 (倾斜 115 度打开) */}
          <mesh position={[0, 0.095, -0.065]} rotation={[0.3, 0, 0]}>
            <boxGeometry args={[0.28, 0.18, 0.006]} />
            <meshStandardMaterial color="#1e293b" metalness={0.8} roughness={0.2} />
          </mesh>
          {/* 咖啡杯 */}
          <mesh position={[0.22, 0.035, 0.04]}>
            <cylinderGeometry args={[0.03, 0.024, 0.07, 16]} />
            <meshStandardMaterial color="#fdfbf7" roughness={0.2} />
          </mesh>
        </group>

        {/* ================= 3. 核心机制：abs 驱动的悬空端【加厚工字钢承重梁 + 悬浮灯带】 ================= */}
        {isOverhanging && (
          <group position={[0, -deskThick / 2, 0]}>
            {/* ① 嵌入式重型工字冷轧承重钢梁 (托住悬挑部分，防长期按压下弯下垂) */}
            <mesh position={[0, -0.018, 0]}>
              <boxGeometry args={[actualDeskW * 0.92, 0.032, 0.06]} />
              <meshStandardMaterial
                color="#0284c7"
                emissive="#0284c7"
                emissiveIntensity={0.55}
                metalness={0.92}
                roughness={0.15}
              />
            </mesh>

            {/* ② 悬挑底沿 3000K 隐形暖金洗墙线性氛围灯带 */}
            <mesh position={[0, -0.008, deskD / 2 - 0.03]}>
              <boxGeometry args={[actualDeskW * 0.95, 0.01, 0.02]} />
              <meshStandardMaterial
                color="#fbbf24"
                emissive="#f59e0b"
                emissiveIntensity={2.4}
                roughness={0.1}
              />
            </mesh>

            {/* 悬浮柔和洗地灯光 */}
            <pointLight position={[0, -0.15, 0]} intensity={1.4} color="#fde047" distance={1.5} />
          </group>
        )}

        {/* ================= 4. 悬挑尺寸双向发光测量标注标尺 ================= */}
        {absOffsetMm > 0 && (
          <group position={[0, deskThick / 2 + 0.02, deskD / 2 + 0.04]}>
            {/* 水平标注主线 */}
            <mesh position={[0, 0, 0]}>
              <boxGeometry args={[actualDeskW, 0.005, 0.005]} />
              <meshStandardMaterial color="#84cc16" emissive="#84cc16" emissiveIntensity={0.8} />
            </mesh>
            {/* 左右端点刻度竖线 */}
            <mesh position={[-actualDeskW / 2, 0, 0]}>
              <boxGeometry args={[0.005, 0.03, 0.005]} />
              <meshStandardMaterial color="#84cc16" emissive="#84cc16" emissiveIntensity={0.8} />
            </mesh>
            <mesh position={[actualDeskW / 2, 0, 0]}>
              <boxGeometry args={[0.005, 0.03, 0.005]} />
              <meshStandardMaterial color="#84cc16" emissive="#84cc16" emissiveIntensity={0.8} />
            </mesh>
          </group>
        )}
      </group>

      {/* ================= 5. 悬空桌下搭配的极简现代实木软包书椅 (清爽无杂件) ================= */}
      {/* 室内地面位于 Y = -1.15，书桌中心 X = deskCenterX，桌前距离 Z = 0.38 */}
      <group position={[deskCenterX, -1.15, 0.38]}>
        {/* ① 4 根简练扎实的深木色椅腿 (干净落地，无多余横梁十字) */}
        {[-0.17, 0.17].map((x, i) =>
          [-0.16, 0.16].map((z, j) => (
            <mesh
              key={`chair-leg-${i}-${j}`}
              position={[x * 0.95, 0.22, z * 0.95]}
              rotation={[z > 0 ? 0.04 : -0.04, 0, x > 0 ? -0.04 : 0.04]}
            >
              <cylinderGeometry args={[0.016, 0.013, 0.44, 16]} />
              <meshStandardMaterial color="#2d2424" roughness={0.4} />
            </mesh>
          ))
        )}

        {/* ② 极简坐垫底托 */}
        <mesh position={[0, 0.425, 0]}>
          <boxGeometry args={[0.42, 0.02, 0.40]} />
          <meshStandardMaterial color="#2d2424" roughness={0.4} />
        </mesh>

        {/* ③ 舒适加厚软包坐垫 (高级燕麦暖灰布艺) */}
        <mesh position={[0, 0.46, 0]}>
          <boxGeometry args={[0.42, 0.05, 0.40]} />
          <meshStandardMaterial color="#e2e8f0" roughness={0.65} />
        </mesh>

        {/* ④ 一体化极简现代微倾靠背 (自然衔接，无突兀立棍) */}
        <mesh position={[0, 0.66, 0.18]} rotation={[-0.08, 0, 0]}>
          <boxGeometry args={[0.40, 0.36, 0.035]} />
          <meshStandardMaterial color="#cbd5e1" roughness={0.65} />
        </mesh>
      </group>
    </group>
  );
};

export const AbsStoryScene: React.FC<AbsStorySceneProps> = (props) => {
  const deskOffset = props.deskOffset ?? -350;
  const absOffset = Math.abs(deskOffset);
  const isLeft = deskOffset < 0;
  const isRight = deskOffset > 0;
  const isZero = deskOffset === 0;
  const isReinforced = absOffset >= 200;

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
          background: 'linear-gradient(135deg, #84cc160f 0%, #a3e6351a 100%)',
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
          abs(#A)
        </h2>
        <div
          style={{
            background: '#ffffff',
            border: '1px solid #a3e63560',
            padding: '8px 18px',
            borderRadius: '10px',
            fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
            fontSize: '14px',
            fontWeight: 700,
            color: '#65a30d',
            boxShadow: '0 4px 12px -2px #84cc1615',
          }}
        >
          #Overhang = abs(#DeskOffset)
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
            background: isReinforced
              ? 'radial-gradient(circle at 50% 45%, #ffffff 0%, #fef3c730 65%, #f59e0b16 100%)'
              : 'radial-gradient(circle at 50% 45%, #ffffff 0%, #f8fafc 70%, #f1f5f9 100%)',
            transition: 'background 0.4s ease',
          }}
        >
          <Canvas camera={{ position: [0.8, 0.4, 3.8], fov: 42 }} gl={{ antialias: true }}>
            <color attach="background" args={['#fafafa']} />
            <ambientLight intensity={1.15} />
            <directionalLight position={[6, 12, 8]} intensity={1.3} castShadow />
            <directionalLight position={[-6, 6, 4]} intensity={0.7} />
            <directionalLight position={[0, -4, 4]} intensity={0.3} />

            {/* 悬空书桌模型 */}
            <FloatingDeskMesh {...props} />

            <ContactShadows
              position={[0, -1.15, 0]}
              opacity={0.38}
              scale={8}
              blur={2.2}
              far={3.2}
              color={isReinforced ? '#d97706' : '#64748b'}
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
              border: isReinforced ? '1.5px solid #f59e0b' : '1px solid #84cc16',
              padding: '14px 20px',
              borderRadius: '12px',
              boxShadow: isReinforced ? '0 6px 20px rgba(245, 158, 11, 0.2)' : '0 4px 14px rgba(0,0,0,0.06)',
              fontSize: '13px',
              color: '#334155',
              minWidth: '350px',
            }}
          >
            <div style={{ fontWeight: 700, color: '#0f172a', marginBottom: '8px', fontSize: '14px' }}>
              桌板相对延伸偏移：<code style={{ background: '#f1f5f9', padding: '2px 6px', borderRadius: '4px' }}>
                #DeskOffset = {deskOffset > 0 ? `+${deskOffset}` : deskOffset} mm
              </code>
              <span style={{ fontSize: '12px', color: '#65a30d', marginLeft: '8px' }}>
                ({isLeft ? '靠窗向左悬挑' : isRight ? '靠床向右悬挑' : '齐平未延伸'})
              </span>
            </div>

            {/* abs 绝对值计算 */}
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
              <span><code>abs</code> 悬挑绝对物理跨度：</span>
              <span
                style={{
                  fontWeight: 800,
                  color: isReinforced ? '#b45309' : '#4d7c0f',
                  background: isReinforced ? '#fef3c7' : '#ecfccb',
                  padding: '3px 10px',
                  borderRadius: '6px',
                  border: isReinforced ? '1px solid #fde68a' : '1px solid #d9f99d',
                }}
              >
                abs({deskOffset}) = {absOffset} mm
              </span>
            </div>

            {/* 联动动作 */}
            <div
              style={{
                fontSize: '12px',
                color: isReinforced ? '#b45309' : '#4d7c0f',
                marginTop: '6px',
                lineHeight: '1.6',
              }}
            >
              {isZero
                ? '✓ 无悬挑延伸：桌板与柜体边缘紧凑齐平，自承重安全。'
                : isReinforced
                  ? `🛡️ 悬挑跨度突破 200mm（当前 ${absOffset}mm）！力矩倍增，自动加装【冷轧工字承重钢梁】+【3000K 悬浮洗地灯带】！`
                  : `✓ 短距微挑在 200mm 安全刚度范围内（当前 ${absOffset}mm），普通木板自承重即可。`}
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
            ✦ 3D 视口：按住鼠标左键旋转查看桌底承重钢梁 · 右键平移 · 滚轮缩放
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
              📖 业务故事：衣柜一体化悬空书桌双向悬挑与承重钢梁联动
            </h4>
            <p
              style={{
                margin: 0,
                fontSize: '13px',
                lineHeight: '1.6',
                color: '#475569',
              }}
            >
              现代卧室极简高定最热门的当属“衣柜 + 悬空一体式书桌/梳妆台”。根据动线朝向，桌板可以向左飘窗悬挑（偏移负数 <code>-350mm</code>），也可以向右靠床悬挑（偏移正数 <code>+350mm</code>）。<strong>不管往哪边伸，离开柜体悬空的物理跨度永远是正绝对值 <code>abs(#DeskOffset)</code></strong>！一旦跨度超过 200mm，悬空力矩激增，系统自动在桌底预埋通长加厚工字钢承重龙骨，并铺设 3000K 悬浮洗地灯带！
            </p>
          </div>
          <div
            style={{
              fontSize: '13px',
              lineHeight: '1.6',
              color: '#334155',
              background: '#84cc160d',
              borderLeft: '3px solid #84cc16',
              padding: '10px 14px',
              borderRadius: '0 8px 8px 0',
            }}
          >
            <strong>💡 工业制造价值：</strong>
            <code>abs</code> 是参数化“对称物理逻辑”的核心。它抹平了左右方向矢量，提取纯粹的悬挑物理长度用于力学应力校核与五金钢梁选配，保证定制家居无论朝左还是朝右延伸，结构品质始终坚如磐石。
          </div>
        </div>
      </div>
    </div>
  );
};
