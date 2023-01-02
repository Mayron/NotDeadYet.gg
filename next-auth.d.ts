import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      /** The user's postal address. */
      admin?: boolean;
      userId: string; // user document ID
      username?: string; // our custom username (user.name is the battle.net username)
      member?: boolean; // if true, they're in the guild
      loot?: boolean; // if true, they can see the loot standings on the dashboard
    } & DefaultSession["user"];
  }
}
