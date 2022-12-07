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

const embedMintScripts = `
<link rel="stylesheet" href="https://mint.highlightstaging.xyz/assets/embed.css"/>
<script type="module" crossorigin="true" src="https://mint.highlightstaging.xyz/assets/embed.js?v=1"></script>
`;

const embedMintPage = `
<div data-widget="highlight-mint-page" data-mint-collection-id="63750d80ba7a070adfefe9ec"></div>
`;

const embedMintCard1 = `
<div data-widget="highlight-mint-card" data-mint-collection-id="63750d80ba7a070adfefe9ec"></div>
`;

const embedMintCard2 = `
<div data-widget="highlight-mint-card" data-mint-collection-id="637fd676a4bb4a72613783fd"></div>
`;

const embedMintCard3 = `
<div data-widget="highlight-mint-card" data-mint-collection-id="63755a68292eb3b92bf889f7"></div>
`;

const embedMintCard4 = `
<div data-widget="highlight-mint-card" data-mint-collection-id="6388dc7f132b08e185259685"></div>
`;

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
    .replace(/@@embedMintScripts@@/g, embedMintScripts)
    .replace(/@@embedMintPage@@/g, embedMintPage)
    .replace(/@@embedMintCard1@@/g, embedMintCard1)
    .replace(/@@embedMintCard2@@/g, embedMintCard2)
    .replace(/@@embedMintCard3@@/g, embedMintCard3)
    .replace(/@@embedMintCard4@@/g, embedMintCard4);
}
