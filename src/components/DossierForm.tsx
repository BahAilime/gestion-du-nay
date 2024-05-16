import { useState } from "react";
import { Card } from 'primereact/card';
import { TabMenu } from 'primereact/tabmenu';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faHeart } from '@fortawesome/free-solid-svg-icons';
import ClientForm from "./ClientForm";
import ClientDropDown from "./ClientDropDown";
import ReorderableParams from "./ReorderableParams";

export default function DossierForm() {
    const [activeIndex, setActiveIndex] = useState(0);
    const items = [
        { label: 'Nouveau client', icon: <FontAwesomeIcon icon={faPlus} className="mr-2" /> },
        { label: 'Déja venu', icon: <FontAwesomeIcon icon={faHeart} className="mr-2" /> },
    ];

    const [client, setClient] = useState();
    const [nuit, setNuit] = useState({});

    return (
        <div className="flex flex-wrap gap-2">
            <Card title="Client" className="w-fit h-fit">
                <TabMenu model={items} activeIndex={activeIndex} onTabChange={(e) => setActiveIndex(e.index)} />
                {activeIndex === 0 && <ClientForm onChange={(clientInfos) => setClient(clientInfos)} />}
                {activeIndex === 1 && <ClientDropDown onChange={(client) => setClient(client)} />}
            </Card>

            <Card title="Nuités" className="w-fit h-fit">
                <ReorderableParams rows={[
                    {key: "enfant-key", label: "Enfant", minAge: 0, maxAge: 17 },
                    {key: "adulte-key", label: "Adulte", minAge: 18, maxAge: 99 },
                    ]} onChange={(nuit) => setNuit(nuit)} />
            </Card>

            <Card title="INFOS">
                {JSON.stringify(client)}
                {JSON.stringify(nuit)}
            </Card>
        </div>
    );
}