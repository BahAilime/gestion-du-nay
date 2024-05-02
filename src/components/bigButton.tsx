import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button } from 'primereact/button';

export default function BigButton({ text="", onClick=()=>{}, icon = null }: { text?: string, onClick: () => void, icon?: any }) {
    return (<Button onClick={onClick} className="w-full flex justify-center gap-2">
        {icon && <FontAwesomeIcon icon={icon} />}
        {text}
    </Button>)
}