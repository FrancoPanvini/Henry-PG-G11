import React, {useState} from 'react'
import { storage } from "./firebase/index";

function UploadImage({ photo, setUrl }) {

    const [image, setImage] = useState(null);

    const handleChange = e => {
        if (e.target.files[0]) {
          setImage(e.target.files[0]);
        }
      };

    const handleUpload = (e) => {
        e.preventDefault();
        const uploadTask = storage.ref(`images/${image.name}`).put(image);
        uploadTask.on(
          "state_changed",
          snapshot => {},
          error => {
            console.log(error);
          },
          () => {
            storage
              .ref("images")
              .child(image.name)
              .getDownloadURL()
              .then(url => {
                setUrl(url);
              });
          }
        );
      };


    return (
        <div className="text-center">
            <input name={photo} type="file" onChange={handleChange}/>
            <br />
            <button onClick={handleUpload} className={image === null ? "mt-1 w-32 px-2 invisible" : "btn btn-nav bg-primary w-32 px-2 rounded-xl border-b-fourty mr-2 mt-1"}>Subir foto</button>
        </div>
    )
}

export default UploadImage
