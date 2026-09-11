import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, ContactShadows } from '@react-three/drei';

export interface IfStorySceneProps {
  w?: number;
}

const IfDoorMesh: React.FC<IfStorySceneProps> = ({
  w = 550,
}) => {
  // 比例映射：将实际 mm 转换为 Three.js 场景单位（以标准 600mm 为基准 1.5 单位）
  const cabinetW = (w / 600) * 1.5;
  const cabinetH = 2.4;
  const cabinetD = 0.9;
  const boardThick = 0.04;

  const isDoubleDoor = w > 600;
  const doorCount = isDoubleDoor ? 2 : 1;

  // 单扇门板尺寸计算
  const doorGap = 0.01;
  const doorHeight = cabinetH - boardThick * 2 - 0.02;
  const doorWidth = isDoubleDoor
    ? (cabinetW - boardThick * 2 - doorGap * 3) / 2
    : cabinetW - boardThick * 2 - doorGap * 2;

  // 内空起始位置
  const innerLeft = -cabinetW / 2 + boardThick;

  return (
    <group position={[0, -0.2, 0]}>
      {/* 顶板 */}
      <mesh position={[0, cabinetH / 2 - boardThick / 2, 0]}>
        <boxGeometry args={[cabinetW, boardThick, cabinetD]} />
        <meshStandardMaterial color="#334155" roughness={0.4} />
      </mesh>
      {/* 底板 */}
      <mesh position={[0, -cabinetH / 2 + boardThick / 2, 0]}>
        <boxGeometry args={[cabinetW, boardThick, cabinetD]} />
        <meshStandardMaterial color="#334155" roughness={0.4} />
      </mesh>
      {/* 左侧板 */}
      <mesh position={[-cabinetW / 2 + boardThick / 2, 0, 0]}>
        <boxGeometry args={[boardThick, cabinetH, cabinetD]} />
        <meshStandardMaterial color="#475569" roughness={0.4} />
      </mesh>
      {/* 右侧板 */}
      <mesh position={[cabinetW / 2 - boardThick / 2, 0, 0]}>
        <boxGeometry args={[boardThick, cabinetH, cabinetD]} />
        <meshStandardMaterial color="#475569" roughness={0.4} />
      </mesh>
      {/* 背板 */}
      <mesh position={[0, 0, -cabinetD / 2 + 0.01]}>
        <boxGeometry args={[cabinetW - boardThick * 2, cabinetH - boardThick * 2, 0.02]} />
        <meshStandardMaterial color="#cbd5e1" roughness={0.5} />
      </mesh>

      {/* 内部活动层板 (中间放一块展示柜内结构) */}
      <mesh position={[0, 0.1, 0]}>
        <boxGeometry args={[cabinetW - boardThick * 2 - 0.01, boardThick, cabinetD - 0.05]} />
        <meshStandardMaterial color="#64748b" roughness={0.4} />
      </mesh>
      <mesh position={[0, 0.7, 0]}>
        <boxGeometry args={[cabinetW - boardThick * 2 - 0.01, boardThick, cabinetD - 0.05]} />
        <meshStandardMaterial color="#64748b" roughness={0.4} />
      </mesh>
      <mesh position={[0, -0.5, 0]}>
        <boxGeometry args={[cabinetW - boardThick * 2 - 0.01, boardThick, cabinetD - 0.05]} />
        <meshStandardMaterial color="#64748b" roughness={0.4} />
      </mesh>

      {/* 门板系统 (if 条件判断的核心展示) */}
      {isDoubleDoor ? (
        // 双开门：左门与右门微开展示真实质感
        <>
          {/* 左门（带铰链轴心旋转微开 -25度） */}
          <group position={[innerLeft + doorGap, 0, cabinetD / 2]}>
            <group rotation={[0, -0.45, 0]}>
              <mesh position={[doorWidth / 2, 0, boardThick / 2]}>
                <boxGeometry args={[doorWidth, doorHeight, boardThick]} />
                <meshStandardMaterial color="#6366f1" roughness={0.3} metalness={0.1} />
              </mesh>
              {/* 拉手 */}
              <mesh position={[doorWidth - 0.05, 0, boardThick + 0.02]}>
                <boxGeometry args={[0.015, 0.28, 0.03]} />
                <meshStandardMaterial color="#fbbf24" metalness={0.8} roughness={0.2} />
              </mesh>
            </group>
          </group>

          {/* 右门（带铰链轴心旋转微开 +25度） */}
          <group position={[cabinetW / 2 - boardThick - doorGap, 0, cabinetD / 2]}>
            <group rotation={[0, 0.45, 0]}>
              <mesh position={[-doorWidth / 2, 0, boardThick / 2]}>
                <boxGeometry args={[doorWidth, doorHeight, boardThick]} />
                <meshStandardMaterial color="#4f46e5" roughness={0.3} metalness={0.1} />
              </mesh>
              {/* 拉手 */}
              <mesh position={[-doorWidth + 0.05, 0, boardThick + 0.02]}>
                <boxGeometry args={[0.015, 0.28, 0.03]} />
                <meshStandardMaterial color="#fbbf24" metalness={0.8} roughness={0.2} />
              </mesh>
            </group>
          </group>
        </>
      ) : (
        // 单开门（左开门，微开 -30度）
        <group position={[innerLeft + doorGap, 0, cabinetD / 2]}>
          <group rotation={[0, -0.52, 0]}>
            <mesh position={[doorWidth / 2, 0, boardThick / 2]}>
              <boxGeometry args={[doorWidth, doorHeight, boardThick]} />
              <meshStandardMaterial color="#6366f1" roughness={0.3} metalness={0.1} />
            </mesh>
            {/* 拉手 */}
            <mesh position={[doorWidth - 0.06, 0, boardThick + 0.02]}>
              <boxGeometry args={[0.015, 0.32, 0.03]} />
              <meshStandardMaterial color="#fbbf24" metalness={0.8} roughness={0.2} />
            </mesh>
          </group>
        </group>
      )}
    </group>
  );
};

