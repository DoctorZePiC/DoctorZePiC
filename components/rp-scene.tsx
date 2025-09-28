"use client"

import { useRef, useMemo } from "react"
import { useFrame } from "@react-three/fiber"
import { Float, MeshDistortMaterial } from "@react-three/drei"
import type * as THREE from "three"

function MoneyBill({ position, rotation }: { position: [number, number, number]; rotation: [number, number, number] }) {
  const meshRef = useRef<THREE.Mesh>(null!)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01
      meshRef.current.position.y += Math.sin(state.clock.elapsedTime + position[0]) * 0.002
    }
  })

  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
      <mesh ref={meshRef} position={position} rotation={rotation}>
        <boxGeometry args={[0.8, 0.4, 0.02]} />
        <meshStandardMaterial color="#2d5a27" />
        <mesh position={[0, 0, 0.011]}>
          <planeGeometry args={[0.7, 0.3]} />
          <meshStandardMaterial color="#4a7c59" />
        </mesh>
      </mesh>
    </Float>
  )
}

function Weapon({ position, rotation }: { position: [number, number, number]; rotation: [number, number, number] }) {
  const meshRef = useRef<THREE.Group>(null!)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.z += 0.005
      meshRef.current.position.x += Math.sin(state.clock.elapsedTime * 0.5 + position[1]) * 0.001
    }
  })

  return (
    <Float speed={2} rotationIntensity={0.3} floatIntensity={0.3}>
      <group ref={meshRef} position={position} rotation={rotation}>
        {/* Gun barrel */}
        <mesh position={[0.3, 0, 0]}>
          <cylinderGeometry args={[0.02, 0.02, 0.6]} />
          <meshStandardMaterial color="#2a2a2a" />
        </mesh>
        {/* Gun handle */}
        <mesh position={[-0.1, -0.1, 0]} rotation={[0, 0, -0.3]}>
          <boxGeometry args={[0.15, 0.3, 0.05]} />
          <meshStandardMaterial color="#1a1a1a" />
        </mesh>
        {/* Trigger guard */}
        <mesh position={[0, -0.05, 0]}>
          <boxGeometry args={[0.2, 0.15, 0.03]} />
          <meshStandardMaterial color="#333" />
        </mesh>
      </group>
    </Float>
  )
}

function Car({ position, rotation }: { position: [number, number, number]; rotation: [number, number, number] }) {
  const meshRef = useRef<THREE.Group>(null!)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.003
      meshRef.current.position.z += Math.sin(state.clock.elapsedTime * 0.3 + position[0]) * 0.002
    }
  })

  return (
    <Float speed={1} rotationIntensity={0.2} floatIntensity={0.2}>
      <group ref={meshRef} position={position} rotation={rotation} scale={0.3}>
        {/* Car body */}
        <mesh position={[0, 0.2, 0]}>
          <boxGeometry args={[2, 0.6, 1]} />
          <meshStandardMaterial color="#ff6b35" />
        </mesh>
        {/* Car roof */}
        <mesh position={[0, 0.6, 0]}>
          <boxGeometry args={[1.5, 0.4, 0.9]} />
          <meshStandardMaterial color="#ff6b35" />
        </mesh>
        {/* Wheels */}
        <mesh position={[-0.7, -0.2, 0.4]}>
          <cylinderGeometry args={[0.2, 0.2, 0.1]} />
          <meshStandardMaterial color="#1a1a1a" />
        </mesh>
        <mesh position={[0.7, -0.2, 0.4]}>
          <cylinderGeometry args={[0.2, 0.2, 0.1]} />
          <meshStandardMaterial color="#1a1a1a" />
        </mesh>
        <mesh position={[-0.7, -0.2, -0.4]}>
          <cylinderGeometry args={[0.2, 0.2, 0.1]} />
          <meshStandardMaterial color="#1a1a1a" />
        </mesh>
        <mesh position={[0.7, -0.2, -0.4]}>
          <cylinderGeometry args={[0.2, 0.2, 0.1]} />
          <meshStandardMaterial color="#1a1a1a" />
        </mesh>
      </group>
    </Float>
  )
}

