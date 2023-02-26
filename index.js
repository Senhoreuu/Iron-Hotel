`use strict`;

const wait = (callback, ticks) => {
    const delay = Delay.interval(() => {
        Delay.cancel(delay);
        callback();
    }, ticks);

    return delay;
};

const config = {
    door: Room.getFurniById(304395922),
    carpetStaff: 302225943,
    badgeWin: `ES73K`,
    badgeJason: `IT239`,
    badgeHalloween10: `UK399`,
    badgeHalloween30: `NL634`,
    badgePromoter: `GMS12`,
    log: new Map()
};

const game = {
    wins: new Map(),
    users: new Map(),
    jason: new Map(),
    joinedInGame: {},
    win: 0,
    promoter: null,
    timer: 0,
    stage: 0,
    deads: 0
};

const wireds = {
    reset: Room.getFurniById(325022370),
    start: Room.getFurniById(325022369),
    middle: Room.getFurniById(325022373),
    end: Room.getFurniById(325022372)
};

const rooms = [889766, 889799, 889823, 889837, 889873, 889904, 892636, 893095, 893118, 893132, 893148, 893454, 893458, 893728, 893958, 899867, 899870, 907232, 907233, 912756, 913470, 913593, 913961, 914166, 914201, 915048, 915847, 924104, 996225];
const chair = Room.getFurniById(321887973);
const roomNOT = (icon = `WEEN`, message) => Room.getAllPlayers().forEach(e => e.notification(icon, message));

// Visuais de Jason
const visuals = {
    male: [
        { figure: `hd-990000447-1012-1012.fa-987462884-1368.he-989999972-62.ea-1402-62.ch-9941044-109.sh-990000116-1195-73.cc-990000512-1198.lg-9587209-1195-92`, owner: `Bloom` },
        { figure: `hd-990000447-1012-1012.fa-987462884-1368.he-989999972-62.ea-1402-62.ch-9941044-96.sh-990000116-1195-73.cc-990000512-1198.lg-9587209-1195-92`, owner: `Bloom` },
        { figure: `hd-990000447-1012-1012.fa-987462884-1368.he-989999972-62.ea-1402-62.ch-9941044-1185.sh-990000116-1195-73.cc-990000512-1198.lg-9587209-1195-92`, owner: `Bloom` },
        { figure: `hd-990000447-1012-1012.fa-987462884-1368.he-989999972-62.ea-1402-62.ch-9941044-1233.sh-990000116-1195-73.cc-990000512-1198.lg-9587209-1195-92`, owner: `Bloom` },
        { figure: `hd-990000447-1012-1012.fa-987462884-1368.he-989999972-62.ea-1402-62.ch-9941044-1335.sh-990000116-1195-73.cc-990000512-1198.lg-9587209-1195-92`, owner: `Bloom` },
        { figure: `hr-3163-1055.hd-190-10.ch-6134524-1335.sh-3252-1335-92.he-3181-1335.fa-987462884-1368.wa-3264-1335-92.cc-568282-62`, owner: `Vestrair` },
        { figure: `lg-270-1332.he-989999972-62.ch-210-1332.sh-300-64.fa-987462884-1368.ca-3223-62.hr-893-42.wa-2012-1332.cp-255170-100.hd-180-97557`, owner: `Vanoski` },
        { figure: `ch-210-1189.sh-906-110.hd-207-97554.he-1608-1313.hr-998786897-1161.lg-280-110.fa-987462884-1368`, owner: `Neto` },
        { figure: `hd-180-10.ea-990000001-1341.fa-987462884-1368.hr-678-1108.sh-572209-1201-1189.cp-3205-0.ch-989999938-1198-92.cc-990000512-1189.ca-990000440-1205.lg-11090314-1313.wa-990000225-92.he-990000314-1332`, owner: `Poe` },
        { figure: `lg-61411473-1335-1335.hd-209-10.hr-28021715-45.sh-295-92.ea-990000380-92-92.he-989999972-92.ca-990000444-92.fa-987462884-1368.ch-9941044-92`, owner: `Tason` },
        { figure: `hd-180-1021.lg-285-1233.sh-989999997-1233-1363.fa-987462884-1368.hr-990000353-1139.ha-12090314-62.cc-989999970-62-1363.ch-3077-1233-1233.ca-990000440-1233`, owner: `dieguin` }
    ],

    female: [
        { figure: `wa-990000431-1313.hr-25876011-1072.hd-629-10.fa-987462884-1368.ch-989999937-1228-92.sh-735-1189.cc-201416-1189-1189.cp-9032-95.lg-3006-1189-1193`, owner: `Bloom` },
        { figure: `wa-990000431-1313.hr-998786810-1054-31.hd-629-10.fa-987462884-1368.ch-989999937-1211-92.sh-735-1189.cc-201416-1189-1189.cp-9032-95.lg-3006-1189-1193`, owner: `Any` },
        { figure: `hr-26073-1072.hd-629-97554.ch-5579038-1230-92.sh-300-1189.cc-201416-1335-1189.cp-9032-95.lg-3006-1228-1228.he-989999972-62.fa-987462884-1368.ea-990000318-62`, owner: `bleakness` },
        { figure: `hr-4410678-1044-31.hd-629-10.fa-987462884-1368.ch-989999937-1228-92.sh-735-1189.cc-201416-1189-1189.cp-9032-95.lg-3006-1189-1193.he-989999972-1298`, owner: `Fer` },
        { figure: `hd-629-97554.ch-990000589-110.sh-3252-110-110.hr-998786940-61.lg-319002-110.fa-987462884-1368.ha-50476640-110-100.cc-3002-110.cp-5580053-73`, owner: `Erva` },
        { figure: `wa-990000431-1313.hr-990000183-42.hd-629-10.fa-987462884-1368.ch-894624605-1211-1229.sh-908-1330.cp-5580053-95.lg-319002-1335.ca-990000440-62.ha-894624600-1229-1211`, owner: `Jour` },
        { figure: `hd-894624588-97554.sh-3064-92.lg-987462842-92-92.ch-3005-92.ca-990000440-62.hr-998786897-49.he-989999972-62.fa-987462884-1368.cc-990000371-62-92.wa-32754775-62`, owner: `bleakness` },
        { figure: `hd-600-3.hr-998786774-1030.fa-987462884-1368.lg-3006-1189-1195.sh-5456282-110-1205.ch-3046-110.ha-1013-110.ca-990000440-92.cc-990000575-1189.he-989999972-62`, owner: `Agatha` }
    ],

    default: [`hr-115-42.hd-190-1.ch-215-62.lg-285-91.sh-290-62`]
};

