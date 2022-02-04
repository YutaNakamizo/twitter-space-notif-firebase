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
        さっそく通知を設定する
      </Button>

      <Box
        mt={1}
      >
        <Typography
          align="center"
          variant="caption"
          component="div"
        >
          通知設定には Twitter アカウントでのログインが必要です.
        </Typography>
        <Typography
          align="center"
          variant="caption"
          component="div"
        >
          新規ログインを行った時点で&nbsp;
          <Link
            href="https://ggtk.app/terms"
            target="_blank"
          >
            利用規約
          </Link>
          &nbsp;に同意したものとみなされます.
        </Typography>
      </Box>
    </Box>
  );
};

