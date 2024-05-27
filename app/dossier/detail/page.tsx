"use client"
import DossierDetail from "@/src/components/DossierDetail";
import Loading from "@/src/components/Loading";
import { Card } from "primereact/card";
import { Suspense } from "react";

export default function Home() {
    return (
    <Suspense fallback={<Card className="flex h-full w-full justify-center items-center"><Loading text={"Chargement ds informations du dossier"} /></Card>}>
        <DossierDetail />
    </Suspense>);
}