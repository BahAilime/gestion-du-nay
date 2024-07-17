import { ReactNode, useEffect, useState } from "react";
import { Card } from 'primereact/card';
import { TabMenu } from 'primereact/tabmenu';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, IconDefinition, faUserPlus, faPuzzlePiece, faHeadphones, faUserTie, faUtensils, faCookie, faAppleWhole, faLeaf, faSeedling, faHorseHead, faSignsPost } from '@fortawesome/free-solid-svg-icons';
import ClientForm from "./ClientForm";
import ClientDropDown from "./ClientDropDown";
import Debug from "./Debug";
import { InputNumber } from "primereact/inputnumber";
import { ToggleButton } from "primereact/togglebutton";
import { Calendar } from "primereact/calendar";
import BigButton from "./BigButton";
import useDossier from "@/src/hooks/useDossier";
import { Dossier, dossierTemplate } from "@/src/services/db/Dossier";
import { Line } from "../services/db/Line"; 
import { differenceInDays } from 'date-fns/differenceInDays';
import Counter from "./Counter";
import LineTable from "./LineTable";

// TODO: rendre ca configurable

export default function DossierForm({ dossierImport = undefined, buttonText = "Valider", buttonIcon, onFormSubmit }: { dossierImport?: Dossier, buttonText?: string, buttonIcon?: IconDefinition, onFormSubmit?: (dossier: Dossier) => void }) {
    const [activeIndex, setActiveIndex] = useState(0);
    const items = [
        { label: 'Déja venu', icon: <FontAwesomeIcon icon={faHeart} className="mr-2" /> },
        { label: 'Nouveau client', icon: <FontAwesomeIcon icon={faUserPlus} className="mr-2" /> },
    ];

    // const [dossier, setDossier] = useDossier(dossierImport);
    const [newDossier, setNewDossier] = useState(dossierTemplate());

    function refreshValues() {
        const adultes = newDossier.infos.adultes
        const ado = newDossier.infos.adolescents
        const enfants = newDossier.infos.enfants
        const majeur = adultes
        const mineur = ado + enfants
        const deb = newDossier.infos.debut
        const fin = newDossier.infos.fin

        if (deb && fin) {
            newDossier.infos.nuits = differenceInDays(fin, deb)
        }

        const nuits = newDossier.infos.nuits

        // herbergement
        if (nuits > 0) {
            if (majeur > 0) {
                newDossier.nuits.lines.adulte.qte = nuits * majeur
                const acompagnateurGratuit = Math.round(mineur / 15)
                newDossier.nuits.lines.adulte.remise = (newDossier.nuits.lines.adulte.prixHt ?? 0) * acompagnateurGratuit * nuits
            }
            if (mineur > 0) {
                newDossier.nuits.lines.enfant.qte = nuits * mineur
                if (nuits == 3) {
                    newDossier.nuits.lines.enfant.remise = 0.95 * newDossier.nuits.lines.enfant.qte
                } else if (nuits >= 4) {
                    newDossier.nuits.lines.enfant.remise = 0.9 * newDossier.nuits.lines.enfant.qte
                }
            }
        }

        // restauration
        // repas
        const repas = newDossier.infos.repas
        if (repas >= 0) {
            if (adultes >= 0) {
                newDossier.repas.lines.repasAdulte.qte = repas * adultes
            }

            if (ado >= 0) {
                newDossier.repas.lines.repasCollegien.qte = repas * ado
            }

            if (enfants >= 0) {
                newDossier.repas.lines.repasEnfant.qte = repas * enfants
            }
        }

        const petitdej = newDossier.infos.petitdej
        if (petitdej >= 0) {
            newDossier.repas.lines.petitdej.qte = petitdej * majeur + petitdej * mineur
        }

        // piquenique
        const piquenique = newDossier.infos.piquenique
        if (piquenique >= 0) {
            newDossier.repas.lines.piquenique.qte = piquenique * majeur + piquenique * mineur
        }

        // gouter
        const gouter = newDossier.infos.gouter
        if (gouter >= 0) {
            newDossier.repas.lines.gouter.qte = gouter * majeur + gouter * mineur
        }

        // activites
        const naturepeda = newDossier.infos.naturepeda
        const jardin = newDossier.infos.jardin
        const orientation = newDossier.infos.orientation
        const activitesTotal = naturepeda + jardin + orientation

        if (naturepeda >= 0) {
            newDossier.activite.naturepeda.qte = naturepeda * mineur
            if (activitesTotal >= 3) {
                newDossier.activite.naturepeda.remise = Math.round((newDossier.activite.naturepeda.prixHt ?? 0) * (newDossier.activite.naturepeda.qte ?? 0) * 0.1 * 100) / 100
            }
        }

        if (jardin >= 0) {
            newDossier.activite.jardin.qte = jardin * mineur
            if (activitesTotal >= 3) {
                newDossier.activite.jardin.remise = Math.round((newDossier.activite.jardin.prixHt ?? 0) * (newDossier.activite.jardin.qte ?? 0) * 0.1 * 100) / 100
            }
        }

        if (orientation >= 0) {
            newDossier.activite.orientation.qte = orientation * mineur
            if (activitesTotal >= 3) {
                newDossier.activite.orientation.remise = Math.round((newDossier.activite.orientation.prixHt ?? 0) * (newDossier.activite.orientation.qte ?? 0) * 0.1 * 100) / 100
            }
        }

        const equestre = newDossier.infos.equestre
        if (equestre >= 0) {
            newDossier.activite.equestre.qte = equestre * mineur

            if (equestre >= 6) {
                newDossier.activite.equestre.prixHt = 9.29
            } else if (equestre >= 4) {
                newDossier.activite.equestre.prixHt = 9.48
            } else if (equestre >= 2) {
                newDossier.activite.equestre.prixHt = 10.43
            } else {
                newDossier.activite.equestre.prixHt = 11.38
            }
        }
        setNewDossier({ ...newDossier })
    }

    useEffect(() => {
        if (newDossier.idClient) {
            setActiveIndex(0);
        }
    }, [])

    return (
        <div className="flex flex-col gap-2">
            {activeIndex === 0 &&
                <Card title="Client" className="w-full h-full col-span-1 row-span-1">
                    <TabMenu model={items} activeIndex={activeIndex} onTabChange={(e) => setActiveIndex(e.index)} />
                    <ClientDropDown value={newDossier?.idClient} onChange={(client: string) => {
                            newDossier.idClient = client;
                            setNewDossier({ ...newDossier })
                        }} />
                </Card>}

            {activeIndex === 1 &&
                <Card title="Client" className="w-full h-full col-span-2 row-span-2">
                    <TabMenu model={items} activeIndex={activeIndex} onTabChange={(e) => setActiveIndex(e.index)} />
                    <ClientForm onChange={(client) => {
                            newDossier.client = client
                            setNewDossier({ ...newDossier })
                        }} />
                </Card>}

            <Card className="w-full h-full col-span-2" title="Informations sur le séjour">
                <div className="flex flex-col gap-2">

                    <h1>Personnes hebergées</h1>
                    <div className="flex gap-2 ">
                        <Counter counterInfo={{ key: "adulte", label: "Adulte", value: 0, icon: faUserTie }}
                            onChange={(value: number) => {
                                newDossier.infos.adultes = value
                                setNewDossier({ ...newDossier })
                            }} />
                        <Counter counterInfo={{ key: "ado", label: "Collègien", value: 0, icon: faHeadphones }} onChange={(value) => {
                            newDossier.infos.adolescents = value
                            setNewDossier({ ...newDossier })
                        }} />
                        <Counter counterInfo={{ key: "enfant", label: "Enfant", value: 0, icon: faPuzzlePiece }} onChange={(value) => {
                            newDossier.infos.enfants = value
                            setNewDossier({ ...newDossier })
                        }} />
                    </div>

                    <div className="flex gap-2 ">
                        <Counter counterInfo={{ key: "petitdej", label: "Petit déjeuner", value: 0, icon: faAppleWhole }}
                            onChange={(value: number) => {
                                newDossier.infos.petitdej = value
                                setNewDossier({ ...newDossier })
                            }} />
                        <Counter counterInfo={{ key: "repas", label: "Repas", value: 0, icon: faUtensils }} onChange={(value) => {
                            newDossier.infos.repas = value
                            setNewDossier({ ...newDossier })
                        }} />
                        <Counter counterInfo={{ key: "gouters", label: "Goûters", value: 0, icon: faCookie }} onChange={(value) => {
                            newDossier.infos.gouter = value
                            setNewDossier({ ...newDossier })
                        }} />
                        <Counter counterInfo={{ key: "piquenique", label: "Pique-nique", value: 0, icon: faCookie }} onChange={(value) => {
                            newDossier.infos.piquenique = value
                            setNewDossier({ ...newDossier })
                        }} />
                    </div>

                    <div className="flex gap-2 ">
                        <Counter counterInfo={{ key: "naturepeda", label: "Séance nature-péda", value: 0, icon: faLeaf }}
                            onChange={(value: number) => {
                                newDossier.infos.naturepeda = value
                                setNewDossier({ ...newDossier })
                            }} />
                        <Counter counterInfo={{ key: "jardin", label: "S- jardin", value: 0, icon: faSeedling }} onChange={(value) => {
                            newDossier.infos.jardin = value
                            setNewDossier({ ...newDossier })
                        }} />
                        <Counter counterInfo={{ key: "equestre", label: "S- équestre", value: 0, icon: faHorseHead }} onChange={(value) => {
                            newDossier.infos.equestre = value
                            setNewDossier({ ...newDossier })
                        }} />
                        <Counter counterInfo={{ key: "orientation", label: "Course d'orientation", value: 0, icon: faSignsPost }} onChange={(value) => {
                            newDossier.infos.orientation = value
                            setNewDossier({ ...newDossier })
                        }} />
                    </div>
                </div>
                <br />
                    <h1 className="text-xl font-medium">Dates</h1>
                <div className="flex flex-row gap-2 items-center my-2 justify-between">
                    <p>Jour d&apos;arrivée:</p>
                    <Calendar dateFormat="dd/mm/yy" locale="fr" showButtonBar value={newDossier.infos.debut} onChange={(e) => {
                        if (!e.value) return
                        newDossier.infos.debut = e.value
                        setNewDossier({ ...newDossier })
                    }} />
                </div>
                <div className="flex flex-row gap-2 items-center my-2 justify-between">
                    <p>Jour du départ:</p>
                    <Calendar dateFormat="dd/mm/yy" locale="fr" showButtonBar value={newDossier.infos.fin} onChange={(e) => {
                        if (!e.value) return
                        newDossier.infos.fin = e.value
                        setNewDossier({ ...newDossier })
                    }} />
                </div>
                <div className="flex flex-row gap-2 items-center my-2 justify-between">
                    <p>Nombre de nuits:</p>
                    {newDossier.infos.nuits}
                </div>
                <BigButton onClick={() => {
                    refreshValues()
                }} text="Rafraichir les valeurs calculées" />
            </Card>

            <Card className="w-full h-full" title="Hebergement">
                <LineTable lines={Object.values(newDossier.nuits.lines).flatMap((x) => x)} editable={true} onChange={(newLines) => {
                    if (!newLines) return
                    const newData: any = {}
                    newData["adulte"] = newLines[0]
                    newData["enfant"] = newLines[1]
                    newDossier.nuits.lines = newData
                    setNewDossier({ ...newDossier })
                }} />
                <div className="flex flex-row gap-2 items-center my-2">
                    Location de drap:
                    <InputNumber value={newDossier.nuits.drap.qte} onChange={(e) => {
                            newDossier.nuits.drap.qte = e.value ?? 0
                            setNewDossier({ ...newDossier })
                        }} />
                </div>
            </Card>

            <Card className="w-full h-full" title="Restauration">
                <LineTable lines={Object.values(newDossier.repas.lines).flatMap((x) => x)} editable={true} onChange={(newlines) => {
                    if (!newlines) return
                    const newData: any = {
                        petitdej: newlines[0],
                        repasEnfant: newlines[1],
                        repasCollegien: newlines[2],
                        repasAdulte: newlines[3],
                        piquenique: newlines[4],
                        gouter: newlines[5]

                    }
                    newDossier.repas.lines = newData
                    setNewDossier({ ...newDossier })
                }} />

                <div className="flex flex-row gap-2 items-center my-2">
                    Repas et petit dej servi:
                    <ToggleButton className="servi" checked={newDossier.repas.servi} onChange={(e) => {
                            newDossier.repas.servi = e.value
                            setNewDossier({ ...newDossier })
                        }}onLabel="Oui" offLabel="Non" />
                </div>

            </Card>

            <Card className="w-full h-full" title="Activités">
                <LineTable
                    lines={Object.values(newDossier.activite).flatMap((x) => x)}
                    editable={true}
                />
            </Card>

            <Card className="w-full h-full" title="Divers">
                <LineTable
                    lines={newDossier.divers ? Object.values(newDossier.divers).flatMap((x) => x) : []}
                    editable={true}
                />
            </Card>

            <Card className="w-full h-full" title="Valier">
                <BigButton text={buttonText} icon={buttonIcon} onClick={() => {
                    if (onFormSubmit) {
                        onFormSubmit(newDossier)
                        }
                    else {
                        console.warn("No form submit handler"); 
                    }

                        
                    }} />
            </Card>

            <Debug>
                <Card className="w-full h-full col-span-2 flex flex-col gap-2" title="INFOS">
                    <h1>
                        {newDossier && <pre>{JSON.stringify(newDossier, null, 4)}</pre>}
                        <button onClick={() => refreshValues()}>refresh</button>
                    </h1>
                </Card>
            </Debug>
        </div>
    );
}