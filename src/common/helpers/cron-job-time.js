export const convertMinutesToCronJobTime = minutes => {
  const hours = Math.floor(minutes / 60)
  const cronHours = hours === 0 ? '*' : `*/${hours}`

  const minutesReminder = minutes % 60
  const cronMinutes = minutesReminder === 0 ? '*' : `*/${minutesReminder}`

  return `${cronMinutes} ${cronHours} * * *`
}
