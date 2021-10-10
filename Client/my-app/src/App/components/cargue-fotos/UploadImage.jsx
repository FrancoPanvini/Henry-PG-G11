import React, { useState } from 'react';
import { storage } from './firebase/index';

function UploadImage({ photo, setUrl }) {
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
            });
        }
      );
    });
  };
  //Comentar el div de progress si hace mal a la vista

  return (
    <div className='flex flex-col justify-between items-center p-2'>
      <input name={photo} type='file' multiple onChange={handleChange} />
      <div className={image.length === 0 ? 'invisible ' : 'w-full text-center'}>
        <button onClick={handleUpload} className='btn btn-nav bg-thirty px-8 rounded-xl border-b-fourty mt-1'>
          Subir foto seleccionada y previsualizar
        </button>
        <div className="flex items-center justify-center">
          <progress value={progress} max='100' className="w-3/5 mr-2" title='Progreso de subida' />{progress}%
        </div>
      </div>
    </div>
  );
}

export default UploadImage;
