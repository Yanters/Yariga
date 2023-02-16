import React from 'react';
import { useList } from '@pankod/refine-core';
import { Box, Stack, Typography } from '@pankod/refine-mui';
import {
  PieChart,
  PropertyCard,
  PropertyReferrals,
  TotalRevenue,
} from 'components';

const Home = () => {
  const { data, isLoading, isError } = useList({
    resource: 'properties',
    config: {
      pagination: {
        pageSize: 4,
      },
    },
  });

  const latestProperties = data?.data ?? [];

  if (isLoading) return <Box>Loading...</Box>;
  if (isError) return <Box>Error</Box>;

  return (
    <Box>
      <Typography fontSize={25} fontWeight={700} color='#11142D'>
        Dashboard
      </Typography>
      <Box mt='20px' display='flex' flexWrap='wrap' gap={4}>
        <PieChart
          title='Properties for sale'
          value={100}
          series={[25, 75]}
          colors={['#FFC107', '#FF9800']}
        />
        <PieChart
          title='Properties for rent'
          value={410}
          series={[41, 59]}
          colors={['#D32F2F', '#F44336']}
        />
        <PieChart
          title='Properties for sale'
          value={116}
          series={[60, 40]}
          colors={['#CDDC39', '#4CAF50']}
        />
        <PieChart
          title='Properties for rent'
          value={100}
          series={[25, 51]}
          colors={['#2196F3', '#3F51B5']}
        />
      </Box>
      <Stack
        mt='25px'
        width='100%'
        direction={{ xs: 'column', lg: 'row' }}
        gap={4}
      >
        <TotalRevenue />
        <PropertyReferrals />
      </Stack>
      <Box
        flex={1}
        borderRadius='10px'
        padding='20px'
        bgcolor='#fcfcfc'
        display='flex'
        flexDirection='column'
        minWidth='100%'
        mt='25px'
      >
        <Typography fontSize={20} fontWeight={700} color='#11142D'>
          Latest Properties
        </Typography>
        <Box
          mt='20px'
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '20px',
          }}
        >
          {latestProperties.map((property) => (
            <PropertyCard
              key={property._id}
              id={property._id}
              title={property.title}
              price={property.price}
              location={property.location}
              photo={property.photo}
            />
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default Home;
