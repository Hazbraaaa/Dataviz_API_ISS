// init variables

const urlAPI = "https://api.wheretheiss.at/v1/satellites/25544";
const markerSvg = "<img src='image/iss.svg'></img>";
const gData = [{
    lat: 0,
    lng: 0,
    size: 60,
    color: 'yellow'
}];
let latitude;
let longitude;
let altitude;

const globe = new Globe(document.querySelector('#globe'))
    .globeImageUrl('//unpkg.com/three-globe/example/img/earth-blue-marble.jpg')
    .bumpImageUrl('//unpkg.com/three-globe/example/img/earth-topology.png')
    .backgroundImageUrl('//unpkg.com/three-globe/example/img/night-sky.png')
    .htmlElementsData(gData)
    .htmlElement(d => {
        const el = document.createElement('div');

        el.innerHTML = markerSvg;
        el.style.color = d.color;
        el.style.width = `${d.size}px`;
        el.style.transition = 'opacity 250ms';

        el.style['pointer-events'] = 'auto';
        el.style.cursor = 'pointer';
        el.onclick = () => console.info(d);
        return el;
    })


// Add auto-rotation
globe.controls().autoRotate = true;
globe.controls().autoRotateSpeed = 0.3;

// init functions

function updateISSPosition() {
    globe.htmlLat(latitude);
    globe.htmlLng(longitude);
}

async function getISSPosition() {
    try {
        const response = await fetch(urlAPI);
        const data = await response.json();

        latitude = data.latitude;
        longitude = data.longitude;
        updateISSPosition();
    }
    catch (error) {
        //affiche le type d'erreur
        console.error(error)
    }
}


// execute code
getISSPosition();
let intervalId = setInterval(() => {
    getISSPosition();
}, 3000);