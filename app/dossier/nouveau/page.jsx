'use client'
import { useState } from "react";
import useMultiState from "../../../src/hooks/useMultiState";
import FormInput from "../../../src/components/FormInput";
import { Button } from "primereact/button";
import { Card } from 'primereact/card';
import { TabMenu } from 'primereact/tabmenu';
import { Dropdown } from 'primereact/dropdown';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faHeart } from '@fortawesome/free-solid-svg-icons';

export default function Home() {
  const [data, addState, getState, deleteState] = useMultiState();

  // Tabs des nouveau client / deja venu
  const [activeIndex, setActiveIndex] = useState(0);
  const items = [
    { label: 'Nouveau client', icon: <FontAwesomeIcon icon={faPlus} className="mx-2"/> },
    { label: 'Déja venu', icon: <FontAwesomeIcon icon={faHeart} className="mx-2"/>},
  ];

  // TODO: Remplacer par un call d'api pour avoir les clients
  const [selectedCli, setSelectedCli] = useState(null);
  const clients = [
      { name: 'Client 1', code: 'C1' },
      { name: 'Client 2', code: 'C2' },
      { name: 'Client 3', code: 'C3' },
  ];

  return (
    <>
      <Card title="Client">
        <TabMenu model={items} activeIndex={activeIndex} onTabChange={(e) => setActiveIndex(e.index)}/>

        {activeIndex === 0 && <>
          <FormInput label="Nom du client" name="name" onChange={(name) => addState("username", name)}/>
          <FormInput label="Nom du responsable" name="resp" onChange={(resp) => addState("responsable", resp)}/>
          <FormInput label="Email" name="email" onChange={(email) => addState("email", email)}  keyfilter="email"/>
          <Button onClick={() => deleteState("username")}>Woush ! :D</Button>
        </>}

        {activeIndex === 1 && <>
          <Dropdown value={selectedCli} onChange={(e) => setSelectedCli(e.value)} options={clients} optionLabel="name" 
                placeholder="Sélectionne un client" className="w-full md:w-14rem" />
        </>
        }
      </Card>
    </>
  );
}
