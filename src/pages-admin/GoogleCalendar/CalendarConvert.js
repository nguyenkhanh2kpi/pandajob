const convertCalendar = (listCAL) => {
  const response = []

  const item = {
    Id: 0,
    Subject: '',
    Location: '',
    StartTime: '',
    EndTime: '',
    CategoryColor: '',
  }

  listCAL.forEach((cal) => {
    let newI = { ...item }
    if (cal.type === 'EVENT') {
      newI.Subject = cal.title
      newI.Location = cal.description
      newI.StartTime = cal.date
      newI.EndTime = cal.date
      newI.ResourceId = 1
    }
    if (cal.type === 'INTERVIEW') {
      newI.Subject = cal.title
      newI.StartTime = cal.date
      newI.EndTime = cal.date
      newI.ResourceId = 2
      newI.Description = cal.detail.linkMeet
    }
    response.push(newI)
  })

  return response
}

const generateResourceData = () => {
  let data = [{
    Id: 1,
    Text: 'event',
    Color: '#e6ba43',
  },
  {
    Id: 2,
    Text: 'interview',
    Color: '#2cc973',
  }]
  return data
}

export const calendarConver = {
  convertCalendar,
  generateResourceData,
}
