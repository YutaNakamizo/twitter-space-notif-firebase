import React, {
  useContext,
} from 'react';
import {
  useNavigate,
} from 'react-router-dom';
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  Button,
} from '@mui/material';
import { AppContext } from '~/App';

export const CommonHeader = ({
  ...props
}) => {
  const {
    user,
  } = useContext(AppContext);

  const navigate = useNavigate();
  const handleSignOutClick = e => {
    navigate('/signout', { replace: true });
  };

  return (
    <AppBar
      color="inherit"
      position="sticky"
      {...props}
    >
      <Toolbar
      >
        <Box
        >
          <Typography
            component="div"
            variant="h6"
          >
            Admin - TWSpace Notif
          </Typography>
        </Box>

        <Box
          flexGrow={1}
        >
        </Box>

        <Box
        >
          {user ? (
            <Button
              onClick={handleSignOutClick}
            >
              ログアウト
            </Button>
          ) : (
            <></>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

