const { majorList, courseList, universities } = window.PlatformData;

function normalizeArabic(value) {
  return value.toLocaleLowerCase('ar')
    .replace(/[\u064B-\u065F\u0670]/g, '')
    .replace(/[أإآٱ]/g, 'ا')
    .replace(/ى/g, 'ي')
    .replace(/ة/g, 'ه')
    .replace(/ـ/g, '')
    .trim();
}

function source(label, href) {
  return { label, href };
}

function answerQuestion(text) {
  const query = normalizeArabic(text);
  const sources = [];

  if ((query.includes('قارن') || query.includes('مقارنه') || query.includes('بين')) && (query.includes('اعمال') || query.includes('اداره'))) {
    const namedUniversities = Object.values(universities).filter((university) => query.includes(normalizeArabic(university.name)));
    let matches = majorList.filter((major) => major.track === 'business');
    if (namedUniversities.length >= 2) {
      matches = namedUniversities.slice(0, 2).map((university) => majorList.find((major) => major.universitySlug === university.slug && major.track === 'business')).filter(Boolean);
    } else {
      const seen = new Set();
      matches = matches.filter((major) => !seen.has(major.universitySlug) && seen.add(major.universitySlug)).slice(0, 2);
    }
    if (matches.length >= 2) {
      const [first, second] = matches;
      sources.push(source(`تخصص ${first.name} في ${first.universityName}`, `major.html?slug=${encodeURIComponent(first.id)}`));
      sources.push(source(`تخصص ${second.name} في ${second.universityName}`, `major.html?slug=${encodeURIComponent(second.id)}`));
      return {
        answer: `في هذا النموذج، مدة ${first.name} في ${first.universityName} هي ${first.duration} وبها ${first.creditHours} ساعة معتمدة، بينما ${second.universityName} تعرض مدة ${second.duration} و${second.creditHours} ساعة معتمدة. تختلف الخطة والرسوم بحسب المؤسسة؛ افتح المصدرين لمقارنة التفاصيل، وتحقق من الخطط الرسمية قبل التقديم.`,
        sources
      };
    }
  }

  if (query.includes('هندس') && (query.includes('رياضيات') || query.includes('ما يحب') || query.includes('يحب الرياضيات'))) {
    const engineeringMajor = majorList.find((major) => major.track === 'engineering');
    const mathCourse = courseList.find((course) => course.majorId === engineeringMajor?.id && normalizeArabic(course.name).includes('رياضيات'));
    const mechanicsCourse = courseList.find((course) => course.majorId === engineeringMajor?.id && normalizeArabic(course.name).includes('ميكانيكا'));
    if (engineeringMajor) sources.push(source(`خطة ${engineeringMajor.name}`, `major.html?slug=${encodeURIComponent(engineeringMajor.id)}`));
    if (mathCourse) sources.push(source(mathCourse.name, `course.html?slug=${encodeURIComponent(mathCourse.id)}`));
    if (mechanicsCourse) sources.push(source(mechanicsCourse.name, `course.html?slug=${encodeURIComponent(mechanicsCourse.id)}`));
    return {
      answer: `الهندسة تتضمن عادةً رياضيات وتحليلاً كمياً، لذلك قد يكون التخصص تحدياً لمن لا يستمتع بالرياضيات. في نموذج ${engineeringMajor?.universityName ?? 'الخطة الدراسية'} تظهر مواد مثل ${mathCourse?.name ?? 'الرياضيات الهندسية'} و${mechanicsCourse?.name ?? 'الميكانيكا الهندسية'}. هذا لا يعني أن عليك أن تكون متفوقاً من البداية؛ راجع الخطة واسأل عن الدعم الأكاديمي، ثم قيّم استعدادك للتدرب المستمر.`,
      sources
    };
  }

  if (query.includes('متطلب') || query.includes('قبل ماده') || query.includes('اخلص')) {
    const matchedCourse = courseList
      .filter((course) => normalizeArabic(text).includes(normalizeArabic(course.name)))
      .sort((a, b) => b.name.length - a.name.length)[0];
    if (matchedCourse) {
      const major = majorList.find((item) => item.id === matchedCourse.majorId);
      sources.push(source(`تفاصيل مادة ${matchedCourse.name}`, `course.html?slug=${encodeURIComponent(matchedCourse.id)}`));
      if (major) sources.push(source(`خطة ${major.name}`, `major.html?slug=${encodeURIComponent(major.id)}`));
      return {
        answer: matchedCourse.prerequisite === 'لا يوجد'
          ? `بحسب البيانات التجريبية، لا يوجد متطلب سابق مسجل لمادة ${matchedCourse.name}. تحقق من الخطة الأحدث لدى جامعتك، فقد تختلف المتطلبات بين البرامج. `
          : `بحسب البيانات التجريبية، المتطلب السابق لمادة ${matchedCourse.name} هو: ${matchedCourse.prerequisite}. راجع الخطة المعتمدة للتأكد من ترتيب المواد وشروط التسجيل.`,
        sources
      };
    }
    return {
      answer: 'أرسل اسم المادة التي تقصدها، وسأحاول تحديد متطلبها السابق من الدليل. يمكنك أيضاً البحث عن اسم المادة مباشرة في قائمة المواد.',
      sources: [source('البحث في المواد الدراسية', 'courses.html')]
    };
  }

  const matchedMajor = majorList.find((major) => query.includes(normalizeArabic(major.name)));
  if (matchedMajor) {
    sources.push(source(`تفاصيل تخصص ${matchedMajor.name}`, `major.html?slug=${encodeURIComponent(matchedMajor.id)}`));
    return { answer: `وجدت تخصص ${matchedMajor.name} في ${matchedMajor.universityName}. مدة الدراسة في البيانات التجريبية ${matchedMajor.duration} والخطة تشمل ${matchedMajor.creditHours} ساعة معتمدة. افتح صفحة التخصص لمراجعة المواد والمتطلبات.`, sources };
  }

  return {
    answer: 'أستطيع المساعدة في أسئلة التخصصات والمواد والمقارنة. اذكر اسم تخصص أو مادة، أو جرّب أحد الأسئلة المقترحة. المعلومات هنا تجريبية وإرشادية.',
    sources: [source('قائمة التخصصات', 'majors.html'), source('قائمة المواد الدراسية', 'courses.html'), source('مقارنة الجامعات والتخصصات', 'compare.html')]
  };
}

window.answerQuestion = answerQuestion;
