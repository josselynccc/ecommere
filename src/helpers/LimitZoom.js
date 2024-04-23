//MANEJANDO EL ZOOM

// Función para limitar el zoom
function LimitZoom(camera,cuboScene) {
    const maxDistance = 400; // Distancia máxima permitida desde el centro de la escena
    const minDistance = 2;  // Distancia mínima permitida desde el centro de la escena

    const distance = camera.position.distanceTo(cuboScene.position); // Calcular la distancia actual
    
    if (distance < minDistance) {
        const direction = camera.position.clone().sub(cuboScene.position).normalize();
        camera.position.copy(cuboScene.position).add(direction.multiplyScalar(minDistance));
    
    } else if (distance > maxDistance) {
        const direction = camera.position.clone().sub(cuboScene.position).normalize();
        camera.position.copy(cuboScene.position).add(direction.multiplyScalar(maxDistance));
    }
}

export default LimitZoom