/* =========================================================
   Subhan Portfolio Chatbot — script.js (fully rewritten)
   Fixes:
   1. Removed import.meta.url → plain relative fetch() that
      works in both file:// and http:// contexts.
   2. Keyword key is read case-insensitively ("Keywords"
      AND "keywords" both supported).
   3. Smarter scoring: longer / exact matches rank higher.
   4. Animated three-dot typing indicator.
   5. Natural typing delay (600-1000 ms).
   6. Friendly fallback message listing askable topics.
   ========================================================= */

// ── DOM references ─────────────────────────────────────────
const chatBox     = document.getElementById('chat-box');
const userInput   = document.getElementById('user-input');
const sendButton  = document.getElementById('send-button');
const chatForm    = document.getElementById('chat-form');
const suggestions = document.querySelectorAll('.suggestion');

// ── Built-in fallback (used if data.json cannot be fetched) ─
const FALLBACK_KNOWLEDGE = {
    company_info: {
        name:     'Subhan',
        tagline:  'Full-Stack MERN Developer & AI Integration Specialist',
        location: 'Lahore, Pakistan',
        email:    'shiekhsubhan62@gmail.com',
        phone:    '+92 371 1441930',
        whatsapp: 'https://wa.me/923711441930'
    },
    knowledge_base: [
        {
            keywords: ['hello','hi','hey','hlo','helo','greetings','good morning','good afternoon','good evening'],
            response: "Hello! I'm Subhan's portfolio assistant. How can I help you today? You can ask about services, projects, skills, pricing, timeline, or contact details."
        },
        {
            keywords: ['who are you','who are u','who r u','about subhan','about you','profile','introduction','tell me about'],
            response: "I'm Subhan's portfolio assistant. Subhan is a Full-Stack MERN Developer and AI Integration Specialist based in Lahore, Pakistan. He builds scalable web apps, AI integrations, and custom chatbots."
        },
        {
            keywords: ['service','services','what do you offer','what can you do','offerings','what services'],
            response: "Subhan offers: Web Development, Mobile Development, UI/UX Design, Performance Optimization, E-commerce Solutions, API Development, AI Integrations, and Custom Chatbot Development."
        },
        {
            keywords: ['project','projects','featured work','portfolio','work examples'],
            response: "Featured projects: BJ Architects Website, Airport Luggage Van Website, Al Fatima Academy Website, Portfolio Website, and NexMove Chatbot."
        },
        {
            keywords: ['skill','skills','technology','tech stack','technologies','tools','stack','programming'],
            response: "Subhan works with: HTML, CSS, JavaScript, React, Node.js, Express, MongoDB, Firebase, Laravel, Tailwind CSS, AI integration, and chatbot development."
        },
        {
            keywords: ['contact','email','phone','whatsapp','get in touch','reach','call'],
            response: "Contact Subhan at shiekhsubhan62@gmail.com or +92 371 1441930. WhatsApp: https://wa.me/923711441930"
        },
        {
            keywords: ['location','where are you','based','pakistan','lahore'],
            response: "Subhan is based in Lahore, Pakistan and is available for remote freelance work worldwide."
        },
        {
            keywords: ['prices','price','pricing','cost','budget','how much','package'],
            response: "Pricing depends on project scope, features, and delivery needs. Contact Subhan for a tailored estimate."
        },
        {
            keywords: ['timeline','delivery','how long','deadline','turnaround'],
            response: "Project timelines depend on scope and complexity. A clear schedule is agreed after discussing requirements."
        },
        {
            keywords: ['available','freelance','hire','work together','collaborate','job'],
            response: "Subhan is available for freelance work — web apps, AI integrations, custom chatbots, and digital management systems."
        },
        {
            keywords: ['social media','github','linkedin','instagram','follow'],
            response: "Follow Subhan on GitHub: https://github.com/thomasshelbay348-cmd, LinkedIn: https://www.linkedin.com/in/subhan-shiekh12345, Instagram: https://www.instagram.com/invictustic"
        }
    ]
};

