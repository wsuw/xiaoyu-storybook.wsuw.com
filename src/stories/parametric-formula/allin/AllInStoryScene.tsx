import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, ContactShadows } from '@react-three/drei';

export interface AllInStorySceneProps {
  isFloating?: boolean;
  hasSinteredStone?: boolean;
  hasDoubleBasin?: boolean;
  hasLedMirror?: boolean;
  hasBottomSensorLight?: boolean;
}

/**
 * 高定悬空卫浴柜 3D 模型组件
 */
const FloatingVanityMesh: React.FC<AllInStorySceneProps> = ({
  isFloating = true,
  hasSinteredStone = true,
  hasDoubleBasin = true,
  hasLedMirror = true,
  hasBottomSensorLight = false,
}) => {
  // 核心三大重载高危项全包含判断
  const isAllIn = Boolean(isFloating && hasSinteredStone && hasDoubleBasin);

  // 尺寸定义：长 1.6m，高 0.52m，进深 0.52m，悬空离地 0.28m
  const vanityW = 1.6;
  const vanityH = 0.52;
  const vanityD = 0.52;
  const stoneThick = hasSinteredStone ? 0.04 : 0.015; // 岩板加厚 40mm vs 常规薄板 15mm
  // 空间固定标高：地面 -0.65m，柜底固定悬空 0.3m，台面人体工学高度恒定不变
  const floorY = -0.65;
  const cabinetCenterY = floorY + 0.3 + vanityH / 2; // 柜体中心 Y 坐标

  return (
    <group position={[0, 0, 0]}>
      {/* ================= 0. 后方高档浴室整墙瓷砖背景 (绝对固定于空间，永不上下位移) ================= */}
      <group position={[0, 0.5, -vanityD / 2 - 0.02]}>
        <mesh>
          <boxGeometry args={[2.8, 2.3, 0.04]} />
          <meshStandardMaterial color="#f1f5f9" roughness={0.3} />
        </mesh>
        {/* 墙面大规格哑光大板砖美缝分格线 */}
        <mesh position={[0, 0.2, 0.021]}>
          <boxGeometry args={[2.8, 0.003, 0.002]} />
          <meshStandardMaterial color="#cbd5e1" roughness={0.5} />
        </mesh>
        <mesh position={[-0.4, 0, 0.021]}>
          <boxGeometry args={[0.003, 2.3, 0.002]} />
          <meshStandardMaterial color="#cbd5e1" roughness={0.5} />
        </mesh>
      </group>

      {/* ================= 浴室柜主体系统 (台面标高恒定，墙壁绝不会跟着动) ================= */}
      <group position={[0, cabinetCenterY, 0]}>

      {/* ================= 1. 顶部台面 (大理石岩板 vs 常规亚克力薄板) ================= */}
      <group position={[0, vanityH / 2 + stoneThick / 2, 0]}>
        <mesh>
          <boxGeometry args={[vanityW + 0.01, stoneThick, vanityD + 0.01]} />
          <meshStandardMaterial
            color={hasSinteredStone ? '#fdfbf7' : '#e2e8f0'}
            roughness={hasSinteredStone ? 0.15 : 0.4}
            metalness={0.05}
          />
        </mesh>
        {/* 岩板高光精致小海棠角包边质感 */}
        {hasSinteredStone && (
          <mesh position={[0, 0, vanityD / 2 + 0.005]}>
            <boxGeometry args={[vanityW + 0.01, stoneThick * 0.9, 0.004]} />
            <meshStandardMaterial color="#cbd5e1" metalness={0.2} roughness={0.1} />
          </mesh>
        )}
      </group>

      {/* ================= 2. 下沉式洗手台盆与金属龙头 (单盆 vs 豪华双盆) ================= */}
      {hasDoubleBasin ? (
        /* 双人双台盆 (左右各一个) */
        [-vanityW * 0.26, vanityW * 0.26].map((x, i) => (
          <group key={`basin-${i}`} position={[x, vanityH / 2 + stoneThick + 0.003, 0]}>
            {/* 盆沿高出台面 3mm 杜绝 Z-fighting 闪烁 */}
            <mesh position={[0, 0, 0]}>
              <boxGeometry args={[0.46, 0.008, 0.34]} />
              <meshStandardMaterial color="#ffffff" roughness={0.1} />
            </mesh>
            {/* 盆内下沉深槽 */}
            <mesh position={[0, -0.04, 0]}>
              <boxGeometry args={[0.42, 0.07, 0.3]} />
              <meshStandardMaterial color="#f1f5f9" roughness={0.15} />
            </mesh>
            {/* 金属香槟金下水滤芯器 */}
            <mesh position={[0, -0.074, 0]}>
              <cylinderGeometry args={[0.024, 0.024, 0.006, 16]} />
              <meshStandardMaterial color="#f59e0b" metalness={0.95} roughness={0.1} />
            </mesh>
            {/* 现代极简拉丝金立式鹅颈水龙头 */}
            <group position={[0, 0.08, -0.14]}>
              {/* 主立柱 */}
              <mesh position={[0, 0, 0]}>
                <cylinderGeometry args={[0.014, 0.014, 0.16, 16]} />
                <meshStandardMaterial color="#f59e0b" metalness={0.92} roughness={0.15} />
              </mesh>
              {/* 出水嘴向前弯折倾斜 */}
              <mesh position={[0, 0.075, 0.035]} rotation={[Math.PI / 4, 0, 0]}>
                <cylinderGeometry args={[0.012, 0.012, 0.09, 16]} />
                <meshStandardMaterial color="#f59e0b" metalness={0.92} roughness={0.15} />
              </mesh>
              {/* 出水口 */}
              <mesh position={[0, 0.045, 0.07]}>
                <cylinderGeometry args={[0.01, 0.01, 0.02, 16]} />
                <meshStandardMaterial color="#d97706" metalness={0.9} roughness={0.2} />
              </mesh>
              {/* 水龙头侧边冷热单杆把手 */}
              <mesh position={[0.026, 0.03, 0]}>
                <cylinderGeometry args={[0.006, 0.006, 0.045, 12]} rotation={[0, 0, Math.PI / 2]} />
                <meshStandardMaterial color="#f59e0b" metalness={0.95} roughness={0.1} />
              </mesh>
            </group>
          </group>
        ))
      ) : (
        /* 单人宽体单台盆 (居中宽敞，配备完整精工水龙头) */
        <group position={[0, vanityH / 2 + stoneThick + 0.003, 0]}>
          {/* 盆沿高出台面 3mm 杜绝闪烁 */}
          <mesh position={[0, 0, 0]}>
            <boxGeometry args={[0.58, 0.008, 0.36]} />
            <meshStandardMaterial color="#ffffff" roughness={0.1} />
          </mesh>
          {/* 盆内深槽 */}
          <mesh position={[0, -0.04, 0]}>
            <boxGeometry args={[0.54, 0.07, 0.32]} />
            <meshStandardMaterial color="#f1f5f9" roughness={0.15} />
          </mesh>
          {/* 下水器 */}
          <mesh position={[0, -0.074, 0]}>
            <cylinderGeometry args={[0.025, 0.025, 0.006, 16]} />
            <meshStandardMaterial color="#f59e0b" metalness={0.95} roughness={0.1} />
          </mesh>

          {/* 完整的现代极简单台盆水龙头 (绝非光棍) */}
          <group position={[0, 0.08, -0.15]}>
            {/* 垂直主立管 */}
            <mesh position={[0, 0, 0]}>
              <cylinderGeometry args={[0.014, 0.014, 0.16, 16]} />
              <meshStandardMaterial color="#f59e0b" metalness={0.92} roughness={0.15} />
            </mesh>
            {/* 往前弯曲延伸的出水臂 */}
            <mesh position={[0, 0.075, 0.035]} rotation={[Math.PI / 4, 0, 0]}>
              <cylinderGeometry args={[0.012, 0.012, 0.09, 16]} />
              <meshStandardMaterial color="#f59e0b" metalness={0.92} roughness={0.15} />
            </mesh>
            {/* 垂直向下出水口 */}
            <mesh position={[0, 0.045, 0.07]}>
              <cylinderGeometry args={[0.01, 0.01, 0.02, 16]} />
              <meshStandardMaterial color="#d97706" metalness={0.9} roughness={0.2} />
            </mesh>
            {/* 侧置调温调水流控制手柄 */}
            <mesh position={[0.026, 0.03, 0]}>
              <cylinderGeometry args={[0.006, 0.006, 0.045, 12]} rotation={[0, 0, Math.PI / 2]} />
              <meshStandardMaterial color="#f59e0b" metalness={0.95} roughness={0.1} />
            </mesh>
          </group>
        </group>
      )}

      {/* ================= 3. 浴室主柜柜身 (高雅奶杏暖灰肤感烤漆) ================= */}
      <group position={[0, 0, 0]}>
        {/* 柜体外壳 */}
        <mesh>
          <boxGeometry args={[vanityW, vanityH, vanityD]} />
          <meshStandardMaterial color="#ede4d8" roughness={0.3} />
        </mesh>

        {/* 双层高雅抽屉分割缝与正面抽屉面板 */}
        {[-vanityH * 0.22, vanityH * 0.24].map((y, i) => (
          <group key={`drawer-${i}`} position={[0, y, vanityD / 2 + 0.006]}>
            <mesh>
              <boxGeometry args={[vanityW * 0.98, vanityH * 0.44, 0.014]} />
              <meshStandardMaterial color="#fcf9f2" roughness={0.25} />
            </mesh>
            {/* 极简香槟金 45 度暗抠斜边拉手 */}
            <mesh position={[0, vanityH * 0.2, 0.005]}>
              <boxGeometry args={[vanityW * 0.6, 0.008, 0.008]} />
              <meshStandardMaterial color="#f59e0b" metalness={0.9} roughness={0.15} />
            </mesh>
          </group>
        ))}
      </group>

      {/* ================= 4. 上方配套智能除雾 LED 镜柜 ================= */}
      {hasLedMirror && (
        <group position={[0, vanityH / 2 + 0.55, -vanityD / 2 + 0.02]}>
          {/* 镜柜本体 */}
          <mesh>
            <boxGeometry args={[vanityW * 0.92, 0.72, 0.12]} />
            <meshStandardMaterial color="#e2e8f0" roughness={0.2} />
          </mesh>
          {/* 高清防雾无框水银镜面 */}
          <mesh position={[0, 0, 0.062]}>
            <boxGeometry args={[vanityW * 0.9, 0.7, 0.006]} />
            <meshStandardMaterial color="#93c5fd" transparent opacity={0.3} roughness={0.02} metalness={0.95} />
          </mesh>
          {/* 镜子外圈柔和美肤光圈 */}
          <mesh position={[0, 0, 0.065]}>
            <boxGeometry args={[vanityW * 0.91, 0.71, 0.002]} />
            <meshStandardMaterial color="#ffffff" emissive="#f8fafc" emissiveIntensity={0.8} />
          </mesh>
        </group>
      )}

      {/* ================= 5. 底部悬浮感应夜灯 (选配) ================= */}
      {hasBottomSensorLight && (
        <group position={[0, -vanityH / 2, 0]}>
          <mesh>
            <boxGeometry args={[vanityW * 0.9, 0.01, 0.02]} />
            <meshStandardMaterial color="#fef08a" emissive="#fbbf24" emissiveIntensity={1.8} />
          </mesh>
          <pointLight position={[0, -0.1, 0]} intensity={1.2} color="#fef08a" distance={1.2} />
        </group>
      )}

      {/* ================= 6. 悬空 vs 落地结构响应 ================= */}
      {!isFloating ? (
        /* 非悬空状态：生成 4 根加厚金属立地支撑腿稳稳接地 */
        <group position={[0, -vanityH / 2, 0]}>
          {[-vanityW * 0.44, vanityW * 0.44].map((x, i) =>
            [-vanityD * 0.38, vanityD * 0.38].map((z, j) => (
              <mesh key={`leg-${i}-${j}`} position={[x, -0.15, z]}>
                <cylinderGeometry args={[0.02, 0.025, 0.3, 16]} />
                <meshStandardMaterial color="#64748b" metalness={0.8} roughness={0.2} />
              </mesh>
            ))
          )}
        </group>
      ) : null}

      {/* ================= 7. 核心高光机制：AllIn 满足时触发的【入墙镀锌重载悬挑钢梁托架】 ================= */}
      {isAllIn && (
        <group position={[0, -vanityH / 2, -vanityD / 2]}>
          {/* 3 组加厚 45x35 镀锌重型悬挑承重方钢梁（平整紧贴柜体底板下沿，向前平伸托举） */}
          {[-vanityW * 0.36, 0, vanityW * 0.36].map((x, i) => (
            <group key={`steel-bracket-${i}`} position={[x, 0, 0]}>
              {/* ① 水平托底承重方钢主梁 (紧贴柜底平齐托住，绝不外凸斜刺) */}
              <mesh position={[0, -0.018, vanityD * 0.48]}>
                <boxGeometry args={[0.045, 0.035, vanityD * 0.94]} />
                <meshStandardMaterial
                  color="#0284c7"
                  emissive="#0284c7"
                  emissiveIntensity={0.6}
                  metalness={0.92}
                  roughness={0.15}
                />
              </mesh>

              {/* ② 垂直贴墙加厚冲压受拉安装钢板 (紧贴后方瓷砖墙) */}
              <mesh position={[0, -0.08, 0.008]}>
                <boxGeometry args={[0.08, 0.2, 0.016]} />
                <meshStandardMaterial color="#0369a1" metalness={0.95} roughness={0.1} />
              </mesh>

              {/* ③ 墙根微型直角抗弯加劲肋板 (仅位于靠近墙根 8cm 范围内，紧密焊接) */}
              <mesh position={[0, -0.045, 0.05]}>
                <boxGeometry args={[0.015, 0.08, 0.08]} />
                <meshStandardMaterial color="#38bdf8" metalness={0.9} roughness={0.15} />
              </mesh>

              {/* ④ 入墙高强度机械膨胀锚固重型六角螺栓 (直插入墙 120mm) */}
              {[-0.12, -0.04].map((y, idx) => (
                <mesh key={`bolt-${idx}`} position={[0, y, -0.015]} rotation={[Math.PI / 2, 0, 0]}>
                  <cylinderGeometry args={[0.012, 0.012, 0.035, 16]} />
                  <meshStandardMaterial color="#f59e0b" metalness={0.95} roughness={0.1} />
                </mesh>
              ))}
            </group>
          ))}

          {/* 结构安全受力提示光 */}
          <pointLight position={[0, -0.06, vanityD * 0.4]} intensity={1.2} color="#38bdf8" distance={1.6} />
        </group>
      )}
      </group>
    </group>
  );
};

