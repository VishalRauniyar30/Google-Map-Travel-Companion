import React, { createRef, useEffect, useState } from 'react';
import { CircularProgress, FormControl, Grid2, InputLabel, MenuItem, Select, Typography } from '@mui/material';

import listStyles from './ListStyles';
import PlaceDetails from '../PlaceDetails/PlaceDetails';

const List = ({ places, childClicked, isLoading, type, setType, rating, setRating }) => {
    const [elRefs, setElRefs] = useState([]);
    const classes = listStyles();
    
    useEffect(() => {
        // const refs = Array(places?.length).fill().map((_, i) => elRefs[i] || createRef());
        // setElRefs(refs);
        setElRefs((refs) => Array(places?.length).fill().map((_, i) => refs[i] || createRef()));
    }, [places]);

    return (
        <div className={classes.container}>
            <Typography variant='h4'>Restaurants, Hotels & Attractions Around you</Typography>
            {isLoading ? (
                <div className={classes.loading}>
                    <CircularProgress size='5rem' />
                </div>
            ) : (
                <>
                    <FormControl variant='outlined' className={classes.formControl}>
                        <InputLabel id='type'>Type</InputLabel>
                        <Select id='type' value={type} onChange={(e) => setType(e.target.value)} label='Type'>
                            <MenuItem value='restaurants'>Restaurants</MenuItem>
                            <MenuItem value='hotels'>Hotels</MenuItem>
                            <MenuItem value='attractions'>Attractions</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl variant='outlined' className={classes.formControl}>
                        <InputLabel id='rating'>Rating</InputLabel>
                        <Select id='rating' value={rating} onChange={(e) => setRating(e.target.value)} label="Rating">
                            <MenuItem value=''>All</MenuItem>
                            <MenuItem value={3}>Above 3.0</MenuItem>
                            <MenuItem value={4}>Above 4.0</MenuItem>
                            <MenuItem value={4.5}>Above 4.5</MenuItem>
                        </Select>
                    </FormControl>
                    <Grid2 container spacing={3} className={classes.list}> 
                        {places?.map((place, i) => (
                            <Grid2 ref={elRefs[i]} item key={i} xs={12}>
                                <PlaceDetails
                                    place={place}
                                    selected={Number(childClicked) === i}
                                    refProp={elRefs[i]} 
                                />
                            </Grid2>
                        ))}
                    </Grid2>
                </>
            )}
        </div>
    );
};

export default List;