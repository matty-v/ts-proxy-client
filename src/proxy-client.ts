import axios, { AxiosRequestConfig } from 'axios';
import { ProxyRequest } from './types';


export const proxyHttpRequest = async (googleIdToken: string, proxyBaseUrl: string, request: AxiosRequestConfig): Promise<any> => {

  if (!request.url) {
    throw new Error('Proxy Client Error: request.url is not set');
  }

  if (!request.method) {
    throw new Error('Proxy Client Error: request.method is not set');
  }

  const body = request.data;
  if (request.method.toLowerCase() === 'post' && !body) {
    throw new Error('Proxy Client Error: request.body is not set for the POST method');
  }

  const proxyRequestBody: ProxyRequest = {
    url: request.url,
    method: request.method,
    body: request.data,
    headers: request.headers
  }

  const requestConfig: AxiosRequestConfig = {
    url: `${proxyBaseUrl}/proxy`,
    headers: {
      "x-id-token": googleIdToken
    },
    method: 'post',
    data: proxyRequestBody
  }

  let responseData: any;
  try {
    const response = await axios(requestConfig);
    responseData = response.data;
  } catch (e) {
    throw e;
  }

  return responseData;
}
