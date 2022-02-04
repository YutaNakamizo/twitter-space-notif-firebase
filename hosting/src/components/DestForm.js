import React, {
  useState,
  useEffect,
} from 'react';
import {
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
} from '@mui/material';
import { DestFormOptionsDiscordWebhook } from '~/components/DestFormOptionsDiscordWebhook';
import { DestFormOptionsJSON } from '~/components/DestFormOptionsJSON';

const destOptions = require('~/destOptions');

export const DestForm = ({
  onChange = () => {},
  disabled = false,
  initialValue = {
    label: '',
    destIndex: 0,
    destDetails: undefined,
  },
  ...props
}) => {
  const [ label, setLabel ] = useState(initialValue.label);
  const [ destIndex, setDestIndex ] = useState(initialValue.destIndex);
  const [ destDetails, setDestDetails ] = useState({
    changed: false,
    valid: false,
    values: initialValue.destDetails,
  });
  
  const [ labelError, setLabelError ] = useState(null);
  const validate = ({
    label,
    destIndex,
    destDetails,
  }) => {
    const result = {
      changed: false,
      valid: false,
    };

    if(
      label !== initialValue.label
      || destIndex !== initialValue.destIndex
      || destDetails?.changed
    ) {
      result.changed = true;
    }

    const labelIsValid = label.trim() !== '';
    const destIndexIsValid = -1 < destIndex && destIndex < destOptions.length;
    const destDetailsIsValid = destDetails?.valid;

    if(labelIsValid) {
      setLabelError(null);
    }
    else {
      setLabelError('ラベルは必須です.');
    }

    if(
      labelIsValid
      && destIndexIsValid
      && destDetailsIsValid
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
      label,
      destIndex,
      destDetails,
    });

    onChange({
      changed,
      valid,
      values: {
        label,
        dest: destOptions[destIndex].value,
        destDetails: destDetails.values,
      }
    });
  }, [
    label,
    destIndex,
    destDetails,
  ]);

  const [ labelTouched, setLabelTouched ] = useState(false);

  return (
    <>
      <Box
        mb={4}
      >
        <TextField
          label="ラベル"
          disabled={
            Boolean(disabled)
          }
          defaultValue={initialValue.label}
          error={labelTouched && Boolean(labelError)}
          helperText={labelTouched ? labelError : undefined}
          variant="standard"
          placeholder={`例) ${destOptions[destIndex].sampleText}`}
          fullWidth
          autoFocus
          onChange={e => {
            setLabel(e.target.value);
          }}
          onBlur={e => {
            setLabelTouched(true);
          }}
        />
      </Box>
      
      <Box
        mb={4}
      >
        <Box
          mb={.5}
        >
          <FormControl
            disabled={
              Boolean(disabled)
            }
            variant="standard"
          >
            <InputLabel
            >
              通知先
            </InputLabel>
              
            <Select
              variant="standard"
              value={destOptions[destIndex].value}
              defaultValue={destOptions[initialValue.destIndex].value}
              onChange={e => {
                setDestIndex(destOptions.findIndex(option => option.value === e.target.value));
              }}
            >
              {destOptions.map(({
                value,
                label,
              }, index) => (
                <MenuItem
                  key={index}
                  value={value}
                >
                  {label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        <Box
        >
          {(() => {
            switch(destOptions[destIndex].value) {
              case 'discord-webhook': {
                return (
                  <>
                    <DestFormOptionsDiscordWebhook
                      disabled={
                        Boolean(disabled)
                      }
                      initialValue={initialValue.destDetails}
                      onChange={setDestDetails}
                    />
                  </>
                );
              }
              case 'json': {
                return (
                  <>
                    <DestFormOptionsJSON
                      disabled={
                        Boolean(disabled)
                      }
                      initialValue={initialValue.destDetails}
                      onChange={setDestDetails}
                    />
                  </>
                );
              }
              default: {
              }
            }
          })()}
        </Box>
      </Box>
    </>
  );
};

