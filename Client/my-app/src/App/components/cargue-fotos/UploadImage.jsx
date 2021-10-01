import React from 'react'

function UploadImage() {

    const handleUpload = (e) =>{
        console.log(e.target.files)
    }



    return (
        <div>
            <label htmlFor="">Cargar</label>
            <input type="file" onChange={handleUpload}/>
        </div>
    )
}

export default UploadImage
