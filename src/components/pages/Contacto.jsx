
import { useEffect, useRef, useState } from 'react';
import './Contacto.css'
import axios from 'axios';
import LeterforLeter from '../../helpers/LeterforLeter'
const Contacto = ({isVisibleContact})=>{
    const[message,setmessage]=useState({
        nombre:"",
        apellido:"",
        email: "",
        mensaje:""
    })
        const nombreRef = useRef(null);
        const apellidosRef = useRef(null);
        const emailRef = useRef(null);
        const spannombreRef = useRef(null);
        const spanapellidosRef = useRef(null);
        const spanemailRef = useRef(null);
        const mensajeRef = useRef(null);
        const spanmensajeRef = useRef(null);

        useEffect(() => {
            const nombreInput = nombreRef.current;
            const apellidosInput = apellidosRef.current;
            const emailInput = emailRef.current;
            const mensajeInput = mensajeRef.current;
            const spannombre = spannombreRef.current;
            const spanapellido = spanapellidosRef.current; 
            const spanemail= spanemailRef.current;
            const spanmensaje = spanmensajeRef.current;

            const handleSpanClick = (event) => {
                const input = event.target.previousSibling; // Obtener el input asociado al span
                input.focus(); // Hacer foco en el input
                input.classList.add('focus'); // Aplicar la clase 'focus' al input
                
            };
    
            const handleInputChange = (event,span) => {
                const input = event.target;
                input.classList.add('focus'); // Aplicar la clase 'focus' al input
                span.removeAttribute('data-placeholder');
            };
    
            const handleInputBlur = (event) => {
                const input = event.target;
                input.classList.remove('focus'); // Quitar la clase 'focus' al input
            };
    
            // Agregar event listeners para los inputs y spans
            nombreInput.addEventListener('input', (event)=>{handleInputChange(event,spannombre)});
            nombreInput.addEventListener('blur', handleInputBlur);
            apellidosInput.addEventListener('input', (event)=>{handleInputChange(event,spanapellido)});
            apellidosInput.addEventListener('blur', handleInputBlur);
            emailInput.addEventListener('input', (event)=>{handleInputChange(event,spanemail)});
            emailInput.addEventListener('blur', handleInputBlur);
            mensajeInput.addEventListener('input', (event)=>{handleInputChange(event,spanmensaje)});
            mensajeInput.addEventListener('blur', handleInputBlur);
            spannombre.addEventListener('click', handleSpanClick);
            spanapellido.addEventListener('click', handleSpanClick);
            spanemail.addEventListener('click', handleSpanClick);
            spanmensaje.addEventListener('click', handleSpanClick);

            

            
           
            

            return () => {
                // Quitar event listeners al desmontar el componente
                nombreInput.removeEventListener('focus', () => handleInputChange(nombreInput));
                nombreInput.removeEventListener('blur', () => handleInputBlur(nombreInput));
                apellidosInput.removeEventListener('focus', () => handleInputChange(apellidosInput));
                apellidosInput.removeEventListener('blur', () => handleInputBlur(apellidosInput)); 
                emailInput.removeEventListener('focus', () => handleInputChange(emailInput)); 
                emailInput.removeEventListener('blur', () => handleInputBlur(emailInput));
                mensajeInput.removeEventListener('focus', () => handleInputChange(emailInput)); 
                mensajeInput.removeEventListener('blur', () => handleInputBlur(emailInput));

                spannombre.removeEventListener('click', handleSpanClick);
                spanapellido.removeEventListener('click', handleSpanClick);
                spanemail.removeEventListener('click', handleSpanClick);
                spanmensaje.removeEventListener('click', handleSpanClick);
            };
        }, []);

        
        const [enviado, setEnviado] = useState(false);
        const handleSubmit = async (e) => {
            e.preventDefault();
            axios.post('https://servidor-message.netlify.app/.netlify/functions/app/messages', message)
            .then(data =>{
                console.log(data)
                setEnviado(true)
                const spannombre = spannombreRef.current;
                const spanapellido = spanapellidosRef.current; 
                const spanemail= spanemailRef.current;
                const spanmensaje = spanmensajeRef.current;
                spannombre.setAttribute('data-placeholder','Escriba su Nombre');
                spanapellido.setAttribute('data-placeholder','Escriba sus Apellidos');
                spanemail.setAttribute('data-placeholder','Escriba su Correo Electrónico');
                spanmensaje.setAttribute('data-placeholder','Escriba su Mensaje 😊');
                setmessage({
                    nombre: "",
                    apellido: "",
                    email: "",
                    mensaje: ""
                });
                setTimeout(() => {
                    setEnviado(false);
                }, 3000); // Ocultar el mensaje "ENVIADO" después de 3 segundos
            })
            .catch(e=>{console.log(e)})
        };
        
        const parrafoRef = useRef(null);
        const parrafoRef1 = useRef(null);
        useEffect(() => {
            let cleanUpAnimation
            let cleanUpAnimation1
            if (isVisibleContact && parrafoRef.current) {
                parrafoRef.current.textContent = '';
                cleanUpAnimation = LeterforLeter(
                    "CONTACTO",
                    parrafoRef.current
                )

                cleanUpAnimation1 =LeterforLeter(
                    "Tienes alguna pregunta o simplemente quieres saludar ¡ADELANTE!",
                    parrafoRef1.current
                )
            } else if (parrafoRef.current && parrafoRef1.current) {
                parrafoRef.current.textContent = ''
                parrafoRef1.current.textContent = ''
            }
    
            return () => {
                if (cleanUpAnimation) {
                    cleanUpAnimation();
                }
                if (cleanUpAnimation1) {
                    cleanUpAnimation();
                }
            }
        }, [isVisibleContact]);

    return <>
    <div className='containerContacto'>
        <div className='titleContact' >
            <p ref={parrafoRef}></p>
            <p ref={parrafoRef1}></p>
        </div>

        <form id="formulario" className="formulario" onSubmit={handleSubmit}>
            <div className="box-input">
                <input value={message.nombre} onChange={(e)=>{
                    setmessage({
                        ...message, //que lea lo que hay en el user
                        nombre: e.target.value
                    })
                }} ref={nombreRef} name="nombre" id="nombre" type="text" required/>
                <span ref={spannombreRef} data-placeholder="Escriba su Nombre"></span>
            </div>
            <div className="box-input">
                <input value={message.apellido}  onChange={(e)=>{
                    setmessage({
                        ...message, //que lea lo que hay en el user
                        apellido: e.target.value
                    })
                }} ref={apellidosRef} name="apellidos" id="apellidos" type="text" required/>
                <span  ref={spanapellidosRef} data-placeholder="Escriba sus Apellidos"></span>
            </div>
            <div className="box-input">
                <input value={message.email} onChange={(e)=>{
                    setmessage({
                        ...message, //que lea lo que hay en el user
                        email: e.target.value
                    })
                }} ref={emailRef} name="email" id="email" type="email" required/>
                <span ref={spanemailRef} data-placeholder="Escriba su Correo Electrónico"></span>
            </div>
            <div className="box-input">
                <input value={message.mensaje} onChange={(e)=>{
                    setmessage({
                        ...message, //que lea lo que hay en el user
                        mensaje: e.target.value
                    })
                }} ref={mensajeRef} name="email" id="email" type="message" required/>
                <span ref={spanmensajeRef} data-placeholder="Escriba su Mensaje 😊"></span>
            </div>
            <button  id="submit" type="submit" className="boton"> Enviar</button>
        </form>

        {enviado && 
            <p>ENVIADO</p>
        }
        </div>
    </>
}

export default Contacto