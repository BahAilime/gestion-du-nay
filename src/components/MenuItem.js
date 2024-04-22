import Link from "next/link"

export default function MenuItem({ text="", url="#", icon = null }) {
    return (
            <Link className="flex items-center gap-2 w-max ml-1" href={url}>{icon && icon}<h1>{text}</h1></Link>
    )
}