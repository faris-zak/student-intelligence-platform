const { majorList, universities } = window.PlatformData;
const form = document.querySelector('#major-filters');
const results = document.querySelector('#major-results');
const count = document.querySelector('#major-count');
const empty = document.querySelector('#major-empty');
const universityFilter = form.elements.namedItem('university');
const params = new URLSearchParams(location.search);

Object.values(universities).forEach((university) => universityFilter.add(new Option(university.name, university.slug)));
if (params.has('q')) form.elements.q.value = params.get('q');

function render() {
  const query = form.elements.q.value.trim().toLocaleLowerCase('ar');
  const selectedUniversity = universityFilter.value;
  const filtered = majorList.filter((major) => {
    const text = `${major.name} ${major.collegeName} ${major.universityName}`.toLocaleLowerCase('ar');
    return (!query || text.includes(query)) && (selectedUniversity === 'all' || major.universitySlug === selectedUniversity);
  });
  results.innerHTML = filtered.map((major) => `<article class="academic-card"><span class="academic-card__icon" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M12 3 2.5 8 12 13l9.5-5L12 3Zm-6 7.2V16c3.5 2.8 8.5 2.8 12 0v-5.8M21.5 8v7"></path></svg></span><p class="academic-card__university">${major.universityName}</p><h2><a href="major.html?slug=${encodeURIComponent(major.id)}">${major.name}</a></h2><p class="academic-card__college">${major.collegeName}</p><div class="academic-card__facts"><span>${major.duration}</span><span>${major.creditHours} ساعة معتمدة</span></div><a class="button button--outline button--small" href="major.html?slug=${encodeURIComponent(major.id)}">تفاصيل التخصص <span aria-hidden="true">←</span></a></article>`).join('');
  count.textContent = `(${filtered.length} تخصصاً)`;
  empty.hidden = filtered.length > 0;
}

form.addEventListener('input', render);
form.addEventListener('change', render);
form.addEventListener('reset', () => requestAnimationFrame(render));
render();
