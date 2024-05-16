'use client'
// import Image from "next/image";

import { Knob } from 'primereact/knob';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import Loading from '@/src/components/Loading';
import ReorderableParamsRow from '@/src/components/ReorderableParamsRow';
import ReorderableParams from '@/src/components/ReorderableParams';

export default function Home() {
  const [value, setValue] = useState(0);
  return (
    <>
      <h1>Accueil</h1>
      <Knob value={value} onChange={(e) => setValue(e.value)} />
      <FontAwesomeIcon icon={faEnvelope} />
      <Loading />
      {/* <div className='max-w-96'> */}
        {/* <ReorderableParamsRow label="Enfants" unit="ans" minVal={4} maxVal={7} qteBase={14} onChange={(x) => console.log(x)}/> */}
      {/* </div> */}
      <ReorderableParams rows={[
        {key:"1", label: "Enfants", minAge: 0, maxAge: 12, qte: 22},
        {key:"2", label: "Ado", minAge: 13, maxAge: 17, qte: 25},
        {key:"3", label: "Adulte", minAge: 18, maxAge: 99, qte: 7}
        ]} onChange={(x) => console.log(x)}/>
    </>
  );
}
