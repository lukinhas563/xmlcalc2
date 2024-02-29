'use client';

import { useEffect, useState } from 'react';

export default function ButtonDownload() {
    const [tabeLine, setTableLine] = useState<NodeList | null>(null);

    useEffect(() => {
        const tableRows = document.querySelectorAll('table-line');

        setTableLine(tableRows);
    }, []);

    const download = () => {
        console.log(tabeLine);
    };

    return <div></div>;
}
