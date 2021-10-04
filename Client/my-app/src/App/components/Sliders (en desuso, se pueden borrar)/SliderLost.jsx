
/////////
/////////
/////////    SE PUEDE ELIMINAR
/////////    QUEDA SOLO SLIDER
/////////








import React from "react";
import { useSelector } from "react-redux";
import Carousel from "react-elastic-carousel";
import CardLost from "../Cards/CardLost";

const breakPoints = [
  { width: 1, itemsToShow: 1 },
  { width: 550, itemsToShow: 2 },
  { width: 768, itemsToShow: 3 },
  { width: 1200, itemsToShow: 4 },
];

export default function Slider() {
  const pets = useSelector((state) => state.lostPets.rows);

  return (
    <>
      <div className="pt-10">
        <Carousel breakPoints={breakPoints}>
          {pets &&
            pets.map((p) => {
              return (
                <div key={p.id} className="">
                  <CardLost
                    photo={p.photo ? p.photo : "https://drpp-ny.org/wp-content/uploads/2014/07/sorry-image-not-available.png"}
                    name={p.name}
                    size={p.size}
                    country={p.country}
                    province={p.province}
                    city={p.city}
                  />
                </div>
              );
            })}

          {/* <Card photo="https://picsum.photos/id/237/300/200"/>
          <Card photo="https://picsum.photos/id/237/300/200"/>
          <Card photo="https://picsum.photos/id/237/300/200"/>
          <Card photo="https://picsum.photos/id/237/300/200"/>
          <Card photo="https://picsum.photos/id/237/300/200"/>
          <Card photo="https://picsum.photos/id/237/300/200"/>
          <Card photo="https://picsum.photos/id/237/300/200"/>
          <Card photo="https://picsum.photos/id/237/300/200"/> */}
        </Carousel>
      </div>
    </>
  );
}