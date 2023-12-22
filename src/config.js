import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyAVwMcs2B_iQrB5DvhQ0m8Pq7HeVCOaad4",
  authDomain: "gallery-images-2023.firebaseapp.com",
  projectId: "gallery-images-2023",
  storageBucket: "gallery-images-2023.appspot.com",
  messagingSenderId: "313657889586",
  appId: "1:313657889586:web:e7c9b7a90001a9e03d7d2b"
};

const appFirebase = initializeApp(firebaseConfig);

export default appFirebase;