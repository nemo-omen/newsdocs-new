import type { Inmate } from "./parser";

export const templateDescription = function (
  timePeriod: string,
  inmateCount: number,
): string {
  return `
<!-- wp:paragraph -->

<p>${timePeriod}, ${inmateCount} people were booked into the Tom Green County Detention Center. Below is a summary of the booking charges and the individual arrest records.</p>

<!-- /wp:paragraph -->


<!-- wp:paragraph -->

<p><strong>Charge categories</strong> <em>(Note: several that have been taken into custody have multiple charges filed against them&nbsp;that&nbsp;fit into more than one general category. See the individual records for details)</em></p>

<!-- /wp:paragraph -->`;
};

export const templateChargeList = function (charges: string[]) {
  return `
<!-- wp:list -->

<ul>

${charges.map((charge) => `  <li>${charge}</li>`).join("\n")}

</ul>

<!-- /wp:list -->`;
};

export const templateInmateList = function (inmates: Inmate[]): string {
  const inmateHTML = inmates.map((inmate: Inmate) => {
    return `
<article class="inmate" style = "display: flex; flex-wrap: wrap; align-items: flex-start; gap: 2rem; margin-bottom: 2rem;">
  <img src="${inmate.img}" width="200" alt="${inmate.name} mug shot" style="flex-grow: 1; flex-shrink: 1; flex-basis: 30ch; max-width: 250px;"/>
  <div class="inmate-data"style="flex-grow: 1; flex-shrink: 1; flex-basis: 30ch;">
    <h3 style="padding-top: 0; margin-top: 0; font-weight: bold; font-size: 1.5rem; line-height: 1;">${inmate.name}</h3>
    <p><span class="inmate-data-label" style="font-weight: bold;">SO Number: </span>${inmate.so_number}</p>
    <p><span class="inmate-data-label" style="font-weight: bold;">Booking Number: </span>${inmate.booking_number}</p>
    <p><span class="inmate-data-label" style="font-weight: bold;">Booking Date: </span>${inmate.booking_date}</p>

    ${
      inmate.release_date !== undefined
        ? `<p><span class="inmate-data-label" style="font-weight: bold;">Release Date: </span>${inmate.release_date}</p>`
        : ""
    }

    <p><span class="inmate-data-label" style="font-weight: bold;">Charges: </span></p>

    ${inmate.charges.map((charge) => `<p>${charge}</p>`).join("\n    ")}

    <p><span class="inmate-data-label" style="font-weight: bold;">Bond: </span>${inmate.bond}</p>
  </div>
</article>`;
  });

  // Adding an extra '.' to all ocurrences of '.inmate'
  // because DenoMailer seems to want to strip the leading '.'
  // from class selectors.
  return `<!-- wp:html -->
	${inmateHTML.join("\n\t")}

<!-- /wp:html -->`;
};

export const templateDisclaimer = `<!-- wp:paragraph -->
  <p><em><strong>Disclaimer</strong>: Information presented on this website is collected, maintained, and provided for the convenience of the site visitor/reader. While every effort is made to keep such information accurate and up-to-date, the Tom Green County Detention Center can not certify the accuracy and/or authenticity of any information. The reader should not rely on this information in any manner. Under no circumstances shall Tom Green County, the Sheriff of Tom Green County, the web development supplier for Tom Green County Sheriff, the employees of Tom Green County nor the employees of Tom Green County Detention Center be liable for any decisions, actions taken or omissions made from reliance on any information contained herein from whatever source, nor shall the Tom Green County Detention Center be liable for any other consequences from any such reliance. *Booking and release times are approximate. These records are from the Tom Green County Jail system.</em><br><strong>Source:</strong> Tom Green County Sheriff's Office<br><strong>Contact information</strong><br><strong>Address</strong>: 122 W Harris Ave, San Angelo, TX 76903<br><strong>Phone:</strong> (325) 659-6597</p>
<!-- /wp:paragraph -->
`;
