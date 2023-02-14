import React from 'react';

import { ArrowCircleUpRounded } from '@mui/icons-material';

import { TotalRevenueOptions, TotalRevenueSeries } from './charts.config';
import { Box, Stack, Typography } from '@pankod/refine-mui';
import ReactApexChart from 'react-apexcharts';

const TotalRevenue = () => {
  return (
    <Box
      p={4}
      flex={1}
      bgcolor='#fcfcfc'
      id='chart'
      display='flex'
      flexDirection='column'
      borderRadius='10px'
    >
      <Typography fontSize={18} fontWeight={600} color='#11142d'>
        Total Revenue
      </Typography>
      <Stack my='20px' direction='row' gap={4} flexWrap='wrap'>
        <Typography fontSize={22} fontWeight={700} color='#11142d'>
          $231,125
        </Typography>
        <Stack direction='row' alignItems='center' gap={1}>
          <ArrowCircleUpRounded sx={{ fontSize: 25, color: '#475BE8' }} />
          <Stack>
            <Typography fontSize={15} color='#475BE8'>
              0.6%
            </Typography>
            <Typography fontSize={12} color='#808191'>
              Than last month
            </Typography>
          </Stack>
        </Stack>
      </Stack>
      <ReactApexChart
        series={TotalRevenueSeries}
        options={TotalRevenueOptions}
        height={310}
        type='bar'
      />
    </Box>
  );
};

export default TotalRevenue;
