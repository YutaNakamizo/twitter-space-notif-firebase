import React, {
  forwardRef,
  useState,
  useEffect,
} from 'react';
import {
  Box,
  Slide,
  Dialog,
  Toolbar,
  Button,
  DialogContent,
  LinearProgress,
} from '@mui/material';
import { DestForm } from '~/components/DestForm';

const Transition = forwardRef((props, ref) => (
  <Slide
    direction="up"
    ref={ref}
    {...props}
  />
));

export const DestFormPopup = ({
  onClose = () => {},
  onSaveClick = () => {},
  initialValue,
  ...props
}) => {
  const defaultFormValue = {
    changed: false,
    valid: false,
    values: initialValue,
  };
  const [ formValue, setFormValue ] = useState(defaultFormValue);
  useEffect(() => {
    console.log(formValue);
  }, [
    formValue,
  ]);

  const confirmClose = () => {
    const close = window.confirm('キャンセルすると入力した内容が失われます. 編集をキャンセルしますか？');
    if(!close) return;
    onClose(false);
  };

  const [ saving, setSaving ] = useState(false);
  const handleSaveClick = e => {
    setSaving(true);
    onSaveClick(formValue.values).catch(err => {
      setSaving(false);
    });
  };

  useEffect(() => {
    if(!props.open) {
      setFormValue(defaultFormValue);
      setSaving(false);
    }
  }, [
    props.open,
  ]);

  return (
    <Dialog
      scroll="paper"
      disableEscapeKeyDown
      {...props}
      TransitionComponent={Transition}
    >
      <Box
        position="relative"
      >
        <Toolbar
        >
          <Box
            flexGrow={1}
          />

          <Box
          >
            <Button
              disabled={saving}
              onClick={formValue.changed ? (
                e => confirmClose()
              ) : (
                e => onClose(false)
              )}
            >
              キャンセル
            </Button>
            <Button
              disabled={
                !formValue.changed
                || !formValue.valid
                || saving
              }
              onClick={handleSaveClick}
            >
              保存
            </Button>
          </Box>
        </Toolbar>
        
        {saving && (
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

      <DialogContent
        dividers
      >
        <DestForm
          disabled={saving}
          initialValue={initialValue}
          onChange={setFormValue}
        />
      </DialogContent>
    </Dialog>
  );
};

