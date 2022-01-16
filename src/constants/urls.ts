import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();

export const CALLBACK_URL: string = publicRuntimeConfig.CALLBACK_URL;
