import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

export interface SqrtStorySceneProps {
  w?: number;
  h?: number;
}

/**
 * 家装真实高频场景：
 * 意式极简/工业风开放式书架「X形不锈钢对角防晃拉杆精确开料下料」
 * 勾股定理：Diag = sqrt(W² + H²)
 */
const IndustrialBookcaseMesh: React.FC<SqrtStorySceneProps> = ({
  w = 800,
  h = 600,
}) => {
  // 尺寸映射 (米)
  const widthM = w / 1000;
  const heightM = h / 1000;
  const depthM = 0.35; // 进深 350mm

  // 勾股定理对角线长度与倾角
  const diagM = Math.sqrt(widthM * widthM + heightM * heightM);
  const diagMm = Math.round(diagM * 1000);
  const diagAngle = Math.atan2(heightM, widthM);

  // 框架金属方管型材宽度 24mm，隔板厚度 25mm
  const profile = 0.024;
  const shelfThick = 0.025;

  // 四个端点精确坐标：左下、右上、右下、左上
  // 左右立柱中心位于 ±(widthM / 2 - profile / 2)，上下位于 ±(heightM / 2)
  const spanX = widthM - profile;
  const spanY = heightM;
  // 实际拉杆净长与对角线夹角 (与水平 X 轴夹角)
  const exactDiagM = Math.sqrt(spanX * spanX + spanY * spanY);
  const exactAngle = Math.atan2(spanY, spanX);

  return (
    <group position={[0, -0.05, 0]}>
      {/* ================= 0. 空间环境：温馨室内木地板与雅致后墙 ================= */}
      <mesh position={[0, 0.2, -depthM / 2 - 0.04]}>
        <boxGeometry args={[3.8, 2.6, 0.04]} />
        <meshStandardMaterial color="#f8fafc" roughness={0.5} />
      </mesh>
      {/* 踢脚线 */}
      <mesh position={[0, -heightM / 2 - 0.2 + 0.03, -depthM / 2 - 0.015]}>
        <boxGeometry args={[3.8, 0.06, 0.012]} />
        <meshStandardMaterial color="#cbd5e1" roughness={0.3} />
      </mesh>
      {/* 人字拼木地板 */}
      <mesh position={[0, -heightM / 2 - 0.2 - 0.005, depthM / 2 + 0.4]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[3.8, 2.4]} />
        <meshStandardMaterial color="#ebe5df" roughness={0.65} />
      </mesh>

      {/* ================= 1. 哑黑金属工业风书架立柱与横梁系统 ================= */}
      {/* 4 根黑色哑光方管立柱 */}
      {/* 左前 */}
      <mesh position={[-widthM / 2 + profile / 2, 0, depthM / 2 - profile / 2]}>
        <boxGeometry args={[profile, heightM + 0.4, profile]} />
        <meshStandardMaterial color="#1e293b" metalness={0.7} roughness={0.35} />
      </mesh>
      {/* 右前 */}
      <mesh position={[widthM / 2 - profile / 2, 0, depthM / 2 - profile / 2]}>
        <boxGeometry args={[profile, heightM + 0.4, profile]} />
        <meshStandardMaterial color="#1e293b" metalness={0.7} roughness={0.35} />
      </mesh>
      {/* 左后 (拉杆固定端) */}
      <mesh position={[-widthM / 2 + profile / 2, 0, -depthM / 2 + profile / 2]}>
        <boxGeometry args={[profile, heightM + 0.4, profile]} />
        <meshStandardMaterial color="#1e293b" metalness={0.7} roughness={0.35} />
      </mesh>
      {/* 右后 (拉杆固定端) */}
      <mesh position={[widthM / 2 - profile / 2, 0, -depthM / 2 + profile / 2]}>
        <boxGeometry args={[profile, heightM + 0.4, profile]} />
        <meshStandardMaterial color="#1e293b" metalness={0.7} roughness={0.35} />
      </mesh>

      {/* 顶层原木隔板 */}
      <mesh position={[0, heightM / 2, 0]}>
        <boxGeometry args={[widthM + 0.04, shelfThick, depthM + 0.03]} />
        <meshStandardMaterial color="#d4b996" roughness={0.4} />
      </mesh>
      {/* 中间层原木隔板 */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[widthM + 0.04, shelfThick, depthM + 0.03]} />
        <meshStandardMaterial color="#d4b996" roughness={0.4} />
      </mesh>
      {/* 底层原木隔板 */}
      <mesh position={[0, -heightM / 2, 0]}>
        <boxGeometry args={[widthM + 0.04, shelfThick, depthM + 0.03]} />
        <meshStandardMaterial color="#d4b996" roughness={0.4} />
      </mesh>

      {/* 书架四角支撑调节脚垫 */}
      {[-widthM / 2 + profile / 2, widthM / 2 - profile / 2].map((x, i) =>
        [-depthM / 2 + profile / 2, depthM / 2 - profile / 2].map((z, j) => (
          <mesh key={`${i}-${j}`} position={[x, -heightM / 2 - 0.2, z]}>
            <cylinderGeometry args={[0.018, 0.022, 0.015, 16]} />
            <meshStandardMaterial color="#f59e0b" metalness={0.9} roughness={0.2} />
          </mesh>
        ))
      )}

      {/* ================= 2. 架上陈列装饰物（书籍、陶瓷花瓶、储物框） ================= */}
      {/* 中间层：精装书籍群 */}
      <group position={[-widthM / 4, shelfThick / 2 + 0.1, 0]}>
        {[
          { c: '#0284c7', w: 0.03, h: 0.19 },
          { c: '#f59e0b', w: 0.035, h: 0.21 },
          { c: '#10b981', w: 0.028, h: 0.18 },
          { c: '#ef4444', w: 0.032, h: 0.2 },
          { c: '#8b5cf6', w: 0.04, h: 0.22 },
        ].map((book, idx) => (
          <mesh key={idx} position={[(idx - 2) * 0.036, (book.h - 0.2) / 2, 0]}>
            <boxGeometry args={[book.w, book.h, 0.16]} />
            <meshStandardMaterial color={book.c} roughness={0.4} />
          </mesh>
        ))}
      </group>

      {/* 中间层右侧：极简北欧陶瓷艺术花瓶 */}
      <group position={[widthM / 4, shelfThick / 2 + 0.12, 0]}>
        <mesh>
          <cylinderGeometry args={[0.04, 0.065, 0.22, 24]} />
          <meshStandardMaterial color="#ffffff" roughness={0.2} />
        </mesh>
        {/* 干燥花枝条 */}
        <mesh position={[0.01, 0.16, 0]} rotation={[0, 0, 0.15]}>
          <cylinderGeometry args={[0.003, 0.004, 0.16, 8]} />
          <meshStandardMaterial color="#78716c" />
        </mesh>
      </group>

      {/* 顶层：藤编/毛毡收纳盒 */}
      <mesh position={[0, heightM / 2 + shelfThick / 2 + 0.07, 0]}>
        <boxGeometry args={[0.26, 0.13, 0.22]} />
        <meshStandardMaterial color="#e2e8f0" roughness={0.7} />
      </mesh>

      {/* ================= 3. 核心数学构件：背部 X 形不锈钢防晃拉杆系统 ================= */}
      {/* 位于柜体后侧背板平面 Z = -depthM / 2 */}
      <group position={[0, 0, -depthM / 2 + 0.002]}>
        {/* ① 正对角线拉杆：从左下 (-spanX/2, -spanY/2) 到右上 (+spanX/2, +spanY/2) */}
        {/* 在 Three.js 中 cylinderGeometry 默认沿 Y 轴，所以倾角为 -(π/2 - exactAngle) */}
        <group rotation={[0, 0, -(Math.PI / 2 - exactAngle)]}>
          {/* 不锈钢实心圆钢拉杆 */}
          <mesh>
            <cylinderGeometry args={[0.007, 0.007, exactDiagM - 0.04, 16]} />
            <meshStandardMaterial color="#10b981" metalness={0.9} roughness={0.15} emissive="#10b981" emissiveIntensity={0.6} />
          </mesh>
          {/* 中间张紧花篮螺栓调节套筒 (Turnbuckle) */}
          <mesh>
            <cylinderGeometry args={[0.016, 0.016, 0.08, 16]} />
            <meshStandardMaterial color="#f59e0b" metalness={0.9} roughness={0.1} />
          </mesh>
        </group>

        {/* ② 反对角线拉杆：从左上 (-spanX/2, +spanY/2) 到右下 (+spanX/2, -spanY/2) */}
        <group rotation={[0, 0, Math.PI / 2 - exactAngle]}>
          <mesh position={[0, 0, -0.006]}>
            <cylinderGeometry args={[0.007, 0.007, exactDiagM - 0.04, 16]} />
            <meshStandardMaterial color="#10b981" metalness={0.9} roughness={0.15} emissive="#10b981" emissiveIntensity={0.6} />
          </mesh>
          <mesh position={[0, 0, -0.006]}>
            <cylinderGeometry args={[0.016, 0.016, 0.08, 16]} />
            <meshStandardMaterial color="#f59e0b" metalness={0.9} roughness={0.1} />
          </mesh>
        </group>

        {/* 四角固定角码法兰盘与螺栓扣 (4个端点，与立柱内侧端点严丝合缝) */}
        {[
          [-spanX / 2, spanY / 2],
          [spanX / 2, spanY / 2],
          [-spanX / 2, -spanY / 2],
          [spanX / 2, -spanY / 2],
        ].map(([px, py], idx) => (
          <group key={idx} position={[px, py, 0]}>
            {/* 圆形安装底盘 */}
            <mesh rotation={[Math.PI / 2, 0, 0]}>
              <cylinderGeometry args={[0.024, 0.024, 0.006, 16]} />
              <meshStandardMaterial color="#334155" metalness={0.8} />
            </mesh>
            {/* 紧固销钉 */}
            <mesh position={[0, 0, 0.008]}>
              <sphereGeometry args={[0.008, 16, 16]} />
              <meshStandardMaterial color="#f59e0b" metalness={0.9} />
            </mesh>
          </group>
        ))}

        {/* ================= 4. 直角三角形辅助标尺与三边动态标注 ================= */}
        {/* 直角三角形底边 A (宽度 W)：从 (-spanX/2, -spanY/2) 到 (spanX/2, -spanY/2) */}
        <mesh position={[0, -spanY / 2 - 0.025, 0.01]}>
          <boxGeometry args={[spanX, 0.006, 0.006]} />
          <meshStandardMaterial color="#0284c7" emissive="#0284c7" emissiveIntensity={1.8} />
        </mesh>

        {/* 直角三角形竖边 B (高度 H)：从 (spanX/2, -spanY/2) 到 (spanX/2, spanY/2) */}
        <mesh position={[spanX / 2 + 0.025, 0, 0.01]}>
          <boxGeometry args={[0.006, spanY, 0.006]} />
          <meshStandardMaterial color="#f59e0b" emissive="#f59e0b" emissiveIntensity={1.8} />
        </mesh>

        {/* 直角角标 (右下角 90° 标记) */}
        <mesh position={[spanX / 2 - 0.03, -spanY / 2 + 0.015, 0.01]}>
          <boxGeometry args={[0.03, 0.003, 0.003]} />
          <meshBasicMaterial color="#ffffff" />
        </mesh>
        <mesh position={[spanX / 2 - 0.015, -spanY / 2 + 0.03, 0.01]}>
          <boxGeometry args={[0.003, 0.03, 0.003]} />
          <meshBasicMaterial color="#ffffff" />
        </mesh>
      </group>
    </group>
  );
};

