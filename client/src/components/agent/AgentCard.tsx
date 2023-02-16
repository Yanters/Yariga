import { Box, Stack, Typography } from '@pankod/refine-mui';
import React from 'react';

import { AgentCardProp, InfoBarProps } from 'interfaces/agent';
import { useGetIdentity } from '@pankod/refine-core';
import { Link } from '@pankod/refine-react-router-v6';
import { EmailOutlined, LocationCity, Phone, Place } from '@mui/icons-material';

const InfoBar = ({ icon, name }: InfoBarProps) => {
  return (
    <Stack
      flex={1}
      minWidth={{ xs: '100%', sm: '300px' }}
      direction='row'
      gap={1.5}
    >
      {icon}
      <Typography fontSize={14} color='#808191'>
        {name}
      </Typography>
    </Stack>
  );
};

const AgentCard = ({
  id,
  name,
  email,
  avatar,
  noOfProperties,
}: AgentCardProp) => {
  const { data: currentUser } = useGetIdentity();

  const generateLink = () => {
    if (currentUser.email === email) return `/my-profile`;
    return `/agents/show/${id}`;
  };

  return (
    <Box
      component={Link}
      to={generateLink()}
      width='100%'
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', sm: 'row' },
        gap: '20px',
        padding: '20px',
        '&:hover': {
          boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
        },
      }}
    >
      <img
        src={avatar}
        alt='agent'
        width={90}
        height={90}
        style={{ borderRadius: '50%', objectFit: 'cover' }}
      />
      <Stack
        direction='column'
        justifyContent='space-between'
        flex={1}
        gap={{ xs: 4, sm: 2 }}
      >
        <Stack direction='row' alignItems='center' flexWrap='wrap' gap={2}>
          <Typography fontSize={20} fontWeight={600} color='#11142D'>
            {name}
          </Typography>
          <Typography fontSize={14} color='#808191'>
            Real Estate Agent
          </Typography>
        </Stack>
        <Stack
          direction='row'
          flexWrap='wrap'
          justifyContent='space-between'
          alignItems='center'
          gap={2}
        >
          <InfoBar
            icon={<EmailOutlined sx={{ color: '#808191' }} />}
            name={email}
          />
          <InfoBar
            icon={<Place sx={{ color: '#808191' }} />}
            name='London, UK'
          />
          <InfoBar
            icon={<Phone sx={{ color: '#808191' }} />}
            name='(+44) 123 456 789'
          />
          <InfoBar
            icon={<LocationCity sx={{ color: '#808191' }} />}
            name={`${noOfProperties} Properties`}
          />
        </Stack>
      </Stack>
    </Box>
  );
};

export default AgentCard;
