const bInizio = document.getElementById("start-btn");
const bDue = document.getElementById("bDue");
const bTre = document.getElementById("bTre");
const bQuattro = document.getElementById("bQuattro");
const bFacile = document.getElementById("dFacile");
const bMedia = document.getElementById("dMedia");
const bDifficile = document.getElementById("dDifficile");
const griglia = document.getElementById("griglia");
const punteggio = document.getElementById("punteggio");
const cerchi = document.querySelectorAll(".cerchio");

//Register PWA service worker
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js');
}
//Funzioni MUST=essenziali
const pulsanti= ['p1','p2','p3','p4'];
const colori=['#D11513', '#FFC815', '#29BB2A', '#355CEB', '#FF7500', '#2ED7FF', '#A15CFF', '#FF74B5', '#FF00FF'];
var sequenzaGioco=[];
var sequenzaUtente=[];  
var isturnoUtente=false;
var velocitaFacile=800;
let d = 8;
let dimensione=4;

//Funzioni 

/* Il bottone deve essere:
    - spostato nelle impostazioni
    - aggiunto lo stile
    - cliccabile una sola volta dalle impostazioni facendo partire direttamente il gioco altrimenti aggiunge caselle all'array
*/

document.addEventListener('DOMContentLoaded', () => {
    Crea2();
});

function resetGriglia() {
    griglia.innerHTML = '';
    pulsanti.length = 0;
}

function resetCerchi() {
    let i;
    for (i=0; i < cerchi.length; i++) {
        cerchi[i].classList.remove('giusto');
    }
}

function Crea2() {
    dimensione=2;
    resetGriglia();
    griglia.style.gridTemplateColumns = "repeat(2, 100px)";
    for (let i = 1; i <= 4; i++) {
        CreaPulsante(i);
    }
}

function Crea3() {
    dimensione=3;
    resetGriglia();
    griglia.style.gridTemplateColumns = "repeat(3, 100px)";
    for (let i = 1; i <= 9; i++) {
        CreaPulsante(i);
    }
}

function Crea4() {
    dimensione=4;
    resetGriglia();
    griglia.style.gridTemplateColumns = "repeat(4, 100px)";
    for (let i = 1; i <= 16; i++) {
        CreaPulsante(i);
    }
}

function CreaPulsante(i) {
    let idNuovo = "p" + i;
    pulsanti.push(idNuovo);
    let bNuovo = document.createElement("button");
    bNuovo.id = idNuovo;
    bNuovo.className = "pulsante";
    bNuovo.setAttribute("onclick", `isMomentoDiCliccare('${idNuovo}')`);
    let colore;
    if(dimensione==4) {
        indice = Math.floor((i-1)/4);
        colore = colori[indice];
    } else {
        colore = colori[i - 1];
    }
    bNuovo.style.setProperty('--button-color', colore);
    griglia.appendChild(bNuovo);
}

function CreaCerchi(){
    resetCerchi();
    const punti = document.querySelector('.punti');
    let i;
    punti.innerHTML = '';

    if (d === 14) {
        punti.style.display = 'grid';
        punti.style.gridTemplateColumns = 'repeat(7, auto)';
        punti.style.justifyContent = 'center';
        punti.style.gap = '20px';
    } else if (d === 20) {
        punti.style.display = 'grid';
        punti.style.gridTemplateColumns = 'repeat(10, auto)';
        punti.style.justifyContent = 'center';
        punti.style.gap = '14px';
    } else {
        punti.style.display = 'flex';
        punti.style.justifyContent = 'center';
        punti.style.gap = '20px';
    }
    for(i=1; i<=d; i++) {
        const cerchio = document.createElement('span');
        cerchio.className = "cerchio";
        cerchio.id = "c" + i;
        punti.appendChild(cerchio);
    }
}

function DFacile() {
    d = 8;
    punteggio.textContent = "0/" + d;
    CreaCerchi();
}

function DMedia() {
    d = 14;
    punteggio.textContent = "0/" + d;
    CreaCerchi();
}

function DDifficile() {
    d = 20;
    punteggio.textContent = "0/" + d;
    CreaCerchi();
}

