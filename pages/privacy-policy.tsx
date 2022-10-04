import { css } from "@emotion/react";
import GoBackButton from "../components/go-back-button";
import Layout from "../components/layout";

const PrivacyPolicy: React.FC = () => {
  const websiteUrl = process.env.NEXT_PUBLIC_WEBSITE_URL;

  return (
    <Layout title="Privacy Policy | Not Dead Yet">
      <section
        css={css`
          h2,
          h3,
          h4,
          h5 {
            text-align: left;
          }

          h4 {
            margin-bottom: 5px;
          }

          article {
            padding-bottom: 50px;
          }

          & > a:first-of-type {
            position: relative;
            top: -20px;
          }
        `}
      >
        <GoBackButton to="/" text="Go Back to Home Page" />

        <article>
          <header>
            <h1
              css={css`
                font-size: 3rem;
              `}
            >
              Privacy Policy
            </h1>
          </header>
          <p>
            Your privacy is important to us It is Not Dead Yet&apos;s policy to respect
            your privacy regarding any information we may collect while operating our
            website. This Privacy Policy applies to {websiteUrl} (hereinafter,
            &quot;us&quot;, &quot;we&quot;, or &quot;{websiteUrl}&quot;). We respect your
            privacy and are committed to protecting personally identifiable information
            you may provide us through the Website. We have adopted this privacy policy
            (&quot;Privacy Policy&quot;) to explain what information may be collected on
            our Website, how we use this information, and under what circumstances we may
            disclose the information to third parties. This Privacy Policy applies only to
            information we collect through the Website and does not apply to our
            collection of information from other sources.
          </p>

          <p>
            This Privacy Policy, together with the Terms of service posted on our Website,
            set forth the general rules and policies governing your use of our Website.
            Depending on your activities when visiting our Website, you may be required to
            agree to additional terms of service.
          </p>

          <h4>Website Visitors</h4>
          <p>
            Not Dead Yet does not collect tracking information from website visitors using
            tools (e.g., google analytics). No personal identifiable information is
            collected without the users consent.
          </p>
          <p>
            If you create an account, you must provide us with some information so that we
            can provide our services to you. You will be able to choose which sign in
            method you prefer and will be asked to provide the minimal information
            required to authenticate successfully. This includes either a custom display
            name and password, or the email address of the chosen identity provider (e.g.,
            Google, Facebook, Twitter or Twitch).
          </p>

          <h4>Security</h4>
          <p>
            The security of your Personal Information is important to us, but remember
            that no method of transmission over the Internet, or method of electronic
            storage is 100% secure. While we strive to use commercially acceptable means
            to protect your Personal Information, we cannot guarantee its absolute
            security.
          </p>

          <h4>Cookies</h4>
          <p>
            To enrich and perfect your online experience, Not Dead Yet uses
            &quot;Cookies&quot;, similar technologies and services provided by others to
            display personalized content and maintain your logged in session.
          </p>
        </article>

        <GoBackButton to="/" text="Go Back to Home Page" />
      </section>
    </Layout>
  );
};

export default PrivacyPolicy;
