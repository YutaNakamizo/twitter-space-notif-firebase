import React, {
  useState,
  useEffect,
} from 'react';
import {
  Box,
  FormControl,
  InputLabel,
  Input,
  Chip,
  Select,
  MenuItem,
  FormHelperText,
} from '@mui/material'

export const DestFormTargetUsernames = ({
  onChange = () => {},
  disabled = false,
  acceptableTargetUsernames = [],
  initialValue = [],
  ...props
}) => {
  const [ targetUsernames, setTargetUsernames ] = useState(initialValue);

  const [ targetUsernamesError, setTargetUsernamesError ] = useState(null);

  const validate = ({
    targetUsernames,
  }) => {
    const result = {
      changed: false,
      valid: false,
    };

    if(
      targetUsernames.join() !== initialValue.join()
    ) {
      result.changed = true;
    }

    if(
      targetUsernames.length > 0
    ) {
      result.valid = true;
      setTargetUsernamesError(null);
    }
    else {
      setTargetUsernamesError('少なくとも 1 つのユーザを指定してください.');
    }

    return result;
  };

  useEffect(() => {
    console.log(targetUsernames)
    const {
      changed,
      valid,
    } = validate({
      targetUsernames,
    });

    onChange({
      changed,
      valid,
      values: targetUsernames,
    });
  }, [
    targetUsernames,
  ]);

  const [ targetUsernamesTouched, setTargetUsernamesTouched ] = useState(false);

  return (
    <Box
      {...props}
    >
      <FormControl
        fullWidth
        variant="standard"
        disabled={disabled}
        error={targetUsernamesTouched && Boolean(targetUsernamesError)}
      >
        <InputLabel
        >
          通知対象の Twitter ユーザ
        </InputLabel>
        <Select
          multiple
          value={targetUsernames}
          onChange={e => {
            setTargetUsernames(
              typeof e.target.value === 'string' ? (
                e.target.value.split(',').sort()
              ) : (
                e.target.value.sort()
              )
            );
          }}
          onBlur={e => {
            setTargetUsernamesTouched(true);
          }}
          renderValue={selected => (
            <Box
              display="flex"
              flexWrap="wrap"
              gap={.5}
            >
              {targetUsernames.map((targetUsername, index) => (
                <Chip
                  key={index}
                  label={targetUsername}
                />
              ))}
            </Box>
          )}
        >
          {acceptableTargetUsernames.map((username, index) => (
            <MenuItem
              key={index}
              value={username}
            >
              {username}
            </MenuItem>
          ))}
        </Select>
        
        {targetUsernamesTouched && (
          <FormHelperText
          >
            {targetUsernamesError}
          </FormHelperText>
        )}
      </FormControl>
    </Box>
  );
};

