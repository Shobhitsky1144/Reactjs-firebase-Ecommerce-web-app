import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB5fnNd86Ll3yMZDnoxJOcyy1arF6f2YQc",
  authDomain: "skycommerce-be88c.firebaseapp.com",
  projectId: "skycommerce-be88c",
  storageBucket: "skycommerce-be88c.appspot.com",
  messagingSenderId: "418950956642",
  appId: "1:418950956642:web:f6b3d4a9c01a9ecf30b33b",
  measurementId: "G-T978695D5L",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const fireDB = getFirestore(app);

export default fireDB;
