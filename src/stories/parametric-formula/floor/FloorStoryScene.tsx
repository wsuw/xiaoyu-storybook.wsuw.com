import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, ContactShadows } from '@react-three/drei';

export interface FloorStorySceneProps {
  netH?: number;
}

/**
 * 现代高定橱柜/岛台地柜模型
 * 核心逻辑：floor(#NetH / 200)
 * 每个标准阻尼抽屉占用 200mm 物理高度。向下抹零取整，绝不顶爆台面。
 * 顶部剩余富余高度 (<200mm) 自动转化成 45°斜切免拉手内凹槽 + 暖金隐形悬浮洗光透气缝。
 */
const KitchenDrawerCabinetMesh: React.FC<FloorStorySceneProps> = ({
  netH = 720,
}) => {
  // 单个抽屉模组占用净高 200mm
  const drawerUnitMm = 200;
  const count = Math.floor(netH / drawerUnitMm);
  const remainderMm = netH % drawerUnitMm; // 顶部安全富余间隙

  // 比例换算（米为单位，以柜体底面为基准）
  const netHM = netH / 1000;
  const drawerUnitM = drawerUnitMm / 1000;
  const cabinetW = 0.9;
  const cabinetD = 0.6;
  const boardThick = 0.02;
  const countertopH = 0.05; // 50mm 加厚岩板台面
  const plinthH = 0.08; // 80mm 地柜踢脚线/地台

  // 柜底内沿绝对 Y 坐标 (踢脚线上沿 + 底板厚度)
  const bottomInnerY = plinthH + boardThick;
  // 柜顶内沿绝对 Y 坐标 (台面下沿)
  const topInnerY = bottomInnerY + netHM;
  // 抽屉总高度
  const drawersTotalH = count * drawerUnitM;
  // 顶部安全间隙实际高度 (米)
  const gapHeightM = remainderMm / 1000;

  return (
    <group position={[0, -0.65, 0]}>
      {/* ================= 0. 环境地砖与踢脚线 ================= */}
      <mesh position={[0, -0.01, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[3.2, 2.4]} />
        <meshStandardMaterial color="#f1f5f9" roughness={0.7} />
      </mesh>

      {/* 柜体悬浮踢脚线 (深灰铝合金内缩踢脚) */}
      <mesh position={[0, plinthH / 2, -0.02]}>
        <boxGeometry args={[cabinetW - 0.04, plinthH, cabinetD - 0.06]} />
        <meshStandardMaterial color="#334155" metalness={0.8} roughness={0.3} />
      </mesh>

      {/* ================= 1. 柜体箱体结构 (高定哑光米灰/暖白) ================= */}
      {/* 柜体底板 */}
      <mesh position={[0, bottomInnerY - boardThick / 2, 0]}>
        <boxGeometry args={[cabinetW, boardThick, cabinetD]} />
        <meshStandardMaterial color="#e2e8f0" roughness={0.4} />
      </mesh>

      {/* 左右侧立板 */}
      <mesh position={[-cabinetW / 2 + boardThick / 2, bottomInnerY + netHM / 2, 0]}>
        <boxGeometry args={[boardThick, netHM, cabinetD]} />
        <meshStandardMaterial color="#cbd5e1" roughness={0.35} />
      </mesh>
      <mesh position={[cabinetW / 2 - boardThick / 2, bottomInnerY + netHM / 2, 0]}>
        <boxGeometry args={[boardThick, netHM, cabinetD]} />
        <meshStandardMaterial color="#cbd5e1" roughness={0.35} />
      </mesh>

      {/* 柜体后背板 */}
      <mesh position={[0, bottomInnerY + netHM / 2, -cabinetD / 2 + 0.01]}>
        <boxGeometry args={[cabinetW - boardThick * 2, netHM, 0.015]} />
        <meshStandardMaterial color="#e2e8f0" roughness={0.5} />
      </mesh>

      {/* ================= 2. 高级雪花白岩板加厚台面 ================= */}
      <group position={[0, topInnerY + countertopH / 2, 0.01]}>
        {/* 岩板主台面 */}
        <mesh>
          <boxGeometry args={[cabinetW + 0.04, countertopH, cabinetD + 0.03]} />
          <meshStandardMaterial color="#ffffff" roughness={0.2} metalness={0.1} />
        </mesh>
        {/* 台面前沿金色微边条 */}
        <mesh position={[0, -countertopH / 2 + 0.003, (cabinetD + 0.03) / 2]}>
          <boxGeometry args={[cabinetW + 0.04, 0.006, 0.004]} />
          <meshStandardMaterial color="#f59e0b" metalness={0.9} roughness={0.2} />
        </mesh>
        {/* 台面上陈列高级厨房品：木质案板 + 调味研磨罐 */}
        <mesh position={[-0.22, countertopH / 2 + 0.01, 0.02]}>
          <boxGeometry args={[0.26, 0.02, 0.34]} />
          <meshStandardMaterial color="#d4a373" roughness={0.5} />
        </mesh>
        <mesh position={[0.2, countertopH / 2 + 0.06, -0.05]}>
          <cylinderGeometry args={[0.025, 0.03, 0.12, 16]} />
          <meshStandardMaterial color="#334155" metalness={0.7} roughness={0.3} />
        </mesh>
        <mesh position={[0.27, countertopH / 2 + 0.05, -0.03]}>
          <cylinderGeometry args={[0.022, 0.027, 0.1, 16]} />
          <meshStandardMaterial color="#b45309" roughness={0.4} />
        </mesh>
      </group>

      {/* ================= 3. 抽屉组（根据 count = floor(#NetH/200) 动态生成） ================= */}
      {Array.from({ length: count }).map((_, i) => {
        // 每个抽屉面高度稍留 3mm 安装伸缩微缝
        const drawerH = drawerUnitM - 0.005;
        // 抽屉中心 Y 坐标 (自底向上叠放)
        const drawerCenterY = bottomInnerY + i * drawerUnitM + drawerUnitM / 2;

        // 让中间或顶部抽屉稍稍微拉出 (约 6cm~10cm)，展示阻尼滑轨与内部空间深度
        const isPulledOut = count >= 2 ? i === count - 1 : false;
        const pullOffsetZ = isPulledOut ? 0.12 : 0;

        return (
          <group key={`drawer-${i}`} position={[0, drawerCenterY, pullOffsetZ]}>
            {/* ① 抽屉前门板 (雅致暗黛灰哑光烤漆) */}
            <mesh position={[0, 0, cabinetD / 2 + 0.01]}>
              <boxGeometry args={[cabinetW - boardThick * 2 - 0.01, drawerH, 0.02]} />
              <meshStandardMaterial color="#1e293b" roughness={0.35} metalness={0.1} />
            </mesh>

            {/* ② 内嵌高定香槟金拉手 */}
            <mesh position={[0, drawerH / 2 - 0.02, cabinetD / 2 + 0.022]}>
              <boxGeometry args={[0.24, 0.012, 0.01]} />
              <meshStandardMaterial color="#f59e0b" metalness={0.92} roughness={0.15} />
            </mesh>

            {/* ③ 抽屉内胆箱体 (若拉出则清晰可见) */}
            {isPulledOut && (
              <group position={[0, -0.01, cabinetD / 2 - (cabinetD - 0.08) / 2]}>
                {/* 抽屉底板 */}
                <mesh position={[0, -drawerH / 2 + 0.02, 0]}>
                  <boxGeometry args={[cabinetW - 0.1, 0.012, cabinetD - 0.08]} />
                  <meshStandardMaterial color="#f1f5f9" roughness={0.5} />
                </mesh>
                {/* 抽屉左右内帮 */}
                <mesh position={[-(cabinetW - 0.1) / 2 + 0.006, 0, 0]}>
                  <boxGeometry args={[0.012, drawerH - 0.04, cabinetD - 0.08]} />
                  <meshStandardMaterial color="#94a3b8" metalness={0.8} roughness={0.2} />
                </mesh>
                <mesh position={[(cabinetW - 0.1) / 2 - 0.006, 0, 0]}>
                  <boxGeometry args={[0.012, drawerH - 0.04, cabinetD - 0.08]} />
                  <meshStandardMaterial color="#94a3b8" metalness={0.8} roughness={0.2} />
                </mesh>
                {/* 抽屉后帮 */}
                <mesh position={[0, 0, -(cabinetD - 0.08) / 2 + 0.006]}>
                  <boxGeometry args={[cabinetW - 0.12, drawerH - 0.04, 0.012]} />
                  <meshStandardMaterial color="#94a3b8" metalness={0.8} roughness={0.2} />
                </mesh>
                {/* 金属静音隐藏滑轨高光件 */}
                <mesh position={[-(cabinetW - 0.09) / 2 - 0.012, -drawerH / 2 + 0.02, -0.04]}>
                  <boxGeometry args={[0.01, 0.024, 0.35]} />
                  <meshStandardMaterial color="#e2e8f0" metalness={0.95} roughness={0.1} />
                </mesh>
                <mesh position={[(cabinetW - 0.09) / 2 + 0.012, -drawerH / 2 + 0.02, -0.04]}>
                  <boxGeometry args={[0.01, 0.024, 0.35]} />
                  <meshStandardMaterial color="#e2e8f0" metalness={0.95} roughness={0.1} />
                </mesh>
              </group>
            )}
          </group>
        );
      })}

      {/* ================= 4. 核心亮点：顶部抹零余量空间 (防顶爆安全空间) ================= */}
      {remainderMm > 0 && (
        <group position={[0, bottomInnerY + drawersTotalH + gapHeightM / 2, 0]}>
          {/* ① 极简内凹免拉手斜切槽 / 扣手结构 */}
          <mesh position={[0, 0, cabinetD / 2 - 0.02]}>
            <boxGeometry args={[cabinetW - boardThick * 2 - 0.01, gapHeightM * 0.95, 0.04]} />
            <meshStandardMaterial color="#0f172a" roughness={0.6} />
          </mesh>

          {/* ② 隐形 3000K 暖光悬浮洗光灯带 (若余量大于 40mm 产生高级光晕效果) */}
          {remainderMm >= 40 && (
            <>
              <mesh position={[0, gapHeightM / 2 - 0.006, cabinetD / 2 - 0.01]}>
                <boxGeometry args={[cabinetW - 0.08, 0.008, 0.015]} />
                <meshStandardMaterial
                  color="#fbbf24"
                  emissive="#f59e0b"
                  emissiveIntensity={2.5}
                  roughness={0.1}
                />
              </mesh>
              <pointLight position={[0, 0, cabinetD / 2 + 0.04]} intensity={0.9} color="#fde047" distance={0.6} />
            </>
          )}

          {/* ③ 绿色安全余量标注框 (防顶爆指示) */}
          <group position={[0, 0, cabinetD / 2 + 0.035]}>
            {/* 顶线 */}
            <mesh position={[0, gapHeightM / 2, 0]}>
              <boxGeometry args={[0.3, 0.003, 0.003]} />
              <meshStandardMaterial color="#10b981" emissive="#10b981" emissiveIntensity={0.8} />
            </mesh>
            {/* 底线 */}
            <mesh position={[0, -gapHeightM / 2, 0]}>
              <boxGeometry args={[0.3, 0.003, 0.003]} />
              <meshStandardMaterial color="#10b981" emissive="#10b981" emissiveIntensity={0.8} />
            </mesh>
            {/* 竖线 */}
            <mesh position={[0, 0, 0]}>
              <boxGeometry args={[0.003, gapHeightM, 0.003]} />
              <meshStandardMaterial color="#10b981" emissive="#10b981" emissiveIntensity={0.8} />
            </mesh>
          </group>
        </group>
      )}
    </group>
  );
};

export const FloorStoryScene: React.FC<FloorStorySceneProps> = (props) => {
  const netH = props.netH ?? 720;
  const count = Math.floor(netH / 200);
  const remainder = netH % 200;
  const theoretical = (netH / 200).toFixed(2);

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
          background: 'linear-gradient(135deg, #3b82f60f 0%, #60a5fa1a 100%)',
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
          floor(#A)
        </h2>
        <div
          style={{
            background: '#ffffff',
            border: '1px solid #60a5fa60',
            padding: '8px 18px',
            borderRadius: '10px',
            fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
            fontSize: '14px',
            fontWeight: 700,
            color: '#2563eb',
            boxShadow: '0 4px 12px -2px #3b82f615',
          }}
        >
          floor(#NetH / 200)
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
            background: 'radial-gradient(circle at 50% 40%, #ffffff 0%, #f8fafc 65%, #f1f5f9 100%)',
          }}
        >
          <Canvas camera={{ position: [0.8, 0.45, 2.4], fov: 40 }} gl={{ antialias: true }}>
            <color attach="background" args={['#fafafa']} />
            <ambientLight intensity={1.1} />
            <directionalLight position={[5, 10, 6]} intensity={1.2} castShadow />
            <directionalLight position={[-5, 5, 3]} intensity={0.6} />
            <directionalLight position={[0, -2, 4]} intensity={0.25} />

            {/* 高定地柜抽屉模型 */}
            <KitchenDrawerCabinetMesh {...props} />

            <ContactShadows
              position={[0, -0.65, 0]}
              opacity={0.35}
              scale={4}
              blur={2.2}
              far={2.5}
              color="#334155"
            />
            <OrbitControls target={[0, -0.1, 0]} enableZoom={true} maxPolarAngle={Math.PI / 2 + 0.04} />
          </Canvas>

          {/* 实时状态悬浮卡片 */}
          <div
            style={{
              position: 'absolute',
              top: '16px',
              left: '20px',
              background: 'rgba(255, 255, 255, 0.96)',
              backdropFilter: 'blur(12px)',
              border: '1px solid #3b82f6',
              padding: '14px 20px',
              borderRadius: '12px',
              boxShadow: '0 4px 16px rgba(59, 130, 246, 0.12)',
              fontSize: '13px',
              color: '#334155',
              minWidth: '350px',
            }}
          >
            <div style={{ fontWeight: 700, color: '#0f172a', marginBottom: '8px', fontSize: '14px' }}>
              柜内净可用高度：<code style={{ background: '#f1f5f9', padding: '2px 6px', borderRadius: '4px' }}>
                #NetH = {netH} mm
              </code>
            </div>

            {/* floor 绝对向下取整计算 */}
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
              <span><code>floor</code> 抽屉安全容纳数：</span>
              <span
                style={{
                  fontWeight: 800,
                  color: '#1d4ed8',
                  background: '#dbeafe',
                  padding: '3px 10px',
                  borderRadius: '6px',
                  border: '1px solid #bfdbfe',
                }}
              >
                floor({netH} / 200) = {count} 个
              </span>
              <span style={{ fontSize: '12px', color: '#64748b' }}>
                (理论值 {theoretical})
              </span>
            </div>

            {/* 联动安全解释 */}
            <div
              style={{
                fontSize: '12px',
                color: '#1e40af',
                marginTop: '8px',
                lineHeight: '1.6',
                background: '#eff6ff',
                padding: '8px 10px',
                borderRadius: '6px',
              }}
            >
              {remainder === 0 ? (
                <>✓ 柜内空间刚好整除，全部安装 {count} 个阻尼抽屉，严丝合缝。</>
              ) : (
                <>
                  🛡️ 抹去零头 <strong>{remainder} mm</strong>，绝不四舍五入强装第 {count + 1} 个！
                  <br />
                  顶部留出 <strong>{remainder}mm</strong> 安全间隙，联动生成【免拉手内凹槽】与【隐形透气微光带】，杜绝顶死台面！
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
            ✦ 3D 视口：按住鼠标左键旋转观察抽屉阻尼滑轨 · 右键平移 · 滚轮缩放
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
              📖 业务故事：下地柜阻尼抽屉防顶爆安全算量与余量利用
            </h4>
            <p
              style={{
                margin: 0,
                fontSize: '13px',
                lineHeight: '1.6',
                color: '#475569',
              }}
            >
              下地柜净高 <code>720mm</code>，每个阻尼骑马抽屉模组（含底部滚珠轨道与间隙）需占用 <code>200mm</code>。按算术除法是 <code>3.6 个</code>。若四舍五入做 4 个，第 4 个抽屉就会硬顶穿石英石台面造成安装灾难！小宇用 <code>floor(#NetH / 200)</code> 向下抹零稳妥定下 <strong>3 个抽屉</strong>，余下的 <code>120mm</code> 空间作为安全余量，优雅设计为免拉手内凹扣手槽与氛围透气缝！
            </p>
          </div>
          <div
            style={{
              fontSize: '13px',
              lineHeight: '1.6',
              color: '#1e3a8a',
              background: '#3b82f60d',
              borderLeft: '3px solid #3b82f6',
              padding: '10px 14px',
              borderRadius: '0 8px 8px 0',
            }}
          >
            <strong>💡 工业制造价值：</strong>
            <code>floor</code> 是物理包络线内“防机械干涉与安全防撞”的基石。在硬性尺寸边界内做减法，确保五金机械构件拥有足够的安装公差与运动行程，杜绝现场“差 5 毫米塞不进去”的返工惨剧。
          </div>
        </div>
      </div>
    </div>
  );
};
