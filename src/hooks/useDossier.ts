import { useState } from "react";
import { dossier } from "../services/db";

type infos = "infos.debut"|"infos.fin"|"infos.adultes"|"infos.enfants"|"infos.nuits"
type nuits = "nuits.drap"|"nuits.lines"
type repas = "repas.servi"|"repas.lines"
type dossierAttributeName = "idClient"|"client"|infos|nuits|repas|"activite"|"divers"

export default function useDossier(dossierDefault: dossier|undefined = {idClient: ""}): [dossier, (attr: dossierAttributeName|"all", value: any) => void] {
    const [dossier, _setDossier] = useState<dossier>(dossierDefault)

    function setDossier(attribute:dossierAttributeName|"all" , value: any) {
        switch (attribute) {
            case "idClient":
                if (value == dossier.idClient) return
                _setDossier({...dossier, idClient: value})
                break;
            
            case "client":
                if (value == dossier.client) return
                _setDossier({...dossier, client: value})
                break;
            
            case "infos.debut":
                if (value == dossier.infos?.debut) return
                _setDossier({...dossier, infos: {...dossier.infos, debut: value}})
                break;

            case "infos.fin":
                if (value == dossier.infos?.fin) return
                _setDossier({...dossier, infos: {...dossier.infos, fin: value}})
                break;
            
            case "infos.adultes":
                if (value == dossier.infos?.adultes) return
                _setDossier({...dossier, infos: {...dossier.infos, adultes: value}})
                break;
            
            case "infos.enfants":
                if (value == dossier.infos?.enfants) return
                _setDossier({...dossier, infos: {...dossier.infos, enfants: value}})
                break;
            
            case "infos.nuits":
                if (value == dossier.infos?.nuits) return
                _setDossier({...dossier, infos: {...dossier.infos, nuits: value}})
                break;
            
            case "nuits.drap":
                if (value == dossier.nuits?.drap) return
                _setDossier({...dossier, nuits: {...dossier.nuits, drap: value}})
                break;

            case "nuits.lines":
                if (value == dossier.nuits?.lines) return
                _setDossier({...dossier, nuits: {...dossier.nuits, lines: value}})
                break;

            case "repas.servi":
                if (value == dossier.repas?.servi) return
                _setDossier({...dossier, repas: {...dossier.repas, servi: value}})
                break;
            
            case "repas.lines":
                if (value == dossier.repas?.lines) return
                _setDossier({...dossier, repas: {...dossier.repas, lines: value}})
                break;
            
            case "activite":
                _setDossier({...dossier, activite: value})
                break;
        
            default:
                break;
        }
    }

    return [dossier, setDossier]
}