const { courses, majors, universities, reviews } = window.PlatformData;
const slug = new URLSearchParams(location.search).get('slug');
const course = courses[slug];
const page = document.querySelector('#course-page');
const missing = document.querySelector('#course-not-found');

function fact(label, value) {
  return `<div><dt>${label}</dt><dd>${value}</dd></div>`;
}

if (!course) {
  page.querySelectorAll(':scope > :not(.breadcrumbs):not(#course-not-found)').forEach((node) => node.hidden = true);
  missing.hidden = false;
} else {
  const major = majors[course.majorId];
  const university = universities[course.universitySlug];
  document.title = `${course.name} | منصة ذكاء الطالب`;
  document.querySelector('#course-name').textContent = course.name;
  document.querySelector('#course-context').textContent = university.name;
  document.querySelector('#course-major').textContent = `${major.name} · ${major.collegeName}`;
  document.querySelector('#course-major-link').href = `major.html?slug=${encodeURIComponent(major.id)}`;
  document.querySelector('#course-facts').innerHTML = [
    fact('الساعات المعتمدة', `${course.hours} ساعات`),
    fact('المتطلب السابق', course.prerequisite),
    fact('طبيعة المادة', course.nature),
    fact('مشاريع دراسية', course.projects ? 'نعم' : 'لا'),
    fact('عروض تقديمية', course.presentations ? 'نعم' : 'لا'),
    fact('الصعوبة المتوقعة', course.difficulty),
    fact('التقييم والاختبارات', course.exams)
  ].join('');

  const courseReviews = reviews.filter((review) => review.courseId === course.id);
  const reviewList = document.querySelector('#review-list');
  const empty = document.querySelector('#empty-reviews');
  empty.hidden = courseReviews.length > 0;
  if (courseReviews.length) {
    const average = courseReviews.reduce((sum, review) => sum + review.rating, 0) / courseReviews.length;
    document.querySelector('#review-summary').innerHTML = `<strong>${average.toFixed(1)} / ٥</strong><span>من ${courseReviews.length} تجارب</span>`;
    reviewList.innerHTML = courseReviews.map((review) => `<article class="review-card"><div class="review-card__top"><span class="review-stars" aria-label="التقييم ${review.rating} من ٥">${'★'.repeat(review.rating)}${'☆'.repeat(5 - review.rating)}</span><time>${review.date}</time></div><p>${review.text}</p><div class="review-card__footer"><span>الصعوبة: ${review.difficulty}</span><span>مثال تجريبي</span></div></article>`).join('');
  } else {
    document.querySelector('#review-summary').textContent = 'لا توجد تقييمات بعد';
    reviewList.replaceChildren();
  }
}
