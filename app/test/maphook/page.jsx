'use client'
import { Card } from 'primereact/card';
import useFindCoordinates from '@/src/hooks/useFindCoordinates';
import { useMemo } from 'react';
import Loading from '@/src/components/Loading';
import dynamic from 'next/dynamic';

export default function Page() {
    const Map = useMemo(() => dynamic(
        () => import('@/src/components/Map'),
        { 
          loading: () => <Loading text={"Chargement de la carte..."} />,
          ssr: false
        }
      ), [])
    
    const [coo, setQuery] = useFindCoordinates()

    return (
        <Card className='w-full h-full'>
            <h1>Test map + hook:</h1>
            <p>{JSON.stringify(coo)}</p>
            <Map position={coo} zoom={7} />
            <form onSubmit={(e) => {
                e.preventDefault()
                setQuery([document.querySelector("#query").value])
            }}>
                <input type="text" name="" id="query"/>
                <button type="submit">Submit</button>
            </form>
        </Card>
    )
}