export const SqrtStoryScene: React.FC<SqrtStorySceneProps> = (props) => {
  const w = props.w ?? 800;
  const h = props.h ?? 600;

  // 勾股定理数值推导
  const sqW = w * w;
  const sqH = h * h;
  const sumSq = sqW + sqH;
  const diag = Math.sqrt(sumSq);
  const diagRound = Math.round(diag);

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
          background: 'linear-gradient(135deg, #10b9810f 0%, #6ee7b71a 100%)',
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
          sqrt(x) 开平方根
        </h2>
        <div
          style={{
            background: '#ffffff',
            border: '1px solid #6ee7b760',
            padding: '8px 18px',
            borderRadius: '10px',
            fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
            fontSize: '14px',
            fontWeight: 700,
            color: '#059669',
            boxShadow: '0 4px 12px -2px #10b98115',
          }}
        >
          拉杆长度 = sqrt(W² + H²)
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
            background: 'radial-gradient(circle at 50% 40%, #ffffff 0%, #f0fdf4 65%, #ecfdf5 100%)',
          }}
        >
          <Canvas camera={{ position: [0.6, 0.4, 2.3], fov: 42 }} gl={{ antialias: true }}>
            <color attach="background" args={['#fafafa']} />
            <ambientLight intensity={1.3} />
            <directionalLight position={[6, 10, 7]} intensity={1.3} />
            <directionalLight position={[-5, 5, 3]} intensity={0.6} />
            <directionalLight position={[0, -2, 4]} intensity={0.3} />

            {/* 真实工业风书架与 X 防晃拉杆模型 */}
            <IndustrialBookcaseMesh {...props} />

            <OrbitControls target={[0, 0, 0]} enableZoom={true} maxPolarAngle={Math.PI / 2 + 0.04} />
          </Canvas>

          {/* 实时参数与勾股定理计算悬浮卡片 */}
          <div
            style={{
              position: 'absolute',
              top: '16px',
              left: '20px',
              background: 'rgba(255, 255, 255, 0.96)',
              backdropFilter: 'blur(12px)',
              border: '1.5px solid #10b981',
              padding: '14px 20px',
              borderRadius: '12px',
              boxShadow: '0 6px 20px rgba(16, 185, 129, 0.15)',
              fontSize: '13px',
              color: '#334155',
              minWidth: '420px',
            }}
          >
            <div style={{ fontWeight: 700, color: '#0f172a', marginBottom: '8px', fontSize: '14px' }}>
              书架框架几何尺寸：
              <code style={{ background: '#e0f2fe', color: '#0284c7', padding: '2px 6px', borderRadius: '4px', marginRight: '6px' }}>
                宽 W = {w} mm
              </code>
              ×
              <code style={{ background: '#fef3c7', color: '#d97706', padding: '2px 6px', borderRadius: '4px', marginLeft: '6px' }}>
                高 H = {h} mm
              </code>
            </div>

            {/* 勾股定理开方运算详细推导 */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', borderTop: '1px dashed #e2e8f0', paddingTop: '8px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: '#475569' }}>① 底边直角边平方 (W²)：</span>
                <span style={{ fontFamily: 'ui-monospace, monospace', fontWeight: 600, color: '#0284c7' }}>
                  {w}² = {sqW.toLocaleString()} mm²
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: '#475569' }}>② 竖边直角边平方 (H²)：</span>
                <span style={{ fontFamily: 'ui-monospace, monospace', fontWeight: 600, color: '#d97706' }}>
                  {h}² = {sqH.toLocaleString()} mm²
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: '#475569' }}>③ 勾股平方和 (W² + H²)：</span>
                <span style={{ fontFamily: 'ui-monospace, monospace', fontWeight: 600, color: '#0f172a' }}>
                  {sumSq.toLocaleString()} mm²
                </span>
              </div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  background: '#ecfdf5',
                  padding: '6px 10px',
                  borderRadius: '6px',
                  marginTop: '4px',
                }}
              >
                <span style={{ color: '#047857', fontWeight: 700 }}>
                  ④ 斜拉杆下料净长 (sqrt)：
                </span>
                <span
                  style={{
                    fontFamily: 'ui-monospace, monospace',
                    fontWeight: 800,
                    fontSize: '15px',
                    color: '#059669',
                  }}
                >
                  {diagRound} mm (误差&lt;0.1mm)
                </span>
              </div>
            </div>

            {/* 生产指导提示 */}
            <div
              style={{
                fontSize: '12px',
                color: '#065f46',
                marginTop: '8px',
                lineHeight: '1.5',
                background: '#f0fdf4',
                padding: '6px 10px',
                borderRadius: '6px',
              }}
            >
              ✓ <strong>BIM 自适应下料</strong>：修改框架长宽，X交叉防晃拉杆长度联动更新，确保两端销钉孔距 100% 紧固贴合！
            </div>
          </div>

          {/* 3D 视角操作提示 */}
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
            ✦ 3D 视口：按住鼠标左键旋转查看实景书架与拉杆 · 右键平移 · 滚轮缩放
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
              📖 业务故事：意式极简开放式书架对角 X 防晃拉杆精密开料
            </h4>
            <p
              style={{
                margin: 0,
                fontSize: '13px',
                lineHeight: '1.6',
                color: '#475569',
              }}
            >
              在现代轻奢与工业风全屋定制中，通透的大跨度落地书架需要背部交叉拉杆来抵御左右剪切晃动。无论设计师把格架拉伸为 <code>800×600</code> 还是 <code>1000×900</code>，工厂数控切割机必须依靠 <code>sqrt(#W*#W + #H*#H)</code> 立即算准钢丝拉杆总长与端部螺纹冲孔位置，彻底告别工人手工斜拉皮尺产生的装配误差！
            </p>
          </div>
          <div
            style={{
              fontSize: '13px',
              lineHeight: '1.6',
              color: '#065f46',
              background: '#10b9810d',
              borderLeft: '3px solid #10b981',
              padding: '10px 14px',
              borderRadius: '0 8px 8px 0',
            }}
          >
            <strong>💡 家装参数化与工程价值：</strong>
            <code>sqrt</code> 是几何计算中的“斜边与距离标尺”，驱动所有对角支撑拉杆、斜撑受力件、三角吊挂构件的自适应参数化伸缩与数控开料，是结构刚性与安装精度的核心保障。
          </div>
        </div>
      </div>
    </div>
  );
};
