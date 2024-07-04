export const mock2Jobs = [
  {
    id: 1,
    name: 'Developer',
    position: 'TP HCM',
    salary: 'Negotiable',
    detailLocation: 'Job description for Developer',
  },
  {
    id: 2,
    name: 'Designer',
    position: 'Hà Nội',
    salary: 'Competitive',
    detailLocation: 'Job description for Designer',
  },
]

export const mockACompany = {
  id: 1,
  name: 'Công ty ABC',
  avatar: 'https://example.com/avatar.png',
  website: 'https://example.com',
  phone: '0123456789',
  info: 'Thông tin công ty ABC',
  address: '123 Đường ABC, Quận XYZ, TP HCM',
}

export const mockAllCompany = [
  {
    id: 1,
    name: 'CÔNG TY TNHH BUYMED',
    avatar: 'https://firebasestorage.googleapis.com/v0/b/upload2-23381.appspot.com/o/files%2FCloudCfo-Financial-Ratios.png?alt=media&token=f456c667-f27c-459f-a246-9ab5ffa86f67',
    website: 'https://thuocsi.vn/',
    address: 'Tầng 8, Tòa nhà Vincom Center Đồng Khởi, 72 Lê Thánh Tôn - Phường Bến Nghé - Quận 1 - TP Hồ Chí Minh. ',
    phone: '0123456776',
    info: 'thuocsi.vn được thành lập từ năm 2018, là một trong những startup thành công trong lĩnh vực công nghệ về y tế',
    userId: 2,
  },
  {
    id: 2,
    name: 'CÔNG TY TNHH KIN LONG VIỆT NAM',
    avatar: 'https://static.topcv.vn/company_covers/cong-ty-tnhh-kin-long-viet-nam-211e12c68ebec40e7a3395b793500466-65421fc34c31c.jpg',
    website: 'https://kinlong.vn/',
    address: 'Tầng 3 TTTM, tòa nhà CTM Complex, số 139 Cầu Giấy, Phường Quan Hoa, Quận Cầu Giấy, Hà Nội',
    phone: '0987654321',
    info: 'Kin Long là một doanh nghiệp quy mô lớn trong ngành ngũ kim Trung Quốc, là công ty chuyên nghiệp tham gia vào lĩnh vực nghiên cứu, chế tạo và phân phối các sản phẩm ngũ kim chất lượng cao.',
    userId: 3,
  },
]

export const mockProvinces = [
  {
    id: '89',
    name: 'Ha Noi',
    name_en: 'An Giang',
    full_name: 'Tỉnh An Giang',
    full_name_en: 'An Giang Province',
    latitude: '10.5392057',
    longitude: '105.2312822',
  },
  {
    id: '77',
    name: 'Ho Chi Minh',
    name_en: 'Ba Ria - Vung Tau',
    full_name: 'Tỉnh Bà Rịa - Vũng Tàu',
    full_name_en: 'Ba Ria - Vung Tau Province',
    latitude: '10.5738801',
    longitude: '107.3284362',
  },
]

export const mockFaviriteServices = [
  {
    id: 1,
    jobId: 1,
    jobName: 'Java Developer (SpringBoot/Struts)',
    jobPosition: 'Nhân viên',
  },
  {
    id: 2,
    jobId: 4,
    jobName: 'Giáo Viên Tiếng Anh Online',
    jobPosition: 'Thực tập sinh',
  },
  {
    id: 3,
    jobId: 5,
    jobName: 'Trưởng Trạm Giao Nhận',
    jobPosition: 'Trưởng nhóm',
  },
]

