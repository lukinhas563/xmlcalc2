'use client';
import './window-input.css';

export default function WindowInput() {
    function handleClosed(e) {
        e.preventDefault();

        const windowInput = document.querySelector(
            '.form-background',
        ) as HTMLDivElement;

        if (windowInput.classList[1] === 'open-closed') {
            windowInput.classList.remove('open-closed');
        } else {
            windowInput.classList.add('open-closed');
        }
    }

    return (
        <div className="form-background ">
            <form className="form-container">
                <button onClick={(e) => handleClosed(e)}>CLOSED</button>
                <input type="file" />
            </form>
        </div>
    );
}
