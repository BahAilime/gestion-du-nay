'use client'
import Database from "tauri-plugin-sql-api";
import { useEffect, useState } from 'react';

export default function Home() {

    useEffect(() => {
      async function fetchData() {
        try {
            const db = await Database.load("sqlite:nay.db")
            const hmm = await db.select("SELECT id_cli FROM client")
            console.log(hmm)
        } catch (e) {
            console.error(e);
        }
    };
    fetchData();
    }, [])

    return (
      <>
        <h1>Nouveau devis ?????</h1>
        <h1>Liste des devis en cours</h1>
        <p>NOTE: trier par date de dernière visite</p>
        <div>
            <p>Devis 1</p>
            <p>Devis 2</p>
            <p>Devis 3</p>
            <p>Devis 4</p>
            <p>Devis 5</p>
        </div>
      </>
    );
  }