// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth }        from "firebase/auth";
import { getFirestore }   from "firebase/firestore";
import { getAnalytics }   from "firebase/analytics";

import {
  API_KEY,
  AUTH_DOMAIN,
  PROJECT_ID,
  STORAGE_BUCKET,
  MESSAGING_SENDERID,
  APP_ID,
  MEASUREMENT_ID,
} from "./constants";

// -------------------------------------------------------------------------
// 一定要把以下所有欄位對應到 .env 裡的值，才能正確連到你的 Firebase 專案
const firebaseConfig = {
  apiKey:            API_KEY,
  authDomain:        AUTH_DOMAIN,
  projectId:         PROJECT_ID,
  storageBucket:     STORAGE_BUCKET,
  messagingSenderId: MESSAGING_SENDERID,
  appId:             APP_ID,
  measurementId:     MEASUREMENT_ID, 
};

// 初始化 Firebase App，只呼叫一次
const app = initializeApp(firebaseConfig);

// 如果你需要在其他檔案使用 Auth，就匯出這個
export const auth = getAuth(app);

// 如果你需要使用 Firestore，就匯出這個
export const db = getFirestore(app);

// 如果你需要使用 Analytics，就在瀏覽器端呼叫 getAnalytics
let analytics = null;
if (typeof window !== "undefined") {
  analytics = getAnalytics(app);
}
export { analytics };

// 如果你不需要 Firestore 或 Analytics，可以把對應的 import 和 export 刪掉
