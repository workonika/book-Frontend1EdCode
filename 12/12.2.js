const createElement = (type) => document.createElement(type);
const createTitle = (title) => {
    const h3 = createElement("h3");
    h3.textContent = title;

    return h3;
}

const createButton = (title, cb) => {
    const button = createElement("button");
    button.addEventListener("click", cb);
    button.textContent = title;

    return button;
};

const createTwoStateButton = (startTitle, stopTitle, startCb, stopCb, fromStart) => {
    const button = createElement("button");
    const trigger = { start: fromStart ?? false };
    button.addEventListener("click", () => {

        button.textContent = trigger.start ? startTitle : stopTitle;
        trigger.start ? stopCb() : startCb();
        trigger.start = !trigger.start;
    });
    button.textContent = trigger.start ? startTitle : stopTitle;
    trigger.start = !trigger.start;

    return button;
};

const calculateTime = (min, sec, reset) => {

    if (reset || (min === 59 && sec === 59)) {
        return { min:  0, sec:  0 };
    }
    if (sec < 59) {
        return { min, sec: sec + 1 };
    }
    if (sec ===  59 && min < 59)  {
        return { min:  min + 1, sec: 0 };
    }
   
    return { min:  min + 1, sec };
};

const createTimer = () => {
    const time = { min: 0, sec: 0 };
    const flags = { cancel: null, reset: false };
    const subscribe = { cb: null };
    
    const update  = ()  => {
        const {min, sec} = calculateTime(time.min, time.sec, flags.reset);
        if (flags.reset) {
            flags.reset = false;
        }
        time.min = min; time.sec = sec;
        if (subscribe.cb) {
            subscribe.cb(min, sec);
        }
        flags.cancel = setTimeout(update,  1000);
    }

    return {
        min: 0, sec: 0,
        start: () => {
            if (!flags.cancel)  {
                flags.cancel = setTimeout(update,  1000);           
            }
        },
        cancel: () => {
            if (flags.cancel)  {
                clearTimeout(flags.cancel); flags.cancel = null;
            }
        },
        reset: () => flags.reset = !flags.reset,
        subscribe: (cb) => {
            subscribe.cb = cb;
        },
        unsubscribe: () => {
           subscribe.cb = null;
        },
    };
};

const createElementTimer = (createTimer, title) => {

    const timer = createTimer(); 
    const buttonStartCancel = createTwoStateButton("Начать", "Остановить", timer.start, timer.cancel, true);
    const buttonReset = createButton("Обнулить", timer.reset);
    const [minutes, colon, seconds, timerDiv] = ["span", "span", "span", "div"].map(element => createElement(element));
    colon.textContent = ":";
    const timerTitle = createTitle(title);
    const update = (min, sec) => {
        minutes.textContent = min.toString().padStart(2, "0");
        seconds.textContent = sec.toString().padStart(2, "0");
    };

    timer.subscribe(update);

    [timerTitle, minutes, colon, seconds, buttonStartCancel, buttonReset].forEach(DOMElement => timerDiv.appendChild(DOMElement));

    return timerDiv;
};

const createContainerCSSClasses = (classes) => {
    const container  = createElement("div");
    classes.forEach(c => container.classList.add(c));

    return container;
}

const insertElementToDOM = (DOMRef, ...element) => {
    const DOMNodes = element.reduce((DOMNode, nextDOMNode) => {
        DOMNode.appendChild(nextDOMNode);
        return DOMNode;
    });

    DOMRef.appendChild(DOMNodes);
};

const container = createContainerCSSClasses(["container", "timer"]);
const elementTimer = createElementTimer(createTimer, "Таймер");

const DOMNode = document.getElementById("timer");

insertElementToDOM(DOMNode, container, elementTimer);