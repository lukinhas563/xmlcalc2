import style from './style'

type TLineProps = {
    id: number
    uniqKey: string
    issuer: string
    recipient: string
    value: number
}

export default function TLine({
    id,
    uniqKey,
    issuer,
    recipient,
    value,
}: TLineProps) {
    return (
        <tr style={style.line}>
            <td style={style.column}>{id}</td>
            <td>{uniqKey}</td>
            <td>{issuer}</td>
            <td>{recipient}</td>
            <td style={style.column}>R$ {value}</td>
        </tr>
    )
}
