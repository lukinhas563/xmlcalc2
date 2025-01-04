import Button from '../Button'
import style from './style'

export default function Upload() {
    const onSubmit = (event: React.FormEvent) => {
        event.preventDefault()

        console.log('newArray')
    }

    return (
        <form onSubmit={onSubmit} style={style.form}>
            <label style={style.label}>
                <input
                    style={style.input}
                    type="file"
                    name="xml"
                    accept="xml/*"
                />
            </label>
            <div style={style.footer}>
                <Button styled="uncolor" type="reset" title="Cancel" />
                <Button type="submit" title="Upload" />
            </div>
        </form>
    )
}
