export function tableOrderUrl(tableId,restaurantSlug='yorkshire-kitchen'){return `${window.location.origin}/table/${encodeURIComponent(tableId)}?restaurant=${encodeURIComponent(restaurantSlug)}`}
export function qrImageUrl(tableId,restaurantSlug){const data=tableOrderUrl(tableId,restaurantSlug);return `https://api.qrserver.com/v1/create-qr-code/?size=260x260&data=${encodeURIComponent(data)}`}
