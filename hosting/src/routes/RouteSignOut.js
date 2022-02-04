import React, {
  useEffect,
} from 'react';
import {
  signOut,
} from '~/apis/auth';

export const RouteSignOut = () => {
  useEffect(() => {
    signOut();
  }, []);

  return (
    <>
    </>
  );
};

