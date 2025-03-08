import { join, dirname } from "path"
import type { StorybookConfig } from "@storybook/react-vite"

function getAbsolutePath(value: string): any {
  return dirname(require.resolve(join(value, "package.json")))
}
const config: StorybookConfig = {
  stories: ["../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    getAbsolutePath("@storybook/addon-essentials"),
    getAbsolutePath("@chromatic-com/storybook"),
    getAbsolutePath("@storybook/addon-interactions")
  ],
  framework: {
    name: getAbsolutePath("@storybook/react-vite"),
    options: {}
  }
}
export default config
