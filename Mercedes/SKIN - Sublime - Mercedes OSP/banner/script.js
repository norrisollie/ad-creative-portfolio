window.addEventListener("load", function () {
    var db = document.getElementById("panel-back-iframe").contentDocument,
        dt = document.getElementById("panel-top-iframe").contentDocument,
        dl = document.getElementById("panel-left-iframe").contentDocument,
        dr = document.getElementById("panel-right-iframe").contentDocument;

    var clickoutTop = dt.getElementById("body_top"),
        clickoutLeft = dl.getElementById("body_left"),
        clickoutRight = dr.getElementById("body_right");

    clickoutTop.addEventListener("click", clickoutHandler);
    clickoutLeft.addEventListener("click", clickoutHandler);
    clickoutRight.addEventListener("click", clickoutHandler);

    var clickTag = "http://www.adylic.com";

    function clickoutHandler(e) {
        var target = e.target.parentNode.id;
        console.log("Panel Clicked:", target);
        window.open(clickTag);
    }

    window.addEventListener("scroll", scrollHandler);

    function scrollHandler() {
        var bl = dl.querySelector(".box.left");
        var br = dr.querySelector(".box.right");
        if (window.scrollY >= 250) {
            br.style.opacity = 1;
            bl.style.opacity = 1;
        } else {
            br.style.opacity = 0;
            bl.style.opacity = 0;
        }
    }

    function detectBrowser(callback) {

        console.log("detectBrowser")

        var isIE = /*@cc_on!@*/false || !!document.documentMode;

        if (isIE) {
            var carContainer = db.getElementById("car-container")
            carContainer.style.top = "21px"
        }

        callback()

    }

    function randomNumber(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function randomDecimal(min, max, decimalPlaces) {
        var rand = Math.random() * (max - min) + min;
        var power = Math.pow(10, decimalPlaces);
        return Math.floor(rand * power) / power;
    }

    function initCars() {
        var numberOfRows = 33;
        var carsInRow = 32;
        var rowCount = 1;
        var carCount = 1;

        var startDelay = 0;

        var carContainer = db.getElementById("car-container");

        for (var i = 0; i < numberOfRows; i++) {
            var row = document.createElement("div");
            row.setAttribute("class", "row");
            row.setAttribute("id", "row-" + rowCount);

            carContainer.appendChild(row);
            for (var k = 0; k < carCount; k++) {
                if (carCount <= carsInRow) {
                    var car = document.createElement("div");
                    car.setAttribute("class", "car");
                    car.setAttribute("id", "car-" + carCount);

                    if (carCount <= 8 || carCount >= 25 || rowCount >= 28) {
                        car.className += " c" + randomNumber(1, 197)
                        car.style.animationDelay = startDelay + "s";
                    } else {
                        car.style.animation = "none"
                    }

                    row.appendChild(car);

                    var innerCar = document.createElement("div");

                    innerCar.setAttribute("class", "inner-car");
                    innerCar.setAttribute("id", "inner-car-" + carCount);
                    innerCar.classList.add("c" + randomNumber(1, 197))

                    car.appendChild(innerCar);

                    car.addEventListener("animationstart", function (e) {
                        e.target.childNodes[0].style.opacity = 1;
                    });

                    carCount++;
                    startDelay += 0.1;
                } else if (carCount > carsInRow) {
                    carCount = 1;
                    startDelay = rowCount / 10;
                }
            }
            rowCount++;
        }

        var cars = db.querySelectorAll(".car");

        var lastCar = cars.length - 1;

        cars[lastCar].addEventListener("animationend", function (e) {
            if (e.animationName === "car-animation") {
                for (var l = 0; l < cars.length; l++) {
                    cars[l].classList.add("hide-car");
                    cars[l].style.animationDelay = randomDecimal(0, 2, 2) + "s";
                }
            }
        });

        cars[0].addEventListener("animationstart", function (e) {
            if (e.animationName === "fade-out") {
                var phoneContainer = dt.getElementById("phone-container")
                var carLeft = dl.querySelector(".car-sides.left")
                var carRight = dr.querySelector(".car-sides.right")

                phoneContainer.classList.add("phone-container-animation")

                phoneContainer.addEventListener("animationend", function () {
                    var phoneScroll = dt.getElementById("phone-scroll")
                    phoneScroll.classList.add("scroll-animation")

                    setTimeout(function () {
                        var carLeft = dl.querySelector(".car-sides.left"),
                            carRight = dr.querySelector(".car-sides.right")

                        carLeft.style.opacity = 1
                        carRight.style.opacity = 1
                    }, 1000)

                    phoneScroll.addEventListener("animationstart", function () {
                        var star = dt.getElementById("star")

                        // stars[0].style.opacity = 1
                        // setTimeout(function () { stars[1].style.opacity = 1 }, 2250)
                        setTimeout(function () { star.style.opacity = 1 }, 4750)
                    })
                })

                // carLeft.classList.add("car-sides-animation")
                // carRight.classList.add("car-sides-animation")

                // phoneContainer.classList.add("phone-animation")

                phoneContainer.addEventListener("animationend", function () {

                })

            }

        })
        setTimeout(function () {


            for (var i = 0; i < cars.length; i++) {
                cars[i].style.opacity = "1";
                cars[i].classList.add("car-animation")
            }
        }, 1500)
    }

    detectBrowser(initCars)
});


// window.addEventListener("load", function () {
//     var db = document.getElementById("panel-back-iframe").contentDocument,
//         dt = document.getElementById("panel-top-iframe").contentDocument,
//         dl = document.getElementById("panel-left-iframe").contentDocument,
//         dr = document.getElementById("panel-right-iframe").contentDocument;

//     var clickoutTop = dt.getElementById("body_top"),
//         clickoutLeft = dl.getElementById("body_left"),
//         clickoutRight = dr.getElementById("body_right");

//     clickoutTop.addEventListener("click", clickoutHandler);
//     clickoutLeft.addEventListener("click", clickoutHandler);
//     clickoutRight.addEventListener("click", clickoutHandler);

//     var clickTag = "http://www.adylic.com";

//     function clickoutHandler(e) {
//         var target = e.target.parentNode.id;
//         console.log("Panel Clicked:", target);
//         window.open(clickTag);
//     }

//     window.addEventListener("scroll", scrollHandler);

//     function scrollHandler() {
//         var bl = dl.querySelector(".box.left");
//         var br = dr.querySelector(".box.right");
//         if (window.scrollY >= 250) {
//             br.style.opacity = 1;
//             bl.style.opacity = 1;
//         } else {
//             br.style.opacity = 0;
//             bl.style.opacity = 0;
//         }
//     }

//     function randomNumber(min, max) {
//         return Math.floor(Math.random() * (max - min + 1)) + min;
//     }

//     function randomDecimal(min, max, decimalPlaces) {
//         var rand = Math.random() * (max - min) + min;
//         var power = Math.pow(10, decimalPlaces);
//         return Math.floor(rand * power) / power;
//     }

//     var carsSrcs = [".car-1.jpg", ".car-2.jpg", ".car-3.jpg", ".car-4.jpg", ".car-5.jpg", ".car-6.jpg", ".car-7.jpg", ".car-8.jpg", ".car-9.jpg", ".car-10.jpg", ".car-11.jpg", ".car-12.jpg", ".car-13.jpg", ".car-14.jpg", ".car-15.jpg", ".car-16.jpg", ".car-17.jpg", ".car-18.jpg", ".car-19.jpg", ".car-20.jpg", ".car-21.jpg", ".car-22.jpg", ".car-23.jpg", ".car-24.jpg", ".car-25.jpg", ".car-26.jpg", ".car-27.jpg", ".car-28.jpg", ".car-29.jpg", ".car-30.jpg", ".car-31.jpg", ".car-32.jpg", ".car-33.jpg", ".car-34.jpg", ".car-35.jpg", ".car-36.jpg", ".car-37.jpg", ".car-38.jpg", ".car-39.jpg", ".car-40.jpg", ".car-41.jpg", ".car-42.jpg", ".car-43.jpg", ".car-44.jpg", ".car-45.jpg", ".car-46.jpg", ".car-47.jpg", ".car-48.jpg", ".car-49.jpg", ".car-50.jpg", ".car-51.jpg", ".car-52.jpg", ".car-53.jpg", ".car-54.jpg", ".car-55.jpg", ".car-56.jpg", ".car-57.jpg", ".car-58.jpg", ".car-59.jpg", ".car-60.jpg", ".car-61.jpg", ".car-62.jpg", ".car-63.jpg", ".car-64.jpg", ".car-65.jpg", ".car-66.jpg", ".car-67.jpg", ".car-68.jpg", ".car-69.jpg", ".car-70.jpg", ".car-71.jpg", ".car-72.jpg", ".car-73.jpg", ".car-74.jpg", ".car-75.jpg", ".car-76.jpg", ".car-77.jpg", ".car-78.jpg", ".car-79.jpg", ".car-80.jpg", ".car-81.jpg", ".car-82.jpg", ".car-83.jpg", ".car-84.jpg", ".car-85.jpg", ".car-86.jpg", ".car-87.jpg", ".car-88.jpg", ".car-89.jpg", ".car-90.jpg", ".car-91.jpg", ".car-92.jpg", ".car-93.jpg", ".car-94.jpg", ".car-95.jpg", ".car-96.jpg", ".car-97.jpg", ".car-98.jpg", ".car-99.jpg", ".car-100.jpg", ".car-101.jpg", ".car-102.jpg", ".car-103.jpg", ".car-104.jpg", ".car-105.jpg", ".car-106.jpg", ".car-107.jpg", ".car-108.jpg", ".car-109.jpg", ".car-110.jpg", ".car-111.jpg", ".car-112.jpg", ".car-113.jpg", ".car-114.jpg", ".car-115.jpg", ".car-116.jpg", ".car-117.jpg", ".car-118.jpg", ".car-119.jpg", ".car-120.jpg", ".car-121.jpg", ".car-122.jpg", ".car-123.jpg", ".car-124.jpg", ".car-125.jpg", ".car-126.jpg", ".car-127.jpg", ".car-128.jpg", ".car-129.jpg", ".car-130.jpg", ".car-131.jpg", ".car-132.jpg", ".car-133.jpg", ".car-134.jpg", ".car-135.jpg", ".car-136.jpg", ".car-137.jpg", ".car-138.jpg", ".car-139.jpg", ".car-140.jpg", ".car-141.jpg", ".car-142.jpg", ".car-143.jpg", ".car-144.jpg", ".car-145.jpg", ".car-146.jpg", ".car-147.jpg", ".car-148.jpg", ".car-149.jpg", ".car-150.jpg", ".car-151.jpg", ".car-152.jpg", ".car-153.jpg", ".car-154.jpg", ".car-155.jpg", ".car-156.jpg", ".car-157.jpg", ".car-158.jpg", ".car-159.jpg", ".car-160.jpg", ".car-161.jpg", ".car-162.jpg", ".car-163.jpg", ".car-164.jpg", ".car-165.jpg", ".car-166.jpg", ".car-167.jpg", ".car-168.jpg", ".car-169.jpg", ".car-170.jpg", ".car-171.jpg", ".car-172.jpg", ".car-173.jpg", ".car-174.jpg", ".car-175.jpg", ".car-176.jpg", ".car-177.jpg", ".car-178.jpg", ".car-179.jpg", ".car-180.jpg", ".car-181.jpg", ".car-182.jpg", ".car-183.jpg", ".car-184.jpg", ".car-185.jpg", ".car-186.jpg", ".car-187.jpg", ".car-188.jpg", ".car-189.jpg", ".car-190.jpg", ".car-191.jpg", ".car-192.jpg", ".car-193.jpg", ".car-194.jpg", ".car-195.jpg", ".car-196.jpg", ".car-197.jpg"]

//     // var carImages = []

//     // function generateImages(imageSources, imageElements, callback) {

//     //     var imagesRemaining = imageSources.length

//     //     for (var i = 0; i < imageSources.length; i++) {

//     //         var image = new Image()
//     //         image.src = "assets/" + imageSources[i]
//     //         image.onload = function () {

//     //             --imagesRemaining
//     //             if (imagesRemaining <= 0) {
//     //                 callback()
//     //             }
//     //         }
//     //     }
//     // }

//     function initCars() {

//         var numberOfRows = 33;
//         var carsInRow = 32;
//         var rowCount = 1;
//         var carCount = 1;
//         var totalCars = 0

//         var startDelay = 0;

//         var carContainer = db.getElementById("car-container");

//         for (var i = 0; i < numberOfRows; i++) {
//             var row = document.createElement("div");
//             row.setAttribute("class", "row");
//             row.setAttribute("id", "row-" + rowCount);

//             carContainer.appendChild(row);
//             for (var k = 0; k < carCount; k++) {
//                 if (carCount <= carsInRow) {
//                     var car = document.createElement("div");
//                     car.setAttribute("class", "car");
//                     car.setAttribute("id", "car-" + carCount);

//                     car.style.animationDelay = startDelay + "s";

                    // if (carCount <= 8 || carCount >= 25 || rowCount >= 28) {
                    //     car.style.backgroundImage =
                    //         "url(assets/car-" + randomNumber(1, 197) + ".jpg)";
                    //     car.style.animationDelay = startDelay + "s";
                    // } else {
                    //     car.style.animation = "none"
                    // }

//                     row.appendChild(car);

//                     var innerCar = document.createElement("div");

//                     innerCar.setAttribute("class", "inner-car");
//                     innerCar.setAttribute("id", "inner-car-" + carCount);
//                     innerCar.style.backgroundImage =
//                         "url(assets/car-" + randomNumber(1, 197) + ".jpg)";

//                     car.appendChild(innerCar);

//                     car.addEventListener("animationstart", function (e) {
//                         e.target.childNodes[0].style.opacity = 1;
//                     });

//                     carCount++;
//                     totalCars++
//                     startDelay += 0.1;
//                 } else if (carCount > carsInRow) {
//                     carCount = 1;
//                     startDelay = rowCount / 10;
//                 }

//                 console.log(totalCars)

//                 if (totalCars >= 33 * 32) {
//                     startAnimation()
//                 }
//             }
//             rowCount++;

//         }
//     }

//     function startAnimation() {
//         var cars = db.querySelectorAll(".car");
//         var carContainer = db.getElementById("car-container");


//         setTimeout(function () {
//             carContainer.style.opacity = 1
//         }, 1500)



//         var cars = db.querySelectorAll(".car");


//         for (var i = 0; i < cars.length; i++) {
//             cars[i].classList.add("car-animation")
//         }



//         var lastCar = cars.length - 1;

//         cars[lastCar].addEventListener("animationend", function (e) {
//             if (e.animationName === "car-animation") {
//                 for (var l = 0; l < cars.length; l++) {
//                     cars[l].classList.add("hide-car");
//                     cars[l].style.animationDelay = randomDecimal(0, 2, 2) + "s";
//                 }
//             }
//         });

//         cars[0].addEventListener("animationstart", function (e) {
//             if (e.animationName === "fade-out") {
//                 var phone = dt.getElementById("phone")
//                 var carLeft = dl.querySelector(".car-sides.left")
//                 var carRight = dr.querySelector(".car-sides.right")

//                 carLeft.classList.add("car-sides-animation")
//                 carRight.classList.add("car-sides-animation")

//                 phone.classList.add("phone-animation")

//                 phone.addEventListener("animationend", function () {
//                     var sheen = dt.getElementById("sheen")

//                     sheen.classList.add("sheen-animation")
//                 })

//             }

//         })
//     }


//     initCars()

//     // generateImages(carsSrcs, carImages, initCars)

//     // function initCars() {
//     //     console.log(carImages)

//     // }

// });
