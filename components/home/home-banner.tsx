import { css, Global } from "@emotion/react";
import Image from "next/image";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import { useCallback } from "react";
import type { Engine } from "tsparticles-engine";
import homeBanner from "../../public/assets/home-banner.jpg";
import logo from "../../public/assets/logo.png";
import vars from "../../styles/vars";
import NavBar from "../nav-bar";
import colors from "../../styles/colors";
import media from "../../styles/media-queries";

const HomeBanner: React.FC = () => {
  const particlesInit = useCallback(async (engine: Engine) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    await loadFull(engine);
  }, []);

  return (
    <div
      css={css`
        background-color: black;
        display: flex;
        justify-content: center;
        position: relative;
        height: 55vh;
        min-height: 490px;
        max-height: 1080px;

        ${media.down("xs")`
          height: 40vh;
          min-height: 300px;
        `};
      `}
    >
      <Particles
        init={particlesInit}
        css={css`
          position: absolute;
          top: 0;
          right: 0;
          bottom: 0;
          left: 0;
          z-index: 1;
        `}
        options={{
          fpsLimit: 60,
          fullScreen: false,
          particles: {
            color: {
              value: colors.blue.glow,
            },
            collisions: {
              enable: true,
            },
            move: {
              enable: true,
              outModes: {
                default: "out",
              },
              direction: "bottom-left",
              random: false,
              speed: 2,
              straight: false,
            },
            number: {
              limit: 120,
            },
            opacity: {
              value: 0.8,
            },
            shape: {
              type: "circle",
            },
            shadow: {
              blur: 4,
              color: {
                value: colors.blue.glow,
              },
              enable: true,
            },
            size: {
              value: {
                min: 0.5,
                max: 1.5,
              },
              random: true,
            },
          },
          detectRetina: true,
        }}
      />
      <div
        css={css`
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          z-index: 10;
          display: flex;
          flex-direction: column;
          align-items: center;
          box-shadow: inset 0 -8px 10px;

          ${media.up("sm")`
            justify-content: center;
          `};
        `}
      >
        <header
          css={css`
            color: white;
            text-align: center;

            h1 {
              margin-bottom: 0;
            }

            p {
              text-transform: uppercase;
              font-size: 2rem;
              font-family: ${vars.font.header.family};
            }

            ${media.down("xs")`
              flex: 1;
              display: flex;
              align-items: center;
              padding-top: 20px;
              width: 240px;
            `};
          `}
        >
          <Global
            styles={css`
              @keyframes ndy-logo-glow {
                15% {
                  filter: brightness(1) saturate(1);
                }
                35% {
                  filter: brightness(1.25) saturate(1.3);
                }
                40% {
                  filter: brightness(1) saturate(1.1);
                }
                60% {
                  filter: brightness(1) saturate(1.2);
                }
                90% {
                  filter: brightness(1) saturate(1);
                }
                93% {
                  filter: brightness(1.35) saturate(1.5);
                }
                95% {
                  filter: brightness(1) saturate(1);
                }
              }

              @keyframes ndy-logo-scale {
                from {
                  transform: scale(0.96);
                }
                to {
                  transform: scale(1);
                }
              }
            `}
          />
          <Image
            src={logo}
            alt="Not Dead Yet [Gehennas EU]"
            css={css`
              object-fit: cover;
              object-position: center center;
              animation: ndy-logo-glow 5s cubic-bezier(0.75, 0.27, 0.16, 0.76) infinite
                  alternate,
                ndy-logo-scale 5s cubic-bezier(0.32, 0.79, 0.78, 0.33) infinite alternate;
            `}
            placeholder="blur"
          />
        </header>
        <NavBar />
      </div>

      <Image
        src={homeBanner}
        alt="Home page banner showing wrath content"
        css={css`
          object-fit: cover;
          object-position: center center;
        `}
        placeholder="blur"
      />
    </div>
  );
};

export default HomeBanner;
