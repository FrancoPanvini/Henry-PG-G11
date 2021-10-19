import React from "react";
import ReactDom from 'react-dom';
import { FaSave } from "react-icons/fa";
import { IoIosCloseCircle } from "react-icons/io";
import UploadImage from "../../../cargue-fotos/UploadImage";

const PopUpPhoto = ({onClose, url, setUrl}) => {
    return ReactDom.createPortal(
        <>
        <div className='fixed inset-0 bg-gray-50 bg-opacity-70 z-40'>
            <div className='fixed inset-0 z-50 overflow-y-scroll '>
                <div className='panel relative top-10 bg-primary mx-auto w-2/4 max-w-3xl grid justify-items-center'>
            <div>
            <IoIosCloseCircle
              title='Cancelar y volver'
              className='text-thirty absolute top-1 right-1 text-3xl hover:text-thirtyLight cursor-pointer transition-all z-50'
              onClick={onClose}
            />
          </div>

        <UploadImage url={url} setUrl={setUrl} /> 
        <button className="btn bg-green-600 text-white w-10 h-10 flex shadow-2xl justify-center items-center text-xl mr-2 rounded-full">
        <FaSave onClick={onClose} title='Guardar'/>
        </button>
        </div>
        </div>
        </div>
        </>,
        document.getElementById('portal')
    )
}

export default  PopUpPhoto