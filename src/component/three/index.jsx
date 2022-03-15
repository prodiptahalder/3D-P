import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import { angleToRadians } from '../../utils/angle';

export default function Three(){

    const orbitControlsRef = useRef(null);
    useFrame((state) => {
        if(!!orbitControlsRef.current){
            const { x, y } = state.mouse;
            orbitControlsRef.current.setAzimuthalAngle(-angleToRadians(x * 90/* 90 cause I want 90 degrees of rotation */));
            orbitControlsRef.current.setPolarAngle((y+0.5) * angleToRadians(60));
            orbitControlsRef.current.update();
        }

    })

    // useEffect(()=>{
    //     if(!!orbitControlsRef.current){
    //         console.log(orbitControlsRef.current);
    //     }
    // },[orbitControlsRef.current])

    return (
        <>
            {/* Camera */}
            <PerspectiveCamera makeDefault position={[0, 1, 10]}/>
            <OrbitControls ref={orbitControlsRef} minPolarAngle={angleToRadians(60)} maxPolarAngle={angleToRadians(80)}/>

            {/* Ball */}
            <mesh position={[0, 0.5, 0]}>
                <sphereGeometry args={[0.5, 32, 32]}/>
                <meshStandardMaterial color="red"/>
            </mesh>

            {/* Floor */}
            <mesh rotation={[-(angleToRadians(90)), 0 , 0]}>
                <planeGeometry args={[7, 7]}/>
                <meshStandardMaterial color="#000000"/>
            </mesh>
            {/* Ambient light */}
            <ambientLight args={["#ffffff", 1]}/>
        </>
    )
}