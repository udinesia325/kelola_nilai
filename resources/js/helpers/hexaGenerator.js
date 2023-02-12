export default function hexaGenerator() {

    const r = Math.floor(Math.random() * (255 - 10 + 1) + 10).toString(16)
    const g = Math.floor(Math.random() * (255 - 10 + 1) + 10).toString(16)
    const b = Math.floor(Math.random() * (255 - 10 + 1) + 10).toString(16)
    return `#${r}${g}${b}`
}