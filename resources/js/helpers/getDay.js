export default function getDay(date) {
    return new Date(date).toLocaleString("id-ID", { weekday: "long" })
}