import NextAuth from "next-auth";
import BattleNetProvider from "next-auth/providers/battlenet";
import { FirestoreAdapter } from "@next-auth/firebase-adapter";

export const authOptions = {
  providers: [
    BattleNetProvider({
      clientId: "f83941351b4b4c409b7612ed8168bcb1",
      clientSecret: "doy8w6UFbKaZmDz3odDZSp2BQq4ABIvz",
      issuer: "https://eu.battle.net/oauth",
    }),
  ],
  adapter: FirestoreAdapter({
    apiKey: "AIzaSyDMELWLdffeqe8TAs5G7ju0vcCLy8R0zw8",
    appId: "1:346264700309:web:a8e67d0a292616b7e8229c",
    authDomain: "notdeadyet-69213.firebaseapp.com",
    projectId: "notdeadyet-69213",
    storageBucket: "notdeadyet-69213.appspot.com",
    messagingSenderId: "346264700309",
  }),
};

export default NextAuth(authOptions);
