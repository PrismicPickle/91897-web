/* =========================================================
   CASELAB
   SINGLE CASE SYSTEM
========================================================= */


const SAVE_KEY = "CASE_LAB_SAVE_V1";


/* =========================================================
   DEFAULT PLAYER DATA
========================================================= */

const DEFAULT_STATE = {

    balance: 250,

    inventory: [],

    history: [],

    opens: 0,

    spent: 0,

    sold: 0

};


let state =
    JSON.parse(
        localStorage.getItem(SAVE_KEY)
    );


if (!state) {

    state =
        JSON.parse(
            JSON.stringify(DEFAULT_STATE)
        );

    saveState();

}


/* =========================================================
   SINGLE CASE
========================================================= */

const CASE_DATA = {

    name: "Case",

    price: 2.50,

    specialMultiplier: 1

};


/* =========================================================
   RARITIES
========================================================= */

const RARITIES = {

    consumer: {

        name: "Consumer Grade",

        color: "#b0c3d9",

        weight: 45

    },

    industrial: {

        name: "Industrial Grade",

        color: "#5e98d9",

        weight: 25

    },

    mil: {

        name: "Mil-Spec",

        color: "#4b69ff",

        weight: 18

    },

    restricted: {

        name: "Restricted",

        color: "#8847ff",

        weight: 8

    },

    classified: {

        name: "Classified",

        color: "#d32ce6",

        weight: 3

    },

    covert: {

        name: "Covert",

        color: "#eb4b4b",

        weight: 0.9

    },

    special: {

        name: "★ Special Item",

        color: "#ffd700",

        weight: 0.1

    }

};


/* =========================================================
   SKINS
========================================================= */

const SKINS = [

    {
        name: "P250 | Ironclad",
        icon: "🔫",
        rarity: "consumer",
        basePrice: 0.25,
        maxFloat: 0.80
    },

    {
        name: "MP9 | Steel Grid",
        icon: "🔫",
        rarity: "consumer",
        basePrice: 0.35,
        maxFloat: 0.80
    },

    {
        name: "Glock-18 | Nightline",
        icon: "🔫",
        rarity: "industrial",
        basePrice: 0.65,
        maxFloat: 0.80
    },

    {
        name: "MAC-10 | Circuit",
        icon: "🔫",
        rarity: "industrial",
        basePrice: 0.85,
        maxFloat: 0.80
    },

    {
        name: "AK-47 | Carbon",
        icon: "🔫",
        rarity: "mil",
        basePrice: 2.20,
        maxFloat: 0.80
    },

    {
        name: "M4A1-S | Static",
        icon: "🔫",
        rarity: "mil",
        basePrice: 2.80,
        maxFloat: 0.80
    },

    {
        name: "AWP | Blacklight",
        icon: "🔫",
        rarity: "restricted",
        basePrice: 7.50,
        maxFloat: 0.70
    },

    {
        name: "USP-S | Night Bloom",
        icon: "🔫",
        rarity: "restricted",
        basePrice: 9.20,
        maxFloat: 0.70
    },

    {
        name: "M4A1-S | Neon Circuit",
        icon: "🔫",
        rarity: "classified",
        basePrice: 28,
        maxFloat: 0.65
    },

    {
        name: "AK-47 | Redline X",
        icon: "🔫",
        rarity: "classified",
        basePrice: 35,
        maxFloat: 0.65
    },

    {
        name: "AWP | Crimson Edge",
        icon: "🔫",
        rarity: "covert",
        basePrice: 110,
        maxFloat: 0.55
    },

    {
        name: "AK-47 | Inferno",
        icon: "🔫",
        rarity: "covert",
        basePrice: 180,
        maxFloat: 0.55
    },

    {
        name: "★ Karambit | Prism",
        icon: "🔪",
        rarity: "special",
        basePrice: 420,
        maxFloat: 0.55
    },

    {
        name: "★ Butterfly Knife | Aurora",
        icon: "🔪",
        rarity: "special",
        basePrice: 650,
        maxFloat: 0.55
    },

    {
        name: "★ Specialist Gloves | Fade",
        icon: "🧤",
        rarity: "special",
        basePrice: 780,
        maxFloat: 0.55
    }

];


