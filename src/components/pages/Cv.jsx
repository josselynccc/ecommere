import './Home.css'
const Cv = () =>{    

    return<>
    <div className='iframeContainer'>
    <iframe className="iframe_cv" src="https://drive.google.com/file/d/1pRXOAmIjyj-DAPPJfYbXqvm4cFYQcmps/preview"></iframe>
    </div>
    

    </>
}
export default Cv

// import curriculumPdf from '../../assets/curriculum.pdf';

// const Cv = () => {
//     return (
//         <object data={curriculumPdf} type="application/pdf" width="100%" height="100%">
//             <p>El visor de PDF no es compatible con su navegador. Puede descargar el PDF <a href={curriculumPdf}>aquí</a>.</p>
//         </object>
//     );
// }

// export default Cv;