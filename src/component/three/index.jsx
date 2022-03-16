import { Environment, OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useRef, useEffect } from 'react';
import { angleToRadians } from '../../utils/angle';
import {Physics, usePlane} from '@react-three/cannon';
import * as THREE from 'three';

function Ball(){

    return(
        <mesh 
        position={[0, 0.5, 0]} castShadow>
            <sphereGeometry args={[0.5, 32, 32]}/>
            <meshPhongMaterial color="red" metalness={1} roughness={0.4}/>
        </mesh>
    );
}

function Plane(){
    
    const [ref] = usePlane(() => ({ rotation: [-(angleToRadians(90)), 0 , 0]}));

    return(
            <mesh 
            ref={ref}
            receiveShadow>
                <planeGeometry args={[7, 7]}/>
                <meshStandardMaterial color="#001eff"/>
            </mesh>        
    )
}

export default function Three(){

    const orbitControlsRef = useRef(null);
    useFrame((state) => {
        if(!!orbitControlsRef.current){
            const { x, y } = state.mouse;
            orbitControlsRef.current.setAzimuthalAngle(-angleToRadians(x * 90/* 90 cause I want 90 degrees of rotation */));
            orbitControlsRef.current.setPolarAngle((y+1.2) * angleToRadians(60));
            orbitControlsRef.current.update();
        }

    })


    useEffect(()=>{
        if(!!orbitControlsRef.current){
            console.log(orbitControlsRef.current);
        }
    },[orbitControlsRef.current])

    return (
        <>
            {/* Camera */}
            <PerspectiveCamera makeDefault position={[0, 1, 10]}/>
            <OrbitControls ref={orbitControlsRef} minPolarAngle={angleToRadians(40)} maxPolarAngle={angleToRadians(80)}/>
            <Physics>
                
                <Ball/>
                <Plane/>

            </Physics>
            
            {/* Ambient light */}
            <ambientLight args={["#ffffff", 0.5]}/>

            {/* directional light */}
            <directionalLight args={["#ffffff", 1]} position={[-3, 1, 0]}/>

            {/* point Light */}
            <pointLight args={["#ffffff", 1]} position={[-3, 1, 0]} castShadow/>

            {/* spot Light */}
            {/* <spotLight args={["#ffffff", 1.5, 10, angleToRadians(30), 0.2]} position={[-3, 1, 0]} castShadow/> */}

            {/* Environment */}
            <Environment background>
                <mesh scale={100}>
                    <sphereGeometry args={[1, 64, 64]}/>
                    <meshBasicMaterial side={THREE.BackSide} color="#ff2e3a" />
                </mesh>
            </Environment>
        </>
    )
}