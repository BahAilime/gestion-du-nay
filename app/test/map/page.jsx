'use client'
import { Card } from 'primereact/card';
import { useMemo } from 'react';
import dynamic from 'next/dynamic';
import Loading from '@/src/components/Loading';

export default function Page() {
    const Map = useMemo(() => dynamic(
        () => import('@/src/components/Map'),
        { 
          loading: () => <Loading text={"Chargement de la carte..."} />,
          ssr: false
        }
      ), [])
    
    return (
        <Card className='w-full h-full'>
            <h1>Test map:</h1>
            <Map position={[46.878946414834765, -0.6522204475188746]} zoom={7} height="400px"/>
        </Card>
    )
}