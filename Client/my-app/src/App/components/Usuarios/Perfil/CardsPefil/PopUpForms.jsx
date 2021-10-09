import React,{useEffect,useState} from 'react'
import { getUserById } from '../../../../services/getUserById'



const PopUpForms = ({UserId, adult, dedication, oldPets, oldPetsDesc, otherPets, otherPetsDesc, residence, residents, onClose}) => {
 
    const [user, setUser] = useState()

    const handleUser =async (id) => {
            await getUserById(id).then((res)=>{
                console.log(res)
                setUser(res.data);
            })
          }
        
useEffect(()=> {
    handleUser(UserId)
            
}, [UserId])
    
    return(
        <>
          <div className="bg-gray-50 bg-opacity-70 z-40 " />
          <div className="z-50 p-2 rounded-lg h-96 bg-primaryDark text-white m-2">
                <h1>Info del solicitante</h1>
                <h2>Nombre: {user?.name} </h2>
                <h2>Pais: {user?.country}</h2>
                <h2>Provincia: {user?.province} </h2>
                <h2>Ciudad: {user?.city} </h2>
                <h2>Es mayor de edad: {adult=== true? "Si" : "No"}</h2>
                <h2>Dedicacion:{dedication}  horas diarias</h2>
                <h2>Tuvo mascotas en el pasado? 
                {oldPets? ` ${oldPetsDesc}` :   " No" }
                </h2>
                <h2>Tiene mascotas actualmente? 
                {otherPets? ` ${otherPetsDesc}` :  " No" }
                </h2>
                <h2>Tipo de propiedad: Dpto{residence === 'app'?" Departamento":"Casa"}</h2>
                <h2>Cuantas personas viven en su propiedad: {residents} personas</h2>
            <div>
              <button className="btn bg-white text-black font-bold rounded-lg hover:bg-green-600 hover:text-white p-2 ">Aceptar</button>
              {/* <button>Rechazar</button> */}
            </div>
          </div>
        </>
        
      );
}


export default PopUpForms