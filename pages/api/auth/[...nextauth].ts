import NextAuth, { type NextAuthOptions } from "next-auth";
import BattleNetProvider from "next-auth/providers/battlenet";
import { FirestoreAdapter } from "@next-auth/firebase-adapter";
import { firebaseConfig } from "../../../firebase";

export const authOptions: NextAuthOptions = {
  providers: [
    BattleNetProvider({
      clientId: process.env.BATTLE_NET_CLIENT_ID || "",
      clientSecret: process.env.BATTLE_NET_CLIENT_SECRET || "",
      issuer: "https://eu.battle.net/oauth",
    }),
  ],
  adapter: FirestoreAdapter(firebaseConfig),
  session: { strategy: "jwt" },
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
  },
  callbacks: {
    jwt: ({ token, user }) => {
      if (user) {
        token.admin = user.admin;
      }

      return token;
    },
    session: ({ session, token }) => {
      if (session?.user && token) {
        session.user.admin = token.admin as boolean;
        session.user.userId = token.sub as string;
      }

      return session;
    },
  },
};

export default NextAuth(authOptions);
