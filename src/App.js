import React, { useEffect, useState } from 'react';
import { createTheme, CssBaseline, Grid2 } from '@mui/material';
import { ThemeProvider } from '@mui/styles';

import { getPlacesData } from './api';
import Header from './components/Header/Header';
import List from './components/List/List';
import Map from './components/Map/Map';


const theme = createTheme();

const App = () => {
    const [type, setType] = useState('restaurants');
    const [rating, setRating] = useState('');

    const [coordinates, setCoordinates] = useState({});
    // const [bounds, setBounds] = useState(null);
    const [bounds, setBounds] = useState({});

    const [places, setPlaces] = useState([]);
    // const [weatherData, setWeatherData] = useState([]);
    const [filteredPlaces, setFilteredPlaces] = useState([]);
    
    const [childClicked, setChildClicked] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [autocomplete, setAutocomplete] = useState(null);

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(({ coords : { latitude, longitude } }) => {
            setCoordinates({ lat : latitude, lng : longitude });
        });
    }, []);

    useEffect(() => {
        const filtered = places?.filter((place) => Number(place.rating) > rating);
        setFilteredPlaces(filtered);
    }, [rating, places]);

    useEffect(() => {
        if(bounds.sw && bounds.ne) {
            setIsLoading(true);

            // getWeatherData(coordinates.lat, coordinates.lng)
            // .then((data) => setWeatherData(data));

            getPlacesData(type, bounds.sw, bounds.ne)
            .then((data) => {
                setPlaces(data?.filter((place) => place.name && place.num_reviews > 0));
                setFilteredPlaces([]);
                setRating('');
                setIsLoading(false);
            });
        };
    }, [type, bounds]);

    const onLoad = (autoC) => setAutocomplete(autoC);

    const onPlaceChanged = () => {
        const lat = autocomplete.getPlace().geometry.location.lat();
        const lng = autocomplete.getPlace().geometry.location.lng();
    
        setCoordinates({ lat, lng });
    };
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Header onPlaceChanged={onPlaceChanged} onLoad={onLoad} />
            <Grid2 container spacing={3} style={{ width : '100%' }}>
                <Grid2 item xs={12} md={4}>
                    <List 
                        places={filteredPlaces?.length ? filteredPlaces : places} 
                        childClicked={childClicked} 
                        isLoading={isLoading}
                        type={type}
                        setType={setType}
                        rating={rating}
                        setRating={setRating}
                    />
                </Grid2>
                <Grid2 item xs={12} md={8} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Map
                        setCoordinates={setCoordinates}
                        setBounds={setBounds}
                        coordinates={coordinates}
                        places={filteredPlaces?.length ? filteredPlaces : places}
                        setChildClicked={setChildClicked}
                        // weatherData={weatherData}
                    />
                </Grid2>
            </Grid2>
        </ThemeProvider>
    );
};

export default App;