const checkUser = (name, id, user) => {
    getSave();
    if (!game.joinedInGame[name]) {
        game.joinedInGame[name] = {
            name: name,
            id: id ? id : 0,
            joins: 0,
            kills: 0,
            deads: 0,
            diedOf: `É novo(a) aqui no Fuja do Jason!`,
            wins: 0,
            figure: user ? user.getFigure() : visuals.default[0],
        }
    }
    else {
        game.joinedInGame[name].name = name;
        game.joinedInGame[name].figure = user ? user.getFigure() : visuals.default[0];
    }
    save();
};

// converter tempo
const convertTime = (seconds) => {
    seconds = seconds % 3600;
    const min = Math.floor(seconds / 60);
    const seg = Math.floor(seconds % 60);

    const time = `Restam ${min} minutos e ${seg} segundos para o fim do evento!`;

    return time;
};

// Usuário entra no quarto
const join = (user) => {
    user.setEffect(0);
    const id = user.getId();

    const name = user.getUsername();

    checkUser(name, id);

    game.users.set(name, user);

    const isJason = game.jason.has(name);
    const isStaff = user.hasBadge(config.badgePromoter);

    const y = user.getY() !== 3;

    if (id === game.promoter) {
        game.promoter = false;
    }

    if (isStaff && !isJason) {
        if (y) user.teleport(9, 9, 0, 2);

        wait(() => user.message(`Diga :cadeira para poder comandar!`, 23), 3);
        return;
    }

    if (isJason) {
        user.setEffect(5000);
        if (config.door.getState() == 1 || y) {
            user.teleport(9, 9, 0, 2);
            wait(() => user.message(`Seja bem-vindo(a) jason!`, 9), 3);
        }
        else user.teleport(17, 8, 0, 2);
        return;
    }

    if (y) {
        user.teleport(8, 20, 0, 0);
        user.message(`Bem-vindo(a) a central do Fuja do Jason, ${name}! Diga :help para saber como funciona!`, 9);
    }
    else user.setEffect(5001);
};

// Promoter
const moveToChair = (user) => {
    if (!user.hasBadge(config.badgePromoter)) return;

    if (game.promoter) return user.message(`Já há alguém comandando!`, 9);

    user.teleport(chair);
    game.promoter = user.getId();

    wait(() => user.message(`Use :help para saber os comandos!`, 9), 2);
};

