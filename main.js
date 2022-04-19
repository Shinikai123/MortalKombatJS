const $arenas = document.querySelector('.arenas');
//const $randomButton = document.querySelector('.button');
const $formFight = document.querySelector('.control');
const $chat = document.querySelector('.chat');

const HIT = {

    head: 30,

    body: 25,

    foot: 20,

};

const NAME_MAP = {
    SCORPION: 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
    KITANA: 'http://reactmarathon-api.herokuapp.com/assets/kitana.gif',
    LIUKANG: 'http://reactmarathon-api.herokuapp.com/assets/liukang.gif',
    SONYA: 'http://reactmarathon-api.herokuapp.com/assets/sonya.gif',
    SUBZERO: 'http://reactmarathon-api.herokuapp.com/assets/subzero.gif',
};

const ATTACK = ['head', 'body', 'foot'];

const LOGS = {

    start: 'Часы показывали [time], когда [player1] и [player2] бросили вызов друг другу.',

    end: [

        'Результат удара [playerWins]: [playerLose] - труп',

        '[playerLose] погиб от удара бойца [playerWins]',

        'Результат боя: [playerLose] - жертва, [playerWins] - убийца',

    ],

    hit: [

        '[playerDefence] пытался сконцентрироваться, но [playerKick] разбежавшись раздробил копчиком левое ухо врага.',

        '[playerDefence] расстроился, как вдруг, неожиданно [playerKick] случайно раздробил грудью грудину противника.',

        '[playerDefence] зажмурился, а в это время [playerKick], прослезившись, раздробил кулаком пах оппонента.',

        '[playerDefence] чесал <вырезано цензурой>, и внезапно неустрашимый [playerKick] отчаянно размозжил грудью левый бицепс оппонента.',

        '[playerDefence] задумался, но внезапно [playerKick] случайно влепил грубый удар копчиком в пояс оппонента.',

        '[playerDefence] ковырялся в зубах, но [playerKick] проснувшись влепил тяжелый удар пальцем в кадык врага.',

        '[playerDefence] вспомнил что-то важное, но внезапно [playerKick] зевнув, размозжил открытой ладонью челюсть противника.',

        '[playerDefence] осмотрелся, и в это время [playerKick] мимоходом раздробил стопой аппендикс соперника.',

        '[playerDefence] кашлянул, но внезапно [playerKick] показав палец, размозжил пальцем грудь соперника.',

        '[playerDefence] пытался что-то сказать, а жестокий [playerKick] проснувшись размозжил копчиком левую ногу противника.',

        '[playerDefence] забылся, как внезапно безумный [playerKick] со скуки, влепил удар коленом в левый бок соперника.',

        '[playerDefence] поперхнулся, а за это [playerKick] мимоходом раздробил коленом висок врага.',

        '[playerDefence] расстроился, а в это время наглый [playerKick] пошатнувшись размозжил копчиком губы оппонента.',

        '[playerDefence] осмотрелся, но внезапно [playerKick] робко размозжил коленом левый глаз противника.',

        '[playerDefence] осмотрелся, а [playerKick] вломил дробящий удар плечом, пробив блок, куда обычно не бьют оппонента.',

        '[playerDefence] ковырялся в зубах, как вдруг, неожиданно [playerKick] отчаянно размозжил плечом мышцы пресса оппонента.',

        '[playerDefence] пришел в себя, и в это время [playerKick] провел разбивающий удар кистью руки, пробив блок, в голень противника.',

        '[playerDefence] пошатнулся, а в это время [playerKick] хихикая влепил грубый удар открытой ладонью по бедрам врага.',

    ],

    defence: [

        '[playerKick] потерял момент и храбрый [playerDefence] отпрыгнул от удара открытой ладонью в ключицу.',

        '[playerKick] не контролировал ситуацию, и потому [playerDefence] поставил блок на удар пяткой в правую грудь.',

        '[playerKick] потерял момент и [playerDefence] поставил блок на удар коленом по селезенке.',

        '[playerKick] поскользнулся и задумчивый [playerDefence] поставил блок на тычок головой в бровь.',

        '[playerKick] старался провести удар, но непобедимый [playerDefence] ушел в сторону от удара копчиком прямо в пятку.',

        '[playerKick] обманулся и жестокий [playerDefence] блокировал удар стопой в солнечное сплетение.',

        '[playerKick] не думал о бое, потому расстроенный [playerDefence] отпрыгнул от удара кулаком куда обычно не бьют.',

        '[playerKick] обманулся и жестокий [playerDefence] блокировал удар стопой в солнечное сплетение.'

    ],

    draw: 'Ничья - это тоже победа!'

};

const player1 = {
    player: 1,
    name: 'SCORPION',
    hp: 100,
    img: NAME_MAP['SCORPION'],
    elHP: elHP,
    changeHP,
    renderHP,
    };

const player2 = {
    player: 2,
    name: 'SUB-ZERO',
    hp: 100,
    img: NAME_MAP['SUBZERO'],
    elHP: elHP,
    changeHP,
    renderHP,
    };

function elHP(){
    return document.querySelector('.player'+this.player+' .life');
}

function createElement(tag, className) {
    const $tag = document.createElement(tag);
if(className){
    $tag.classList.add(className);
    }

    return $tag;
}

