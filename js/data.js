const universitySeed = [
  {
    slug: 'squ', name: 'جامعة السلطان قابوس', shortName: 'جامعة السلطان قابوس', location: 'مسقط · الخوض', tagline: 'صرح أكاديمي رائد في سلطنة عُمان',
    about: 'جامعة حكومية رائدة تجمع بين التعليم والبحث العلمي وخدمة المجتمع، وتضم كليات في مجالات العلوم والهندسة والآداب والاقتصاد وغيرها.',
    admission: ['شهادة دبلوم التعليم العام أو ما يعادلها.', 'استيفاء المعدلات والمواد المطلوبة للبرنامج حسب دليل القبول السنوي.', 'تقديم الطلب عبر القنوات الرسمية خلال فترة التسجيل.'], duration: '٤–٥ سنوات بحسب البرنامج', fees: 'تختلف حسب البرنامج؛ راجع دليل القبول الرسمي',
    collegeNames: ['كلية الهندسة', 'كلية الاقتصاد والعلوم السياسية', 'كلية العلوم'], programs: ['الهندسة المدنية', 'إدارة الأعمال', 'علوم الحاسوب'], tracks: ['engineering', 'business', 'computing']
  },
  {
    slug: 'utas', name: 'جامعة التقنية والعلوم التطبيقية', shortName: 'جامعة التقنية والعلوم التطبيقية', location: 'فروع في مختلف محافظات عُمان', tagline: 'تعليم تطبيقي لمستقبل مهني واعد',
    about: 'مؤسسة تعليم عالٍ حكومية ذات فروع متعددة، تقدم برامج تطبيقية في التقنية والهندسة وإدارة الأعمال والعلوم الصحية والتربية.',
    admission: ['شهادة دبلوم التعليم العام أو ما يعادلها.', 'تحقيق متطلبات البرنامج والفرع المختار وفق دليل القبول.', 'قد تتطلب بعض البرامج اجتياز مقررات تأسيسية أو اختبارات تحديد مستوى.'], duration: '٤ سنوات غالباً', fees: 'تختلف حسب البرنامج؛ راجع دليل القبول الرسمي',
    collegeNames: ['كلية الهندسة والتكنولوجيا', 'كلية إدارة الأعمال', 'كلية الحوسبة والمعلومات'], programs: ['الهندسة الكهربائية', 'إدارة الأعمال', 'تقنية المعلومات'], tracks: ['engineering', 'business', 'computing']
  },
  {
    slug: 'nizwa', name: 'جامعة نزوى', shortName: 'جامعة نزوى', location: 'الداخلية · بركة الموز', tagline: 'تعليم متميز وبناء للمستقبل',
    about: 'جامعة أهلية عُمانية تهتم بالتعليم والبحث وخدمة المجتمع، وتطرح برامج في الهندسة والاقتصاد والعلوم والآداب والتربية.',
    admission: ['شهادة دبلوم التعليم العام أو ما يعادلها.', 'استيفاء شروط القبول الخاصة بالبرنامج.', 'تأكيد الرسوم والمنح المتاحة من الجامعة قبل التسجيل.'], duration: '٤ سنوات غالباً', fees: 'رسوم دراسية بحسب الساعات والبرنامج',
    collegeNames: ['كلية الهندسة والعمارة', 'كلية الاقتصاد والإدارة ونظم المعلومات', 'كلية العلوم والآداب'], programs: ['الهندسة الكيميائية', 'إدارة الأعمال', 'علوم الحاسوب'], tracks: ['engineering', 'business', 'computing']
  },
  {
    slug: 'muscat', name: 'جامعة مسقط', shortName: 'جامعة مسقط', location: 'مسقط', tagline: 'تعليم بمعايير عالمية وبيئة ملهمة',
    about: 'جامعة خاصة في مسقط تقدم برامج جامعية مرتبطة باحتياجات سوق العمل، مع اهتمام بالتعلم التطبيقي والتعاون الأكاديمي.',
    admission: ['شهادة دبلوم التعليم العام أو ما يعادلها.', 'استيفاء متطلبات اللغة والبرنامج حسب سياسة القبول.', 'تختلف شروط القبول والرسوم بحسب التخصص.'], duration: '٣–٤ سنوات بحسب البرنامج', fees: 'رسوم دراسية بحسب البرنامج؛ راجع الجامعة',
    collegeNames: ['كلية الهندسة والتكنولوجيا', 'كلية الأعمال والإدارة', 'كلية النقل واللوجستيات'], programs: ['هندسة الطاقة', 'إدارة الأعمال', 'الخدمات اللوجستية'], tracks: ['engineering', 'business', 'logistics']
  },
  {
    slug: 'buraimi', name: 'جامعة البريمي', shortName: 'جامعة البريمي', location: 'البريمي', tagline: 'فرص تعليمية متنوعة في بيئة جامعية',
    about: 'جامعة أهلية تقدم برامج أكاديمية ومهنية في مجالات الهندسة وإدارة الأعمال والقانون والعلوم الصحية وتقنية المعلومات.',
    admission: ['شهادة دبلوم التعليم العام أو ما يعادلها.', 'تحقيق متطلبات القبول للبرنامج المختار.', 'التواصل مع القبول والتسجيل للتحقق من الرسوم والمنح الحالية.'], duration: '٤ سنوات غالباً', fees: 'رسوم دراسية بحسب البرنامج؛ راجع الجامعة',
    collegeNames: ['كلية الهندسة', 'كلية التجارة وإدارة الأعمال', 'كلية تقنية المعلومات'], programs: ['الهندسة المدنية', 'إدارة الأعمال', 'الأمن السيبراني'], tracks: ['engineering', 'business', 'computing']
  }
];

