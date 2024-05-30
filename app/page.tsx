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
      <h1>La page d'accueuil et les statistiques arrivent bientôt ! :D</h1>
    </>
  );
}
