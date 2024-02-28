import ButtonUpload from '@/components/buttons/button-upload';
import WindowInput from '@/components/window/window-input';
import MainTable from '@/components/table/table';
import TaxCards from '@/components/cards/cards';

export default function Home() {
    return (
        <>
            <WindowInput />
            <header className="header-input">
                <ButtonUpload />
                <ul className="animation-area">
                    <li>+</li>
                    <li>-</li>
                    <li>*</li>
                    <li>{'['}</li>
                    <li>=</li>
                    <li>/</li>
                    <li>+</li>
                    <li>=</li>
                </ul>
            </header>
            <main className="main-content">
                <div className="carousel-container">
                    <TaxCards />
                </div>
                <div className="config-table maxWidth">
                    <input type="search" placeholder="Pesquisar" />
                    <div className="config-buttons">
                        <button className="button-grid"></button>
                        <button className="button-download"></button>
                    </div>
                </div>
                <MainTable />
            </main>
            <footer>
                <p className="footer-head">Fiscalidade</p>
                <hr />
                <p className="footer-content">
                    Lucas Montenegro © São Paulo, Brasil. Todos os direitos
                    reservados
                </p>
            </footer>
        </>
    );
}
