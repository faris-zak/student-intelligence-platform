document.querySelectorAll('[data-auth-form]').forEach((form) => {
  const message = form.querySelector('.form-message');
  const fields = [...form.querySelectorAll('input')];

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    let error = '';
    fields.forEach((field) => field.removeAttribute('aria-invalid'));
    const invalidField = fields.find((field) => !field.value.trim() || !field.checkValidity());
    if (invalidField) {
      invalidField.setAttribute('aria-invalid', 'true');
      error = !invalidField.value.trim()
        ? 'يرجى تعبئة هذا الحقل.'
        : invalidField.type === 'email'
          ? 'أدخل بريداً إلكترونياً بصيغة صحيحة.'
          : invalidField.type === 'text'
            ? 'اكتب اسماً من حرفين على الأقل.'
            : 'يجب أن تتكون كلمة المرور من ٨ أحرف على الأقل.';
      invalidField.focus();
    }
    if (!error && form.dataset.authForm === 'register') {
      const password = form.elements.password;
      const confirm = form.elements.confirm;
      if (password.value !== confirm.value) {
        confirm.setAttribute('aria-invalid', 'true');
        confirm.focus();
        error = 'كلمتا المرور غير متطابقتين.';
      }
    }
    message.hidden = false;
    message.classList.toggle('form-message--error', Boolean(error));
    message.classList.toggle('form-message--success', !error);
    message.textContent = error || (form.dataset.authForm === 'register'
      ? 'تم التحقق من البيانات. إنشاء الحساب غير متصل في هذه النسخة التجريبية.'
      : 'تم التحقق من البيانات. تسجيل الدخول غير متصل في هذه النسخة التجريبية.');
  });
});
