import { withAuth } from "next-auth/middleware";

export default withAuth({
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    authorized: ({ token }) => {
      if (token?.admin) {
        return true;
      }
      return false;
    },
  },
});

export const config = { matcher: ["/admin/:path*"] };
