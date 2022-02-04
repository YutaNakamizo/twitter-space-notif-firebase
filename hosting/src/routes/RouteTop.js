import React from 'react';
import {
  Box,
  Container,
  Paper,
  Typography,
  Link,
  Avatar,
  Button,
} from '@mui/material';
import { SignIn } from '~/components/SignIn';
import {
  signIn,
} from '~/apis/auth';
import {
  analytics,
} from '~/apis/firebase';
import {
  logEvent,
} from 'firebase/analytics';

export const RouteTop = ({
  ...props
}) => {
  const handleSignInClick = e => {
    logEvent(analytics, 'login', {
      method: 'Twitter',
    });
    signIn();
  };

  return (
    <Box
    >
      <Container
        maxWidth="lg"
        disableGutters
        sx={{
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        <Box
          mt={8}
          mb={8}
        >
          <Typography
            component="h1"
            variant="h3"
            align="center"
          >
            Admin - Twitter Space Notification
          </Typography>
        </Box>

        <SignIn
          onSignInClick={handleSignInClick}
        />
      </Container>
    </Box>
  );
};

