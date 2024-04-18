'use client'

// CSS
import '@fortawesome/fontawesome-svg-core/styles.css';
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "./globals.css";
import { config } from '@fortawesome/fontawesome-svg-core';
config.autoAddCss = false;

// NextJs
import Link from "next/link";
import { Inter } from "next/font/google";
import { usePathname } from 'next/navigation';

// PrimeReact
import { PrimeReactProvider } from 'primereact/api';
import { BreadCrumb } from 'primereact/breadcrumb';

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const pathlist = usePathname().split('/')
  const breadcrumbItems = []
  for (let i = 0; i < pathlist.length; i++) {
    if (pathlist[i] === "") continue
    breadcrumbItems.push({
      template: () => <Link href={"/" + pathlist.slice(1, i + 1).join("/")}>{pathlist[i][0].toUpperCase() + pathlist[i].slice(1)}</Link>
    })
  }

  return (
    <PrimeReactProvider>
      <html lang="fr">
      <head>
            <script
                dangerouslySetInnerHTML={{
                  __html: `
                    const style = document.createElement('style')
                    style.innerHTML = '@layer tailwind-base, primereact, tailwind-utilities;'
                    style.setAttribute('type', 'text/css')
                    document.querySelector('head').prepend(style)
                  `,
                }}
              />
      </head>
        <body className={`h-screen w-full flex flex-row ${inter.className}`}>
          <aside className="h-full w-64 flex flex-col p-8 content-center gap-8 bg-nay-white">
            <h1><Link href="/">Hameau du Nay</Link></h1>
            <div className="">
              <h2><Link href="/">Accueil</Link></h2>
              <h2><Link href="/quote">Devis</Link></h2>
              <ul className="pl-3">
                <li><Link href="/quote/new">Nouveau devis</Link></li>
                <li><Link href="/quote/new">Devis en cours</Link></li>
                <li><Link href="/quote/new">Devis perdus</Link></li>
              </ul>
              <h2>Tarifs</h2>
              <ul className="pl-3">
                <li>Tarif Généraux</li>
                <li>Accords</li>
                <li>
                  <ul className="pl-3">
                    <li>Nouvel accord</li>
                    <li>Accord 1</li>
                    <li>Accord 2</li>
                    <li>Accord 3</li>
                    <li>Accord 4</li>
                  </ul>
                </li>
              </ul>
            </div>
          </aside>
          <main className="h-screen w-full flex flex-col">
            <header className="m-5">
              <h1><BreadCrumb model={breadcrumbItems} home={{ label: 'Hameau du Nay', url: '/' }} /></h1>
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
