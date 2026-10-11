const { majors, universities, courses } = window.PlatformData;
const slug = new URLSearchParams(location.search).get('slug');
const major = majors[slug];
const page = document.querySelector('#major-page');
const missing = document.querySelector('#major-not-found');

if (!major) {
  page.querySelectorAll(':scope > :not(.breadcrumbs):not(#major-not-found)').forEach((node) => node.hidden = true);
  missing.hidden = false;
} else {
  document.title = `${major.name} | منصة ذكاء الطالب`;
  document.querySelector('#major-name').textContent = major.name;
  document.querySelector('#major-university').textContent = major.universityName;
  document.querySelector('#major-college').textContent = major.collegeName;
  document.querySelector('#major-university-link').href = `university.html?slug=${encodeURIComponent(major.universitySlug)}`;
  document.querySelector('#major-stats').innerHTML = `<div><strong>${major.duration}</strong><span>مدة الدراسة</span></div><div><strong>${major.creditHours}</strong><span>ساعة معتمدة</span></div><div><strong>${major.courseIds.length}</strong><span>مواد في هذا النموذج</span></div>`;
  document.querySelector('#major-plan').textContent = major.plan;
  document.querySelector('#major-requirements').innerHTML = `<article><h3>المتطلبات السابقة</h3><p>${major.prerequisites}</p></article><article><h3>المواد الاختيارية</h3><p>${major.electives}</p></article><article><h3>التدريب والمشروع</h3><p>${major.training} ويشمل المسار مشروع تخرج.</p></article>`;

  const years = major.duration.startsWith('٥') ? 5 : 4;
  const studyPlan = Array.from({ length: years }, (_, index) => {
    const year = index + 1;
    const yearCourses = major.courseIds.map((id) => courses[id]).filter((course) => course.year === year);
    const items = yearCourses.length ? yearCourses.map((course) => `<li><a href="course.html?slug=${encodeURIComponent(course.id)}">${course.name}</a><span>${course.hours} ساعات</span></li>`).join('') : '<li><span>مواد تخصصية واختيارية بحسب الخطة المعتمدة</span></li>';
    const note = year === years ? 'مشروع التخرج أو التدريب واستكمال متطلبات التخرج' : year === 1 ? 'بناء الأساس العلمي والتأسيسي' : 'تعميق المعرفة والتطبيق في مجال التخصص';
    return `<li class="timeline-item"><div class="timeline-marker" aria-hidden="true">${year}</div><article><p class="timeline-kicker">السنة ${year}</p><h3>${year === years ? 'مرحلة التخرج' : `السنة الدراسية ${year}`}</h3><p>${note}</p><ul>${items}</ul></article></li>`;
  }).join('');
  document.querySelector('#study-timeline').innerHTML = studyPlan;

  document.querySelector('#major-course-list').innerHTML = major.courseIds.map((id) => courses[id]).map((course) => `<tr><th scope="row"><a href="course.html?slug=${encodeURIComponent(course.id)}">${course.name}</a></th><td>${course.hours}</td><td>${course.prerequisite}</td><td>${course.nature}</td></tr>`).join('');
}
