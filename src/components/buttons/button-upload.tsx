'use client';

import Image from 'next/image';

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
            <Image
                src="icons/icon-upload.svg"
                alt="icon-upload"
                width={150}
                height={150}
                className="icon-upload"
            />
        </button>
    );
}
