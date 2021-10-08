import React, {useState} from 'react'
import {CircularProgress, Grid, Typography, InputLabel, MenuItem, FormControl, Select} from '@material-ui/core';

import useStyles from './style';
import PetsDetail from '../PetsDetail'

const List = ({pets}) => {

    const classes = useStyles();
    const [type, setType] = useState('p');
    const [sex, setSex] = useState('m');
    const [size, setSize] = useState('p')

    return (
        <div className={classes.container}>

            <Typography variant='h4'>Mascotas en Adopcion</Typography>
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
                    <MenuItem value="p">Pequeno</MenuItem>
                    <MenuItem value="m">Mediano</MenuItem>
                    <MenuItem value="g">Grande</MenuItem>
                </Select>
            </FormControl>
            <Grid container spacing={3} className={classes.list}>
                {pets?.map((pet, i) => 
                <Grid item key={i} xs={12}>
                    <PetsDetail pet={pet} />
                </Grid>)}
            </Grid>
        </div>
    )
}

export default List
