import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import BattleNetProvider from "next-auth/providers/battlenet";
import DiscordProvider from "next-auth/providers/discord";
import TwitchProvider from "next-auth/providers/twitch";
import CredentialsProvider from "next-auth/providers/credentials";
import { FirestoreAdapter } from "@next-auth/firebase-adapter";

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "e.g. Mayron" },
        password: { label: "Password", type: "password" },
      },
      authorize(credentials) {
        // You need to provide your own logic here that takes the credentials
        // submitted and returns either a object representing a user or value
        // that is false/null if the credentials are invalid.
        // e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
        // You can also use the `req` object to obtain additional parameters
        // (i.e., the request IP address)
        // const res = await fetch("/your/endpoint", {
        //   method: "POST",
        //   body: JSON.stringify(credentials),
        //   headers: { "Content-Type": "application/json" },
        // });

        // const user = await res.json();

        // // If no error and we have user data, return it
        // if (res.ok && user) {
        //   return user;
        // }
        // Return null if user data could not be retrieved
        return null;
      },
    }),
    GoogleProvider({
      clientId:
        "346264700309-tl797800n1hggbjsr476bno3c8mabmjv.apps.googleusercontent.com",
      clientSecret: "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",
    }),
    BattleNetProvider({
      clientId: "f83941351b4b4c409b7612ed8168bcb1",
      clientSecret: "doy8w6UFbKaZmDz3odDZSp2BQq4ABIvz",
      issuer: "https://eu.battle.net/oauth",
    }),
    // DiscordProvider({
    //   clientId: "process.env.GITHUB_ID",
    //   clientSecret: "process.env.GITHUB_SECRET",
    // }),
    // TwitchProvider({
    //   clientId: "process.env.GITHUB_ID",
    //   clientSecret: "process.env.GITHUB_SECRET",
    // }),
  ],

  adapter: FirestoreAdapter({
    apiKey: "AIzaSyDMELWLdffeqe8TAs5G7ju0vcCLy8R0zw8",
    appId: "1:346264700309:web:a8e67d0a292616b7e8229c",
    authDomain: "notdeadyet-69213.firebaseapp.com",
    projectId: "notdeadyet-69213",
    storageBucket: "notdeadyet-69213.appspot.com",
    messagingSenderId: "346264700309",
  }),
  pages: {
    signIn: "/sign-in",
    // signOut: "/auth/signout",
    // error: "/auth/error", // Error code passed in query string as ?error=
    // verifyRequest: "/auth/verify-request", // (used for check email message)
    // newUser: "/auth/new-user", // New users will be directed here on first sign in (leave the property out if not of interest)
  },
};

export default NextAuth(authOptions);
