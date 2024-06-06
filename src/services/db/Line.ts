export type Line = {
    key?: string,
    label: string,
    qte: number,
    prixHt: number,
    tva: number,
    remise: number
}

export function lineTemplate(): Line {
    return {
        label: "Nouvelle ligne",
        qte: 0,
        prixHt: 0,
        tva: 0,
        remise: 0
    }
}