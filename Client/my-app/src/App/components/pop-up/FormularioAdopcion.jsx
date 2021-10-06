import React, { useEffect, useState } from 'react';
import ReactDom from 'react-dom';

//? Components
import FormularioAdopcionSelect from './FormularioAdopcionSelect';
import FormularioAdopcionText from './FormularioAdopcionText';

//? Icons
import { IoIosCloseCircle } from 'react-icons/io';

function FormularioAdopcion({ onClose, name, petId }) {
  const [user, setUser] = useState({ id: '', name: '' });

  const [input, setInput] = useState({
    residencia: '',
    residentes: '',
    adulto: false,
    dedicacion: '',
    otrasPets: false,
    otrasPetsDesc: '',
    oldPets: false,
    oldPetsDesc: '',
    Userid: '',
    Petid: petId,
  });

  //* Setear la información del usuario desde el localStorage
  useEffect(() => {
    setUser({
      id: localStorage.getItem('userId'),
      name: localStorage.getItem('userName'),
    });
  }, []);

  //* Set UserId en Input
  useEffect(() => {
    setInput({ ...input, Userid: parseInt(user.id) });
  }, [user]);

  //* Set estado Input cuando cambian los selects
  const handleSelectChange = (name, value) => {
    setInput({ ...input, [name]: value });
  };

  return ReactDom.createPortal(
    <>
      <div className="fixed inset-0 bg-gray-50 bg-opacity-70 z-40" />
      <div className="fixed inset-0 z-50">
        <div className="relative top-20 mx-auto w-9/12 p-10 bg-fourty rounded-2xl grid justify-items-center">
          <div>
            <form>
              <IoIosCloseCircle className="text-primary absolute top-3 right-3 text-3xl hover:text-primaryLight cursor-pointer transition-all" onClick={onClose} />
              <div>
                <div className="font-bold text-primary grid justify-items-center pb-10">¡Hola {user.name}!</div>
                <p className="text-white">
                  Agradecemos tu interes por <span className="font-bold text-primary">{name}</span>, para considerar tu solicitud de adopción necesitamos conocerte un poco mas, por favor contesta
                  nuestras preguntas
                </p>
              </div>
              <br /> <br />
              <FormularioAdopcionSelect label="Tipo de residencia: " name="residencia" options={['Casa', 'Apartamento']} values={['house', 'app']} setInput={handleSelectChange} input={input} />
              <br />
              <FormularioAdopcionSelect label="Cantidad de niños en la residencia: " name="residentes" options={['1-3', '4-6', '+6']} values={['1-3', '4-6', '+6']} setInput={handleSelectChange} />
              <br />
              <FormularioAdopcionSelect label="Eres mayor de edad: " name="adulto" options={['SI', 'NO']} values={[true, false]} setInput={handleSelectChange} />
              <br />
              <FormularioAdopcionSelect
                label="¿Cuántas horas diarias puedes dedicarle al cuidado? "
                name="dedicacion"
                options={['0-2', '3-5', '+5']}
                values={['0-2', '3-5', '+5']}
                setInput={handleSelectChange}
              />
              <br />
              <div className="flex gap-5">
                <FormularioAdopcionSelect label="¿Tenes otras mascotas?: " name="otrasPets" options={['SI', 'NO']} values={[true, false]} setInput={handleSelectChange} />
                {input.otrasPets && <FormularioAdopcionText label="¿Cuáles?: " name="otrasPetsDesc" setInput={handleSelectChange} />}
              </div>
              <br />
              <div className="flex gap-5">
                <FormularioAdopcionSelect label="¿Tuviste mascotas en los últimos 10 años?: " name="oldPets" options={['SI', 'NO']} values={[true, false]} setInput={handleSelectChange} />
                {input.oldPets && <FormularioAdopcionText label="¿Cuáles?: " name="oldPetsDesc" setInput={handleSelectChange} />}
              </div>
            </form>
          </div>
          <div>
            <br />
          </div>
        </div>
      </div>
    </>,
    document.getElementById('portal')
  );
}

export default FormularioAdopcion;
