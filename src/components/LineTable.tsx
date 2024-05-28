import { AccordionTab } from "primereact/accordion"
import { Column } from "primereact/column"
import { DataTable } from "primereact/datatable"
import { line } from "../services/db"
import { calcPrice, stringToNumber } from "../services/utils"

function calc(prixHt: any, qte: any, tva: any, remise: any = 0) {
    if (typeof prixHt == "string") {
        prixHt = stringToNumber(prixHt)
    }

    if (typeof qte == "string") {
        qte = stringToNumber(qte)
    }

    if (typeof tva == "string") {
        tva = stringToNumber(tva)
    }

    if (typeof remise == "string") {
        remise = stringToNumber(remise)
    }

    return calcPrice(prixHt, qte, tva, remise)
}

export default function LineTable({ lines, emptyMessage = "Vide" }: { lines?: line[], header: string, emptyMessage?: string }) {
    return (<DataTable value={lines} size="small" emptyMessage={emptyMessage}>
                    <Column field="label" header="Type" />
                    <Column body={(data) => data.qte ? data.qte : 0} header="Qte" />
                    <Column body={(data) => data.prixHt ? data.prixHt : 0} header="Prix HT" />
                    <Column body={(data) => data.tva ? data.tva : 0} header="TVA" />
                    <Column body={(data) => data.remise ? data.remise : 0} header="Remise" />
                    <Column body={(data: line) => {
                        return calc(data.prixHt, data.qte, data.tva, data.remise)+"€"
                    }} header="Total"></Column>
                </DataTable>)
}