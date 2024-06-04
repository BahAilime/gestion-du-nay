import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { faMinusCircle, faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { InputNumber } from "primereact/inputnumber";
import { useState } from "react";

type CounterInfo = {
    key: string,
    label: string,
    value: number,
    icon?: IconDefinition
}

export default function Counter({ counterInfo, onChange }: { counterInfo: CounterInfo, onChange: (value: number) => void }) {
    const [counter, setCounter] = useState<CounterInfo>(counterInfo);
    return <div className="flex flex-col justify-center items-center gap-2 w-36 p-2 border-nay-cyan-400 border-2 aspect-square rounded-xl">
        {counter.icon && <FontAwesomeIcon icon={counter.icon} size="2xl"/>}
        <InputNumber className="*:text-center *:w-9 h-8 *:outline-none" 
            size={1}
            value={counter.value} 
            showButtons={true}
            buttonLayout="horizontal"
            step={1}
            incrementButtonIcon={<FontAwesomeIcon icon={faPlusCircle} size="xs" />}
            decrementButtonIcon={<FontAwesomeIcon icon={faMinusCircle} size="xs" />}
            decrementButtonClassName="bg-nay-cyan-300"
            incrementButtonClassName="bg-nay-cyan-300"
            min={0}
            onValueChange={(e) => {
                setCounter({ ...counter, value: e.value ?? 0 })
                onChange(e.value ?? 0)
            }} />
        <h1 className="text-center text-xs">{counter.label}</h1>
    </div>
}