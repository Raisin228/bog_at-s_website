// @ts-check
import { defineConfig } from 'astro/config';

const repo = process.env.GITHUB_REPOSITORY?.split('/')[1];
const isUserSite = !repo || repo.endsWith('.github.io');

export default defineConfig({
  site: 'https://raisin228.github.io',
  base: isUserSite ? '/' : `/${repo}/`,
});
