import React, { useState } from 'react'
import { useLocation } from 'react-router';


function FiltersBar() {

    let location = useLocation();
    const [filterActive, setFilterActive] = useState({especie: false, ubicacion: false, edad: false, tamaño: false, sexo: false, fecha: false});

    let currentLocation = location.pathname;

    const handleActiveFilter = (e) => {
        e.preventDefault();

        filterActive[e.target.id] === true ? setFilterActive({
            ...filterActive,
            [e.target.id] : false
        }) : setFilterActive({
            ...filterActive,
            [e.target.id] : true
        })
        
    }

    const classBtn = "w-1/4 btn ml-4 cursor-pointer text font-bold bg-primary text-white rounded-full shadow-inner";

    return (
        <>
       { currentLocation === "/adopciones" ?  <div className="border-r border-gray-800 p-8 ml-4 bg-transparent rounded-sm ">
        <div className="p-1 mb-4 flex flex-wrap justify-between items-center">
            <label className="w-1/2 pr-8  font-bold">Especie</label>
            {filterActive.especie === false ? <button className={classBtn} id="especie" onClick={handleActiveFilter}>+</button> :  <button className={classBtn} id="especie" onClick={handleActiveFilter}>-</button> }
           
        </div>
            {filterActive.especie === true && <span>Estoy activo</span>}

        <div className="p-1 mb-4 flex flex-wrap justify-between items-center ">
            <label className="w-1/2 pr-8  font-bold">Ubicacion</label>
            {filterActive.ubicacion === false ? <button className={classBtn} id="ubicacion" onClick={handleActiveFilter}>+</button> :  <button className={classBtn} id="ubicacion" onClick={handleActiveFilter}>-</button> }
           
        </div>
            {filterActive.ubicacion === true && <span>Estoy activo</span>}
        
        <div className="p-1 mb-4 flex flex-wrap justify-between items-center ">
            <label className="w-1/2 pr-8  font-bold">Edad</label>
            {filterActive.edad === false ? <button className={classBtn} id="edad" onClick={handleActiveFilter}>+</button> :  <button className={classBtn} id="edad" onClick={handleActiveFilter}>-</button> }
           
        </div>
            {filterActive.edad === true && <span>Estoy activo</span>}
       
        <div className="p-1 mb-4 flex flex-wrap justify-between items-center ">
            <label className="w-1/2 pr-8  font-bold">Tamaño</label>
            {filterActive.tamaño === false ? <button className={classBtn} id="tamaño" onClick={handleActiveFilter}>+</button> :  <button className={classBtn} id="tamaño" onClick={handleActiveFilter}>-</button> }
           
        </div>
            {filterActive.tamaño === true && <span>Estoy activo</span>}
        
        <div className="p-1 mb-4 flex flex-wrap justify-between items-center">
            <label className="w-1/2 pr-8  font-bold">Sexo</label>
            {filterActive.sexo === false ? <button className={classBtn} id="sexo" onClick={handleActiveFilter}>+</button> :  <button className={classBtn} id="sexo" onClick={handleActiveFilter}>-</button> }
           
        </div>
            {filterActive.sexo === true && <span>Estoy activo</span>}
        
        <div className="p-1 mb-4 flex flex-wrap justify-between items-center">
            <label className="w-1/2 pr-8  font-bold">Fecha</label>
            {filterActive.fecha === false ? <button className={classBtn} id="fecha" onClick={handleActiveFilter}>+</button> :  <button className={classBtn} id="fecha" onClick={handleActiveFilter}>-</button> }
           
        </div>
            {filterActive.fecha === true && <span>Estoy activo</span>}


        </div> : currentLocation === "/perdidos" ? <div className="border-r border-gray-800 p-8 ml-4 bg-transparent rounded-sm">

        <div className="p-1 mb-4 flex flex-wrap justify-between items-center">
            <label className="w-1/2 pr-8  font-bold">Especie</label>
            {filterActive.especie === false ? <button className={classBtn} id="especie" onClick={handleActiveFilter}>+</button> :  <button className={classBtn} id="especie" onClick={handleActiveFilter}>-</button> }
           
        </div>
            {filterActive.especie === true && <span>Estoy activo</span>}


        <div className="p-1 mb-4 flex flex-wrap justify-between items-center ">
            <label className="w-1/2 pr-8  font-bold">Ubicacion</label>
            {filterActive.ubicacion === false ? <button className={classBtn} id="ubicacion" onClick={handleActiveFilter}>+</button> :  <button className={classBtn} id="ubicacion" onClick={handleActiveFilter}>-</button> }
           
        </div>
            {filterActive.ubicacion === true && <span>Estoy activo</span>}


        <div className="p-1 mb-4 flex flex-wrap justify-between items-center">
            <label className="w-1/2 pr-8  font-bold">Sexo</label>
            {filterActive.sexo === false ? <button className={classBtn} id="sexo" onClick={handleActiveFilter}>+</button> :  <button className={classBtn} id="sexo" onClick={handleActiveFilter}>-</button> }
           
        </div>
            {filterActive.sexo === true && <span>Estoy activo</span>}

        <div className="p-1 mb-4 flex flex-wrap justify-between items-center">
            <label className="w-1/2 pr-8  font-bold">Fecha</label>
            {filterActive.fecha === false ? <button className={classBtn} id="fecha" onClick={handleActiveFilter}>+</button> :  <button className={classBtn} id="fecha" onClick={handleActiveFilter}>-</button> }
           
        </div>
            {filterActive.fecha === true && <span>Estoy activo</span>}

        </div> :  <div className="border-r border-gray-800 p-8 ml-4 bg-transparent rounded-sm ">

       <div className="p-1 mb-4 flex flex-wrap justify-between items-center ">
            <label className="w-1/2 pr-8  font-bold">Ubicacion</label>
            {filterActive.ubicacion === false ? <button className={classBtn} id="ubicacion" onClick={handleActiveFilter}>+</button> :  <button className={classBtn} id="ubicacion" onClick={handleActiveFilter}>-</button> }
           
        </div>
            {filterActive.ubicacion === true && <span>Estoy activo</span>}
    
        </div>
        
    } 
    </>
       
    )
}

export default FiltersBar
