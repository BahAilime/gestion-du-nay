import { useState } from "react";
import { Card } from 'primereact/card';
import { IconDefinition, faPuzzlePiece, faUserTie, faUtensils, faCookie, faAppleWhole, faLeaf, faSeedling, faSignsPost } from '@fortawesome/free-solid-svg-icons';
import Debug from "./Debug";
import { ToggleButton } from "primereact/togglebutton";
import { Calendar } from "primereact/calendar";
import BigButton from "./BigButton";
import useDossier from "@/src/hooks/useDossier";
import { dossier, dossierTemplateDBE } from "@/src/services/db";
import { differenceInDays } from 'date-fns/differenceInDays';
import Counter from "./Counter";
import LineTable from "./LineTable";
import { InputText } from "primereact/inputtext";

export default function DossierForm({ dossierImport, buttonText = "Valider", buttonIcon, onFormSubmit }: { dossierImport?: dossier, buttonText?: string, buttonIcon?: IconDefinition, onFormSubmit?: (dossier: dossier) => void }) {
    const [dossier, setDossier] = useDossier(dossierImport);
    const [newDossier, setNewDossier] = useState(dossierTemplateDBE());

    function refreshValues() {
        const deb = newDossier.infos.debut
        const fin = newDossier.infos.fin

        if (deb && fin) {
            newDossier.infos.nuits = differenceInDays(fin, deb)
        }
        const nuits = newDossier.infos.nuits

        let adultes = newDossier.infos.adultes
        const enfants = newDossier.infos.enfants
        if (enfants >= 20) {
            adultes -= 1
        }
        const personnes = adultes + enfants

        if (nuits > 0) {
            console.log("vars des nuits", nuits, personnes, newDossier.nuits.lines);

            if (drapDuDessus) {
                newDossier.nuits.lines.nuitAvecDrapDessus.qte = nuits * personnes
                newDossier.nuits.lines.nuitSansDrapDessus.qte = 0
            }

            if (drapDuDessus == false) {
                newDossier.nuits.lines.nuitAvecDrapDessus.qte = 0
                newDossier.nuits.lines.nuitSansDrapDessus.qte = nuits * personnes
            }
        }

        const repas = newDossier.infos.repas
        newDossier.repas.lines.repas.qte = repas * personnes

        const petitdej = newDossier.infos.petitdej
        newDossier.repas.lines.petitdej.qte = petitdej * personnes

        const piquenique = newDossier.infos.piquenique
        newDossier.repas.lines.piquenique.qte = piquenique * personnes

        const gouter = newDossier.infos.gouter
        newDossier.repas.lines.gouter.qte = gouter * personnes

        const naturepeda = newDossier.infos.naturepeda
        const jardin = newDossier.infos.jardin
        const orientation = newDossier.infos.orientation

        newDossier.activite.naturepeda.qte = naturepeda * enfants
        newDossier.activite.jardin.qte = jardin * enfants
        newDossier.activite.orientation.qte = orientation * enfants

        setNewDossier({ ...newDossier })
    }

    const [drapDuDessus, setDrapsDuDessus] = useState(false);

    return (
        <div className="flex flex-col gap-2">
            <Card className="w-full h-full col-span-2" title="Informations sur le séjour">
                <div className="flex flex-col gap-2">
                    <h1>Référence</h1>
                    <InputText value={newDossier.infos.ref}
                        placeholder="REF:"
                        onChange={(e) => {
                            newDossier.infos.ref = e.target.value
                            setNewDossier({ ...newDossier })
                        }} />

                    <h1>Personnes hebergées</h1>
                    <div className="flex gap-2 ">
                        <Counter counterInfo={{ key: "adulte", label: "Adulte", value: 0, icon: faUserTie }}
                            onChange={(value: number) => {
                                newDossier.infos.adultes = value
                                setNewDossier({ ...newDossier })
                            }} />
                        <Counter counterInfo={{ key: "enfant", label: "Enfant", value: 0, icon: faPuzzlePiece }} onChange={(value) => {
                            newDossier.infos.enfants = value
                            setNewDossier({ ...newDossier })
                        }} />

                        <div className="flex flex-row gap-2 items-center my-2">
                            Drap du dessus :
                            <ToggleButton className="servi" checked={drapDuDessus} onChange={(e) => setDrapsDuDessus(e.value)} onLabel="Oui" offLabel="Non" />
                        </div>

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
                        <Counter counterInfo={{ key: "piquenique", label: "Pique-nique", value: 0, icon: faCookie }} onChange={(value) => {
                            newDossier.infos.piquenique = value
                            setNewDossier({ ...newDossier })
                        }} />
                        <Counter counterInfo={{ key: "gouters", label: "Goûters", value: 0, icon: faCookie }} onChange={(value) => {
                            newDossier.infos.gouter = value
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
                        <Counter counterInfo={{ key: "orientation", label: "Course d'orientation", value: 0, icon: faSignsPost }} onChange={(value) => {
                            newDossier.infos.orientation = value
                            setNewDossier({ ...newDossier })
                        }} />
                    </div>
                </div>
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
                    <Calendar dateFormat="dd/mm/yy" locale="fr" showButtonBar value={dossier?.infos?.fin} onChange={(e) => {
                        if (!e.value) return
                        newDossier.infos.fin = e.value
                        setNewDossier({ ...newDossier })
                    }} />
                </div>
                <div className="flex flex-row gap-2 items-center my-2 justify-between">
                    <p>Nombre de nuits:</p>
                    {newDossier.infos.nuits}
                </div>
                <BigButton onClick={() => { refreshValues() }} text="Rafraichir les valeurs calculées" />
            </Card>

            <Card className="w-full h-full" title="Hebergement">
                <LineTable
                    lines={Object.values(newDossier.nuits.lines).flatMap((x) => x)}
                    editable={true}
                    onChange={(newLines) => {
                        if (!newLines) return
                        newDossier.nuits.lines.nuitAvecDrapDessus = newLines[0]
                        newDossier.nuits.lines.nuitSansDrapDessus = newLines[1]
                        setNewDossier({ ...newDossier })
                    }} />
            </Card>

            <Card className="w-full h-full" title="Restauration">
                <LineTable
                    lines={Object.values(newDossier.repas.lines).flatMap((x) => x)}
                    editable={true}
                    onChange={(newlines) => {
                        if (!newlines) return
                        const newData: any = {
                            petitdej: newlines[0],
                            repas: newlines[1],
                            piquenique: newlines[2],
                            gouter: newlines[3]
                        }
                        newDossier.repas.lines = newData
                        setNewDossier({ ...newDossier })
                    }} />

                <div className="flex flex-row gap-2 items-center my-2">
                    Repas et petit dej servi:
                    <ToggleButton
                        className="servi"
                        checked={dossier.repas?.servi}
                        onChange={(e) => setDossier("repas.servi", e.value)}
                        onLabel="Oui"
                        offLabel="Non" />
                </div>

            </Card>

            <Card className="w-full h-full" title="Activités">
                <LineTable
                    lines={Object.values(newDossier.activite).flatMap((x) => x)}
                    editable={true}
                    onChange={(newLines) => {
                        if (!newLines) return
                        newDossier.activite.naturepeda = newLines[0]
                        newDossier.activite.jardin = newLines[1]
                        newDossier.activite.orientation = newLines[2]
                        setNewDossier({ ...newDossier })
                    }}
                />
            </Card>

            <Card className="w-full h-full" title="Divers">
                <LineTable
                    lines={newDossier.divers ? Object.values(newDossier.divers).flatMap((x) => x) : []}
                    editable={true}
                    onChange={(newLines) => {
                        if (!newLines) return
                        newDossier.divers = newLines
                        setNewDossier({ ...newDossier })
                    }}
                />
            </Card>

            <Card className="w-full h-full" title="Valier">
                <BigButton text={buttonText} icon={buttonIcon} onClick={() => { if (onFormSubmit) onFormSubmit(dossier) }} />
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