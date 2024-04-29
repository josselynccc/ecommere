import {PointLight, AmbientLight, MeshBasicMaterial } from 'three'
import {Mesh, SphereGeometry} from 'three'



export const AmbientLightScene = (scene) => {
    const ambientLight = new AmbientLight(0xffffff, 0.3)
    scene.add(ambientLight)
    return ambientLight
}

export const PointLightScene = (scene,colorp, colorTexture) => {
    const light1 = new PointLight( 0xF9BB00, 20000 , 1000000);
    light1.castShadow = true
    light1.position.set(0,0,0)
    light1.decay = 2;
	light1.add( new Mesh( new SphereGeometry( 16, 60 ), new MeshBasicMaterial( {color:colorp , map: colorTexture, } ) ) );
    scene.add( light1 )

    return light1
}

export const PointLightStar = (scene, colorTextureStar, position) => {
    const light = new PointLight( 0xF9BB00, 10 , 100);
    light.position.set(position.x, position.y, position.z)
    light.decay = 2;
	light.add( new Mesh( new SphereGeometry( 0.5, 60 ), new MeshBasicMaterial( {color:0xffffff , map: colorTextureStar, } ) ) );
    scene.add( light )
    
    return light
}