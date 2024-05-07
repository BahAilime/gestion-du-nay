export default function MenuSection({ text="", type, children }: { text?: string, type: "DEV"|"PROD"|"WIP", children: React.ReactNode }) {
    const render = type === "PROD" || process.env.NODE_ENV === 'development'
    const sectionName = type === "PROD" ? <>{text}</> : <>{text} <span className="text-nay-orange-400">({type})</span></>

    if (render) {
        return <>
        <h1 className="font-bold text-nay-cyan-200 my-1 tracking-widest">{sectionName}</h1>
        {children}
    </>
    }
}