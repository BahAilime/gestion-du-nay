import { InputNumber } from 'primereact/inputnumber';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear, faGripVertical } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import { InputText } from 'primereact/inputtext';

import { Dropdown } from 'primereact/dropdown';

export default function ReorderableParamsRow({id, label = "", minAge = 0, maxAge = 0, qteBase = 0, prixHt = 0, tvaBase = "", onChange = (x: any) => x }: { id: string, label?: string, minAge?: number, maxAge?: number, qteBase?: number, prixHt?: number, tvaBase?: string, onChange?: (x: any) => void }) {
  const [min, setMin] = useState(minAge);
  const [max, setMax] = useState(maxAge);
  const [qte, setQte] = useState(qteBase);
  const [llabel, setLabel] = useState(label);
  const [open, setOpen] = useState(false);
  const [ht, setHt] = useState(0);
  const [tva, setTva] = useState(tvaBase);
  const [tvaClean, setTvaClean] = useState(0);
  const [prixTotal, setPrixTotal] = useState(0);

  useEffect(() => {
    setPrixTotal(Math.floor(ht * ((100 + tvaClean) / 100) * qte * 100) / 100)
  }, [tvaClean, qte, ht])

  useEffect(() => {
    onChange({ id, label:llabel, min, max, qte, ht, tvaClean })
  }, [llabel, min, max, qte, ht, tvaClean])

  function sanitizeTVA(tva: string) {
    setTva(tva)
    if (tva == "") {
      setTvaClean(0);
      return;
    }
    tva = tva.replace(/,/g, '.');

    setTvaClean(parseFloat(tva.replace(/[^0-9.]/g, '')));
  }

  return (
      <div className='w-[330px] flex gap-2 flex-col items-center justify-between bg-white rounded-xl p-3 mx-auto my-2 hover:border-nay-cyan-700 border-nay-cyan-900 border-2 border-solid'>
        <div className='flex items-center gap-2'>
          <h1>
            {qte != 0 ?
              qte > 1 ? `${qte} nuitées ` : `${qte} nuitée `
              : ""}
            {llabel != "" ? `"${llabel.toLowerCase()}"` : "Tranche d'âge sans nom"} 
            {prixTotal != 0 && `: ${prixTotal}€`}
          </h1>
          <FontAwesomeIcon icon={faGear} onClick={() => setOpen(!open)} className='text-nay-cyan-200' />
          <FontAwesomeIcon icon={faGripVertical} className='text-nay-cyan-200' />
        </div>
        {open &&
          <div className='h-fit w-64 flex gap-2 flex-col' >
            <div className='flex justify-between items-center'>
              <h1>Label:</h1>
              <InputText className='w-40' placeholder="Label" value={llabel} onChange={e => setLabel(e.target.value)} />
            </div>
            <div className='flex justify-between items-center'>
              <h1>Age:</h1>
              <div className='flex gap-2 items-center'>
                <InputNumber size={1} min={0} value={min} onChange={e => { if (e.value) setMin(e.value); else setMin(0) }} />
                -
                <InputNumber size={1} min={0} value={max} onChange={e => { if (e.value) setMax(e.value); else setMax(0) }} />
                ans
              </div>
            </div>
            <div className='flex justify-between items-center'>
              <h1>Nombre de nuits:</h1>
              <InputNumber size={1} min={0} value={qte} onChange={e => { if (e.value) setQte(e.value); else setQte(0) }} />
            </div>
            <div className='flex justify-between items-center'>
              <h1>Prix nuité HT:</h1>
              <InputNumber size={1} min={0} value={ht} onChange={e => { if (e.value) setHt(e.value); else setHt(0) }} useGrouping={false} minFractionDigits={0} maxFractionDigits={10} locale="fr-FR" />
            </div>
            <div className='flex justify-between items-center'>
              <h1>TVA:</h1>
              <Dropdown className='dropdown-tva' size={1} value={tva} onChange={(e) => sanitizeTVA(e.value)} options={[{ name: "0%", value: "0" }, { name: "5,5%", value: "5.5" }, { name: "10%", value: "10" }, { name: "20%", value: "20" }]} optionLabel="name" optionValue='value' editable placeholder="TVA" />
            </div>
          </div>
        }
      </div>
  )
}