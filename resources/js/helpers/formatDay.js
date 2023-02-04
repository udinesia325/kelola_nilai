export default function formatDay(date) {
    return new Date(date).toLocaleString('id', { weekday: 'long' })
}