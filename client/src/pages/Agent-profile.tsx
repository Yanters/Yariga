import { useOne } from '@pankod/refine-core';
import { Box } from '@pankod/refine-mui';
import { useParams } from '@pankod/refine-react-router-v6';
import { Profile } from 'components';
import React from 'react';

const AgentProfile = () => {
  const { id } = useParams<{ id: string }>();

  const { data, isLoading, isError } = useOne({
    resource: 'users',
    id: id as string,
  });

  const myProfile = data?.data ?? [];

  console.log(myProfile);

  if (isLoading) return <Box>Loading...</Box>;
  if (isError) return <Box>Error</Box>;

  return (
    <Profile
      type='Agent'
      name={myProfile.name}
      email={myProfile.email}
      avatar={myProfile.avatar}
      properties={myProfile.allProperties}
    />
  );
};

export default AgentProfile;
