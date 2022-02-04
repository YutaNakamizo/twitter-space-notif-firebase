import React, {
  useState,
  useEffect,
} from 'react';
import {
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
} from '@mui/material';
import validator from 'validator';

const methodOptions = [
  'POST',
  'GET',
];

export const DestFormOptionsJSON = ({
  onChange = () => {},
  disabled = false,
  initialValue = {
    method: methodOptions[0],
    url: '',
  },
  ...props
}) => {
  const [ method, setMethod ] = useState(initialValue.method);
  const [ url, setUrl ] = useState(initialValue.url);

  const [ urlError, setUrlError ] = useState(null);
  const validate = ({
    method,
    url,
  }) => {
    const result = {
      changed: false,
      valid: false,
    };

    if(
      method !== initialValue.method
      || url !== initialValue.url
    ) {
      console.log(!!initialValue.method, method !== initialValue.method, !!initialValue.url, url !== initialValue.url);
      result.changed = true;
    }
    
    const methodIsValid = methodOptions.includes(method);
    const urlIsValid = validator.isURL(url, {
      require_protocol: true,
      require_valid_protocol: true,
      protocols: [
        'http',
        'https',
      ],
      require_host: true,
      require_port: false,
      allow_protocol_relative_urls: false,
      allow_fragments: true,
      allow_query_components: true,
      validate_length: true,
    });

    if(urlIsValid) {
      setUrlError(null);
    }
    else {
      setUrlError('URL の形式が正しくありません.');
    }

    if(
      methodIsValid
      && urlIsValid
    ) {
      result.valid = true;
    }

    return result;
  };

  useEffect(() => {
    const {
      changed,
      valid,
    } = validate({
      method,
      url,
    });

    onChange({
      changed,
      valid,
      values: {
        method,
        url,
      },
    });
  }, [
    method,
    url,
  ]);

  const [ urlTouched, setUrlTouched ] = useState(false);

  return (
    <>
      <Box
        display="flex"
      >
        <Box
          mr={.5}
        >
          <FormControl
            disabled={
              Boolean(disabled)
            }
            variant="standard"
          >
            <InputLabel
            >
              Method
            </InputLabel>
            <Select
              value={method}
              defaultValue={initialValue.method}
              onChange={e => {
                setMethod(e.target.value);
              }}
            >
              {methodOptions.map(methodName => (
                <MenuItem
                  value={methodName}
                  key={methodName}
                >
                  {methodName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        <TextField
          label="送信先 URL"
          disabled={
            Boolean(disabled)
          }
          defaultValue={initialValue.url}
          error={urlTouched && Boolean(urlError)}
          helperText={urlTouched ? urlError : undefined}
          variant="standard"
          fullWidth
          onChange={e => {
            setUrl(e.target.value);
          }}
          onBlur={e => {
            setUrlTouched(true);
          }}
        />
      </Box>
    </>
  );
};

