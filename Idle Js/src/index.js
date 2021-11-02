import "./styles.css";

import createElement from "./createElement";
import createButton from "./createButton";
import createTable from "./createTable";
import deepmerge from "deepmerge";

let state = {
  coins: 0,
  maxOwnedCoin: 0,
  shop: {
    Matic: {
      Name: "Matic",
      img: "https://cryptologos.cc/logos/polygon-matic-logo.png",
      price: 1.7,
      clickGain: 0,
      Gain: 0.001,
      owned: 0,
      maxOwned: 0
    },
    Ethereum: {
      Name: "Ethereum",
      img:
        "https://www.seekpng.com/png/full/193-1936896_bitseven-ethereum-balance-blue-ethereum-logo.png",
      price: 3710,
      clickGain: 0,
      Gain: 2,
      owned: 0,
      maxOwned: 0
    },
    Bitcoin: {
      Name: "Bitcoin",
      img: "src/1.png",
      price: 52375,
      clickGain: 100,
      Gain: 5,
      owned: 0,
      maxOwned: 0
    }
  }
};
const updateState = (newState) => {
  newState.maxOwnedCoin = Math.max(newState.coins, state.maxOwnedCoin);

  state = deepmerge(state, newState);
};

const runCycle = () => {
  updateView();
  updateState({
    coins:
      state.coins +
      Object.values(state.shop).reduce(
        (coins, { owned, Gain }) => coins + owned * Gain,
        0
      )
  });

  setTimeout(() => runCycle(), 100);
};

const updateView = () => {
  title.textContent = `$${state.coins} (max: $${state.maxOwnedCoin})`;

  [...shop.querySelectorAll("tbody tr")].forEach((tr) => {
    const id = tr.querySelector("button").getAttribute("data-id");
    const { owned } = state.shop[id];

    tr.querySelector("td:nth-child(2)").textContent = `x${owned}`;
  });
};

const app = document.querySelector("#app");
app.className = "p-5";
const createElementInApp = createElement(app);
const title = createElementInApp("h1", {
  className: "text-2xl mb-4"
});
const btn = createButton("+$2", {}, app);

btn.addEventListener("click", () => {
  updateState({ coins: state.coins + 2 });
});

const shop = createTable(
  ["Image", "Owned", "Name", "Price", "Action"],
  Object.entries(state.shop).map(([id, { img, owned, Name, price }]) => {
    const cells = [
      createElement()("img", { src: img }),
      `x${owned}`,
      Name,
      `$${price}`
    ];

    const btn = createElement()(
      "button",
      {
        textContent: "BUY",
        className: "bg-blue-600 text-white px-3 py-1.5 block w-full"
      },
      { "data-id": id }
    );

    console.log(id);

    btn.addEventListener("click", () => {
      if (state.coins - price < 0) {
        return;
      }

      updateState({
        coins: state.coins - price,
        shop: {
          [id]: {
            owned: state.shop[id].owned + 1,
            maxOwned: Math.max(
              state.shop[id].maxOwned,
              state.shop[id].owned + 1
            )
          }
        }
      });
    });

    return [...cells, btn];
  })
);

app.appendChild(shop);

runCycle();
