import React from 'react';
import { Box, Button, Card, CardActions, CardContent, CardMedia, Chip, Typography } from '@mui/material';
import Rating from '@mui/material/Rating';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';

import placeStyles from './PlaceDetailsStyles';

const PlaceDetails = ({ place, selected, refProp }) => {
    const classes = placeStyles();
    
    if(selected) refProp?.current?.scrollIntoView({ behavior : 'smooth', block : 'start' });

    return (
        <Card elevation={6}>
            <CardMedia 
                style={{ height : 350 }}
                image={place.photo ? place.photo.images.large.url : 'https://aspirantum.com/content/blog_posts/blog_post_cover_image_4_1564417102.jpg' }
                title={place.name}
            />
            <CardContent>
                <Typography gutterBottom variant='h5'>{place.name}</Typography>
                <Box display='flex' justifyContent='space-between'>
                    <Rating name='read-only' readOnly value={Number(place.rating)}/>
                    <Typography gutterBottom variant='subtitle1' component={'legend'}>{place.num_reviews} review{place.num_reviews > 1 && 's'}</Typography>
                </Box>
                <Box display={'flex'} justifyContent={'space-between'}>
                    <Typography variant='subtitle1' component='legend'>Price</Typography>
                    <Typography gutterBottom variant='subtitle1'>{place.price_level}</Typography>
                </Box>
                <Box display={'flex'} justifyContent={'space-between'}>
                    <Typography component='legend'>Ranking</Typography>
                    <Typography gutterBottom variant='subtitle1'>{place.ranking}</Typography>
                </Box>
                {place?.awards?.map((award) => (
                    <Box display='flex' justifyContent='space-between' my={1} alignItems='center'>
                        <img src={award.images.small} alt={award.display_name} />
                        <Typography variant='subtitle2' color='textSecondary'>{award.display_name}</Typography>
                    </Box>
                ))}
                {place?.cuisine?.map(({ name }) => (
                    <Chip key={name} size='small' label={name} className={classes.chip} />
                ))}
                {place?.address && (
                    <Typography gutterBottom variant='subtitle2' color='textSecondary' className={classes.subtitle}>
                        <LocationOnIcon /> {place.address}
                    </Typography>
                )}
                {place?.phone && (
                    <Typography variant='subtitle2' color='textSecondary' className={classes.spacing}>
                        <PhoneIcon /> {place.phone}
                    </Typography>
                )}
            </CardContent>
            <CardActions>
                <Button size='small' color='inherit' onClick={() => window.open(place.web_url, '_blank')}>
                    Trip Advisor
                </Button>
                <Button size='small' color='inherit' onClick={() => window.open(place.website, '_blank')}>
                    Website
                </Button>
            </CardActions>
        </Card>
    );
};

export default PlaceDetails;
