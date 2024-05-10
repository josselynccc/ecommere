const LeterforLeter = (frase, container) => {
    const arrcontent = frase.split('')
    let i = 0
    let print = setInterval(()=>{
        container.innerHTML += arrcontent[i]
        i++

        if(i===arrcontent.length){
            clearInterval(print)
        }
    }, 100)
};

export default LeterforLeter;