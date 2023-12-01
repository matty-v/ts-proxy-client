import { Button } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useGoogleOneTapLogin } from '@react-oauth/google';
import { useState } from 'react';
import { fetchPagesInDatabaseRequest } from 'ts-notion-client';
import { NotionPageObject } from 'ts-notion-client/dist/types';
import { proxyHttpRequest } from '../../../src';

const proxyBaseUrl = process.env.PROXY_SERVER_URL ?? '';
const notionApiKey = process.env.NOTION_API_KEY ?? '';
const testNotionDbId = process.env.TEST_NOTION_DB_ID ?? '';

export function Main() {

  const [googleIdToken, setGoogleIdToken] = useState('');

  useGoogleOneTapLogin({
    onSuccess: credentialResponse => {
      if (credentialResponse.credential) {
        setGoogleIdToken(credentialResponse.credential);
      }
    },
    onError: () => {
      console.log('Login Failed');
    }
  });

  const callProxyClient = async () => {

    const fetchDbPagesRequest = fetchPagesInDatabaseRequest(notionApiKey, testNotionDbId);
    const pages: NotionPageObject[] = await proxyHttpRequest(googleIdToken, proxyBaseUrl, fetchDbPagesRequest);

    console.log(JSON.stringify(pages, null, 2));
  };

  return (
    <Box>
      <Typography variant="h1">Hello World!</Typography>
      <Button onClick={callProxyClient}>Call Proxy Client</Button>
    </Box>
  );
}
