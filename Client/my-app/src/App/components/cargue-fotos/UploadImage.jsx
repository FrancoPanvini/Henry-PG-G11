import React, {useState} from 'react'
import { storage } from "./firebase/index";

function UploadImage({ photo, setUrl }) {

    const [image, setImage] = useState([]);
    const [progress, setProgress] = useState(0);

    const handleChange = e => {
        if (e.target.files[0]) {
          setImage(Object.values(e.target.files));
        }
      };

    const handleUpload = (e) => {
        e.preventDefault();
        image.forEach(el => {
          const uploadTask = storage.ref(`images/${el.name}`).put(el);
          uploadTask.on(
            "state_changed",
            snapshot => {
              const progress = Math.round(
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100
              );
              setProgress(progress);
            },
            error => {
              console.log(error);
            },
            () => {
              storage
              .ref("images")
              .child(el.name)
              .getDownloadURL()
              .then(url => {
                setUrl(prevUrl => [...prevUrl, url]);
              });
            }
            );
        })
      };
          //Comentar el div de progress si hace mal a la vista

    return (
        <div className="text-center">
            <div><progress value={progress} max="100" /></div> 
            <input name={photo} type="file" multiple onChange={handleChange}/>
            <br />
            <button onClick={handleUpload} className={image === null ? "mt-1 w-32 px-2 invisible" : "btn btn-nav bg-primary w-32 px-2 rounded-xl border-b-fourty mr-2 mt-1"}>Subir foto</button>
        </div>
    )
}

export default UploadImage
