import React from "react";
import Carousel from "react-elastic-carousel";
import Card from "./Card";
//import "./styles.css";

const breakPoints = [
  { width: 1, itemsToShow: 1 },
  { width: 550, itemsToShow: 2 },
  { width: 768, itemsToShow: 3 },
  { width: 1200, itemsToShow: 4 },
];

export default function Slider() {
  return (
    <>
     
      <div className="pt-10">
        <Carousel breakPoints={breakPoints}>
          
            <div className='p-2'>
              <Card photo="https://picsum.photos/id/237/300/200" />
            </div>
            <div className='p-2'>
              <Card photo="https://picsum.photos/id/237/300/200" />
            </div>
            <div className="p-2">
              <Card photo="https://picsum.photos/id/237/300/200" />
            </div>
            <div className="p-2">
              <Card photo="https://picsum.photos/id/237/300/200" />
            </div>
            
          
          
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
