import React, {useState} from 'react'

function UploadImage() {

    const [file, setFile] = useState(null);

    const handleUpload = (e) =>{
        setFile(e.target.files[0])
    }

    const handlerSend = () => {
        if(!file){
            alert('Debes cargar una Imagen')
            return
        }

        const formdata = new FormData()
        formdata.append('image', file)
    }


    return (
        <div>
            <input type="file" onChange={handleUpload}/>
            <button onClick={handlerSend} className="bg-primary btn w-20 rounded-xl border-b-fourty mr-2" activeClassName="navButtonActive">Upload</button>
        </div>
    )
}

export default UploadImage
