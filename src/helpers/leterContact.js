const LeterContacto = (frase, container) => {
    const arrcontent = frase.split('')
    let i = 0

    const print = () =>{
        if (container) {
        container.textContent += arrcontent[i]
        i++

        if(i<arrcontent.length){
            requestAnimationFrame(print)
        }
    }
    }
    requestAnimationFrame(print)
};

export default LeterContacto;