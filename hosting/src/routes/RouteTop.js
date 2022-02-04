import React from 'react';
import {
  Box,
  Container,
  Paper,
  Typography,
  Link,
  Avatar,
  Button,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { SignIn } from '~/components/SignIn';
import { CommonFooter } from '~/components/CommonFooter';
import { ReactComponent as TwitterSpaceIconMini } from '~/images/twitter-space-mini.svg';
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
  const theme = useTheme();
  const wide = useMediaQuery('(min-width: 520px)');

  const handleSignInClick = e => {
    logEvent(analytics, 'login', {
      method: 'Twitter',
    });
    signIn();
  };

  return (
    <Box
      sx={{
        background: `linear-gradient(180deg, #D1E1ED, ${theme.palette.background.default})`,
      }}
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
          component="img"
          display="block"
          src="/images/kz_bg_30.png"
          width={wide ? '58%' : '100%'}
          sx={{
            marginLeft: 'auto',
            marginRight: 'auto',
          }}
        />

        <Box
          position="absolute"
          top={0}
          left={0}
          width="100%"
          height="100%"
          display="flex"
          alignItems="center"
          display="flex"
          flexDirection="column"
          justifyContent="center"
        >
          <Box
            height={wide ? '45%' : '50%'}
          >
          </Box>
          
          <Box
            position="relative"
            mr={2}
            ml={2}
          >
            <Paper
              sx={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                opacity: .85,
              }}
            />
            
            <Box
              position="relative"
              m={wide ? 3 : 2}
            >
              <Box
                component="img"
                display="block"
                src={wide ? '/images/logo_black.png' : '/images/logo_2lines_black.png'}
                width="100%"
                sx={wide ? {
                  maxWidth: theme.breakpoints.values.sm,
                } : {
                  maxWidth: theme.breakpoints.values.sm / 2,
                  marginRight: 'auto',
                  marginLeft: 'auto',
                }}
              />
              
              {wide && (
                <SignIn
                  mt={3}
                  mb={3}
                  onSignInClick={handleSignInClick}
                />
              )}
            </Box>
          </Box>
        </Box>


      </Container>

      {!wide && (
        <Container
          maxWidth="lg"
        >
          <SignIn
            mt={6}
            mb={6}
            onSignInClick={handleSignInClick}
          />
        </Container>
      )}
 
      <CommonFooter
        position="relative"
      />
    </Box>
  );
};

