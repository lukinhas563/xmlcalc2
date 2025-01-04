import style from './style'

type ButtonProps = {
    title: string
    type?: 'submit' | 'reset' | 'button' | undefined
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void
    styled?: 'default' | 'uncolor'
    disabled?: boolean
}

export default function Button({
    title,
    type,
    onClick,
    styled = 'default',
    disabled = false,
}: ButtonProps) {
    if (styled === 'uncolor') {
        return (
            <button
                style={disabled ? style.disabled : style.uncolor}
                type={type}
                onClick={onClick}
            >
                {title}
            </button>
        )
    }

    return (
        <button
            style={disabled ? style.disabled : style.default}
            type={type}
            onClick={onClick}
        >
            {title}
        </button>
    )
}
