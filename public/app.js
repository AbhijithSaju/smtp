const form = document.getElementById('emailForm');
const sendButton = document.getElementById('sendButton');
const statusBox = document.getElementById('status');

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  statusBox.hidden = true;
  statusBox.className = 'status';
  sendButton.disabled = true;
  sendButton.textContent = 'Sending email…';

  const payload = {
    to: form.to.value.trim(),
    subject: form.subject.value.trim(),
    message: form.message.value.trim()
  };

  try {
    const response = await fetch('/send-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    const result = await response.json();
    statusBox.textContent = result.message;
    statusBox.className = `status ${result.success ? 'success' : 'error'}`;
    statusBox.hidden = false;
    if (result.success) form.reset();
  } catch (error) {
    statusBox.textContent = 'Could not reach the server. Make sure the Node.js application is running.';
    statusBox.className = 'status error';
    statusBox.hidden = false;
  } finally {
    sendButton.disabled = false;
    sendButton.innerHTML = '<span>➤</span> Send email';
  }
});
