// Reference to the creative's various properties and elements.
var app = {};

// called when window loaded
function preInit() {
    setupDom();
    if (Enabler.isInitialized()) {
        init();
    } else {
        Enabler.addEventListener(
            studio.events.StudioEvent.INIT,
            init
        );
    }
}

// set up dom
function setupDom() {
    app.dom = {};
    app.dom.adContainer = document.getElementById("ad-container");
    app.dom.drinkAware = document.getElementById("drinkaware");
    app.dom.nectarPricesContainer = document.getElementById("nectarprices-container");
    app.dom.nectarPriceCost = document.getElementById("nectar-price-cost")
    app.dom.normalPriceCost = document.getElementById("normal-price-cost")
}

// enabler now initialised, run function to add listeners
function init() {
    addListeners();
    setDynamicContent()
    if (Enabler.isVisible()) {
        show();
    }
    else {
        Enabler.addEventListener(studio.events.StudioEvent.VISIBLE, show);
    }
}

// add event listeners
function addListeners() {
    app.dom.adContainer.addEventListener('click', exitHandler);
}

function setDynamicContent() {

    var regex = /[?&]([^=#]+)=([^&#]*)/g,
        url = window.location.href,
        params = {},
        match;
    while (match = regex.exec(url)) {
        params[match[1]] = match[2];
    }

    var isAlcohol = params.isAlcohol
    var variant = params.variant
    var productCategory = null
    var productSKU = "3096260"

    var nectarPriceRaw = "£0.90"
    var normalPriceRaw = "£1.80"

    var nectarPrice = formatCurrency(nectarPriceRaw)
    var normalPrice = formatCurrency(normalPriceRaw)



    var path = "assets/"
    var variantImages = ["main-text1", "main-text2", "image1", "image2", "image3", "image4", "image5", "image6", "product"]

    var createVariantImages = document.createElement("img")

    var imageAssets = []

    for (var i = 0; i < variantImages.length; i++) {

        var createVariantImages = document.createElement("img")

        if (variantImages[i] === "product") {
            createVariantImages.setAttribute("id", "product")
            createVariantImages.setAttribute("src", path + "product-" + productSKU + ".png")
            createVariantImages.setAttribute("srcset", path + "product-" + productSKU + ".png 1x")
        } else {
            createVariantImages.setAttribute("src", path + variant + "-" + variantImages[i] + ".png")
            createVariantImages.setAttribute("srcset", path + variant + "-" + variantImages[i] + ".png 1x, " + path + variant + "-" + variantImages[i] + "@2x" + ".png 2x");
            createVariantImages.setAttribute("class", variant)
            createVariantImages.setAttribute("id", variantImages[i])
        }

        imageAssets.push(createVariantImages)
    }

    for (var i = 0; i < imageAssets.length; i++) {
        app.dom.adContainer.appendChild(imageAssets[i])
    }

    if (variant === "shaved") {
        var image1 = document.querySelector("#image1")
        image1.style.display = "none"
    }

    // if (productCategory === "Beers & Spirits" || productCategory === "Wines" || isAlcohol) {
    if (isAlcohol === "yes") {
        app.dom.drinkAware.classList.add("is-visible")
        app.dom.nectarPricesContainer.classList.add("is-alcohol")
    }


    app.dom.nectarPriceCost.innerHTML = nectarPrice
    app.dom.normalPriceCost.innerHTML = normalPrice

}

var formatCurrency = function (cost) {
    var amount = parseFloat(cost.replace("£", "")).toFixed(2).split(".")
    var formattedPrice

    if (amount[0].length >= 1 && amount[0] === "0") {
        formattedPrice = amount[1] + "p"
    } else if (amount[0].length >= 1 && amount[0] !== "0") {
        if (amount[1] === "00") {
            formattedPrice = "£" + amount[0]
        } else {
            formattedPrice = "£" + amount[0] + "." + amount[1]
        }
    }
    return formattedPrice
}

// show ad
function show() {
    app.dom.adContainer.style.display = "block";
    setTimeout(function () {
        textShrink(app.dom.nectarPriceCost);
        textShrink(app.dom.normalPriceCost);
    }, 100)
}

// handles the exit
function exitHandler() {
    Enabler.exit('BackgroundExit', clickTag);
}

function autoTextShrink() {
    var toShrink = document.getElementsByClassName('shrink');
    for (var el = 0; el < toShrink.length; el++) {
        textShrink(toShrink[el])
        console.log("shrinking", toShrink[el])
    }
}

function textShrink(el, min) {
    if (!min) { min = 0; }
    while (el.isOverflown()) {
        var fontSize = el.getFontSize();
        if (fontSize > min) {
            fontSize -= 0.1;
            el.setFontSize(fontSize);
        } else {
            el.setFontSize(min)
            break;
        }
    }
}

HTMLElement.prototype.isOverflown = function () {
    return (this.scrollHeight > this.offsetHeight || this.scrollWidth > this.offsetWidth);
}

HTMLElement.prototype.setFontSize = function (size) {
    this.style.fontSize = parseFloat(size) + "px";
}

HTMLElement.prototype.getFontSize = function () {
    if (window.getComputedStyle) {
        return parseFloat(getComputedStyle(this).getPropertyValue("font-size"));
    }
    //IE
    else if (this.currentStyle) {
        try {
            return parseFloat(this.currentStyle["font-size"]);
        } catch (e) {
            console.error(e);
        }
    }
    return 0;
}

// load preInit on page load
window.addEventListener('load', preInit);