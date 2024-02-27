interface OptionsProps {
    toggle: boolean;
    index: number;
}

export default function TableOptions({ toggle, index }: OptionsProps) {
    const handleClick = (e: MouseEvent) => {
        console.log(index);
    };

    return (
        <div className={`table-menu ${toggle ? 'expansive-menu' : ''} `}>
            <ul className="table-menu-options">
                <li>
                    <span className="menu-download"></span>
                    Download
                </li>
                <li>
                    <span className="menu-edit"></span>Edit
                </li>
                <li
                    className="menu-delete-content"
                    onClick={(e) => handleClick(e)}
                >
                    <span className="menu-delete"></span>
                    Delete
                </li>
            </ul>
        </div>
    );
}
