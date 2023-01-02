/* eslint-disable no-console */
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  getDoc,
  setDoc,
  doc,
  query,
  where,
  getDocs,
  updateDoc,
  collection,
  CollectionReference,
  DocumentReference,
  addDoc,
} from "firebase/firestore";
import { Collections } from "./data";

export const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  appId: process.env.FIREBASE_APP_ID,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
};

const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app);

export const getDocRef = (documentId: string, collectionName: string) =>
  doc(firestore, collectionName, documentId);

export const getDocument = async <T>(documentId: string, collectionName: string) => {
  try {
    const docRef = getDocRef(documentId, collectionName) as DocumentReference<T>;
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data();
      return data;
    }
  } catch (err) {
    console.error("getDocument error: %s.", err);
  }

  return undefined;
};

export const getDocumentField = async <T>(
  documentId: string,
  collectionName: string,
  fieldName: string,
) => {
  try {
    const docRef = getDocRef(documentId, collectionName);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.get(fieldName) as T;
      return data;
    }
  } catch (err) {
    console.error("getDocumentField error: %s.", err);
  }

  return null;
};

export const updateDocument = async (
  documentId: string,
  collectionName: string,
  data: object,
) => {
  try {
    const docRef = getDocRef(documentId, collectionName);
    await updateDoc(docRef, data);
  } catch (err) {
    console.error("updateDocument error: %s.", err);
  }
};

export const storeDocument = async (
  documentId: string | undefined,
  collectionName: string,
  data: object,
) => {
  try {
    console.info(`Storing document %s in collection %s.`, documentId, collectionName);

    if (documentId) {
      const docRef = getDocRef(documentId, collectionName);
      await setDoc(docRef, data);
    } else {
      await addDoc(collection(firestore, collectionName), data);
    }
  } catch (err) {
    console.error("storeDocument error: %s with data: %s.", err, JSON.stringify(data));
  }
};

// Helper Methods
//* ***************************************** */
export const getAllApplicationsByStatus = async (status: number) => {
  const results: IApplication[] = [];

  try {
    const applications = collection(
      firestore,
      Collections.Applications,
    ) as CollectionReference<IApplication>;

    const q = query(applications, where("status", "==", status));
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((docSnap) => {
      const application = docSnap.data();
      results.push(application);
    });
  } catch (err) {
    console.error("retrieveAllApplications error: %s.", err);
  }

  return results;
};

export const getAllCommentsByPostId = async (postId: string) => {
  const results: IComment[] = [];

  try {
    const comments = collection(
      firestore,
      Collections.Comments,
    ) as CollectionReference<IComment>;

    const q = query(comments, where("postId", "==", postId));
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((docSnap) => {
      const comment = docSnap.data();
      results.push(comment);
    });

    results.sort((a, b) => (new Date(a.createdAt) > new Date(b.createdAt) ? 1 : -1));
  } catch (err) {
    console.error("getAllCommentsByPostId error: %s.", err);
  }

  return results;
};
