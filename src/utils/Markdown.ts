// TODO: @mapbox/rehype-prism does not have typescript definition
// @ts-ignore
import rehypePrism from '@mapbox/rehype-prism';
import html from 'rehype-stringify';
import gfm from 'remark-gfm';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import { unified } from 'unified';

const embed = `
  <link rel="stylesheet" href="https://gate.highlightstaging.xyz/assets/app.e1c67b83.css">
  <div data-widget="highlight-page" data-page-slug="l89r971b"></div>
  <script type="module" crossorigin src="https://gate.highlightstaging.xyz/assets/embed.js?v=1"></script>
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
    .replace(/@@embed@@/g, embed);
}
