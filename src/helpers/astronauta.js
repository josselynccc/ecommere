import { SkeletonHelper } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import astronauta from '../../assets/astronauta.glb'

export const createAstronauta = (scene) => {
    return new Promise((resolve, reject) => {
        const loader = new GLTFLoader();
        loader.load( astronauta, function ( gltf ) {

            let model = gltf.scene;
            scene.add( model );

            model.traverse( function ( object ) {
                if ( object.isMesh ) object.castShadow = true;
            } );

            let skeleton = new SkeletonHelper( model );
            skeleton.visible = false;
            scene.add( skeleton );

            resolve(skeleton);
        },
        undefined,
        function ( error ) {
            console.error( 'Error loading astronauta:', error );
            reject(error);
        });
    });
}