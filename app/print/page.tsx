'use client'
import { Page, Document, Image, StyleSheet, View, Text, Link } from '@react-pdf/renderer';
import { Table, TR, TH, TD } from '@ag-media/react-pdf-table';
import { PDFViewer } from '@react-pdf/renderer'
import { useEffect, useState } from 'react';
import nayLogo from '@/public/nayLogo.png'

const styles = StyleSheet.create({
  page: {
    fontFamily: 'Helvetica',
    fontSize: 11,
    paddingTop: 20,
    paddingLeft: 20,
    paddingRight: 20,
    lineHeight: 1,
    flexDirection: 'column',
  },
  logo: {
    width: 130,
    marginLeft: 'auto',
    marginRight: 'auto'
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  infosNay: {
    marginLeft: 'auto',
    marginRight: 'auto',
    lineHeight: 1.2,
    flex: 1
  },
  infosNayLine: {
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  infosClient: {
    flex: 1,
    gap: 3,
    lineHeight: 1.2,
  }
});

export default function Home() {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  return (
    <>
      {isClient && <PDFViewer style={{ width: '100%', height: '100%' }} showToolbar={true}>
        <Document title='Devis' language='fr'>
          <Page size="A4" style={styles.page}>
            <View style={styles.header}>

              {/* HEADER */}
              <View style={styles.infosNay}>
                <Image src={nayLogo.src} style={styles.logo} />
                <Text style={styles.infosNayLine}>Régie d'Hébergement</Text>
                <Text style={styles.infosNayLine}>8 Le Nay - 79140 Le Pin</Text>
                <Text style={styles.infosNayLine}>Tel: 05.49.81.59.60</Text>
                <Text style={styles.infosNayLine}>Mail: nay@wanadoo.fr</Text>
                <Text style={styles.infosNayLine}>N° SIRET: 217 902 105 00063</Text>
              </View>
              <View style={styles.infosClient}>
                <View style={{
                  display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
                  width: '100%', padding: 3, paddingRight: 50,
                  border: '1px solid black'
                }}>
                  <Text>Devis du 17 novembre 2023</Text>
                  <Text>N°50</Text>
                </View>
                <View style={{ border: '1px solid black', padding: 3 }}>
                  <Text>COTE DECOUVERTE</Text>
                  <Text>M Albanesi</Text>
                  <Text>70 impase du Ru</Text>
                  <Text>74450 St Jean-de-Sixt</Text>
                  <Text>{"\n"}</Text>
                  <Text>Tel: 04 50 32 00 28 / 06 07 45 79 40</Text>
                  <Link href="mailto:contact@cote-decouverte.fr">contact@cote-decouverte.fr</Link>
                </View>
              </View>
            </View>

            {/* REF/BASE */}
            <View style={{ display: 'flex', flexDirection: 'column', marginTop: 3, gap: 2 }}>
              <Text style={{ border: '1px solid black', padding: 3 }}>Référence: Séjour du 17 au 21 juin 2024 pour 54 enfants (CM1/CM2) + 6 adultes + 1 chauffeur</Text>
              <Text style={{ border: '1px solid black', padding: 3 }}>Base: 4 nuits, 4 petits déjeuners, 4 pique-niques, 4 goûters</Text>
              <Text style={{ border: '1px solid black', padding: 3 }}>Infos: +2 repas enfant</Text>
            </View>

            {/* CONTENU */}

            <Text style={{ textAlign: 'center', marginTop: 5 }}>{"\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n"}</Text>

            {/* TOTAL */}
            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
              <Table style={{width:"48%", marginTop: 5, marginBottom: 5}} tdStyle={{ padding: 2}}>
                <TH>
                  <TD><Text>Nombre de nuits</Text></TD>
                  <TD weighting={.2}><Text style={{ textAlign: 'center', width: '100%' }}>0</Text></TD>
                </TH>
                <TR>
                  <TD><Text>Nombre personnes hébérgées</Text></TD>
                  <TD weighting={.2}><Text style={{ textAlign: 'center', width: '100%' }}>0</Text></TD>
                </TR>
                <TR>
                  <TD><Text>Nombre de personne(s) exonérée(s)</Text></TD>
                  <TD weighting={.2}><Text style={{ textAlign: 'center', width: '100%' }}>0</Text></TD>
                </TR>
                <TR>
                  <TD><Text>Nombre de personne(s) réglant la taxe</Text></TD>
                  <TD weighting={.2}><Text style={{ textAlign: 'center', width: '100%' }}>0</Text></TD>
                </TR>
                <TR>
                  <TD><Text>Montant taxe de séjour</Text></TD>
                  <TD weighting={.2}><Text style={{ textAlign: 'center', width: '100%', color: 'red' }}>0,00€</Text></TD>
                </TR>
              </Table>

              <Table style={{width:"22%", marginTop: 5, marginBottom: 5}} tdStyle={{ padding: 2}}>
                <TH>
                  <TD><Text>Total HT</Text></TD>
                  <TD weighting={.3}><Text style={{ textAlign: 'center', width: '100%' }}>0</Text></TD>
                </TH>
                <TR>
                  <TD><Text>TVA</Text></TD>
                  <TD weighting={.3}><Text style={{ textAlign: 'center', width: '100%' }}>0</Text></TD>
                </TR>
                <TR>
                  <TD><Text>Total séjour</Text></TD>
                  <TD weighting={.3}><Text style={{ textAlign: 'center', width: '100%' }}>0</Text></TD>
                </TR>
                <TR>
                  <TD><Text>Accompte</Text></TD>
                  <TD weighting={.3}><Text style={{ textAlign: 'center', width: '100%' }}>0</Text></TD>
                </TR>
                <TR>
                  <TD><Text>SOLDE TTC</Text></TD>
                  <TD weighting={.3}><Text style={{ textAlign: 'center', width: '100%', color: 'red' }}>0,00€</Text></TD>
                </TR>
              </Table>
            </View>

            {/* FOOTER */}
            <View style={{border: '1px solid black', padding: 3, lineHeight: 1.2, fontSize: 9}}>
              <Text style={{color: 'darkred', textAlign: 'center'}}>Veuillez s'il vous plait libeller vos chèques à l'ordre du Trésor Public ou virement:</Text>
              <Text style={{textAlign: 'center'}}>RIB: 30001 0062 F7920000000 50</Text>
              <Text style={{textAlign: 'center'}}>IBAN: FR13 3000 1006 02F7 9200 0000 50</Text>
              <Text style={{textAlign: 'center'}}>BIC: BDFERPPCCT</Text>
            </View>
          </Page>
        </Document>
      </PDFViewer>}
    </>
  )
}