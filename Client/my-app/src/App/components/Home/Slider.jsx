import React from "react";
import { useSelector } from "react-redux";
import Carousel from "react-elastic-carousel";
import CardAdopcion from "../Cards/CardAdopcion";
import CardLost from "../Cards/CardLost";
import CardRefugio from "../Cards/CardRefugio";


const breakPoints = [
  { width: 1, itemsToShow: 1 },
  { width: 550, itemsToShow: 2 },
  { width: 768, itemsToShow: 3 },
  { width: 1200, itemsToShow: 4 },
];

export default function Slider({ title }) {
  const items = useSelector(state => (
      title === "ADOPCION" ? state.petsAdop.rows 
    : title === "PERDIDOS" ? state.lostPets.rows 
    : state.shelters.rows
  ));

  return (
    <>
      <div className="pt-10">
        <Carousel breakPoints={breakPoints}>
          {items &&
            items.map((p) => {
              return (
                <div key={p.id} className="">
                  {title === "ADOPCION" ? (
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
                  ) : title === "EXTRAVIADOS" ? (
                    <CardLost
                      photo={p.photo ? p.photo : "https://drpp-ny.org/wp-content/uploads/2014/07/sorry-image-not-available.png"}
                      name={p.name}
                      size={p.size}
                      country={p.country}
                      province={p.province}
                      city={p.city}
                    />
                  ) : ( // caso title === "REFUGIOS"
                    <CardRefugio
                      photo={
                        p.photo
                          ? p.photo
                          : "https://drpp-ny.org/wp-content/uploads/2014/07/sorry-image-not-available.png"
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
                  ) 
                }
                </div>
              );
            })}
        </Carousel>
      </div>
    </>
  );
}
