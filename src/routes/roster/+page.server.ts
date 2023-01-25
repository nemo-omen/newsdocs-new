import type { PageServerLoad, Actions } from './$types';
import { parse } from './parser';

const currentUrl = 'https://www.tomgreencountysheriff.org/roster.php';
const releasedUrl = 'https://www.tomgreencountysheriff.org/roster.php?released=1';

export const actions = {
   default: async (event) => {
      console.log(event);
   }
} satisfies Actions;

export const load = (async ({ fetch, params }) => {
   // const currentInmatesString = await getInmatesString(currentUrl, fetch);
   // const releasedInmatesString = await getInmatesString(releasedUrl, fetch);

   const currentHtml = await getInmatesString(currentUrl, fetch);
   const releasedHtml = await getInmatesString(releasedUrl, fetch);

   const templateData = await parse(currentHtml, releasedHtml);

   return {
      templateData
   };
}) satisfies PageServerLoad;

async function getInmatesString(url: string, fetch: (url: string) => Promise<any>): Promise<string> {
   let responseString: string;
   try {
      const res = await fetch(url);
      responseString = await res.text();
   } catch (error) {
      responseString = '';
      console.error(error);
   }
   return responseString;
}