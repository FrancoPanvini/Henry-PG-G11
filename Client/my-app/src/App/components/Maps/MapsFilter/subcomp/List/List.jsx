import React, { useState, useEffect, createRef } from "react";
import {
  CircularProgress,
  Grid,
  Typography,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
} from "@material-ui/core";

import useStyles from "./style";
import PetsDetail from "../PetsDetail/PetsDetail";
import CardAdopcion from "../../../../Cards/CardAdopcion";

const List = ({ pets, childClicked, isLoading, type, setType, sex, setSex, size, setSize }) => {
  const classes = useStyles();
/*   const [type, setType] = useState("p");
  const [sex, setSex] = useState("m");
  const [size, setSize] = useState("p"); */

  const [petRefs, setPetRefs] = useState([]);

  useEffect(() => {
    setPetRefs((refs) =>
      Array(pets?.length)
        .fill()
        .map((_, i) => refs[i] || createRef())
    );
  }, [pets]);

  return (
    <div className={classes.container}>
      <Typography variant="h4">Mascotas en Adopcion</Typography>
      {isLoading ? (
        <div className={classes.loading}>
          <CircularProgress size="5rem" />
        </div>
      ) : (
        <>
          <FormControl className={classes.formControl}>
            <InputLabel>Tipo</InputLabel>
            <Select value={type} onChange={(e) => setType(e.target.value)}>
              <MenuItem value="p">Perros</MenuItem>
              <MenuItem value="g">Gatos</MenuItem>
            </Select>
          </FormControl>
          <FormControl className={classes.formControl}>
            <InputLabel>Sexo</InputLabel>
            <Select value={sex} onChange={(e) => setSex(e.target.value)}>
              <MenuItem value="m">Macho</MenuItem>
              <MenuItem value="h">Hembra</MenuItem>
            </Select>
          </FormControl>
          <FormControl className={classes.formControl}>
            <InputLabel>Tamaño</InputLabel>
            <Select value={size} onChange={(e) => setSize(e.target.value)}>
              <MenuItem value="c">Pequeno</MenuItem>
              <MenuItem value="m">Mediano</MenuItem>
              <MenuItem value="g">Grande</MenuItem>
            </Select>
          </FormControl>
          <Grid container spacing={3} className={classes.list}>
            {pets?.map((pet, i) => (
              <Grid ref={petRefs[i]} key={i} xs={12}>
               {/*  <PetsDetail
                  pet={pet}
                  selected={Number(childClicked) === i}
                  refProp={petRefs[i]}
                /> */}
                 <CardAdopcion
                    photo={pet.petPic ? pet.petPic : 'https://drpp-ny.org/wp-content/uploads/2014/07/sorry-image-not-available.png'}
                    name={pet.name}
                    age={pet.age}
                    size={pet.size}
                    sex={pet.sex}
                    country={pet.country}
                    province={pet.province}
                    city={pet.city}
                    id={pet.id}
                    selected={Number(childClicked) === i}
                  refProp={petRefs[i]}
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
