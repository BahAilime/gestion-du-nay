# Hameau du Nay Gestion

[En francais / in french](README-FR.md)

## Warning

> [!WARNING]  
> ❗This project is extremely specific to the [company](https://www.hameau-du-nay.fr) I am currently working for and is not a "plug and play" solution for other structures. I am making my code available so that others can benefit from the knowledge and skills I have acquired throughout the development of this application.❗

## The project context

From 2003 to 2024, management (of files, clients, quotes, invoices, etc.) at the [accommodation center of Hameau du Nay](https://www.hameau-du-nay.fr) was done through Excel spreadsheets and a lot of "copy-paste" actions. My task was:

- to create a central software to reduce the number of repetitive tasks
- to be able to automatically generate statistics based on the data

## Run the projet

1. Install [Node.js/npm](https://nodejs.org/en/download) and [Rust](https://www.rust-lang.org/tools/install).

2. Install dependencies:

    ```bash
    npm install
    ```

3. Fill in the Firebase connection information from the [Firebase console](https://console.firebase.google.com) in `.env.local` following the `.env` template.

4. Launch the development server:

    ```bash
    npm run tauri dev
    ```

5. Build for production:

    ```bash
    npm run tauri build
    ```

## Émilia's note

Hey there!
Currently, this software operates with Firebase as its backend, but the long-term plan is to make it 100% independent, free, and open-source. I believe that if I am the one planning the migration from Firebase to something else, it will likely be towards [PocketBase](https://pocketbase.io), hosted on [PocketHost.io](https://pockethost.io) for a while, and then eventually on a local server.
