import React, { useState, useEffect, createRef } from 'react';
import { CircularProgress, Box, Typography } from '@material-ui/core';

import useStyles from './style';
import CardRefugio from '../../../../Cards/CardRefugio';

const ListRefugios = ({ items, childClicked, isLoading }) => {
  const classes = useStyles();

  const [shelterRef, setShelterRef] = useState([]);

  useEffect(() => {
    setShelterRef(refs =>
      Array(items?.length)
        .fill()
        .map((_, i) => refs[i] || createRef())
    );
  }, [items]);

  return (
    <div className={classes.container}>
      <Typography variant='h5'>Refugios</Typography>
      {isLoading ? (
        <div className={classes.loading}>
          <CircularProgress size='5rem' />
        </div>
      ) : (
        <div className='h-full'>
          <div className='h-full w-full mt-2 grid justify-items-center gap-4'>
            {items?.map((shelter, i) => (
              <Box ref={shelterRef[i]} key={i} xs={12} style={{ padding: '20px', margin: '20px' }}>
                <CardRefugio
                  photo={shelter.photo}
                  name={shelter.name}
                  phone={shelter.phone}
                  country={shelter.country}
                  province={shelter.province}
                  city={shelter.city}
                  id={shelter.id}
                  description={shelter.description}
                  responsable={shelter.responsable}
                  web={shelter.link_web}
                  instagram={shelter.link_instagram}
                  facebook={shelter.link_facebook}
                  donaciones={shelter.link_donaciones}
                  lat={shelter.lat}
                  lng={shelter.lng}
                  selected={Number(childClicked) === i}
                  refProp={shelterRef[i]}
                  className='grid justify-items-center'
                />
              </Box>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ListRefugios;
