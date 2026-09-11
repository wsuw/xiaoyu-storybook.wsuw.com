import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, ContactShadows } from '@react-three/drei';

export interface ComparisonsStorySceneProps {
  h?: number;
}

const ComparisonsKitchenMesh: React.FC<ComparisonsStorySceneProps> = ({
  h = 1600,
}) => {
  // 基础常数与缩放映射 (Three.js 单位映射: 1000mm = 1.0)
  // 地台高度 800mm (0.8)
  const isSafe = h >= 1550;
  // 吊柜底部的 Y 轴坐标（地台台面在 Y=0，地面在 Y=-0.8）
  const wallCabinetBottomY = (h - 800) / 1000;
  const wallCabinetH = 0.75;
  const wallCabinetW = 1.8;
  const wallCabinetD = 0.45;

  const baseCabinetH = 0.8;
  const baseCabinetW = 2.0;
  const baseCabinetD = 0.65;

  return (
    <group position={[0, -0.4, 0]}>
      {/* 1. 背后墙体（底部精准对齐地柜底部 Y = -0.8） */}
      {/* 墙体高 2.6，中心在 0.5，底部在 0.5 - 1.3 = -0.8，与地柜底面完全齐平 */}
      <mesh position={[0, 0.5, -baseCabinetD / 2]}>
        <boxGeometry args={[2.4, 2.6, 0.04]} />
        <meshStandardMaterial color="#f1f5f9" roughness={0.6} />
      </mesh>

      {/* 2. 地柜操作台（高度 800mm，底部 Y = -0.8，台面 Y = 0） */}
      <group position={[0, baseCabinetH / 2 - 0.8, 0]}>
        {/* 地柜柜身 */}
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[baseCabinetW, baseCabinetH, baseCabinetD]} />
          <meshStandardMaterial color="#1e293b" roughness={0.4} />
        </mesh>
        {/* 石英石操作台面 */}
        <mesh position={[0, baseCabinetH / 2 + 0.02, 0.02]}>
          <boxGeometry args={[baseCabinetW + 0.04, 0.04, baseCabinetD + 0.04]} />
          <meshStandardMaterial color="#e2e8f0" roughness={0.2} metalness={0.1} />
        </mesh>
      </group>

      {/* 3. 动态移动吊柜（由 #H 驱动） */}
      <group position={[0, wallCabinetBottomY + wallCabinetH / 2, -baseCabinetD / 2 + wallCabinetD / 2 + 0.02]}>
        {/* 吊柜主体（白色） */}
        <mesh position={[0, 0.01, 0]}>
          <boxGeometry args={[wallCabinetW, wallCabinetH - 0.02, wallCabinetD]} />
          <meshStandardMaterial
            color={isSafe ? '#f8fafc' : '#fee2e2'}
            roughness={0.3}
          />
        </mesh>

        {/* 吊柜底板防撞安全指示灯条（独立位于主体下方，厚度 0.02，底面下凸，完全避开面重叠 Z-fighting） */}
        <mesh position={[0, -wallCabinetH / 2 + 0.01, 0]}>
          <boxGeometry args={[wallCabinetW * 0.98, 0.02, wallCabinetD * 0.98]} />
          <meshStandardMaterial
            color={isSafe ? '#22c55e' : '#ef4444'}
            emissive={isSafe ? '#16a34a' : '#dc2626'}
            emissiveIntensity={isSafe ? 0.35 : 0.85}
            roughness={0.2}
          />
        </mesh>

        {/* 吊柜门板分割线 */}
        {[-wallCabinetW / 6, wallCabinetW / 6].map((x, i) => (
          <mesh key={i} position={[x, 0, wallCabinetD / 2 + 0.005]}>
            <boxGeometry args={[0.01, wallCabinetH * 0.95, 0.005]} />
            <meshBasicMaterial color="#94a3b8" />
          </mesh>
        ))}
      </group>

      {/* 4. 当过低时在台面上方显示碰头危险危险区域警戒框 */}
      {!isSafe && (
        <group position={[0, wallCabinetBottomY / 2, 0.05]}>
          <mesh>
            <boxGeometry args={[1.5, Math.max(0.1, wallCabinetBottomY), 0.4]} />
            <meshStandardMaterial
              color="#ef4444"
              transparent
              opacity={0.18}
              wireframe
            />
          </mesh>
        </group>
      )}
    </group>
  );
};

