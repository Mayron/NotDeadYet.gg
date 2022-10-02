import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDoc,
  setDoc,
  doc,
  getDocs,
} from "firebase/firestore";

export const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
};

const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);

export const storeApplication = async (userId: string, application: IApplication) => {
  try {
    const applicationsCollection = collection(firestore, "applications");
    application.userId = userId;
    await setDoc(doc(applicationsCollection, userId), application);
  } catch (err) {
    console.error("storeApplication error: %s.", err);
  }
};

export const retrieveApplication = async (userId: string) => {
  try {
    const applicationsCollection = collection(firestore, "applications");
    const docRef = doc(applicationsCollection, userId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const application = docSnap.data() as IApplication;
      return application;
    }
  } catch (err) {
    console.error("retrieveApplication error: %s.", err);
  }

  return undefined;
};

export const retrieveAllApplications = async () => {
  const applications: IApplication[] = [];

  try {
    const applicationsCollection = collection(firestore, "applications");
    const query = await getDocs(applicationsCollection);

    query.forEach((docSnap) => {
      const application = docSnap.data() as IApplication;
      applications.push(application);
    });
  } catch (err) {
    console.error("retrieveAllApplications error: %s.", err);
  }

  return applications;
};
