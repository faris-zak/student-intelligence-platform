const { getUniversity, getUniversityColleges, getUniversityMajors } = window.PlatformData;

const slug = new URLSearchParams(location.search).get('slug');
const university = getUniversity(slug);
const content = document.querySelector('#university-detail');
const missing = document.querySelector('#university-not-found');

if (!university) {
  content.querySelectorAll(':scope > :not(.breadcrumbs):not(#university-not-found)').forEach((node) => node.hidden = true);
  missing.hidden = false;
} else {
  document.title = `${university.name} | منصة ذكاء الطالب`;
  document.querySelector('#university-name').textContent = university.name;
  document.querySelector('#university-location').textContent = university.location;
  document.querySelector('#university-tagline').textContent = university.tagline;
  document.querySelector('#university-about').textContent = university.about;
  document.querySelector('#university-type').textContent = university.slug === 'squ' || university.slug === 'utas' ? 'جامعة حكومية' : 'جامعة أهلية';
  document.querySelector('#university-duration').textContent = university.duration;
  document.querySelector('#university-fees').textContent = university.fees;
  const logo = document.querySelector('#university-logo');
  logo.src = university.logo;
  logo.alt = `شعار ${university.name}`;
  const cover = document.querySelector('#university-cover');
  cover.dataset.university = university.slug;
  document.querySelector('#admission-list').innerHTML = university.admission.map((requirement) => `<li>${requirement}</li>`).join('');
  document.querySelector('#university-stats').innerHTML = `<div><strong>${university.collegeCount}</strong><span>كليات</span></div><div><strong>${university.majorCount}</strong><span>تخصصات في الدليل</span></div><div><strong>${university.duration}</strong><span>المدة المتوقعة</span></div>`;
  const colleges = getUniversityColleges(slug);
  const majors = getUniversityMajors(slug);
  document.querySelector('#college-list').innerHTML = colleges.map((college) => {
    const major = majors.find((item) => item.collegeId === college.id);
    return `<article class="college-card"><span class="college-card__icon" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M3 9.5 12 4l9 5.5M5 10v9m4-9v9m6-9v9m4-9v9M3 20h18"></path></svg></span><h3>${college.name}</h3><p>${major?.name ?? 'برامج أكاديمية متنوعة'}</p><span class="college-card__count">تخصصات ومواد دراسية</span><a href="major.html?slug=${encodeURIComponent(major?.id ?? '')}">استعرض التخصص <span aria-hidden="true">←</span></a></article>`;
  }).join('');
}
