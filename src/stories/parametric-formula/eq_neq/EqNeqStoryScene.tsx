import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, ContactShadows } from '@react-three/drei';

export interface EqNeqStorySceneProps {
  hasDoor?: number;
}

const EqNeqCabinetMesh: React.FC<EqNeqStorySceneProps> = ({
  hasDoor = 1,
}) => {
  const isWithDoor = hasDoor === 1;

  const cabinetW = 1.6;
  const cabinetH = 2.4;
  const cabinetD = 0.8;
  const boardThick = 0.04;

  return (
    <group position={[0, -0.2, 0]}>
      {/* 顶板 */}
      <mesh position={[0, cabinetH / 2 - boardThick / 2, 0]}>
        <boxGeometry args={[cabinetW, boardThick, cabinetD]} />
        <meshStandardMaterial color="#1e293b" roughness={0.35} />
      </mesh>

      {/* 底板 */}
      <mesh position={[0, -cabinetH / 2 + boardThick / 2, 0]}>
        <boxGeometry args={[cabinetW, boardThick, cabinetD]} />
        <meshStandardMaterial color="#1e293b" roughness={0.35} />
      </mesh>

      {/* 左侧板 */}
      <mesh position={[-cabinetW / 2 + boardThick / 2, 0, 0]}>
        <boxGeometry args={[boardThick, cabinetH, cabinetD]} />
        <meshStandardMaterial color="#334155" roughness={0.4} />
      </mesh>

      {/* 右侧板 */}
      <mesh position={[cabinetW / 2 - boardThick / 2, 0, 0]}>
        <boxGeometry args={[boardThick, cabinetH, cabinetD]} />
        <meshStandardMaterial color="#334155" roughness={0.4} />
      </mesh>

      {/* 背板 */}
      <mesh position={[0, 0, -cabinetD / 2 + 0.01]}>
        <boxGeometry args={[cabinetW - boardThick * 2, cabinetH - boardThick * 2, 0.02]} />
        <meshStandardMaterial color="#cbd5e1" roughness={0.5} />
      </mesh>

      {/* 柜内活动层板（多层展示开放格结构） */}
      {[-0.6, 0.0, 0.6].map((y, idx) => (
        <mesh key={idx} position={[0, y, 0]}>
          <boxGeometry args={[cabinetW - boardThick * 2 - 0.01, boardThick, cabinetD - 0.05]} />
          <meshStandardMaterial color="#475569" roughness={0.4} />
        </mesh>
      ))}

      {/* 柜内展示摆件（仅在开放格或者开门时增添生活气息） */}
      <group position={[0.4, 0.04 + 0.12, 0.05]}>
        <mesh>
          <boxGeometry args={[0.2, 0.24, 0.15]} />
          <meshStandardMaterial color="#ec4899" roughness={0.2} metalness={0.1} />
        </mesh>
      </group>
      <group position={[-0.35, -0.6 + 0.12, 0.05]}>
        <mesh>
          <cylinderGeometry args={[0.08, 0.08, 0.22, 16]} />
          <meshStandardMaterial color="#06b6d4" roughness={0.3} metalness={0.2} />
        </mesh>
      </group>

      {/* 柜门系统：由 #HasDoor == 1 决定显隐与生成 */}
      {isWithDoor && (
        <group position={[-cabinetW / 2 + boardThick + 0.01, 0, cabinetD / 2]}>
          {/* 左开掩门，轻微开合 25 度展现立面空间 */}
          <group rotation={[0, -0.45, 0]}>
            <mesh position={[(cabinetW - boardThick * 2 - 0.02) / 2, 0, boardThick / 2]}>
              <boxGeometry args={[cabinetW - boardThick * 2 - 0.02, cabinetH - boardThick * 2 - 0.02, boardThick]} />
              <meshStandardMaterial color="#f8fafc" roughness={0.3} metalness={0.05} />
            </mesh>

            {/* 精美金色极简长把手 */}
            <mesh position={[cabinetW - boardThick * 2 - 0.1, 0, boardThick + 0.015]}>
              <boxGeometry args={[0.018, 0.45, 0.025]} />
              <meshStandardMaterial color="#d97706" metalness={0.9} roughness={0.15} />
            </mesh>
          </group>
        </group>
      )}
    </group>
  );
};

