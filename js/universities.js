const { universityList } = window.PlatformData;

const form = document.querySelector('#university-filters');
const results = document.querySelector('#university-results');
const empty = document.querySelector('#university-empty');
const count = document.querySelector('#university-count');
const params = new URLSearchParams(location.search);
if (form && params.has('q')) form.elements.q.value = params.get('q');

function cardMarkup(university) {
  const type = university.slug === 'squ' || university.slug === 'utas' ? 'حكومية' : 'أهلية';
  return `<article class="directory-card">
    <a class="directory-card__cover directory-card__cover--${university.slug}" href="university.html?slug=${encodeURIComponent(university.slug)}" aria-label="استعرض ${university.name}"><span class="directory-card__badge"><img src="${university.logo}" alt="شعار ${university.name}" loading="lazy"></span></a>
    <div class="directory-card__content"><div class="directory-card__topline"><span>${type}</span><span>${university.location}</span></div><h2><a href="university.html?slug=${encodeURIComponent(university.slug)}">${university.name}</a></h2><p>${university.tagline}</p><div class="directory-card__meta"><span>${university.collegeCount} كليات</span><span>${university.majorCount} تخصصات أولية</span></div><a class="button button--outline button--small" href="university.html?slug=${encodeURIComponent(university.slug)}">استعرض الجامعة <span aria-hidden="true">←</span></a></div>
  </article>`;
}

function render() {
  const query = (form?.elements.q.value ?? '').trim().toLocaleLowerCase('ar');
  const type = form?.elements.type.value ?? 'all';
  const filtered = universityList.filter((university) => {
    const universityType = university.slug === 'squ' || university.slug === 'utas' ? 'حكومية' : 'أهلية';
    const text = `${university.name} ${university.location} ${university.tagline}`.toLocaleLowerCase('ar');
    return (!query || text.includes(query)) && (type === 'all' || type === universityType);
  });
  results.innerHTML = filtered.map(cardMarkup).join('');
  count.textContent = `(${filtered.length} جامعات)`;
  empty.hidden = filtered.length > 0;
}

form?.addEventListener('input', render);
form?.addEventListener('change', render);
form?.addEventListener('reset', () => requestAnimationFrame(render));
render();
