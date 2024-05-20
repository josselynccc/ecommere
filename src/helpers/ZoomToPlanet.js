import { Vector3 } from "three"
import { Tween, update } from "@tweenjs/tween.js";
import { Easing } from "@tweenjs/tween.js";

export const MoveNaveToPlanet  = (nave, planet)=>{
  return new Promise((resolve,reject)=>{
    if(planet[0]) {
    
      const planetObj = planet[0].planetObj
      const naveObj = nave[0]
  
      const planetPosition = new Vector3()
      planetObj.getWorldPosition(planetPosition)
  
      const initialNavePosition = naveObj.position.clone()

      const tweenDuration = 2000
  
      const navePosition = new Vector3()
      naveObj.getWorldPosition(navePosition)
  
      new Tween(navePosition)
      .to({
        x: planetPosition.x,
        y: planetPosition.y,
        z: planetPosition.z
      }, tweenDuration)
      .easing(Easing.Quadratic.InOut)
      .onUpdate(()=>{
        naveObj.position.set(navePosition.x,navePosition.y,navePosition.z)
      })
      .onComplete(()=>{
        resolve(initialNavePosition)
      })
      .start()
    }else{
      console.log("no exist planet")
      reject("No planet found")
    }
  
  })
  
}

const animate = () => {
  requestAnimationFrame(animate);
  update();
};

animate();

export const ZoomToPlanet = (camara, planet) => {
  return new Promise((resolve, reject) => {
    if (planet[0]) {
      const planetObj = planet[0].planetObj;

      const planetPosition = new Vector3();
      planetObj.getWorldPosition(planetPosition);

      const zoomPosition = planetPosition.clone().multiplyScalar(1.5);
      const initialZoomPosition = camara.position.clone()
      // Usar un tween para animar la posición de la cámara
      new Tween(camara.position)
        .to({
          x: zoomPosition.x,
          y: zoomPosition.y + 10,
          z: zoomPosition.z - 10
        }, 2000)
        .easing(Easing.Quadratic.InOut)
        .onUpdate(() => {
          camara.position.set(zoomPosition.x, zoomPosition.y, zoomPosition.z)
          camara.lookAt(planetPosition);
        })
        .onComplete(() => {
          resolve(initialZoomPosition);
        })
        .start();

    } else {
      console.log("no existe el planeta");
      reject("No se encontró el planeta");
    }
  });
  
    
  };
