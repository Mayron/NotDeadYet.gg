import Head from "next/head";
import Footer from "./footer";
import PageNavigation from "./page-navigation";

interface ILayoutProps {
  children: React.ReactNode | React.ReactNode[];
  title: string;
  hidePageNavigation?: boolean;
}

const jsonLinkedData = {
  "@context": "http://www.schema.org",
  "@type": "Organization",
  name: "Not Dead Yet",
  url: process.env.NEXT_PUBLIC_WEBSITE_URL,
  logo: `${process.env.NEXT_PUBLIC_WEBSITE_URL || ""}/assets/ndy-icon-125x125.png`,
  description: process.env.NEXT_PUBLIC_NDY_DESCRIPTION,
};

const Layout: React.FC<ILayoutProps> = ({ children, title, hidePageNavigation }) => (
  <>
    <Head>
      <title>{title}</title>
      <meta name="description" content={process.env.NEXT_PUBLIC_NDY_DESCRIPTION} />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta
        name="keywords"
        content="World of Warcraft,Classic,Burning Crusade,Raiding,Guild,Gehennas,Europe,EU,Wrath,Lich King,Wotlk,Server,First,Recruitment,Not Dead Yet,NDY"
      />
      <link rel="shortcut icon" href="/assets/ndy-icon.png" type="image/png" />
      <link rel="preconnect" href="https://fonts.gstatic.com" />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Not Dead Yet" />
      <meta property="og:locale" content="en_US" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={process.env.NEXT_PUBLIC_NDY_DESCRIPTION} />
      <meta
        property="og:image"
        content={`${process.env.NEXT_PUBLIC_WEBSITE_URL || ""}/assets/ndy-125x125.png`}
      />
      <meta property="og:url" content={process.env.NEXT_PUBLIC_WEBSITE_URL} />
      <meta
        name="version"
        content={process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA || "local"}
      />

      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLinkedData) }}
      />
    </Head>

    {process.env.NODE_ENV !== "development" && !hidePageNavigation && <PageNavigation />}
    <main>{children}</main>
    <Footer />
  </>
);
export default Layout;
