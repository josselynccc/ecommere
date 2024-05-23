const LeterforLeter = (frase, container) => {
    const arrcontent = frase.split('');
    let i = 0;
    let animationFrameId;

    const print = () => {
        if (container && i < arrcontent.length) {
            
            container.textContent += arrcontent[i];
            i++;
            animationFrameId = requestAnimationFrame(print);
        }
    };

    if (container) {
        container.textContent = '';
        animationFrameId = requestAnimationFrame(print);
    }

    return () => cancelAnimationFrame(animationFrameId);
};

export default LeterforLeter;