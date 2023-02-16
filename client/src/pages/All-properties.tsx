import React, { useMemo } from 'react';

import { CustomButton, PropertyCard } from 'components';
import { useNavigate } from '@pankod/refine-react-router-v6';
import {
  Box,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from '@pankod/refine-mui';
import { Add } from '@mui/icons-material';
import { useTable } from '@pankod/refine-core';

const AllProperties = () => {
  const navigate = useNavigate();

  const {
    tableQueryResult: { data, isLoading, isError },
    current,
    setCurrent,
    setPageSize,
    pageCount,
    sorter,
    setSorter,
    filters,
    setFilters,
  } = useTable();

  const allProperties = data?.data ?? [];

  const currentPrice = sorter?.find((item) => item.field === 'price')?.order;

  const toggleSort = (field: string) => {
    setSorter([
      {
        field,
        order: currentPrice === 'asc' ? 'desc' : 'asc',
      },
    ]);
  };

  const currentFilterValue = useMemo(() => {
    const logicalFilters = filters.flatMap((item) =>
      'field' in item ? item : []
    );

    return {
      title: logicalFilters.find((item) => item.field === 'title')?.value || '',
      propertyType:
        logicalFilters.find((item) => item.field === 'propertyType')?.value ||
        '',
    };
  }, [filters]);

  if (isLoading) return <Typography>Loading...</Typography>;
  if (isError) return <Typography>Error...</Typography>;

  return (
    <Box>
      <Box
        mt='20px'
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 3,
        }}
      >
        <Stack direction='column' width='100%'>

          <Stack
            direction='row'
            justifyContent='space-between'
            alignItems='center'
          >
          <Typography fontSize={24} fontWeight={700} color='#11142d'>
            {!allProperties.length ? 'No Properties Found' : 'All Properties'}
          </Typography>
            <CustomButton
              title='Add Property'
              handleClick={() => navigate('/properties/create')}
              backgroundColor='#475be8'
              color='#fcfcfc'
              icon={<Add />}
            />
          </Stack>
          <Box
            mb={2}
            mt={3}
            display='flex'
            width='85%'
            justifyContent='space-between'
            flexWrap='wrap'
          >
            <Box
              display='flex'
              gap={2}
              flexWrap='wrap'
              mb={{ xs: '20px', sm: 0 }}
            >
              <CustomButton
                title={'Sort by Price ' + (currentPrice === 'asc' ? '↑' : '↓')}
                handleClick={() => toggleSort('price')}
                backgroundColor='#475be8'
                color='#fcfcfc'
              />
              <TextField
                variant='outlined'
                color='info'
                placeholder='Search by title'
                value={currentFilterValue.title}
                onChange={(e) => {
                  setFilters([
                    {
                      field: 'title',
                      operator: 'contains',
                      value: e.currentTarget.value
                        ? e.currentTarget.value
                        : undefined,
                    },
                  ]);
                }}
              />
              <Select
                variant='outlined'
                color='info'
                displayEmpty
                required
                inputProps={{ 'aria-label': 'Without label' }}
                defaultValue=''
                value={currentFilterValue.propertyType}
                onChange={(e) => {
                  setFilters(
                    [
                      {
                        field: 'propertyType',
                        operator: 'eq',
                        value: e.target.value,
                      },
                    ],
                    'replace'
                  );
                }}
              >
                <MenuItem value=''>All</MenuItem>
                {[
                  'Apartment',
                  'Villa',
                  'FarmHouse',
                  'Condos',
                  'Duplex',
                  'Studio',
                  'Townhouse',
                  'Chalet',
                ].map((type) => {
                  return (
                    <MenuItem key={type} value={type.toLowerCase()}>
                      {type}
                    </MenuItem>
                  );
                })}
              </Select>
            </Box>
          </Box>
        </Stack>
      </Box>

      <Box mt='20px' sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
        {allProperties.map((property) => (
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
      {allProperties.length > 0 && (
        <Box display='flex' gap={2} flexWrap='wrap' mt={3}>
          <CustomButton
            title='Previous'
            handleClick={() => setCurrent((prev) => prev - 1)}
            backgroundColor='#475be8'
            color='#fcfcfc'
            disabled={current === 1}
          />
          <Box
            display={{ xs: 'hidden', sm: 'flex' }}
            alignItems='center'
            gap='5px'
          >
            Page <strong>{current}</strong> of {pageCount}
          </Box>
          <CustomButton
            title='Next'
            handleClick={() => setCurrent((prev) => prev + 1)}
            backgroundColor='#475be8'
            color='#fcfcfc'
            disabled={current === pageCount}
          />
          <Select
            variant='outlined'
            color='info'
            displayEmpty
            required
            inputProps={{ 'aria-label': 'Without label' }}
            defaultValue={10}
            onChange={(e) => {
              setPageSize(e.target.value ? Number(e.target.value) : 10);
            }}
          >
            {[1, 10, 20, 30, 40, 50].map((pageSize) => (
              <MenuItem key={pageSize} value={pageSize}>
                Show {pageSize}
              </MenuItem>
            ))}
          </Select>
        </Box>
      )}
    </Box>
  );
};

export default AllProperties;