/* =========================================================
   HELPERS
========================================================= */

function money(value) {

    return "$" +
        Number(value).toFixed(2);

}


function saveState() {

    localStorage.setItem(
        SAVE_KEY,
        JSON.stringify(state)
    );

    updateBalance();

}


function updateBalance() {

    const balance =
        document.getElementById(
            "balance"
        );


    if (balance) {

        balance.textContent =
            money(state.balance);

    }

}


/* =========================================================
   WEAR
========================================================= */

function getWear(float) {

    if (float < 0.07)
        return "Factory New";

    if (float < 0.15)
        return "Minimal Wear";

    if (float < 0.38)
        return "Field-Tested";

    if (float < 0.45)
        return "Well-Worn";

    return "Battle-Scarred";

}


/* =========================================================
   RARITY ROLL
========================================================= */

function rollRarity() {

    let total = 0;


    for (
        const [key, rarity]
        of Object.entries(RARITIES)
    ) {

        let weight =
            rarity.weight;


        if (
            key === "special"
        ) {

            weight *=
                CASE_DATA.specialMultiplier;

        }


        total += weight;

    }


    let roll =
        Math.random() *
        total;


    for (
        const [key, rarity]
        of Object.entries(RARITIES)
    ) {

        let weight =
            rarity.weight;


        if (
            key === "special"
        ) {

            weight *=
                CASE_DATA.specialMultiplier;

        }


        roll -= weight;


        if (roll <= 0) {

            return key;

        }

    }


    return "consumer";

}


/* =========================================================
   CREATE ITEM
========================================================= */

function createDrop() {

    const rarity =
        rollRarity();


    let available =
        SKINS.filter(
            skin =>
                skin.rarity === rarity
        );


    if (!available.length) {

        available =
            SKINS.filter(
                skin =>
                    skin.rarity !==
                    "special"
            );

    }


    const skin =
        available[
            Math.floor(
                Math.random() *
                available.length
            )
        ];


    const float =
        Math.random() *
        skin.maxFloat;


    const statTrak =
        rarity !== "special" &&
        Math.random() < 0.10;


    let wearMultiplier =
        1.15 -
        float * 0.55;


    const marketVariation =
        0.90 +
        Math.random() *
        0.20;


    let price =

        skin.basePrice *

        wearMultiplier *

        marketVariation;


    if (statTrak) {

        price *= 1.25;

    }


    price =
        Math.max(
            0.05,
            price
        );


    return {

        id:
            crypto.randomUUID(),

        name:
            skin.name,

        icon:
            skin.icon,

        rarity,

        float,

        statTrak,

        price,

        caseName:
            CASE_DATA.name,

        timestamp:
            Date.now()

    };

}


/* =========================================================
   OPENING PAGE
========================================================= */

const rollerTrack =
    document.getElementById(
        "rollerTrack"
    );


const result =
    document.getElementById(
        "result"
    );


const openAgain =
    document.getElementById(
        "openAgain"
    );


let isOpening = false;

let currentDrop = null;


/* =========================================================
   AUTOMATICALLY OPEN CASE
========================================================= */

if (rollerTrack) {

    startOpening();

}


/* =========================================================
   START OPENING
========================================================= */

function startOpening() {

    if (isOpening)
        return;


    isOpening = true;


    if (openAgain) {

        openAgain.disabled =
            true;

    }


    result.innerHTML = "";


    /*
       IMPORTANT:

       The case is already purchased
       on the shop page.

       Therefore we DON'T subtract
       money here.
    */


    currentDrop =
        createDrop();


    buildRoller();


    animateRoller();

}


/* =========================================================
   BUILD ROLLER
========================================================= */

