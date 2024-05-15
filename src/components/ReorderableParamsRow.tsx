import { InputNumber } from 'primereact/inputnumber';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGripVertical } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import { InputText } from 'primereact/inputtext';

export default function ReorderableParamsRow({ label="", minVal=0, maxVal=0, unit="", qteBase=0, onChange = (x: any) => x }) {
    const [min, setMin] = useState(minVal);
    const [max, setMax] = useState(maxVal);
    const [qte, setQte] = useState(qteBase);
    const [llabel, setLabel] = useState(label);

    useEffect(() => {
        onChange({ label, unit, min, max, qte })
    }, [min, max, qte])

    function enforceMinMax(e: any) {
        if (e.value != "") {
          if (parseInt(e.value) < parseInt(e.min)) {
            e.value = e.min;
          }
          if (parseInt(e.value) > parseInt(e.max)) {
            e.value = e.max;
          }
        }
      }
    
    return (
    <div className='w-[400px] flex gap-2 flex-row items-center justify-between bg-white rounded-xl p-3 mx-auto my-2 hover:border-nay-cyan-700 border-nay-cyan-900 border-2 border-solid'>
          <InputText
            className='border-none w-24'
            value={llabel}
            onChange={(e) => setLabel(e.target.value)}
            tooltip='Nom'
            tooltipOptions={{ position: 'top' }}
          />
        <div className='flex gap-2 items-center'>
          <InputNumber
              size={1}
              min={0}
              max={100}
              value={min}
              onValueChange={(e) => {if (e.value && e.value < max) setMin(e.value)}}
              useGrouping={false}
              onKeyUp={(e) => enforceMinMax(e)}
              tooltip='Minimum'
              tooltipOptions={{ position: 'top' }}
              />
          -
          <InputNumber
              size={1}
              min={0}
              max={100}
              value={max}
              onValueChange={(e) => {if (e.value && e.value > min) setMax(e.value)}}
              useGrouping={false}
              onKeyUp={(e) => enforceMinMax(e)}
              tooltip='Maximum'
              tooltipOptions={{ position: 'top' }}
              />
          {unit && <h1>{unit}</h1>}
          <InputNumber
              size={1}
              min={0}
              max={100}
              value={qte}
              onValueChange={(e) => {if (e.value) setQte(e.value)}}
              useGrouping={false}
              onKeyUp={(e) => enforceMinMax(e)}
              tooltip='Quantité'
              tooltipOptions={{ position: 'top' }}
              />
        <FontAwesomeIcon icon={faGripVertical} className="text-nay-cyan-200 cursor-ns-resize mx-3"/>
      </div>
    </div>
    )
  }