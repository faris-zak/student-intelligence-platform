const { collegeList, courseList, majorList, universityList } = window.PlatformData;

const searchForm = document.querySelector('#study-search');
const universitySelect = searchForm?.elements.namedItem('university');
const collegeSelect = searchForm?.elements.namedItem('college');
const majorSelect = searchForm?.elements.namedItem('major');
const courseSelect = searchForm?.elements.namedItem('course');

function setOptions(select, label, items) {
  if (!select) return;
  select.replaceChildren(new Option(label, ''), ...items.map((item) => new Option(item.label, item.value)));
  select.disabled = items.length === 0;
}

function updateColleges() {
  const slug = universitySelect?.value;
  const items = collegeList.filter((college) => college.universitySlug === slug).map((college) => ({ label: college.name, value: college.id }));
  setOptions(collegeSelect, 'الكلية', items);
  setOptions(majorSelect, 'التخصص', []);
  setOptions(courseSelect, 'المادة', []);
}

function updateMajors() {
  const collegeId = collegeSelect?.value;
  const items = majorList.filter((major) => major.collegeId === collegeId).map((major) => ({ label: major.name, value: major.id }));
  setOptions(majorSelect, 'التخصص', items);
  setOptions(courseSelect, 'المادة', []);
}

function updateCourses() {
  const majorId = majorSelect?.value;
  const items = courseList.filter((course) => course.majorId === majorId).map((course) => ({ label: course.name, value: course.id }));
  setOptions(courseSelect, 'المادة', items);
}

universitySelect?.addEventListener('change', updateColleges);
collegeSelect?.addEventListener('change', updateMajors);
majorSelect?.addEventListener('change', updateCourses);

searchForm?.addEventListener('submit', (event) => {
  event.preventDefault();
  const query = new FormData(searchForm).get('q')?.toString().trim() ?? '';
  if (courseSelect?.value) location.href = `course.html?slug=${encodeURIComponent(courseSelect.value)}`;
  else if (majorSelect?.value) location.href = `major.html?slug=${encodeURIComponent(majorSelect.value)}`;
  else if (universitySelect?.value) location.href = `university.html?slug=${encodeURIComponent(universitySelect.value)}`;
  else if (query) location.href = `universities.html?q=${encodeURIComponent(query)}`;
  else searchForm.querySelector('input[type="search"]')?.focus();
});
