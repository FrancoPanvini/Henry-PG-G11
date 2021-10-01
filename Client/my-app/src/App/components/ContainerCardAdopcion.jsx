import React, { useEffect, useState }  from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { getPetsAdop } from "../redux/actions";
import Card from "./Card";
import { HiArrowCircleLeft, HiArrowCircleRight } from "react-icons/hi";

function ContenedorCard({className , title}) {
  const dispatch = useDispatch();
 
  useEffect(() => {
  dispatch(getPetsAdop(1));
  }, [dispatch])
  
 
  const pets = useSelector(state => state.petsAdop.rows);
  const pages = useSelector(state => Math.ceil(state.petsAdop.count / 6));
  const [currentPage, setCurrentPage] = useState(1);

  let paginationPages = [];
  
  for(let i = 0; i < pages; i++) {
    paginationPages.push(i +1);
  }

  console.log(paginationPages);

  const handleChangePage = (e) => {
    e.preventDefault();
    setCurrentPage(parseInt(e.target.value))
    dispatch(getPetsAdop(e.target.value));
  }
 
  const handlePrev = (e) => {
    e.preventDefault();
    if(currentPage > 1) setCurrentPage(currentPage - 1);
    dispatch(getPetsAdop(currentPage - 1));
  }

  const handleNext = (e) => {
    e.preventDefault();
    if(currentPage < pages) setCurrentPage(currentPage + 1);
    dispatch(getPetsAdop(currentPage + 1));
  }



  const pagination = paginationPages.map( p => {
    let btnActive = "bg-primaryLigth";
    return ( 
      <button key={p} id={p} value={p} className={`p-2 btn m-2 bg-primary font-bold text-white rounded-2xl focus:bg-primaryLight ${currentPage ===  parseInt(p) && btnActive}`}  onClick={handleChangePage}>{p}</button>
   )}
   )


  
  return (
    <div className={`justify-center ${className} p-32 h-full text-left w-full`}>
       
       <div className='mb-20 bg-gradient-to-r from-thirty to-fourty items-center text-white w-full'>
          <h1 className='text-white text-6xl font-bold grid justify-items-center'>{title}</h1> 
       </div>

      <div className="flex items-center justify-center p-8 ">
        <HiArrowCircleLeft className="mr-4 cursor-pointer text-3xl text-primary" onClick={handlePrev}/>
        {pagination}
        <HiArrowCircleRight className="ml-4 cursor-pointer text-3xl text-primary" onClick={handleNext}/>
      </div>
      <div className='grid grid-cols-3 gap-4 items-center  justify-center w-full'>
      { pets && pets.map( p => {
        return (
          <div key={p.id} className="" >
          <Card 
          photo="https://picsum.photos/id/237/300/200"
          name={p.name}
          age={p.age}
          size={p.size}
          sex={p.sex}
          country={p.country}
          province={p.province}
          city={p.city}
          />
        </div>
        )
      })}
       </div>

     {/*  <div className="my-3 flex flex-wrap items-center mx-2">
        <div className="w-full sm:w-1/2 md:w-1/3 px-2 my-2 grid justify-items-center">
          <Card photo="https://picsum.photos/id/237/300/200" />
        </div>
        <div className="w-full sm:w-1/2 md:w-1/3 px-2 my-2 grid justify-items-center">
          <Card photo="https://picsum.photos/id/237/300/200" />
        </div>
        <div className="w-full sm:w-1/2 md:w-1/3 px-2 my-2 grid justify-items-center">
          <Card photo="https://picsum.photos/id/237/300/200" />
        </div>
       
      </div>

      <div className="my-3 flex flex-wrap items-center mx-2">
        <div className="w-full sm:w-1/2 md:w-1/3 px-2 my-2 grid justify-items-center">
          <Card photo="https://picsum.photos/id/237/300/200" />
        </div>
        <div className="w-full sm:w-1/2 md:w-1/3 px-2 my-2 grid justify-items-center">
          <Card photo="https://picsum.photos/id/237/300/200" />
        </div>
        <div className="w-full sm:w-1/2 md:w-1/3 px-2 my-2 grid justify-items-center">
          <Card photo="https://picsum.photos/id/237/300/200" />
        </div>
      </div>
      
      <div className="my-3 flex flex-wrap items-center mx-2">
        <div className="w-full sm:w-1/2 md:w-1/3 px-2 my-2 grid justify-items-center">
          <Card photo="https://picsum.photos/id/237/300/200" />
        </div>
        <div className="w-full sm:w-1/2 md:w-1/3 px-2 my-2 grid justify-items-center">
          <Card photo="https://picsum.photos/id/237/300/200" />
        </div>
        <div className="w-full sm:w-1/2 md:w-1/3 px-2 my-2 grid justify-items-center">
          <Card photo="https://picsum.photos/id/237/300/200" />
        </div>
      </div> */}
    </div>
  );
}

export default ContenedorCard;
