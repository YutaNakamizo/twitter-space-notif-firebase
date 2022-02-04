import React, {
  useState,
  useEffect,
} from 'react';
import {
  TextField,
} from '@mui/material';
import validator from 'validator';

export const DestFormOptionsDiscordWebhook = ({
  onChange = () => {},
  disabled = false,
  initialValue = {
    url: '',
  },
  ...props
}) => {
  const [ url, setUrl ] = useState(initialValue.url);

  const [ urlError, setUrlError ] = useState(null);
  const validate = ({
    url,
  }) => {
    const result = {
      changed: false,
      valid: false,
    };

    if(
      url !== initialValue.url
    ) {
      result.changed = true;
    }

    if(
      validator.isURL(url, {
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
      })
      && url.startsWith('https://discord.com/api/webhooks/')
    ) {
      result.valid = true;
      setUrlError(null);
    }
    else {
      setUrlError('Webhook URL の形式が正しくありません.');
    }

    return result;
  };

  useEffect(() => {
    const {
      changed,
      valid,
    } = validate({
      url,
    });

    onChange({
      changed,
      valid,
      values: {
        url,
      },
    });
  }, [
    url,
  ]);

  const [ urlTouched, setUrlTouched ] = useState(false);

  return (
    <>
      <TextField
        label="Webhook URL"
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
    </>
  );
};