const courseCatalog = {
  engineering: [
    ['رياضيات هندسية ١', 3, 'رياضيات عامة', 'نظرية', 'متوسط'],
    ['الرسم الهندسي', 2, 'لا يوجد', 'نظرية + تطبيقية', 'متوسط'],
    ['ميكانيكا هندسية', 3, 'رياضيات هندسية ١', 'نظرية', 'مرتفع'],
    ['مختبر المواد الهندسية', 1, 'مقدمة في الهندسة', 'تطبيقية', 'متوسط'],
    ['مشروع التصميم الهندسي', 3, 'اجتياز ٧٥ ساعة معتمدة', 'نظرية + تطبيقية', 'مرتفع']
  ],
  business: [
    ['مبادئ الإدارة', 3, 'لا يوجد', 'نظرية', 'سهل'],
    ['مبادئ المحاسبة', 3, 'لا يوجد', 'نظرية + تطبيقية', 'متوسط'],
    ['الاقتصاد الجزئي', 3, 'رياضيات عامة', 'نظرية', 'متوسط'],
    ['السلوك التنظيمي', 3, 'مبادئ الإدارة', 'نظرية', 'متوسط'],
    ['مشروع التخرج في الإدارة', 3, 'اجتياز ٩٠ ساعة معتمدة', 'نظرية + تطبيقية', 'مرتفع']
  ],
  computing: [
    ['مقدمة في البرمجة', 3, 'لا يوجد', 'نظرية + تطبيقية', 'متوسط'],
    ['رياضيات الحوسبة', 3, 'رياضيات عامة', 'نظرية', 'متوسط'],
    ['هياكل البيانات', 3, 'مقدمة في البرمجة', 'نظرية + تطبيقية', 'مرتفع'],
    ['قواعد البيانات', 3, 'مقدمة في البرمجة', 'نظرية + تطبيقية', 'متوسط'],
    ['مشروع التخرج في الحوسبة', 3, 'اجتياز ٩٠ ساعة معتمدة', 'نظرية + تطبيقية', 'مرتفع']
  ],
  logistics: [
    ['مقدمة في سلاسل الإمداد', 3, 'لا يوجد', 'نظرية', 'سهل'],
    ['مبادئ النقل واللوجستيات', 3, 'لا يوجد', 'نظرية', 'متوسط'],
    ['إدارة المخزون', 3, 'مبادئ الإدارة', 'نظرية + تطبيقية', 'متوسط'],
    ['تحليل العمليات اللوجستية', 3, 'إحصاء للأعمال', 'نظرية + تطبيقية', 'مرتفع'],
    ['مشروع التخرج في اللوجستيات', 3, 'اجتياز ٩٠ ساعة معتمدة', 'نظرية + تطبيقية', 'مرتفع']
  ]
};

const universities = Object.fromEntries(universitySeed.map((university) => [university.slug, {
  ...university,
  cover: `assets/universities/${university.slug}/cover.${university.slug === 'muscat' ? 'jpg' : 'png'}`,
  logo: `assets/universities/${university.slug}/logo.${['utas', 'nizwa'].includes(university.slug) ? 'jpg' : 'png'}`,
  collegeCount: university.collegeNames.length,
  majorCount: university.programs.length,
  collegeIds: university.collegeNames.map((_, index) => `${university.slug}-college-${index + 1}`),
  majorIds: university.programs.map((_, index) => `${university.slug}-major-${index + 1}`)
}]));

