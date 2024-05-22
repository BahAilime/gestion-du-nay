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
import CustomLineGroup from "./CustomLineGroup";
import { Calendar } from "primereact/calendar";

// TODO: rendre ca configurable

export default function DossierForm() {
    const [activeIndex, setActiveIndex] = useState(0);
    const items = [
        { label: 'Nouveau client', icon: <FontAwesomeIcon icon={faPlus} className="mr-2" /> },
        { label: 'Déja venu', icon: <FontAwesomeIcon icon={faHeart} className="mr-2" /> },
    ];

    const [dates, setDates] = useState<{debut?: Date, fin?: Date}>({});
    const [client, setClient] = useState();
    const [nuit, setNuit] = useState({});
    const [drap, setDrap] = useState(0);
    const [repas, setRepas] = useState<{servi:boolean, tranches?: any}>({servi: true});
    const [activite, setActivite] = useState({});
    const [divers, setDivers] = useState({});

    return (
        <div className="grid 2xl:grid-cols-3 xl:grid-cols-2 grid-flow-dense gap-2">
            {activeIndex === 0 &&
            <Card title="Client" className="w-full h-full col-span-2 row-span-3">
                <TabMenu model={items} activeIndex={activeIndex} onTabChange={(e) => setActiveIndex(e.index)} />
                <ClientForm onChange={(clientInfos) => setClient(clientInfos)} />
            </Card>}

            {activeIndex === 1 &&
            <Card title="Client" className="w-full h-full col-span-1 row-span-1">
                <TabMenu model={items} activeIndex={activeIndex} onTabChange={(e) => setActiveIndex(e.index)} />
                <ClientDropDown onChange={(client) => setClient(client)} />
            </Card>}

            <Card className="w-full h-full" title="Informations sur le séjour">
                <div className="flex flex-row gap-2 items-center my-2 justify-between">
                    <p>Jour d'arrivée:</p>
                    <Calendar dateFormat="dd/mm/yy" showButtonBar  value={dates.debut} onChange={(e) => {if (e.value) setDates({...dates, debut: e.value}); else setDates({...dates, debut: undefined})}} />
                </div>
                <div className="flex flex-row gap-2 items-center my-2 justify-between">
                    <p>Jour du départ:</p>
                    <Calendar dateFormat="dd/mm/yy" showButtonBar  value={dates.fin} onChange={(e) => {if (e.value) setDates({...dates, fin: e.value}); else setDates({...dates, fin: undefined})}} />
                </div>
            </Card>

            <Card className="w-full h-full" title="Hebergement">
                <ReorderableParams rows={[
                    {key: "enfant-key", label: "Enfant" },
                    {key: "adulte-key", label: "Adulte" },
                    ]} onChange={(nuit) => setNuit(nuit)} />
                <div className="flex flex-row gap-2 items-center my-2">
                    Location de drap:
                    <InputNumber value={drap} onChange={(e) => {if (e.value) setDrap(e.value)}} />
                </div>
            </Card>

            <Card className="w-full h-full" title="Restauration">
                <div className="flex flex-row gap-2 items-center my-2">
                    Repas et petit dej servi:
                    <ToggleButton className="servi" checked={repas.servi} onChange={(e) => setRepas({...repas, servi: e.value})} onLabel="Oui" offLabel="Non" />
                </div>
                <CustomLineGroup
                    rows={[
                        {key: "dej", label: "Petit déjeuner", qte: 0, prixHt: 0, tva: "10", remise: 0},
                        {key: "enf", label: "Repas enfant", qte: 0, prixHt: 0, tva: "10", remise: 0},
                        {key: "coll", label: "Repas collègien", qte: 0, prixHt: 0, tva: "10", remise: 0},
                        {key: "piquenique", label: "Pique-nique indiv. enfant et adulte", qte: 0, prixHt: 0, tva: "10", remise: 0},
                        {key: "gouter", label: "Goûter enfant et adulte", qte: 0, prixHt: 0, tva: "5.5", remise: 0}
                    ]}
                    onChange={(e) => setRepas({...repas, tranches: e})}
                />
            </Card>

            <Card className="w-full h-full" title="Activités">
                <CustomLineGroup
                    rows={[
                        {key: "natpeda", label: "Séance activité nature-péda enf.", qte: 0, prixHt: 0, tva: "10", remise: 0},
                        {key: "jard", label: "Séance activité jardin enfant", qte: 0, prixHt: 0, tva: "10", remise: 0},
                        {key: "eque", label: "Séance activité équestre", qte: 0, prixHt: 0, tva: "10", remise: 0},
                        {key: "orien", label: "Course d'orientation", qte: 0, prixHt: 0, tva: "10", remise: 0},
                    ]}
                    onChange={(e) => setActivite(e)}
                />
            </Card>

            <Card className="w-full h-full" title="Divers">
                <CustomLineGroup
                    rows={[
                        {key: "communs", label: "Gestion libre des lieux communs", qte: 0, prixHt: 0, tva: "10", remise: 0},
                        {key: "menage", label: "Forfait ménage de fin de séjour", qte: 0, prixHt: 0, tva: "20", remise: 0},
                    ]}
                    onChange={(e) => setDivers(e)}
                />
            </Card>

            <Debug>
                <Card className="w-full h-full col-span-2 flex flex-col gap-2" title="INFOS">
                    <h1>
                        Dates:
                        {JSON.stringify(dates)}
                    </h1>
                    <h1>
                        Client:
                        {JSON.stringify(client)}
                    </h1>
                    <h1>
                        Nuit:
                        {JSON.stringify(nuit)}
                        {drap}
                    </h1>
                    <h1>
                        Repas:
                        {JSON.stringify(repas)}
                    </h1>
                    <h1>
                        Activité:
                        {JSON.stringify(activite)}
                    </h1>
                    <h1>
                        Divers:
                        {JSON.stringify(divers)}
                    </h1>
                </Card>
            </Debug>
        </div>
    );
}