function Inizia(){
    resetCerchi();
    punteggio.textContent = "0/" + d;
    sequenzaGioco=[];
    sequenzaUtente=[];
    GeneraEavanza();
    bInizio.disabled = true;
    bDue.disabled = true;
    bTre.disabled = true;
    bQuattro.disabled = true;
    bFacile.disabled = true;
    bMedia.disabled = true;
    bDifficile.disabled = true;
    document.getElementById('back-btn').classList.remove('hidden');
    const settingsBtn = document.querySelector('.settings-btn');
    if (settingsBtn) {
        settingsBtn.classList.add('disabled');
    }
}
function Termina() {
    resetCerchi();
    punteggio.textContent = "0/" + d;
    sequenzaGioco = [];
    sequenzaUtente = [];
    isturnoUtente = false;
    document.getElementById('back-btn').classList.add('hidden');
    bInizio.disabled = false;
    bDue.disabled = false;
    bTre.disabled = false;
    bQuattro.disabled = false;
    bFacile.disabled = false;
    bMedia.disabled = false;
    bDifficile.disabled = false;
    const settingsBtn = document.querySelector('.settings-btn');
    if (settingsBtn) {
        settingsBtn.classList.remove('disabled');
    }
}
function Avanti(){
    window.location.href= "principale.html";
}
function GeneraEavanza(){
    const casuale=pulsanti[Math.floor(Math.random()*pulsanti.length)];
    sequenzaGioco.push(casuale);
    sequenzaUtente=[];
    isturnoUtente=false;
    MostraSequenza();
}
function MostraSequenza(){
    isturnoUtente=false;
    let tempo = 0;
    if (sequenzaGioco.length != 1) {
        tempo = 850;
    }
    setTimeout(() => {
        for(let i=0;i<sequenzaGioco.length;i++){
        let id=sequenzaGioco[i];
        setTimeout(()=>{
            PulsanteIlluminato(id);
            if(i===sequenzaGioco.length-1){
                setTimeout(()=>{
                isturnoUtente=true;// quando ho finito di mostrarti la sequenza, allora puoi cliccare
                },500);
            }
        },i*velocitaFacile); // aspetta(illumina) ogni i*velocitaFacile(ms)
    }
    }, tempo);
}
function PulsanteIlluminato(id){
    const pulsate=document.getElementById(id);
    pulsate.classList.add('attivo'); // si illumina, cioè da biando passa a grigio
    setTimeout(()=> pulsate.classList.remove('attivo'),400);// si "disattiva"(non è più illuminato) dopo 400ms
}
function isMomentoDiCliccare(id){
    if(!isturnoUtente)
        return;
    sequenzaUtente.push(id);
    PulsanteIlluminato(id);

    const IndiceCorrente=sequenzaUtente.length-1;
    if(sequenzaUtente[IndiceCorrente] !== sequenzaGioco[IndiceCorrente]){
        MostraSchermataPerdita();
        return;
    }
    if(sequenzaUtente.length===sequenzaGioco.length){
        let cerchio = document.getElementById("c" + sequenzaGioco.length);
        if (cerchio) {
            cerchio.classList.add('giusto');
        }
        punteggio.textContent = sequenzaGioco.length + "/" + d;
        setTimeout(()=>{
            if(sequenzaGioco.length===d) //controllo che la sequenza di gioco sia arrivata ad 8(obbiettivo da raggiungere per arrivare alla vittoria)
                MostraSchermataVittoria();
            else {
                GeneraEavanza();
            }
        },500);
    }
}
//In questo caso ho fatto due funzioni per mostrare la schermata di vincita e di perdita perchè nel caso in qui si voglia
// mettere una pagina html di vittoria e/o perdita abbiamo già le funzioni dichiarate e chiamate nelle varie funzioni
// in cui sono richieste codeste
function MostraSchermataVittoria(){
    resetCerchi();
    window.location.href="win.html";
    document.getElementById('back-btn').classList.add('hidden');
    bInizio.disabled = false;
    bDue.disabled = false;
    bTre.disabled = false;
    bQuattro.disabled = false;
    bFacile.disabled = false;
    bMedia.disabled = false;
    bDifficile.disabled = false;
    isturnoUtente = false;
}
function MostraSchermataPerdita(){
    resetCerchi();
    window.location.href="lose.html";
    document.getElementById('back-btn').classList.add('hidden');
    bInizio.disabled = false;
    bDue.disabled = false;
    bTre.disabled = false;
    bQuattro.disabled = false;
    bFacile.disabled = false;
    bMedia.disabled = false;
    bDifficile.disabled = false;
    isturnoUtente = false;
}