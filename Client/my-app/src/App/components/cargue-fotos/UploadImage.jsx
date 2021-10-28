import React, { useState } from 'react';
import { storage } from './firebase/index';
import PhotoMiniSlider from './PhotoMiniSlider';

function UploadImage({ url, setUrl }) {
  const [progress, setProgress] = useState(0);

  const handleChange = e => {
    if (e.target.files[0]) {
      Object.values(e.target.files).forEach(el => {
        const uploadTask = storage.ref(`images/${el.name}`).put(el);
        uploadTask.on(
          'state_changed',
          snapshot => {
            const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
            setProgress(progress);
          },
          error => {
            console.log(error);
          },
          () => {
            storage
              .ref('images')
              .child(el.name)
              .getDownloadURL()
              .then(url => {
                setUrl(prevUrl => [...prevUrl, url]);
              });
          }
        );
      });
    }
  };

  return (
    <div className='flex w-full items-center'>
      <div className='w-7/12'>
        <input type='file' multiple onChange={handleChange} className='mb-4' />
        <div className='w-full h-full text-center'>
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
