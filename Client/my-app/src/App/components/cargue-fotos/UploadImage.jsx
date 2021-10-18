import React, { useState } from 'react';
import { storage } from './firebase/index';
import PhotoMiniSlider from './PhotoMiniSlider';

function UploadImage({ url, setUrl }) {
  const [image, setImage] = useState([]);
  const [progress, setProgress] = useState(0);

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(Object.values(e.target.files));
    }
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
      <div className='w-7/12'>
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
      <PhotoMiniSlider photos={url} setUrl={setUrl} />
    </div>
  );
}

export default UploadImage;
