import { ReactNode, useEffect, useState } from "react";
import { Card } from 'primereact/card';
import { TabMenu } from 'primereact/tabmenu';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, IconDefinition, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import ClientForm from "./ClientForm";
import ClientDropDown from "./ClientDropDown";
import ReorderableParams from "./ReorderableParams";
import Debug from "./Debug";
import { InputNumber } from "primereact/inputnumber";
import { ToggleButton } from "primereact/togglebutton";
import CustomLineGroup from "./CustomLineGroup";
import { Calendar } from "primereact/calendar";
import BigButton from "./BigButton";
import useDossier from "@/src/hooks/useDossier";
import { dossier } from "@/src/services/db";
import { differenceInDays } from 'date-fns/differenceInDays';

// TODO: rendre ca configurable

const defaultDossier: dossier = {
    repas: {
        lines: [
            {key: "dej", label: "Petit déjeuner", qte: 0, prixHt: 4.82, tva: 10, remise: 0},
            {key: "enf", label: "Repas enfant", qte: 0, prixHt: 7.55, tva: 10, remise: 0},
            {key: "coll", label: "Repas collègien", qte: 0, prixHt: 8.45, tva: 10, remise: 0},
            {key: "adlte", label: "Repas adulte", qte: 0, prixHt: 10.18, tva: 10, remise: 0},
            {key: "piquenique", label: "Pique-nique indiv. enfant et adulte", qte: 0, prixHt: 7.44, tva: 10, remise: 0},
            {key: "gouter", label: "Goûter enfant et adulte", qte: 0, prixHt: 0, tva: 5.5, remise: 0}
        ],
    },
    activite: [
        {key: "natpeda", label: "Séance activité nature-péda enf.", qte: 0, prixHt: 6.36, tva: 10, remise: 0},
        {key: "jard", label: "Séance activité jardin enfant", qte: 0, prixHt: 6.36, tva: 10, remise: 0},
        {key: "eque", label: "Séance activité équestre", qte: 0, prixHt: 12, tva: 10, remise: 0},
        {key: "orien", label: "Course d'orientation", qte: 0, prixHt: 6.36, tva: 10, remise: 0},
    ],
    divers: [
        {key: "communs", label: "Gestion libre des lieux communs", qte: 0, prixHt: 0, tva: 10, remise: 0},
        {key: "menage", label: "Forfait ménage de fin de séjour", qte: 0, prixHt: 0, tva: 20, remise: 0},
    ]
}

export default function DossierForm({dossierImport = defaultDossier, buttonText="Valider", buttonIcon, onFormSubmit}: {dossierImport?: dossier, buttonText?: string, buttonIcon?: IconDefinition, onFormSubmit?: (dossier: dossier) => void}) {
    const [activeIndex, setActiveIndex] = useState(0);
    const items = [
        { label: 'Déja venu', icon: <FontAwesomeIcon icon={faHeart} className="mr-2" /> },
        { label: 'Nouveau client', icon: <FontAwesomeIcon icon={faUserPlus} className="mr-2" /> },
    ];

    const [dossier, setDossier] = useDossier(dossierImport);

    useEffect(() => {
        if (dossier.idClient) {
            setActiveIndex(0);
        }
    }, [])

    useEffect(() => {
        if (dossier?.infos?.debut && dossier?.infos?.fin) {
            setDossier("infos.nuits", differenceInDays(dossier.infos.fin, dossier.infos.debut));
        }}, [dossier?.infos?.debut, dossier?.infos?.fin])

    return (
        <div className="grid 2xl:grid-cols-3 xl:grid-cols-2 grid-flow-dense gap-2">
            {activeIndex === 0 &&
            <Card title="Client" className="w-full h-full col-span-1 row-span-1">
                <TabMenu model={items} activeIndex={activeIndex} onTabChange={(e) => setActiveIndex(e.index)} />
                <ClientDropDown value={dossier?.idClient} onChange={(client: string) => setDossier("idClient", client)} />
            </Card>}

            {activeIndex === 1 &&
            <Card title="Client" className="w-full h-full col-span-2 row-span-2">
                <TabMenu model={items} activeIndex={activeIndex} onTabChange={(e) => setActiveIndex(e.index)} />
                <ClientForm onChange={(clientInfos) => setDossier("client", clientInfos)} />
            </Card>}

            <Card className="w-full h-full" title="Informations sur le séjour">
                <div className="flex flex-row gap-2 items-center my-2 justify-between">
                    <p>Nombre d&apos;adultes:</p>
                    <InputNumber value={dossier?.infos?.adultes} onValueChange={(e) => setDossier("infos.adultes", e.value ?? 0)} />
                </div>
                <div className="flex flex-row gap-2 items-center my-2 justify-between">
                    <p>Nombre d&apos;enfants:</p>
                    <InputNumber value={dossier?.infos?.enfants} onValueChange={(e) => setDossier("infos.enfants", e.value ?? 0)} />
                </div>
                <h1 className="text-xl font-medium">Dates</h1>
                <div className="flex flex-row gap-2 items-center my-2 justify-between">
                    <p>Jour d&apos;arrivée:</p>
                    <Calendar dateFormat="dd/mm/yy" showButtonBar  value={dossier?.infos?.debut} onChange={(e) => {setDossier("infos.debut", e.value);}} />
                </div>
                <div className="flex flex-row gap-2 items-center my-2 justify-between">
                    <p>Jour du départ:</p>
                    <Calendar dateFormat="dd/mm/yy" showButtonBar  value={dossier?.infos?.fin} onChange={(e) => {setDossier("infos.fin", e.value);}}/>
                </div>
                <div className="flex flex-row gap-2 items-center my-2 justify-between">
                    <p>Nombre de nuits:</p>
                    {dossier.infos?.nuits}
                </div>
            </Card>

            <Card className="w-full h-full" title="Hebergement">
                <ReorderableParams rows={[
                    {key: "enfant-key", label: "Enfant" },
                    {key: "adulte-key", label: "Adulte" },
                    ]} onChange={(nuit) => setDossier("nuits.lines", nuit)} />
                <div className="flex flex-row gap-2 items-center my-2">
                    Location de drap:
                    <InputNumber value={dossier.nuits?.drap} onChange={(e) => {setDossier("nuits.drap", e.value ?? 0);}} />
                </div>
            </Card>

            <Card className="w-full h-full" title="Restauration">
                <div className="flex flex-row gap-2 items-center my-2">
                    Repas et petit dej servi:
                    <ToggleButton className="servi" checked={dossier.repas?.servi} onChange={(e) => setDossier("repas.servi", e.value)} onLabel="Oui" offLabel="Non" />
                </div>
                <CustomLineGroup
                    rows={dossier.repas?.lines ?? []}
                    onChange={(e) => setDossier("repas.lines", e)}
                />
            </Card>

            <Card className="w-full h-full" title="Activités">
                <CustomLineGroup
                    rows={dossier.activite ?? []}
                    onChange={(e) => setDossier("activite", e)}
                />
            </Card>

            <Card className="w-full h-full" title="Divers">
                <CustomLineGroup
                    rows={dossier.divers ?? []}
                    onChange={(e) => setDossier("divers", e)}
                />
            </Card>
            
            <Card className="w-full h-full" title="Valier">
                <BigButton text={buttonText} icon={buttonIcon} onClick={() => {if (onFormSubmit) onFormSubmit(dossier)}}/>
            </Card>

            <Debug>
                <Card className="w-full h-full col-span-2 flex flex-col gap-2" title="INFOS">
                    <h1>
                        {JSON.stringify(dossier)}
                    </h1>
                </Card>
            </Debug>
        </div>
    );
}