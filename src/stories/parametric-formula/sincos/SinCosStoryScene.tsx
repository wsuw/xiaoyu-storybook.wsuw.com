import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

export interface SinCosStorySceneProps {
  angle?: number;
}

/**
 * 家装最常见、最核心的参数化场景：
 * 现代极简满墙木饰面「隐形门 / 暗门开合回转半径与防碰包络线」
 * 业务与数学核心：
 * X = W * cos(θ), Z = W * sin(θ)
 * 隐形门扇宽度 W = 860mm (0.86m)，轴心位于门轴转角处 [hingeX, 0, hingeZ]。
 * - 0° (完全闭合): 门扇与墙面 100% 严丝合缝隐入背景木饰面，门缝仅 2mm，完全看不出有门；
 * - 0° ~ 90° (推开过程): 门扇最外侧活动角点，严格遵循 (W·cosθ, W·sinθ) 在空间画出四分之一圆弧；
 * - 90° (全开模式): 门扇完全垂直推开，露出后方静谧书房/主卧空间。
 */
const SecretHiddenDoorMesh: React.FC<SinCosStorySceneProps> = ({
  angle = 45,
}) => {
  // 限制开门角度在 0° ~ 90° 之间
  const clampedAngle = Math.min(Math.max(angle, 0), 90);
  const rad = (clampedAngle * Math.PI) / 180;

  // 门扇物理尺寸 (宽 860mm, 高 2200mm, 厚 50mm 极简厚门)
  const doorWMm = 860;
  const doorWM = doorWMm / 1000;
  const doorH = 2.2;
  const doorThick = 0.05;

  // 正余弦坐标计算 (门把手/门扇外沿角点的空间相对位移)
  const cosVal = Math.cos(rad);
  const sinVal = Math.sin(rad);

  // 墙体在 Z = 0，总宽 3.8m，高 2.6m
  // 门洞中心 X = 0，门洞宽 = doorWM = 0.86m, 高 = doorH = 2.2m
  // 左墙：从 X = -1.9 到 X = -0.43 (宽 1.47m)
  // 右墙：从 X = +0.43 到 X = +1.9 (宽 1.47m)
  // 顶过梁：从 X = -0.43 到 X = +0.43，从 Y = doorH/2 到 Y = 1.3 (高 0.4m)
  const hingeX = -doorWM / 2; // -0.43m
  const hingeZ = 0;

  // 门扇外沿自由端 (开门时向客厅前方推开，Z > 0；或向内开)
  // 向客厅外开: 绕 (hingeX, 0, hingeZ) 旋转，推向客厅 Z > 0
  // tipX = hingeX + doorWM * cosVal
  // tipZ = hingeZ + doorWM * sinVal
  const tipX = hingeX + doorWM * cosVal;
  const tipZ = hingeZ + doorWM * sinVal;

  return (
    <group position={[0, -0.05, 0]}>
      {/* ================= 1. 地面环境 (覆盖客厅与储藏室) ================= */}
      {/* 室内大面积地面 (Y = -doorH / 2 - 0.01) */}
      <mesh position={[0, -doorH / 2 - 0.01, 0.4]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[4.4, 3.8]} />
        <meshStandardMaterial color="#ebe5df" roughness={0.65} />
      </mesh>

      {/* 客厅踢脚线 (紧贴背景墙，门洞处断开) */}
      <mesh position={[-1.165, -doorH / 2 + 0.03, 0.03]}>
        <boxGeometry args={[1.47, 0.06, 0.012]} />
        <meshStandardMaterial color="#334155" roughness={0.4} />
      </mesh>
      <mesh position={[1.165, -doorH / 2 + 0.03, 0.03]}>
        <boxGeometry args={[1.47, 0.06, 0.012]} />
        <meshStandardMaterial color="#334155" roughness={0.4} />
      </mesh>

      {/* 客厅绿植装饰 (右侧角落，营造真实客厅氛围，不遮挡门) */}
      <group position={[1.5, -doorH / 2, 0.45]}>
        {/* 花盆 */}
        <mesh position={[0, 0.22, 0]}>
          <cylinderGeometry args={[0.14, 0.1, 0.44, 24]} />
          <meshStandardMaterial color="#e2e8f0" roughness={0.3} />
        </mesh>
        {/* 绿植叶片 */}
        <mesh position={[0, 0.55, 0]}>
          <sphereGeometry args={[0.2, 16, 16]} />
          <meshStandardMaterial color="#166534" roughness={0.5} />
        </mesh>
        <mesh position={[0.08, 0.72, 0.04]}>
          <sphereGeometry args={[0.16, 16, 16]} />
          <meshStandardMaterial color="#15803d" roughness={0.5} />
        </mesh>
      </group>

      {/* 客厅边几/挂钟装饰 (左侧角落) */}
      <group position={[-1.45, -doorH / 2, 0.4]}>
        <mesh position={[0, 0.28, 0]}>
          <cylinderGeometry args={[0.18, 0.18, 0.56, 24]} />
          <meshStandardMaterial color="#475569" roughness={0.3} />
        </mesh>
        <mesh position={[0, 0.58, 0]}>
          <boxGeometry args={[0.1, 0.04, 0.14]} />
          <meshStandardMaterial color="#e2e8f0" />
        </mesh>
      </group>

      {/* ================= 2. 连续一体的客厅主背景墙 (隐形门所在平面，Z = 0) ================= */}
      {/* 墙面采用高定暖灰木饰面板，整墙无缝对接，门扇与墙面 100% 材质统一 */}
      {/* 左墙 (宽 1.47m, 高 2.6m) */}
      <mesh position={[-1.165, 0.15, 0]}>
        <boxGeometry args={[1.47, doorH + 0.3, doorThick]} />
        <meshStandardMaterial color="#ded7cc" roughness={0.5} />
      </mesh>
      {/* 右墙 (宽 1.47m, 高 2.6m) */}
      <mesh position={[1.165, 0.15, 0]}>
        <boxGeometry args={[1.47, doorH + 0.3, doorThick]} />
        <meshStandardMaterial color="#ded7cc" roughness={0.5} />
      </mesh>
      {/* 门洞上方过梁连贯顶墙 (宽 0.86m, 高 0.3m, 完美闭合门洞上方) */}
      <mesh position={[0, doorH / 2 + 0.15, 0]}>
        <boxGeometry args={[doorWM, 0.3, doorThick]} />
        <meshStandardMaterial color="#ded7cc" roughness={0.5} />
      </mesh>

      {/* 背景墙木饰面轻奢微缝分缝线细节 (展示高级整木定制工艺) */}
      <mesh position={[-0.7, 0.15, 0.026]}>
        <boxGeometry args={[0.003, doorH + 0.3, 0.002]} />
        <meshBasicMaterial color="#b7ab98" />
      </mesh>
      <mesh position={[0.7, 0.15, 0.026]}>
        <boxGeometry args={[0.003, doorH + 0.3, 0.002]} />
        <meshBasicMaterial color="#b7ab98" />
      </mesh>

      {/* ================= 3. 门后的储藏室空间 (Z < 0 区域，开门后一览无余) ================= */}
      <group position={[0, 0, 0]}>
        {/* 储藏室后壁 (Z = -1.3) */}
        <mesh position={[0, 0.15, -1.3]}>
          <boxGeometry args={[1.2, doorH + 0.3, 0.03]} />
          <meshStandardMaterial color="#f1f5f9" roughness={0.7} />
        </mesh>
        {/* 储藏室左壁 (X = -0.6) */}
        <mesh position={[-0.6, 0.15, -0.65]}>
          <boxGeometry args={[0.03, doorH + 0.3, 1.3]} />
          <meshStandardMaterial color="#f8fafc" roughness={0.7} />
        </mesh>
        {/* 储藏室右壁 (X = +0.6) */}
        <mesh position={[0.6, 0.15, -0.65]}>
          <boxGeometry args={[0.03, doorH + 0.3, 1.3]} />
          <meshStandardMaterial color="#f8fafc" roughness={0.7} />
        </mesh>
        {/* 储藏室天花顶板 */}
        <mesh position={[0, doorH / 2 + 0.3, -0.65]}>
          <boxGeometry args={[1.2, 0.03, 1.3]} />
          <meshStandardMaterial color="#f8fafc" roughness={0.7} />
        </mesh>

        {/* 储藏室内置感应条形筒灯 (暖黄光，开门时格外吸睛) */}
        <pointLight position={[0, doorH / 2 + 0.1, -0.6]} intensity={1.8} color="#fef08a" distance={2.8} />
        <mesh position={[0, doorH / 2 + 0.28, -0.6]}>
          <boxGeometry args={[0.6, 0.02, 0.06]} />
          <meshStandardMaterial color="#ffffff" emissive="#fef08a" emissiveIntensity={1.5} />
        </mesh>

        {/* --- 储藏室真实软装家具：工业风轻型置物货架系统 --- */}
        <group position={[0, -doorH / 2, -1.05]}>
          {/* 金属货架四角立柱 */}
          <mesh position={[-0.45, 0.9, 0]}>
            <boxGeometry args={[0.025, 1.8, 0.025]} />
            <meshStandardMaterial color="#334155" metalness={0.7} />
          </mesh>
          <mesh position={[0.45, 0.9, 0]}>
            <boxGeometry args={[0.025, 1.8, 0.025]} />
            <meshStandardMaterial color="#334155" metalness={0.7} />
          </mesh>
          <mesh position={[-0.45, 0.9, -0.2]}>
            <boxGeometry args={[0.025, 1.8, 0.025]} />
            <meshStandardMaterial color="#334155" metalness={0.7} />
          </mesh>
          <mesh position={[0.45, 0.9, -0.2]}>
            <boxGeometry args={[0.025, 1.8, 0.025]} />
            <meshStandardMaterial color="#334155" metalness={0.7} />
          </mesh>

          {/* 4 层置物层板 */}
          {[0.2, 0.65, 1.1, 1.55].map((y, idx) => (
            <mesh key={idx} position={[0, y, -0.1]}>
              <boxGeometry args={[0.92, 0.025, 0.24]} />
              <meshStandardMaterial color="#64748b" metalness={0.5} roughness={0.4} />
            </mesh>
          ))}

          {/* 储物盒 / 收纳箱 (第 1 层：白色加厚收纳盒) */}
          <mesh position={[-0.24, 0.35, -0.1]}>
            <boxGeometry args={[0.36, 0.26, 0.2]} />
            <meshStandardMaterial color="#ffffff" roughness={0.3} />
          </mesh>
          <mesh position={[0.22, 0.35, -0.1]}>
            <boxGeometry args={[0.38, 0.26, 0.2]} />
            <meshStandardMaterial color="#f1f5f9" roughness={0.3} />
          </mesh>

          {/* 储物盒 / 收纳箱 (第 2 层：半透明/彩色储物盒) */}
          <mesh position={[-0.22, 0.8, -0.1]}>
            <boxGeometry args={[0.32, 0.26, 0.2]} />
            <meshStandardMaterial color="#38bdf8" roughness={0.4} />
          </mesh>
          <mesh position={[0.2, 0.8, -0.1]}>
            <boxGeometry args={[0.36, 0.26, 0.2]} />
            <meshStandardMaterial color="#fdba74" roughness={0.4} />
          </mesh>

          {/* 收纳纸箱 (第 3 层：牛皮纸快递储物箱) */}
          <mesh position={[-0.15, 1.25, -0.1]}>
            <boxGeometry args={[0.48, 0.26, 0.2]} />
            <meshStandardMaterial color="#b45309" roughness={0.8} />
          </mesh>
        </group>

        {/* 储藏室右侧：折叠人字梯 / 家用工具箱 */}
        <group position={[0.35, -doorH / 2, -0.45]} rotation={[0, -0.3, 0]}>
          {/* 折叠人字梯 */}
          <mesh position={[0, 0.55, 0]}>
            <boxGeometry args={[0.06, 1.1, 0.12]} />
            <meshStandardMaterial color="#ef4444" metalness={0.6} />
          </mesh>
        </group>

        {/* 储藏室左侧：立式吸尘器模型 */}
        <group position={[-0.35, -doorH / 2, -0.45]}>
          {/* 吸尘器底座 */}
          <mesh position={[0, 0.04, 0]}>
            <boxGeometry args={[0.18, 0.08, 0.15]} />
            <meshStandardMaterial color="#0f172a" />
          </mesh>
          {/* 延长金属杆 */}
          <mesh position={[0, 0.5, 0]}>
            <cylinderGeometry args={[0.015, 0.015, 0.85, 16]} />
            <meshStandardMaterial color="#94a3b8" metalness={0.8} />
          </mesh>
          {/* 吸尘器主机集尘桶 */}
          <mesh position={[0, 0.88, 0.04]}>
            <cylinderGeometry args={[0.05, 0.05, 0.22, 16]} />
            <meshStandardMaterial color="#7c3aed" roughness={0.3} />
          </mesh>
        </group>
      </group>

      {/* ================= 4. 隐形天地轴铰链 (位于左侧边缘 X = hingeX = -0.43, Z = 0) ================= */}
      <mesh position={[hingeX, doorH / 2 - 0.01, 0]}>
        <cylinderGeometry args={[0.012, 0.012, 0.024, 16]} />
        <meshStandardMaterial color="#1e293b" metalness={0.9} />
      </mesh>
      <mesh position={[hingeX, -doorH / 2 + 0.01, 0]}>
        <cylinderGeometry args={[0.012, 0.012, 0.024, 16]} />
        <meshStandardMaterial color="#1e293b" metalness={0.9} />
      </mesh>

      {/* ================= 5. 核心活动隐形门扇 (绕 [hingeX, 0, 0] 旋转) ================= */}
      {/* 门扇闭合时(rad=0)：平齐贴合 Z = 0 处，与左右木饰面毫无间隙 */}
      {/* 随着 rad 增大，门扇向客厅 (Z > 0) 推开，露出背后的储藏室 */}
      <group position={[hingeX, 0, 0]} rotation={[0, -rad, 0]}>
        {/* 门扇本体 (高定木饰面板，宽度 doorWM - 0.004，留 2mm 极细工艺缝) */}
        <mesh position={[doorWM / 2, 0, 0]}>
          <boxGeometry args={[doorWM - 0.004, doorH, doorThick]} />
          <meshStandardMaterial color="#ded7cc" roughness={0.5} />
        </mesh>

        {/* 极简隐形门推弹器/把手侧凹槽 (客餐厅侧无明装锁，仅右侧微型嵌槽) */}
        <mesh position={[doorWM - 0.06, 0, doorThick / 2 + 0.001]}>
          <boxGeometry args={[0.012, 0.2, 0.002]} />
          <meshStandardMaterial color="#78716c" metalness={0.8} />
        </mesh>

        {/* 门扇自由端外沿高亮信标球 */}
        <mesh position={[doorWM, -doorH / 2 + 0.05, 0]}>
          <sphereGeometry args={[0.016, 16, 16]} />
          <meshStandardMaterial color="#f43f5e" emissive="#f43f5e" emissiveIntensity={2.5} />
        </mesh>
      </group>

      {/* ================= 6. 地面数学几何投影：正弦余弦开门回转圆周与防碰撞包络线 ================= */}
      {/* 放置在地面上方 2mm 处 (Y = -doorH / 2 - 0.01 + 0.002 = -doorH / 2 - 0.008)，防止与地面共面产生 Z-fighting 闪烁 */}
      <group position={[hingeX, -doorH / 2 - 0.008, 0]}>
        {/* ① 90° 发光开门回转圆弧轨迹 (半径 R = 860mm) */}
        <mesh position={[0, 0.001, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[doorWM - 0.006, doorWM + 0.006, 64, 1, 0, Math.PI / 2]} />
          <meshBasicMaterial
            color="#f43f5e"
            transparent
            opacity={0.65}
            depthWrite={false}
            polygonOffset
            polygonOffsetFactor={-1}
          />
        </mesh>

        {/* 扇形扫描安全防碰包络面 (浅粉光晕，直观展示门扇扫过的净空区域) */}
        <mesh position={[0, 0.0005, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <circleGeometry args={[doorWM, 48, 0, rad]} />
          <meshBasicMaterial
            color="#f43f5e"
            transparent
            opacity={0.12}
            depthWrite={false}
            polygonOffset
            polygonOffsetFactor={-1}
          />
        </mesh>

        {/* ② 动态旋转中的门扇底边指向线 (金色) */}
        <group rotation={[0, -rad, 0]}>
          <mesh position={[doorWM / 2, 0.003, 0]}>
            <boxGeometry args={[doorWM, 0.004, 0.004]} />
            <meshStandardMaterial color="#f59e0b" emissive="#f59e0b" emissiveIntensity={1.8} />
          </mesh>
        </group>

        {/* ③ 实时 X 轴余弦水平开合分量 (青色：X = W·cosθ) */}
        <mesh position={[(doorWM * cosVal) / 2, 0.004, 0]}>
          <boxGeometry args={[doorWM * cosVal, 0.005, 0.005]} />
          <meshStandardMaterial color="#06b6d4" emissive="#06b6d4" emissiveIntensity={2.2} />
        </mesh>

        {/* ④ 实时 Z 轴正弦向前探出分量 (绿色：Z = W·sinθ) */}
        <mesh position={[doorWM * cosVal, 0.004, (doorWM * sinVal) / 2]}>
          <boxGeometry args={[0.005, 0.005, doorWM * sinVal]} />
          <meshStandardMaterial color="#10b981" emissive="#10b981" emissiveIntensity={2.2} />
        </mesh>

        {/* 直角角标 */}
        <mesh position={[doorWM * cosVal - 0.02, 0.004, 0.02]}>
          <boxGeometry args={[0.003, 0.003, 0.03]} />
          <meshBasicMaterial color="#ffffff" />
        </mesh>

        {/* 旋转端点当前位置发光球 (地面投影) */}
        <mesh position={[doorWM * cosVal, 0.006, doorWM * sinVal]}>
          <sphereGeometry args={[0.018, 16, 16]} />
          <meshStandardMaterial color="#f43f5e" emissive="#f43f5e" emissiveIntensity={3} />
        </mesh>
      </group>
    </group>
  );
};

export const SinCosStoryScene: React.FC<SinCosStorySceneProps> = (props) => {
  const angle = props.angle ?? 45;
  const clampedAngle = Math.min(Math.max(angle, 0), 95);
  const rad = (clampedAngle * Math.PI) / 180;
  const doorW = 860; // 860mm 门宽

  const cosVal = Math.cos(rad);
  const sinVal = Math.sin(rad);

  const calcX = Math.round(doorW * cosVal);
  const calcZ = Math.round(doorW * sinVal);

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
          background: 'linear-gradient(135deg, #f43f5e0f 0%, #fb71851a 100%)',
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
          sin(θ) 与 cos(θ)
        </h2>
        <div
          style={{
            background: '#ffffff',
            border: '1px solid #fb718560',
            padding: '8px 18px',
            borderRadius: '10px',
            fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
            fontSize: '14px',
            fontWeight: 700,
            color: '#e11d48',
            boxShadow: '0 4px 12px -2px #f43f5e15',
          }}
        >
          X = W·cos(θ),  Z = W·sin(θ)
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
            background: 'radial-gradient(circle at 50% 45%, #ffffff 0%, #f8fafc 65%, #fff1f2 100%)',
          }}
        >
          <Canvas camera={{ position: [0.35, 0.25, 2.9], fov: 40 }} gl={{ antialias: true }}>
            <color attach="background" args={['#fafafa']} />
            <ambientLight intensity={1.35} />
            <directionalLight position={[5, 10, 7]} intensity={1.2} />
            <directionalLight position={[-5, 5, 3]} intensity={0.65} />
            <directionalLight position={[0, -2, 4]} intensity={0.3} />

            {/* 极简满墙木饰面隐形门模型 */}
            <SecretHiddenDoorMesh {...props} />

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
              border: '1.5px solid #f43f5e',
              padding: '14px 20px',
              borderRadius: '12px',
              boxShadow: '0 6px 20px rgba(244, 63, 94, 0.15)',
              fontSize: '13px',
              color: '#334155',
              minWidth: '400px',
            }}
          >
            <div style={{ fontWeight: 700, color: '#0f172a', marginBottom: '8px', fontSize: '14px' }}>
              隐形门开门角度：<code style={{ background: '#ffe4e6', color: '#be123c', padding: '2px 6px', borderRadius: '4px' }}>
                θ = {clampedAngle}°
              </code>
              <span style={{ fontSize: '12px', color: '#64748b', marginLeft: '8px' }}>
                (标准门宽 W = {doorW} mm)
              </span>
            </div>

            {/* 正弦余弦空间投影动态解析 */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', borderTop: '1px dashed #e2e8f0', paddingTop: '8px' }}>
              {/* X 轴剩余开间开合 */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: '#0284c7' }}>
                  <strong>X (门扇横向宽度投影)</strong>: <code>{doorW} × cos({clampedAngle}°)</code>
                </span>
                <span style={{ fontWeight: 800, color: '#0284c7', background: '#e0f2fe', padding: '2px 8px', borderRadius: '4px' }}>
                  {calcX} mm (cos={cosVal.toFixed(3)})
                </span>
              </div>

              {/* Z 轴开门探出深度 */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: '#059669' }}>
                  <strong>Z (开门扫入纵深占用)</strong>: <code>{doorW} × sin({clampedAngle}°)</code>
                </span>
                <span style={{ fontWeight: 800, color: '#059669', background: '#d1fae5', padding: '2px 8px', borderRadius: '4px' }}>
                  {calcZ} mm (sin={sinVal.toFixed(3)})
                </span>
              </div>
            </div>

            {/* 家装核心状态说明 */}
            <div
              style={{
                fontSize: '12px',
                color: '#9f1239',
                marginTop: '8px',
                lineHeight: '1.6',
                background: '#fff1f2',
                padding: '8px 10px',
                borderRadius: '6px',
              }}
            >
              {clampedAngle === 0 ? (
                <>✓ <strong>0° 绝对隐形闭合</strong>：sin=0 纵深外探为0，门扇与左右护墙木饰面平齐严丝合缝，客厅背景墙浑然一体！</>
              ) : clampedAngle >= 88 ? (
                <>✓ <strong>90° 全开通行模式</strong>：cos=0 横向开间全部释放，门洞 860mm 畅通无阻，内嵌储藏室置物架与收纳箱尽收眼底！</>
              ) : (
                <>✦ <strong>开合推演中 ({clampedAngle}°)</strong>：地面红弧与粉色扇区直观描绘门扇回转扫过的物理包络线，精确避开客厅地毯与侧方家具！</>
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
            ✦ 3D 视口：按住鼠标左键旋转查看隐形门与护墙板平齐质感 · 右键平移 · 滚轮缩放
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
              📖 业务故事：客厅整墙木饰面隐形门（储藏室暗门）回转轨迹与防撞包络线
            </h4>
            <p
              style={{
                margin: 0,
                fontSize: '13px',
                lineHeight: '1.6',
                color: '#475569',
              }}
            >
              现代豪宅客厅设计中，<strong>“背景墙一体化隐形暗门”</strong>常用于隐藏通往家政间或储藏室的入口。当用户推开门扇时，门扇外边缘在空间的实时物理轨迹，完全由 <code>X = W·cos(θ)</code> 与 <code>Z = W·sin(θ)</code> 精准决定。小宇利用正余弦函数实时求解门扇回转扫过的四分之一圆弧包络扇区，既能在 <strong>0° 确保门与整面墙绝对平齐隐形</strong>，又能在推开过程中<strong>严密校核门扇与客厅沙发茶几、侧方绿植踢脚线的防碰撞安全距离</strong>！
            </p>
          </div>
          <div
            style={{
              fontSize: '13px',
              lineHeight: '1.6',
              color: '#881337',
              background: '#f43f5e0d',
              borderLeft: '3px solid #f43f5e',
              padding: '10px 14px',
              borderRadius: '0 8px 8px 0',
            }}
          >
            <strong>💡 家装设计与工程价值：</strong>
            <code>sin</code> 与 <code>cos</code> 是全屋定制中所有平开门、隐形门、翻门、转角五金“运动仿真与开合防碰校验”的核心算法基石。它将抽象的角度变量实时转换为三维物理边界，是 BIM 空间碰撞检测与家具人机工程学布局的必备工具。
          </div>
        </div>
      </div>
    </div>
  );
};
