import { useState } from 'react'
import Button from '../Button'
import Modal from '../Modal'
import style from './style'
import { useDeleteInvoice } from '../../../hooks/graphql/mutations/useDeleteInvoice'
import { UseQueryExecute } from 'urql'

type TLineProps = {
    id: number
    uniqKey: string
    issuer: string
    recipient: string
    value: number
    refetchInvoice?: UseQueryExecute
}

export default function TLine({
    id,
    uniqKey,
    issuer,
    recipient,
    value,
    refetchInvoice,
}: TLineProps) {
    const [openModalDelete, setOpenModalDelete] = useState(false)
    const [disabled, setDisabled] = useState(false)
    const [, deleteInvoice] = useDeleteInvoice()

    const handleModalOpen = () => {
        setOpenModalDelete(true)
    }

    const handleModalClose = () => {
        setOpenModalDelete(false)
    }

    const handleDeleteInvoice = async (id: number) => {
        if (disabled) {
            return
        }

        setDisabled(true)

        try {
            const result = await deleteInvoice({ deleteInvoiceId: Number(id) })
            console.log('Deleted successfully', result)

            if (refetchInvoice) {
                refetchInvoice({ requestPolicy: 'network-only' })
            }

            setDisabled(false)
            setOpenModalDelete(false)
        } catch (error) {
            console.error('Delete failed', error)
            setDisabled(false)
            setOpenModalDelete(false)
        }
    }

    return (
        <tr style={style.line}>
            <td style={style.column}>{id}</td>
            <td>{uniqKey}</td>
            <td>{issuer}</td>
            <td>{recipient}</td>
            <td style={style.column}>R$ {value.toFixed(2)}</td>
            <td style={style.column}>
                <Button styled="uncolor" title="X" onClick={handleModalOpen} />
            </td>

            <Modal
                key={id}
                open={openModalDelete}
                onClose={handleModalClose}
                title="Delete"
            >
                <p>Are you sure you want to delete this invoice?</p>

                <div style={style.footer}>
                    <Button
                        styled="uncolor"
                        title="Cancel"
                        onClick={handleModalClose}
                    />
                    <Button
                        styled="default"
                        title="Delete"
                        disabled={disabled}
                        onClick={() => handleDeleteInvoice(id)}
                    />
                </div>
            </Modal>
        </tr>
    )
}
