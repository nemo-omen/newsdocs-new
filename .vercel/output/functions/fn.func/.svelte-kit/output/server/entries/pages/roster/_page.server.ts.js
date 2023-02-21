import jsdom from "jsdom";
import * as shiki from "shiki";
const templateDescription = function(timePeriod, inmateCount) {
  return `
<!-- wp:paragraph -->

<p>Over the past ${timePeriod} hours, ${inmateCount} people were booked into the Tom Green County Detention Center. Below is a summary of the booking charges and the individual arrest records.</p>

<!-- /wp:paragraph -->


<!-- wp:paragraph -->

<p><strong>Charge categories</strong> <em>(Note: several that have been taken into custody have multiple charges filed against them&nbsp;that&nbsp;fit into more than one general category. See the individual records for details)</em></p>

<!-- /wp:paragraph -->`;
};
const templateChargeList = function(charges) {
  return `
<!-- wp:list -->

<ul>

${charges.map((charge) => `  <li>${charge}</li>`).join("\n")}

</ul>

<!-- /wp:list -->`;
};
const templateInmateList = function(inmates) {
  const inmateHTML = inmates.map((inmate) => {
    return `
<article class="inmate" style = "display: flex; flex-wrap: wrap; align-items: flex-start; gap: 2rem; margin-bottom: 2rem;">
  <img src="${inmate.img}" width="200" alt="${inmate.name} mug shot" style="flex-grow: 1; flex-shrink: 1; flex-basis: 30ch; max-width: 250px;"/>
  <div class="inmate-data"style="flex-grow: 1; flex-shrink: 1; flex-basis: 30ch;">
    <h3 style="padding-top: 0; margin-top: 0; font-weight: bold; font-size: 1.5rem; line-height: 1;">${inmate.name}</h3>
    <p><span class="inmate-data-label" style="font-weight: bold;">SO Number: </span>${inmate.so_number}</p>
    <p><span class="inmate-data-label" style="font-weight: bold;">Booking Number: </span>${inmate.booking_number}</p>
    <p><span class="inmate-data-label" style="font-weight: bold;">Booking Date: </span>${inmate.booking_date}</p>

    ${inmate.release_date !== void 0 ? `<p><span class="inmate-data-label" style="font-weight: bold;">Release Date: </span>${inmate.release_date}</p>` : ""}

    <p><span class="inmate-data-label" style="font-weight: bold;">Charges: </span></p>

    ${inmate.charges.map((charge) => `<p>${charge}</p>`).join("\n    ")}

    <p><span class="inmate-data-label" style="font-weight: bold;">Bond: </span>${inmate.bond}</p>
  </div>
</article>`;
  });
  return `<!-- wp:html -->
	${inmateHTML.join("\n	")}

<!-- /wp:html -->`;
};
const templateDisclaimer = `<!-- wp:paragraph -->
  <p><em><strong>Disclaimer</strong>: Information presented on this website is collected, maintained, and provided for the convenience of the site visitor/reader. While every effort is made to keep such information accurate and up-to-date, the Tom Green County Detention Center can not certify the accuracy and/or authenticity of any information. The reader should not rely on this information in any manner. Under no circumstances shall Tom Green County, the Sheriff of Tom Green County, the web development supplier for Tom Green County Sheriff, the employees of Tom Green County nor the employees of Tom Green County Detention Center be liable for any decisions, actions taken or omissions made from reliance on any information contained herein from whatever source, nor shall the Tom Green County Detention Center be liable for any other consequences from any such reliance. *Booking and release times are approximate. These records are from the Tom Green County Jail system.</em><br><strong>Source:</strong> Tom Green County Sheriff's Office<br><strong>Contact information</strong><br><strong>Address</strong>: 122 W Harris Ave, San Angelo, TX 76903<br><strong>Phone:</strong> (325) 659-6597</p>
<!-- /wp:paragraph -->
`;
const { JSDOM } = jsdom;
const chargeMap = /* @__PURE__ */ new Map();
chargeMap.set("RPR", "RELEASED ON PERSONAL RECOGNIZANCE");
chargeMap.set("GOB", "GO OFF BOND");
chargeMap.set("GJI", "GRAND JURY INDICTMENT");
chargeMap.set("FTA", "FAILURE TO APPEAR");
chargeMap.set("VPTA", "VIOLATION OF PROMISE TO APPEAR");
chargeMap.set("MTR", "MOTION TO REVOKE");
chargeMap.set("CPF", "CAPIAS PRO FINE");
chargeMap.set("MISC", "MISC");
chargeMap.set("VOP", "VIOLATION OF PAROLE");
function getInmatesData(document) {
  const inmateDivs = document?.querySelectorAll(".inmate_div");
  const inmates = [];
  for (const div of inmateDivs) {
    const src = "https://www.tomgreencountysheriff.org/" + div?.querySelector("img")?.getAttribute("src") || "";
    const dataElement = div.querySelector(".inmate_data");
    const name = getInmateName(dataElement);
    const dataKeys = getDataKeys(dataElement);
    const dataVals = getDataVals(dataElement);
    const inmate = buildInmateObject(name, src, dataKeys, dataVals);
    if (isInDateRange(inmate.booking_date)) {
      inmates.push(inmate);
    }
  }
  return inmates;
}
function getDOM(htmlString) {
  const dom = new JSDOM(htmlString);
  return dom.window.document;
}
function buildInmateObject(name, src, dataKeys, dataVals) {
  const inmate = {
    name,
    img: src || "",
    so_number: "",
    booking_number: "",
    booking_date: "",
    release_date: void 0,
    charges: [],
    bond: ""
  };
  for (const key of dataKeys) {
    inmate[key] = dataVals[dataKeys.indexOf(key)];
  }
  if (typeof inmate.charges === "string") {
    inmate.charges = [inmate.charges];
  }
  inmate.charges = inmate.charges.map((charge) => charge.replace(/^[0-9]{8}\s/g, ""));
  inmate.booking_date = inmate.booking_date.replace(" - ", " ");
  return inmate;
}
function getDataVals(dataElement) {
  const dataVals = Array.from(
    dataElement.querySelectorAll(".inmate_data_content")
  ).map((el) => el.querySelector(".text2")?.innerHTML).map((str) => str?.includes("<br>") ? str.split("<br>") : str);
  return dataVals;
}
function getDataKeys(dataElement) {
  const dataKeys = Array.from(
    dataElement.querySelectorAll(".inmate_data_bold")
  ).map(
    (el) => el.innerHTML.replaceAll("	", "").replaceAll("\n", "").replace(" #", " Number").toLowerCase().replace(" ", "_").replace(":", "")
  );
  return dataKeys;
}
function getInmateName(dataElement) {
  const name = dataElement.querySelector(".ptitles").innerHTML.trim().toLowerCase().split(", ").map((s) => s.charAt(0).toUpperCase() + s.slice(1)).reverse().join(" ") || "";
  return name;
}
function isInDateRange(dateString) {
  const now = new Date();
  let dayRange = 1;
  if (now.getDay() === 1) {
    dayRange = 3;
  }
  const bookingDateTime = new Date(Date.parse(dateString));
  const maxDateTime = new Date();
  maxDateTime.setHours(7);
  maxDateTime.setMinutes(0);
  maxDateTime.setMilliseconds(0);
  const minDateTime = new Date();
  minDateTime.setDate(minDateTime.getDate() - dayRange);
  minDateTime.setHours(6);
  minDateTime.setMinutes(45);
  minDateTime.setMilliseconds(0);
  return bookingDateTime >= minDateTime && bookingDateTime <= maxDateTime;
}
function getCharges(inmates) {
  const charges = [];
  let chargesMap = /* @__PURE__ */ new Map();
  for (const inmate of inmates) {
    for (const charge of inmate.charges) {
      if (chargesMap.has(charge)) {
        chargesMap.set(charge, chargesMap.get(charge) + 1);
      } else {
        chargesMap.set(charge, 1);
      }
      chargesMap = new Map([...chargesMap.entries()].sort((a, b) => b[1] - a[1]));
    }
  }
  for (const key of chargesMap.keys()) {
    charges.push(`${key}: ${chargesMap.get(key)}`);
  }
  return charges;
}
function parseCharges(charges) {
  const reg = /^\**[A-Z]{3}\*/g;
  return charges.map((charge) => {
    const codes = charge.match(reg) || [];
    const upgradeCode = codes[0];
    if (upgradeCode !== void 0) {
      const expanded = chargeMap.get(upgradeCode.replaceAll("*", ""));
      charge = charge.replace(upgradeCode, "(" + expanded + ") ");
    }
    return charge;
  });
}
async function parse(current, released) {
  const currentInmatesDocument = getDOM(current);
  const releasedInmatesDocument = getDOM(released);
  const currentInmatesData = getInmatesData(currentInmatesDocument);
  const releasedInmatesData = getInmatesData(releasedInmatesDocument);
  const inmates = [...currentInmatesData, ...releasedInmatesData].sort(
    (a, b) => new Date(b.booking_date).getTime() - new Date(a.booking_date).getTime()
  );
  let allCharges = getCharges(inmates);
  allCharges = parseCharges(allCharges);
  const isMonday = new Date().getDay() === 1 ? true : false;
  const inmateHTML = templateInmateList(inmates);
  const chargesHTML = templateChargeList(allCharges);
  const template = `${templateDescription(isMonday ? 72 : 24, inmates.length)}

${chargesHTML}

${inmateHTML}

${templateDisclaimer}`;
  return template;
}
const currentUrl = "https://www.tomgreencountysheriff.org/roster.php";
const releasedUrl = "https://www.tomgreencountysheriff.org/roster.php?released=1";
const actions = {
  default: async (event) => {
    console.log(event);
  }
};
const load = async ({ fetch, params }) => {
  const currentHtml = await getInmatesString(currentUrl, fetch);
  const releasedHtml = await getInmatesString(releasedUrl, fetch);
  const templateData = await parse(currentHtml, releasedHtml);
  const codeData = await getHighlightedCode(templateData);
  return {
    templateData,
    codeData
  };
};
async function getInmatesString(url, fetch) {
  let responseString;
  try {
    const res = await fetch(url);
    responseString = await res.text();
  } catch (error) {
    responseString = "";
    console.error(error);
  }
  return responseString;
}
async function getHighlightedCode(templateData) {
  const highlighter = await shiki.getHighlighter({ theme: "nord" });
  const codeTemp = `${templateData}`;
  const html = highlighter.codeToHtml(codeTemp, { lang: "html" });
  return html;
}
export {
  actions,
  load
};
