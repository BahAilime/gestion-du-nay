import { AnimatePresence, Reorder, useDragControls } from "framer-motion"
import { useState, Children, useEffect } from "react"
import ReorderableParamsRow from "./ReorderableParamsRow"
import BigButton from "./BigButton"
import { faCircleXmark, faPenToSquare, faPlusCircle } from "@fortawesome/free-solid-svg-icons"

export default function ReorderableParams({ rows, onChange = (x: any) => {x} }: { rows: {key: string, label?: string, minAge?: number, maxAge?: number, qte?: number, prixHt?: number, tva?: string}[], onChange: (x: any) => void }) {
    const [items, setItems] = useState(rows)

    useEffect(() => {
        onChange(items)
    }, [items])

    return (
        <div className="border-nay-cyan-500 rounded-xl border-solid border-2 p-3">
            {items.map((item, index) => (
                        <ReorderableParamsRow key={item.key} id={item.key} label={item.label} minAge={item.minAge} maxAge={item.maxAge} qteBase={item.qte} prixHt={item.prixHt} tvaBase={item.tva} onChange={(x) => {
                        let ohItems = [...items]
                        ohItems[index] = x
                        setItems(ohItems)
                    }
                    }/>
            ))}
            {/* <BigButton text="Ajouter une ligne" icon={faPlusCircle} onClick={() => setItems([...items, { label: "", minVal: 0, maxVal: 0, qte: 0, unit: "ans" }])}/> */}
        </div>
    )
}