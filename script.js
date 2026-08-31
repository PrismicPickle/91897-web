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

const storedCasePrice =
    Number(
        sessionStorage.getItem(
            "CASE_LAB_CASE_PRICE"
        )
    );

if (
    Number.isFinite(storedCasePrice) &&
    storedCasePrice > 0
) {
    CASE_DATA.price = storedCasePrice;
}


const storedCaseVariant =
    Number(
        sessionStorage.getItem(
            "CASE_LAB_CASE_VARIANT"
        )
    );


CASE_DATA.variant =
    Number.isInteger(storedCaseVariant) &&
    storedCaseVariant >= 0
        ? storedCaseVariant
        : 0;


CASE_DATA.type =
    sessionStorage.getItem(
        "CASE_LAB_CASE_TYPE"
    ) || "csgo";


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


const TWO_THOUSAND_RARITY_WEIGHTS = {

    consumer: 65,
    industrial: 32,
    mil: 1.5,
    restricted: 1,
    classified: 0.4,
    covert: 0.09,
    special: 0.01

};


function getCaseProfile() {

    if (CASE_DATA.price === 2000) {

        return {
            maxValue: null,
            weights: TWO_THOUSAND_RARITY_WEIGHTS
        };

    }


    const progress =
        Math.min(
            1,
            Math.max(
                0,
                Math.log10(CASE_DATA.price) /
                Math.log10(1000)
            )
        );


    return {
        maxValue:
            Math.max(
                1,
                CASE_DATA.price * 10
            ),
        weights: {
            consumer: 70 - 35 * progress,
            industrial: 24 + 12 * progress,
            mil: 5 + 10 * progress,
            restricted: 0.8 + 5 * progress,
            classified: 0.15 + 2 * progress,
            covert: 0.04 + 0.8 * progress,
            special: 0.01 + 0.2 * progress
        }
    };

}


function getRarityWeight(key) {

    const weights =
        getCaseProfile().weights;


    const baseWeight =
        weights[key].weight ??
        weights[key];


    return key === "special"
        ? baseWeight * CASE_DATA.specialMultiplier
        : baseWeight;

}


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


const TWO_THOUSAND_CASE_ITEMS = [

    {
        name: "Alex's snowboard skills",
        icon: "🏂",
        rarity: "consumer",
        basePrice: 1,
        maxFloat: 0.80,
        fixedPrice: true
    },

    {
        name: "Scott Tucker",
        icon: "👤",
        rarity: "consumer",
        basePrice: 1,
        maxFloat: 0.80,
        fixedPrice: true
    },

    {
        name: "Lube Dispenser",
        icon: "🧴",
        rarity: "consumer",
        basePrice: 20,
        maxFloat: 0.80,
        fixedPrice: true
    },

    {
        name: "Alex's cat",
        icon: "🐈",
        rarity: "industrial",
        basePrice: 5,
        maxFloat: 0.80,
        fixedPrice: true
    },

    {
        name: "Alex Tumor finger and a chocolate",
        icon: "🍫",
        rarity: "industrial",
        basePrice: 5,
        maxFloat: 0.80,
        fixedPrice: true
    },

    {
        name: "Alex's zesty cow",
        icon: "🐄",
        rarity: "industrial",
        basePrice: 500,
        maxFloat: 0.80,
        fixedPrice: true
    },

    {
        name: "Hand squeezed canadian bear juice",
        icon: "🧃",
        rarity: "mil",
        basePrice: 100000,
        maxFloat: 0.70,
        fixedPrice: true
    },

    {
        name: "DTS Chair wheels",
        icon: "🛞",
        rarity: "mil",
        basePrice: 300000,
        maxFloat: 0.70,
        fixedPrice: true
    },

    {
        name: "Aiden's guitar",
        icon: "🎸",
        rarity: "restricted",
        basePrice: 706045,
        maxFloat: 0.65,
        fixedPrice: true
    },

    {
        name: "Candace's pet bear",
        icon: "🐻",
        rarity: "classified",
        basePrice: 1000000,
        maxFloat: 0.60,
        fixedPrice: true
    },

    {
        name: "Alex 3-piece computer",
        icon: "🖥️",
        rarity: "classified",
        basePrice: 1000000,
        maxFloat: 0.60,
        fixedPrice: true
    },

    {
        name: "Candace condom fingers",
        icon: "🧤",
        rarity: "covert",
        basePrice: 1500000,
        maxFloat: 0.55,
        fixedPrice: true
    },

    {
        name: "Candace ripped condom fingers",
        icon: "🧤",
        rarity: "covert",
        basePrice: 3000000,
        maxFloat: 0.55,
        fixedPrice: true
    },

    {
        name: "Candace",
        icon: "👑",
        rarity: "special",
        basePrice: 10000000,
        maxFloat: 0.55,
        fixedPrice: true
    }

];


