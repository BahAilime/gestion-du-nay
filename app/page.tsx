'use client'
// import Image from "next/image";

import { Knob } from 'primereact/knob';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import Loading from '@/src/components/Loading';
        

export default function Home() {
  const [value, setValue] = useState(0);
  return (
    <>
      <h1>Accueil</h1>
      <Knob value={value} onChange={(e) => setValue(e.value)} />
      <FontAwesomeIcon icon={faEnvelope} />
      <Loading />
    </>
  );
}
