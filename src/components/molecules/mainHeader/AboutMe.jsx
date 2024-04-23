import { useEffect, useRef } from 'react';
import foto from '../../../assets/Foto.png';
import '../../organism/header.css';
import react from '../../../assets/Skills/react.png'
import js from '../../../assets/Skills/js.png'
import angular from '../../../assets/Skills/angular.png'
import adobexd from '../../../assets/Skills/adobexd.png'
import python from '../../../assets/Skills/python.png'
import node from '../../../assets/Skills/node.png'
import git from '../../../assets/Skills/git.png'
import sass from '../../../assets/Skills/sass.png'
import mongo from '../../../assets/Skills/mongo.png'
import LeterforLeter from '../../../helpers/LeterforLeter'

const AboutMe = ({isVisibleAboutMe}) => {
    const parrafoRef = useRef()
    useEffect(() => {
        if (isVisibleAboutMe) {
            LeterforLeter("¡Bienvenido a mi mundo digital! Soy Josselyn Cortez, una apasionada Frontend Developer con una visión creativa y una pasión por la construcción de experiencias web cautivadoras. En mi viaje por el desarrollo web, he combinado mi amor por el diseño con mi habilidad para codificar, creando sitios web que no solo son funcionales, sino también visualmente impactantes. Explora las habilidades y tecnologías que domino como Frontend Developer. Desde HTML, CSS y JavaScript hasta frameworks como React y Angular, estoy constantemente aprendiendo y perfeccionando mi oficio para ofrecer las mejores soluciones a mis clientes.", parrafoRef.current);
          }
          console.log(isVisibleAboutMe)
    }, [isVisibleAboutMe]);

    return (<>
    <div className={ isVisibleAboutMe ? 'aboutMe VisibleAboutMeContainer' : 'aboutMe OcultoAboutMeContainer'}>
        <div className='AboutMeContainer' >
            {/* <div className='redesSociales'>
                <img src={github} alt="" />
                <img src={whatsapp} alt="" />
                <img src={telefono} alt="" />
            </div> */}
            <div className="MeContainer">
                <img className='AboutMeContainerFoto' src={foto} alt="" />
                <p className="parrafo" ref={parrafoRef}>
                </p>
            </div>
            <div className="redesSociales">
                <div><img src={react} alt="" /> <p>REACT</p></div>
                <div><img src={js} alt="" /> <p>JAVASCRIPT</p></div>
                <div><img src={angular} alt="" /> <p>ANGULAR</p></div>
                <div><img src={adobexd} alt="" /> <p>ADOBEXD</p></div>
                <div><img src={python} alt="" /> <p>PYTHON</p></div>
                <div><img src={node} alt="" /> <p>NODEJS</p></div>
                <div><img src={git} alt="" /> <p>GIT</p></div>
                <div><img src={sass} alt="" /> <p>SASS</p></div>
                <div><img src={mongo} alt="" /> <p>MONGODB</p></div>
            </div>
        </div>

    </div>
    </>
        
    );
};

export default AboutMe;