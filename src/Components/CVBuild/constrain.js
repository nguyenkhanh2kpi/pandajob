export const initState = {
  name: 'Nguyễn Lê Quốc Khánh',
  position: 'FullStack Developer',
  info: [
    ['Tên', 'Nguyễn Lê Quốc Khánh'],
    ['Ngày sinh', '10/02/2002'],
    ['Số điện thoại', '0349519943'],
    ['Gmail', 'nguyenkhanh2kpi@gmail.com'],
    ['Địa chỉ', 'Tân Thanh, Lâm Hà, Lâm Đồng'],
  ],
  overview: `- Over 2 years of experience in programming with good communication and quick learning skills\n- Over 2 years of experience in programming with good communication and quick learning skills\n- Over 2 years of experience in programming with good communication and quick learning skills\n- Over 2 years of experience in programming with good communication and quick learning skills\n- Over 2 years of experience in programming with good communication and quick learning skills`,
  expr: [
    ['07/2015 - 03/2018', 'AI&T JSC', `Full-stack Developer\n- Outsourcing projects\n- Create coding frames and design database based on project descriptions`],
    ['01/2019 - 01/2020', 'Freelance', `Full-stack Developer\n- Develop web module on given projects.`],
  ],
  edu: [
    ['08/2020 - 08/2024', 'HCMUTE University', `- Khóc hơn chục lần\n- Deadline tới chết\n`],
    ['10/2020 - 12/2020', 'Toeic Time', `- Học Tiếng Anh mục tiêu 600\n- Ra trường với Toeic cao`],
    ['08/2020 - 08/2024', 'Life Cycle', `- Ăn và code tới khi không ngồi được nữa`],
  ],
  skill: [
    ['Kĩ năng chính', '- HTML, CSS, JavaScript (ReactJS, React-Native, Lit)\n- PHP (Laravel, Symfony, Codeigniter, Yii)\n- Node (ExpressJS)\n- RESTful API, GraphQL'],
    ['Khác', '- Ruby (Ruby on Rails)\n- SVN, GIT'],
  ],
  proj: [
    {
      name: 'Apply Job Web',
      time: '06/2023 - Present',
      client: 'Team 03',
      desc: 'Design and Build an Apply Job website',
      noOfMem: 7,
      pos: 'Front End Dev',
      responsibility: '- Dev\n- Solution Architect',
      technology: '- Frontend: ReactJS\n- Backend: Java \n- Database: GraphQL',
    },
  ],
}

export const convertResponseToCVForm = (response) => {
  const parsedResumeJson = JSON.parse(response.resumeJson)
  initState.name = parsedResumeJson.fullName
  initState.position = parsedResumeJson.applicationPosition
  initState.info = [
    ['Tên', parsedResumeJson.fullName],
    ['Ngày sinh', parsedResumeJson.dateOB],
    ['Số điện thoại', parsedResumeJson.phone],
    ['Gmail', parsedResumeJson.email],
    ['Địa chỉ', parsedResumeJson.address],
  ]
  initState.expr = []
  parsedResumeJson.workingExperiences.map((item) => {
    initState.expr.push([`${item.startWorkingTime}  -  ${item.endWorkingTime}`, item.companyName, `- ${item.position}\n- ${item.jobDetail}\n - ${item.technology}`])
  })

  initState.edu = []
  parsedResumeJson.education.map((item) => {
    initState.edu.push([`${item.startEducationTime} - ${item.endEducationTime}`, item.school, `- ${item.degree}\n- ${item.major}\n- ${item.others}`])
  })
  initState.skill = []
  initState.skill = [
    ['Kĩ năng chính', `- ${parsedResumeJson.mainSkill}`],
    ['Khác', `- ${parsedResumeJson.skills.map((skill) => `${skill.name}: ${skill.description}`).join('\n- ')}`],
  ]
  initState.overview = parsedResumeJson.aboutYourself
  initState.proj = []
  parsedResumeJson.workingProjects.map((project) => {
    initState.proj.push({
      name: project.nameProject,
      time: `${project.startTime}  -  ${project.endTime}`,
      client: project.client,
      desc: project.description,
      noOfMem: project.members,
      pos: project.position,
      responsibility: project.responsibilities,
      technology: project.technology,
    })
  })
  return initState
}
