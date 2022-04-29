# react-axios-error

catch axios errors and pass them to error handling components through hooks.

## Example of use case
You have react app that uses axios and want to render most axios errors to toasts inside one component without much boilerplate code

## Installing

Using npm:

```bash
$ npm install react-axios-error
```

Using yarn:

```bash
$ yarn add react-axios-error
```

## How to connect react-axios-error to axios

Connecting to axios
```js
import axios from 'axios';

connectResponseInterceptor(axios);

```
Connecting to custom config axios instance
```js
import axios from 'axios';
import { connectResponseInterceptor } from 'react-axios-error';

const api = axios.create({
  baseURL: 'www.example.url'
});

connectResponseInterceptor(api);
```

request return shape after connecting react-axios-error
```js
{
  success: Boolean // was request successful
  response: Object // original axios request response object
  error: Error // if request fails, error will be passed here
}
```

axios request after connecting
```js
const { success, response } = await api.get('/user/123');

if (success) {
  console.log(response.data.user);
}
```

## How to connect react-axios-error to React after connecting to axios
```js
import { useAxiosError } from 'react-axios-error';

const Component = () => {
  useAxiosError((error) => {
    // error is passed here when request fails
  });
};
```

## How to avoid calling useAxiosError callbacks on request error
You can disable useAxiosError calls on single request by adding "disableReactAxiosError: true" to axios request config parameter
```js
const { success, response, error } = await api.get('/user/this-user-doesnot-exist', { disableReactAxiosError: true });

if (success) {
  console.log(response.data.user);
} else {
  console.log(error.message); // Request failed with status code 404
}
```

## react-axios-error exports
```js
import { connectResponseInterceptor, useAxiosError } from 'react-axios-error';
```

## License

[MIT](LICENSE)
