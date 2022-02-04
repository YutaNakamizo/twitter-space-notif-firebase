import React from 'react';
import {
  Divider,
  List,
} from '@mui/material';
import { EndpointsListItem } from '~/components/EndpointsListItem';

export const EndpointsList = ({
  endpoints = [],
  onEditClick,
  editDisabled = false,
  onRemoveClick,
  removeDisabled = false,
  ...props
}) => {
  return (
    <List
      {...props}
    >
      {(() => {
        if(Array.isArray(endpoints)) {
          return (
            endpoints.length > 0 ? (
              <>
                <Divider
                />
                {endpoints.map(endpoint => (
                  <EndpointsListItem
                    key={endpoint.id}
                    onEditClick={onEditClick}
                    editDisabled={editDisabled}
                    onRemoveClick={onRemoveClick}
                    removeDisabled={removeDisabled}
                    {...endpoint}
                  />
                ))}
              </>
            ) : (
              <>
                通知先が登録されていません.
              </>
            )
          );
        }
        else {
          return (
            <>
            </>
          );
        }
      })()}
    </List>
  );
};

