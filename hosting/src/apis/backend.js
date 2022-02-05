import {
  getIdToken,
} from '~/apis/auth';
const axios = require('axios');
const path = require('path');

export const getRequestInstance = () => {
  return getIdToken().then(idToken => {
    return axios.create({
      baseURL: process.env.NODE_ENV === 'development' ? window.location.origin : process.env.REACT_APP_BACKEND_URL,
      headers: {
        Authorization: `Bearer ${idToken}`,
      },
    });
  });
};

export const _debugRequestWithToken = ({
  message,
}) => {
  return getIdToken().then(idToken => {
    return getRequestInstance().then(request => {
      return request({
        method: 'post',
        url: '/api/debug-with-token',
        data: {
          message,
        },
      }).then(resp => {
        return resp.data;
      }).catch(err => {
        console.error(err);
        return {};
      });
    });
  });
};

// Target users
export const listAcceptableTargetUsernames = () => {
  return getRequestInstance().then(request => {
    return request({
      method: 'get',
      url: '/api/acceptableTargetUsernames',
    }).then(resp => {
      return resp.data;
    });
  });
};

// Endpoint
export const registerEndpoint = ({
  label,
  dest,
  destDetails,
  targetUsernames,
}) => {
  return getRequestInstance().then(request => {
    console.log(label, dest, JSON.stringify(destDetails))
    return request({
      method: 'post',
      url: '/api/endpoints',
      data: {
        usernames: targetUsernames,
        label,
        dest,
        destDetails,
      },
    }).then(resp => {
      return resp.data;
    });
  });
};

export const listEndpoints = () => {
  return getRequestInstance().then(request => {
    return request({
      method: 'get',
      'url': '/api/endpoints',
    }).then(resp => {
      return resp.data;
    });
  });
};

export const updateEndpoint = (id, {
  label,
  dest,
  destDetails,
  targetUsernames,
}) => {
  return getRequestInstance().then(request => {
    console.log(id, label, dest, JSON.stringify(destDetails));
    return request({
      method: 'put',
      url: `/api/endpoints/${id}`,
      data: {
        usernames: targetUsernames,
        label,
        dest,
        destDetails,
      },
    }).then(resp => {
      return resp.data;
    });
  });
};

export const removeEndpoint = id => {
  return getRequestInstance().then(request => {
    console.log(id);
    return request({
      method: 'delete',
      url: `/api/endpoints/${id}`,
    }).then(resp => {
      return resp.data;
    });
  });
};