const CASH_TWO_THOUSAND_ITEMS = [
    ["Cash payout $500", 500, "consumer"],
    ["Cash payout $750", 750, "consumer"],
    ["Cash payout $1,000", 1000, "consumer"],
    ["Cash payout $1,500", 1500, "industrial"],
    ["Cash payout $2,000", 2000, "industrial"],
    ["Cash payout $3,000", 3000, "industrial"],
    ["Cash payout $5,000", 5000, "mil"],
    ["Cash payout $10,000", 10000, "mil"],
    ["Cash payout $25,000", 25000, "restricted"],
    ["Cash payout $50,000", 50000, "classified"],
    ["Cash payout $100,000", 100000, "classified"],
    ["Cash payout $250,000", 250000, "covert"],
    ["Cash payout $500,000", 500000, "covert"],
    ["Cash payout $1,000,000", 1000000, "special"]
].map(
    ([name, amount, rarity]) => ({
        name,
        icon: "💵",
        rarity,
        basePrice: amount,
        maxFloat: 0.80,
        fixedPrice: true
    })
);


const NON_2000_SKINS = [
    ["Glock-18 | Paper Tiger", "🔫", "consumer", 0.50, "budget"],
    ["MP9 | Dust Code", "🔫", "consumer", 0.75, "budget"],
    ["MAC-10 | Sandstorm", "🔫", "consumer", 1, "budget"],
    ["P250 | Copper Vein", "🔫", "consumer", 1.50, "budget"],
    ["Nova | Blue Print", "🔫", "industrial", 2, "budget"],
    ["FAMAS | Field Notes", "🔫", "industrial", 3, "budget"],
    ["Galil AR | Ashen", "🔫", "mil", 4, "budget"],
    ["USP-S | Lowlight", "🔫", "restricted", 8, "budget"],
    ["M4A4 | Budget Night", "🔫", "classified", 9, "budget"],
    ["AK-47 | Lucky Find", "🔫", "covert", 10, "budget"],
    ["★ Knife | Pocket Prize", "🔪", "special", 10, "budget"],

    ["P90 | Circuit Breaker", "🔫", "consumer", 2, "tactical"],
    ["M4A4 | Gridline", "🔫", "consumer", 3, "tactical"],
    ["MP7 | Recon", "🔫", "industrial", 5, "tactical"],
    ["SG 553 | Barricade", "🔫", "industrial", 7, "tactical"],
    ["SSG 08 | Rangefinder", "🔫", "mil", 12, "tactical"],
    ["AK-47 | Frontline", "🔫", "restricted", 20, "tactical"],
    ["M4A1-S | Command", "🔫", "classified", 35, "tactical"],
    ["AWP | Longwatch", "🔫", "covert", 80, "tactical"],

    ["Tec-9 | Voltage", "🔫", "consumer", 4, "neon"],
    ["Five-SeveN | Hologram", "🔫", "industrial", 8, "neon"],
    ["MAC-10 | Afterimage", "🔫", "mil", 15, "neon"],
    ["MP9 | Pulse", "🔫", "mil", 22, "neon"],
    ["USP-S | Prism", "🔫", "restricted", 40, "neon"],
    ["M4A1-S | Laser Grid", "🔫", "classified", 75, "neon"],
    ["AK-47 | Photon", "🔫", "covert", 150, "neon"],
    ["★ Butterfly Knife | Spectrum", "🔪", "special", 300, "neon"],

    ["P2000 | Ivory", "🔫", "consumer", 8, "classic"],
    ["CZ75-Auto | Heritage", "🔫", "industrial", 15, "classic"],
    ["M4A4 | Old Guard", "🔫", "mil", 25, "classic"],
    ["AK-47 | Walnut", "🔫", "mil", 40, "classic"],
    ["USP-S | First Edition", "🔫", "restricted", 70, "classic"],
    ["AWP | Grandmaster", "🔫", "classified", 125, "classic"],
    ["M4A1-S | Heirloom", "🔫", "covert", 250, "classic"],
    ["★ Karambit | Antique", "🔪", "special", 500, "classic"],

    ["UMP-45 | Factory Line", "🔫", "consumer", 15, "industrial"],
    ["PP-Bizon | Riveted", "🔫", "industrial", 30, "industrial"],
    ["AUG | Heavy Metal", "🔫", "mil", 50, "industrial"],
    ["Negev | Foundry", "🔫", "mil", 80, "industrial"],
    ["M4A4 | Steelworks", "🔫", "restricted", 140, "industrial"],
    ["AK-47 | Machine Age", "🔫", "classified", 240, "industrial"],
    ["AWP | Pressure Point", "🔫", "covert", 450, "industrial"],
    ["★ Specialist Gloves | Forged", "🧤", "special", 800, "industrial"],

    ["Glock-18 | Tidepool", "🔫", "consumer", 25, "coastal"],
    ["MP7 | Sea Glass", "🔫", "industrial", 45, "coastal"],
    ["M4A1-S | Undertow", "🔫", "mil", 75, "coastal"],
    ["FAMAS | Deep Current", "🔫", "restricted", 130, "coastal"],
    ["SSG 08 | Leviathan", "🔫", "classified", 225, "coastal"],
    ["AK-47 | Tsunami", "🔫", "covert", 400, "coastal"],
    ["AWP | Abyssal", "🔫", "covert", 650, "coastal"],
    ["★ Butterfly Knife | Bluewater", "🔪", "special", 900, "coastal"],

    ["USP-S | Velvet", "🔫", "consumer", 40, "luxury"],
    ["P250 | Gold Leaf", "🔫", "industrial", 70, "luxury"],
    ["M4A4 | Executive", "🔫", "mil", 120, "luxury"],
    ["AK-47 | Crown", "🔫", "restricted", 200, "luxury"],
    ["AWP | Black Tie", "🔫", "classified", 350, "luxury"],
    ["M4A1-S | Platinum", "🔫", "covert", 600, "luxury"],
    ["AK-47 | Sovereign", "🔫", "covert", 850, "luxury"],
    ["★ Karambit | Gold Dust", "🔪", "special", 1000, "luxury"],
    ["AWP | Royal Vault", "🔫", "covert", 2500, "luxury"],
    ["AK-47 | Millionaire", "🔫", "covert", 5000, "luxury"],
    ["★ Butterfly Knife | Crown Jewel", "🔪", "special", 10000, "luxury"],
    ["AWP | Heavy Industry", "🔫", "covert", 1800, "industrial"],
    ["★ Specialist Gloves | Steelworks", "🧤", "special", 5000, "industrial"],
    ["AK-47 | High Tide", "🔫", "covert", 1800, "coastal"],
    ["★ Karambit | Deep Blue", "🔪", "special", 4000, "coastal"]
].map(
    ([name, icon, rarity, basePrice, theme]) => ({
        name,
        icon,
        rarity,
        basePrice,
        theme,
        maxFloat: 0.80,
        fixedPrice: true
    })
);