// Recebe o total de usuários nos quartos
const usersCount = (user) => {
    const allUsers = GlobalStorage.get(`Rooms-Jasons`);
    const timer = convertTime(game.timer);
    if (allUsers <= 0) {
        user.message(`Não há nenhum corredor jogando!`, 9);
    } else if (allUsers == 1) {
        user.message(`Há apenas um corredor jogando! ${timer}`, 9);
    } else if (allUsers > 1) {
        user.message(`Há ${allUsers} corredores jogando! ${timer}`, 9);
        if (user.in(chair)) {
            wait(() => user.message(`Total de wins setados: ${game.win}`, 9), 2);
        }
    }
    if (game.deads > 0) {
        wait(() => user.message(`Total de mortes: ${game.deads}`, 9), 4);
    }
};

// Sistema de retornar todos quando haver o total de vencedores.
let gTimer = null;
function getPlayers() {
    const timer = Delay.interval(() => {
        const allUsers = GlobalStorage.get(`Rooms-Jasons`);
        if (allUsers > game.win || allUsers === 0) return;
        wait(() => {
            if (allUsers > game.win || allUsers <= 0 || game.timer == 0) return;
            Engine.log(`playersWin`);
            ended();
        }, 3);
    }, 6);

    gTimer = timer;
};

// Sistema do tempo
let dTimer = null;
function timer() {
    const timer = Delay.interval(() => {
        if (game.timer > 0) game.timer--;

        if (game.timer == 690) return sendLog(false, `Atenção usuários: Os jason foram liberados!`);

        if (game.timer == 600) return getPlayers();

        if (game.timer !== 0) return;
        Engine.log(`end Timer`);
        ended();
    }, 2);

    dTimer = timer;
};

// Jasons
const setVisual = (user, message) => {
    const n = Number(message.split(` `)[2]);
    message = message.split(` `)[1];
    let gender = false;

    if (message != 'f' && message != 'm') return user.message(`Gênero não encontrado! Use 'm' ou 'f'!`, 9);

    gender = message ? message : user.getGender().toLowerCase();

    if (n) {
        if (gender == `m`) {
            if (n > visuals.male.length || n <= 0) return user.message(`Use números a cima de 0 até ${(visuals.male.length)}`, 9);
            user.setFigure(gender, visuals.male[n - 1].figure);
            user.message(`Visual criado por ${visuals.male[n - 1].owner}.`, 9);
        }
        else if (gender == `f`) {
            if (n > visuals.female.length || n <= 0) return user.message(`Use números a cima de 0 até ${(visuals.female.length)}`, 9);
            n--;
            user.setFigure(gender, visuals.female[n - 1].figure);
            user.message(`Visual criado pela ${visuals.female[n - 1].owner}.`, 9);
        }
    }
    else {
        if (gender == `m`) {
            const random = Math.floor(Math.random() * visuals.male.length);
            user.setFigure(gender, visuals.male[random].figure);
            user.message(`Visual número ${(random + 1)}. Criado por ${visuals.male[random].owner}.`, 9);
        }
        else if (gender == `f`) {
            const random = Math.floor(Math.random() * visuals.female.length);
            user.setFigure(gender, visuals.female[random].figure);
            user.message(`Visual número ${(random + 1)}. Criado pela ${visuals.female[random].owner}.`, 9);
        }
    }
};

// Convocar um novo Jason
const addJason = (user, message) => {
    getSave();
    message = message.split(` `)[1];

    const player = game.users.get(message);
    const name = player?.getUsername();

    if (!game.users.has(message)) return user.message(`Nome não encontrado!`, 9);

    if (name === user.getUsername() && name !== `Senhoreu`) return user.message(`Deseja convocar a si mesmo?`, 9);

    if (game.jason.has(name)) return delJason(user, message);

    game.jason.set(name, { name: message, kills: 0 });
    Log(name);

    user.message(`Você convocou ${name}!`, 9);
    player.giveBadge(config.badgeJason);
    player.teleport(10, 5, 0, 0);
    player.setEffect(5000);

    if (player.getGender() == `M`) player.message(`Você foi convocado para ser um Jason! Use :help para saber as regras e comandos!`, 9);
    else player.message(`Você foi convocada para ser uma Jason! Use :help para saber as regras e comandos!`, 9);
    save();
};

// Desconvocar um Jason
const removeJason = (user, message) => {
    getSave();
    const arg = message.split(` `)[1];

    if (!game.jason.has(arg)) return addJason(user, message);

    game.jason.delete(arg);

    const player = game.users.get(arg);

    user.message(`${arg} foi desconvocado(a)!`, 9);

    save();

    if (!player) return;

    player.teleport(8, 20, 0, 0);
    player.setEffect(0);
    player.message(`Você foi desconvocado(a)!`, 9);
    deleteMask(player);
};

