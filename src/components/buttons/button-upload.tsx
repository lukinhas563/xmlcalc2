'use client';

export default function ButtonUpload() {
    function handleButtonClick(): void {
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
        <button className="button-upload" onClick={() => handleButtonClick()}>
            <img src="icons/icon-upload.svg" className="icon-upload"></img>
        </button>
    );
}
