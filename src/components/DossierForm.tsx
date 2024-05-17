import { useState } from "react";
import { Card } from 'primereact/card';
import { TabMenu } from 'primereact/tabmenu';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faHeart } from '@fortawesome/free-solid-svg-icons';
import ClientForm from "./ClientForm";
import ClientDropDown from "./ClientDropDown";
import ReorderableParams from "./ReorderableParams";
import Debug from "./Debug";
import { InputNumber } from "primereact/inputnumber";
import { ToggleButton } from "primereact/togglebutton";

export default function DossierForm() {
    const [activeIndex, setActiveIndex] = useState(0);
    const items = [
        { label: 'Nouveau client', icon: <FontAwesomeIcon icon={faPlus} className="mr-2" /> },
        { label: 'Déja venu', icon: <FontAwesomeIcon icon={faHeart} className="mr-2" /> },
    ];

    const [client, setClient] = useState();
    const [nuit, setNuit] = useState({});
    const [drap, setDrap] = useState(0);
    const [repas, setRepas] = useState<{servi:boolean, tranches?: any}>({servi: false});

    return (
        <div className="flex flex-wrap gap-2">
            <Card title="Client" className="w-fit h-fit">
                <TabMenu model={items} activeIndex={activeIndex} onTabChange={(e) => setActiveIndex(e.index)} />
                {activeIndex === 0 && <ClientForm onChange={(clientInfos) => setClient(clientInfos)} />}
                {activeIndex === 1 && <ClientDropDown onChange={(client) => setClient(client)} />}
            </Card>

            <Card title="Hebergement" className="w-fit h-fit">
                <ReorderableParams rows={[
                    {key: "enfant-key", label: "Enfant" },
                    {key: "adulte-key", label: "Adulte" },
                    ]} onChange={(nuit) => setNuit(nuit)} />
                <div className="flex flex-row gap-2 items-center my-2">
                    Location de drap:
                    <InputNumber value={drap} onChange={(e) => {if (e.value) setDrap(e.value)}} />
                </div>
            </Card>

            <Card title="Restauration">
                <div className="flex flex-row gap-2 items-center my-2">
                    Repas et petit dej servi:
                    <ToggleButton className="servi" checked={repas.servi} onChange={(e) => setRepas({...repas, servi: e.value})} onLabel="Oui" offLabel="Non" />
                </div>
            </Card>

            <Card title="Activités">
            </Card>

            <Card title="Autre">
            </Card>

            <Debug>
                <Card title="INFOS">
                    <h1>
                        Client:
                        {JSON.stringify(client)}
                    </h1>
                    <h1>
                        Nuit:
                        {JSON.stringify(nuit)}
                    </h1>
                    <h1>
                        Repas:
                        {JSON.stringify(repas)}
                    </h1>
                </Card>
            </Debug>
        </div>
    );
}