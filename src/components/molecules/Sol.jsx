import { useEffect } from "react"
import {Mesh,SphereGeometry,TextureLoader,MeshStandardMaterial } from 'three';

import sol from '../../assets/sol.png';

const Sol = ()=>{
    useEffect(()=>{
        const textureLoader = new TextureLoader()
        const colorTextureSol = textureLoader.load(sol)
        
        
        const geometrySol = new SphereGeometry(1, 60)
        const materialSol = new MeshStandardMaterial({ map: colorTextureSol,})
        const Sol = new Mesh(geometrySol, materialSol)
        console.log(Sol)
    }, [])
    return <>
    </>
}

export default Sol