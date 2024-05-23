import logo from '../../../assets/logo.png'
import '../../organism/header.css'
const Logo = ({hideAboutMe,hideProyect,hideContact}) =>{
    return <>
    <div className='containerlogo'>
        <img className='logo' onClick={()=>{
                hideAboutMe()
                hideProyect()
                hideContact()
            }} src={logo} alt=""/>
    </div>
        
    </>
}
export default Logo