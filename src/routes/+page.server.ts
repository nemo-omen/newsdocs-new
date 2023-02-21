import type { Actions, PageServerLoad } from "./$types";
import { parse } from "./parser";
// import * as shiki from 'shiki';

const currentUrl = "https://www.tomgreencountysheriff.org/roster.php";
const releasedUrl =
  "https://www.tomgreencountysheriff.org/roster.php?released=1";

export const actions = {
  default: async (event) => {
    console.log(event);
  },
} satisfies Actions;

export const load = (async ({ fetch, params }) => {
  // const currentInmatesString = await getInmatesString(currentUrl, fetch);
  // const releasedInmatesString = await getInmatesString(releasedUrl, fetch);

  const currentHtml = await getInmatesString(currentUrl, fetch);
  const releasedHtml = await getInmatesString(releasedUrl, fetch);

  const templateData = await parse(currentHtml, releasedHtml);
  // const codeData = await (getHighlightedCode(templateData));

  return {
    templateData,
    // codeData,
  };
}) satisfies PageServerLoad;

async function getInmatesString(
  url: string,
  fetch: (url: string) => Promise<any>,
): Promise<string> {
  let responseString: string;
  try {
    const res = await fetch(url);
    responseString = await res.text();
  } catch (error) {
    responseString = "";
    console.error(error);
  }
  return responseString;
}

// async function getHighlightedCode(templateData: string) {
//    const highlighter = await shiki.getHighlighter({ theme: 'nord' });
//    const codeTemp = `${templateData}`;
//    const html = highlighter.codeToHtml(codeTemp, { lang: 'html' });
//    return html;
// }
