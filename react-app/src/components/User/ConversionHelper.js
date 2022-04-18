export const convertToDayAge = (dateObj) => {
  const today = new Date();
  const createdAt = new Date(dateObj)
  const year = today.getFullYear() - createdAt.getFullYear()
  const month = today.getMonth() - createdAt.getMonth()
  const day = today.getDate() - createdAt.getDate()
  const hour = today.getHours() - createdAt.getHours()
  const minute = today.getMinutes() - createdAt.getMinutes()

  if (year > 0) return `${year}y`
  if (month > 0) return `${month}m`
  if (day > 0) return `${day}d`
  if (hour > 0) return `${hour}h`
  if (minute > 0) return `${minute}m}`
}
