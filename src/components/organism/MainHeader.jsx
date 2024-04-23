import Logo from '../molecules/mainHeader/Logo'
import MainMenu from '../molecules/mainHeader/MainMenu'
import AboutMe from '../molecules/mainHeader/AboutMe'
import './header.css'
import { useState } from 'react'

const MainHeader = () =>{

    const [isVisibleAboutMe, setIsVisibleAboutMe] = useState(true)

    const hideAboutMe = ()=>{
        setIsVisibleAboutMe(false)
    }
    const VisibleAboutMe = ()=>{
        setIsVisibleAboutMe(true)
    }

    console.log(isVisibleAboutMe)

    return <>
        {/* <div className='mainHeader'> */}
            <div className='logoAndMenu'>
                <Logo></Logo>
                <MainMenu 
                hideAboutMe={hideAboutMe}
                visibleAboutMe={VisibleAboutMe}
                isVisibleAboutMe={isVisibleAboutMe}></MainMenu>
            </div>
            <AboutMe isVisibleAboutMe={isVisibleAboutMe}></AboutMe>
            
        {/* </div> */}
    </>
}

export default MainHeader