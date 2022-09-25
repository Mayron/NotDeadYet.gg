import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDoc, setDoc, doc } from "firebase/firestore/lite";

export const firebaseConfig = {
  apiKey: "AIzaSyDMELWLdffeqe8TAs5G7ju0vcCLy8R0zw8",
  appId: "1:346264700309:web:a8e67d0a292616b7e8229c",
  authDomain: "notdeadyet-69213.firebaseapp.com",
  projectId: "notdeadyet-69213",
  storageBucket: "notdeadyet-69213.appspot.com",
  messagingSenderId: "346264700309",
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
