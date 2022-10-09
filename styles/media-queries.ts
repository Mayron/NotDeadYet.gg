import { css, type SerializedStyles } from "@emotion/react";
import type { CSSInterpolation } from "@emotion/serialize";
import { throttle } from "lodash";
import { useEffect, useState } from "react";

export const breakpoints: { [index: string]: number } = {
  xs: 0,
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
  xxl: 1400,
  xxxl: 1600,
};

export const useBreakpoint = () => {
  const [breakpoint, setBreakpoint] = useState<number>(
    typeof window !== "undefined" ? window.innerWidth : 0,
  );

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
    const calcInnerWidth = throttle(() => {
      setBreakpoint(window.innerWidth);
    }, 200);

    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    window.addEventListener("resize", calcInnerWidth);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return () => window.removeEventListener("resize", calcInnerWidth);
  }, []);

  return breakpoint;
};

export type BreakPoints = "xs" | "sm" | "md" | "lg" | "xl" | "xxl" | "xxxl";
type MediaQueryFunc = (
  name: BreakPoints,
) => (template: TemplateStringsArray, ...args: CSSInterpolation[]) => SerializedStyles;

export const nextBreakpointKey: (name: BreakPoints) => BreakPoints | undefined = (
  name,
) => {
  const breakpointNames = Object.keys(breakpoints);

  if (!breakpointNames.includes(name)) {
    return undefined;
  }

  const index = breakpointNames.indexOf(name);
  if (index === breakpointNames.length) return undefined;

  return breakpointNames[index + 1] as BreakPoints;
};

const getMaxBreakpoint: (name: BreakPoints) => number | undefined = (name) => {
  const nextKey = nextBreakpointKey(name);
  return nextKey ? breakpoints[nextKey] - 0.02 : undefined;
};

const getMinBreakpoint: (name: BreakPoints) => number | undefined = (
  name: BreakPoints,
) => {
  if (Object.keys(breakpoints).includes(name)) {
    return breakpoints[name] > 0 ? breakpoints[name] : undefined;
  }

  return undefined;
};

const up: MediaQueryFunc =
  (name) =>
  (template, ...args) => {
    const min = getMinBreakpoint(name);
    const style = css(template, ...args);

    if (min) {
      return css`
        @media (min-width: ${`${min}px`}) {
          ${style};
        }
      `;
    }
    return style;
  };

const down: MediaQueryFunc =
  (name) =>
  (template, ...args) => {
    const max = getMaxBreakpoint(name);
    const style = css(template, ...args);

    if (max) {
      return css`
        @media (max-width: ${`${max}px`}) {
          ${style};
        }
      `;
    }
    return style;
  };

const between =
  (lower: BreakPoints, upper: BreakPoints) =>
  (template: TemplateStringsArray, ...args: CSSInterpolation[]) => {
    const min = getMinBreakpoint(lower);
    const max = getMaxBreakpoint(upper);
    const style = css(template, ...args);

    if (min && max) {
      return css`
        @media (min-width: ${`${min}px`}) and (max-width: ${`${max}px`}) {
          ${style};
        }
      `;
    }
    if (!max) {
      return up(upper)(template);
    }
    if (!min) {
      return down(lower)(template);
    }
    return style;
  };

const only: MediaQueryFunc =
  (name) =>
  (template, ...args) =>
    between(name, name)(template, ...args);

export const getMediaQueryCssClasses: () => SerializedStyles[] = () => {
  const queries: SerializedStyles[] = [];

  Object.keys(breakpoints).forEach((key) => {
    const point = key as BreakPoints;
    const value = breakpoints[point];
    const nextPoint = nextBreakpointKey(point);
    const nextValue = nextPoint !== undefined && breakpoints[nextPoint];

    if (value > 0) {
      queries.push(css`
        @media (max-width: ${value - 1}px) {
          .${point}-up, .${point}-only {
            display: none !important;
          }
        }
      `);
    }

    if (nextValue) {
      queries.push(css`
        @media (min-width: ${nextValue}px) {
          .${point}-down, .${point}-only {
            display: none !important;
          }
        }
      `);
    }

    ["up", "down", "only"].forEach((f) => {
      const funcType = f as "up" | "down" | "only";
      let styled: MediaQueryFunc;

      switch (funcType) {
        case "up":
          styled = up;
          break;
        case "down":
          styled = down;
          break;
        default:
          styled = only;
          break;
      }

      const styles = styled(point)`
        .${point}-${funcType} {
          display: block;

          &.flex {
            display: flex;
          }
        }

        span.${point}-${funcType} {
          display: inline-block;

          &.flex {
            display: inline-flex;
          }
        }
      `;

      queries.push(styles);
    });
  });

  return queries.map(
    (style) =>
      css`
        ${style}
      `,
  );
};

const media = {
  up,
  down,
  between,
  only,
};

export default media;
