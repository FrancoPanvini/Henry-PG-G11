import React from 'react'

function Things() {
    return (
        <div className="flex justify-around p-4 shadow-inner items-center text-center ">
            <div className="flex flex-col items-center">
                <img src={process.env.PUBLIC_URL + '/adoptar.png'} alt="adoptar" width="200px" height="200px" className="mb-8"/>
                <label className="text-2xl">Adopta a tu proximo compañero</label>
            </div>
            <div className="flex flex-col items-center">
                <img src={process.env.PUBLIC_URL + '/ayuda.png'} alt="ayuda"  width="200px" height="200px" className="mb-8"/>
                <label className="text-2xl">Ayuda a encontrarlos</label>
            </div>
            <div className="flex flex-col items-center">
                <img src={process.env.PUBLIC_URL + '/refugio.png'} alt="refugio"  width="200px" height="200px" className="mb-8"/>
                <label className="text-2xl">Conoce todos los refugios</label>
            </div>
        </div>
    )
}

export default Things
