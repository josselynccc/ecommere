import gif1 from '../assets/proyects/colegio.gif'
import gif2 from '../assets/proyects/cripto.gif'
import gif3 from '../assets/proyects/todoapp.gif'
import imgColegio from '../assets/proyects/colegio.png'
import imgCripto from '../assets/proyects/criptomonedas.png'
import imgtodo from '../assets/proyects/todo.png'
import imgflor from '../assets/proyects/flore.png'
export const proyectosData ={
    proyecto1:{
        titulo:"TODO-APP",
        descCorta:"Una aplicación para gestionar tus tareas diarias.",
        descLarga:"Una aplicación de gestión de tareas que te permite crear, editar y eliminar tareas. ¡Mantén tu vida organizada!",
        gif: gif3,
        imagen: imgtodo,
        tecnologias:["Angular", "Css"],
        link:"https://example.com/todo-app"
    },
    proyecto2:{
        titulo:"COLEGIO SANTA RITA DE CASIA",
        descCorta:"Sitio web del Colegio Santa Rita de Casia.",
        descLarga:"Sitio web institucional del Colegio Santa Rita de Casia. ¡Descubre nuestras instalaciones, servicios y más!",
        gif: gif1,
        imagen: imgColegio,
        tecnologias:["HTML", "SASS", "JavaScript"],
        link:"https://landingpagesrc.netlify.app"
    },
    proyecto3:{
        titulo:"CRIPTOMONEDAS",
        descCorta:"Una plataforma para seguir los precios de las criptomonedas.",
        descLarga:"Una plataforma que te permite seguir los precios de las criptomonedas en tiempo real. ¡Mantente al día con el mercado!",
        gif: gif2,
        imagen: imgCripto,
        tecnologias:["React", "Css"],
        link:"https://proyecto-react-swart.vercel.app/login"
    },
    proyecto4:{
        titulo:"ECCOMERCE - TIENDA",
        descCorta:"Una tienda en línea para vender arreglos florales.",
        descLarga:"Una tienda en línea que te permite comprar una variedad de productos. ¡Explora nuestras ofertas hoy mismo!",
        gif: imgflor,
        imagen: imgflor,
        tecnologias:["React"],
        link:"EN PROCESO"
    }
};