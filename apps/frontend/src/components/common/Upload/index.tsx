import { useState } from 'react'
import Button from '../Button'
import style from './style'

type UploadProps = {
    onCancel?: () => void
}

export default function Upload({ onCancel }: UploadProps) {
    const [files, setFiles] = useState<File[]>([])

    const isDisabled = files.length === 0

    const onSubmit = (event: React.FormEvent) => {
        event.preventDefault()

        if (isDisabled) {
            return
        }

        console.log('Hello')
    }

    const onChange = (event: React.FormEvent<HTMLInputElement>) => {
        const fileList = event.currentTarget.files

        if (!fileList) {
            return
        }

        const newList = [...files, fileList[0]]

        setFiles(newList)
    }

    return (
        <form onSubmit={onSubmit} style={style.form}>
            <label style={style.label}>
                <input
                    style={style.input}
                    type="file"
                    name="xml"
                    accept="xml/*"
                    onChange={onChange}
                />
            </label>

            <div style={style.content}>
                {files.map((file) => {
                    return (
                        <p key={file.name} style={style.file}>
                            {file.name}
                        </p>
                    )
                })}
            </div>

            <div style={style.footer}>
                <Button
                    styled="uncolor"
                    type="reset"
                    title="Cancel"
                    onClick={() => {
                        setFiles([])

                        if (onCancel) onCancel()
                    }}
                />
                <Button disabled={isDisabled} type="submit" title="Upload" />
            </div>
        </form>
    )
}
