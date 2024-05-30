import logo from '../../../assets/logo.png'
import '../../organism/header.css'
import ReactAudioPlayer from 'react-audio-player';
import sonido from '../../../assets/sonido.mpeg'
import play from '../../../assets/play.png'
import pause from '../../../assets/pause.png'
import { useEffect, useRef, useState } from 'react';

const Logo = ({hideAboutMe,hideProyect,hideContact}) =>{

    const audioRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
  
    const togglePlayPause = () => {
      const audioElement = audioRef.current.audioEl.current
      if (isPlaying) {
        audioElement.pause();
      } else {
        audioElement.play();
        console.log(audioElement.volume)
      }
      setIsPlaying(!isPlaying);
    }

    useEffect(() => {
      const audioElement = audioRef.current.audioEl.current;
      audioElement.volume = 0.1; // Establece el volumen
    }, [isPlaying]);

    const handleLoadedMetadata = () => {
      const audioElement = audioRef.current.audioEl.current
      audioElement.volume = 0.1
    };
        
    return <>
    <div className='play' style={{width:'auto', height:'auto', position:'fixed', zIndex:10000}}>
        <ReactAudioPlayer
            ref={audioRef}
            src={sonido}
            autoPlay={false}
            controls={false}
            onLoadedMetadata={handleLoadedMetadata}
        />
        <button style={{padding:0, border:0, background:'transparent'}} onClick={togglePlayPause}>
          {isPlaying ? (<img style={{width:'3em'}} src={pause}/>) : (<img  style={{width:'3em'}} src={play}/>)}
        </button>
    </div>
        
    <div className='containerlogo' style={{right: 0}}>
        <img className='logo' onClick={()=>{
                hideAboutMe();
                hideProyect();
                hideContact();
            }} src={logo} alt=""/>
    </div>
        
    </>
}
export default Logo