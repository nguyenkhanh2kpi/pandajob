// handletime
export const parseDateTime = (dateTimeString) => {
  const [time, date] = dateTimeString.split(' ')
  const [hours, minutes, seconds] = time.split(':').map(Number)
  const [day, month, year] = date.split('/').map(Number)
  return new Date(year, month - 1, day, hours, minutes, seconds)
}

export const calculateTimeLeft = (endTime) => {
  const now = new Date()
  const difference = endTime - now
  const minutesLeft = Math.floor(difference / 60000)
  const secondsLeft = Math.floor((difference % 60000) / 1000)
  return {
    minutes: minutesLeft,
    seconds: secondsLeft,
  }
}
