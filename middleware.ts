import { withAuth } from "next-auth/middleware";

export default withAuth({
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
