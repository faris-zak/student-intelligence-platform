const { universities, universityList, majorList, reviews } = window.PlatformData;
const firstSelect = document.querySelector('#first-choice');
const secondSelect = document.querySelector('#second-choice');
const modeInputs = document.querySelectorAll('input[name="compare-type"]');
const firstLabel = document.querySelector('#first-select-label');
const secondLabel = document.querySelector('#second-select-label');
const hint = document.querySelector('#compare-hint');
const result = document.querySelector('#comparison-result');
const head = document.querySelector('#comparison-head');
const body = document.querySelector('#comparison-body');

function currentMode() {
  return document.querySelector('input[name="compare-type"]:checked')?.value ?? 'university';
}

function populateSelect(select, mode, placeholder) {
  const options = mode === 'university'
    ? universityList.map((university) => ({ value: university.slug, label: university.name }))
    : majorList.map((major) => ({ value: major.id, label: `${major.name} — ${major.universityName}` }));
  select.replaceChildren(new Option(placeholder, ''), ...options.map((item) => new Option(item.label, item.value)));
}

function ratingForCourseIds(courseIds) {
  const idSet = new Set(courseIds);
  const values = reviews.filter((review) => idSet.has(review.courseId));
  if (!values.length) return 'لا توجد تقييمات بعد';
  const average = values.reduce((sum, review) => sum + review.rating, 0) / values.length;
  return `${new Intl.NumberFormat('ar-OM', { maximumFractionDigits: 1 }).format(average)} من ٥ (${values.length} تجارب)`;
}

function getComparisonData(mode, id) {
  if (mode === 'university') {
    const university = universities[id];
    if (!university) return null;
    const majorItems = university.majorIds.map((majorId) => window.PlatformData.majors[majorId]);
    const courseIds = majorItems.flatMap((major) => major.courseIds);
    return {
      title: university.name,
      values: {
        'مدة الدراسة': university.duration,
        'الساعات المعتمدة': 'تختلف بحسب التخصص',
        'الخطة الدراسية': `${university.collegeCount} كليات وبرامج متنوعة`,
        'الرسوم الدراسية': university.fees,
        'المواد في النموذج': `${courseIds.length} مادة عبر ${majorItems.length} تخصصات`,
        'التدريب والمشروع': 'يختلف بحسب البرنامج والكلية',
        'تقييم الطلاب': ratingForCourseIds(courseIds)
      }
    };
  }

  const major = window.PlatformData.majors[id];
  if (!major) return null;
  return {
    title: `${major.name} · ${major.universityName}`,
    values: {
      'مدة الدراسة': major.duration,
      'الساعات المعتمدة': `${major.creditHours} ساعة`,
      'الخطة الدراسية': major.plan,
      'الرسوم الدراسية': universities[major.universitySlug].fees,
      'المواد في النموذج': `${major.courseIds.length} مواد`,
      'التدريب والمشروع': major.training,
      'تقييم الطلاب': ratingForCourseIds(major.courseIds)
    }
  };
}

function renderComparison() {
  const mode = currentMode();
  const first = getComparisonData(mode, firstSelect.value);
  const second = getComparisonData(mode, secondSelect.value);
  if (!firstSelect.value || !secondSelect.value) {
    result.hidden = true;
    hint.textContent = 'اختر خيارين لعرض المقارنة.';
    return;
  }
  if (firstSelect.value === secondSelect.value) {
    result.hidden = true;
    hint.textContent = 'اختر خيارين مختلفين لإظهار مقارنة مفيدة.';
    return;
  }
  if (!first || !second) return;

  head.innerHTML = `<tr><th scope="col">معيار المقارنة</th><th scope="col">${first.title}</th><th scope="col">${second.title}</th></tr>`;
  body.innerHTML = Object.keys(first.values).map((label) => `<tr><th scope="row">${label}</th><td>${first.values[label]}</td><td>${second.values[label]}</td></tr>`).join('');
  document.querySelector('#comparison-title').textContent = `مقارنة ${first.title} و${second.title}`;
  result.hidden = false;
  hint.textContent = 'تظهر المقارنة أدناه.';
}

function updateMode() {
  const mode = currentMode();
  const label = mode === 'university' ? 'الجامعة' : 'التخصص';
  firstLabel.textContent = `${label} الأولى`;
  secondLabel.textContent = `${label} الثانية`;
  populateSelect(firstSelect, mode, `اختر ${label} الأولى`);
  populateSelect(secondSelect, mode, `اختر ${label} الثانية`);
  result.hidden = true;
  hint.textContent = 'اختر خيارين لعرض المقارنة.';
}

modeInputs.forEach((input) => input.addEventListener('change', updateMode));
firstSelect.addEventListener('change', renderComparison);
secondSelect.addEventListener('change', renderComparison);
document.querySelector('#clear-comparison').addEventListener('click', () => {
  firstSelect.value = '';
  secondSelect.value = '';
  renderComparison();
  firstSelect.focus();
});
updateMode();
