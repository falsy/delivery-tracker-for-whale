import { getPatternStyles, patternFns } from '../helpers.cjs';
import { css } from '../css/index.cjs';

const circleConfig = {
transform(props) {
  const { size, ...rest } = props;
  return {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flex: "0 0 auto",
    width: size,
    height: size,
    borderRadius: "9999px",
    ...rest
  };
}}

export const getCircleStyle = (styles = {}) => {
  const _styles = getPatternStyles(circleConfig, styles)
  return circleConfig.transform(_styles, patternFns)
}

export const circle = (styles) => css(getCircleStyle(styles))
circle.raw = getCircleStyle