// Opção 2
const delJason = (user, name) => {
    getSave();
    game.jason.delete(name);

    const player = game.users.get(name);

    if (user) {
        user.message(`${name} foi desconvocado(a), pois já era um Jason! Use :jason para facilitar!`, 9);
    }

    save();

    if (!player) return;

    player.teleport(8, 20, 0, 0);
    player.setEffect(0);
    player.message(`Você foi desconvocado(a)!`, 9);
    deleteMask(player);
};

// Metodo para remover mascara
const deleteMask = (player) => {
    const figure = player.getFigure();
    const whtHf = figure.split(`-`);
    const index = whtHf.indexOf('987462884');
    if (index >= 0) {
        const get = figure.split(`fa-987462884-${whtHf[index + 1]}`).toString();
        if (get) {
            const visual = get.split(`,`).toString();
            if (visual) player.setFigure(player.getGender(), visual);
        }
    }
};

// Remove um Jason aleatório
const removeRandomJason = (user) => {
    const jasons = [...game.jason.keys()];
    const random = Math.floor(Math.random() * jasons.length);

    const removeJason = () => {
        const jason = jasons[random];
        if (jason) {
            user.say(`Um jason será escolhido aleatoriamente para ser Desconvocado!`, false, 9);
            wait(() => {
                user.say(`${jason} foi o(a) escolhido(a)!`, false, 9);
                delJason(false, jason);
            }, 3);
        }
        else {
            user.message(`Nenhum jason escolhido!`, 9);
        }
    };

    removeJason();
};

// Remove todos os Jason
const resetJasons = (user) => {
    getSave();
    const jasons = [...game.jason.keys()];
    jasons.forEach(name => {
        delJason(false, name);
    });
    game.jason.clear();
    save();
    user.message(`A lista de Jason foi resetada!`, 23);
};

// Metodo para pegar todos os nomes
const getJasonNames = () => {
    const arrayJasons = [...game.jason.values()];
    const jasons = [];

    arrayJasons.forEach(element => {
        const name = element.name;
        jasons.push(` ${name}`);
    });

    return jasons.toString();
};

// Adiciona e Remove Promotores
const setStaff = (user, message) => {
    message = message.split(` `)[1];

    const player = Room.getPlayerByName(message);

    if (!player) return;

    if (player.hasBadge(config.badgePromoter)) {
        user.message(`O usuáro ${message} foi removido da Staff!`, 23);
        player.removeBadge(config.badgePromoter);
        player.alertLong(`Você não é mais um Membro da Equipe do Fuja do Jason!`);
        return;
    }

    user.message(`O usuáro ${message} foi adicionado na Staff!`, 23);
    player.giveBadge(config.badgePromoter);
    player.alertLong(`Você é um Membro da Equipe do Fuja do Jason!`);
};

const deleteProfile = (user, message) => {
    getSave();
    message = message.split(` `)[1];
    delete game.joinedInGame[message];
    config.log.delete(message);
    save();

    user.message(`Perfil de ${message} foi deletado!`, 23);
};

// Checa onde está pisando
const convertFigure = (visual) => {
    const index = visual.split(`-`).indexOf('fa');
    const next = [index + 1, index[index + 1]];
    const nextTonext = [next[0] + 1, index[next[0] + 1]];
    visual.replace(`${next[0]}`, ``).replace(`${nextTonext[0]}`, ``);
    const f = `${visual}${`.fa-987462884-1368`}`;
    return f;
};

const checkVisual = (user, message) => {
    if (user.getEffect() == 5001) return;
    let figure = user.getFigure();
    const get = figure.split(`.`);
    const whtHf = get.toString().split(`-`);
    const hasFa = whtHf.includes(`fa`);
    const visual = whtHf.includes(`987462884`);
    if (!visual) {
        if (hasFa) figure = convertFigure(figure);
        else figure = `${figure}${`.fa-987462884-1368`}`;

        user.setFigure(user.getGender(), figure);
    }
    else if (message) deleteMask(user);
};

const onStepOn = (user, furni) => {
    const id = furni.getId();

    if (id === config.carpetStaff && !user.hasBadge(config.badgePromoter) && user.getEffect() !== 5000) {
        user.teleport(10, 16, 0, 4);
        user.message(`Apenas pessoas autorizadas!`, 23);
        return;
    }

    if (id === config.door.getId()) {
        if (game.jason.has(user.getUsername())) {
            checkVisual(user);
            user.teleport(17, 8, 0, 0);
            return;
        }

        user.teleport(9, 9, 0, 2);
        user.message(`Você não é um Jason!`, 9);
        return;
    }

    const sprite = furni.getSprite();

    if (sprite === 4923) return user.gotoRoom(997073);

    if (sprite === 718908) {
        const get = user.getFigure().split(`-`);
        const visual = get.includes(`987462884`);
        if (visual) {
            user.teleport(10, 16, 0, 4);
            user.message(`Você não é um Jason!`, 9);
            deleteMask(user);
            return;
        }
        else {
            user.setEffect(5001);
            game.joinedInGame[user.getUsername()].joins++;
        }
        return;
    }

    if (sprite === 3370 && user.getEffect() === 5000) {
        user.message(`Você é um Jason, apenas Runners entram aqui!`, 9);
        user.teleport(10, 5, 0, 0);
    }
};

