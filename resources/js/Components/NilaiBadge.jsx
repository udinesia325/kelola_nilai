import React from 'react'

function NilaiBadge({ nilai }) {
    let badgeType;
    if (nilai >= 80) {
        badgeType = "badge-success"
    } else if (nilai < 80 && nilai >= 60) {
        badgeType = "badge-warning"
    } else {
        badgeType = "badge-error"
    }
    return (
        <div className={`badge ${badgeType} badge-lg font-bold `}>{nilai}</div>
    )
}

export default NilaiBadge