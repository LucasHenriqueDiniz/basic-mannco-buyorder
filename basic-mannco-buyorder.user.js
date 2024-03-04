// ==UserScript==
// @name         Mannco.Store - Item 1cent buy order
// @namespace    https://github.com/LucasHenriqueDiniz
// @version      0.1
// @description  hi
// @author       Lucas Diniz
// @license      MIT
// @match        *://mannco.store/item/*
// @match        *://mannco.store/*/item/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=mannco.store
// @grant        GM_setClipboard
// ==/UserScript==

(function () {
    "use strict";
    const container = document.querySelector(".nologinbo");
    const quantityBox = document.querySelector("#cashout-amount");
    const itemPriceBox = document.querySelector("#cashout-priceach");
    const confirmButton = document.querySelector(
        "div.nologinbo > div.d-grid.gap-2.d-md-flex > button"
    );

    var quantidade = 50;
    var availableMoney;
    var highestBuyOrder;

    availableMoney = parseFloat(
        document
        .querySelector("#account-dropdown > div > span.account-balance.ecurrency")
        .textContent.replace(/[^\d.,-]/g, "")
        .trim()
    );

    try {
        highestBuyOrder = parseFloat(
            document
            .querySelector("table > tbody > tr:nth-child(2) > td:nth-child(1)")
            .textContent.replace(/[^\d.,-]/g, "")
            .trim()
        );
    } catch (err) {
        highestBuyOrder = 0.01;
    }

    const valorASerPago = (highestBuyOrder + 0.01).toFixed(2)

    if (valorASerPago * quantidade > availableMoney) {
        quantidade = Math.floor(availableMoney / valorASerPago);
    }


    function plusOneCent() {
        setTimeout(() => {
            quantityBox.value = quantidade;
        }, 50);

        setTimeout(() => {
            itemPriceBox.value = valorASerPago;
        }, 50);

        if (quantidade > 0) {
            setTimeout(() => {
                confirmButton.click();
            }, 50);
        }
    }

    const button = document.createElement("button");
    button.className = "btn btn-primary w-100 justify-content-center mt-1";
    button.textContent = "1+ Cent Buy Order";
    button.style.backgroundColor = "#ffc107";
    button.style.borderColor = "white";
    button.style.color = "#3a3a3a";
    button.addEventListener("click", () => {
        plusOneCent();
    });

    container.appendChild(button);

    var itemNameText = document.querySelector(
        "#content > div.row > div.col-lg-8 > div > div > div.item-info__aside > h2 > span"
    );
    const copyButton = document.createElement("button");
    copyButton.className = "text-xs font-xs";
    copyButton.textContent = "Copy Item Name";
    copyButton.addEventListener("click", () => {
        navigator.clipboard.writeText(itemNameText.textContent);
        //GM_setClipboard(itemNameText.textContent);
    });

    document
        .querySelector(
        "#content > div.row > div.col-lg-8 > div > div > div.item-info__aside"
    )
        .appendChild(copyButton);
})();
