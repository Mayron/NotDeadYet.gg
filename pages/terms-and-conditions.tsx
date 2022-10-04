import { css } from "@emotion/react";
import GoBackButton from "../components/go-back-button";
import Layout from "../components/layout";
import Route from "../components/route";

const TermsAndConditionsPage: React.FC = () => (
  <Layout title="Terms and Conditions | Not Dead Yet">
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
            Terms and Conditions
          </h1>
        </header>
        <p>Welcome to Not Dead Yet!</p>

        <p>
          These terms and conditions outline the rules and regulations for the use of Not
          Dead Yet&apos;s Website, located at{" "}
          <a className="text" href={process.env.NEXT_PUBLIC_WEBSITE_URL}>
            {process.env.NEXT_PUBLIC_WEBSITE_URL}
          </a>
          .
        </p>

        <p>
          By accessing this website we assume you accept these terms and conditions. Do
          not continue to use Not Dead Yet if you do not agree to take all of the terms
          and conditions stated on this page.
        </p>

        <p>
          The following terminology applies to these Terms and Conditions and our Priacy
          Policy: &quot;You&quot; and &quot;Your&quot; refers to you and the person who
          has signed into this website and compliant to the website&quot;s terms and
          conditions. &quot;Organization&quot;, &quot;Ourselves&quot;, &quot;We&quot;,
          &quot;Our&quot; and &quot;Us&quot;, refers to our gaming esports
          organization/group (the members of our World of Warcraft guild). Any use of the
          above terminology or other words in the singular, plural, capitalization and/or
          he/she or they, are taken as interchangeable and therefore as referring to same.
        </p>

        <h3>Cookies</h3>

        <p>
          We employ the use of cookies. By accessing Not Dead Yet, you agreed to use
          cookies in agreement with the Not Dead Yet&apos;s Privacy Policy.
        </p>

        <p>
          Most interactive websites use cookies to let us retrieve the user&apos;s details
          for each visit to maintain logged in sessions. Cookies are used by our website
          to enable the functionality of certain areas to make it easier for people
          visiting our website.
        </p>

        <h3>License</h3>

        <p>
          Unless otherwise stated, Not Dead Yet and/or its licensors own the intellectual
          property rights for all material on Not Dead Yet. All intellectual property
          rights are reserved. You may access this from Not Dead Yet for your own personal
          use subjected to restrictions set in these terms and conditions.
        </p>

        <p>You must not:</p>
        <ul>
          <li>Republish material from Not Dead Yet</li>
          <li>Sell, rent or sub-license material from Not Dead Yet</li>
          <li>Reproduce, duplicate or copy material from Not Dead Yet</li>
          <li>Redistribute content from Not Dead Yet</li>
        </ul>

        <p>This Agreement shall begin on the date hereof.</p>

        <p>
          Parts of this website offer an opportunity for users to submit and comment on
          applications for applying to our Organization. Not Dead Yet does not filter,
          edit, publish or review these applications and Comments prior to their presence
          on the website. None of the submitted Applications, nor their Comments, reflect
          the views and opinions of Not Dead Yet. Applications and Comments reflect the
          views and opinions of the person who post their views and opinions. To the
          extent permitted by applicable laws, Not Dead Yet shall not be liable for the
          Comments or for any liability, damages or expenses caused and/or suffered as a
          result of any use of and/or posting of and/or appearance of the Comments on this
          website.
        </p>

        <p>
          Not Dead Yet reserves the right to monitor all Applications and Comments and to
          remove any Application and Comment which can be considered inappropriate,
          offensive or causes breach of these Terms and Conditions.
        </p>

        <p>You warrant and represent that:</p>

        <ul>
          <li>
            You are entitled to post any Application or Comment on our website and have
            all necessary licenses and consents to do so;
          </li>
          <li>
            The Application/Comment does not invade any intellectual property right,
            including without limitation copyright, patent or trademark of any third
            party;
          </li>
          <li>
            The Application/Comment does not contain any defamatory, libelous, offensive,
            indecent or otherwise unlawful material which is an invasion of privacy
          </li>
          <li>
            The Application/Comment will not be used to solicit or promote business or
            custom or present commercial activities or unlawful activity.
          </li>
        </ul>

        <p>
          You hereby grant Not Dead Yet a non-exclusive license to use, reproduce, edit
          and authorize others to use, reproduce and edit any of your Applications or
          Comments in any and all forms, formats or media.
        </p>

        <h3>Your Privacy</h3>

        <p>
          Please read our{" "}
          <Route className="text" to="/privacy-policy" text="Privacy Policy" />.
        </p>

        <h3>Reservation of Rights</h3>

        <p>
          We reserve the right to request that you remove all links or any particular link
          to our Website. You approve to immediately remove all links to our Website upon
          request. We also reserve the right to amen these terms and conditions and it’s
          linking policy at any time. By continuously linking to our Website, you agree to
          be bound to and follow these linking terms and conditions.
        </p>

        <h3>Removal of links from our website</h3>

        <p>
          If you find any link on our Website that is offensive for any reason, you are
          free to contact and inform us any moment. We will consider requests to remove
          links but we are not obligated to or so or to respond to you directly.
        </p>

        <p>
          We do not ensure that the information on this website is correct, we do not
          warrant its completeness or accuracy; nor do we promise to ensure that the
          website remains available or that the material on the website is kept up to
          date.
        </p>

        <h3>Disclaimer</h3>

        <p>
          To the maximum extent permitted by applicable law, we exclude all
          representations, warranties and conditions relating to our website and the use
          of this website. Nothing in this disclaimer will:
        </p>

        <ul>
          <li>limit or exclude our or your liability for death or personal injury;</li>
          <li>
            limit or exclude our or your liability for fraud or fraudulent
            misrepresentation;
          </li>
          <li>
            limit any of our or your liabilities in any way that is not permitted under
            applicable law; or
          </li>
          <li>
            exclude any of our or your liabilities that may not be excluded under
            applicable law.
          </li>
        </ul>

        <p>
          The limitations and prohibitions of liability set in this Section and elsewhere
          in this disclaimer: (a) are subject to the preceding paragraph; and (b) govern
          all liabilities arising under the disclaimer, including liabilities arising in
          contract, in tort and for breach of statutory duty.
        </p>

        <p>
          As long as the website and the information and services on the website are
          provided free of charge, we will not be liable for any loss or damage of any
          nature.
        </p>
        <h3>How to Contact Us</h3>
        <p>
          If you need to contact us for any reason relating to the above terms and
          conditions, please contact our website moderator by sending an email to
          mayron.wow@gmail.com.
        </p>
      </article>

      <GoBackButton to="/" text="Go Back to Home Page" />
    </section>
  </Layout>
);

export default TermsAndConditionsPage;
