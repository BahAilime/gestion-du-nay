'use client'
import { Suspense } from "react";
import ClientEdit from "@/src/components/ClientEdit";
import Loading from "@/src/components/Loading";

export default function Home() {
    return <Suspense fallback={<Loading/>}><ClientEdit/></Suspense>
  }