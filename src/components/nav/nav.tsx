import Image from 'next/image';
import './nav.css';

export default function MainNav() {
    return (
        <nav className="nav ">
            <Image
                src="icons/icon-logo.svg"
                width={48}
                height={63}
                alt="Picture of the author"
                className="icon-logo"
            />
        </nav>
    );
}
