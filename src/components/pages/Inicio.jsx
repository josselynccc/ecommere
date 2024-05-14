// import { useState } from "react"
// import Cargando from "./Cargando"

import Home from "./Home"

const Inicio = ()=>{

    // const [mostrarCarga, setMostrarCarga] = useState(true)
    // setTimeout(()=>{
    //     setMostrarCarga(false)
    // },10000)

    return <>
        <div>
            <Home></Home>
            {/* {mostrarCarga ? <Cargando></Cargando> : <Home></Home>} */}
        </div>
    </>
}
export default Inicio