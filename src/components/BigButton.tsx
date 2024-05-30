import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button } from 'primereact/button';

export default function BigButton({
    text = "",
    onClick = () => { },
    icon = null,
    className,
    outlined = false,
    severity
}: {
    text?: string,
    onClick: () => void,
    icon?: any,
    className?: string,
    outlined?: boolean,
    severity?: "info" | "secondary" | "success" | "warning" | "danger" | "help" | undefined
}) {
    return (<Button onClick={onClick} className={"w-full flex justify-center gap-2 " + className} outlined={outlined} {...(severity && { severity })}>
        {icon && <FontAwesomeIcon icon={icon} />}
        {text}
    </Button>)
}