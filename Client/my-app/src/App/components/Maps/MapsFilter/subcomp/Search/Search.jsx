import React, {useState} from "react";
import { Autocomplete } from "@react-google-maps/api";
import { AppBar, Toolbar, Typography, InputBase, Box } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";

import useStyles from "./styles";
import { useHistory } from "react-router-dom";

const Search = ({setCoordinates}) => {
  const history = useHistory();

  const classes = useStyles();
  const [autComplete, setAutComplete] = useState(null);

  const onLoad = (autoC) => {setAutComplete(autoC)};

  const onPlaceChanged = () => {
    const lat = autComplete.getPlace().geometry.location.lat();
    const lng = autComplete.getPlace().geometry.location.lng();

    setCoordinates({lat, lng})

  }

  return (
    <AppBar position="static">
      <Toolbar className={classes.toolbar}>
        <button onClick={() => history.goBack()} className="btn btn-lg bg-fourty border-fourtyLight">
          Volver
        </button>
        <Typography variant="h5" className={classes.title}>
          Buscador
        </Typography>
        <Box display="flex">
          <Typography variant="h6" className={classes.title}>
            Busca por zona
          </Typography>
          <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Buscar..."
                classes={{ root: classes.inputRoot, input: classes.inputInput }}
              />
            </div>
          </Autocomplete>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Search;
