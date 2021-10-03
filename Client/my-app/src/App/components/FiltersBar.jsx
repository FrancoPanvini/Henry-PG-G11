import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router';
import { getPetsAdop, getPetsAdopFilter } from '../redux/actions';


function FiltersBar() {

    const dispatch = useDispatch();

    let location = useLocation();
    const [filterActive, setFilterActive] = useState({especie: false, ubicacion: false, edad: false, tamaño: false, sexo: false, fecha: false});
    const [urlFilter, setUrlFilter] = useState({type: "", gender: "", size: "", agemin: "", agemax: "", country: "", province: "", city: ""});
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

    const  handleSetUrl =  (e) => {
        e.preventDefault();
        let updateFilter = {
            ...urlFilter,
            [e.target.name] : e.target.value
        }  
        
        setUrlFilter(updateFilter);

        sendFilters(updateFilter);
    }

    const handleSetAge = (e) => {
        e.preventDefault();
        let value = e.target.value;

        let updateFilter = {
            ...urlFilter,
            [e.target.name] : value
        }
        setUrlFilter(updateFilter);
    }

    const handleSend = (e) => {
        e.preventDefault();
        if(urlFilter.agemin >= urlFilter.agemax) {
            alert("La edad minima debe ser menor a la maxima");
        }else sendFilters(urlFilter)
            
    }

    const setDisabled = () => {
        if(urlFilter.agemax === "" && urlFilter.agemax === "") return true;
       
        return false;
    }

    const handleResetFilters = (e) => {
        e.preventDefault();
        setUrlFilter({type: "", gender: "", size: "", agemin: "", agemax: "", country: "", province: "", city: ""});
        setFilterActive({especie: false, ubicacion: false, edad: false, tamaño: false, sexo: false, fecha: false});
        dispatch(getPetsAdop(1))
    }

    const sendFilters = (filters) => {
        let cleanFilter = filters;

        cleanFilter.type === "" && delete cleanFilter.type;
        cleanFilter.gender === "" && delete cleanFilter.gender;
        cleanFilter.size === "" && delete cleanFilter.size;
        cleanFilter.agemin === "" && delete cleanFilter.agemin;
        cleanFilter.agemax === "" && delete cleanFilter.agemax;
        cleanFilter.country === "" && delete cleanFilter.country;
        cleanFilter.city === "" && delete cleanFilter.city;
        cleanFilter.province === "" && delete cleanFilter.province;

       dispatch(getPetsAdopFilter(cleanFilter));

    }


    return (
        <>
       { currentLocation === "/adopciones" ?  <div className="border-r w-full  border-gray-800 p-8 ml-4 bg-transparent rounded-sm ">
        <div className="p-1 mb-2 flex flex-col justify-start">
            <label className="w-full pr-8  font-bold">Especie</label>
            <button value="p" name="type" onClick={handleSetUrl} className="w-1/3 hover:underline focus:underline">Perro</button>
            <button value="g" name="type" onClick={handleSetUrl} className="w-1/3 hover:underline focus:underline">Gato</button>
        </div>

        <div className="p-1 mb-2 flex flex-wrap justify-between items-center ">
            <label className="w-1/2 pr-8  font-bold">Ubicacion</label>
            <span>Estoy activo</span>   
        </div>


        <div className="p-1 mb-2 flex flex-wrap justify-between items-center ">
            <label className="w-1/2 pr-8  font-bold">Edad</label>
            <input type="number" name="agemin" min={0} max={20} placeholder="Edad min:"  className="w-3/4 mb-2" onChange={handleSetAge}/>
            <input type="number"  name="agemax" min={0} max={20} placeholder="Edad max:"  className="w-3/4 mb-4" onChange={handleSetAge}/>
            <button type="submit" className="btn bg-primary p-1 rounded-lg disabled:opacity-50 mb-2" onClick={handleSend} disabled={setDisabled()}>Send</button>
        </div>
            
       
        <div className="p-1 mb-2 flex flex-col justify-start">
            <label className="w-1/2 pr-8  font-bold">Tamaño</label>
            <button value="c" name="size" onClick={handleSetUrl} className="w-1/3 hover:underline focus:underline">Pequeño</button>
            <button value="m" name="size" onClick={handleSetUrl} className="w-1/3 hover:underline focus:underline">Mediano</button>
            <button value="g" name="size" onClick={handleSetUrl} className="w-1/3 hover:underline focus:underline">Grande</button>
        </div>
             
        
        <div className="p-1 mb-2 flex flex-col justify-start">
            <label className="w-1/2 pr-8  font-bold">Sexo</label>
            <button value="m" name="gender" onClick={handleSetUrl} className="w-1/3 hover:underline focus:underline">Macho</button>
            <button value="h" name="gender" onClick={handleSetUrl} className="w-1/3 hover:underline focus:underline">Hembra</button>
        </div>
        
       {/*  <div className="p-1 mb-4 flex flex-wrap justify-between items-center">
            <label className="w-1/2 pr-8  font-bold">Fecha</label>
            {filterActive.fecha === false ? <button className={classBtn} id="fecha" onClick={handleActiveFilter}>+</button> :  <button className={classBtn} id="fecha" onClick={handleActiveFilter}>-</button> }
           
        </div>
            {filterActive.fecha === true && <select className="w-full mb-4">
                                                <option>Select</option>
                                                <option value="m">Macho</option>    
                                                <option value="h">Hembra</option>    
                                            </select>} */}

            <button className="btn bg-primary p-1 rounded-lg" onClick={handleResetFilters}>Reset Filters</button>

        </div> : currentLocation === "/perdidos" ? <div className="border-r border-gray-800 p-8 ml-4 bg-transparent rounded-sm">
        <div className="p-1 mb-2 flex flex-col justify-start">
            <label className="w-full pr-8  font-bold">Especie</label>
            <button value="p" name="type" onClick={handleSetUrl} className="w-1/3 hover:underline focus:underline">Perro</button>
            <button value="g" name="type" onClick={handleSetUrl} className="w-1/3 hover:underline focus:underline">Gato</button>
        </div>

            <div className="p-1 mb-2 flex flex-wrap justify-between items-center ">
                <label className="w-1/2 pr-8  font-bold">Ubicacion</label>
                <span>Estoy activo</span>   
            </div>
                                            
            <button className="btn bg-primary p-1 rounded-lg" onClick={handleResetFilters}>Reset Filters</button>
            
        </div> :  <div className="border-r border-gray-800 p-8 ml-4 bg-transparent rounded-sm ">

        <div className="p-1 mb-2 flex flex-wrap justify-between items-center ">
                <label className="w-1/2 pr-8  font-bold">Ubicacion</label>
                <span>Estoy activo</span>   
            </div>
                                            
        <button className="btn bg-primary p-1 rounded-lg" onClick={handleResetFilters}>Reset Filters</button>
    
        </div>
        
    } 
    </>
       
    )
}

export default FiltersBar