function buildRoller() {

    rollerTrack.innerHTML = "";


    const WIN_INDEX = 55;


    for (
        let i = 0;
        i < 75;
        i++
    ) {

        let item;


        if (
            i === WIN_INDEX
        ) {

            item =
                currentDrop;

        } else {

            item =
                createDrop();

        }


        const element =
            createRollerItem(
                item
            );


        rollerTrack.appendChild(
            element
        );

    }


    rollerTrack.style.transform =
        "translateX(0)";

}


/* =========================================================
   ROLLER ITEM
========================================================= */

function createRollerItem(item) {

    const rarity =
        RARITIES[
            item.rarity
        ];


    const element =
        document.createElement(
            "div"
        );


    element.className =
        "roller-item";


    element.style.setProperty(
        "--rarity-color",
        rarity.color
    );


    element.innerHTML = `

        <div class="roller-image">

            <span>
                ${item.icon}
            </span>

        </div>


        <div class="roller-name">

            ${
                item.statTrak
                ?
                '<small class="st">StatTrak™</small>'
                :
                ""
            }

            ${item.name}

        </div>


        <div
            class="roller-rarity"
            style="
                color:
                ${rarity.color};
            "
        >

            ${rarity.name}

        </div>

    `;


    return element;

}


/* =========================================================
   ANIMATE
========================================================= */

function animateRoller() {

    const WIN_INDEX =
        55;


    const itemWidth =
        178;


    const roller =
        document.querySelector(
            ".roller"
        );


    const rollerWidth =
        roller.offsetWidth;


    const randomOffset =
        Math.random() *
        30 -
        15;


    const finalPosition =

        (
            WIN_INDEX *
            itemWidth
        )

        -

        (
            rollerWidth / 2
        )

        +

        (
            itemWidth / 2
        )

        +

        randomOffset;


    rollerTrack.style.transition =
        "transform 6.5s cubic-bezier(.08,.72,.11,1)";


    rollerTrack.style.transform =
        `translateX(-${finalPosition}px)`;


    playTicks();


    setTimeout(
        finishOpening,
        6800
    );

}


/* =========================================================
   SOUND
========================================================= */

let audioContext = null;


function tickSound() {

    try {

        if (!audioContext) {

            audioContext =
                new (
                    window.AudioContext ||
                    window.webkitAudioContext
                )();

        }


        const oscillator =
            audioContext.createOscillator();


        const gain =
            audioContext.createGain();


        oscillator.type =
            "square";


        oscillator.frequency.value =
            500;


        gain.gain.setValueAtTime(
            0.0001,
            audioContext.currentTime
        );


        gain.gain.exponentialRampToValueAtTime(
            0.025,
            audioContext.currentTime + 0.005
        );


        gain.gain.exponentialRampToValueAtTime(
            0.0001,
            audioContext.currentTime + 0.04
        );


        oscillator
            .connect(gain)
            .connect(
                audioContext.destination
            );


        oscillator.start();


        oscillator.stop(
            audioContext.currentTime +
            0.05
        );

    } catch (error) {}

}


function playTicks() {

    let ticks = 0;


    const interval =
        setInterval(
            () => {

                tickSound();

                ticks++;


                if (
                    ticks >= 30
                ) {

                    clearInterval(
                        interval
                    );

                }

            },
            210
        );

}


/* =========================================================
   FINISH OPENING
========================================================= */

function finishOpening() {

    isOpening = false;


    state.inventory.unshift(
        currentDrop
    );


    state.history.unshift(
        currentDrop
    );


    state.opens++;


    saveState();


    const rarity =
        RARITIES[
            currentDrop.rarity
        ];


    result.innerHTML = `

        <div
            class="result-rarity"
            style="
                color:
                ${rarity.color};
            "
        >

            ${rarity.name}

        </div>


        <h2>

            ${
                currentDrop.statTrak
                ?
                "StatTrak™ "
                :
                ""
            }

            ${currentDrop.name}

        </h2>


        <p>

            Float:
            ${currentDrop.float.toFixed(4)}

            ·

            ${getWear(
                currentDrop.float
            )}

            ·

            ${money(
                currentDrop.price
            )}

        </p>

    `;


    if (openAgain) {

        openAgain.disabled =
            false;

    }


    if (
        currentDrop.rarity ===
        "special"
    ) {

        showToast(
            "★ SPECIAL ITEM!"
        );

    }

    else if (
        currentDrop.rarity ===
        "covert"
    ) {

        showToast(
            "🔥 COVERT DROP!"
        );

    }

    else {

        showToast(
            "Skin added to inventory."
        );

    }

}


