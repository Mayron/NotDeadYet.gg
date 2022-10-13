import { withAuth } from "next-auth/middleware";

export default withAuth({
  secret: "E7mzcqtSzysJKnEu",
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
