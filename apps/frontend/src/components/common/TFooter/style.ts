type Styles = 'footer' | 'button' | 'page'

const style: Record<Styles, React.CSSProperties> = {
    footer: {
        height: '40px',
    },
    button: {
        fontWeight: 'bolder',
        cursor: 'pointer',
    },
    page: {
        textAlign: 'center',
    },
}

export default style
