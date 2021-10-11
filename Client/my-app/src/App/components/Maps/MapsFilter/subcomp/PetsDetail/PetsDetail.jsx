import React from "react";
import {
  Box,
  Typography,
  Button,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Chip,
} from "@material-ui/core";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import PhoneIcon from "@material-ui/icons/Phone";

import useStyles from "./style";
import CardAdopcion from "../../../../Cards/CardAdopcion";
import { FaPlaceOfWorship } from "react-icons/fa";

const PetsDetail = ({ pet, selected, refProp }) => {
  if (selected)
    refProp?.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  const classes = useStyles();

  return (
    <Card elevation={6}>
      <CardMedia
        style={{ height: 350 }}
        image={
          pet.petPic
            ? pet.petPic
            : "https://drpp-ny.org/wp-content/uploads/2014/07/sorry-image-not-available.png"
        }
      />

      <CardContent>
        <Typography gutterBottom variant="h5">
          {pet.name}
        </Typography>
        <Box display="flex" justifyContent="space-between">
          <Typography variant="subtitle1">Sexo</Typography>
          <Typography gutterBottom variant="subtitle1" value={pet.sex}>
            {pet.sex}
          </Typography>
        </Box>
        <Box display="flex" justifyContent="space-between">
          <Typography variant="subtitle1">Tamaño</Typography>
          <Typography gutterBottom variant="subtitle1" value={pet.size}>
            {pet.size}
          </Typography>
        </Box>
        <Box display="flex" justifyContent="space-between">
          <Typography variant="subtitle1">Edad</Typography>
          <Typography gutterBottom variant="subtitle1" value={pet.age}>
            {pet.age} años
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default PetsDetail;