export const ComparisonsStoryScene: React.FC<ComparisonsStorySceneProps> = (props) => {
  const currentH = props.h ?? 1600;
  const isSafe = currentH >= 1550;

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
          {"比较运算符 (<, >, <=, >=)"}
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
          {"if(#H >= 1550, 1, 0)"}
        </div>
      </div>

      <div style={{ flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column' }}>
        <div
          style={{
            flex: 1,
            minHeight: 0,
            width: '100%',
            position: 'relative',
            background: 'radial-gradient(circle at 50% 40%, #ffffff 0%, #0284c708 65%, #0284c716 100%)',
          }}
        >
          <Canvas camera={{ position: [0, 0.4, 4.4], fov: 40 }} gl={{ antialias: true }}>
            <color attach="background" args={['#fafafa']} />
            <ambientLight intensity={0.8} />
            <directionalLight position={[6, 8, 6]} intensity={1.3} castShadow />
            <directionalLight position={[-6, 4, -5]} intensity={0.5} />
            <pointLight position={[0, 1, 2]} intensity={0.7} color="#38bdf8" />
            <ComparisonsKitchenMesh {...props} />
            <ContactShadows
              position={[0, -1.2, 0]}
              opacity={0.35}
              scale={7}
              blur={2}
              far={3}
              color="#0284c7"
            />
            <OrbitControls target={[0, 0.1, 0]} enableZoom={true} maxPolarAngle={Math.PI / 2 + 0.05} />
          </Canvas>

          {/* 实时状态浮窗 */}
          <div
            style={{
              position: 'absolute',
              top: '16px',
              left: '20px',
              background: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(10px)',
              border: '1px solid #e2e8f0',
              padding: '12px 18px',
              borderRadius: '10px',
              boxShadow: '0 4px 14px rgba(0,0,0,0.06)',
              fontSize: '13px',
              color: '#334155',
            }}
          >
            <div style={{ fontWeight: 700, color: '#0f172a', marginBottom: '6px' }}>
              吊柜安装底高：<span style={{ color: '#0284c7' }}>{currentH} mm</span>（基准红线: 1550mm）
            </div>
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              <span>比较判断 <code>#H &gt;= 1550</code>：</span>
              <span
                style={{
                  fontWeight: 700,
                  color: isSafe ? '#16a34a' : '#ef4444',
                  background: isSafe ? '#dcfce7' : '#fee2e2',
                  padding: '2px 8px',
                  borderRadius: '4px',
                }}
              >
                {isSafe ? '成立 (True) → 1 (安全区放行)' : '不成立 (False) → 0 (碰头危险警报!)'}
              </span>
            </div>
            <div style={{ fontSize: '11px', color: '#64748b', marginTop: '4px' }}>
              {isSafe ? '✓ 达到人体工学视线与弯腰避让空间标准' : '⚠ 底高过低，切菜低头极易碰撞额头'}
            </div>
          </div>

          <div
            style={{
              position: 'absolute',
              bottom: '12px',
              right: '16px',
              background: 'rgba(255,255,255,0.9)',
              backdropFilter: 'blur(8px)',
              border: '1px solid #e2e8f0',
              padding: '4px 10px',
              borderRadius: '6px',
              fontSize: '11px',
              color: '#64748b',
              boxShadow: '0 2px 6px rgba(0,0,0,0.05)',
              pointerEvents: 'none',
            }}
          >
            ✦ 3D 视口：按住鼠标左键旋转 · 右键平移 · 滚轮缩放
          </div>
        </div>

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
              📖 业务故事：吊柜安装高度与人体工学防撞头警戒
            </h4>
            <p
              style={{
                margin: 0,
                fontSize: '13px',
                lineHeight: '1.6',
                color: '#475569',
              }}
            >
              厨房吊柜底部若低于 1550mm，做饭备餐低头切菜时额头极易磕碰吊柜底板。小宇在设计系统植入 <code>#H &gt;= 1550</code> 红线比对：一旦拉低低于 1550，底板与操作区即刻红光警示，守住安全底线！在右侧 Controls 拖动高度滑块体验。
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
            <strong>💡 联动价值：</strong>
            比较运算符是空间尺寸合规校验的“数字哨兵”。把国标与人体工学硬指标写进模型规则，从源头杜绝不合规的翻车设计方案交付生产。
          </div>
        </div>
      </div>
    </div>
  );
};
