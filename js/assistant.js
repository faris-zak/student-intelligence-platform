const chatForm = document.querySelector('#assistant-form');
const chatInput = document.querySelector('#assistant-input');
const chatMessages = document.querySelector('#chat-messages');

function addMessage(text, role, sources = []) {
  const article = document.createElement('article');
  article.className = `chat-message chat-message--${role}`;
  const avatar = document.createElement('span');
  avatar.className = 'chat-message__avatar';
  avatar.setAttribute('aria-hidden', 'true');
  avatar.textContent = role === 'user' ? 'أ' : 'ذ';
  const body = document.createElement('div');
  body.className = 'chat-message__body';
  const paragraph = document.createElement('p');
  paragraph.textContent = text;
  body.append(paragraph);
  if (sources.length) {
    const sourceBlock = document.createElement('div');
    sourceBlock.className = 'message-sources';
    const title = document.createElement('strong');
    title.textContent = 'المصادر';
    const list = document.createElement('ul');
    sources.forEach((item) => {
      const li = document.createElement('li');
      const link = document.createElement('a');
      link.href = item.href;
      link.textContent = item.label;
      li.append(link);
      list.append(li);
    });
    sourceBlock.append(title, list);
    body.append(sourceBlock);
  }
  article.append(avatar, body);
  chatMessages.append(article);
  article.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
}

function submitQuestion(text) {
  const question = text.trim();
  if (!question) return;
  addMessage(question, 'user');
  const result = window.answerQuestion(question);
  addMessage(result.answer, 'assistant', result.sources);
  chatInput.value = '';
  chatInput.focus();
}

chatForm.addEventListener('submit', (event) => {
  event.preventDefault();
  submitQuestion(chatInput.value);
});

chatInput.addEventListener('keydown', (event) => {
  if (event.key === 'Enter' && !event.shiftKey) {
    event.preventDefault();
    chatForm.requestSubmit();
  }
});

document.querySelectorAll('.suggested-questions button').forEach((button) => {
  button.addEventListener('click', () => submitQuestion(button.textContent));
});
