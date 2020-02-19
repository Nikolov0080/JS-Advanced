function mySolution() {

    const $elements = {
        askQuestionTextarea: document.querySelector('#inputSection textarea'),
        usernameInputField: document.querySelector('#inputSection div input[type="username"]'),
        askQuestionButton: document.querySelector('#inputSection div button'),
        pQuestion: document.querySelector('#pendingQuestions'),
        openedQuestionsDiv: document.querySelector('#openQuestions')
    };

    $elements.askQuestionButton.addEventListener('click', askQuestion);


    function askQuestion() {
        let question = $elements.askQuestionTextarea.value;
        let usernameA = $elements.usernameInputField.value;

        let username = usernameA !== "" ? usernameA : usernameA = "Anonymous";

        //divs
        let pendingQuestionDiv = createHTMLElement('div', 'pendingQuestion');
        // div - children
        let usernameImage = createHTMLElement('img', null, null, [{ k: 'src', v: './images/user.png' }, { k: 'width', v: 32 }, { k: 'height', v: 32 }]);
        let usernameSpan = createHTMLElement('span', null, username);
        let questionP = createHTMLElement('p', null, question);
        // div - children
        let actionsDiv = createHTMLElement('div', 'actions');
        // div - children
        let archiveBtn = createHTMLElement('button', 'archive', 'Archive', null, { name: 'click', func: archiveQuestion })
        let openBtn = createHTMLElement('button', 'open', 'Open', null, { name: 'click', func: openQuestion })
        // div - children
        //divs

        actionsDiv = appendChildrenToParent([archiveBtn, openBtn], actionsDiv);
        pendingQuestionDiv = appendChildrenToParent([usernameImage, usernameSpan, questionP, actionsDiv], pendingQuestionDiv);

        $elements.pQuestion.appendChild(pendingQuestionDiv);

    }


    function archiveQuestion(e) {
        e.target.parentNode.parentNode.outerHTML = ''; // todo remove() it
    }

    function openQuestion(e) {

        let questionsDiv = e.target.parentNode.parentNode;

        questionsDiv.className = 'openQuestion';
        let actionsDiv = questionsDiv.querySelector('div.actions');
        actionsDiv.innerHTML = '';

        let replyBtn = createHTMLElement('button', 'reply', 'Reply', null, { name: 'click', func: replyToQuestion });
        actionsDiv = appendChildrenToParent([replyBtn], actionsDiv);

        let replySectionDiv = createHTMLElement('div', 'replySection', null, [{ k: 'style', v: 'display:none' }])
        let replyInput = createHTMLElement('input', 'replyInput', null, [{ k: 'type', v: 'text' }, { k: 'placeholder', v: 'Reply to this question here...' }]);
        let sendAnswerButton = createHTMLElement('button', 'replyButton', 'Send', null, { name: 'click', func: addAnswer });
        let answerOl = createHTMLElement('ol', 'reply', null, [{ k: 'type', v: '1' }]);

        replySectionDiv = appendChildrenToParent([replyInput, sendAnswerButton, answerOl], replySectionDiv);
        questionsDiv.appendChild(replySectionDiv);
        $elements.openedQuestionsDiv.appendChild(questionsDiv);
    }

    function addAnswer(e) {

        let answerInput = this.parentNode.querySelector('input');
        let li = document.createElement('li');
        li.innerText = answerInput.value;
        
        let ordList = this.parentNode.querySelector('.reply');
        ordList.appendChild(li);
        
        console.log(li);
    }

    function replyToQuestion(e) {

        let button = e.target;
        let replySectionDiv = this.parentNode.parentNode.querySelector('.replySection');

        if (button.textContent === 'Reply') {
            replySectionDiv.style.display = 'block';
            button.textContent = 'Back';
        } else {
            replySectionDiv.style.display = 'none';
            button.textContent = 'Reply';
        }
    }

    function createHTMLElement(tagName, className, textContent, attributes, event) {

        let element = document.createElement(tagName);

        if (className) {
            element.classList.add(className);
        }

        if (textContent) {
            element.textContent = textContent;
        }

        if (attributes) {
            attributes.forEach((a) => element.setAttribute(a.k, a.v));
        }

        if (event) {
            element.addEventListener(event.name, event.func);
        }

        return element;
    }

    function appendChildrenToParent(children, parent) {
        children.forEach(x => parent.appendChild(x));
        return parent;
    }
}