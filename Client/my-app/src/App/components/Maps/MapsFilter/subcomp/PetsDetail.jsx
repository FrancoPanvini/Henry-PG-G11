import React from 'react';
import {Box, Typography, Button, Card, CardMedia, CardContent, CardActions, Chip} from '@material-ui/core';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import PhoneIcon from '@material-ui/icons/Phone';

import {useStyles} from 

function PetsDetail({pet}) {
    return (
        <div>
            {pet.name}
        </div>
    )
}

export default PetsDetail