const colleges = Object.fromEntries(universitySeed.flatMap((university) => university.collegeNames.map((name, index) => {
  const id = `${university.slug}-college-${index + 1}`;
  return [id, { id, universitySlug: university.slug, name, majorIds: [`${university.slug}-major-${index + 1}`] }];
})));

const majorSeed = universitySeed.flatMap((university) => university.programs.map((name, index) => ({
  id: `${university.slug}-major-${index + 1}`,
  universitySlug: university.slug,
  collegeId: `${university.slug}-college-${index + 1}`,
  name,
  track: university.tracks[index],
  duration: university.slug === 'squ' && index === 0 ? '٥ سنوات' : university.slug === 'muscat' ? '٣–٤ سنوات' : '٤ سنوات',
  creditHours: university.tracks[index] === 'engineering' ? 135 : 126,
  plan: university.tracks[index] === 'engineering' ? 'خطة هندسية مع مختبرات ومشروع تصميم' : university.tracks[index] === 'business' ? 'خطة أعمال مع تدريب ومشروع تخرج' : 'خطة تخصصية مع مختبرات ومشروع تخرج',
  prerequisites: 'اجتياز البرنامج التأسيسي ومتطلبات القبول الخاصة بالتخصص.',
  electives: 'مواد اختيارية تخصصية ومساندة بحسب الخطة الدراسية.',
  training: 'تدريب ميداني أو مشروع تطبيقي بحسب متطلبات البرنامج.',
  courseNames: courseCatalog[university.tracks[index]]
})));

const majors = Object.fromEntries(majorSeed.map((major) => [major.id, {
  ...major,
  universityName: universities[major.universitySlug].name,
  collegeName: colleges[major.collegeId].name,
  courseIds: major.courseNames.map((_, index) => `${major.id}-course-${index + 1}`)
}]));

const courses = Object.fromEntries(majorSeed.flatMap((major) => major.courseNames.map(([name, hours, prerequisite, nature, difficulty], index) => {
  const id = `${major.id}-course-${index + 1}`;
  return [id, {
    id, majorId: major.id, universitySlug: major.universitySlug, name, hours, prerequisite, nature,
    projects: index === 4,
    presentations: major.track === 'business' && index === 3,
    difficulty,
    exams: index === 4 ? 'اختبار نهائي ومشروع تطبيقي' : 'اختبارات قصيرة واختبار نهائي',
    year: index < 2 ? 1 : index === 2 ? 2 : index === 3 ? 3 : major.duration.startsWith('٥') ? 5 : 4
  }];
})));

const reviews = Object.values(courses).filter((course) => [0, 2, 4].includes(Number(course.id.slice(-1)) - 1)).map((course, index) => ({
  id: `review-${index + 1}`,
  courseId: course.id,
  rating: [4, 5, 3, 4, 5][index % 5],
  difficulty: course.difficulty,
  text: ['المادة واضحة إذا تابعت المحاضرات أولاً بأول، والتطبيق يساعد على فهم الأفكار.', 'المشروع يحتاج تخطيطاً مبكراً، لكن شرح المدرس والأمثلة كانا مفيدين.', 'تجربتي جيدة؛ التدرب على المسائل قبل الاختبار فرق معي كثيراً.'][index % 3],
  date: ['٢٠٢٥/١١/١٢', '٢٠٢٥/١٠/٠٣', '٢٠٢٥/٠٩/١٨'][index % 3]
}));

const universityList = Object.values(universities);
const collegeList = Object.values(colleges);
const majorList = Object.values(majors);
const courseList = Object.values(courses);

function getUniversity(slug) {
  return universities[slug] ?? null;
}

function getUniversityColleges(slug) {
  const university = getUniversity(slug);
  return university ? university.collegeIds.map((id) => colleges[id]) : [];
}

function getUniversityMajors(slug) {
  const university = getUniversity(slug);
  return university ? university.majorIds.map((id) => majors[id]) : [];
}

window.PlatformData = { universities, colleges, majors, courses, reviews, universityList, collegeList, majorList, courseList, getUniversity, getUniversityColleges, getUniversityMajors };
