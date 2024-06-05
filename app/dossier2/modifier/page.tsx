'use client'
import { Suspense } from "react";
import DossierEdit from "@/src/components/DossierEdit";
import Loading from "@/src/components/Loading";

export default function Home() {
    return <Suspense fallback={<Loading/>}><h1>WIP</h1></Suspense>
  }