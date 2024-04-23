
import { Mesh, MeshBasicMaterial, Group,PointLight, SphereGeometry } from 'three';
import nave from '../assets/nave_espacial..glb'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

export const CreateNaveEspacial = (scene) =>{
    const groupnave = new Group()
    const loader = new GLTFLoader()
    let positions = { x: 0, y: 80, z: 200 }
    let naveEspacial

    const keydown = (event) => {
        switch (event.key) {
            case 'ArrowUp':
                groupnave.rotation.set(0, 0, 0)
                positions.z -= 1
                
                break;
        
            case 'ArrowDown':
                groupnave.rotation.set(0, -Math.PI, 0)
                positions.z += 1; 
                break;

            case 'ArrowLeft':
                groupnave.rotation.set(0, Math.PI/2, 0)
                positions.x -= 1;
                break;

            case 'ArrowRight':
                groupnave.rotation.set(0, -Math.PI/2, 0)
                positions.x += 1;
                break;

            case 'w':
            case 'W':
                groupnave.rotation.set(Math.PI/2, 0, 0)
                positions.y += 1;
                break;
            case 's':
            case 'S':
                groupnave.rotation.set( -Math.PI/2,0, 0)
                positions.y -= 1; 
                break;
        }

        groupnave.position.set(positions.x, positions.y, positions.z)
    }



    loader.load(nave, function (gltf){
        
        naveEspacial = gltf.scene
        const scaleFactor = 0.5
        naveEspacial.scale.set(scaleFactor, scaleFactor, scaleFactor)
        naveEspacial.rotation.x = -Math.PI/2
        naveEspacial.rotation.y = -Math.PI/2

        const light = new PointLight(0xF9BB00, 2, 100); // Color amarillo
        light.castShadow = true;
        light.decay = 2;
        light.add(new Mesh(new SphereGeometry(1, 60), new MeshBasicMaterial({ color: 0xF9BB00 }))); // Utilizar la misma textura del sol
        
        
        groupnave.position.x = positions.x
        groupnave.position.y = positions.y
        groupnave.position.z = positions.z
        groupnave.add(light)
        groupnave.add(naveEspacial)
        
        scene.add(groupnave)
        
        document.addEventListener('keydown', keydown)
        
    })
    
    
}