function createPlayer({player, hp, name, img}) {
    const $player = createElement('div', `player${player}`);
    const $progressbar = createElement('div', 'progressbar')
    const $character = createElement('div', 'character')
    const $life = createElement('div', 'life')
    const $name = createElement('div', 'name')
    const $img = document.createElement('img')


    $life.style.width =hp + '%';
    $name.innerText = name;
    $img.src = img;

    $progressbar.appendChild($name);
    $progressbar.appendChild($life)

    $character.appendChild($img);

    $player.appendChild($progressbar);
    $player.appendChild($character);

    return $player;
}

function createReloadButton(){
    const $reloadButtonDiv = createElement('div', 'reloadWrap');
    const $reloadButton = createElement('button', 'button');
    $reloadButton.innerText = 'Restart';

    $reloadButton.addEventListener('click', function(){
        window.location.reload();
    });

    $reloadButtonDiv.appendChild($reloadButton);
    $arenas.appendChild($reloadButtonDiv);
}


function changeHP(randomNumber){
    this.hp -= randomNumber;

    if(this.hp <= 0) {
        this.hp = 0;
    }
}

function renderHP() {
    this.elHP().style.width = this.hp + '%';
}


function playerLose(name) {
    const $loseTitle = createElement('div', 'loseTitle');
    if(name) {
        $loseTitle.innerText = name + ' wins';
    } else {
        $loseTitle.innerText = 'draw';
    }

    return $loseTitle;
}

function getRandom(num) {
    return Math.ceil(Math.random() * num);
}

//$randomButton.addEventListener('click', function(){
//   player1.changeHP(getRandom(20));
//    player1.renderHP();
//    player2.changeHP(getRandom(20));
//    player2.renderHP();
//})


function enemyAttack() {
    const hit = ATTACK[getRandom(3) -1];
    const defence = ATTACK[getRandom(3) -1];
    
    return{
        value: getRandom(HIT[hit]),
        hit,
        defence,
    }
}

function playerAttack() {
    const attack = {};

    for (let item of $formFight) {
        if (item.checked && item.name === 'hit') {
            attack.value = getRandom(HIT[item.value]);
            attack.hit = item.value;
        }

        if (item.checked && item.name === 'defence') {
            attack.defence = item.value;
        }

        item.checked = false;
    }


    return attack;
}

function showResult() {
    if(player2.hp === 0 || player1.hp === 0){
    createReloadButton();
    }
    
    if(player1.hp === 0 && player1.hp < player2.hp){
        $arenas.appendChild(playerLose(player2.name));
        generateLogs('end', player2, player1);
    } else if (player2.hp === 0 && player2.hp < player1.hp){
        $arenas.appendChild(playerLose(player1.name));
        generateLogs('end', player1, player2);
    } else if (player1.hp === 0 && player2.hp === 0){
        $arenas.appendChild(playerLose());
        generateLogs('draw');
    }
}


const getTime = () => {
    const date = new Date();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();

    const formattedDate = `${hours < 10 ? `0${hours}` : hours} : ${minutes < 10 ? `0${minutes}` : minutes} : ${seconds < 10 ? `0${seconds}` : seconds}`

    return formattedDate;
};

function getTextLog(type, playerName1, playerName2){
    switch(type){
        case 'start':
            return LOGS[type]
                .replace('[player1]', playerName1)
                .replace('[player2]', playerName2)
                .replace('[time]', getTime());
            break;
        case 'end':
            return LOGS[type]
                .replace('[playerWins]', playerName1)
                .replace('[playerLose]', playerName2);
            break;
        case 'hit':
            return LOGS[type][getRandom(LOGS[type].length -1) -1]
            .replace('[playerKick]', playerName1)
            .replace('[playerDefence]', playerName2)
            break;
        case 'defence':
            return LOGS[type][getRandom(LOGS[type].length -1) -1]
            .replace('[playerKick]', playerName1)
            .replace('[playerDefence]', playerName2)
            break;
        case 'draw':
            return LOGS[type];
            break;
}
}

function generateLogs(type, player1= {}, player2 ={}, valueAttack) {
    //const text = LOGS[type][0].replace('[playerKick]', player1.name).replace('[playerDefence]', player2.name);
    let text = getTextLog(type, player1.name, player2.name);
    switch(type) {
        case 'hit':
            text = `${getTime()} ${text} -${valueAttack}[${player2.hp}/100]`;
            break;
        case 'defence':
            
        case 'end':
            
        case 'draw':
            text = `${getTime()} ${text}`; 
            break;
    }

    
    const el= `<p>${text}</p>`;
    $chat.insertAdjacentHTML('afterbegin',el);
}


$formFight.addEventListener('submit', function(e) {
    e.preventDefault();

    const enemy = enemyAttack();
    const player = playerAttack();

    if (player.defence !== enemy.hit) {
        player1.changeHP(enemy.value);
        player1.renderHP();
        generateLogs('hit', player2, player1, enemy.value);
    } else {
        generateLogs('defence', player2, player1);
    }

    if(enemy.defence !== player.hit){
        player2.changeHP(player.value);
        player2.renderHP();
        generateLogs('hit', player1, player2, player.value);
    } else {
        generateLogs('defence', player1, player2);
    }

    showResult();
    });

function init(){
    $arenas.appendChild(createPlayer(player1));
    $arenas.appendChild(createPlayer(player2));
    generateLogs('start', player1, player2);
}

init();