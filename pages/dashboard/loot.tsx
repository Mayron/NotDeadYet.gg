import { css } from "@emotion/react";
import { CircularProgress, Tab, Tabs } from "@mui/material";
import { marked } from "marked";
import { unstable_getServerSession } from "next-auth";
import { GetServerSidePropsContext } from "next/types";
import { useEffect, useRef, useState } from "react";
import {
  DashboardMainSection,
  DashboardContentPanel,
  DashboardContainer,
  DashboardHeader,
} from "../../components/dashboard";
import DashboardSideNavMenu from "../../components/dashboard-side-nav-menu";
import Layout from "../../components/layout";
import { getLootTabContent, type ILootTabContentful } from "../../contentful";
import colors from "../../styles/colors";
import { contentfulStyles } from "../../styles/fonts";
import media from "../../styles/media-queries";
import { authOptions } from "../api/auth/[...nextauth]";

interface ITabContentProps {
  hidden: boolean;
  content: string;
}

const iframeStyle = css`
  iframe {
    width: 100%;
    min-height: 70vh;
    background-color: ${colors.white};
    outline: none;
    border: 1px solid ${colors.grey.border};
    margin: 20px 0;

    &:last-child {
      margin-bottom: 0;
    }

    &:first-child {
      margin-top: 0;
    }
  }
`;

const TabContent: React.FC<ITabContentProps> = ({ hidden, content }) => {
  const [loadingIFrame, setLoadingIFrame] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      const iframes = Array.from(container.getElementsByTagName("iframe"));

      let totalLoaded = 0;

      iframes.forEach((iframe) => {
        if (iframe?.contentDocument?.body) {
          iframe.addEventListener("load", () => {
            totalLoaded++;
            if (totalLoaded === iframes.length) {
              setLoadingIFrame(false);
            }
          });
        } else {
          totalLoaded++;
        }
      });

      if (totalLoaded === iframes.length) {
        setLoadingIFrame(false);
      }
    }
  }, []);

  return (
    <div
      ref={containerRef}
      hidden={hidden}
      css={css`
        position: relative;
        padding: 20px 0 0 0;

        article {
          padding: 0;
        }

        ${media.down("sm")`
          padding: 10px 0 0 0 ;
        `};
      `}
    >
      {loadingIFrame && (
        <div
          css={css`
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            display: flex;
            align-items: center;
            flex-direction: column;

            & > p {
              margin-top: 20px;
              text-align: center;
              max-width: 400px;
            }
          `}
        >
          <CircularProgress size={100} thickness={2} />
          <p>Loading spreadsheet... this can take a while, please be patient!</p>
        </div>
      )}
      <article
        role="tabpanel"
        css={[contentfulStyles, iframeStyle]}
        dangerouslySetInnerHTML={{ __html: marked.parse(content) }}
      ></article>
    </div>
  );
};

interface IDashboardPageProps {
  contentfulResponse: ILootTabContentful;
  loot: number[];
}

const DashboardLootPage: React.FC<IDashboardPageProps> = ({
  contentfulResponse,
  loot,
}) => {
  const [fullscreen, setFullscreen] = useState(false);

  const tabData = contentfulResponse.data.lootTabCollection.items;
  tabData.sort((a, b) => a.phase - b.phase);

  const [selectedTab, setSelectedTab] = useState(tabData[0].phase - 1);

  const handleFullScreen = () => {
    setFullscreen(!fullscreen);
  };

  return (
    <Layout title="Loot | Not Dead Yet">
      <DashboardMainSection fullscreen={fullscreen}>
        <DashboardHeader />
        <DashboardContainer>
          <DashboardSideNavMenu />
          <DashboardContentPanel full>
            <div
              css={css`
                padding: 0 15px;
                ${media.down("sm")`padding: 0 8px;`};
              `}
            >
              <Tabs value={selectedTab} onChange={(_, v) => setSelectedTab(v as number)}>
                {tabData.map((data) => (
                  <Tab key={data.phase} label={`Phase ${data.phase}`} />
                ))}
              </Tabs>
              <button
                type="button"
                onClick={handleFullScreen}
                css={css`
                  position: absolute;
                  top: 8px;
                  right: 8px;
                `}
              >
                {fullscreen ? (
                  <svg width="20" height="20" viewBox="0 0 24 24">
                    <g fill="none">
                      <path d="M24 0v24H0V0h24ZM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427c-.002-.01-.009-.017-.017-.018Zm.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093c.012.004.023 0 .029-.008l.004-.014l-.034-.614c-.003-.012-.01-.02-.02-.022Zm-.715.002a.023.023 0 0 0-.027.006l-.006.014l-.034.614c0 .012.007.02.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01l-.184-.092Z" />
                      <path
                        fill="currentColor"
                        d="M10.5 12a1.5 1.5 0 0 1 1.493 1.356L12 13.5v5a1.5 1.5 0 0 1-2.993.144L9 18.5v-1.379l-3.94 3.94a1.5 1.5 0 0 1-2.224-2.008l.103-.114L6.88 15H5.5a1.5 1.5 0 0 1-.144-2.993L5.5 12h5Zm8.44-9.06a1.5 1.5 0 0 1 2.224 2.007l-.103.114L17.12 9h1.38a1.5 1.5 0 0 1 .144 2.993L18.5 12h-5a1.5 1.5 0 0 1-1.493-1.356L12 10.5v-5a1.5 1.5 0 0 1 2.993-.144L15 5.5v1.379l3.94-3.94Z"
                      />
                    </g>
                  </svg>
                ) : (
                  <svg width="20" height="20" viewBox="0 0 24 24">
                    <g fill="none">
                      <path d="M24 0v24H0V0h24ZM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427c-.002-.01-.009-.017-.017-.018Zm.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093c.012.004.023 0 .029-.008l.004-.014l-.034-.614c-.003-.012-.01-.02-.02-.022Zm-.715.002a.023.023 0 0 0-.027.006l-.006.014l-.034.614c0 .012.007.02.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01l-.184-.092Z" />
                      <path
                        fill="currentColor"
                        d="M8.94 12.94a1.5 1.5 0 0 1 2.224 2.007l-.103.114L7.12 19H8.5a1.5 1.5 0 0 1 .144 2.993L8.5 22h-5a1.5 1.5 0 0 1-1.493-1.356L2 20.5v-5a1.5 1.5 0 0 1 2.993-.144L5 15.5v1.379l3.94-3.94ZM20.5 2a1.5 1.5 0 0 1 1.493 1.356L22 3.5v5a1.5 1.5 0 0 1-2.993.144L19 8.5V7.121l-3.94 3.94a1.5 1.5 0 0 1-2.224-2.008l.103-.114L16.88 5H15.5a1.5 1.5 0 0 1-.144-2.993L15.5 2h5Z"
                      />
                    </g>
                  </svg>
                )}
              </button>
              {tabData.map((data) => (
                <TabContent
                  hidden={selectedTab !== data.phase - 1}
                  key={data.phase}
                  content={loot.includes(data.phase) ? data.content : data.instructions}
                />
              ))}
            </div>
          </DashboardContentPanel>
        </DashboardContainer>
      </DashboardMainSection>
    </Layout>
  );
};

export default DashboardLootPage;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await unstable_getServerSession(context.req, context.res, authOptions);

  if (session?.user) {
    const { member, loot } = session.user;

    if (member) {
      const contentfulResponse = await getLootTabContent();

      return {
        props: { contentfulResponse, loot },
      };
    }
  }

  return {
    redirect: {
      destination: "/",
      permanent: false,
    },
  };
}
