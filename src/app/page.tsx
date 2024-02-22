import ButtonUpload from '@/components/buttons/button-upload';
import MainTable from '@/components/table/table';
import WindowInput from '@/components/window/window-input';

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
                    <div className="card">
                        <div className="card-container-header">
                            <p>Total</p>
                            <p className="card-container-config">⋮</p>
                        </div>
                        <div className="card-container-content">
                            <p className="card-content-price">R$</p>
                            <p className="card-content-mainprice">50</p>
                            <p className="card-content-cents">90</p>
                        </div>
                    </div>
                    <div className="card">
                        <div className="card-container-header">
                            <p>Total</p>
                            <p className="card-container-config">⋮</p>
                        </div>
                        <div className="card-container-content">
                            <p className="card-content-price">R$</p>
                            <p className="card-content-mainprice">50</p>
                            <p className="card-content-cents">90</p>
                        </div>
                    </div>
                    <div className="card">
                        <div className="card-container-header">
                            <p>Total</p>
                            <p className="card-container-config">⋮</p>
                        </div>
                        <div className="card-container-content">
                            <p className="card-content-price">R$</p>
                            <p className="card-content-mainprice">50</p>
                            <p className="card-content-cents">90</p>
                        </div>
                    </div>
                    <div className="card">
                        <div className="card-container-header">
                            <p>Total</p>
                            <p className="card-container-config">⋮</p>
                        </div>
                        <div className="card-container-content">
                            <p className="card-content-price">R$</p>
                            <p className="card-content-mainprice">50</p>
                            <p className="card-content-cents">90</p>
                        </div>
                    </div>
                    <div className="card">
                        <div className="card-container-header">
                            <p>Total</p>
                            <p className="card-container-config">⋮</p>
                        </div>
                        <div className="card-container-content">
                            <p className="card-content-price">R$</p>
                            <p className="card-content-mainprice">50</p>
                            <p className="card-content-cents">90</p>
                        </div>
                    </div>
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
