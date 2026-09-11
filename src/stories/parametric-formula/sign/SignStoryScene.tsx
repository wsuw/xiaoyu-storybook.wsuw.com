import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, ContactShadows } from '@react-three/drei';

export interface SignStorySceneProps {
  moveOffset?: number;
}

/**
 * 方案一：高定极简双向推拉衣柜与液压阻尼缓冲器受力朝向模型
 * 业务核心：sign(#MoveOffset)
 * 提取正负符号：
 * - moveOffset > 0 (向右推门，sign = +1)：右侧液压阻尼器被压缩，反向向左(-1)输出缓冲力
 * - moveOffset < 0 (向左推门，sign = -1)：左侧液压阻尼器被压缩，反向向右(+1)输出缓冲力
 * - moveOffset == 0 (静止中立，sign = 0)：双侧阻尼器自然松弛待命，无阻力
 */
const SlidingDoorWardrobeMesh: React.FC<SignStorySceneProps> = ({
  moveOffset = -60,
}) => {
  const signVal = Math.sign(moveOffset);
  const isRight = signVal > 0;
  const isLeft = signVal < 0;
  const isNeutral = signVal === 0;

  // 门洞与柜体总尺寸 (宽 2.4m, 高 2.2m, 深 0.6m)
  const wardrobeW = 2.4;
  const wardrobeH = 2.2;
  const wardrobeD = 0.6;
  const boardThick = 0.03;

  // 移门宽度 (宽 1.22m, 稍有重叠，高 2.05m)
  const doorW = 1.22;
  const doorH = 2.05;
  const doorThick = 0.035;

  // 门滑动位移 (最大 ±0.48m，与滑块 -100 ~ 100 映射)
  const posX = (moveOffset / 100) * 0.48;

  // 左右液压活塞压缩行程 (0 到 0.08m)
  const compressionRatio = Math.min(Math.abs(moveOffset) / 100, 1);
  const leftCompression = isLeft ? compressionRatio * 0.07 : 0;
  const rightCompression = isRight ? compressionRatio * 0.07 : 0;

  return (
    <group position={[0, -0.05, 0]}>
      {/* ================= 0. 地面与踢脚线 ================= */}
      <mesh position={[0, -wardrobeH / 2 - 0.015, 0.2]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[4.2, 3.2]} />
        <meshStandardMaterial color="#f1f5f9" roughness={0.7} />
      </mesh>

      {/* ================= 1. 高定大衣柜箱体 (雅致暖灰/浅胡桃内胆) ================= */}
      <group position={[0, 0, 0]}>
        {/* 顶板 */}
        <mesh position={[0, wardrobeH / 2 - boardThick / 2, 0]}>
          <boxGeometry args={[wardrobeW, boardThick, wardrobeD]} />
          <meshStandardMaterial color="#e2e8f0" roughness={0.4} />
        </mesh>
        {/* 底板 */}
        <mesh position={[0, -wardrobeH / 2 + boardThick / 2, 0]}>
          <boxGeometry args={[wardrobeW, boardThick, wardrobeD]} />
          <meshStandardMaterial color="#e2e8f0" roughness={0.4} />
        </mesh>
        {/* 左侧立板 */}
        <mesh position={[-wardrobeW / 2 + boardThick / 2, 0, 0]}>
          <boxGeometry args={[boardThick, wardrobeH, wardrobeD]} />
          <meshStandardMaterial color="#cbd5e1" roughness={0.4} />
        </mesh>
        {/* 右侧立板 */}
        <mesh position={[wardrobeW / 2 - boardThick / 2, 0, 0]}>
          <boxGeometry args={[boardThick, wardrobeH, wardrobeD]} />
          <meshStandardMaterial color="#cbd5e1" roughness={0.4} />
        </mesh>
        {/* 中间立挺分隔板 */}
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[boardThick, wardrobeH - boardThick * 2, wardrobeD]} />
          <meshStandardMaterial color="#cbd5e1" roughness={0.4} />
        </mesh>
        {/* 暖白细织布纹背板 */}
        <mesh position={[0, 0, -wardrobeD / 2 + 0.01]}>
          <boxGeometry args={[wardrobeW - boardThick * 2, wardrobeH - boardThick * 2, 0.018]} />
          <meshStandardMaterial color="#f8fafc" roughness={0.5} />
        </mesh>

        {/* 内部高定衣物与挂衣杆陈列 */}
        {/* 挂衣杆 */}
        <mesh position={[-wardrobeW / 4, 0.45, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.014, 0.014, wardrobeW / 2 - boardThick, 16]} />
          <meshStandardMaterial color="#f59e0b" metalness={0.9} roughness={0.2} />
        </mesh>
        <mesh position={[wardrobeW / 4, 0.45, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.014, 0.014, wardrobeW / 2 - boardThick, 16]} />
          <meshStandardMaterial color="#f59e0b" metalness={0.9} roughness={0.2} />
        </mesh>

        {/* 挂衣杆上的几件大衣 */}
        {[-0.8, -0.65, -0.5, 0.5, 0.65, 0.8].map((x, idx) => (
          <group key={`coat-${idx}`} position={[x, 0.22, 0]}>
            <mesh position={[0, 0.12, 0]}>
              <cylinderGeometry args={[0.01, 0.08, 0.12, 8]} />
              <meshStandardMaterial color="#334155" roughness={0.6} />
            </mesh>
            <mesh position={[0, -0.15, 0]}>
              <boxGeometry args={[0.08, 0.42, 0.28]} />
              <meshStandardMaterial color={idx % 2 === 0 ? '#475569' : '#64748b'} roughness={0.8} />
            </mesh>
          </group>
        ))}

        {/* 顶部内置温润 3000K 隐形暖光射灯 */}
        <pointLight position={[-wardrobeW / 4, wardrobeH / 2 - 0.15, 0]} intensity={0.9} color="#fef08a" distance={1.8} />
        <pointLight position={[wardrobeW / 4, wardrobeH / 2 - 0.15, 0]} intensity={0.9} color="#fef08a" distance={1.8} />
      </group>

      {/* ================= 2. 顶部双向铝合金移门滑轨 ================= */}
      <group position={[0, wardrobeH / 2 - boardThick - 0.03, wardrobeD / 2 - 0.02]}>
        {/* 黑色阳极氧化铝合金吊轨型材 */}
        <mesh>
          <boxGeometry args={[wardrobeW - boardThick * 2, 0.05, 0.08]} />
          <meshStandardMaterial color="#1e293b" metalness={0.8} roughness={0.25} />
        </mesh>
        {/* 滑道不锈钢微槽 */}
        <mesh position={[0, -0.024, 0.015]}>
          <boxGeometry args={[wardrobeW - boardThick * 2, 0.004, 0.01]} />
          <meshStandardMaterial color="#cbd5e1" metalness={0.95} roughness={0.1} />
        </mesh>
      </group>

      {/* ================= 3. 核心机制：左右两端液压阻尼器 (受力反向吸收动能) ================= */}
      {/* --- 左侧防撞阻尼器总成 --- */}
      <group position={[-wardrobeW / 2 + 0.18, wardrobeH / 2 - boardThick - 0.03, wardrobeD / 2]}>
        {/* 阻尼器外壳固定底座 */}
        <mesh position={[-0.04, 0, 0]}>
          <boxGeometry args={[0.12, 0.028, 0.03]} />
          <meshStandardMaterial color="#475569" metalness={0.7} roughness={0.3} />
        </mesh>
        {/* 左侧可压缩活塞柱 (门向左冲来时被压缩) */}
        <mesh
          position={[0.04 - leftCompression / 2, 0, 0]}
          rotation={[0, 0, Math.PI / 2]}
        >
          <cylinderGeometry args={[0.008, 0.008, 0.08 - leftCompression, 16]} />
          <meshStandardMaterial
            color={isLeft ? '#f59e0b' : '#94a3b8'}
            metalness={0.9}
            roughness={0.15}
          />
        </mesh>
        {/* 活塞端头橡胶防撞垫 */}
        <mesh position={[0.08 - leftCompression, 0, 0]}>
          <boxGeometry args={[0.01, 0.02, 0.02]} />
          <meshStandardMaterial color="#0f172a" roughness={0.8} />
        </mesh>
      </group>

      {/* --- 右侧防撞阻尼器总成 --- */}
      <group position={[wardrobeW / 2 - 0.18, wardrobeH / 2 - boardThick - 0.03, wardrobeD / 2]}>
        {/* 阻尼器外壳固定底座 */}
        <mesh position={[0.04, 0, 0]}>
          <boxGeometry args={[0.12, 0.028, 0.03]} />
          <meshStandardMaterial color="#475569" metalness={0.7} roughness={0.3} />
        </mesh>
        {/* 右侧可压缩活塞柱 (门向右冲来时被压缩) */}
        <mesh
          position={[-0.04 + rightCompression / 2, 0, 0]}
          rotation={[0, 0, Math.PI / 2]}
        >
          <cylinderGeometry args={[0.008, 0.008, 0.08 - rightCompression, 16]} />
          <meshStandardMaterial
            color={isRight ? '#f59e0b' : '#94a3b8'}
            metalness={0.9}
            roughness={0.15}
          />
        </mesh>
        {/* 活塞端头橡胶防撞垫 */}
        <mesh position={[-0.08 + rightCompression, 0, 0]}>
          <boxGeometry args={[0.01, 0.02, 0.02]} />
          <meshStandardMaterial color="#0f172a" roughness={0.8} />
        </mesh>
      </group>

      {/* ================= 4. 前方活动移门 (受 moveOffset 驱动左右滑动) ================= */}
      <group position={[posX, -0.05, wardrobeD / 2 + 0.03]}>
        {/* ① 移门门扇主体 (现代极简高定长虹灰玻与铝框质感) */}
        <mesh>
          <boxGeometry args={[doorW, doorH, doorThick]} />
          <meshStandardMaterial
            color="#334155"
            metalness={0.2}
            roughness={0.35}
            transparent
            opacity={0.88}
          />
        </mesh>

        {/* 铝合金外框包边 */}
        <mesh position={[-doorW / 2 + 0.01, 0, 0]}>
          <boxGeometry args={[0.02, doorH, doorThick + 0.002]} />
          <meshStandardMaterial color="#0f172a" metalness={0.85} roughness={0.2} />
        </mesh>
        <mesh position={[doorW / 2 - 0.01, 0, 0]}>
          <boxGeometry args={[0.02, doorH, doorThick + 0.002]} />
          <meshStandardMaterial color="#0f172a" metalness={0.85} roughness={0.2} />
        </mesh>

        {/* ② 通体极简一体式香槟金长拉手 */}
        <mesh position={[signVal >= 0 ? -doorW / 2 + 0.06 : doorW / 2 - 0.06, 0, doorThick / 2 + 0.015]}>
          <boxGeometry args={[0.018, 1.3, 0.016]} />
          <meshStandardMaterial color="#f59e0b" metalness={0.92} roughness={0.15} />
        </mesh>

        {/* ③ 门顶与阻尼器啮合的触碰拨片 */}
        <mesh position={[-doorW / 2 + 0.04, doorH / 2 + 0.015, -0.01]}>
          <boxGeometry args={[0.02, 0.03, 0.015]} />
          <meshStandardMaterial color="#94a3b8" metalness={0.8} />
        </mesh>
        <mesh position={[doorW / 2 - 0.04, doorH / 2 + 0.015, -0.01]}>
          <boxGeometry args={[0.02, 0.03, 0.015]} />
          <meshStandardMaterial color="#94a3b8" metalness={0.8} />
        </mesh>

        {/* ================= 5. sign 符号判定动态力学矢量箭头 (高亮动态提示) ================= */}
        {/* 运动速度方向矢量 (紫色/蓝色)：由 moveOffset 驱动 */}
        {!isNeutral && (
          <group position={[0, doorH / 2 + 0.12, 0]}>
            {/* 运动速度方向标牌 */}
            <mesh position={[0, 0, 0]}>
              <boxGeometry args={[0.42, 0.045, 0.01]} />
              <meshStandardMaterial color="#4f46e5" emissive="#4f46e5" emissiveIntensity={0.6} />
            </mesh>
            {/* 运动方向指向箭头 */}
            <mesh
              position={[isRight ? 0.26 : -0.26, 0, 0]}
              rotation={[0, 0, isRight ? -Math.PI / 2 : Math.PI / 2]}
            >
              <coneGeometry args={[0.04, 0.09, 16]} />
              <meshStandardMaterial color="#6366f1" emissive="#6366f1" emissiveIntensity={1.2} />
            </mesh>
          </group>
        )}

        {/* 反向阻尼力矢量 (橙色)：由 -1 * sign 产生 */}
        {!isNeutral && (
          <group position={[isRight ? doorW / 2 + 0.08 : -doorW / 2 - 0.08, doorH / 2 - 0.06, 0]}>
            {/* 反作用力箭头（迎头抵挡） */}
            <mesh
              rotation={[0, 0, isRight ? Math.PI / 2 : -Math.PI / 2]}
            >
              <coneGeometry args={[0.05, 0.12, 16]} />
              <meshStandardMaterial color="#f59e0b" emissive="#f59e0b" emissiveIntensity={1.8} />
            </mesh>
          </group>
        )}
      </group>
    </group>
  );
};