function Diamond({ position, rotation }: { position: [number, number, number]; rotation: [number, number, number] }) {
  const meshRef = useRef<THREE.Mesh>(null!)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.02
      meshRef.current.rotation.y += 0.01
      meshRef.current.position.y += Math.sin(state.clock.elapsedTime * 2 + position[0]) * 0.003
    }
  })

  return (
    <Float speed={3} rotationIntensity={1} floatIntensity={1}>
      <mesh ref={meshRef} position={position} rotation={rotation}>
        <octahedronGeometry args={[0.15]} />
        <MeshDistortMaterial color="#00ffff" distort={0.3} speed={2} />
      </mesh>
    </Float>
  )
}

function Badge({ position, rotation }: { position: [number, number, number]; rotation: [number, number, number] }) {
  const meshRef = useRef<THREE.Group>(null!)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.z += 0.008
      meshRef.current.position.x += Math.sin(state.clock.elapsedTime * 0.7 + position[2]) * 0.001
    }
  })

  return (
    <Float speed={1.2} rotationIntensity={0.4} floatIntensity={0.4}>
      <group ref={meshRef} position={position} rotation={rotation}>
        {/* Badge base */}
        <mesh>
          <cylinderGeometry args={[0.2, 0.2, 0.02]} />
          <meshStandardMaterial color="#ffd700" />
        </mesh>
        {/* Badge star */}
        <mesh position={[0, 0, 0.011]}>
          <cylinderGeometry args={[0.1, 0.1, 0.01]} />
          <meshStandardMaterial color="#ffed4e" />
        </mesh>
      </group>
    </Float>
  )
}

export function RPScene() {
  const groupRef = useRef<THREE.Group>(null!)

  // Generate random positions for elements
  const elements = useMemo(() => {
    const items = []

    // Money bills
    for (let i = 0; i < 8; i++) {
      items.push({
        type: "money",
        position: [(Math.random() - 0.5) * 20, (Math.random() - 0.5) * 15, (Math.random() - 0.5) * 10] as [
          number,
          number,
          number,
        ],
        rotation: [Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI] as [
          number,
          number,
          number,
        ],
      })
    }

    // Weapons
    for (let i = 0; i < 5; i++) {
      items.push({
        type: "weapon",
        position: [(Math.random() - 0.5) * 18, (Math.random() - 0.5) * 12, (Math.random() - 0.5) * 8] as [
          number,
          number,
          number,
        ],
        rotation: [Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI] as [
          number,
          number,
          number,
        ],
      })
    }

    // Cars
    for (let i = 0; i < 3; i++) {
      items.push({
        type: "car",
        position: [(Math.random() - 0.5) * 25, (Math.random() - 0.5) * 10, (Math.random() - 0.5) * 15] as [
          number,
          number,
          number,
        ],
        rotation: [0, Math.random() * Math.PI * 2, 0] as [number, number, number],
      })
    }

    // Diamonds
    for (let i = 0; i < 6; i++) {
      items.push({
        type: "diamond",
        position: [(Math.random() - 0.5) * 16, (Math.random() - 0.5) * 12, (Math.random() - 0.5) * 6] as [
          number,
          number,
          number,
        ],
        rotation: [Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI] as [
          number,
          number,
          number,
        ],
      })
    }

    // Police badges
    for (let i = 0; i < 4; i++) {
      items.push({
        type: "badge",
        position: [(Math.random() - 0.5) * 22, (Math.random() - 0.5) * 14, (Math.random() - 0.5) * 8] as [
          number,
          number,
          number,
        ],
        rotation: [Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI] as [
          number,
          number,
          number,
        ],
      })
    }

    return items
  }, [])

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.0005
    }
  })

  return (
    <group ref={groupRef}>
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} intensity={0.5} />
      <pointLight position={[-10, -10, -10]} intensity={0.3} color="#ff6b35" />

      {elements.map((element, index) => {
        switch (element.type) {
          case "money":
            return <MoneyBill key={`money-${index}`} position={element.position} rotation={element.rotation} />
          case "weapon":
            return <Weapon key={`weapon-${index}`} position={element.position} rotation={element.rotation} />
          case "car":
            return <Car key={`car-${index}`} position={element.position} rotation={element.rotation} />
          case "diamond":
            return <Diamond key={`diamond-${index}`} position={element.position} rotation={element.rotation} />
          case "badge":
            return <Badge key={`badge-${index}`} position={element.position} rotation={element.rotation} />
          default:
            return null
        }
      })}
    </group>
  )
}
