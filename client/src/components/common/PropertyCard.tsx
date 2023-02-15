import React from 'react';

import { PropertyCardProps } from 'interfaces/property';
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Stack,
} from '@pankod/refine-mui';
import { Link } from '@pankod/refine-react-router-v6';
import { Place } from '@mui/icons-material';

const PropertyCard = ({
  id,
  title,
  location,
  price,
  photo,
}: PropertyCardProps) => {
  return (
    <Card
      component={Link}
      to={`/properties/${id}`}
      sx={{
        maxWidth: '330px',
        padding: '10px',
        '&:hover': {
          boxShadow: '0 0 10px 0 rgba(0, 0, 0, 0.1)',
        },
        cursor: 'pointer',
        textDecoration: 'none',
      }}
      elevation={0}
    >
      <CardMedia
        component='img'
        width='100%'
        height='200px'
        image={photo}
        alt={title}
        sx={{ borderRadius: '10px' }}
      />
      <CardContent
        sx={{
          display: 'flex',
          flexDirection: 'row',
          gap: '10px',
          paddingX: '5px',
          justifyContent: 'space-between',
        }}
      >
        <Stack direction='column' gap={1}>
          <Typography fontSize={18} fontWeight={500} color='#11142d'>
            {title}
          </Typography>
          <Stack direction='row' gap={0.5} alignItems='flex-start'>
            <Place
              sx={{
                fontSize: 18,
                color: '#11142D',
                marginTop: 0.5,
              }}
            />
            <Typography fontSize={14} color='#11142d'>
              {location}
            </Typography>
          </Stack>
        </Stack>
        <Box
          px={1.5}
          py={0.5}
          borderRadius={1}
          bgcolor='#dadefa'
          height='fit-content'
        >
          <Typography fontSize={12} fontWeight={600} color='#475be8'>
            ${price}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default PropertyCard;
