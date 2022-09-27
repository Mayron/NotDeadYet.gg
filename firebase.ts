import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDoc, setDoc, doc } from "firebase/firestore/lite";

export const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  appId: process.env.FIREBASE_APP_ID,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
};

const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);

export const storeApplication = async (userId: string, application: IApplication) => {
  const applicationsCollection = collection(firestore, "applications");
  await setDoc(doc(applicationsCollection, userId), application);
};

export const retrieveApplication = async (userId: string) => {
  const applicationsCollection = collection(firestore, "applications");
  const docRef = doc(applicationsCollection, userId);

  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    const application = docSnap.data() as IApplication;
    return application;
  }
  return undefined;
};
