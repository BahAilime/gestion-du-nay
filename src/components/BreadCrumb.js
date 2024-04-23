import { usePathname } from 'next/navigation';
import Link from "next/link";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse } from '@fortawesome/free-solid-svg-icons';
import { BreadCrumb as Bread } from 'primereact/breadcrumb';

export default function BreadCrumb() {
    const pathlist = usePathname().split('/')
    const breadcrumbItems = []
    for (let i = 0; i < pathlist.length; i++) {
        if (pathlist[i] === "") continue
        breadcrumbItems.push({
            template: () => <Link
                href={"/" + pathlist.slice(1, i + 1).join("/")}
                className='hover:text-nay-orange'
            >
                {pathlist[i][0].toUpperCase() + pathlist[i].slice(1)}
            </Link>
        })
    }

    const home = { template: () => <Link href="/"><FontAwesomeIcon icon={faHouse} className='text-nay-orange' /></Link>}

    return (
        <Bread model={breadcrumbItems} home={home} className='w-max'/>
    )
}