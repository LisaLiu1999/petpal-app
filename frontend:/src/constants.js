// constants.js
// 把 import.meta.env 讀到的變數統一匯出，其他檔案要用就直接從這裡 import

export const API_KEY            = import.meta.env.VITE_apiKey;
export const AUTH_DOMAIN        = import.meta.env.VITE_authDomain;
export const PROJECT_ID         = import.meta.env.VITE_projectId;
export const STORAGE_BUCKET     = import.meta.env.VITE_storageBucket;
export const MESSAGING_SENDERID = import.meta.env.VITE_messagingSenderId;
export const APP_ID             = import.meta.env.VITE_appId;
export const MEASUREMENT_ID     = import.meta.env.VITE_measurementId;

