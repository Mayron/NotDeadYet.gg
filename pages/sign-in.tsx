import type { CtxOrReq } from "next-auth/client/_utils";
import type { BuiltInProviderType } from "next-auth/providers";
import type { LiteralUnion, ClientSafeProvider } from "next-auth/react";

import { useSession, getCsrfToken, signIn, signOut, getProviders } from "next-auth/react";
import Layout from "../components/layout";

interface ISignInPageProps {
  providers: Record<LiteralUnion<BuiltInProviderType, string>, ClientSafeProvider> | null;
  csrfToken?: string;
}

const SignInPage: React.FC<ISignInPageProps> = ({ csrfToken, providers }) => {
  const { data: session } = useSession();

  if (session?.user) {
    return (
      <Layout title="Already Signed In | Not Dead Yet">
        Signed in as {session.user.email} <br />
        <button type="button" onClick={() => signOut()}>
          Sign out
        </button>
      </Layout>
    );
  }

  return (
    <Layout title="Sign In | Not Dead Yet">
      <form method="post" action="/api/auth/callback/credentials">
        <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
        <label htmlFor="username">
          Username
          <input name="username" id="username" type="text" />
        </label>
        <label htmlFor="password">
          Password
          <input name="password" id="password" type="password" />
        </label>
        <button type="submit">Sign in</button>
      </form>
      <hr />
      {providers && (
        <ul>
          {Object.values(providers).map((provider) => (
            <li key={provider.name}>
              <button type="button" onClick={() => signIn(provider.id)}>
                Sign in with {provider.name}
              </button>
            </li>
          ))}
        </ul>
      )}
    </Layout>
  );
};

export default SignInPage;

export async function getServerSideProps(context: CtxOrReq) {
  const providers = await getProviders();
  const csrfToken = await getCsrfToken(context);
  const props: ISignInPageProps = { providers, csrfToken };
  return { props };
}
