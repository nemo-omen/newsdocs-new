import type { PageServerLoad } from './$types';

const currentUrl = 'https://www.tomgreencountysheriff.org/roster.php';
const releasedUrl = 'https://www.tomgreencountysheriff.org/roster.php?released=1';

export const load = (async ({ fetch, params }) => {
   // const currentInmatesString = await getInmatesString(currentUrl, fetch);
   // const releasedInmatesString = await getInmatesString(releasedUrl, fetch);

   const currentHtml = getInmatesString(currentUrl, fetch);
   const releasedHtml = getInmatesString(releasedUrl, fetch);

   return {
      roster: {
         current: currentHtml,
         released: releasedHtml
      }
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