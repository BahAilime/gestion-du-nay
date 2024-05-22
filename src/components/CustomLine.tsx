import { InputNumber } from 'primereact/inputnumber';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark, faGear, faGripVertical } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import { InputText } from 'primereact/inputtext';

import { Dropdown } from 'primereact/dropdown';
import BigButton from './BigButton';

export default function ReorderableParamsRow({id, label = "", qteBase = 0, prixHt = 0, tvaBase = "", remiseBase = 0, handle = null, onChange = (x: any) => x }: { id: string, label?: string, qteBase?: number, prixHt?: number, tvaBase?: string, remiseBase?: number, handle?: any, onChange?: (x: any|"delete") => void }) {
  // TODO: Refactor les useState
  const [qte, setQte] = useState(qteBase);
  const [llabel, setLabel] = useState(label);
  const [open, setOpen] = useState(false);
  const [ht, setHt] = useState(prixHt);
  const [tva, setTva] = useState(tvaBase);
  const [tvaClean, setTvaClean] = useState(0);
  const [prixTotal, setPrixTotal] = useState(0);
  const [remise, setRemise] = useState(remiseBase);
  
  useEffect(() => {
    sanitizeTVA(tvaBase);
  }, [])

  useEffect(() => {
    setPrixTotal(Math.floor((ht * ((100 + tvaClean) / 100) * qte - remise) * 100) / 100)
  }, [tvaClean, qte, ht, remise])

  useEffect(() => {
    onChange({ key:id, label:llabel, qte, prixHt:ht, tva, remiseBase:remise })
  }, [llabel, prixTotal])

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
            {qte}
            {llabel != "" ? ` ${llabel.toLowerCase()}` : " (ligne sans nom)"} 
            {prixTotal != 0 && `: ${prixTotal}€`}
          </h1>
          <FontAwesomeIcon icon={faGear} onClick={() => setOpen(!open)} className="text-nay-cyan-200" />
          {handle && <FontAwesomeIcon icon={faGripVertical} className='text-nay-cyan-200' />}
        </div>
        {open &&
          <div className='h-fit w-64 flex gap-2 flex-col' >
            <div className='flex justify-between items-center'>
              <h1>Label:</h1>
              <InputText className='w-40' value={llabel} onChange={e => setLabel(e.target.value)} />
            </div>
            <div className='flex justify-between items-center'>
              <h1>Nombre:</h1>
              <InputNumber size={4} min={0} value={qte} onChange={e => { if (e.value) setQte(e.value); else setQte(0) }} />
            </div>
            <div className='flex justify-between items-center'>
              <h1>Prix unitaire HT:</h1>
              <div className='flex gap-2 items-center'>
                <InputNumber size={4} min={0} value={ht} onChange={e => { if (e.value) setHt(e.value); else setHt(0) }} useGrouping={false} minFractionDigits={0} maxFractionDigits={10} locale="fr-FR" />€
              </div>
            </div>
            <div className='flex justify-between items-center'>
              <h1>TVA:</h1>
              <div className='flex gap-2 items-center'>
                <Dropdown className='dropdown-tva' size={1} value={tva} onChange={(e) => { if (e.value) sanitizeTVA(e.value); else sanitizeTVA("") }} options={[{ value: "0" }, { value: "5.5" }, { value: "10" }, { value: "20" }]} optionLabel="value" optionValue='value' editable placeholder="TVA" />%
              </div>
            </div>
            <div className='flex justify-between items-center'>
              <h1>Remise:</h1>
              <div className='flex gap-2 items-center'>
                <InputNumber className='text-right' size={6} min={0} value={remise} onChange={e => { if (e.value) setRemise(e.value); else setRemise(0) }} useGrouping={false} minFractionDigits={0} maxFractionDigits={10} locale="fr-FR" /> €
              </div>
            </div>
            <BigButton text="Supprimer" icon={faCircleXmark} onClick={() => {onChange("delete")}} severity='danger' outlined={true} />
          </div>
        }
      </div>
  )
}