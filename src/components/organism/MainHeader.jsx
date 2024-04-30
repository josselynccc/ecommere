import Logo from '../molecules/mainHeader/Logo'
import MainMenu from '../molecules/mainHeader/MainMenu'
import AboutMe from '../molecules/mainHeader/AboutMe'
import './header.css'
import {  useState } from 'react'

const MainHeader = ({nave, planet,camara}) =>{
    if(planet){
        console.log(planet)
    }

    const [isVisibleAboutMe, setIsVisibleAboutMe] = useState(true)

    const hideAboutMe = ()=>{
        setIsVisibleAboutMe(false)
    }
    
    const VisibleAboutMe = ()=>{
        setIsVisibleAboutMe(true)
    }

    

    return <>
        {/* <div className='mainHeader'> */}
            <div className='logoAndMenu'>
                <Logo></Logo>
                <MainMenu 
                hideAboutMe={hideAboutMe}
                visibleAboutMe={VisibleAboutMe}
                isVisibleAboutMe={isVisibleAboutMe}
                nave = {nave}
                camara = {camara}
                planet = {planet}></MainMenu>
            </div>
            
            <div className={ isVisibleAboutMe ? 'aboutMe VisibleAboutMeContainer' : 'aboutMe OcultoAboutMeContainer'}>
                <AboutMe></AboutMe>
            </div>
        {/* </div> */}
    </>
}

export default MainHeader