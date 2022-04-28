import { useEffect } from 'react';

const cbSet = new Set();

const onSuccess = (response) => {
  return Promise.resolve({
    success: true,
    response,
  });
};

const onError = (error) => {
  if (!error.response.config.disableReactAxiosError) {
    for (let cb of cbSet) {
      cb(error);
    }
  }

  return Promise.resolve({
    success: false,
    error,
  });
};

export const connectResponseInterceptor = (api) => {
  api.interceptors.response.use(onSuccess, onError);
  return api;
};

export const useAxiosError = (cb) => {
  useEffect(() => {
    cbSet.add(cb);

    return () => {
      cbSet.delete(cb);
    };
  }, [cb]);
};

const ReactAxiosError = {
  connectResponseInterceptor,
  useAxiosError
};

export default ReactAxiosError;