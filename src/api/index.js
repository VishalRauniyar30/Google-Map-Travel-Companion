import axios from "axios";


export const getPlacesData = async (type, sw, ne) => {
    try {
        const { data : { data } } = await axios.get(`https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`, {
            params: {
                bl_latitude: sw.lat,
                tr_latitude: ne.lat,
                bl_longitude: sw.lng,
                tr_longitude: ne.lng,
            },
            
            headers: {
                'x-rapidapi-key': 'ab7ef8b757mshcc6a4b54e7789d5p146f62jsnc10592152152',
                'x-rapidapi-host': 'travel-advisor.p.rapidapi.com'
            }
        });
        console.log(data);
        return data;
    } catch (error) {
        console.log(error);
    };
};

export const getWeatherData = async (lat, lng) => {
    try {
        if(lat && lng) {
            const { data } = await axios.get('https://community-open-weather-map.p.rapidapi.com/find', {
                params: { lat, lon: lng },
                headers: {
                  'x-rapidapi-key': 'ab7ef8b757mshcc6a4b54e7789d5p146f62jsnc10592152152',
                  'x-rapidapi-host': 'community-open-weather-map.p.rapidapi.com',
                }, 
            })
            return data;
        }
        
    } catch (error) {
        console.log(error); 
    }
}