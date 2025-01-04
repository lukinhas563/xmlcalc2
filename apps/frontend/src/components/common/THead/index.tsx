import style from './style'

type THeadProps = {
    columns: string[]
}

export default function THead({ columns }: THeadProps) {
    return (
        <thead style={style.header}>
            <tr>
                {columns.map((column) => {
                    return <th key={column}>{column}</th>
                })}
            </tr>
        </thead>
    )
}
