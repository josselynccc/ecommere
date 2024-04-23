const Resize = (camara, renderer)=>{
    const width = window.innerWidth;
    const height = window.innerHeight;
    camara.aspect = width/height
    camara.updateProjectionMatrix()
    renderer.setSize(width, height)
}

export default Resize