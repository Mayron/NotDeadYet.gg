import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDoc,
  setDoc,
  doc,
  query,
  where,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { Status } from "./data";

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
const applications = collection(firestore, "applications");

export const storeApplication = async (userId: string, application: IApplication) => {
  try {
    application.userId = userId;
    application.createdAt = new Date().toISOString();
    application.status = application.inGuild
      ? Status.UnconfirmedMember
      : Status.NewApplicant;
    await setDoc(doc(applications, userId), application);
  } catch (err) {
    console.error("storeApplication error: %s.", err);
  }
};

export const retrieveApplication = async (userId: string) => {
  try {
    const docRef = doc(applications, userId);
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

export const retrieveApplicantsByStatus = async (status: string) => {
  const results: IApplication[] = [];

  try {
    const q = query(applications, where("status", "==", status));
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((docSnap) => {
      const application = docSnap.data() as IApplication;
      results.push(application);
    });
  } catch (err) {
    console.error("retrieveAllApplications error: %s.", err);
  }

  return results;
};

export const updateApplicationStatus = async (userId: string, status: string) => {
  try {
    const docRef = doc(applications, userId);
    await updateDoc(docRef, { status });
  } catch (err) {
    console.error("updateApplicationStatus error: %s.", err);
  }

  return undefined;
};
