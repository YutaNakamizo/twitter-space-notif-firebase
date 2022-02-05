import React, {
  useState,
  useEffect,
} from 'react';
import {
  Box,
  Container,
  Toolbar,
  Button,
  LinearProgress,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RefreshIcon from '@mui/icons-material/Refresh';
import { EndpointsList } from '~/components/EndpointsList';
import { DestFormPopup } from '~/components/DestFormPopup';
import { DestRemovePopup } from '~/components/DestRemovePopup';
import {
  listEndpoints,
  registerEndpoint,
  updateEndpoint,
  removeEndpoint,
} from '~/apis/backend';
import {
  analytics,
} from '~/apis/firebase';
import {
  logEvent,
} from 'firebase/analytics';

const destOptions = require('~/destOptions');

export const RouteApp = ({
  ...props
}) => {
  const [ endpoints, setEndpoints ] = useState(null);
  const [ loadingEndpoints, setLoadingEndpoints ] = useState(true);
  const reloadEndpoints = () => {
    setLoadingEndpoints(true);
    listEndpoints().then(_endpoints => {
      _endpoints.sort((a, b) => (
        a.createTime - b.createTime
      ));
      _endpoints.sort((a, b) => (
        a.label < b.label ? -1 : 1
      ));
      setEndpoints(_endpoints);
      setLoadingEndpoints(false);
      console.log(_endpoints);
    });
  };
  useEffect(() => {
    reloadEndpoints();
  }, []);

  const handleAddClick = () => {
    setOpenPopup('add');
  };

  const [ editingEndpoint, setEditingEndpoint ] = useState(null);
  const [ editInitialValue, setEditInitialValue ] = useState(null);
  const handleEditClick = endpoint => {
    setEditingEndpoint(endpoint);
    setEditInitialValue({
      label: endpoint.label,
      destIndex: destOptions.findIndex(d => d.value === endpoint.dest),
      destDetails: endpoint.destDetails,
      targetUsernames: endpoint.targetUsernames,
    });
    setOpenPopup('edit');
  };

  const [ removingEndpoint, setRemovingEndpoint ] = useState(null);
  const handleRemoveClick = endpoint => {
    setRemovingEndpoint(endpoint);
    setOpenPopup('remove');
  }

  const register = values => {
    logEvent(analytics, 'endpoint_register', {
      dest: values.dest,
    });
    return registerEndpoint(values).then(resp => {
      console.log(resp.data);
      handlePopupClose(true);
      return;
    });
  };

  const update = values => {
    logEvent(analytics, 'endpoint_update', {
      dest: values.dest,
    });
    return updateEndpoint(editingEndpoint.id, values).then(resp => {
      console.log(resp.data);
      handlePopupClose(true);
      return;
    });
  };

  const remove = id => {
    logEvent(analytics, 'endpoint_remove');
    return removeEndpoint(removingEndpoint.id).then(resp => {
      console.log(resp);
      handlePopupClose(true);
      return;
    });
  };

  const [ openPopup, setOpenPopup ] = useState(null);
  const handlePopupClose = forceRefresh => {
    setOpenPopup(null);
    if(!forceRefresh) return;
    
    reloadEndpoints();
    return;
  };

  useEffect(() => {
    if(openPopup === null) {
      setTimeout(() => {
        setEditingEndpoint(null);
        setEditInitialValue(null);
        setRemovingEndpoint(null);
      }, 500);
    }
  }, [
    openPopup,
  ]);
  
  const theme = useTheme();
  const upToSM = useMediaQuery(theme.breakpoints.up('sm'));

  return (
    <>
      <Container
      >
        <Box
          position="relative"
        >
          <Toolbar
            disableGutters
          >
            <Box
              display="flex"
            >
              <Button
                variant="contained"
                disabled={
                  openPopup !== null
                }
                disableElevation
                startIcon={
                  <AddIcon
                  />
                }
                onClick={e => {
                  handleAddClick();
                }}
              >
                通知先を追加
              </Button>
            </Box>

            <Box
              display="flex"
              flexGrow={1}
            />
            
            <Box
              display="flex"
            >
              <Button
                variant="outlined"
                disabled={
                  loadingEndpoints
                  || openPopup !== null
                }
                startIcon={
                  <RefreshIcon
                  />
                }
                onClick={e => {
                  reloadEndpoints();
                }}
              >
                {loadingEndpoints ? (
                  '更新中'
                ) : (
                  '最新情報に更新'
                )}
              </Button>
            </Box>
          </Toolbar>
          
          {loadingEndpoints && (
            <LinearProgress
              sx={{
                position: 'absolute',
                right: 0,
                bottom: 0,
                left: 0,
              }}
            />
          )}
        </Box>

        <EndpointsList
          endpoints={endpoints}
          onEditClick={handleEditClick}
          editDisabled={
            loadingEndpoints
            || openPopup !== null
          }
          onRemoveClick={handleRemoveClick}
          removeDisabled={
            loadingEndpoints
            || openPopup !== null
          }
        />
      </Container>
      
      {/* Add new endpoint */}
      <DestFormPopup
        open={openPopup === 'add'}
        onClose={handlePopupClose}
        onSaveClick={register}
        fullScreen={!upToSM}
        maxWidth="sm"
        fullWidth
      />
      
      {/* Edit endpoint */}
      {editingEndpoint !== null && (
        <DestFormPopup
          initialValue={editInitialValue}
          open={openPopup === 'edit'}
          onClose={handlePopupClose}
          onSaveClick={update}
          fullScreen={!upToSM}
          maxWidth="sm"
          fullWidth
        />
      )}

      {/* Remove endpoint */}
      {removingEndpoint !== null && (
        <DestRemovePopup
          open={openPopup === 'remove'}
          onClose={handlePopupClose}
          onRemoveClick={remove}
          endpoint={removingEndpoint}
        />
      )}
    </>
  );
};