// Define total de vencedores
const setWin = (user, message) => {
    const arg = message.split(` `)[1];
    const win = Number(arg);
    if (!win) return user.message(`Use somente números!`, 23);
    if (win > 0 && win < 7) {
        game.win = win;
        user.message(`${win} vencedores foram definidos!`, 23);
    }
    else user.message(`Defina entre 1 a 6 vencedores!`, 23);
};

// Inicia
const start = (user) => {
    if (game.stage != 0) return user.message(`O evento já foi iniciado! Use o comando :reset`, 23);

    if (game.win === 0) return user.message(`Defina um total de vencedores antes de iniciar! Use :setwin <number>`, 23);

    game.stage = 1;
    game.timer = 780;

    wireds.start.move(wireds.start.getX(), wireds.start.getY(), wireds.start.getZ(), (wireds.start.getR() + 1));
    user.message(`Evento iniciado! Dentro de 13 minutos o evento encerrará!`, 9);
    const new_configs = {};
    GlobalStorage.set(`jasonConfig-`, JSON.stringify(new_configs));
    GlobalStorage.set(`Rooms-Jasons`, Number(0));
    timer();

    wait(() => user.message(`Mensagem enviada com sucesso!`, 9), 205);
};

// Volta usuários que estão dentro do tele do Lobby e Jasons
const backPlayers = () => {
    Room.getAllPlayers().forEach(user => {
        if (user.getEffect() === 5000 || user.getEffect() === 5001) {
            join(user);
            user.notification(`WEEN`, `Fim do Evento!`);
        }
    });
};

// Finaliza
const ended = () => {
    const allUsers = GlobalStorage.get(`Rooms-Jasons`);
    rooms.forEach(roomId => Events.sendMessageToRoom(roomId, `back`, `back`));
    backPlayers();

    const bot = Room.getBotByName(`Jason`);

    if (allUsers > 0 && game.deads > 0) bot.say(`Tivemos o total de: ${allUsers} vencedores! Total de Mortos: ${game.deads}!`, true, 9);
    reset();
};

// Reset
const reset = (user) => {
    wireds.reset.move(wireds.reset.getX(), wireds.reset.getY(), wireds.reset.getZ(), (wireds.reset.getR() + 1));

    game.timer = 0;
    game.win = 0;
    game.deads = 0;
    game.stage = 0;
    cancelIntervals();

    GlobalStorage.set(`Rooms-Jasons`, Number(0));

    if (user) return user.message(`Resetado!`, 9);
};

const cancelIntervals = () => {
    if (dTimer) Delay.cancel(dTimer);

    if (gTimer) Delay.cancel(gTimer);

    dTimer = null;
    gTimer = null;
};

// Podium
let podium = [];
const fakes = {
    1: null,
    2: null,
    3: null
};

const enablesPodium = {
    1: 111,
    2: 110,
    3: 109
};

const posFakes = [
    { x: 8, y: 7, z: 2.6, r: 2 },
    { x: 8, y: 8, z: 2, r: 2 },
    { x: 8, y: 6, z: 1.5, r: 2 }
];

const createBot = (index, data, botPos) => {
    let player = fakes[index];

    if (!player || player.getUsername() !== data.name) {
        if (player) Faker.removeEntity(player);

        player = Faker.createFakePlayer(data.name, botPos.x, botPos.y, botPos.z, 0);
        fakes[index] = player;
    }

    player.setUsername(data.name);
    player.teleport(botPos.x, botPos.y, botPos.z, botPos.r);
    if (data.points === 1) player.setMotto(`${data.name} matou ${data.points} Corredor!`);
    else player.setMotto(`${data.name} matou ${data.points} Corredores!`);
    player.setFigure('m', data.figure);
    player.setEffect(enablesPodium[index]);
    player.addBadge(config.badgeJason);
};

const loadPodium = () => {
    for (let i = 0; i < 3; i++) {
        const position = podium[i];

        if (!position) break;

        const botPos = posFakes[i];
        const index = i + 1;
        createBot(index, position, botPos);
    }
    save();
};

