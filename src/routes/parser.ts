import {
  templateChargeList,
  templateDescription,
  templateDisclaimer,
  templateInmateList,
  templateStyle,
} from "./templates";

import jsdom from "jsdom";
const { JSDOM } = jsdom;

export type InmateMap<T> = {
  [key: string]: unknown;
};

export type InmateDate = string;

export type InmateData = {
  name: string;
  img: string;
  so_number?: string;
  booking_number?: string;
  release_date?: InmateDate;
  booking_date?: InmateDate;
  charges?: string[];
  bond?: string;
};

const chargeMap: Map<string, string> = new Map();
chargeMap.set("RPR", "RELEASED ON PERSONAL RECOGNIZANCE");
chargeMap.set("GOB", "GO OFF BOND");
chargeMap.set("GJI", "GRAND JURY INDICTMENT");
chargeMap.set("FTA", "FAILURE TO APPEAR");
chargeMap.set("VPTA", "VIOLATION OF PROMISE TO APPEAR");
chargeMap.set("MTR", "MOTION TO REVOKE");
chargeMap.set("CPF", "CAPIAS PRO FINE");
chargeMap.set("MISC", "MISC");
chargeMap.set("VOP", "VIOLATION OF PAROLE");

export type Inmate = InmateMap<InmateData>;

function getInmatesData(document: Document | null): Inmate[] {
  const inmateDivs = <HTMLDivElement[]> <unknown> document?.querySelectorAll(
    ".inmate_div",
  );
  const inmates: Inmate[] = [];

  for (const div of inmateDivs) {
    const src: string = "https://www.tomgreencountysheriff.org/" +
        div?.querySelector("img")?.getAttribute("src") || "";
    const dataElement: HTMLDivElement = div.querySelector(".inmate_data")!;
    const name: string = getInmateName(dataElement);
    const dataKeys: string[] = getDataKeys(dataElement);
    const dataVals: string[] = getDataVals(dataElement);
    const inmate: Inmate = buildInmateObject(name, src, dataKeys, dataVals);

    if (isInDateRange(inmate.booking_date as string)) {
      inmates.push(inmate);
    }
  }

  return inmates;
}

function getDOM(htmlString: string): Document {
  const dom = new JSDOM(htmlString);
  return dom.window.document;
}

function buildInmateObject(
  name: string,
  src: string,
  dataKeys: string[],
  dataVals: string[],
): Inmate {
  const inmate: Inmate = {
    name,
    img: src || "",
    so_number: "",
    booking_number: "",
    booking_date: "",
    release_date: undefined,
    charges: [],
    bond: "",
  };

  for (const key of dataKeys) {
    inmate[key] = dataVals[dataKeys.indexOf(key)];
  }

  if (typeof inmate.charges === "string") {
    inmate.charges = [inmate.charges];
  }

  inmate.charges = inmate.charges.map((charge: string): string =>
    charge.replace(/^[0-9]{8}\s/g, "")
  );
  inmate.booking_date = inmate.booking_date.replace(" - ", " ");
  return inmate;
}

function getDataVals(dataElement: Element): string[] {
  const dataVals = Array.from(
    <Element[]> <unknown> dataElement
      .querySelectorAll(".inmate_data_content"),
  )
    .map((el) => el.querySelector(".text2")?.innerHTML)
    .map((str) => str?.includes("<br>") ? str.split("<br>") : str);
  return dataVals;
}

function getDataKeys(dataElement: HTMLDivElement): string[] {
  const dataKeys: string[] = Array.from(
    <HTMLDivElement[]> <unknown> dataElement.querySelectorAll(
      ".inmate_data_bold",
    ),
  ).map(
    (el) =>
      el.innerHTML
        .replaceAll("\t", "")
        .replaceAll("\n", "")
        .replace(" #", " Number")
        .toLowerCase()
        .replace(" ", "_")
        .replace(":", ""),
  );
  return dataKeys;
}

function getInmateName(dataElement: HTMLDivElement): string {
  const name: string = dataElement!.querySelector(".ptitles")!.innerHTML
    .trim()
    .toLowerCase()
    .split(", ")
    .map((s: string) => s.charAt(0).toUpperCase() + s.slice(1))
    .reverse()
    .join(" ") || "";
  return name;
}

/**
 * Checks whether a given date string is within a valid range
 * for daily jail logs. Tuesday - Sunday will be valid within 24 hours,
 * Monday will be valid within 72 hours
 * @param dateString
 * @returns
 */
function isInDateRange(dateString: string): boolean {
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
  return (bookingDateTime >= minDateTime) && (bookingDateTime <= maxDateTime);
}

function getCharges(inmates: Inmate[]): string[] {
  const charges: string[] = [];
  let chargesMap: Map<string, number> = new Map();

  for (const inmate of inmates) {
    for (const charge of inmate.charges) {
      if (chargesMap.has(charge)) {
        chargesMap.set(charge, chargesMap.get(charge)! + 1);
      } else {
        chargesMap.set(charge, 1);
      }

      chargesMap = new Map(
        [...chargesMap.entries()].sort((a, b) => b[1] - a[1]),
      );
    }
  }

  for (const key of chargesMap.keys()) {
    charges.push(`${key}: ${chargesMap.get(key)}`);
  }

  return charges;
}

function parseCharges(charges: string[]): string[] {
  const reg = /^\**[A-Z]{3}\*/g;
  return charges.map((charge) => {
    const codes = charge.match(reg) || [];
    const upgradeCode = codes[0];
    if (upgradeCode !== undefined) {
      const expanded = chargeMap.get(upgradeCode.replaceAll("*", ""));
      charge = charge.replace(upgradeCode, "(" + expanded + ") ");
    }
    return charge;
  });
}

export async function parse(current: string, released: string) {
  const currentInmatesDocument: Document | null = getDOM(current);
  const releasedInmatesDocument: Document | null = getDOM(released);

  const currentInmatesData: Inmate[] = getInmatesData(currentInmatesDocument);
  const releasedInmatesData: Inmate[] = getInmatesData(releasedInmatesDocument);

  const inmates: Inmate[] = [...currentInmatesData, ...releasedInmatesData]
    .sort(
      (a, b) =>
        new Date(b.booking_date as string).getTime() -
        new Date(a.booking_date as string).getTime(),
    );

  let allCharges = getCharges(inmates);
  allCharges = parseCharges(allCharges);

  const isMonday = new Date().getDay() === 1 ? true : false;
  const inmateHTML = templateInmateList(inmates);
  const chargesHTML = templateChargeList(allCharges);
  const shortDateOpts: DateTimeFormatOptions = {
    weekday: "long",
    month: "long",
    day: "numeric",
  };

  const dateOpts: DateTimeFormatOptions = {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  };
  const dayBefore = new Date();
  const today = new Date().toLocaleDateString("en-US", dateOpts);
  dayBefore.setDate(dayBefore.getDate() - (isMonday ? 3 : 1));
  const dateString = `From 7 a.m. on ${
    dayBefore.toLocaleDateString("en-US", shortDateOpts)
  }, to 7 a.m. ${today}`;
  const template = `${templateDescription(dateString, inmates.length)}

${chargesHTML}

${inmateHTML}

${templateDisclaimer}`;

  return template;
  // Deno.writeTextFile('./jaillog.html', template);
  // sendMail(template);
}
