import MenuItem from "./MenuItem";
import MenuSection from "./MenuSection";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition, faFolderPlus, faFolderTree, faUserPlus, faUsers } from '@fortawesome/free-solid-svg-icons';

export default function Menu() {
    function menuIcon(icon: IconDefinition): JSX.Element {
        return <FontAwesomeIcon icon={icon} className="text-nay-cyan-200"/>
    }
    
    return (
        <div className="flex flex-col gap-4">
            <MenuSection text="Dossiers" type="WIP">
                <MenuItem text="Nouveau dossier" icon={menuIcon(faFolderPlus)} url="/dossier/nouveau"/>
                <MenuItem text="Liste des dossiers" icon={menuIcon(faFolderTree)} url="/dossier"/>
            </MenuSection>
            <MenuSection text="Clients" type="PROD">
                <MenuItem text="Nouveau client" icon={menuIcon(faUserPlus)} url="/client/nouveau"/>
                <MenuItem text="Liste des clients" icon={menuIcon(faUsers)} url="/client"/>
            </MenuSection>
            <MenuSection text="Tests" type="DEV">
                <MenuItem text="Carte" icon={menuIcon(faFolderPlus)} url="/test/map"/>
                <MenuItem text="Carte + hook" icon={menuIcon(faFolderPlus)} url="/test/maphook"/>
            </MenuSection>
            
        </div>
    )
}