export const IfStoryScene: React.FC<IfStorySceneProps> = (props) => {
  const currentW = props.w ?? 550;
  const isDouble = currentW > 600;

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
          background: 'linear-gradient(135deg, #6366f10f 0%, #818cf81a 100%)',
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
          if(条件, 值1, 值2)
        </h2>
        <div
          style={{
            background: '#ffffff',
            border: '1px solid #818cf860',
            padding: '8px 18px',
            borderRadius: '10px',
            fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
            fontSize: '14px',
            fontWeight: 700,
            color: '#6366f1',
            boxShadow: '0 4px 12px -2px #6366f115',
          }}
        >
          {"if(#W > 600, 2, 1)"}
        </div>
      </div>

      <div style={{ flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column' }}>
        <div
          style={{
            flex: 1,
            minHeight: 0,
            width: '100%',
            position: 'relative',
            background: 'radial-gradient(circle at 50% 40%, #ffffff 0%, #6366f108 65%, #6366f116 100%)',
          }}
        >
          <Canvas camera={{ position: [0, 0.4, 5.2], fov: 40 }} gl={{ antialias: true }}>
            <color attach="background" args={['#fafafa']} />
            <ambientLight intensity={0.8} />
            <directionalLight position={[6, 10, 6]} intensity={1.3} castShadow />
            <directionalLight position={[-6, -4, -6]} intensity={0.3} />
            <pointLight position={[0, 2, 2.5]} intensity={0.6} color="#818cf8" />
            <IfDoorMesh {...props} />
            <ContactShadows
              position={[0, -1.45, 0]}
              opacity={0.35}
              scale={7}
              blur={2}
              far={3}
              color="#6366f1"
            />
            <OrbitControls target={[0, -0.1, 0]} enableZoom={true} maxPolarAngle={Math.PI / 2 + 0.05} />
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
              当前柜宽：<span style={{ color: '#6366f1' }}>{currentW} mm</span>
            </div>
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              <span>条件 <code>#W &gt; 600</code>：</span>
              <span
                style={{
                  fontWeight: 700,
                  color: isDouble ? '#16a34a' : '#ea580c',
                  background: isDouble ? '#dcfce7' : '#ffedd5',
                  padding: '2px 8px',
                  borderRadius: '4px',
                }}
              >
                {isDouble ? '成立 (True) → 2 扇对开门' : '不成立 (False) → 1 扇单开门'}
              </span>
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
              📖 业务故事：柜体宽度驱动单/双门自适应
            </h4>
            <p
              style={{
                margin: 0,
                fontSize: '13px',
                lineHeight: '1.6',
                color: '#475569',
              }}
            >
              单扇掩门超过 600mm 会造成合页负荷过重而下垂，小宇设定：当柜体宽度 #W 超过 600mm 时，系统自动自适应拆为 2 扇对开门；≤ 600mm 时保持 1 扇单开门。在右侧 Controls 拖动宽度滑块，观察门板在 600mm 边界处的智能分扇！
            </p>
          </div>
          <div
            style={{
              fontSize: '13px',
              lineHeight: '1.6',
              color: '#334155',
              background: '#6366f10d',
              borderLeft: '3px solid #6366f1',
              padding: '10px 14px',
              borderRadius: '0 8px 8px 0',
            }}
          >
            <strong>💡 联动价值：</strong>
            设计师直接拉伸柜体总宽，工艺底线与分扇规则自动触发，既保证五金结构安全，又杜绝了漏改门数的拆单错误。
          </div>
        </div>
      </div>
    </div>
  );
};
