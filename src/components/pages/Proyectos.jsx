import { useState } from "react";
import { proyectosData } from "../../constants/ProyectosData.js";
import './Proyectos.css';
import { useMediaQuery } from '@react-hook/media-query'
import icon_back from '../../assets/proyects/icon_back.png'
import whatsapp from '../../assets/redes/whatsapp.png'
import github from '../../assets/redes/GitHub_Invertocat_Logo.png'
import telefono from '../../assets/redes/telefono.png'
const Proyectos = () => {
    const [selectedProyect, setSelectedProyect] = useState(null);
    const [hoveredProyect, setHoveredProyect] = useState(null);
    const [visibleInfoProyect, setvisibleInfoProyect] = useState(false)
    
    const lessThan600px = useMediaQuery('(max-width: 600px)')

    const handleClick = (proyectKey) =>{
        setSelectedProyect(proyectKey);
        setvisibleInfoProyect(true)
    };

    const handleMouseOver = (proyectKey) => {
        setHoveredProyect(proyectKey);
    };

    const handleMouseLeave = () => {
        setHoveredProyect(null);
    };

    const handleBack = () => {
        setSelectedProyect(null);
        setvisibleInfoProyect(false);
    };

    return (
        <>
            <div className="ContainerProyects">
                <div className="Proyects">
                    {Object.keys(proyectosData).map((key) => (
                        <div className="ProyectsDiv" 
                        
                        key={key} 
                        onClick={() => {
                            handleClick(key);
                        }
                        } 
                        onMouseOver={() => handleMouseOver(key)}
                        onMouseLeave={handleMouseLeave}
                        >
                        <img  src={proyectosData[key].gif} alt="" style={{objectFit:'cover',borderRadius:'20px',display:'block',width:'100%', height:'100%'}} />    
                        {lessThan600px ? (
                        <div className="ProyectsDivInfom600">
                                <h2>{proyectosData[key].titulo}</h2>
                                <p>{proyectosData[key].descCorta}</p>
                                <div className="ProyectsDivInfo_tec">
                                    {proyectosData[key].tecnologias.map((tecnologia, index) => (
                                        <p key={index} style={{width:'auto', backgroundColor: 'gray', borderRadius: '20px', padding: '10px 10px 10px 10px', margin: '5px 0' }}>
                                            {tecnologia}
                                        </p>
                                    ))}
                            </div>
                        </div>): ( (hoveredProyect === key) && 
                            <div className="ProyectsDivInfo">
                                <h2>{proyectosData[key].titulo}</h2>
                                <p>{proyectosData[key].descCorta}</p>
                                <div className="ProyectsDivInfo_tec">
                                    {proyectosData[key].tecnologias.map((tecnologia, index) => (
                                        <p key={index} style={{width:'auto', backgroundColor: 'gray', borderRadius: '20px', padding: '10px 10px 10px 10px', margin: '5px 0' }}>
                                            {tecnologia}
                                        </p>
                                    ))}
                                </div>
                            </div>)}
                            
                        </div>
                    ))}
                </div>
            </div>
            {selectedProyect &&  (
            <div>
                        {visibleInfoProyect &&
                        (
                        <div className="ProyectsInformation">
                            <div className='DivProyectsInformation_key' key={selectedProyect}>
                            <div className="ProyectsInformationBack">
                                <img onClick={handleBack} src={icon_back} alt="" style={{borderRadius:'50%', width:'35', height:'35px'}}/>
                                <p onClick={handleBack}>Ir a proyectos</p>
                            </div>
                            <div className="ProyectsInformation_key"> 
                                <h2>{proyectosData[selectedProyect].titulo}</h2>
                                <p>{proyectosData[selectedProyect].descCorta}</p>
                                <img src={proyectosData[selectedProyect].imagen} alt="" style={{borderRadius:'20px',width: '100%', height:'40%'}} />
                                <p>{proyectosData[selectedProyect].descLarga}</p>
                                <p>Tecnologías:</p> 
                                <div className="ProyectsDivInfo_tec">
                                    {proyectosData[selectedProyect].tecnologias.map((tecnologia, index) => (
                                        <p key={index} style={{width:'auto', backgroundColor: 'gray', borderRadius: '20px', padding: '10px 10px 10px 10px', margin: '5px 0' }}>
                                            {tecnologia}
                                        </p>
                                    ))}
                                </div>
                                <p>WebSite:</p>
                                <a href={proyectosData[selectedProyect].link}>{proyectosData[selectedProyect].link}</a>
                            </div>
                            
                            
                            <div className="ProyectsInformationRed">
        
                                <img src={github} alt="" style={{borderRadius:'50%', width:'35', height:'35px'}}/>
                                <img src={whatsapp} alt="" style={{borderRadius:'50%', width:'35', height:'35px'}} />
                                <img src={telefono} alt="" style={{borderRadius:'50%', width:'35', height:'35px'}} />
            
                            </div>
                        </div>
                        </div>
                        )
                        }
                        
            </div>  )}
        </>
    );
};

export default Proyectos;