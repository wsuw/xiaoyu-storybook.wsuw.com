import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, ContactShadows } from '@react-three/drei';

export interface InvTrigStorySceneProps {
  liftH?: number;
}

/**
 * 高端气动上翻吊柜模型（一个实例完整融合反三角函数 asin, acos, atan）
 * 业务与数学核心：
 * - 气动支撑臂物理臂长固定：armLength = 400mm (斜边 r)
 * - 垂直抬升门板开门高度：liftH (对边 y)
 * - 水平外伸安全探出距离：projD = sqrt(r^2 - y^2) (邻边 x)
 * 1. asin(liftH / armLength) -> 由竖向提升高度反解支撑臂主旋转角 θ
 * 2. acos(projD / armLength) -> 由水平外探安全公差反解校验角 θ
 * 3. atan(liftH / projD)     -> 直接由空间坐标 (x, y) 直角斜率反解门把手轨迹角 θ
 */
const BlumLiftCabinetMesh: React.FC<InvTrigStorySceneProps> = ({
  liftH = 240,
}) => {
  // 气撑机械臂固定长度 (斜边)
  const armLengthMm = 400;
  // 保护对边不超过斜边，防止数学域错误
  const safeLiftH = Math.min(Math.max(liftH, 20), armLengthMm * 0.999);
  const ratioSin = safeLiftH / armLengthMm;

  // 1. asin 反解机械主转角 θ (弧度与角度)
  const thetaRad = Math.asin(ratioSin);
  const thetaDeg = Math.round((thetaRad * 180) / Math.PI);

  // 2. 水平邻边距离 (余弦水平分量)
  const projDMm = Math.sqrt(Math.max(0, armLengthMm * armLengthMm - safeLiftH * safeLiftH));
  const ratioCos = projDMm / armLengthMm;
  const acosDeg = Math.round((Math.acos(ratioCos) * 180) / Math.PI);

  // 3. 正切比值与角度
  const ratioTan = safeLiftH / Math.max(projDMm, 0.001);
  const atanDeg = Math.round((Math.atan(ratioTan) * 180) / Math.PI);

  // 米单位尺寸
  const armLengthM = armLengthMm / 1000;
  const liftHM = safeLiftH / 1000;
  const projDM = projDMm / 1000;

  // 吊柜箱体尺寸 (宽 1.0m, 高 0.6m, 深 0.38m)
  const cabinetW = 1.0;
  const cabinetH = 0.6;
  const cabinetD = 0.38;
  const boardThick = 0.02;

  // 门板尺寸 (宽 0.99m, 高 0.59m, 厚 0.022m)
  const doorW = 0.99;
  const doorH = 0.59;
  const doorThick = 0.022;

  // 吊柜顶部上沿铰链转轴中心世界 Y 坐标
  const topHingeY = cabinetH / 2;
  const frontZ = cabinetD / 2;

  return (
    <group position={[0, 0, 0]}>
      {/* ================= 0. 后方厨房背景墙 ================= */}
      <mesh position={[0, 0, -cabinetD / 2 - 0.02]}>
        <boxGeometry args={[2.6, 2.2, 0.03]} />
        <meshStandardMaterial color="#f8fafc" roughness={0.4} />
      </mesh>

      {/* ================= 1. 极简上翻吊柜箱体 (现代意式哑光暖灰) ================= */}
      <group position={[0, 0, 0]}>
        {/* 顶板 */}
        <mesh position={[0, cabinetH / 2 - boardThick / 2, 0]}>
          <boxGeometry args={[cabinetW, boardThick, cabinetD]} />
          <meshStandardMaterial color="#334155" roughness={0.3} />
        </mesh>
        {/* 底板 */}
        <mesh position={[0, -cabinetH / 2 + boardThick / 2, 0]}>
          <boxGeometry args={[cabinetW, boardThick, cabinetD]} />
          <meshStandardMaterial color="#334155" roughness={0.3} />
        </mesh>
        {/* 左右侧板 */}
        <mesh position={[-cabinetW / 2 + boardThick / 2, 0, 0]}>
          <boxGeometry args={[boardThick, cabinetH, cabinetD]} />
          <meshStandardMaterial color="#475569" roughness={0.35} />
        </mesh>
        <mesh position={[cabinetW / 2 - boardThick / 2, 0, 0]}>
          <boxGeometry args={[boardThick, cabinetH, cabinetD]} />
          <meshStandardMaterial color="#475569" roughness={0.35} />
        </mesh>
        {/* 暖白细织布纹背板 */}
        <mesh position={[0, 0, -cabinetD / 2 + 0.01]}>
          <boxGeometry args={[cabinetW - boardThick * 2, cabinetH - boardThick * 2, 0.015]} />
          <meshStandardMaterial color="#f1f5f9" roughness={0.5} />
        </mesh>

        {/* 内部中层钢化玻璃隔板 */}
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[cabinetW - boardThick * 2 - 0.01, 0.008, cabinetD - 0.04]} />
          <meshStandardMaterial color="#94a3b8" transparent opacity={0.4} roughness={0.1} />
        </mesh>

        {/* 柜内高定陈列品：玻璃香料罐、高级咖啡豆杯 */}
        {[-0.25, -0.1, 0.15, 0.3].map((x, i) => (
          <mesh key={`jar-${i}`} position={[x, -cabinetH / 4 + 0.05, 0]}>
            <cylinderGeometry args={[0.035, 0.035, 0.1, 16]} />
            <meshStandardMaterial color={i % 2 === 0 ? '#fef08a' : '#fed7aa'} roughness={0.2} transparent opacity={0.9} />
          </mesh>
        ))}

        {/* 顶部隐形 3000K 洗光射灯 */}
        <pointLight position={[0, cabinetH / 2 - 0.08, 0]} intensity={1.2} color="#fef08a" distance={1.2} />
      </group>

      {/* ================= 2. 气动上翻门板（绕顶部铰链轴以 thetaRad 旋转抬起） ================= */}
      {/* 门板顶部旋转枢轴位于 [0, topHingeY, frontZ] */}
      <group position={[0, topHingeY, frontZ]} rotation={[-thetaRad, 0, 0]}>
        {/* 极简高级深灰铝框 + 长虹玻璃面板 */}
        <mesh position={[0, -doorH / 2, doorThick / 2]}>
          <boxGeometry args={[doorW, doorH, doorThick]} />
          <meshStandardMaterial
            color="#eab308"
            roughness={0.25}
            metalness={0.2}
            transparent
            opacity={0.88}
          />
        </mesh>

        {/* 门底金色极简倒扣把手 */}
        <mesh position={[0, -doorH + 0.02, doorThick + 0.01]}>
          <boxGeometry args={[0.3, 0.012, 0.018]} />
          <meshStandardMaterial color="#ca8a04" metalness={0.95} roughness={0.15} />
        </mesh>

        {/* 门板顶部两枚阻尼翻门铰链 */}
        {[-cabinetW / 3, cabinetW / 3].map((xPos, idx) => (
          <mesh key={`hinge-${idx}`} position={[xPos, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.012, 0.012, 0.04, 16]} />
            <meshStandardMaterial color="#64748b" metalness={0.9} roughness={0.1} />
          </mesh>
        ))}
      </group>

      {/* ================= 3. 左右两侧机械阻尼液压气撑杆 (真实 IK 伸缩摆臂) ================= */}
      {[-cabinetW / 2 + boardThick + 0.02, cabinetW / 2 - boardThick - 0.02].map((xSide, idx) => {
        // 柜内固定支撑底座铰点 (在侧板内壁，靠后靠下)
        const baseHingeY = -cabinetH / 4;
        const baseHingeZ = 0.05;

        // 门板上的受力角码点：随门板旋转 (绕 [topHingeY, frontZ])
        // 门内铰点在门板顶部往下 0.28m 处
        const doorArmDist = 0.28;
        const targetHingeY = topHingeY - doorArmDist * Math.cos(thetaRad);
        const targetHingeZ = frontZ + doorArmDist * Math.sin(thetaRad);

        // 两点之间的向量与气撑实际长度
        const deltaY = targetHingeY - baseHingeY;
        const deltaZ = targetHingeZ - baseHingeZ;
        const currentStrutLength = Math.sqrt(deltaY * deltaY + deltaZ * deltaZ);
        const strutAngle = Math.atan2(deltaZ, deltaY); // 气撑与垂直线的倾角

        return (
          <group key={`strut-${idx}`} position={[xSide, baseHingeY, baseHingeZ]}>
            {/* 柜体底座铰码 */}
            <mesh rotation={[0, 0, Math.PI / 2]}>
              <cylinderGeometry args={[0.01, 0.01, 0.018, 12]} />
              <meshStandardMaterial color="#475569" metalness={0.9} />
            </mesh>

            {/* 整个气动杆绕底座向外倾斜 */}
            <group rotation={[strutAngle, 0, 0]}>
              {/* 外缸体 (粗金属套筒管) */}
              <mesh position={[0, currentStrutLength * 0.35, 0]}>
                <cylinderGeometry args={[0.009, 0.009, currentStrutLength * 0.7, 16]} />
                <meshStandardMaterial color="#1e293b" metalness={0.85} roughness={0.2} />
              </mesh>
              {/* 内伸缩活塞杆 (高光镀铬杆) */}
              <mesh position={[0, currentStrutLength * 0.7, 0]}>
                <cylinderGeometry args={[0.0055, 0.0055, currentStrutLength * 0.6, 16]} />
                <meshStandardMaterial color="#f1f5f9" metalness={0.98} roughness={0.1} />
              </mesh>
            </group>
          </group>
        );
      })}

      {/* ================= 4. 核心几何高光：直角三角形 IK 运动学投影网 (asin/acos/atan 直观三合一) ================= */}
      {/* 放置在右侧门板边缘，形成发光的几何空间辅助线 */}
      <group position={[cabinetW / 2 + 0.06, topHingeY, frontZ]}>
        {/* ① 斜边 r (#ArmLength = 400mm，随 θ 角度旋转指向门扇受力点) */}
        <group rotation={[-thetaRad, 0, 0]}>
          <mesh position={[0, -armLengthM / 2, 0]}>
            <cylinderGeometry args={[0.004, 0.004, armLengthM, 16]} />
            <meshStandardMaterial color="#eab308" emissive="#eab308" emissiveIntensity={1.5} />
          </mesh>
        </group>

        {/* 旋转末端点坐标：Y = -armLengthM * cos(theta), Z = armLengthM * sin(theta) */}
        {(() => {
          const endY = -armLengthM * Math.cos(thetaRad);
          const endZ = armLengthM * Math.sin(thetaRad);

          return (
            <>
              {/* ② 垂直对边 y (#LiftH 高度提升分量：asin 对应项) */}
              <mesh position={[0, endY / 2, endZ]}>
                <boxGeometry args={[0.004, Math.abs(endY), 0.004]} />
                <meshStandardMaterial color="#06b6d4" emissive="#06b6d4" emissiveIntensity={1.8} />
              </mesh>

              {/* ③ 水平邻边 x (projD 水平探出安全公差：acos 对应项) */}
              <mesh position={[0, 0, endZ / 2]}>
                <boxGeometry args={[0.004, 0.004, endZ]} />
                <meshStandardMaterial color="#10b981" emissive="#10b981" emissiveIntensity={1.8} />
              </mesh>

              {/* ④ 直角角标 (标志直角三角形) */}
              <mesh position={[0, 0.015, endZ - 0.015]}>
                <boxGeometry args={[0.003, 0.03, 0.003]} />
                <meshBasicMaterial color="#ffffff" />
              </mesh>
              <mesh position={[0, 0.03, endZ - 0.015]}>
                <boxGeometry args={[0.003, 0.003, 0.03]} />
                <meshBasicMaterial color="#ffffff" />
              </mesh>

              {/* 关键端点小发光球 */}
              <mesh position={[0, endY, endZ]}>
                <sphereGeometry args={[0.014, 16, 16]} />
                <meshStandardMaterial color="#eab308" emissive="#ca8a04" emissiveIntensity={2.5} />
              </mesh>
            </>
          );
        })()}
      </group>
    </group>
  );
};

