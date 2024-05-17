# Hameau du Nay Gestion

[En anglais / in english](README.md)

## Attention

> [!WARNING]  
> ❗Ce projet est extrèmement spécifique à l'[entreprise](https://www.hameau-du-nay.fr) dans laquelle je suis actuellement et n'est pas une solution "plug and play" pour d'autres stuctures. Je mets a disposition mon code afin que d'autres puissent profiter des conaissances et compétences que j'ai aquise tout au long du développement de cette application❗

## Le cntexte du projet

De 2003 à 2024, la gestion (des dossiers, des clients, des devis, factures, etc...) au [centre d'hébergement du Hameau du Nay](https://www.hameau-du-nay.fr) était faite via des tableaux Excel et beaucoup de "copier-coller", ma tâche était

- de créer un logiciel central pour réduire le nombres de tâches répetitives
- pouvoir générer automatiquement les statistiques en se basant sur les données

## Lancer le projet

1. Installer [Node.js/npm](https://nodejs.org/en/download) et [Rust](https://www.rust-lang.org/tools/install)

1. Installer les dépendances

    ```bash
    npm install
    ```

1. Remplir les informations de connexion à Firebase depuis la [firebase console](https://console.firebase.google.com)
    dans `.env.local` en suivant le modèle `.env`

1. Lancer le serveur de developpement

    ```bash
    npm run tauri dev
    ```

1. Faire le build de production

    ```bash
    npm run tauri build
    ```

## Pour vous aider pendant le développement

J'ai créé quelques composants et fait des ajustements pour vous aider dans le processus de développement.

1. Dans MenuSection.tsx, vous pouvez définir la prop "type" sur DEV ou WIP lorsque vous travaillez sur le développement, et sur PROD lorsque vous êtes prêt.
    - DEV signifie qu'il est uniquement utilisé en développement et ne sera jamais public.
    - WIP signifie que la route sera éventuellement publique, mais qu'elle n'est pas encore prête.
    - PROD signifie que la route est prête et sera accessible dans la version de production.

    - ```html
        <MenuSection text="Tests" type="DEV">
            <MenuItem text="Carte" url="/test/map"/>
            <MenuItem text="Carte + hook" url="/test/maphook"/>
        </MenuSection>
        ```

1. Le composant Debug et ses enfants ne seront pas rendus dans l'environnement de production.

## Notes d'Émilia

Salut !
Ce logiciel fonctionne actuellement avec Firebase comme backend mais le plan à terme serait de le rendre 100% indépendant, gratuit et open-source. Je pense que si je suis celle qui plannifiera la migration entre firebase et autrechose, ca sera surement vers [PocketBase](https://pocketbase.io), hébergé sur [PocketHost.io](https://pockethost.io) pendant un temps puis sur un serveur local