export const EqNeqStoryScene: React.FC<EqNeqStorySceneProps> = (props) => {
  const currentHasDoor = props.hasDoor ?? 1;
  const isWithDoor = currentHasDoor === 1;

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
          background: 'linear-gradient(135deg, #ec48990f 0%, #f472b61a 100%)',
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
          == (等于) / != (不等于)
        </h2>
        <div
          style={{
            background: '#ffffff',
            border: '1px solid #f472b660',
            padding: '8px 18px',
            borderRadius: '10px',
            fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
            fontSize: '14px',
            fontWeight: 700,
            color: '#ec4899',
            boxShadow: '0 4px 12px -2px #ec489915',
          }}
        >
          #HasDoor == 1
        </div>
      </div>

      <div style={{ flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column' }}>
        <div
          style={{
            flex: 1,
            minHeight: 0,
            width: '100%',
            position: 'relative',
            background: 'radial-gradient(circle at 50% 40%, #ffffff 0%, #ec489908 65%, #ec489916 100%)',
          }}
        >
          <Canvas camera={{ position: [0, 0.2, 4.4], fov: 40 }} gl={{ antialias: true }}>
            <color attach="background" args={['#fafafa']} />
            <ambientLight intensity={0.8} />
            <directionalLight position={[6, 8, 6]} intensity={1.3} castShadow />
            <directionalLight position={[-6, 4, -5]} intensity={0.5} />
            <pointLight position={[0, 1, 2]} intensity={0.7} color="#f472b6" />
            <EqNeqCabinetMesh {...props} />
            <ContactShadows
              position={[0, -1.45, 0]}
              opacity={0.35}
              scale={7}
              blur={2}
              far={3}
              color="#ec4899"
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
              输入参数：<code>#HasDoor = {currentHasDoor}</code>
            </div>
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              <span>条件 <code>#HasDoor == 1</code>：</span>
              <span
                style={{
                  fontWeight: 700,
                  color: isWithDoor ? '#16a34a' : '#ec4899',
                  background: isWithDoor ? '#dcfce7' : '#fdf2f8',
                  padding: '2px 8px',
                  borderRadius: '4px',
                }}
              >
                {isWithDoor ? '成立 (True) → 掩门封闭形态' : '不成立 (False) → 开放展示格形态'}
              </span>
            </div>
            <div style={{ fontSize: '11px', color: '#64748b', marginTop: '4px' }}>
              {isWithDoor ? '✓ 生成完整外掩门扇、金属拉手及铰链孔位' : '✓ 卸除门板，露出柜内多层活动隔板'}
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
              📖 业务故事：封闭掩门柜 vs 开放展示格一键切换
            </h4>
            <p
              style={{
                margin: 0,
                fontSize: '13px',
                lineHeight: '1.6',
                color: '#475569',
              }}
            >
              客户在方案阶段经常在“带门防尘衣柜”与“开放式书架/展示格”之间切换比选。小宇使用 <code>#HasDoor == 1</code> 作为零件显隐总控：设为 1 时门板出现，设为 0 时门板卸下展现内部层板格局。在 Controls 切换 0 和 1 直观体验！
            </p>
          </div>
          <div
            style={{
              fontSize: '13px',
              lineHeight: '1.6',
              color: '#334155',
              background: '#ec48990d',
              borderLeft: '3px solid #ec4899',
              padding: '10px 14px',
              borderRadius: '0 8px 8px 0',
            }}
          >
            <strong>💡 联动价值：</strong>
            等于判断无需复杂计算，是部件显隐与方案形态分流的终极利器。同一套主体柜壳，零成本实现两种畅销产品形态的并存与复用。
          </div>
        </div>
      </div>
    </div>
  );
};
