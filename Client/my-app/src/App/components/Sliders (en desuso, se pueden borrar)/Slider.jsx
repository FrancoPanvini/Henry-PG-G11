
/////////
/////////
/////////    SE PUEDE ELIMINAR
/////////    QUEDA SOLO SLIDER
/////////








import React from "react";
import { useSelector } from "react-redux";
import Carousel from "react-elastic-carousel";
import CardAdopcion from "../Cards/CardAdopcion";

const breakPoints = [
  { width: 1, itemsToShow: 1 },
  { width: 550, itemsToShow: 2 },
  { width: 768, itemsToShow: 3 },
  { width: 1200, itemsToShow: 4 },
];

export default function Slider() {
  const pets = useSelector((state) => state.petsAdop.rows);

  return (
    <>
      <div className="pt-10">
        <Carousel breakPoints={breakPoints}>
          {pets &&
            pets.map((p) => {
              return (
                <div key={p.id} className="">
                  <CardAdopcion
                    photo={p.petPic ? p.petPic : "https://drpp-ny.org/wp-content/uploads/2014/07/sorry-image-not-available.png"}
                    name={p.name}
                    age={p.age}
                    size={p.size}
                    sex={p.sex}
                    country={p.country}
                    province={p.province}
                    city={p.city}
                  />
                </div>
              );
            })}
        </Carousel>
      </div>
    </>
  );
}
