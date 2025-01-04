type Styles = 'background' | 'box' | 'close' | 'header' | 'button'

const style: Record<Styles, React.CSSProperties> = {
    background: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: 'RGB(0,0,0,70%)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    box: {
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '10px',
        width: '60vw',
    },
    close: {
        display: 'none',
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '10px',
    },
    button: {
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        fontWeight: 'bolder',
        fontSize: '20px',
        color: 'grey',
    },
}

export default style
