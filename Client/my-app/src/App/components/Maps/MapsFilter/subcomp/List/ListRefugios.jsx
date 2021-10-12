import React, { useState, useEffect, createRef } from "react";
import {
  CircularProgress,
  Grid,
  Typography,
} from "@material-ui/core";

import useStyles from "./style";
//import PetsDetail from "../PetsDetail/PetsDetail";
import CardRefugio from "../../../../Cards/CardRefugio";

const List = ({
  items,
  childClicked,
  isLoading,
}) => {
  const classes = useStyles();
  /*   const [type, setType] = useState("p");
  const [sex, setSex] = useState("m");
  const [size, setSize] = useState("p"); */

  const [petRefs, setPetRefs] = useState([]);
 /*  const [prueba, setPrueba] = useState({
    type: "",
    sex: "",
    size: "",
  }); */

  useEffect(() => {
    setPetRefs((refs) =>
      Array(items?.length)
        .fill()
        .map((_, i) => refs[i] || createRef())
    );
  }, [items]);

  /* const handleChange = (event, type) => {
    let aux = { ...prueba, [type]: event };
    setPrueba(aux);
  }; */

  return (
    <div className={classes.container}>
      <Typography variant="h4">Refugios</Typography>
      {isLoading ? (
        <div className={classes.loading}>
          <CircularProgress size="5rem" />
        </div>
      ) : (
        <>
          <Grid container spacing={3} className={classes.list}>
            {items?.map((pet, i) => (
              <Grid
                ref={petRefs[i]}
                key={i}
                xs={12}
                style={{ padding: "20px", margin: '20px' }}
              >
                {/*  <PetsDetail
                  pet={pet}
                  selected={Number(childClicked) === i}
                  refProp={petRefs[i]}
                /> */}
                <CardRefugio
                  photo={
                    pet.photo
                      ? pet.photo
                      : "https://drpp-ny.org/wp-content/uploads/2014/07/sorry-image-not-available.png"
                  }
                  name={pet.name}
                  phone={pet.phone}
                  country={pet.country}
                  province={pet.province}
                  city={pet.city}
                  id={pet.id}
                  description={pet.description}
                  responsable={pet.responsable}
                  socialNet={pet.link_web}
                  instagram={pet.link_instagram}
                  facebook={pet.link_facebook}
                  donaciones={pet.link_donaciones}
                  selected={Number(childClicked) === i}
                  refProp={petRefs[i]}
                  className='grid justify-items-center'
                />
              </Grid>
            ))}
          </Grid>
        </>
      )}
    </div>
  );
};

export default List;
