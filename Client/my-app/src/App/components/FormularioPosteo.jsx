import React, { useState } from 'react';

function FormularioPosteo() {
  const [mascota, setMascota] = useState({
    name: '',
    size: '',
    sex: '',
    age: null,
    description: '',
    // Ownerid: null,
    PetTypeid: '',
    Cityid: null,
  });

  const handleChange = e => {
    setMascota({
      ...mascota,
      [e.target.name]: e.target.value,
    });
  };

  const handlePublicar = e => {
    console.log('a ver si funciona');
    e.preventDefault();
  };

  return (
    <div className="py-12">
      <form className="flex flex-col w-4/5 max-w-3xl mx-auto p-8 rounded-lg bg-secondary">
        <label>Nombre de la mascota:</label>
        <input
          name="name"
          onChange={handleChange}
          className="rounded-md px-1"
        />
        <br />

        <label>Especie:</label>
        <div>
          <input
            name="PetTypeid"
            type="radio"
            id="gato"
            value="g"
            onChange={handleChange}
          />
          <label htmlFor="gato">Gato</label>{' '}
          <input
            name="PetTypeid"
            type="radio"
            id="perro"
            value="p"
            onChange={handleChange}
          />
          <label htmlFor="perro">Perro</label>
        </div>
        <br />

        <label>Sexo:</label>
        <div>
          <input
            name="sex"
            type="radio"
            id="hembra"
            value="h"
            onChange={handleChange}
          />
          <label htmlFor="hembra">Hembra</label>{' '}
          <input
            name="sex"
            type="radio"
            id="macho"
            value="m"
            onChange={handleChange}
          />
          <label htmlFor="macho">Macho</label>
        </div>
        <br />

        <label>Tamaño aproximado de la raza:</label>
        <div>
          <input
            name="size"
            type="radio"
            id="chico"
            value="c"
            onChange={handleChange}
          />
          <label htmlFor="chico">Chico</label>{' '}
          <input
            name="size"
            type="radio"
            id="mediano"
            value="m"
            onChange={handleChange}
          />
          <label htmlFor="mediano">Mediano</label>{' '}
          <input
            name="size"
            type="radio"
            id="grande"
            value="g"
            onChange={handleChange}
          />
          <label htmlFor="grande">Grande</label>
        </div>
        <br />

        <label>Edad (años):</label>
        <input
          name="age"
          type="number"
          min="0"
          max="30"
          onChange={handleChange}
          className="rounded-md px-1"
        />
        <br />

        <label>Descripción:</label>
        <textarea
          name="description"
          placeholder="Ej.: Tiene 6 meses, se lleva bien con otras mascotas, tiene sus vacunas, etc..."
          onChange={handleChange}
          className="rounded-md px-1"
        />
        <br />

        <label>Ciudad:</label>
        <select
          name="Cityid"
          onChange={handleChange}
          className="rounded-md px-1"
        >
          <option>--Selecciona una--</option>
          <option value="1">Ciudad 1</option>
          <option value="2">Ciudad 2</option>
          <option value="3">Ciudad 3</option>
        </select>
        <br />

        <button
          // disabled={true}
          onClick={handlePublicar}
          className="btn btn-lg bg-thirty text-white border-fourty"
        >
          Publicar
        </button>
      </form>
    </div>
  );
}

export default FormularioPosteo;
