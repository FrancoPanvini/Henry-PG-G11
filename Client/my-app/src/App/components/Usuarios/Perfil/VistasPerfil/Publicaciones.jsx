import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { getPetsAdopByUser } from '../../../../redux/actions';
import CardPublicacion from '../CardsPefil/CardPublicacion'

function Publicaciones({userId}) {
  const pets = useSelector((state) => state.userPets.rows);

  const dispatch = useDispatch();
 
  console.log(pets)

  useEffect(() => {
    dispatch(getPetsAdopByUser(userId));
  }, [dispatch, userId]);

  return (
    <div className="container mx-auto  flex flex-col">
      <div className="container mx-auto p-2 overflow-auto h-112"> 
       {pets ? pets.map((p) =>{
        return (
          <div key={p.id} >
            <CardPublicacion photo={
              p.petPic
                ? p.petPic
                : 'https://drpp-ny.org/wp-content/uploads/2014/07/sorry-image-not-available.png'
            } name={p.name}/>
          </div>
        )}
       ) : <span>Loading</span>}

      </div>
        <div className="flex justify-center mt-8 h-auto bg-gray-200">
          <Link to="/adopciones/ofrecer" className="mx-auto">
            <button className="btn btn-lg text-3xl bg-primary text-white">
              Ofrecer una mascota en adopción
            </button>
          </Link>
        </div>
    </div>
  )
}

export default Publicaciones
