import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();

export const CALLBACK_URL: string = publicRuntimeConfig.CALLBACK_URL;
export const SPLITBEE_TOKEN: string = publicRuntimeConfig.SPLITBEE_TOKEN;
