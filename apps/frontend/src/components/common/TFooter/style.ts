type Styles = 'footer' | 'button'

const style: Record<Styles, React.CSSProperties> = {
    footer: {
        height: '40px',
    },
    button: {
        fontWeight: 'bolder',
        cursor: 'pointer',
    },
}

export default style