// ── Active knowledge store ─────────────────────────────────
let knowledgeData = FALLBACK_KNOWLEDGE;
let dataReady     = false;

// ── Load data.json without import.meta.url ─────────────────
(function initKnowledge() {
    const candidates = ['./data.json', 'data.json'];
    let idx = 0;

    function attempt() {
        if (idx >= candidates.length) {
            console.warn('data.json unavailable — using built-in knowledge.');
            dataReady = true;
            return;
        }
        fetch(candidates[idx] + '?t=' + Date.now(), { cache: 'no-store' })
            .then(function (res) {
                if (!res.ok) throw new Error('HTTP ' + res.status);
                return res.json();
            })
            .then(function (json) {
                if (json && Array.isArray(json.knowledge_base)) {
                    knowledgeData = json;
                    console.log('data.json loaded — ' + json.knowledge_base.length + ' entries.');
                }
                dataReady = true;
            })
            .catch(function () {
                idx++;
                attempt();
            });
    }

    attempt();
})();

// ── Wait until knowledge is ready (max 3 s) ────────────────
function whenReady() {
    return new Promise(function (resolve) {
        if (dataReady) { resolve(); return; }
        var iv = setInterval(function () {
            if (dataReady) { clearInterval(iv); resolve(); }
        }, 40);
        setTimeout(function () { clearInterval(iv); resolve(); }, 3000);
    });
}

// ── Read keywords regardless of capitalisation ─────────────
function getKeywords(entry) {
    return entry.Keywords || entry.keywords || [];
}

// ── Scoring / matching engine ──────────────────────────────
function findAnswer(rawMessage) {
    if (!knowledgeData || !Array.isArray(knowledgeData.knowledge_base)) return null;

    const msg = rawMessage.toLowerCase().trim().replace(/[?!.,;]+$/, '');

    let topScore = 0;
    let topEntry = null;

    knowledgeData.knowledge_base.forEach(function (entry) {
        const kws = getKeywords(entry);
        let score = 0;

        kws.forEach(function (kw) {
            const k = kw.toLowerCase();
            const wordCount = k.split(/\s+/).length;

            if (msg === k) {
                // Exact full match — highest weight
                score += wordCount * 10;
            } else if (msg.includes(k)) {
                // Contains the keyword phrase — weighted by length
                score += wordCount * 3;
            } else {
                // Individual word overlap (only meaningful words, length > 2)
                const kwWords  = k.split(/\s+/);
                const msgWords = msg.split(/\s+/);
                const hits = kwWords.filter(function (w) {
                    return w.length > 2 && msgWords.indexOf(w) !== -1;
                }).length;
                score += hits;
            }
        });

        if (score > topScore) {
            topScore = score;
            topEntry = entry;
        }
    });

    return topScore > 0 ? topEntry.response : null;
}

// ── Gemini AI (via secure Netlify Function — key hidden on server) ─
async function getGeminiResponse(userMessage) {
    try {
        const response = await fetch('/.netlify/functions/gemini', {
            method:  'POST',
            headers: { 'Content-Type': 'application/json' },
            body:    JSON.stringify({ message: userMessage })
        });

        if (!response.ok) {
            console.warn('Server function error:', response.status);
            return null;
        }

        const data = await response.json();
        return data?.reply || null;

    } catch (error) {
        console.error('Gemini function fetch error:', error);
    }
    return null;
}

// ── Build the bot reply ────────────────────────────────────
async function getBotReply(userMessage) {
    await whenReady();

    // 1. Try local keyword matching first (from data.json)
    const localAnswer = findAnswer(userMessage);
    if (localAnswer) return localAnswer;

    // 2. If no local answer found, try fetching from Gemini AI
    const aiAnswer = await getGeminiResponse(userMessage);
    if (aiAnswer) {
        return aiAnswer;
    }

    // 3. Final descriptive fallback
    return "I'm not sure about that, but I can help with:\n" +
           "- **Services** Subhan offers\n" +
           "- **Projects** in his portfolio\n" +
           "- **Skills** and tech stack\n" +
           "- **Pricing** and project timelines\n" +
           "- **Contact**, availability, and social links\n\n" +
           "What would you like to know?";
}

