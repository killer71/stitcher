import './index.scss';

function lighter(rootElement, switchInterval = 2000) {
    let intervalId = null;
    let activeLightIndex = 0;
    let lights = [];
    let btnToggle;
    let isEnabled = rootElement.classList.contains('lighter_enabled');

    function render() {
        rootElement.classList.add('lighter');
        renderControl();
        renderLights();
    }

    function renderLights() {
        const colors = ['red', 'yellow', 'green'];
        const lightsEl = document.createElement('ul');
        lightsEl.classList.add('lighter_lights');

        colors.forEach((light) => {
            const lightElement = document.createElement('li');

            lightElement.classList.add(`lighter_light_${light}`, `lighter_light`);
            lightsEl.appendChild(lightElement);

            lights.push(lightElement);
        });

        rootElement.appendChild(lightsEl);
    }

    function renderControl() {
        btnToggle = document.createElement('button');
        btnToggle.textContent = 'включения/выключения';
        btnToggle.classList.add('lighter_toggle');

        rootElement.appendChild(btnToggle);
    }

    function handleEvents() {
        btnToggle.addEventListener('click', () => {
            console.log('CLICKED');
            if (isEnabled) {
                disableLighter();
            } else {
                enableLighter();
            }
        });

        rootElement.addEventListener('mouseenter', () => {
            stopAutoSwitch();
        });
        rootElement.addEventListener('mouseleave', () => {
            if (isEnabled && intervalId === null) {
                startAutoSwitch();
            }
        });
    }

    function disableLighter() {
        stopAutoSwitch();
        deactivateLight();
        activeLightIndex = 0;
        isEnabled = false;
    }

    function enableLighter() {
        activateLight();
        startAutoSwitch();
        isEnabled = true;
    }

    function nextIndex() {
        if (activeLightIndex + 1 < lights.length) {
            activeLightIndex++;
        } else {
            activeLightIndex = 0;
        }
    }

    function activateLight() {
        console.log(activeLightIndex);
        lights[activeLightIndex].classList.add('active');
    }

    function deactivateLight() {
        lights[activeLightIndex].classList.remove('active');
    }

    function stopAutoSwitch() {
        clearInterval(intervalId);
        intervalId = null;
    }

    function startAutoSwitch() {
        intervalId = setInterval(() => {
            deactivateLight();
            nextIndex();
            activateLight();
        }, switchInterval);
    }

    render();
    handleEvents();
}