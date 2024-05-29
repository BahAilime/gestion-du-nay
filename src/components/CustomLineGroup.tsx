import { AnimatePresence, Reorder, useDragControls } from "framer-motion"
import { useState, Children, useEffect } from "react"
import CustomLine from "./CustomLine"
import BigButton from "./BigButton"
import { faCircleXmark, faEllipsis, faPenToSquare, faPlusCircle } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React, { useRef } from 'react';
import { ContextMenu } from 'primereact/contextmenu';
import { line } from "../services/db"

export default function ReorderableParams({ rows, onChange = (x: any) => {x} }: { rows: line[], onChange: (x: any) => void }) {
    const [items, setItems] = useState(rows)
    const cm = useRef<any>(null);
    const ctxMenu = [
        { template: () => {
            return <div className="flex gap-2 items-center m-1 p-1">
                <FontAwesomeIcon icon={faPlusCircle} className="text-green-700"/>
                <p>Ajouter une ligne</p>
            </div>
          },
          command: () => {
            setItems([...items, { key: (items.length + 1).toString(), label: "Nouvelle ligne" }])            
          }
        },
        { template: () => {
            return <div className="flex gap-2 items-center m-1 p-1">
                <FontAwesomeIcon icon={faCircleXmark} className="text-red-700"/>
                <p>Supprimer les lignes</p>
            </div>
          },
          command: () => {
            setItems([])
          }
        }
    ];

    useEffect(() => {
        onChange(items)
    }, [items])

    return (
        <div className="border-nay-cyan-500 rounded-xl border-solid border-2 p-5 relative">
            <div>
                <ContextMenu model={ctxMenu} ref={cm} breakpoint="767px" />
                <FontAwesomeIcon icon={faEllipsis} className="absolute top-1 right-2 text-nay-cyan-400 cursor-pointer" onClick={(e) => {cm.current.show(e)}}/>
            </div>
            {items.map((item, index) => {
                if (!item.key) return
                return <CustomLine
                        key={item.key}
                        id={item.key}
                        label={item.label}
                        qteBase={item.qte}
                        prixHt={item.prixHt}
                        tvaBase={item.tva}
                        remiseBase={item.remise}
                        onChange={(x) => {
                    if (x == "delete") {
                        setItems(items.filter((item, i) => i != index))
                    } else {
                        let ohItems = [...items]
                        ohItems[index] = x
                        setItems(ohItems)
                    }
                }
                }/>
                })}
        </div>
    )
}