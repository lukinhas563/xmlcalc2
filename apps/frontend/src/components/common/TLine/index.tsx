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
        <tr>
            <td>{id}</td>
            <td>{uniqKey}</td>
            <td>{issuer}</td>
            <td>{recipient}</td>
            <td>{value}</td>
        </tr>
    )
}
