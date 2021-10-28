import React from 'react';
import { useHistory } from 'react-router-dom';

//? Components
import NosotrosCard from './NosotrosCard';
import fotoDavid from '../../../images/DavidMendozaLopez2.jpg';
import fotoAparicio from '../../../images/FrancoAparicio2.jpg';
import fotoPanvini from '../../../images/FrancoPanvini.jfif';
import fotoPetri from '../../../images/SantiagoPetri.jpg';
import fotoLucas from '../../../images/LucasChaves.jpg';
import fotoDamian from '../../../images/DamianDiego.png';

//? Icons
import { FaChevronLeft } from 'react-icons/fa';

function Nosotros() {
  const history = useHistory();

  return (
    <div className='relative h-screen82 px-16 grid grid-cols-3 grid-rows-2 gap-4 bg-gradient-to-r from-gray-300 to-thirtyLight'>
      <span
        title='Volver'
        onClick={() => history.goBack()}
        className='absolute top-4 left-4 btn w-8 h-8 flex justify-center items-center rounded-full bg-thirtyLight border-thirtyDark text-white cursor-pointer hover:underline'>
        <FaChevronLeft className='relative right-0.5' />
      </span>
      <NosotrosCard
        photo={fotoLucas}
        name='Lucas Chaves'
        alias='Luquitas'
        // description
        strengths='Back-End'
        mail='chaves.lucas2000@gmail.com'
        linkedin='https://www.linkedin.com/in/lucas-chaves-dev/'
        github='https://github.com/LucasChaves12'
        // twitter
        // portfolio
        extraCSS
      />
      <NosotrosCard
        photo={fotoDamian}
        name='Damian Diego'
        alias='Dami'
        // description
        strengths='Front-End'
        mail='damian.diego.2510@gmail.com'
        linkedin='https://www.linkedin.com/in/damianldiego/'
        github='https://github.com/damldieg'
        twitter='https://twitter.com/DamianLDiego'
        portfolio='https://damdiegdevfolio.netlify.app'
        extraCSS
      />
      <NosotrosCard
        photo={fotoDavid}
        name='David Mendoza Lopez'
        alias='Deivid'
        // description
        strengths='Front-End'
        mail='davidmenlop@gmail.com'
        linkedin='https://www.linkedin.com/in/davidmenlop/'
        github='https://github.com/davidmenlop'
        twitter='https://twitter.com/DavidmenWeb'
        portfolio='https://portafolio-ivory.vercel.app'
        extraCSS='object-top'
      />
      <NosotrosCard
        photo={fotoAparicio}
        name='Franco Aparicio'
        alias='Fran'
        description='"El bug está en los detalles"'
        strengths='Front-End'
        mail='ffrancoaparicio@gmail.com'
        linkedin='https://www.linkedin.com/in/franco-aparicio'
        github='https://github.com/ffranco-a'
        // twitter
        // portfolio
        extraCSS='object-top'
      />
      <NosotrosCard
        photo={fotoPetri}
        name='Santiago Petri'
        alias='Petri'
        // description
        strengths='Back-End'
        mail='santiagopetri@hotmail.com'
        linkedin='https://www.linkedin.com/in/santiagopetri/'
        github='https://github.com/DonPepo'
        // twitter
        // portfolio
        extraCSS
      />
      <NosotrosCard
        photo={fotoPanvini}
        name='Franco Panvini'
        alias='Panvini'
        // description
        strengths='Back-End'
        mail='francopanvini@gmail.com'
        linkedin='https://linkedin.com/in/franco-panvini'
        github='https://github.com/FrancoPanvini'
        // twitter
        // portfolio
        extraCSS='object-bottom'
      />
    </div>
  );
}

export default Nosotros;
