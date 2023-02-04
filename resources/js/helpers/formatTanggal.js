import formatDay from "./formatDay"

const formatTanggal = (date) => {
    // jika tanggal tidak valid maka kembalikan string kosong
    if(isNaN(new Date(date).getTime())) return ""
    const hari = formatDay(date)
    const opt = { day: "numeric", month: "short", year: "numeric" }
    const result = hari + " " + new Date(date).toLocaleDateString("id-ID", opt)
    return result

}
export default formatTanggal