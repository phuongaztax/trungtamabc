import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore/lite";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

if (!firebaseConfig.projectId) {
  throw new Error(
    "Thiếu cấu hình Firebase. Sao chép .env.example thành .env.local và điền giá trị.",
  );
}

export const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

// Firestore Lite: chỉ dùng REST, không giữ kết nối realtime → nhẹ, chạy tốt
// cả trên server (Server Components) lẫn trình duyệt.
export const db = getFirestore(app);
