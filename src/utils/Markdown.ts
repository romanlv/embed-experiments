// TODO: @mapbox/rehype-prism does not have typescript definition
// @ts-ignore
import rehypePrism from '@mapbox/rehype-prism';
import html from 'rehype-stringify';
import gfm from 'remark-gfm';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import { unified } from 'unified';

const embedPage = `
  <link rel="stylesheet" href="https://gate.highlightstaging.xyz/assets/embed.css">
  <div data-widget="highlight-gated-page" data-page-slug="l89r971b"></div>
  <script type="module" crossorigin src="https://gate.highlightstaging.xyz/assets/embed.js?v=1"></script>
`;

const embedMint = `
<link rel="stylesheet" href="https://mint.highlightstaging.xyz/assets/embed.css">
<div data-widget="highlight-mint-page" data-mint-collection-id="6365559177d12cae7ff9e532"></div>
<script type="module" crossorigin="true" src="https://mint.highlightstaging.xyz/assets/embed.js?v=1"></script>
`;

// const embedMintLocal = `
// <link rel="stylesheet" href="https://mint.highlightstaging.xyz/assets/embed.css">
// <div data-widget="highlight-mint-page" data-mint-collection-id="6365559177d12cae7ff9e532"></div>
// <script type="module" crossorigin="true" src="https://mint.highlightstaging.xyz/assets/embed.js?v=1"></script>
// `

export async function markdownToHtml(markdown: string) {
  const result = await unified()
    .use(remarkParse)
    .use(gfm)
    .use(remarkRehype)
    .use(rehypePrism)
    .use(html)
    .process(markdown);
  return result
    .toString()
    .replace(/@@baseUrl@@/g, process.env.baseUrl || '')
    .replace(/@@embedPage@@/g, embedPage)
    .replace(/@@embedMint@@/g, embedMint);
}
