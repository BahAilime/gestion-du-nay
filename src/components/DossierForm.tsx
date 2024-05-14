import { useState } from "react";
import { Card } from 'primereact/card';
import { TabMenu } from 'primereact/tabmenu';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faHeart } from '@fortawesome/free-solid-svg-icons';
import ClientForm from "./ClientForm";
import ClientDropDown from "./ClientDropDown";

export default function DossierForm() {
    const [activeIndex, setActiveIndex] = useState(0);
    const items = [
        { label: 'Nouveau client', icon: <FontAwesomeIcon icon={faPlus} className="mr-2" /> },
        { label: 'Déja venu', icon: <FontAwesomeIcon icon={faHeart} className="mr-2" /> },
    ];

    const [data, setData] = useState({});

    return (
        <Card title="Client" className="min-w-1/2">
            <TabMenu model={items} activeIndex={activeIndex} onTabChange={(e) => setActiveIndex(e.index)} />
            {activeIndex === 0 && <ClientForm onChange={(clientInfos) => setData(clientInfos)} />}
            {activeIndex === 1 && <ClientDropDown onChange={(client) => setData(client)} />}
            {JSON.stringify(data)}
        </Card>
    );
}