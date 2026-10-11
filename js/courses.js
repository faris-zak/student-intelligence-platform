const { courseList, majors, universities } = window.PlatformData;
const form = document.querySelector('#course-filters');
const results = document.querySelector('#course-results');
const count = document.querySelector('#course-count');
const empty = document.querySelector('#course-empty');
const params = new URLSearchParams(location.search);
if (params.has('q')) form.elements.q.value = params.get('q');

function render() {
  const query = form.elements.q.value.trim().toLocaleLowerCase('ar');
  const nature = form.elements.nature.value;
  const filtered = courseList.filter((course) => {
    const major = majors[course.majorId];
    const university = universities[course.universitySlug];
    const searchable = `${course.name} ${major.name} ${university.name}`.toLocaleLowerCase('ar');
    return (!query || searchable.includes(query)) && (nature === 'all' || course.nature === nature);
  });
  results.innerHTML = filtered.map((course) => {
    const major = majors[course.majorId];
    return `<article class="course-row"><span class="course-row__icon" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M5 3h14v18H5zM8 7h8M8 11h8M8 15h5"></path></svg></span><div class="course-row__main"><p>${major.universityName} · ${major.name}</p><h2><a href="course.html?slug=${encodeURIComponent(course.id)}">${course.name}</a></h2><div class="course-row__tags"><span>${course.hours} ساعات معتمدة</span><span>${course.nature}</span><span>الصعوبة المتوقعة: ${course.difficulty}</span></div></div><a class="course-row__link" href="course.html?slug=${encodeURIComponent(course.id)}" aria-label="تفاصيل ${course.name}">التفاصيل <span aria-hidden="true">←</span></a></article>`;
  }).join('');
  count.textContent = `(${filtered.length} مادة)`;
  empty.hidden = filtered.length > 0;
}

form.addEventListener('input', render);
form.addEventListener('change', render);
form.addEventListener('reset', () => requestAnimationFrame(render));
render();