export const SignStoryScene: React.FC<SignStorySceneProps> = (props) => {
  const moveOffset = props.moveOffset ?? -60;
  const signVal = Math.sign(moveOffset);
  const isRight = signVal > 0;
  const isLeft = signVal < 0;
  const isZero = signVal === 0;

  // 阻尼力方向（牛顿第三定律：作用力与反作用力）
  const damperDirection = -1 * signVal;

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
          background: 'linear-gradient(135deg, #6366f10f 0%, #a5b4fc1a 100%)',
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
          sign(#A)
        </h2>
        <div
          style={{
            background: '#ffffff',
            border: '1px solid #a5b4fc60',
            padding: '8px 18px',
            borderRadius: '10px',
            fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
            fontSize: '14px',
            fontWeight: 700,
            color: '#4f46e5',
            boxShadow: '0 4px 12px -2px #6366f115',
          }}
        >
          sign(#MoveOffset)
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
            background: 'radial-gradient(circle at 50% 45%, #ffffff 0%, #f8fafc 65%, #eef2ff 100%)',
          }}
        >
          <Canvas camera={{ position: [0.8, 0.35, 3.4], fov: 42 }} gl={{ antialias: true }}>
            <color attach="background" args={['#fafafa']} />
            <ambientLight intensity={1.25} />
            <directionalLight position={[6, 12, 8]} intensity={1.3} castShadow />
            <directionalLight position={[-6, 6, 4]} intensity={0.65} />
            <directionalLight position={[0, -2, 4]} intensity={0.3} />

            {/* 高定推拉衣柜阻尼模型 */}
            <SlidingDoorWardrobeMesh {...props} />

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
              border: '1.5px solid #6366f1',
              padding: '14px 20px',
              borderRadius: '12px',
              boxShadow: '0 6px 20px rgba(99, 102, 241, 0.15)',
              fontSize: '13px',
              color: '#334155',
              minWidth: '360px',
            }}
          >
            <div style={{ fontWeight: 700, color: '#0f172a', marginBottom: '8px', fontSize: '14px' }}>
              移门推拉实时物理位移：
              <code style={{ background: '#f1f5f9', padding: '2px 6px', borderRadius: '4px' }}>
                #MoveOffset = {moveOffset > 0 ? `+${moveOffset}` : moveOffset} mm
              </code>
              <span style={{ fontSize: '12px', color: '#4f46e5', marginLeft: '8px' }}>
                ({isLeft ? '向左猛推' : isRight ? '向右猛推' : '自然中立居中'})
              </span>
            </div>

            {/* sign 提取正负朝向 */}
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
              <span><code>sign</code> 运动纯量方向：</span>
              <span
                style={{
                  fontWeight: 800,
                  color: '#4338ca',
                  background: '#e0e7ff',
                  padding: '3px 10px',
                  borderRadius: '6px',
                  border: '1px solid #c7d2fe',
                }}
              >
                sign({moveOffset}) = {signVal > 0 ? `+${signVal}` : signVal}
              </span>
            </div>

            {/* 阻尼器反向受力计算 */}
            <div
              style={{
                fontSize: '12px',
                color: isZero ? '#64748b' : '#b45309',
                marginTop: '8px',
                lineHeight: '1.6',
                background: isZero ? '#f8fafc' : '#fef3c7',
                padding: '8px 10px',
                borderRadius: '6px',
                border: isZero ? '1px solid #e2e8f0' : '1px solid #fde68a',
              }}
            >
              {isZero ? (
                <>✓ 门处于静止复位位置，双向液压阻尼器均处于自然松弛待命状态，阻尼力为 0 N。</>
              ) : isRight ? (
                <>
                  🛡️ 提取方向 <strong>+1</strong>！激活<strong>右侧液压阻尼器</strong>！
                  <br />
                  反向受力 <code>-1 * sign(+1) = -1</code>，橙色阻尼活塞压缩，向左施加反向缓冲力！
                </>
              ) : (
                <>
                  🛡️ 提取方向 <strong>-1</strong>！激活<strong>左侧液压阻尼器</strong>！
                  <br />
                  反向受力 <code>-1 * sign(-1) = +1</code>，橙色阻尼活塞压缩，向右施加反向缓冲力！
                </>
              )}
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
            ✦ 3D 视口：按住鼠标左键旋转查看内部衣物与顶部阻尼器活塞行程 · 右键平移 · 滚轮缩放
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
              📖 业务故事：双向推拉移门与液压阻尼器的反向缓冲力矩
            </h4>
            <p
              style={{
                margin: 0,
                fontSize: '13px',
                lineHeight: '1.6',
                color: '#475569',
              }}
            >
              高端双向推拉衣柜中，用户向左推门位移为负数（如 <code>-60mm</code>），向右推门位移为正数（如 <code>+60mm</code>）。物理引擎通过 <code>sign(#MoveOffset)</code> 剥离掉位移数值大小，<strong>提取纯粹的运动矢量朝向（+1 / -1 / 0）</strong>。根据牛顿第三定律，系统乘以 <code>-1</code> 施加相反的液压缓冲阻力，精准驱动对应侧的金属活塞伸缩吸能，实现轻柔静音闭合！
            </p>
          </div>
          <div
            style={{
              fontSize: '13px',
              lineHeight: '1.6',
              color: '#3730a3',
              background: '#6366f10d',
              borderLeft: '3px solid #6366f1',
              padding: '10px 14px',
              borderRadius: '0 8px 8px 0',
            }}
          >
            <strong>💡 工业制造价值：</strong>
            <code>sign</code> 是动力学与机械仿真中提取“运动趋势与正反朝向”的核心函数。它消除了绝对距离干扰，直接决定电机正反转、防撞阻尼器激发侧、传感器激活逻辑以及反作用力矢量的物理计算。
          </div>
        </div>
      </div>
    </div>
  );
};
