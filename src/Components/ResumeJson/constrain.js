export const degrees = ['Đại học', 'Cao đẳng', 'Trung cấp', 'Sau đại học (thạc sĩ, tiến sĩ)', 'Trung tâm đào tạo', 'Du học']
export const newWorkExpSample = {
  companyName: '',
  position: '',
  startWorkingTime: '',
  endWorkingTime: '',
  jobDetail: '',
  technology: '',
}
export const newEducation = {
  school: '',
  major: '',
  startEducationTime: '',
  endEducationTime: '',
  degree: '',
  others: '',
}
export const newSkill = {
  name: '',
  description: '',
}
export const newProject = {
  nameProject: '',
  startTime: '',
  endTime: '',
  client: '',
  description: '',
  members: '',
  position: '',
  responsibilities: '',
  technology: '',
}
export const newCertificate = {
  time: '',
  name: '',
}

export const newActivity = {
  start: '',
  end: '',
  name_organization: '',
  position: '',
  description: '',
}
export const newTitleAward = {
  time: '',
  name: '',
}

export const initialResumeJson = {
  fullName: '',
  applicationPosition: '',
  email: '',
  phone: '',
  gender: '',
  dateOB: '',
  city: '',
  address: '',
  linkedIn: '',
  github: '',
  aboutYourself: '',
  workingExperiences: [
    {
      companyName: '',
      startWorkingTime: '',
      endWorkingTime: '',
      position: '',
      jobDetail: '',
      technology: '',
    },
  ],
  mainSkill: '',
  skills: [
    {
      name: '',
      description: '',
    },
  ],
  education: [
    {
      school: '',
      degree: '',
      startEducationTime: '',
      endEducationTime: '',
      major: '',
      others: '',
    },
  ],
  workingProjects: [
    {
      nameProject: '',
      startTime: '',
      endTime: '',
      client: '',
      description: '',
      members: '',
      position: '',
      responsibilities: '',
      technology: '',
    },
  ],
  certificate: [
    {
      time: '',
      name: '',
    },
  ],
  activate: [
    {
      start: '',
      end: '',
      name_organization: '',
      position: '',
      description: '',
    },
  ],
  title_award: [
    {
      time: '',
      name: '',
    },
  ],
  favorite: '',
  presenter: '',
  more: '',
}

export const sampleJson = {
  fullName: 'Chiến Nguyễn',
  applicationPosition: 'Kỹ sư phần mềm',
  email: 'chiennguyen2002@gmail.com',
  phone: '0912345678',
  gender: 'Male',
  dateOB: '2002-05-14',
  city: 'Hà Nội',
  address: '123 Phạm Văn Đồng, Hà Nội',
  linkedIn: 'https://linkedin.com/in/chiennguyen',
  github: 'https://github.com/chiennguyen',
  aboutYourself: 'Tôi là một kỹ sư phần mềm đam mê với sự quan tâm mạnh mẽ vào phát triển backend và kỹ thuật dữ liệu. Tôi thích giải quyết các vấn đề phức tạp và luôn học hỏi các công nghệ mới.',
  workingExperiences: [
    {
      companyName: 'Công ty ABC',
      startWorkingTime: '2024-05-01',
      endWorkingTime: '2024-08-01',
      position: 'Thực tập sinh',
      jobDetail: 'Phát triển các API RESTful và dịch vụ microservices bằng Java và framework Spring Boot. Làm việc trên thiết kế và tối ưu hóa cơ sở dữ liệu.',
      technology: 'Java, Spring Boot, MySQL',
    },
    {
      companyName: 'Công ty XYZ',
      startWorkingTime: '2024-05-15',
      endWorkingTime: '2024-08-15',
      position: 'Thực tập sinh phát triển phần mềm',
      jobDetail: 'Đóng góp vào việc phát triển một ứng dụng web cho quản lý hàng tồn kho. Thực hiện các tính năng frontend bằng React và dịch vụ backend bằng Node.js và Express.',
      technology: 'React, Node.js, Express',
    },
  ],
  mainSkill: '',
  skills: [
    {
      name: 'name',
      description: 'des',
    },
    {
      name: 'name',
      description: 'des',
    },
  ],
  education: [
    {
      school: 'Trường Đại học Công nghệ, Hà Nội',
      degree: 'Đại học',
      startEducationTime: '2020-09-01',
      endEducationTime: '2024-06-01',
      major: 'Khoa học Máy tính',
      others: 'Người chiến thắng cuộc thi lập trình của trường Đại học vào năm 2023.',
    },
    {
      school: 'Trường Đại học Công nghệ, Hà Nội',
      degree: 'Sau đại học (thạc sĩ, tiến sĩ)',
      startEducationTime: '2020-09-01',
      endEducationTime: '2024-06-01',
      major: 'Khoa học Máy tính',
      others: '',
    },
  ],
  workingProjects: [
    {
      nameProject: 'Website Thương mại điện tử',
      startTime: '2024-06-01',
      endTime: '2024-06-07',
      client: 'Công ty ABC',
      description: 'Phát triển một trang web thương mại điện tử hoàn chỉnh với chức năng xác thực người dùng, duyệt sản phẩm và thanh toán.',
      members: 'Nhóm 4 nhà phát triển',
      position: 'Phát triển Backend',
      responsibilities: 'Thiết kế và triển khai các dịch vụ backend, tích hợp cổng thanh toán và tối ưu hóa truy vấn cơ sở dữ liệu.',
      technology: 'Java, Spring Boot, MySQL',
    },
    {
      nameProject: 'Hệ thống Quản lý Hàng tồn kho',
      startTime: '2024-04-01',
      endTime: '2024-06-01',
      client: 'Công ty XYZ',
      description: 'Xây dựng một hệ thống quản lý hàng tồn kho dựa trên web để tối ưu hóa quy trình theo dõi hàng tồn kho của khách hàng.',
      members: 'Nhóm 3 nhà phát triển',
      position: 'Phát triển phần mềm',
      responsibilities: 'Phát triển các thành phần frontend, triển khai logic backend và thực hiện kiểm thử hệ thống.',
      technology: 'React, Node.js, Express, MongoDB',
    },
  ],
  certificate: [
    {
      time: '2023-12-01',
      name: 'Chứng chỉ Java Developer - Oracle Certified Professional',
    },
    {
      time: '2024-02-01',
      name: 'Chứng chỉ Spring Professional - Pivotal Certified',
    },
  ],
  activate: [
    {
      start: '2022-09-01',
      end: '2024-06-01',
      name_organization: 'Câu lạc bộ Công nghệ Thông tin của Trường Đại học Công nghệ, Hà Nội',
      position: 'Thành viên Ban Chấp Hành',
      description: 'Tham gia vào việc tổ chức các sự kiện, hội thảo công nghệ và hỗ trợ các dự án lập trình của sinh viên.',
    },
  ],
  title_award: [
    {
      time: '2023-03-01',
      name: 'Giải Nhất cuộc thi lập trình Hackathon 2023',
    },
    {
      time: '2023-09-01',
      name: 'Giải Ba cuộc thi lập trình ACM ICPC khu vực miền Bắc 2023',
    },
  ],
  favorite: '',
  presenter: '',
  more: '',
}
