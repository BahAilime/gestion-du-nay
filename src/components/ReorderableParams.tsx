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
            <Reorder.Group values={items} onReorder={setItems}>
                {items.map((item, index) => (
                    <Reorder.Item key={item.key} value={item}>
                        <ReorderableParamsRow key={item.key} id={item.key} label={item.label} minAge={item.minAge} maxAge={item.maxAge} qteBase={item.qte} prixHt={item.prixHt} tvaBase={item.tva} onChange={(x) => {
                            let ohItems = [...items]
                            ohItems[index] = x
                            setItems(ohItems)
                        }
                        }/>
                    </Reorder.Item>
                ))}
            </Reorder.Group>
            <BigButton text="Ajouter une tranche d'âge" icon={faPlusCircle} onClick={() => setItems([...items, { key: (items.length + 1).toString(), label: "Nouvelle tranche d'âge" }])}/>
        </div>
    )
}