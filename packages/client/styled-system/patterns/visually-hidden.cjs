import { getPatternStyles, patternFns } from '../helpers.cjs';
import { css } from '../css/index.cjs';

const visuallyHiddenConfig = {
transform(props) {
  return {
    srOnly: true,
    ...props
  };
}}

export const getVisuallyHiddenStyle = (styles = {}) => {
  const _styles = getPatternStyles(visuallyHiddenConfig, styles)
  return visuallyHiddenConfig.transform(_styles, patternFns)
}

export const visuallyHidden = (styles) => css(getVisuallyHiddenStyle(styles))
visuallyHidden.raw = getVisuallyHiddenStyle