const CASH_AMOUNTS = [
    0, 0.50, 1, 2, 3, 5, 7, 10, 15, 20,
    25, 30, 40, 50, 60, 75, 90, 120, 150, 200,
    300, 400, 500, 600, 750, 900, 1200, 1500,
    2000, 3000, 4000, 5000, 7000, 9000, 10000
].map(
    (amount, index) => ({
        name: amount === 0
            ? "Empty cash envelope"
            : `Cash reward $${amount.toLocaleString("en-US")}`,
        icon: "💵",
        rarity: "consumer",
        basePrice: amount,
        maxFloat: 0.80,
        fixedPrice: true,
        itemWeight: amount === 0 ? 0.10 : 1,
        cashIndex: index
    })
);


/* =========================================================
   HELPERS
========================================================= */

function money(value) {

    return "$" +
        Number(value).toLocaleString(
            "en-US",
            {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            }
        );

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


const depositForm =
    document.getElementById(
        "depositForm"
    );


if (depositForm) {

    depositForm.addEventListener(
        "submit",
        event => {

            event.preventDefault();

            const amount =
                Number(
                    document.getElementById(
                        "depositAmount"
                    ).value
                );

            if (
                !Number.isFinite(amount) ||
                amount <= 0
            ) {
                return;
            }

            state.balance += amount;
            saveState();
            depositForm.reset();

        }
    );

}


const withdrawForm =
    document.getElementById(
        "withdrawForm"
    );


if (withdrawForm) {

    withdrawForm.addEventListener(
        "submit",
        event => {

            event.preventDefault();

            const amount =
                Number(
                    document.getElementById(
                        "withdrawAmount"
                    ).value
                );

            if (
                !Number.isFinite(amount) ||
                amount <= 0 ||
                amount > state.balance
            ) {
                window.alert(
                    "You do not have enough balance for this withdrawal."
                );
                return;
            }

            state.balance -= amount;
            saveState();
            withdrawForm.reset();

        }
    );

}


/* =========================================================
   CASE PURCHASES
========================================================= */

function getNormalCaseItems(price, variant, caseType) {

    const caseProfile =
        getCaseProfileForPrice(price);

    const theme =
        getCaseTheme(price, variant);

    const catalogue =
        caseType === "cash"
        ? CASH_AMOUNTS
        : NON_2000_SKINS;


    const themedItems =
        catalogue.filter(
            item =>
                item.theme === theme &&
                item.basePrice <=
                    caseProfile.maxValue * 1.25
        );


    const sourceItems =
        themedItems.length >= 7
        ? themedItems
        : catalogue.filter(
            item =>
                item.basePrice <=
                    caseProfile.maxValue * 1.25
        );

    const sortedItems =
        [...sourceItems].sort(
            (firstItem, secondItem) =>
                firstItem.basePrice -
                secondItem.basePrice
        );

    const rarityKeys =
        Object.keys(RARITIES);

    const itemCount =
        Math.min(
            sortedItems.length,
            8
        );

    const selectedIndexes =
        Array.from(
            { length: itemCount },
            (_, itemIndex) =>
                Math.floor(
                    itemIndex *
                    (sortedItems.length - 1) /
                    (itemCount - 1)
                )
        );


    const selectedItems =
        selectedIndexes.map(
            itemIndex => sortedItems[itemIndex]
        ).sort(
            (firstItem, secondItem) =>
                firstItem.basePrice -
                secondItem.basePrice
        );

    return selectedItems.map(
        (item, itemIndex) => ({
            ...item,
            rarity:
                caseType === "cash"
                ? rarityKeys[
                    Math.min(
                        Math.floor(itemIndex / 2),
                        rarityKeys.length - 1
                    )
                ]
                : rarityKeys[
                    Math.min(
                        itemIndex,
                        rarityKeys.length - 1
                    )
                ]
        })
    );


}


function getCaseTheme(price, variant) {

    const themes = [
        "budget",
        "tactical",
        "neon",
        "classic",
        "industrial",
        "coastal",
        "luxury"
    ];

    const priceLevel =
        price < 10 ? 0 :
        price < 25 ? 1 :
        price < 60 ? 2 :
        price < 100 ? 3 :
        price < 200 ? 4 :
        price < 400 ? 5 :
        6;


    return themes[
        (priceLevel + variant) % themes.length
    ];

}


function getCaseThemeLabel(theme) {

    return {
        budget: "Budget-grade skins",
        tactical: "Military and tactical skins",
        neon: "Bright neon skins",
        classic: "Classic collector skins",
        industrial: "Industrial heavyweight skins",
        coastal: "Ocean and water-themed skins",
        luxury: "Luxury high-value skins"
    }[theme];

}

function getPreviewItems(price, variant, caseType) {

    const isTwoThousandCase =
        price === 2000;


    const itemPool =
        isTwoThousandCase
        ? caseType === "cash"
            ? CASH_TWO_THOUSAND_ITEMS
            : TWO_THOUSAND_CASE_ITEMS
        : getNormalCaseItems(
            price,
            variant,
            caseType
        );


    const highestSkinValue =
        Math.max(
            ...NON_2000_SKINS.map(
                item => item.basePrice
            )
        );


    return itemPool.map(
        item => ({
            ...item,
            previewValue:
                item.basePrice,
            chance:
                getDropChanceForPrice(
                    price,
                    item.rarity,
                    itemPool,
                    item
                )
        })
    );

}


function getCaseProfileForPrice(price) {

    const savedPrice = CASE_DATA.price;
    CASE_DATA.price = price;
    const profile = getCaseProfile();
    CASE_DATA.price = savedPrice;
    return profile;

}


function getDropChanceForPrice(
    price,
    rarityKey,
    itemPool,
    item
) {

    const savedPrice = CASE_DATA.price;
    CASE_DATA.price = price;

    const totalWeight =
        Object.keys(RARITIES).reduce(
            (total, key) =>
                total + getRarityWeight(key),
            0
        );

    const chance =
        getRarityWeight(rarityKey) /
        totalWeight /
        getRarityItemWeight(
            itemPool,
            rarityKey
        ) *
        (item.itemWeight || 1) *
        100;

    CASE_DATA.price = savedPrice;
    return chance.toFixed(2);

}


function getRarityItemWeight(itemPool, rarityKey) {

    return itemPool
        .filter(
            item => item.rarity === rarityKey
        )
        .reduce(
            (total, item) =>
                total + (item.itemWeight || 1),
            0
        );

}


function showCasePreview(price, caseName, variant, caseType) {

    const modal =
        document.createElement("div");

    modal.className = "case-preview-overlay";
    modal.innerHTML = `
        <section class="case-preview" role="dialog" aria-modal="true">
            <button class="case-preview-close" type="button" aria-label="Close">&times;</button>
            <h2>${caseName}</h2>
            <p class="case-preview-price">Case price: ${money(price)}</p>
            <div class="case-preview-list">
                ${getPreviewItems(
                    price,
                    variant,
                    caseType
                ).map(item => `
                    <div class="case-preview-item">
                        <span class="case-preview-icon">${item.icon}</span>
                        <span class="case-preview-name">${item.name}</span>
                        <strong>${money(item.previewValue)}</strong>
                        <span>${item.chance}%</span>
                    </div>
                `).join("")}
            </div>
            <div class="case-preview-actions">
                <button class="case-preview-cancel" type="button">Cancel</button>
                <button class="case-preview-buy" type="button">Buy Case</button>
            </div>
        </section>
    `;

    const closeModal = () => modal.remove();

    modal.addEventListener(
        "click",
        event => {
            if (event.target === modal ||
                event.target.closest(".case-preview-close") ||
                event.target.closest(".case-preview-cancel")) {
                closeModal();
            }
        }
    );

    modal.querySelector(".case-preview-buy").addEventListener(
        "click",
        () => {
            if (state.balance < price) {
                window.alert(
                    "You do not have enough balance for this case."
                );
                return;
            }

            state.balance -= price;
            state.spent += price;
            sessionStorage.setItem(
                "CASE_LAB_CASE_PRICE",
                String(price)
            );
            sessionStorage.setItem(
                "CASE_LAB_CASE_VARIANT",
                String(variant)
            );
            sessionStorage.setItem(
                "CASE_LAB_CASE_TYPE",
                caseType
            );
            saveState();
            window.location.href = "csgo-case.html";
        }
    );

    document.body.appendChild(modal);

}
document.querySelectorAll(
    ".small-box .button, " +
    ".bottom-box .button, " +
    ".smallest-centipede .button"
).forEach(
    (button, buttonIndex) => {

        button.addEventListener(
            "click",
            event => {

                const priceElement =
                    button.closest(
                        ".small-box"
                    )?.querySelector(
                        ".small-box-text"
                    ) ||
                    button.closest(
                        ".bottom-box"
                    )?.querySelector(
                        ".bottom-box-text"
                    ) ||
                    button.closest(
                        ".smallest-centipede"
                    )?.querySelector(
                        ".smallest-centipede-text"
                    );

                const priceText =
                    priceElement?.textContent ||
                    "";

                const price =
                    Number(
                        priceText.replace(
                            /[^0-9.]/g,
                            ""
                        )
                    );

                if (
                    !Number.isFinite(price) ||
                    price <= 0
                ) {
                    event.preventDefault();
                    return;
                }

                const caseName =
                        button.closest(
                            ".small-box, .bottom-box, .smallest-centipede"
                        )?.querySelector(
                            "h3"
                        )?.textContent.trim() ||
                        "Featured Case";

                const caseType =
                    window.location.pathname
                        .toLowerCase()
                        .includes("cash")
                    ? "cash"
                    : "csgo";

                CASE_DATA.type = caseType;

                    event.preventDefault();

                    showCasePreview(
                        price,
                        caseName,
                        buttonIndex,
                        caseType
                    );

            }
        );

    }
);


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

        const weight =
            getRarityWeight(key);


        total += weight;

    }


    let roll =
        Math.random() *
        total;


    for (
        const [key, rarity]
        of Object.entries(RARITIES)
    ) {

        const weight =
            getRarityWeight(key);


        roll -= weight;


        if (roll <= 0) {

            return key;

        }

    }


    return "consumer";

}


