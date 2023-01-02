import NextAuth, { User, type NextAuthOptions } from "next-auth";
import BattleNetProvider from "next-auth/providers/battlenet";
import { FirestoreAdapter } from "@next-auth/firebase-adapter";
import { firebaseConfig, getDocument } from "../../../firebase";
import { Collections } from "../../../data";

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
  callbacks: {
    jwt: async ({ token, user }) => {
      if (!user && token.sub) {
        user = await getDocument<User>(token.sub, Collections.Users);
      }

      if (user) {
        token.admin = user.admin;
        token.username = user.username;
        token.member = user.member;
      }

      return token;
    },
    session: ({ session, token }) => {
      if (session?.user && token) {
        session.user.admin = token.admin as boolean;
        session.user.userId = token.sub as string;
        session.user.username = token.username as string;
        session.user.member = token.member as boolean;
      }

      return session;
    },
  },
};

export default NextAuth(authOptions);
