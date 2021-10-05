import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { getLostPets, getPetsAdop, getShelters } from '../../redux/actions';
import CardAdopcion from './CardAdopcion';
import CardLost from './CardLost';
import CardRefugio from './CardRefugio';
import { BiChevronsRight, BiChevronsLeft } from 'react-icons/bi';

function ContenedorCard({ className, title }) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      title === 'ADOPCIONES' ? getPetsAdop()
      : title === 'PERDIDOS' ? getLostPets()
      : getShelters()
    );
  }, [dispatch, title]);

  const items = useSelector((state) =>
    title === 'ADOPCIONES' ? state.petsAdop.rows
    : title === 'PERDIDOS' ? state.lostPets.rows
    : state.shelters.rows
  );

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6);
  const [pageNumberLimit] = useState(3);
  const [maxPageNumberList, setMaxPageNumberList] = useState(3);
  const [minPageNumberList, setMinPageNumberList] = useState(0);

  const handleChangePage = (e) => {
    setCurrentPage(Number(e.target.id));
  };

  const pages = [];

  for (let i = 1; i <= Math.ceil(items?.length / itemsPerPage); i++) {
    pages.push(i);
  }

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  let currentItems = items?.slice(indexOfFirstItem, indexOfLastItem);

  const renderPagesNumber = pages.map((p) => {
    if (p < maxPageNumberList + 1 && p > minPageNumberList) {
      return (
        <button
          key={p}
          id={p}
          onClick={handleChangePage}
          className="btn bg-primary text-white p-1 rounded-lg m-2"
        >
          {p}
        </button>
      );
    } else return null;
  });

  const handleNext = () => {
    setCurrentPage(currentPage + 1);

    if (currentPage + 1 > maxPageNumberList) {
      setMaxPageNumberList(maxPageNumberList + pageNumberLimit);
      setMinPageNumberList(minPageNumberList + pageNumberLimit);
    }
  };

  const handlePrev = () => {
    setCurrentPage(currentPage - 1);

    if ((currentPage - 1) % pageNumberLimit === 0) {
      setMaxPageNumberList(maxPageNumberList - pageNumberLimit);
      setMinPageNumberList(minPageNumberList - pageNumberLimit);
    }
  };

  return (
    <div className={` ${className} p-12 h-screen text-left w-full`}>
      <div className="mb-20 p-4 bg-gradient-to-r from-thirty to-fourty items-center  w-full">
        <h1 className="text-6xl font-bold grid justify-items-center  text-gray-200">
          {title}
        </h1>
      </div>

      <div className="flex items-center justify-center p-8 ">
        <button
          className="btn  bg-primary text-white rounded-full p-1 mr-1"
          onClick={handlePrev}
          disabled={currentPage === pages[0] ? true : false}
        >
          <BiChevronsLeft />
        </button>

        {renderPagesNumber}

        <button
          className=" btn bg-primary text-white rounded-full p-1 mr-1"
          onClick={handleNext}
          disabled={currentPage === pages[pages.length - 1] ? true : false}
        >
          <BiChevronsRight />
        </button>
      </div>

      <div className="grid grid-cols-3 gap-4 items-center  justify-center w-full">

        {currentItems &&
          currentItems.map((p) => {
            return (
              <div key={p.id} className="">

                {title === 'ADOPCIONES' ? (
                  <CardAdopcion
                    photo={
                      p.petPic
                        ? p.petPic
                        : 'https://drpp-ny.org/wp-content/uploads/2014/07/sorry-image-not-available.png'
                    }
                    name={p.name}
                    age={p.age}
                    size={p.size}
                    sex={p.sex}
                    country={p.country}
                    province={p.province}
                    city={p.city}
                    description={p.description}
                  />

                ) : title === 'PERDIDOS' ? (
                  <CardLost
                    photo={
                      p.photo
                        ? p.photo
                        : 'https://drpp-ny.org/wp-content/uploads/2014/07/sorry-image-not-available.png'
                    }
                    name={p.name}
                    size={p.size}
                    country={p.country}
                    province={p.province}
                    city={p.city}
                  />

                ) : ( // case title === 'REFUGIOS'
                  <CardRefugio
                    photo={
                      p.photo
                        ? p.photo
                        : 'https://drpp-ny.org/wp-content/uploads/2014/07/sorry-image-not-available.png'
                    }
                    name={p.name}
                    phone={p.phone}
                    country={p.country}
                    province={p.province}
                    city={p.city}
                    description={p.description}
                    responsable={p.responsable}
                    socialNet={p.link_web}
                    instagram={p.link_instagram}
                    facebook={p.link_facebook}
                    donaciones={p.link_donaciones}
                  />
                )}

              </div>
            );
          })}
          
      </div>
    </div>
  );
}

export default ContenedorCard;