/* =========================================================
   OPEN AGAIN
========================================================= */

if (openAgain) {

    openAgain.addEventListener(
        "click",
        () => {

            if (!isOpening) {

                startOpening();

            }

        }
    );

}


/* =========================================================
   INVENTORY
========================================================= */

const inventoryGrid =
    document.getElementById(
        "inventoryGrid"
    );


if (inventoryGrid) {

    renderInventory();


    document
        .getElementById(
            "search"
        )
        .addEventListener(
            "input",
            renderInventory
        );


    document
        .getElementById(
            "rarityFilter"
        )
        .addEventListener(
            "change",
            renderInventory
        );


    document
        .getElementById(
            "sort"
        )
        .addEventListener(
            "change",
            renderInventory
        );


    document
        .getElementById(
            "resetSave"
        )
        .addEventListener(
            "click",
            resetAccount
        );

}


/* =========================================================
   RENDER INVENTORY
========================================================= */

function renderInventory() {

    if (!inventoryGrid)
        return;


    const search =
        document
            .getElementById(
                "search"
            )
            .value
            .toLowerCase();


    const rarity =
        document
            .getElementById(
                "rarityFilter"
            )
            .value;


    const sort =
        document
            .getElementById(
                "sort"
            )
            .value;


    let items =
        [...state.inventory];


    items =
        items.filter(
            item => {

                const searchMatch =
                    item.name
                        .toLowerCase()
                        .includes(
                            search
                        );


                const rarityMatch =

                    rarity === "all"

                    ||

                    item.rarity ===
                    rarity;


                return (
                    searchMatch &&
                    rarityMatch
                );

            }
        );


    if (
        sort === "value"
    ) {

        items.sort(
            (a,b) =>
                b.price -
                a.price
        );

    }


    if (
        sort === "name"
    ) {

        items.sort(
            (a,b) =>
                a.name.localeCompare(
                    b.name
                )
        );

    }


    if (
        sort === "newest"
    ) {

        items.sort(
            (a,b) =>
                b.timestamp -
                a.timestamp
        );

    }


    document.getElementById(
        "inventoryCount"
    ).textContent =
        `(${items.length})`;


    if (!items.length) {

        inventoryGrid.innerHTML = `

            <div class="empty">

                Your inventory is empty.

                <br><br>

                <a href="csgo-case.html">
                    Open a case
                </a>

            </div>

        `;

        return;

    }


    inventoryGrid.innerHTML =
        items
            .map(
                createInventoryCard
            )
            .join("");


    document
        .querySelectorAll(
            ".sell-button"
        )
        .forEach(
            button => {

                button.addEventListener(
                    "click",
                    () => {

                        sellItem(
                            button.dataset.id
                        );

                    }
                );

            }
        );

}


/* =========================================================
   INVENTORY CARD
========================================================= */

function createInventoryCard(item) {

    const rarity =
        RARITIES[
            item.rarity
        ];


    return `

        <div
            class="inventory-card"
            style="
                --rarity-color:
                ${rarity.color};
            "
        >

            <div class="inventory-image">

                <span>
                    ${item.icon}
                </span>

            </div>


            <div class="inventory-info">

                <h3>

                    ${
                        item.statTrak
                        ?
                        '<span class="st">StatTrak™ </span>'
                        :
                        ""
                    }

                    ${item.name}

                </h3>


                <div
                    class="rarity-name"
                    style="
                        color:
                        ${rarity.color};
                    "
                >

                    ${rarity.name}

                </div>


                <div class="item-details">

                    Float:
                    ${item.float.toFixed(4)}

                    <br>

                    ${getWear(
                        item.float
                    )}

                </div>


                <div class="item-bottom">

                    <strong>
                        ${money(item.price)}
                    </strong>


                    <button
                        class="sell-button"
                        data-id="${item.id}"
                    >

                        SELL

                    </button>

                </div>

            </div>

        </div>

    `;

}


