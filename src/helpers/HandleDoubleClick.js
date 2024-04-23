const HandleDoubleClick = (element) =>{
    if(!document.fullscreenElement){
        element.requestFullscreen()
    }else{
        document.exitFullscreen()
    }
}

export default HandleDoubleClick