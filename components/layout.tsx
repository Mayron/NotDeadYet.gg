import Head from "next/head";
import Script from "next/script";
import Footer from "./footer";
import PageNavigation from "./page-navigation";

interface ILayoutProps {
  children: React.ReactNode | React.ReactNode[];
  title: string;
  username?: string;
}

const jsonLinkedData = {
  "@context": "http://www.schema.org",
  "@type": "Organization",
  name: "Not Dead Yet",
  url: "https://not-dead-yet.com",
  logo: `https://not-dead-yet.com/images/ndy-icon-125x125.png`,
  description: process.env.NEXT_PUBLIC_NDY_DESCRIPTION,
};

const Layout: React.FC<ILayoutProps> = ({ children, title, username }) => (
  <>
    <Head>
      <title>{title}</title>
      <meta name="description" content={process.env.NEXT_PUBLIC_NDY_DESCRIPTION} />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta
        name="keywords"
        content="World of Warcraft,Classic,Burning Crusade,Raiding,Guild,Gehennas,Europe,EU,Wrath,Lich King,Wotlk,Server,First,Recruitment,Not Dead Yet,NDY"
      />
      <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
      {/* <link rel="shortcut icon" href="/favicon32.png" type="" /> */}
      <link rel="preconnect" href="https://fonts.gstatic.com" />
      <link
        type="text/css"
        rel="stylesheet"
        href="https://www.gstatic.com/firebasejs/ui/6.0.1/firebase-ui-auth.css"
      />

      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Not Dead Yet" />
      <meta property="og:locale" content="en_US" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={process.env.NEXT_PUBLIC_NDY_DESCRIPTION} />
      <meta
        property="og:image"
        content="https://not-dead-yet.com/images/ndy-icon-125x125.png"
      />
      <meta property="og:url" content="https://not-dead-yet.com" />

      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLinkedData) }}
      />
    </Head>

    {username && <PageNavigation username={username} />}
    <main>{children}</main>
    <Script src="https://www.gstatic.com/firebasejs/ui/6.0.1/firebase-ui-auth.js" />
    <Footer />
  </>
);
export default Layout;