const setPodium = (name, value) => {
    const data = game.joinedInGame[name];
    const index = podium.findIndex(data => data.id == data.id);

    if (index >= 0) {
        podium[index].points += value ? value : 1;
    }
    else podium.push({
        id: data.id,
        name: data.name,
        figure: data.figure,
        points: value ? value : 1
    });

    podium = podium.sort((a, b) => b.points - a.points);

    loadPodium();
};

// Verifica se quem entrou é um vencedor
const checkBadge = (name, user) => {
    // if (game.joinedInGame[name].wins >= 10 && !user.hasBadge(config.badgeHalloween10)) {
    //     user.giveBadge(config.badgeHalloween10);
    //     user.message(`Parabéns, você recebeu o Emblema de 10 Vitórias!`, 9);
    // }

    // if (game.joinedInGame[name].wins >= 30 && !user.hasBadge(config.badgeHalloween30)) {
    //     user.giveBadge(config.badgeHalloween30);
    //     user.message(`Parabéns, você recebeu o Emblema de 30 Vitórias!`, 9);
    // }
};

const isWinner = (user) => {
    const name = user.getUsername()
    if (game.wins.has(name)) {
        game.wins.delete(name);
        user.giveBadge(config.badgeWin);
    }
    checkBadge(name, user);
};


// Recebe Notificações
const getLog = (roomId, event, data) => {
    getSave();
    data = JSON.parse(data);
    let message = false;

    const user = data.user.toString();

    if (event === `kill`) {
        const target = data.target;
        const room = data.room;

        message = `${target} foi eliminado(a) por ${user} no quarto ${room}!`;

        game.joinedInGame[user].kills++;

        game.joinedInGame[target].deads++;
        game.joinedInGame[target].diedOf = `Eliminado(a) pelo Jason ${user}!`;
        game.deads++;
        save();

        if (game.jason.has(user)) {
            const config = game.jason.get(user);
            config.kills++;
            game.jason.set(user, config);
        }
        setPodium(user, 1);
    }

    if (event === `killSelf`) {
        message = `${user} eliminou a si mesmo no canhão!`;
        game.joinedInGame[user].deads++;
        game.joinedInGame[target].diedOf = `Suicidio!`;
        game.deads++;
        save();
    }

    if (event === `killCannon`) {
        const target = data.target;

        message = `${user} eliminou ${target} no canhão!`;
        game.joinedInGame[target].deads++;
        game.joinedInGame[target].diedOf = `Eliminado(a) por ${user} no canhão!`;
        game.deads++;

        game.joinedInGame[user].kills++;
        save();

        if (game.jason.has(user)) {
            const config = game.jason.get(user);
            config.kills++;
            game.jason.set(user, config);
        }
        setPodium(user, 1);
    }

    if (event === `win`) {

        if (user) {
            message = `${user} conseguiu escapar dos Jason!`;
            Highscores.add(user, 1);
            game.joinedInGame[user].wins++;
            game.wins.set(user, `win`);
        }
        else message = `Senhoreu conseguiu escapar dos Jason!`
        save();
    }

    if (event === `mention`) {
        const target = data.target;
        const phrase = data.phrase;

        const player = Room.getPlayerByName(target);

        if (player) player.notification(`WEEN`, `${data.user} mencionou você: ${phrase}`);
    }

    if (message) roomNOT(`WEEN`, message);
};

// Enviar Notificações
const sendLog = (user, message) => {
    if (user) {
        message = message.split(` `);
        if (!message[1]) return user.message(`Defina uma mensagem.`, 3);
        message.shift();
        message = message.join(` `);
    }
    rooms.forEach(roomId => Events.sendMessageToRoom(roomId, `notif`, message));

    roomNOT(`WEEN`, message);
};

// Checa quem saiu e tira do map
const leave = id => {
    if (id === game.promoter) {
        game.promoter = null;
    }
    game.users.delete(id);
};

