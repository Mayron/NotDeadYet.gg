import NextAuth from "next-auth";
import BattleNetProvider from "next-auth/providers/battlenet";
import { FirestoreAdapter } from "@next-auth/firebase-adapter";
import { firebaseConfig } from "../../../firebase";

export const authOptions = {
  providers: [
    BattleNetProvider({
      clientId: process.env.BATTLE_NET_CLIENT_ID || "",
      clientSecret: process.env.BATTLE_NET_CLIENT_SECRET || "",
      issuer: "https://eu.battle.net/oauth",
    }),
  ],
  adapter: FirestoreAdapter(firebaseConfig),
};

export default NextAuth(authOptions);
