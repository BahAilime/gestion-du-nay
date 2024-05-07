'use client'
import ClientForm from "@/src/components/ClientForm";
import { Suspense } from "react";
import Loading from "@/src/components/Loading";

export default function Home() {
    return <Suspense fallback={<Loading/>}><ClientForm/></Suspense>
  }