// Mostra listas
const help = (user) => {
    const ef = user.getEffect();

    if (user.getUsername() == `Senhoreu` || user.getUsername() == Room.getOwnerUsername()) return user.alertLong(`Lista de comandos:\n\nLista dos comandos para o funcionamento\n:setwin <number> - Defina um número de jogadores que irão vencer!\n:iniciar - Inicia o Fuja do Jason\n:reset - Reseta o cronômetro, as portas e os lobos\n:finalizar - Finaliza o evento e traz os Jason e os Users\n\nLista dos comandos para o Jogo\n:send <message> - Envia uma mensagem para os usuários que estão nos quartos\n:lista - Mostra os Jasons convocados\n:visual <f/m> - Comando para os Jason trocarem de roupa!\n:add <username> - Convoca um novo Jason!\n:remove <username> - Retira o Jason!\n:jason - Adiciona e Remove Jason\n:random - Remove um Jason aleatório\n:clear - Reseta a lista de Jason convocados!\n:rooms - Retorna o número de corredores nos quartos\nOBS: Às vezes retorna a menos e ignora Jason\n:adicionar - Adiciona um novo Membro\n:remover - Remove um Membro`);

    if (user.getId() === game.promoter) return user.alertLong(`Lista de comandos:\n\nLista dos comandos para o funcionamento\n:setwin <number> - Defina um número de jogadores que irão vencer!\n:iniciar - Inicia o Fuja do Jason\n:reset - Reseta o cronômetro, as portas e os lobos\n:finalizar - Finaliza o evento e traz os Jason e os Users\n\nLista dos comandos para o Jogo\n:send <message> - Envia uma mensagem para os usuários que estão nos quartos\n:lista - Mostra os Jasons convocados\n:visual <f/m> - Comando para os Jason trocarem de roupa (:visual f - Roupa Feminina / :visual m - Roupa Masculina)!\n:add <username> - Convoca um novo Jason!\n:remove <username> - Retira o Jason!\n:random - Remove um Jason aleatório\n:jason - Adiciona e Remove Jason\n:clear - Reseta a lista de Jason convocados!\n:rooms - Retorna o número de corredores nos quartos\nOBS: Às vezes retorna a menos e ignora Jason`);

    if (ef == 5000) return user.alertLong(`Você é um(a) Jason!\n Seu objetivo é correr até atrás dos usuários! OBS: Não é possível matar os Corredores no quarto principal\nLista de comandos: :visual <f/m> - Use para vestir uma roupa de Jason (:visual f - Roupa Feminina / :visual m - Roupa Masculina)!\n\nRegras:\n1°: O usuário não pode ser kikado na animação do teletransporte!\n2°: Quando a caçada terminar, não é permitido continuar expulsando usuários!\n3°: É necessário esperar 2 minutos após a entrada dos usuários para poder matar os usuários.`);

    return user.alertLong(`Bem-vindo(a) ao Fuja do Jason!\nSeu objetivo é fugir do Jason passando pelos teletransportes e se escondendo! Os Runners entram primeiro que os Jason! Quando se passar 2 minutos da entrada dos Runners os Jason entrarão! Após 4 minutos, ninguém consegue voltar mais depois de morrer! Caso você volte para o teletransporte inicial (lobby), se houver lobos, tenha cuidado, eles matarão você!`);
};

const showList = (user) => {
    const allUsers = GlobalStorage.get(`Rooms-Jasons`);
    const players = Object.keys(game.joinedInGame);
    const jasons = getJasonNames();
    const time = convertTime(game.timer);

    user.alertLong(`Jasons:${jasons}\n\nTotal de Runners: ${allUsers}\n\nTotal de mortes: ${game.deads}\n\nTotal de Vencedores setados: ${game.win}\n\nTempo: ${time}\n\nJogadores registrados: ${players.length}`);
};

const showLog = (user) => {
    const names = [...config.log.keys()];
    const points = [...config.log.values()];
    let message = `Log\n\n`;

    for (let i = 0; i < names.length; i++) {
        message += `Nome: ${names[i]} - Convocado: ${points[i]} vez(s)\n`;
    }

    user.alertLong(message);
};

const showProfile = (user, args) => {
    const arg = args.split(` `)[1];
    let name = user.getUsername();

    if (arg && arg != name) name = arg;

    let message = `Perfil de ${name}`;

    if (!game.joinedInGame[name]) message += `\n\nAinda não possui perfil`;
    else message += `\n\nMatou: ${game.joinedInGame[name].kills} corredor(es)\n\nJogou: ${game.joinedInGame[name].joins} vez(es)\n\nMorreu: ${game.joinedInGame[name].deads} vez(es)\n\nÚltima morte: ${game.joinedInGame[name].diedOf}\n\nVenceu: ${game.joinedInGame[name].wins} vez(es)`;

    user.alertLong(message);
};

// Engine
const cleanAll = (user) => {
    getSave();
    Faker.removeAllEntities();
    clearHall();
    config.log.clear();
    podium = [];

    const names = Object.keys(game.joinedInGame);

    names.forEach(name => {
        if (name) {
            const data = game.joinedInGame[name];
            game.joinedInGame[name] = {
                name: name,
                id: data.id,
                joins: 0,
                kills: 0,
                deads: 0,
                diedOf: data.diedOf,
                wins: 0,
                figure: data.figure,
            }
        };
    })
    user.message(`Fim do processo! Tudo foi resetado`, 23);
    save();
};

const clearHall = () => Highscores.clear(302259932);

