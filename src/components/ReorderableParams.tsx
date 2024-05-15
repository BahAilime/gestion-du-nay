import { Reorder, useDragControls } from "framer-motion"
import { useState, Children } from "react"
import ReorderableParamsRow from "./ReorderableParamsRow"

export default function ReorderableParams( { rows }: { rows: { label: string, minVal: number, maxVal: number, qte: number, unit?: string }[] }) {
    const controls = useDragControls()
    const [items, setItems] = useState(rows)

    return (
        <Reorder.Group values={items} onReorder={setItems}>
            {items.map(item => (
                <Reorder.Item key={item.label} value={item}>
                    <ReorderableParamsRow {...item} />
                </Reorder.Item>
            ))}
        </Reorder.Group>
    )
}