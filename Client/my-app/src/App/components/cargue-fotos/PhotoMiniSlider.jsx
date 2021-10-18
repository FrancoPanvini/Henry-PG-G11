import React from 'react';
import Carousel, { consts } from 'react-elastic-carousel';

//? icons
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';

function PhotoMiniSlider({ photos, setUrl }) {
  const renderArrows = ({ type, onClick, isEdge }) => {
    const pointer = type === consts.PREV ? <FaAngleLeft className='text-white' /> : <FaAngleRight className='text-white' />;
    return (
      <div
        onClick={onClick}
        disabled={isEdge}
        className={`flex items-center justify-center rounded-md bg-thirtyLight ${isEdge ? 'opacity-50' : 'btn border-thirtyDark'}`}>
        {pointer}
      </div>
    );
  };

  const renderPagination = ({ pages, activePage, onClick }) => {
    return (
      <div className='flex'>
        {pages.map((page) => {
          const isActivePage = activePage === page;
          return <div key={page} onClick={() => onClick(page)} active={isActivePage} className={`mt-1 mx-1 h-3 w-3 transition-all rounded-full ${isActivePage ? 'bg-thirtyDark' : 'shadow-emptyPagination hover:bg-thirtyLight'}`} />;
        })}
      </div>
    );
  };

  //* Para eliminar una foto
  const handleDeletePhoto = (e) => {
    e.preventDefault(e);
    const filtered = photos.filter((picture) => picture !== e.target.id);
    setUrl(filtered);
  };

  return (
    <div className='w-5/12 h-32 p-1 bg-primary rounded-lg border-2 border-primaryDark border-opacity-40'>
      {photos?.length === 0 ? (
        <div className='w-32 h-full mx-auto flex items-center justify-center bg-primaryDark border-2 border-primary text-center text-primaryLight'>
          previsualización de imagen
        </div>
      ) : photos?.length === 1 ? (
        <div className='h-full w-full relative'>
          <button
            title='Borrar esta foto'
            id={photos[0]}
            onClick={handleDeletePhoto}
            className='bg-attention text-white h-4 w-4 absolute top-0 right-3 rounded-full hover:bg-attentionLight transition-all'
          />
          <img src={photos[0]} alt='previsualización de imagen' className='h-full w-32 object-cover m-auto' />
        </div>
      ) : photos?.length > 1 ? (
        <Carousel itemsToShow={1} renderArrow={renderArrows} renderPagination={renderPagination} className='h-full w-full'>
          {photos?.map((picture, i) => (
            <div key={i} className='w-full h-full relative'>
              <button
                title='Borrar esta foto'
                id={picture}
                onClick={handleDeletePhoto}
                className='bg-attention text-white h-4 w-4 absolute top-0 right-3 rounded-full hover:bg-attentionLight transition-all'
              />
              <img src={picture} alt='previsualización de imagen' className='w-32 h-32 object-cover mx-auto' />
            </div>
          ))}
        </Carousel>
      ) : null}
    </div>
  );
}

export default PhotoMiniSlider;