// ── Inline formatting (bold, code, links) ─────────────────
function appendInlineFormatting(container, text) {
    const pat = /(\*\*[^*]+\*\*|`[^`]+`|\[([^\]]+)\]\((https?:\/\/[^\s)]+)\))/g;
    let last = 0, m;

    while ((m = pat.exec(text)) !== null) {
        container.appendChild(document.createTextNode(text.slice(last, m.index)));

        if (m[0].startsWith('**')) {
            const s = document.createElement('strong');
            s.textContent = m[0].slice(2, -2);
            container.appendChild(s);
        } else if (m[0].startsWith('`')) {
            const c = document.createElement('code');
            c.textContent = m[0].slice(1, -1);
            container.appendChild(c);
        } else {
            const a = document.createElement('a');
            a.href = m[3]; a.target = '_blank'; a.rel = 'noopener noreferrer';
            a.textContent = m[2];
            container.appendChild(a);
        }
        last = pat.lastIndex;
    }
    container.appendChild(document.createTextNode(text.slice(last)));
}

function formatMessage(message) {
    const frag  = document.createDocumentFragment();
    const lines = message.trim().split(/\r?\n/);
    let list    = null;

    lines.forEach(function (line) {
        const t  = line.trim();
        const ul = t.match(/^[-*]\s+(.+)/);
        const ol = t.match(/^\d+[.)]\s+(.+)/);

        if (!t) { list = null; return; }

        if (ul || ol) {
            const tag = ul ? 'ul' : 'ol';
            if (!list || list.tagName.toLowerCase() !== tag) {
                list = document.createElement(tag);
                frag.appendChild(list);
            }
            const li = document.createElement('li');
            appendInlineFormatting(li, (ul || ol)[1]);
            list.appendChild(li);
            return;
        }

        list = null;
        const h = t.match(/^#{1,3}\s+(.+)/);
        const el = document.createElement(h ? 'h3' : 'p');
        appendInlineFormatting(el, h ? h[1] : t);
        frag.appendChild(el);
    });

    return frag;
}

// ── Add a message bubble to the chat ──────────────────────
function addMessage(message, className) {
    const div = document.createElement('div');
    div.classList.add('message', className);

    if (className === 'bot-message') {
        div.classList.add('formatted-message');
        div.appendChild(formatMessage(message));
    } else {
        div.textContent = message;
    }

    chatBox.appendChild(div);
    chatBox.scrollTop = chatBox.scrollHeight;
}

// ── Animated three-dot typing indicator ───────────────────
function showTyping() {
    const div = document.createElement('div');
    div.classList.add('message', 'bot-message', 'typing-indicator');
    div.innerHTML = '<span></span><span></span><span></span>';
    chatBox.appendChild(div);
    chatBox.scrollTop = chatBox.scrollHeight;
    return div;
}

// ── Send message flow ──────────────────────────────────────
async function sendMessage() {
    const msg = userInput.value.trim();
    if (!msg) return;

    sendButton.disabled = true;
    addMessage(msg, 'user-message');
    userInput.value = '';

    const dots = showTyping();

    // Natural delay: 600 – 1000 ms
    await new Promise(function (r) { setTimeout(r, 600 + Math.random() * 400); });

    const reply = await getBotReply(msg);
    dots.remove();
    addMessage(reply, 'bot-message');
    sendButton.disabled = false;
    userInput.focus();
}

// ── Event listeners ────────────────────────────────────────
chatForm.addEventListener('submit', function (e) {
    e.preventDefault();
    sendMessage();
});

suggestions.forEach(function (btn) {
    btn.addEventListener('click', function () {
        userInput.value = btn.dataset.question;
        sendMessage();
    });
});
