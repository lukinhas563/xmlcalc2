import Button from '../Button'
import style from './style'

type TFooterProps = {
    colSpan?: number
    onClick?: () => void
    onPageDown?: () => void
    onPageUp?: () => void
    isDownDisable?: boolean
    isUpDisable?: boolean
}

export default function TFooter({ colSpan, onClick, onPageDown, onPageUp, isDownDisable, isUpDisable }: TFooterProps) {
    return (
        <tfoot style={style.footer}>
            <tr>
                <td></td>
                <td colSpan={colSpan} style={style.button} onClick={onClick}>
                    + Invoice
                </td>
                <td>
                    <Button disabled={isDownDisable} styled='uncolor' title='<' onClick={onPageDown}/>
                    <Button disabled={isUpDisable} styled='uncolor' title='>'onClick={onPageUp}/>
                </td>
            </tr>
        </tfoot>
    )
}
