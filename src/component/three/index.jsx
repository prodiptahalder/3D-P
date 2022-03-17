import { Environment, OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useRef, useEffect } from 'react';
import { angleToRadians } from '../../utils/angle';
import {Physics, usePlane, useSphere, Debug, useBox} from '@react-three/cannon';
import * as THREE from 'three';
import { MeshDepthMaterial } from 'three';


function VerticalPlane(props){
    
    const [ref] = usePlane(() => ({ ...props}));

    return(
            <mesh 
            ref={ref}
            receiveShadow>
                <planeGeometry args={[20,20,20,20]}/>
                <meshStandardMaterial color="#001eff"/>
            </mesh>        
    )
}

function Plane(){
    
    const [ref] = usePlane(() => ({ rotation: [-(angleToRadians(90)), 0 , 0]}));

    return(
            <mesh 
            ref={ref}
            receiveShadow>
                <planeGeometry args={[20,20,20,20]}/>
                <meshStandardMaterial color="#001eff"/>
            </mesh>        
    )
}

function Cube(props) {
    const [ref, api] = useBox(() => ({ mass: 1, position: [0, 5, 0], rotation: [0.4, 0.2, 0.5], ...props }))
    return (
      <mesh receiveShadow castShadow ref={ref}
      onClick={()=>{
        api.velocity.set(2,5,-4);
        }} >
        <boxGeometry />
        <meshPhongMaterial color="#23100a" />
      </mesh>
    )
  }

function Ball(props){

    const [ref, api] = useSphere(()=>({ mass: 1, position: [0, 5, 0], ...props }));
    
    return(
        <mesh
        onClick={()=>{
            api.velocity.set(0,5,0);
        }} 
        ref={ref} castShadow receiveShadow>
            <sphereGeometry args={[1, 32, 32]}/>
            <meshPhongMaterial color="red" roughness={0.4}/>
        </mesh>
    );
}

export default function Three(){

    {/* The below code is for orbital controls to move as per mouse mmovement */}
    const orbitControlsRef = useRef(null);
    // useFrame((state) => {
    //     if(!!orbitControlsRef.current){
    //         const { x, y } = state.mouse;
    //         orbitControlsRef.current.setAzimuthalAngle(-angleToRadians(x * 45/* 45 cause I want 90 degrees of rotation */));
    //         orbitControlsRef.current.setPolarAngle((y+1.2) * angleToRadians(60));
    //         orbitControlsRef.current.update();
    //     }

    // })


    useEffect(()=>{
        if(!!orbitControlsRef.current){
            console.log(orbitControlsRef.current);
        }
    },[orbitControlsRef.current])
    

    return (
        <>
            {/* Camera */}
            <PerspectiveCamera makeDefault position={[0, 5, 75]} rotation={[angleToRadians(90), 0, 0]}/>
            <OrbitControls ref={orbitControlsRef} minPolarAngle={angleToRadians(40)} maxPolarAngle={angleToRadians(80)} minAzimuthAngle={angleToRadians(5)}/>
            
            {/* Ambient light */}
            <ambientLight args={["#ffffff", 0.5]}/>

            {/* directional light */}
            <directionalLight args={["#ffffff", 1]} position={[-3, 3, 0]}/>

            {/* point Light */}
            <pointLight args={["#ffffff", 1]} position={[-3, 3, 0]} castShadow/>

            {/* spot Light */}
            {/* <spotLight args={["#ffffff", 1.5, 10, angleToRadians(30), 0.2]} position={[-3, 1, 0]} castShadow/> */}

            {/* Environment */}
            <Environment background>
                <mesh scale={100}>
                    <sphereGeometry args={[1, 64, 64]}/>
                    <meshBasicMaterial side={THREE.BackSide} color="#ff2e3a" />
                </mesh>
            </Environment>
            <Physics>
                {/* <Debug color="black" scale={1}> */}
                <VerticalPlane position={[10,10,0]} rotation={[0, -(angleToRadians(90)) , 0]}/>
                <VerticalPlane position={[0,10,-10]}/>
                <Plane/>
                <Ball position={[0, 5, 0]}/>
                <Cube position={[-5, 5, 2]} />
                <Cube position={[0, 10, -4]} />
                <Cube position={[3, 7, -2]} />
                <Cube position={[-3, 6, 4]} />
                <Cube position={[6, 9, -6]} />
                <Cube position={[0, 12, 8]} />

                {/* </Debug> */}
            </Physics>
            
        </>
    )
}