function getDropChance(drop) {

    const itemPool =
        CASE_DATA.price === 2000
        ? CASE_DATA.type === "cash"
            ? CASH_TWO_THOUSAND_ITEMS
            : TWO_THOUSAND_CASE_ITEMS
        : SKINS;


    const matchingItems =
        itemPool.filter(
            item =>
                item.rarity === drop.rarity
        );


    let totalWeight = 0;


    for (
        const [key, rarity]
        of Object.entries(RARITIES)
    ) {

        totalWeight +=
            getRarityWeight(key);

    }


    const rarityWeight =
        getRarityWeight(drop.rarity);


    return (
        rarityWeight /
        totalWeight /
        matchingItems.length *
        100
    ).toFixed(2);

}


/* =========================================================
   CREATE ITEM
========================================================= */

function createDrop() {

    const isTwoThousandCase =
        CASE_DATA.price === 2000;


    const itemPool =
        isTwoThousandCase
        ? CASE_DATA.type === "cash"
            ? CASH_TWO_THOUSAND_ITEMS
            : TWO_THOUSAND_CASE_ITEMS
        : getNormalCaseItems(
            CASE_DATA.price,
            CASE_DATA.variant,
            CASE_DATA.type
        );


    const rarity =
        rollRarity();


    let available =
        itemPool.filter(
            skin =>
                skin.rarity === rarity
        );


    if (!available.length) {

        available =
            itemPool.filter(
                skin =>
                    skin.rarity !==
                    "special"
            );

    }


    const availableWeight =
        getRarityItemWeight(
            available,
            rarity
        );

    let itemRoll =
        Math.random() * availableWeight;

    const skin =
        available.find(
            item => {
                itemRoll -=
                    item.itemWeight || 1;
                return itemRoll <= 0;
            }
        ) || available[0];


    const float =
        Math.random() *
        skin.maxFloat;


    const statTrak =
        !isTwoThousandCase &&
        CASE_DATA.type !== "cash" &&
        !skin.fixedPrice &&
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
        skin.fixedPrice
        ? skin.basePrice
        : skin.basePrice *
            wearMultiplier *
            marketVariation;


    if (!isTwoThousandCase) {

        const caseProfile =
            getCaseProfile();

        price =
            Math.min(
                price,
                caseProfile.maxValue
            );

    }


    if (statTrak) {

        price *= 1.25;

    }


    price =
        isTwoThousandCase
        ? Math.max(0.05, price)
        : Math.max(0, price);


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


const casePrice =
    document.getElementById(
        "casePrice"
    );


if (casePrice) {

    casePrice.textContent =
        "Case price: " +
        money(CASE_DATA.price);

}


const backButton =
    document.querySelector(
        ".case-opening-page .back-button"
    );


if (backButton) {

    backButton.href =
        CASE_DATA.type === "cash"
        ? "cash.html"
        : "csgo.html";

}


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

    rollerTrack.style.transition = "none";
    rollerTrack.style.transform = "translateX(0)";
    rollerTrack.offsetWidth;


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


        <div class="result-chance">

            Chance: ${getDropChance(currentDrop)}%

        </div>


        <p>

            <span class="result-price">
                Value:
                ${money(
                currentDrop.price
                )}
            </span>

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
            `${currentDrop.name} added to inventory.`
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

                if (
                    state.balance <
                    CASE_DATA.price
                ) {
                    window.alert(
                        "You do not have enough balance for this case."
                    );
                    return;
                }

                state.balance -=
                    CASE_DATA.price;

                state.spent +=
                    CASE_DATA.price;

                saveState();

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