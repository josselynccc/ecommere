import {Mesh,SphereGeometry, MeshStandardMaterial, Group} from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import curriculum from '../assets/Letras/curriculum.glb';
import proyectos from '../assets/Letras/PROYECTOS.glb'

export const CreatePlanet = (scene, textura, radio, alphaMapTexture, texto) => {
    
    const planet = new Group()
    
    const geometry = new SphereGeometry(radio, 60)
    const material = new MeshStandardMaterial({ map: textura,emissiveIntensity: 20})
    const figurePlanet = new Mesh(geometry, material)
    figurePlanet.aoMapIntensity = 1


    if(alphaMapTexture){
        const geometrynube = new SphereGeometry(radio + 0.02, 60)
        const materialnube = new MeshStandardMaterial({ alphaMap: alphaMapTexture, transparent: true})
        const figurenube = new Mesh(geometrynube, materialnube)
        planet.add(figurenube)
    }

    if(texto){
        let ruta;
        switch (texto) {
            case 'Curriculum':
                ruta = curriculum
                break;
        
            case 'Proyectos':
                ruta = proyectos
                break;
        }

        const fontload = new GLTFLoader();
        let letra;
       
        fontload.load(ruta, (gltf) => {
            letra = gltf.scene
            const scaleFactor = 0.1
            letra.scale.set(scaleFactor, scaleFactor, scaleFactor)
            
            letra.rotation.y = Math.PI/2
    
            letra.position.x = 0
            letra.position.y = radio
            letra.position.z = 0

            const textGroup = new Group();
            textGroup.add(letra);
            planet.add(textGroup)
        });
    }

    planet.add(figurePlanet)
   

    scene.add(planet)

    return planet
}
