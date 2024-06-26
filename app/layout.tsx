'use client'

// CSS
import "@fortawesome/fontawesome-svg-core/styles.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "./globals.css";
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;

// PrimeReact
import { PrimeReactProvider } from "primereact/api";

// Components
import BreadCrumb from "../src/components/BreadCrumb";
import Menu from "../src/components/Menu";
import Nay from "../src/components/NaySvg";

// i18n

import { locale, addLocale } from 'primereact/api';
addLocale('fr', {
  firstDayOfWeek: 1,
  dayNames: ['dimanche', 'lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi'],
  dayNamesShort: ['dim', 'lun', 'mar', 'mer', 'jeu', 'ven', 'sam'],
  dayNamesMin: ['DI', 'LU', 'MA', 'ME', 'JE', 'VE', 'SA'],
  monthNames: ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'aout', 'septembre', 'octobre', 'novembre', 'decembre'],
  monthNamesShort: ['jan', 'fev', 'mar', 'avr', 'mai', 'jui', 'juil', 'aou', 'sep', 'oct', 'nov', 'dec'],
  today: 'Aujourd\'hui',
  clear: 'Effacer',
});
locale('fr')

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
      <PrimeReactProvider>
        <html lang="fr">
        <head>
              <script
                  dangerouslySetInnerHTML={{
                    __html: `
                      const style = document.createElement("style")
                      style.innerHTML = "@layer tailwind-base, primereact, tailwind-utilities;"
                      style.setAttribute("type", "text/css")
                      document.querySelector("head").prepend(style)
                    `,
                  }}
                />
        </head>
          <body className={"h-screen w-full flex flex-row"}>
            <aside className="h-full flex flex-col p-8 content-center gap-3 bg-nay-white">
              <Nay
                className="w-16 mx-auto"
                // fill-nay-cyan-300
              />
              <Menu />
            </aside>
            <main className="h-screen w-full flex flex-col">
              <header className="p-4">
                <BreadCrumb />
              </header>
              <main className="h-full w-full bg-gray-200 p-4 overflow-y-scroll">
                {children}
              </main>
            </main>
          </body>
        </html>
      </PrimeReactProvider>
  );
}
