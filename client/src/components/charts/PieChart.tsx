import React from 'react';
import { Box, Stack, Typography } from '@pankod/refine-mui';

import { PieChartProps } from 'interfaces/home';
import ReactApexChart from 'react-apexcharts';

const PieChart = ({ title, value, series, colors }: PieChartProps) => {
  return (
    <Box
      id='chart'
      display='flex'
      flex={1}
      bgcolor='#fcfcfc'
      flexDirection='row'
      alignItems='center'
      justifyContent='space-between'
      pl={3}
      py={2}
      gap={2}
      borderRadius='10px'
      minHeight='100px'
      width='fit-content'
    >
      <Stack direction='column'>
        <Typography fontSize={14} color='#808191'>
          {title}
        </Typography>
        <Typography fontSize={24} color='#11142d' fontWeight={700}>
          {value}
        </Typography>
      </Stack>
      <ReactApexChart
        options={{
          chart: {
            type: 'donut',
          },
          colors,
          legend: {
            show: false,
          },
          dataLabels: {
            enabled: false,
          },
        }}
        series={series}
        type='donut'
        width='120px'
      />
    </Box>
  );
};

export default PieChart;