export const InvTrigStoryScene: React.FC<InvTrigStorySceneProps> = (props) => {
  const liftH = props.liftH ?? 240;
  const armLength = 400;
  const safeLiftH = Math.min(Math.max(liftH, 20), 399);

  // 反三角函数三种求解
  const ratioSin = safeLiftH / armLength;
  const thetaAsinRad = Math.asin(ratioSin);
  const thetaAsinDeg = ((thetaAsinRad * 180) / Math.PI).toFixed(1);

  const projD = Math.sqrt(armLength * armLength - safeLiftH * safeLiftH);
  const ratioCos = projD / armLength;
  const thetaAcosRad = Math.acos(ratioCos);
  const thetaAcosDeg = ((thetaAcosRad * 180) / Math.PI).toFixed(1);

  const ratioTan = safeLiftH / Math.max(projD, 0.1);
  const thetaAtanRad = Math.atan(ratioTan);
  const thetaAtanDeg = ((thetaAtanRad * 180) / Math.PI).toFixed(1);

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
          background: 'linear-gradient(135deg, #eab3080f 0%, #fde0471a 100%)',
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
          asin / acos / atan (反三角函数一体化)
        </h2>
        <div
          style={{
            background: '#ffffff',
            border: '1px solid #fde04760',
            padding: '8px 18px',
            borderRadius: '10px',
            fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
            fontSize: '14px',
            fontWeight: 700,
            color: '#ca8a04',
            boxShadow: '0 4px 12px -2px #eab30815',
          }}
        >
          θ = asin(对/斜) = acos(邻/斜) = atan(对/邻)
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
            background: 'radial-gradient(circle at 50% 45%, #ffffff 0%, #f8fafc 65%, #fefce8 100%)',
          }}
        >
          <Canvas camera={{ position: [0.85, 0.35, 2.2], fov: 42 }} gl={{ antialias: true }}>
            <color attach="background" args={['#fafafa']} />
            <ambientLight intensity={1.25} />
            <directionalLight position={[6, 12, 8]} intensity={1.3} castShadow />
            <directionalLight position={[-6, 6, 4]} intensity={0.65} />
            <directionalLight position={[0, -2, 4]} intensity={0.3} />

            {/* 百隆上翻吊柜模型 */}
            <BlumLiftCabinetMesh {...props} />

            <ContactShadows
              position={[0, -0.65, 0]}
              opacity={0.32}
              scale={5}
              blur={2.4}
              far={2.8}
              color="#334155"
            />
            <OrbitControls target={[0, 0.05, 0]} enableZoom={true} maxPolarAngle={Math.PI / 2 + 0.04} />
          </Canvas>

          {/* 实时状态悬浮卡片（三合一反三角函数校验） */}
          <div
            style={{
              position: 'absolute',
              top: '16px',
              left: '20px',
              background: 'rgba(255, 255, 255, 0.96)',
              backdropFilter: 'blur(12px)',
              border: '1.5px solid #eab308',
              padding: '14px 20px',
              borderRadius: '12px',
              boxShadow: '0 6px 20px rgba(234, 179, 8, 0.15)',
              fontSize: '13px',
              color: '#334155',
              minWidth: '400px',
            }}
          >
            <div style={{ fontWeight: 700, color: '#0f172a', marginBottom: '8px', fontSize: '14px' }}>
              开门抬升高度目标：<code style={{ background: '#fef9c3', color: '#854d0e', padding: '2px 6px', borderRadius: '4px' }}>
                #LiftH = {safeLiftH} mm
              </code>
              <span style={{ fontSize: '12px', color: '#64748b', marginLeft: '8px' }}>
                (支撑臂定长 400mm)
              </span>
            </div>

            {/* 三大反三角函数殊途同归计算 */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', borderTop: '1px dashed #e2e8f0', paddingTop: '8px' }}>
              {/* 1. asin */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: '#0284c7' }}>
                  <strong>asin</strong>(对边/斜边): <code>asin({safeLiftH}/400)</code>
                </span>
                <span style={{ fontWeight: 800, color: '#0284c7', background: '#e0f2fe', padding: '2px 8px', borderRadius: '4px' }}>
                  θ = {thetaAsinDeg}°
                </span>
              </div>

              {/* 2. acos */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: '#059669' }}>
                  <strong>acos</strong>(邻边/斜边): <code>acos({projD.toFixed(0)}/400)</code>
                </span>
                <span style={{ fontWeight: 800, color: '#059669', background: '#d1fae5', padding: '2px 8px', borderRadius: '4px' }}>
                  θ = {thetaAcosDeg}°
                </span>
              </div>

              {/* 3. atan */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: '#d97706' }}>
                  <strong>atan</strong>(对边/邻边): <code>atan({safeLiftH}/{projD.toFixed(0)})</code>
                </span>
                <span style={{ fontWeight: 800, color: '#d97706', background: '#fef3c7', padding: '2px 8px', borderRadius: '4px' }}>
                  θ = {thetaAtanDeg}°
                </span>
              </div>
            </div>

            {/* 联动解算说明 */}
            <div
              style={{
                fontSize: '12px',
                color: '#854d0e',
                marginTop: '8px',
                lineHeight: '1.6',
                background: '#fefce8',
                padding: '8px 10px',
                borderRadius: '6px',
              }}
            >
              ✦ <strong>殊途同归</strong>：拉动滑块时，三大反三角函数从不同投影分量出发，全部精准反解出同一个机械转角 <strong>{thetaAsinDeg}°</strong>，驱动五金液压杆平滑伸缩！
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
            ✦ 3D 视口：按住鼠标左键旋转查看柜内香料瓶与侧面直角三角力学投影 · 右键平移 · 滚轮缩放
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
              📖 业务故事：百隆式气撑上翻门五金连杆反向运动学 (IK) 统一求解
            </h4>
            <p
              style={{
                margin: 0,
                fontSize: '13px',
                lineHeight: '1.6',
                color: '#475569',
              }}
            >
              高定厨房吊柜上翻门中，气动液压杆的刚体物理长度 <code>400mm</code> 是固定不可变的。当用户希望门板精确悬停在离台面 <code>240mm</code> 净高时，底层的机械旋转关节到底应该偏转多少度？通过反三角函数 <code>asin(对/斜)</code>、<code>acos(邻/斜)</code> 或 <code>atan(对/邻)</code>，系统无需物理反复试凑，直接精准反解出所需的旋转角 <strong>θ</strong>，平滑驱动 3D 骨骼与连杆机构！
            </p>
          </div>
          <div
            style={{
              fontSize: '13px',
              lineHeight: '1.6',
              color: '#713f12',
              background: '#eab3080d',
              borderLeft: '3px solid #eab308',
              padding: '10px 14px',
              borderRadius: '0 8px 8px 0',
            }}
          >
            <strong>💡 工业制造价值：</strong>
            反三角函数族（asin / acos / atan）是 3D 刚体反向运动学（IK）的数学核心。在已知末端执行器（如门把手、抽屉面板）的空间目标位移坐标时，逆向求解关节电机的旋转角度与机械臂铰链姿态，是现代智能家居五金仿真的灵魂工具。
          </div>
        </div>
      </div>
    </div>
  );
};
