import { useState } from 'react';

const ChatbotFloat = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(prev => !prev);
  const close = () => setIsOpen(false);

  return (
    <>
      <button
        type="button"
        className="chatbot-float"
        aria-label="Open AI chatbot"
        title="Open AI chatbot"
        onClick={toggle}
        aria-expanded={String(isOpen)}
      >
        <i className="fa-solid fa-robot"></i>
      </button>

      {isOpen && (
        <div className="chatbot-window" id="chatbotWindow" aria-label="AI chatbot window">
          <button
            type="button"
            className="chatbot-close"
            onClick={close}
            aria-label="Close AI chatbot"
            title="Close AI chatbot"
          >
            <i className="fa-solid fa-xmark"></i>
          </button>
          <iframe src="/AI chatbot/index.html?v=4" title="AI chatbot"></iframe>
        </div>
      )}
    </>
  );
};

export default ChatbotFloat;
