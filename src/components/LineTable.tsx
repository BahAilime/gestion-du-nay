import { Column, ColumnEditorOptions } from "primereact/column"
import { DataTable, DataTableRowEditCompleteEvent } from "primereact/datatable"
import { Line } from "../services/db/Line"
import { calcPrice, stringToNumber } from "../services/utils"
import { InputText } from "primereact/inputtext"
import { Dropdown } from "primereact/dropdown"
import { InputNumber } from "primereact/inputnumber"

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

function textEditor (options: ColumnEditorOptions) {
        return <InputText type="text" value={options.value} onChange={(e) => options.editorCallback ? options.editorCallback(e.target.value) : null} />;
};

function numberEditor (options: ColumnEditorOptions) {
    return <InputNumber
        min={0.00}
        value={options.value}
        onChange={(e) => options.editorCallback ? options.editorCallback(e.value) : null}
        maxFractionDigits={2}
        />;
};

function tvaEditor (options: ColumnEditorOptions) {
    return <Dropdown className='dropdown-tva' 
        size={1}
        value={options.value}
        onChange={(e) => options.editorCallback ? options.editorCallback(e.value) : null}
        onBlur={(e) => {
        const value = stringToNumber(e.target.value)
        options.editorCallback ? options.editorCallback(value) : null
        }} 
        options={[
            { value: "0" },
            { value: "5.5" },
            { value: "10" },
            { value: "20" }
        ]}
        optionLabel="value" 
        optionValue="value"
        editable placeholder="TVA" />
    
    }

export default function LineTable({ lines, emptyMessage = "Vide", editable = false, onChange = undefined }: { lines?: Line[], emptyMessage?: string, editable?: boolean, onChange?: (lines: Line[]) => void }) {
    const onRowEditComplete = (e: DataTableRowEditCompleteEvent) => {
        if (lines && onChange) {
            let linesEdited = [...lines];
            // transform newData to Line
            let newData: Line = {
                label: e.newData.label,
                qte: e.newData.qte,
                prixHt: e.newData.prixHt,
                tva: e.newData.tva,
                remise: e.newData.remise
            };
            
            linesEdited[e.index] = newData;
            
            onChange(linesEdited);
        }
    };
    
    return (
    <DataTable value={lines} size="small" emptyMessage={emptyMessage} editMode={editable ? "row" : undefined} onRowEditComplete={onRowEditComplete} >
        <Column field="label" header="Type" />
        <Column field="qte" editor={(options) => numberEditor(options)} header="Qte"></Column>
        <Column field="prixHt" editor={(options) => numberEditor(options)} header="Prix HT"></Column>
        <Column field="remise" editor={(options) => numberEditor(options)} header="Remise"></Column>
        <Column field="tva" editor={(options) => tvaEditor(options)} header="TVA"></Column>
        <Column body={(data: Line) => {
            return Math.round((data.qte ?? 0) * (data.prixHt ?? 0) * 100) / 100
            }} header="Total HT"></Column>
        <Column body={(data: Line) => {
            return calc(data.prixHt, data.qte, data.tva, data.remise)+"€"
        }} header="Total"></Column>
        {editable && <Column rowEditor={true} headerStyle={{ width: '10%', minWidth: '8rem' }} bodyStyle={{ textAlign: 'center' }}></Column>}
    </DataTable>)
}