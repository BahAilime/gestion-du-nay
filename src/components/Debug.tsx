export default function Debug({ children }: { children: React.ReactNode }) {
    if (process.env.NODE_ENV === 'development') {
        return <>{children}</>
    } else {
        return <></>
    }
}