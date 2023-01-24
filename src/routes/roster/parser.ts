import jsdom from 'jsdom';

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
chargeMap.set('RPR', 'RELEASED ON PERSONAL RECOGNIZANCE');
chargeMap.set('GOB', 'GO OFF BOND');
chargeMap.set('GJI', 'GRAND JURY INDICTMENT');
chargeMap.set('FTA', 'FAILURE TO APPEAR');
chargeMap.set('VPTA', 'VIOLATION OF PROMISE TO APPEAR');
chargeMap.set('MTR', 'MOTION TO REVOKE');
chargeMap.set('CPF', 'CAPIAS PRO FINE');
chargeMap.set('MISC', 'MISC');
chargeMap.set('VOP', 'VIOLATION OF PAROLE');

export type Inmate = InmateMap<InmateData>;

function getInmatesData(document: HTMLDocument | null): Inmate[] {
   const inmateDivs = <Element[]><unknown>document?.querySelectorAll('.inmate_div');
   const inmates: Inmate[] = [];

   for (const div of inmateDivs) {
      const src: string = 'https://www.tomgreencountysheriff.org/' + div?.querySelector('img')?.getAttribute('src') || '';
      const dataElement: Element = div.querySelector('.inmate_data')!;
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

function getDOM(htmlString: string): HTMLDocument {
   const document: HTMLDocument = new DOMParser().parseFromString(htmlString, 'text/html')!;
   return document;
}

function buildInmateObject(name: string, src: string, dataKeys: string[], dataVals: string[]): Inmate {
   const inmate: Inmate = {
      name,
      img: src || '',
      so_number: '',
      booking_number: '',
      booking_date: '',
      release_date: undefined,
      charges: [],
      bond: ''
   };

   for (const key of dataKeys) {
      inmate[key] = dataVals[dataKeys.indexOf(key)];
   }

   if (typeof inmate.charges === 'string') {
      inmate.charges = [inmate.charges];
   }

   inmate.charges = inmate.charges.map((charge: string): string => charge.replace(/^[0-9]{8}\s/g, ''));
   inmate.booking_date = inmate.booking_date.replace(' - ', ' ');
   return inmate;
}

function getDataVals(dataElement: Element): string[] {
   const dataVals = Array.from(
      <Element[]><unknown>dataElement
         .querySelectorAll('.inmate_data_content'))
      .map((el) => el.querySelector('.text2')?.innerHTML)
      .map((str) => str?.includes('<br>') ? str.split('<br>') : str);
   return dataVals;
}

function getDataKeys(dataElement: Element): string[] {
   const dataKeys: string[] = Array.from(
      <Element[]><unknown>dataElement.querySelectorAll('.inmate_data_bold')
   ).map(
      (el) => el.innerText
         .replaceAll('\t', '')
         .replaceAll('\n', '')
         .replace(' #', ' Number')
         .toLowerCase()
         .replace(' ', '_')
         .replace(':', '')
   );
   return dataKeys;
}

function getInmateName(dataElement: Element): string {
   const name: string = dataElement?.querySelector('.ptitles')?.innerText
      .trim()
      .toLowerCase()
      .split(', ')
      .map((s: string) => s.charAt(0).toUpperCase() + s.slice(1))
      .reverse()
      .join(' ') || '';
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
   for (const inmate of inmates) {
      for (const charge of inmate.charges) {
         charges.push(charge);
      }
   }
   return charges;
}

function parseCharges(charges: string[]): string[] {
   const reg = /^\**[A-Z]{3}\*/g;
   return charges.map((charge) => {
      const codes = charge.match(reg) || [];
      const upgradeCode = codes[0];
      if (upgradeCode !== undefined) {
         const expanded = chargeMap.get(upgradeCode.replaceAll('*', ''));
         charge = charge.replace(upgradeCode, '(' + expanded + ') ');
      }
      return charge;
   });
}

async function sendMail(template: string) {
   console.log('Sending mail...');
   // const transporter = nodemailer.createTransport({
   //   host: 'smtp.dreamhost.com',
   //   port: 465,
   //   secure: true,
   //   auth: {
   //     user: 'hello@newsdocs.org',
   //     pass: '?!Jcc06181984!?'
   //   },
   //   tls: {
   //     requestCert: false,
   //     rejectUnauthorized: false,
   //   },
   // });

   const message = {
      from: 'hello@newsdocs.org',
      to: ['jcaldwell@klst.net', 'awade@klst.net'],
      subject: 'Your daily Jail Logs template',
      content: `1. Copy the code between the '-----'
 2. Start a new draft in WP
 3. Switch to the code editor (Ctrl+Shift+Alt+M)
 4. Paste the template into the code editor
 5. Exit the code editor (Ctrl+Shift+Alt+M)
 6. Double-check the article, make sure everything looks good and meets standards.
 7. Publish, push etc.
 --------
 ${template}
 --------
 `
   };

   // transporter.sendMail(message, (err, info) => {
   //   if (err) {
   //     console.log('Error sending message: ', err);
   //   } else {
   //     console.log('Mail sent: ', info);
   //   }
   // });

   // transporter.verify(function (error, success) {
   //   if (error) {
   //     console.log('transporter error: ', error);
   //   } else {
   //     console.log("Server is ready to take our messages");
   //   }
   // });

   const client = new SMTPClient({
      connection: {
         hostname: 'smtp.dreamhost.com',
         port: 465,
         tls: true,
         auth: {
            username: 'hello@newsdocs.org',
            password: '?!Jcc06181984!?'
         }
      }
   });

   await client.send(message);

   // await client.send({
   //   from: 'hello@newsdocs.org',
   //   to: ['jcaldwell@klst.net', 'nemo.omen@gmail.com'],
   //   subject: 'Your daily jail logs template is ready!',
   //   content: 'Just copy all of the code' + template,
   // attachments: [
   //   {
   //     contentType: 'text/plain; charset=us-ascii',
   //     filename: 'jaillog.txt',
   //     encoding: 'text',
   //     content: template,
   //   }
   // ]
   // });

   await client.close();
}