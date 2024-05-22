'use client'
// import Image from "next/image";

import { Knob } from 'primereact/knob';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import Loading from '@/src/components/Loading';
import ReorderableParamsRow from '@/src/components/ReorderableParamsRow';
import ReorderableParams from '@/src/components/ReorderableParams';
import CustomLine from '@/src/components/CustomLine';

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
        {key:"sdrkuvgnsj", label: "Enfants", qte: 22},
        {key:"vseffiubgv", label: "Ado", qte: 25},
        {key:"ehjbvsjhtv", label: "Adulte", qte: 7},
        {key:"klkjbhvgvs", label: "VIEUX", qte: 7}
        ]} onChange={(x) => console.log(x)}/>
      <CustomLine id='1' label='Hejjj' prixHt={12} tvaBase='20' remiseBase={10} qteBase={5} />
    </>
  );
}
