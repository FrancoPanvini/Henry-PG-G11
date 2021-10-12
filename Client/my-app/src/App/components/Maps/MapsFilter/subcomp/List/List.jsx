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
//import PetsDetail from "../PetsDetail/PetsDetail";
import CardAdopcion from "../../../../Cards/CardAdopcion";

const List = ({
  items,
  childClicked,
  isLoading,
  type,
  setType,
  sex,
  setSex,
  size,
  setSize,
  filter,
}) => {
  const classes = useStyles();
  /*   const [type, setType] = useState("p");
  const [sex, setSex] = useState("m");
  const [size, setSize] = useState("p"); */

  const [petRefs, setPetRefs] = useState([]);
  const [prueba, setPrueba] = useState({
    type: "",
    sex: "",
    size: "",
  });

  useEffect(() => {
    setPetRefs((refs) =>
      Array(items?.length)
        .fill()
        .map((_, i) => refs[i] || createRef())
    );
  }, [items]);

  const handleChange = (event, type) => {
    let aux = { ...prueba, [type]: event };
    setPrueba(aux);
  };

  return (
    <div className={classes.container}>
      <Typography variant="h4">Mascotas</Typography>
      {isLoading ? (
        <div className={classes.loading}>
          <CircularProgress size="5rem" />
        </div>
      ) : (
        <>
          <FormControl className={classes.formControl}>
            <InputLabel>Tipo</InputLabel>
            <Select
              defaultValue="all"
              value={prueba.type}
              onChange={(e) => handleChange(e.target.value, "type")}
            >
              <MenuItem onClick={(e) => filter("type", "")} value="all">
                ALL
              </MenuItem>
              <MenuItem
                onClick={(e) => filter("type", e.target.dataset.value)}
                value="Perro"
              >
                Perros
              </MenuItem>
              <MenuItem
                onClick={(e) => filter("type", e.target.dataset.value)}
                value="Gato"
              >
                Gatos
              </MenuItem>
            </Select>
          </FormControl>
          <FormControl className={classes.formControl}>
            <InputLabel>Sexo</InputLabel>
            <Select
              defaultValue="all"
              value={prueba.sex}
              onChange={(e) => handleChange(e.target.value, "sex")}
            >
              <MenuItem onClick={(e) => filter("sex", "")} value="all">
                ALL
              </MenuItem>
              <MenuItem
                onClick={(e) => filter("sex", e.target.dataset.value)}
                value="m"
              >
                Macho
              </MenuItem>
              <MenuItem
                onClick={(e) => filter("sex", e.target.dataset.value)}
                value="h"
              >
                Hembra
              </MenuItem>
            </Select>
          </FormControl>
          <FormControl className={classes.formControl}>
            <InputLabel>Tamaño</InputLabel>
            <Select
              defaultValue="all"
              value={prueba.size}
              onChange={(e) => handleChange(e.target.value, "size")}
            >
              <MenuItem onClick={(e) => filter("size", "")} value="all">
                ALL
              </MenuItem>
              <MenuItem
                onClick={(e) => filter("size", e.target.dataset.value)}
                value="c"
              >
                Pequeño
              </MenuItem>
              <MenuItem
                onClick={(e) => filter("size", e.target.dataset.value)}
                value="m"
              >
                Mediano
              </MenuItem>
              <MenuItem
                onClick={(e) => filter("size", e.target.dataset.value)}
                value="g"
              >
                Grande
              </MenuItem>
            </Select>
          </FormControl>
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
                <CardAdopcion
                  photo={
                    pet.petPic
                      ? pet.petPic
                      : "https://drpp-ny.org/wp-content/uploads/2014/07/sorry-image-not-available.png"
                  }
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
