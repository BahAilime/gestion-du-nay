import Link from "next/link"

export default function MenuItem({ text="", url="#", icon = null }: { text?: string, url?: string, icon?: JSX.Element|null }) {
    return (
            <Link className="flex items-center gap-2 w-max ml-1" href={url}>{icon && icon}<h1>{text}</h1></Link>
    )
}