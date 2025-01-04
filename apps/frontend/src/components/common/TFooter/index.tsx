import style from './style'

type TFooterProps = {
    colSpan?: number
}

export default function TFooter({ colSpan }: TFooterProps) {
    return (
        <tfoot style={style.footer}>
            <tr>
                <td></td>
                <td colSpan={colSpan}>+ Invoice</td>
            </tr>
        </tfoot>
    )
}
