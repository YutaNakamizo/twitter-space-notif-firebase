import React from 'react';
import {
  Box,
  CircularProgress,
} from '@mui/material';

export const RouteLoading = ({
  ...props
}) => {
  return (
    <Box
      mt={4}
      display="flex"
      justifyContent="center"
      {...props}
    >
      <CircularProgress
      />
    </Box>
  );
}

