import React, { useEffect, useState }  from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { getPetsAdop } from "../redux/actions";
import Card from "./Card";
//import { HiArrowCircleLeft, HiArrowCircleRight } from "react-icons/hi";
import { BiChevronsRight, BiChevronsLeft } from "react-icons/bi";

function ContenedorCard({className , title}) {
  const dispatch = useDispatch();
 
  useEffect(() => {
  dispatch(getPetsAdop());
  }, [dispatch])
  
 
  const pets = useSelector(state => state.petsAdop.rows);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6);
  const [pageNumberLimit] = useState(3);
  const [maxPageNumberList, setMaxPageNumberList] = useState(3);
  const [minPageNumberList, setMinPageNumberList] = useState(0);

  const  handleChangePage = (e) => {
    setCurrentPage(Number(e.target.id));
}

const pages = [];

for (let i = 1; i <= Math.ceil(pets?.length/itemsPerPage); i++) {
    pages.push(i);
}

const indexOfLastItem = currentPage * itemsPerPage;
const indexOfFirstItem = indexOfLastItem - itemsPerPage;
let currentItems =  pets?.slice(indexOfFirstItem, indexOfLastItem);


const renderPagesNumber = pages.map(p => {
  if( p < maxPageNumberList + 1 && p > minPageNumberList){
    return ( 
        <button key={p} id={p} onClick={handleChangePage} className="btn bg-primary text-white p-1 rounded-lg m-2">{p}</button>
    )
  }else return null;
});


const handleNext = () => {
    setCurrentPage( currentPage + 1);
    
    if( currentPage + 1 > maxPageNumberList){
        setMaxPageNumberList( maxPageNumberList + pageNumberLimit);
        setMinPageNumberList( minPageNumberList + pageNumberLimit);
    }
}

const handlePrev= () => {
    setCurrentPage( currentPage - 1);
    
    if( (currentPage - 1) % pageNumberLimit === 0){
        setMaxPageNumberList( maxPageNumberList - pageNumberLimit);
        setMinPageNumberList( minPageNumberList - pageNumberLimit);
    }
}

/*   let paginationPages = [];
  
  for(let i = 0; i < pages; i++) {
    paginationPages.push(i +1);
  } */

/*   const handleChangePage = (e) => {
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
   ) */


  
  return (
    <div className={` ${className} p-12 h-full text-left w-full`}>
       
       <div className='mb-20 p-4 bg-gradient-to-r from-thirty to-fourty items-center  w-full'>
          <h1 className="text-6xl font-bold grid justify-items-center  text-gray-200">{title}</h1> 
       </div>

      <div className="flex items-center justify-center p-8 ">
                                <button className="btn  bg-primary text-white rounded-full p-1 mr-1" onClick={handlePrev} disabled={ currentPage === pages[0] ? true : false}><BiChevronsLeft/></button>
                            
                            {renderPagesNumber}
                            
                                <button className=" btn bg-primary text-white rounded-full p-1 mr-1" onClick={handleNext} disabled={ currentPage === pages[pages.length - 1] ? true : false}><BiChevronsRight/></button>
      </div>
      <div className='grid grid-cols-3 gap-4 items-center  justify-center w-full'>
      { currentItems && currentItems.map( p => {
        return (
          <div key={p.id} className="" >
          <Card 
          photo={p.petPic ? p.petPic : "https://drpp-ny.org/wp-content/uploads/2014/07/sorry-image-not-available.png"}
          name={p.name}
          age={p.age}
          size={p.size}
          sex={p.sex}
          country={p.country}
          province={p.province}
          city={p.city}
          description={p.description}
          />
        </div>
        )
      })}
       </div>
    </div>
  );
}

export default ContenedorCard;
