
import { Vector3,EllipseCurve,BufferGeometry, LineBasicMaterial, Line } from 'three'

export const CreateOrbitPlanet = (scene, afelio, perihelio) => {
 //CREAMOS LAS ORBITAS
    const afelioScale = afelio/2
    const perihelioScale = perihelio/2
    const a = (afelioScale + perihelioScale)/2
    const e = (afelioScale - perihelioScale) / (afelioScale + perihelioScale)
    const b = a * Math.sqrt(1- Math.pow(e,2))

    const orbitCurve  = new EllipseCurve(
        0,  0,            // ax, aY
        a, b,             // xRadius, yRadius
        0,  2 * Math.PI,  // aStartAngle, aEndAngle
        false,            // aClockwise
        0                 // aRotation
    )

    const points = orbitCurve.getPoints(100)

    // Rotamos los puntos para que la órbita sea horizontal
    points.forEach(point => {
        point.z = point.y
        point.y = 0
    })

    // Creamos la geometría de la órbita a partir de los puntos
    const orbitGeometry = new BufferGeometry().setFromPoints(points);
    const orbitMaterial = new LineBasicMaterial({ color: 0xffffff })
    const orbit = new Line(orbitGeometry, orbitMaterial);
  
    const calculatePosition = (time) => {
        const point = orbitCurve.getPointAt(time % 1);
        return new Vector3(point.x, 0, point.y);
    }

    scene.add(orbit)
    return {orbit,calculatePosition, a , b}
}
