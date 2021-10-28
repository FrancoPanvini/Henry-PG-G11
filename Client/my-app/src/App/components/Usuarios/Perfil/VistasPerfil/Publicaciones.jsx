import React, { useEffect, useState } from 'react';
import { getAdopPetsByUser } from '../../../../services/getAdopPetsByUser';
import { getLostPetsByUser } from '../../../../services/getLostPetsByUser';
import FormularioPosteoAdopcion from '../../../Mascotas/FormularioPosteoAdopcion';
import FormularioPosteoPerdido from '../../../Mascotas/FormularioPosteoPerdido';
import CardPublicacion from '../CardsPefil/CardPublicacion';

function Publicaciones({ userId }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);
  const [pets1, setPets1] = useState([]);
  const [pets2, setPets2] = useState([]);
  const [petPosted, setPetPosted] = useState(false);
  const pets = pets1.concat(pets2);
  //* cuando el botón de postear mascota se presiona, activa el re-renderizado (useEffect)
  const onPostPet = () => {
    setPetPosted(true);
  };

  const compare = (a, b) => {
    if (a < b) {
      return 1;
    }
    if (a > b) {
      return -1;
    }
    return 0;
  };

  pets.sort((a, b) => compare(a.createdAt, b.createdAt));
  useEffect(() => {
    if (petPosted) {
      setPetPosted(false);
    }

    const getPetsLost = async id => {
      const rta = await getLostPetsByUser(id);
      setPets1(rta);
    };
    const getPetsAdop = async id => {
      const rta = await getAdopPetsByUser(id);
      setPets2(rta);
    };

    getPetsLost(userId);
    getPetsAdop(userId);
  }, [userId, petPosted]);

  return (
    <div className='container mx-auto  flex flex-col'>
      <div className='flex flex-row justify-center mt-8 h-full bg-gray-200'>
        <button className='btn btn-lg bg-primary text-white mr-16' onClick={() => setIsOpen(true)}>
          Ofrecer nueva mascota en adopción
        </button>
        <button className='btn btn-lg bg-primary text-white ' onClick={() => setIsOpen2(true)}>
          Publicar nueva mascota extraviada
        </button>

        {isOpen && <FormularioPosteoAdopcion onClose={() => setIsOpen(false)} onPostPet={onPostPet} />}
        {isOpen2 && <FormularioPosteoPerdido onClose={() => setIsOpen2(false)} onPostPet={onPostPet} />}
      </div>
      <div className='container mx-auto p-2'>
        {pets?.length === 0 ? (
          <div className='w-full flex flex-col mt-8 justify-center items-center'>
            <span className='text-primaryDark text-3xl p-2 m-2 font-bold'>No tenes ninguna mascota publicada</span>
            <img src='https://cdn-icons-png.flaticon.com/512/1230/1230935.png' alt='refugio' width='300px' height='300px' className='m-8' />
          </div>
        ) : (
          pets?.map(p => {
            return (
              <div key={p.id}>
                <CardPublicacion
                  photo={p.petPic ? p.petPic : 'https://drpp-ny.org/wp-content/uploads/2014/07/sorry-image-not-available.png'}
                  name={p.name}
                  petId={p.id}
                  userId={userId}
                  size={p.size}
                  age={p.age}
                  type={p.type}
                  sex={p.sex}
                  created={p.createdAt}
                  onPostPet={onPostPet}
                  found={p.found}
                  updated={p.updatedAt}
                  description={p.description}
                  adopted={p.adopted}
                />
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

export default Publicaciones;