export const AllInStoryScene: React.FC<AllInStorySceneProps> = (props) => {
  const isFloating = props.isFloating ?? true;
  const hasSinteredStone = props.hasSinteredStone ?? true;
  const hasDoubleBasin = props.hasDoubleBasin ?? true;
  const hasLedMirror = props.hasLedMirror ?? true;
  const hasBottomSensorLight = props.hasBottomSensorLight ?? false;

  // 判定是否同时包含三大重载高危项
  const isAllIn = Boolean(isFloating && hasSinteredStone && hasDoubleBasin);

  // 统计已勾选清单与编号
  const selectedList: string[] = [];
  const selectedIds: number[] = [];
  if (isFloating) {
    selectedList.push('1-悬空无地脚');
    selectedIds.push(1);
  }
  if (hasSinteredStone) {
    selectedList.push('2-岩板厚台面');
    selectedIds.push(2);
  }
  if (hasDoubleBasin) {
    selectedList.push('3-双人双台盆');
    selectedIds.push(3);
  }
  if (hasLedMirror) {
    selectedList.push('4-除雾智能镜');
    selectedIds.push(4);
  }
  if (hasBottomSensorLight) {
    selectedList.push('5-感应悬浮灯');
    selectedIds.push(5);
  }

  const missingList: string[] = [];
  if (!isFloating) missingList.push('1-悬空无地脚');
  if (!hasSinteredStone) missingList.push('2-岩板厚台面');
  if (!hasDoubleBasin) missingList.push('3-双人双台盆');

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
          background: 'linear-gradient(135deg, #0284c70f 0%, #38bdf81a 100%)',
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
          AllIn(list1, list2)
        </h2>
        <div
          style={{
            background: '#ffffff',
            border: '1px solid #38bdf860',
            padding: '8px 18px',
            borderRadius: '10px',
            fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
            fontSize: '14px',
            fontWeight: 700,
            color: '#0284c7',
            boxShadow: '0 4px 12px -2px #0284c715',
          }}
        >
          AllIn(#Selected, [1, 2, 3])
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
            background: isAllIn
              ? 'radial-gradient(circle at 50% 45%, #ffffff 0%, #e0f2fe40 65%, #0284c718 100%)'
              : 'radial-gradient(circle at 50% 45%, #ffffff 0%, #f8fafc 70%, #f1f5f9 100%)',
            transition: 'background 0.4s ease',
          }}
        >
          <Canvas camera={{ position: [1.2, 0.35, 3.2], fov: 40 }} gl={{ antialias: true }}>
            <color attach="background" args={['#fafafa']} />
            <ambientLight intensity={1.15} />
            <directionalLight position={[6, 10, 8]} intensity={1.3} castShadow />
            <directionalLight position={[-6, 6, 4]} intensity={0.7} />
            <directionalLight position={[0, -4, 4]} intensity={0.3} />

            {/* 悬空卫浴柜主体 */}
            <FloatingVanityMesh {...props} />

            {/* 接地阴影 */}
            <ContactShadows
              position={[0, -0.65, 0]}
              opacity={0.38}
              scale={7}
              blur={2.2}
              far={3.2}
              color={isAllIn ? '#0284c7' : '#64748b'}
            />
            <OrbitControls target={[0, 0.1, 0]} enableZoom={true} maxPolarAngle={Math.PI / 2 + 0.04} />
          </Canvas>

          {/* 实时状态悬浮卡片 */}
          <div
            style={{
              position: 'absolute',
              top: '16px',
              left: '20px',
              background: 'rgba(255, 255, 255, 0.96)',
              backdropFilter: 'blur(12px)',
              border: isAllIn ? '1.5px solid #0284c7' : '1px solid #e2e8f0',
              padding: '14px 20px',
              borderRadius: '12px',
              boxShadow: isAllIn ? '0 6px 20px rgba(2, 132, 199, 0.2)' : '0 4px 14px rgba(0,0,0,0.06)',
              fontSize: '13px',
              color: '#334155',
              minWidth: '350px',
            }}
          >
            <div style={{ fontWeight: 700, color: '#0f172a', marginBottom: '8px', fontSize: '14px' }}>
              当前选配清单：<code style={{ background: '#f1f5f9', padding: '2px 6px', borderRadius: '4px' }}>[{selectedIds.join(', ')}]</code>
              <span style={{ fontSize: '12px', color: '#64748b', marginLeft: '6px' }}>({selectedList.length} 项已勾选)</span>
            </div>

            <div style={{ fontSize: '12px', color: '#64748b', marginBottom: '6px' }}>
              必查重载条件：<code>[1-悬空无地脚, 2-岩板厚台面, 3-双人双台盆]</code>
            </div>

            {/* AllIn 判定 */}
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
              <span><code>AllIn</code> 全包含判定：</span>
              <span
                style={{
                  fontWeight: 800,
                  color: isAllIn ? '#0369a1' : '#dc2626',
                  background: isAllIn ? '#e0f2fe' : '#fef2f2',
                  padding: '3px 10px',
                  borderRadius: '6px',
                  border: isAllIn ? '1px solid #bae6fd' : '1px solid #fecaca',
                }}
              >
                {isAllIn ? 'True（三大重载项全包含，超集成立）' : `False（缺少必备：${missingList.join('、')}）`}
              </span>
            </div>

            {/* 工艺动作 */}
            <div
              style={{
                fontSize: '12px',
                color: isAllIn ? '#0369a1' : '#64748b',
                marginTop: '6px',
                lineHeight: '1.6',
              }}
            >
              {isAllIn
                ? '🛡️ 悬挑重载超限！柜底预埋【3组镀锌三角重载钢梁】+【入墙植筋锚固】，防下垂撕裂！'
                : '✓ 轻型常规安装：未触发极限下坠风险，采用标准挂码或落地脚支撑即可。'}
            </div>
          </div>

          {/* 3D 交互提示 */}
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
            ✦ 3D 视口：按住鼠标左键旋转观察底盘三角承重钢架 · 右键平移 · 滚轮缩放
          </div>
        </div>

        {/* 底部业务故事与工业价值 */}
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
              📖 业务故事：极简悬空卫浴柜“三大重载要素全包含”安全防坠
            </h4>
            <p
              style={{
                margin: 0,
                fontSize: '13px',
                lineHeight: '1.6',
                color: '#475569',
              }}
            >
              现代卫生间为了扫地机器人无死角清洁，极简悬空浴室柜成为主流。但若客户同时选配了 <strong>[1-无脚悬空挂墙, 2-大理石岩板厚台面, 3-双人双台盆]</strong>，自身净重加上蓄水及人体按压受力超 120kg！<strong><code>AllIn</code> 严格检测客户配置是否包含了这 3 大项</strong>：哪怕用户还多选了智能镜柜和底部夜灯，只要三大件都在，工厂自动预埋 3 组入墙加厚镀锌三角悬挑钢架，彻底消除掉落安全事故！
            </p>
          </div>
          <div
            style={{
              fontSize: '13px',
              lineHeight: '1.6',
              color: '#334155',
              background: '#0284c70d',
              borderLeft: '3px solid #0284c7',
              padding: '10px 14px',
              borderRadius: '0 8px 8px 0',
            }}
          >
            <strong>💡 工业制造价值：</strong>
            <code>AllIn</code> 守护的是“超集安全兜底”。它与 <code>BoolAt</code>（严格全等）不同：允许客户随意自由加选其他功能配件，但只要命中了力学高危组合，系统立刻强制兜底装配三角悬挑主骨架，守住品质与安全红线。
          </div>
        </div>
      </div>
    </div>
  );
};
