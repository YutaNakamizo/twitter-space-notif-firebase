import React from 'react';
import {
  Box,
  Button,
  Typography,
  Link,
} from '@mui/material';

export const SignIn = ({
  onSignInClick = () => {},
  ...props
}) => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      {...props}
    >
      <Button
        variant="contained"
        size="large"
        onClick={onSignInClick}
      >
        Twitter でログイン
      </Button>
    </Box>
  );
};

