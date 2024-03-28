import type { StorybookConfig } from "@storybook/nextjs";

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    "@storybook/addon-onboarding",
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@chromatic-com/storybook",
    "@storybook/addon-interactions",
  ],
  framework: {
    name: "@storybook/nextjs",
    options: {},
  },
  docs: {
    autodocs: "tag",
  },
  staticDirs: ["..\\public"],
  webpackFinal: async (config) => {
    if (config.module) {
      config.module.rules = config.module.rules?.map((rule) => {
        if (
          rule &&
          typeof rule !== 'string' &&
          rule.test instanceof RegExp &&
          rule.test.test('test.css')
        ) {
          return { ...rule, sideEffects: true };
        }
        return rule;
      });
    }
    return config;
  },
};
export default config;