/* =========================================================
   SELL
========================================================= */

function sellItem(id) {

    const index =
        state.inventory.findIndex(
            item =>
                item.id === id
        );


    if (index === -1)
        return;


    const item =
        state.inventory[index];


    state.inventory.splice(
        index,
        1
    );


    state.balance +=
        item.price;


    state.sold +=
        item.price;


    saveState();


    renderInventory();


    showToast(
        "Sold for " +
        money(item.price)
    );

}


/* =========================================================
   STATS
========================================================= */

const casesOpened =
    document.getElementById(
        "casesOpened"
    );


if (casesOpened) {

    renderStats();

}


function renderStats() {

    const inventoryValue =
        state.inventory.reduce(
            (total,item) =>
                total +
                item.price,
            0
        );


    const highTier =
        state.inventory.filter(
            item =>

                item.rarity ===
                "covert"

                ||

                item.rarity ===
                "special"

        ).length;


    document.getElementById(
        "casesOpened"
    ).textContent =
        state.opens;


    document.getElementById(
        "moneySpent"
    ).textContent =
        money(state.spent);


    document.getElementById(
        "moneySold"
    ).textContent =
        money(state.sold);


    document.getElementById(
        "inventoryValue"
    ).textContent =
        money(inventoryValue);


    document.getElementById(
        "highTierDrops"
    ).textContent =
        highTier;


    document.getElementById(
        "currentBalance"
    ).textContent =
        money(state.balance);


    const historyList =
        document.getElementById(
            "historyList"
        );


    if (!historyList)
        return;


    if (
        !state.history.length
    ) {

        historyList.innerHTML = `

            <div class="empty">

                No cases opened yet.

            </div>

        `;

        return;

    }


    historyList.innerHTML =
        state.history
            .slice(0,50)
            .map(
                createHistoryItem
            )
            .join("");

}


/* =========================================================
   HISTORY
========================================================= */

function createHistoryItem(item) {

    const rarity =
        RARITIES[
            item.rarity
        ];


    return `

        <div class="history-item">

            <div
                class="history-icon"
                style="
                    border-color:
                    ${rarity.color};
                "
            >

                ${item.icon}

            </div>


            <div class="history-info">

                <strong
                    style="
                        color:
                        ${rarity.color};
                    "
                >

                    ${
                        item.statTrak
                        ?
                        "StatTrak™ "
                        :
                        ""
                    }

                    ${item.name}

                </strong>


                <span>

                    ${item.caseName}

                    ·

                    ${getWear(
                        item.float
                    )}

                </span>

            </div>


            <strong>

                ${money(item.price)}

            </strong>

        </div>

    `;

}


/* =========================================================
   RESET
========================================================= */

function resetAccount() {

    const confirmed =
        confirm(
            "Are you sure you want to reset your account?"
        );


    if (!confirmed)
        return;


    state =
        JSON.parse(
            JSON.stringify(
                DEFAULT_STATE
            )
        );


    saveState();


    showToast(
        "Account reset."
    );


    setTimeout(
        () => {

            location.reload();

        },
        700
    );

}


/* =========================================================
   TOAST
========================================================= */

function showToast(message) {

    const toast =
        document.getElementById(
            "toast"
        );


    if (!toast)
        return;


    toast.textContent =
        message;


    toast.classList.add(
        "show"
    );


    clearTimeout(
        window.toastTimer
    );


    window.toastTimer =
        setTimeout(
            () => {

                toast.classList.remove(
                    "show"
                );

            },
            2500
        );

}


/* =========================================================
   INITIALISE
========================================================= */

updateBalance();