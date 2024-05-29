'use client'

import useDossier from "@/src/hooks/useDossier";

export default function Home() {
    const [dossier, setDossier] = useDossier()
    return (
        <>
            {JSON.stringify(dossier)}

            <button onMouseDown={() => setDossier("infos.debut", new Date())}>setDossier</button>
        </>
    );
}