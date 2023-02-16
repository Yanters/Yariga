import { useGetIdentity, useOne } from '@pankod/refine-core';
import { Box } from '@pankod/refine-mui';
import { Profile } from 'components';
import React from 'react';

const MyProfile = () => {
  const { data: currentUser } = useGetIdentity();
  const { data, isLoading, isError } = useOne({
    resource: 'users',
    id: currentUser?.userId,
  });

  const myProfile = data?.data ?? [];

  console.log(myProfile);

  if (isLoading) return <Box>Loading...</Box>;
  if (isError) return <Box>Error</Box>;

  return (
    <Profile
      type='My'
      name={myProfile.name}
      email={myProfile.email}
      avatar={myProfile.avatar}
      properties={myProfile.allProperties}
    />
  );
};

export default MyProfile;
