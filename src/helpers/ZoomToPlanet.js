import { Vector3 } from "three"
import { Tween } from "@tweenjs/tween.js";
import { Easing } from "@tweenjs/tween.js";

export const MoveNaveToPlanet  = (nave, planet)=>{
  if(planet[0]) {
    
    const planetObj = planet[0].planetObj
    const naveObj = nave[0]

    const planetPosition = new Vector3()
    planetObj.getWorldPosition(planetPosition)

    const tweenDuration = 2000

    const navePosition = new Vector3()
    naveObj.getWorldPosition(navePosition)
    console.log(navePosition)


    new Tween(navePosition)
    .to(planetPosition, tweenDuration)
    .easing(Easing.Quadratic.InOut)
    .start()
  }else{
    console.log("no exist planet")
  }
}


export const ZoomToPlanet = (camara, planet) => {
  if(planet[0]) {
    const planetObj = planet[0].planetObj
    console.log(planetObj)

    const planetPosition = new Vector3();
    planetObj.getWorldPosition(planetPosition)

    const zoomPosition = planetPosition.clone().multiplyScalar(1.2);
    camara.position.x= zoomPosition.x
    camara.position.y= zoomPosition.y+10
    camara.position.z= zoomPosition.z-10
    camara.lookAt(planetPosition)

  }else{
    console.log("no exist planet")
  }
    
  };




  

  