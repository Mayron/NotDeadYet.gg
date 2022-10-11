import { css } from "@emotion/react";
import { marked } from "marked";
import type { NextPage } from "next";
import Image from "next/image";
import { useRef, useState } from "react";
import BlizzardButton from "../components/blizzard-button";
import HomeBanner from "../components/home/home-banner";
import Layout from "../components/layout";
import { getGuildSummary } from "../contentful";
import arrowDown from "../public/assets/arrow-down.png";
import colors from "../styles/colors";
import media from "../styles/media-queries";

interface IHomePageProps {
  guildSummary: string;
}

const HomePage: NextPage<IHomePageProps> = ({ guildSummary }) => {
  const [loading, setLoading] = useState(false);
  const nextSection = useRef<HTMLElement>(null);

  const handleArrowClick: React.MouseEventHandler = () => {
    if (nextSection.current) {
      const element = nextSection.current;
      element.scrollIntoView({
        behavior: "smooth",
      });
    }
  };

  return (
    <Layout title="Not Dead Yet | Gehennas (EU)" hidePageNavigation>
      <HomeBanner />
      <div
        css={css`
          background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3ZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDcuMi1jMDAwIDc5LjU2NmViYzViNCwgMjAyMi8wNS8wOS0wODoyNTo1NSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDpkODg3NDM0Zi1mZTZlLTBmNDMtYjRkNS1iOTJhYzEzMDYzZDUiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NDAzMTVEQjUyN0M5MTFFREEwMjBCQURFMDBDMkZBNDQiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NDAzMTVEQjQyN0M5MTFFREEwMjBCQURFMDBDMkZBNDQiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIDIzLjQgKFdpbmRvd3MpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6ODhhMWQ3NzQtMTAxNy01NjQxLTk4MDQtMjM3MmY1YjgzZTQ4IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOmQ4ODc0MzRmLWZlNmUtMGY0My1iNGQ1LWI5MmFjMTMwNjNkNSIv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")
            left top repeat;
          position: relative;

          &::before {
            content: " ";
            display: block;
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            height: 50%;
            background: linear-gradient(transparent, ${colors.background});
          }
        `}
      >
        <section
          css={css`
            ${media.up("sm")`padding-top: 40px;`};

            p {
              max-width: 800px;
              text-align: center;
              margin: auto;
            }
          `}
        >
          <header
            css={css`
              padding-bottom: 30px;

              p:last-of-type {
                padding-top: 15px;
              }
            `}
            dangerouslySetInnerHTML={{ __html: marked.parse(guildSummary) }}
          ></header>
          <button
            type="button"
            title="Continue Reading"
            onClick={handleArrowClick}
            css={css`
              text-align: center;
              margin: 0 auto;
              transform: translateY(15px);
              transition: transform 0.8s cubic-bezier(0.215, 0.61, 0.355, 1) 0s,
                fill 0.2s ease-in-out 0s;

              &:hover {
                filter: brightness(1.5);
                cursor: pointer;
                transform: translateY(7.5px);
                transition: transform 0.2s cubic-bezier(0.215, 0.61, 0.355, 1) 0s;
              }
            `}
          >
            <Image
              src={arrowDown}
              alt="Scroll down to continue reading"
              placeholder="blur"
            />
          </button>
        </section>
      </div>
      <div
        css={css`
          color: ${colors.white};
          background-color: ${colors.blue.darkest};
          border: 2px solid #252f3c;
          box-shadow: 0 1px 4px #0e141b;
        `}
      >
        <section ref={nextSection}>
          <article>
            <header>
              <h3>What You Can Expect From Us</h3>
            </header>
            <ul>
              <li>
                A competent and experienced raiding roster; Most of our players have
                exceptional raid experience and have played in original Vanilla WoW, TBC
                and WoTLK.
              </li>
              <li>
                A &quot;semi-hardcore&quot; and enjoyable approach to raiding and personal
                development.
              </li>
              <li>
                A dedicated and friendly management team (e.g., officers and guild
                masters), each of whom will put in the time and effort to organise raid
                nights with optimal raid compositions, and provide resources to ensure
                successful progression.
              </li>
              <li>
                A fair and drama-free looting system that is unbiased towards favouritism.
                Our loot system distributes loot based on maximizing the raid&apos;s
                effectiveness as a whole to achieve our primary goal of clearing
                progression content as quickly as possible.
              </li>
              <li>
                Half price on consumables and materials from our guild bank compared to
                the auction house price.
              </li>
            </ul>
          </article>
        </section>
      </div>

      <section
        css={css`
          padding-bottom: 10px;
        `}
      >
        <article>
          <header>
            <h3>What we expect from you</h3>
          </header>
          <ul>
            <li>
              Be over 18 years old with good English skills as we are predominantly an
              English-speaking guild.
            </li>
            <li>
              Be able to communicate with mature etiquette towards your fellow guild
              members and listen out to important instructions during raid nights.
            </li>
            <li>Show high attendance for each of our mandatory raid nights.</li>
            <li>
              Signup at least a week in advance, or let the management team know if you
              will be absent. This allows us to plan and confirm the raiding roster before
              each event and avoid wasting people&apos;s time.
            </li>
            <li>
              Be ready inside the instance at 19:30 (server time) ready for us to start
              clearly trash.
            </li>
            <li>
              Come prepared for raids by having a thorough understanding of the tactics
              for each boss fight, having any required addon/s installed and up to date,
              having the most appropriate enchants, and bringing enough consumables to
              last the full raid night.
            </li>
          </ul>
          <p
            css={css`
              font-size: 1.2rem;
              padding-top: 10px;
              line-height: 27px;
            `}
          >
            We do not expect flawless gameplay but there is an expectation to learn from
            mistakes and come prepared to raids not to waste other people&apos;s time. We
            respect your time and expect the same in return.
          </p>
        </article>
      </section>

      <section
        css={css`
          text-align: center;
          color: ${colors.blue.darkest};
          padding-top: 10px;
          padding-bottom: 40px;

          button {
            margin: auto;
          }
        `}
      >
        <hr />
        <header>
          <h4>Interested in Joining Us for Wrath?</h4>
        </header>
        <BlizzardButton
          text="Apply Now"
          href="/apply"
          onClick={() => setLoading(true)}
          loading={loading}
        />
      </section>
    </Layout>
  );
};

export default HomePage;

export async function getStaticProps() {
  const guildSummary = await getGuildSummary();

  return {
    props: { guildSummary },
  };
}
