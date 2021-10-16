import React, { useState } from 'react';
import { storage } from './firebase/index';
import Carousel from 'react-elastic-carousel';

function UploadImage({ url, setUrl }) {
  const [image, setImage] = useState([]);
  const [progress, setProgress] = useState(0);

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(Object.values(e.target.files));
    }
  };

  //* Para eliminar una foto
  const handleDeletePhoto = (e) => {
    e.preventDefault(e);
    const filtered = url.filter((picture) => picture !== e.target.id);
    setUrl(filtered);
  };

  const handleUpload = (e) => {
    e.preventDefault();
    image.forEach((el) => {
      const uploadTask = storage.ref(`images/${el.name}`).put(el);
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
          setProgress(progress);
        },
        (error) => {
          console.log(error);
        },
        () => {
          storage
            .ref('images')
            .child(el.name)
            .getDownloadURL()
            .then((url) => {
              setUrl((prevUrl) => [...prevUrl, url]);
              setImage([]);
            });
        }
      );
    });
  };

  return (
    <div className='flex w-full items-center'>
      <div className='w-1/2 z-50'>
        <input type='file' multiple onChange={handleChange} className='mb-4' />
        <div className='w-full h-full text-center'>
          <button onClick={handleUpload} disabled={image.length === 0} className='btn btn-nav bg-thirty px-8 rounded-xl border-fourty mt-1 mb-4'>
            Subir foto(s) seleccionada(s)
          </button>
          <div className='flex items-center justify-center'>
            <progress value={progress} max='100' className='w-3/5 mr-2' title='Progreso de subida' />
            {progress}%
          </div>
        </div>
      </div>
      <div className='w-1/2 h-32'>
        {url?.length === 0 ? (
          <div className='w-32 h-full mx-auto flex items-center justify-center bg-primaryDark border-2 border-primary text-center text-primaryLight'>
            previsualización de imagen
          </div>
        ) : url?.length === 1 ? (
          <div>
            <img src={url} alt='previsualización de imagen' className='h-full w-32 object-cover m-auto' />

          </div>
        ) : (
          <Carousel breakPoints={[{ width: 1, itemsToShow: 1 }]} className='h-full w-full'>
            {url?.map((picture, i) => (
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
        )}
      </div>
    </div>
  );
}

export default UploadImage;
