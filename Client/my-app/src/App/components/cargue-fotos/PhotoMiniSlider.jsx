import React from 'react';
import { Carousel } from 'react-elastic-carousel';

function PhotoMiniSlider({ photos }) {

  //* Para eliminar una foto
  const handleDeletePhoto = (e) => {
    e.preventDefault(e);
    const filtered = url.filter((picture) => picture !== e.target.id);
    setUrl(filtered);
  };

  return (
    <div>
      {photos?.length === 0 ? (
        <div className='w-32 h-full mx-auto flex items-center justify-center bg-primaryDark border-2 border-primary text-center text-primaryLight'>
          previsualización de imagen
        </div>
      ) : photos?.length === 1 ? (
        <div>
          <img src={url} alt='previsualización de imagen' className='h-full w-32 object-cover m-auto' />
        </div>
      ) : photos?.length > 1 ? (
        <Carousel breakPoints={[{ width: 1, itemsToShow: 1 }]} className='h-full w-full'>
          {photos?.map((picture, i) => (
            <div key={i} className='w-full h-full relative'>
              <button
                title='Borrar esta foto'
                id={picture}
                onClick={handleDeletePhoto}
                className='bg-attention text-white h-4 w-4 absolute top-0 right-3 rounded-full hover:bg-attentionLight transition-all'
              />
              <img src={picture} alt='previsualización de imagen' className='w-32 h-32 object-scale-down mx-auto' />
            </div>
          ))}
        </Carousel>
      ) : null}
    </div>
  );
}

export default PhotoMiniSlider;