export const mockPostRelationJobResponse = {
  status: 'success',
  message: 'Related jobs found',
  data: [
    {
      id: 1,
      name: 'Java Developer (SpringBoot/Struts)',
      position: 'Nhân viên',
      language: 'TOEIC 700',
      location: 'Hồ Chí Minh',
      salary: 'thỏa thuận',
      number: '10',
      workingForm: 'Toàn thời gian',
      sex: 'Không yêu cầu',
      experience: '1 năm',
      detailLocation: 'Võ Văn Ngân, Thủ Đức',
      detailJob: 'Tham gia các dự án sử dụng ngôn ngữ lập trình Java cùng framework SpringBoot/Struts và các công nghệ liên quan cho các khách hàng đến từ Nhật Bản.\nPhân tích thiết kế và lập trình chức năng của các website.\nLàm các công việc khác theo sự phân công của quản lý',
      requirements:
        'Yêu cầu cơ bản:  \n\nTốt nghiệp đại học chuyên ngành IT  \nThao tác tốt Spring, Hibernate, Struts 2, HTML, CSS. (Struts 2 nếu chưa biết sẽ được đào tạo). \nHam học hỏi và khả năng tự học và hiểu các framework. Khuyến khích khả năng làm độc lập trong dự án. \nCó tư duy và giải thuật tốt    \nCó kinh nghiệm làm việc với AWS là một lợi thế    \nHiểu biết về MVC Framework, ORM, RESTful, OOP, Design Pattern    \nCó kinh nghiệm làm việc với MySQL hoặc NoSQL (MongoDB)    \nThành thạo các công cụ quản lý mã nguồn: GIT, SVN    \nSẵn sàng học hỏi và đáp ứng nhanh các yêu cầu của dự án  \nYêu cầu chuyên môn: \n\nViết code rõ ràng, dễ hiểu, dễ maintain, tuân thủ chặt chẽ convention \nTương tác với nhiều resources, nhiều dạng database là lợi thế.  \nViết SQL tối ưu, không bị SQL Injection là lợi thế ',
      interest:
        'Mức lương khởi điểm hấp dẫn, cạnh tranh, tương xứng với năng lực và kinh nghiệm làm việc; \nThu nhập: 13 tháng lương/năm + thưởng dự án, thưởng Tết và các dịp lễ...; \nXét tăng lương 2 lần/năm theo năng lực và hiệu quả công việc; \nLương làm thêm giờ theo luật lao động, hỗ trợ đồ ăn OT theo quy định công ty; \nLàm việc từ thứ 2 - thứ 6 (8h30 - 17h30); \nĐược tham gia BHXH, BHYT, BHTN theo quy định của pháp luật hiện hành; \nBảo hiểm chăm sóc sức khỏe 24/24 (Bảo Việt); \nKhám sức khỏe định kỳ 1 năm/1 lần tại bệnh viện Đại học Y Hà Nội; \nNghỉ ốm hưởng nguyên lương tối đa 30 ngày/ năm (có giấy chứng nhận của bệnh viện); \nTrợ cấp tiếng Nhật và các chứng chỉ IT liên quan (từ 1000.000 VNĐ - 2.500.000 VNĐ/tháng); \nPhụ cấp thâm niên; phụ cấp chức vụ; \nĐược tham gia các câu lạc bộ của công ty: CLB Bóng đá, CLB Game, CLB Beauty,  CLB Dance... \nĐược tham gia các hoạt động tập thể sôi động của công ty: nghỉ mát hàng năm, teambuilding hàng quý, gala cuối năm...\nTham gia các khóa học nâng cao trình độ chuyên môn qua Portal đào tạo nội bộ hoặc các khóa học trực tiếp với các giảng viên uy tín.  \nCơ hội làm việc và đào tạo tại Nhật Bản với các ứng viên có tiếng Nhật \nLàm việc trong môi trường chuyên nghiệp, được hỗ trợ phát huy khả năng, phát triển công việc tối đa.',
      image: 'https://cdn-new.topcv.vn/unsafe/150x/filters:format(webp)/https://static.topcv.vn/company_logos/hgTiOn9OZKDjJfARGkwrqczYVDkWC2it_1673406018____c31b182fa12ed20bae653cad41e00185.jpg',
      status: true,
      listCandidate: null,
      user_id: 2,
      createDate: '2024-05-05',
      updateAt: '2024-06-10',
      requireTest: true,
      state: 'CREATE',
      industry: 'IT - Phần mềm',
      industry2: 'Môi trường',
      isVip: true,
    },
  ],
}

export const mockEvents = [
  {
    id: 1,
    title: 'How To Shift From Being A Crap Magnet Into Being A Miracle Magnet',
    article: 'How To Shift From Being A Crap Magnet Into Being A Miracle Magnet',
    time: '2024-06-20T01:51',
    author: 'Nguyễn Reccer1',
    status: true,
    image: 'https://firebasestorage.googleapis.com/v0/b/upload2-23381.appspot.com/o/files%2Fblackpink-07424148.jpg?alt=media&token=53551918-7a0b-4d85-a7b9-9cf4142c62b0',
    content: '? Welcoming all heart-centred midlife humans here in #LinkedInLand, wishing to make the REST of their life, the BEST of their life, by shifting from being a Crap Magnet into being a Miracle Magnet ?',
  },
  {
    id: 2,
    title: 'Role of Business Incubators / Accelerators in Startup Funding & Growth',
    article: 'Running a small or midsize firm or leading a department in a big company successfully requires a lot of work.',
    time: '2024-06-27T01:56',
    author: 'Nguyễn Reccer1',
    status: true,
    image: 'https://firebasestorage.googleapis.com/v0/b/upload2-23381.appspot.com/o/files%2F1698857713201.png?alt=media&token=ba341cad-13cf-4cc7-add0-d7d7bd227578',
    content:
      "Business incubators and accelerators help companies in overcoming obstacles, boost sales, and expand. They're responsible for improving companies' operations by assessing weaknesses and recommending solutions. Working with domain experts and strategy advisors that have accomplishments and experience with businesses similar to yours is crucial.\n\nTopics of the discussion:\n? How the advisory service works?\n? Types of business constants, incubation centers, and business accelerators?\n? Who's the right connect for you and your startup?\n? How does working with experts benefit your business?\n? Common mistakes to avoid.\n? Recent developments in this sector",
  },
]
