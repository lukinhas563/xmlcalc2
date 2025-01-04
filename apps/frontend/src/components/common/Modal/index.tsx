import { ReactNode } from 'react'
import Background from './Background'
import Box from './Box'
import style from './style'

type ModalProps = {
    children?: ReactNode
    open?: boolean
    title?: string
    onClose?: (event: React.MouseEvent) => void
}

export default function Modal({
    children,
    open = false,
    title,
    onClose,
}: ModalProps) {
    return (
        <Background open={open}>
            <Box>
                <div style={style.header}>
                    <h2>{title}</h2>
                    <button style={style.button} onClick={onClose}>
                        X
                    </button>
                </div>
                {children}
            </Box>
        </Background>
    )
}
