'use client'
import { useState } from "react";
import { Card } from 'primereact/card';
import { TabMenu } from 'primereact/tabmenu';
import { Dropdown } from 'primereact/dropdown';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faHeart } from '@fortawesome/free-solid-svg-icons';
import ClientForm from "../../../src/components/ClientForm";

export default function Home() {
  // Tabs des nouveau client / deja venu
  const [activeIndex, setActiveIndex] = useState(0);
  const items = [
    { label: 'Nouveau client', icon: <FontAwesomeIcon icon={faPlus} className="mr-2"/> },
    { label: 'Déja venu', icon: <FontAwesomeIcon icon={faHeart} className="mr-2"/>},
  ];

  // TODO: Remplacer par un call d'api pour avoir les clients
  const [selectedCli, setSelectedCli] = useState(null);
  const groupedClients = [
    {
      label: 'Groupe',
      code: 'GRP',
      items: [
          { label: 'Groupe1', value: 'jcnjd' },
          { label: 'Groupe2', value: 'juhuhbj' },
      ]
    },
    {
        label: 'Privé',
        code: 'PV',
        items: [
            { label: 'PV1', value: 'Berlin' },
            { label: 'PV2', value: 'Frankfurt' },
        ]
    }
  ]

  function groupedItemTemplate (option) {
    return (
      <p className="font-bold">{option.label}</p>
    );
};

  const [data, setData] = useState({});

  return (
    <>
      <Card title="Client" className="min-w-1/2">
        <TabMenu model={items} activeIndex={activeIndex} onTabChange={(e) => setActiveIndex(e.index)}/>
        {activeIndex === 0 && <ClientForm onChange={(x) => setData(x)} dataImport={{nom_cli: "Euuhhh"}}/>}
        {activeIndex === 1 && <>
          <Dropdown
            value={selectedCli}
            onChange={(e) => setSelectedCli(e.value)}
            options={groupedClients}
            optionLabel="label" 
            optionGroupLabel="label"
            optionGroupChildren="items"
            optionGroupTemplate={groupedItemTemplate}
            className="w-full my-3"
            placeholder="Selectionne un client"
            filter
          />
        </>
        }
      </Card>
    </>
  );
}
