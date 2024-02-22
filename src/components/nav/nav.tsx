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
            <div className="profile-info">
                <span>
                    <p className="profile-grettings">Bem-vindo</p>
                    <p>Lucas Montenegro</p>
                </span>
                <div className="profile-image">
                    <div className="profile-menu"></div>
                </div>
            </div>
        </nav>
    );
}
