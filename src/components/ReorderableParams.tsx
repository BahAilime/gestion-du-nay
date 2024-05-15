import { Reorder, useDragControls } from "framer-motion"
import { useState, Children } from "react"
import ReorderableParamsRow from "./ReorderableParamsRow"
import BigButton from "./BigButton"
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons"

export default function ReorderableParams({ rows }: { rows: { label: string, minVal: number, maxVal: number, qte: number, unit?: string }[] }) {
    const controls = useDragControls()
    const [items, setItems] = useState(rows)

    return (
        <div className="border-nay-cyan-500 rounded-xl border-solid border-2 p-3">
            <Reorder.Group values={items} onReorder={setItems}>
                {items.map(item => (
                    <Reorder.Item key={item.label} value={item}>
                        <ReorderableParamsRow {...item} />
                    </Reorder.Item>
                ))}
            </Reorder.Group>
            <BigButton text="Ajouter une ligne" icon={faPlusCircle} onClick={() => setItems([...items, { label: "", minVal: 0, maxVal: 0, qte: 0, unit: "ans" }])}/>
        </div>
    )
}