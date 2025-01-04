import style from './style'

type TFooterProps = {
    colSpan?: number
    onClick?: () => void
}

export default function TFooter({ colSpan, onClick }: TFooterProps) {
    return (
        <tfoot style={style.footer} onClick={onClick}>
            <tr>
                <td></td>
                <td colSpan={colSpan} style={style.button}>
                    + Invoice
                </td>
            </tr>
        </tfoot>
    )
}