const Log = (name) => {
    if (!config.log.has(name)) return config.log.set(name, 1);
    const points = (config.log.get(name) + 1);
    config.log.set(name, points);
};

const save = () => {
    GlobalStorage.set(`jasons-111`, JSON.stringify(Object.fromEntries(game.jason)));
    const objectEntries = Object.assign(JSON.parse(GlobalStorage.get(`joinedInGame-Jason`)), game.joinedInGame);
    GlobalStorage.set(`joinedInGame-Jason`, JSON.stringify(objectEntries));
    GlobalStorage.set(`jasonPodium-jason`, JSON.stringify(podium));
    GlobalStorage.set(`logJason`, JSON.stringify(Object.fromEntries(config.log)));
};

const getSave = () => {
    const check_jason = GlobalStorage.get(`jasons-111`);
    const check_joinedInGame = GlobalStorage.get(`joinedInGame-Jason`);
    const check_podium = GlobalStorage.get(`jasonPodium-jason`);
    const check_log = GlobalStorage.get(`logJason`);

    if (check_log) {
        const map = new Map(Object.entries(JSON.parse(check_log)));
        config.log = map;
    }

    if (check_podium) {
        const convert = JSON.parse(check_podium);
        podium = convert;
    }

    if (check_joinedInGame) {
        const convert = JSON.parse(check_joinedInGame);
        game.joinedInGame = convert;
    }

    if (check_jason) {
        const map = new Map(Object.entries(JSON.parse(check_jason)));
        game.jason = map;
    }
};

// Events
Events.on(`userJoin`, join);
Events.on(`userJoin`, isWinner);
Events.on(`userLeave`, leave);
Events.on(`stepOn`, onStepOn);
Events.on(`load`, getSave);
Events.on(`load`, loadPodium);
Events.on(`serverMessage`, getLog);
Events.on(`dispose`, resetJasons);

// Commands

const giveWin = (user, message) => {
    getSave();
    const number = message.split(` `)[2];
    message = message.split(` `)[1];

    checkUser(message);

    if (game.joinedInGame[message]) game.joinedInGame[message].wins += Number(number);

    save();
};

Commands.register(`:fila`, true, join);
Commands.register(`:help`, true, help);
Commands.register(`:perfil`, true, showProfile);
Commands.register(`:rooms`, true, usersCount);
Commands.register(`:lista`, true, showList);
Commands.register(`:log`, true, showLog);
Commands.register(`:mask`, true, checkVisual);

// Commands Senhoreu
const Command = (command, start, callback) => {
    const execute = (user, message) => {
        if (user.getUsername() === `Senhoreu`) callback(user, message);
    }

    Commands.register(command, start, execute);
};

Command(`:staff`, true, setStaff);
Command(`:cleanAll`, true, cleanAll);
Command(`:delete`, true, deleteProfile);
Command(`:giveWin`, true, giveWin);

// Commands Promoter
const Promoter = (command, start, callback) => {
    const execute = (user, message) => {
        if (user.getId() === game.promoter || user.getUsername() === `Senhoreu`) callback(user, message);
    }

    Commands.register(command, start, execute);
};

Commands.register(`:cadeira`, true, moveToChair);

Promoter(`:setwin `, true, setWin);
Promoter(`:iniciar`, true, start);
Promoter(`:finalizar`, true, ended);
Promoter(`:reset`, true, reset);

Promoter(`:send `, true, sendLog);
Promoter(`:add `, true, addJason);
Promoter(`:remove `, true, removeJason);
Promoter(`:jason `, true, addJason);
Promoter(`:clear`, true, resetJasons);
Promoter(`:random`, true, removeRandomJason);

// Commands Jason
const Jason = (command, start, callback) => {
    const execute = (user, message) => {
        if (user.getEffect() === 5000 || user.getUsername() === `Senhoreu`) callback(user, message);
    }

    Commands.register(command, start, execute);
};

Jason(`:visual`, true, setVisual);

const waitMention = new Set();
Events.on(`say`, (user, message) => {
    const getMention = message.indexOf(`@`);
    if (getMention == 0) {
        const id = user.getId();
        if (waitMention.has(id)) return;
        const arg = message.split(`@`)[1];
        const name = arg.split(` `)[0];
        const phrase = message.split(`@${name} `)[1];

        if (!name || !phrase) return;

        let roomsId = [924213];
        roomsId = roomsId.concat(rooms);
        waitMention.add(id);

        roomsId.forEach(id => Events.sendMessageToRoom(id, `mention`, JSON.stringify({ user: user.getUsername(), target: name, phrase: phrase, room: Room.getName() })));

        user.message(`Menção enviada para ${name}!`, 9);

        wait(() => waitMention.delete(id), 6);
    }
});