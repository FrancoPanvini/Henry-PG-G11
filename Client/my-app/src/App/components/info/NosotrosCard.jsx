import React, { useState } from 'react';
import { FaGithubSquare, FaLinkedin, FaTwitterSquare, FaExternalLinkAlt, FaRegClipboard } from 'react-icons/fa';

function NosotrosCard({ photo, name, alias, description, strengths, mail, linkedin, github, twitter, portfolio, extraCSS }) {
  const [showTooltip, setShowTooltip] = useState(false);

  const timer = () => {
    setShowTooltip(true);
    setTimeout(() => setShowTooltip(false), 1500);
  };

  const copyText = (e) => {
    navigator.clipboard.writeText(e.target.innerText);
    timer();
  };

  return (
    <div className='m-4 relative'>
      <div className='z-30 mt-8 p-4 flex floorTinyShadowCircle transition-all bg-gradient-to-r from-thirtyDark to-fourtyLight rounded-xl border-2 border-opacity-30 border-white transform hover:scale-105'>
        <div className='z-40 w-5/12 h-full pr-4 flex items-center rounded-l-lg'>
          <div className='rounded-full w-full aspect-h-1 aspect-w-1'>
            <img src={photo} alt={`Foto de ${name}`} className={`h-full w-full rounded-full object-cover shadow-similBorderWhite ${extraCSS}`} />
          </div>
        </div>
        <div className='relative z-40 w-7/12 flex flex-col items-start justify-between text-sm text-gray-200 rounded-r-lg'>
          <div className='text-2xl font-bold'>{name}</div>
          <div className='mb-auto text-sm'>alias {alias}</div>
          <div className='text-center italic'>{description}</div>
          <div className='mt-auto'>Fortalezas: {strengths}</div>
          {portfolio && (
            <div className='transition-all hover:underline hover:text-white'>
              <a href={portfolio} target='_blank' rel='noreferrer'>
                Enlace a mi portfolio <FaExternalLinkAlt className='inline align-baseline text-xs' />
              </a>
            </div>
          )}
          <div
            onClick={copyText}
            value={mail}
            title='¡Click para copiar este mail!'
            className='text-center mb-2 cursor-pointer transition-all hover:underline hover:text-white relative'>
            {mail} <FaRegClipboard className='inline align-baseline text-sm' />
          </div>
          <div
            className={`${
              showTooltip ? 'opacity-100' : 'opacity-0 invisible'
            } z-50 absolute bottom-0 2xl:right-8 xl:-right-4 lg:-right-12 text-sm text-gray-300 bg-fourtyDark rounded-full py-1 px-3 min-w-max text-center transition-all`}>
            ¡Correo copiado en el portapapeles!
          </div>
          <div>
            <a href={linkedin} target='_blank' rel='noreferrer'>
              <FaLinkedin className='inline text-3xl transition-all 2xl:mr-8 xl:mr-4 hover:text-white hover:shadow-md' />
            </a>
            <a href={github} target='_blank' rel='noreferrer'>
              <FaGithubSquare className='inline text-3xl transition-all 2xl:mr-8 xl:mr-4 hover:text-white hover:shadow-md' />
            </a>
            {twitter && (
              <a href={twitter} target='_blank' rel='noreferrer'>
                <FaTwitterSquare className='inline text-3xl transition-all 2xl:mr-8 xl:mr-4 hover:text-white hover:shadow-md' />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default NosotrosCard;
