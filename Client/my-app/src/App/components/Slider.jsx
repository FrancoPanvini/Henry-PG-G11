import React from "react";
import { useSelector } from "react-redux";
import Carousel from "react-elastic-carousel";
import Card from "./Card";

const breakPoints = [
  { width: 1, itemsToShow: 1 },
  { width: 550, itemsToShow: 2 },
  { width: 768, itemsToShow: 3 },
  { width: 1200, itemsToShow: 4 },
];

export default function Slider() {
  const pets = useSelector((state) => state.petsAdop);

  return (
    <>
      <div className="pt-10">
        <Carousel breakPoints={breakPoints}>
          {pets &&
            pets.map((p) => {
              return (
                <div key={p.id} className="">
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
