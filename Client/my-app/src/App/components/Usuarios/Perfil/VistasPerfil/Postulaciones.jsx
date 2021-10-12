import React,{useEffect, useState} from 'react'
import { getFormByUserId } from '../../../../services/getFormByUserId';
import CardPostulacion from '../CardsPefil/CardPostulacion';


function Postulaciones({UserId}) {
  const [formsByUser, setFormsByUser] = useState([]);
  


  useEffect(() => {
    const getFormByUser = async (UserId) => {
      const forms = await getFormByUserId(UserId);
      console.log(forms.data);
      setFormsByUser(forms.data);
    };
    getFormByUser(UserId);
  }, [UserId]);

  return (
    <div>
      {formsByUser?.map((el) => {
        return(
          <div>
       <CardPostulacion PetId={el.PetId} state={el.state}/>
          </div>
        )

      })}
    </div>
  )
}

export default Postulaciones
