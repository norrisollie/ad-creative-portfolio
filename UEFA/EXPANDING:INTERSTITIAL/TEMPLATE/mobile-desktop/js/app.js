var app = {};

function onLoadHandler() {
    if (Enabler.isInitialized()) {
        enablerInitHandler();
    } else {
        Enabler.addEventListener(studio.events.StudioEvent.INIT, enablerInitHandler);
    }
}

function enablerInitHandler() {
    if (Enabler.isPageLoaded()) {
        pageLoadedHandler();
    } else {
        Enabler.addEventListener(studio.events.StudioEvent.PAGE_LOADED, pageLoadedHandler);
    }
}

function setupDOM() {

    // by default the creative is always collapsed
    app.isExpanded = false;
    // if creative has a video, set to true
    app.containsVideo = false;

    app.dom = {};

    // add dom elements here
    // eg - app.dom.elementName = document.getElementById("example")

    // do not remove
    app.dom.container = document.getElementById("container");
    app.dom.collapsedContainer = document.getElementById("collapsed-container");
    app.dom.collapsedContent = document.getElementById("collapsed-content");
    app.dom.collapsedBackground = document.getElementById("collapsed-bg");
    app.dom.collapsedExpandedBackground = document.getElementById("collapsed-expanded-bg");
    app.dom.expandedContainer = document.getElementById("expanded-container");
    app.dom.expandedContent = document.getElementById("expanded-content");
    app.dom.closeButton = document.getElementById("close-button");
    app.dom.fullscreenExit = document.getElementById("exit");

    // if creative contains a video then these elements will accessible
    if (app.containsVideo) {
        app.dom.videoWrapper = document.getElementById("video-wrapper");
        app.dom.video = document.getElementById("video");
    }
}

//Function to run with any animations starting on load, or bringing in images etc
function pageLoadedHandler() {
    setupDOM();
    addListeners();
    collapseSize();

    // if app.containsVideo is set to true, it will add the video and video tracking
    if (app.containsVideo) {
        addVideoTracking();
    }

    // once the page is fully load, unhide the container to prevent people from clicking ad before it has all loaded
    app.dom.container.style.display = "block";
}

//Add Event Listeners
function addListeners() {
    app.dom.container.addEventListener("click", adStateHandler);
    app.dom.closeButton.addEventListener("click", adStateHandler);
    app.dom.collapsedContent.addEventListener("click", adStateHandler);
    app.dom.fullscreenExit.addEventListener("click", fullscreenExitHandler);

    // do not remove
    Enabler.addEventListener(studio.events.StudioEvent.FULLSCREEN_DIMENSIONS, function () {
        Enabler.requestFullscreenExpand();
    }, false);
    Enabler.addEventListener(studio.events.StudioEvent.FULLSCREEN_EXPAND_START, function () {
        Enabler.finishFullscreenExpand();
    }, false);
    Enabler.addEventListener(studio.events.StudioEvent.FULLSCREEN_EXPAND_FINISH, function () {
    }, false);
    Enabler.addEventListener(studio.events.StudioEvent.FULLSCREEN_COLLAPSE_START, function () {
        Enabler.finishFullscreenCollapse();
    }, false);
    Enabler.addEventListener(studio.events.StudioEvent.FULLSCREEN_COLLAPSE_FINISH, function () {
        collapseSize();
    }, false);
}

// keeps the double click iframe at the bottom, without this it sticks to the top of the window
window.addEventListener('resize', function (e) {
    topResizeHandler()
});

// when button to open or close ad is clicked in expanded section
function adStateHandler(e) {

    var target = e.currentTarget;

    // if currently collapsed
    if (!app.isExpanded && target.dataset.state === "collapsed") {

        app.isExpanded = true;

        app.dom.container.classList.add("expanded")
        app.dom.closeButton.dataset.state = "expanded";
        app.dom.collapsedContent.dataset.state = "expanded";
        app.dom.expandedContainer.style.transform = "none";

        if (app.containsVideo) {
            app.dom.video.play();
        }

        // do not remove
        expandSize();
        Enabler.requestFullscreenExpand();
        Enabler.counter("Fullscreen_Count")
        Enabler.startTimer("Fullscreen_Duration")

        // if currently expanded
    } else if (app.isExpanded && target.dataset.state === "expanded" || target.dataset.action === "exit") {

        app.isExpanded = false;

        app.dom.container.classList.remove("expanded")
        app.dom.closeButton.dataset.state = "collapsed";
        app.dom.collapsedContent.dataset.state = "collapsed";

        app.dom.expandedContainer.style.transform = "translateX(100%)";

        if (app.containsVideo) {
            app.dom.video.pause();
        }

        // must be called after the transition is finished
        setTimeout(function () {
            collapseSize();
            // do not remove
            Enabler.requestFullscreenCollapse();
            Enabler.reportManualClose();
            Enabler.stopTimer("Fullscreen_Duration");
        }, 500);

    }
}

fullscreenExitHandler = function (e) {
    adStateHandler(e);

    // do not remove
    Enabler.exit('HTML5_Background_Clickthrough', 'http://www.uefa.com/');
}

function addVideoTracking() {

    // create source elements
    var srcNode = document.createElement("source");

    // set the type of video and src url
    srcNode.setAttribute('type', 'video/mp4');
    srcNode.setAttribute('src', Enabler.getUrl('assets/video.mp4'));

    // append to video tag
    app.dom.video.appendChild(srcNode);

    Enabler.loadModule(studio.module.ModuleId.VIDEO, function () {
        studio.video.Reporter.attach('Video Report: ', app.dom.video);
    }.bind(this));
}

// do not touch,
// the code below resizes the doubleclick iframe depending on the state
function topResizeHandler() {

    if (Enabler.getParameter('varName')) {

        var command = 'var adDiv = document.getElementById("' + Enabler.getParameter("varName") + '.if");';

        command += 'var Grampa = adDiv.parentNode.parentNode;';
        command += 'Grampa.style.position = "fixed";';
        command += 'Grampa.style.top = "auto";';
        command += 'Grampa.style.bottom = "0px";';
        command += 'Grampa.style.left = "0px";';
        command += 'Grampa.style.width = "100%";';
        command += 'Grampa.style.zIndex = "9999999999";';

        // Name DIVs for easy debug
        command += 'adDiv.dataset.name = "adDiv";';
        command += 'Parent.dataset.name = "Parent";';
        command += 'Grampa.dataset.name = "Grampa";';

        // invoked after a delay to counteract DoubleClick window resize
        setTimeout(function () {
            Enabler.invokeExternalJsFunction(command);
        }, 10);
    }
}

function collapseSize() {

    if (Enabler.getParameter('varName')) {
        var command = 'var adDiv = document.getElementById("' + Enabler.getParameter("varName") + '.if");';

        command += 'adDiv.style.width = "100%";';
        command += 'adDiv.style.height = "90px";';
        command += 'adDiv.style.bottom = "0px";';
        command += 'adDiv.style.position = "absolute";';
        command += 'adDiv.style.left = "0px";';

        command += 'var Parent = adDiv.parentNode;';
        command += 'Parent.style.position = "absolute";';
        command += 'Parent.style.overflow = "hidden";';
        command += 'Parent.style.bottom = "0px";';
        command += 'Parent.style.width = "100%";';
        command += 'Parent.style.height = "90px";';

        command += 'var Grampa = adDiv.parentNode.parentNode;';
        command += 'Grampa.style.position = "fixed";';
        command += 'Grampa.style.top = "auto";';
        command += 'Grampa.style.bottom = "0px";';
        command += 'Grampa.style.width = "100%";';
        command += 'Grampa.style.height = "90px";';
        command += 'Grampa.style.zIndex = "9999999999";';

        // Name DIVs for easy debug
        command += 'adDiv.dataset.name = "adDiv";';
        command += 'Parent.dataset.name = "Parent";';
        command += 'Grampa.dataset.name = "Grampa";';

        Enabler.invokeExternalJsFunction(command);
    }
}

function expandSize() {

    if (Enabler.getParameter('varName')) {
        var command = 'var adDiv = document.getElementById("' + Enabler.getParameter("varName") + '.if");';
        command += 'adDiv.style.width = "100%";';
        command += 'adDiv.style.height = "100%";';
        command += 'adDiv.style.top = "0px";';

        command += 'var Parent = document.getElementById("' + Enabler.getParameter("varName") + '.if").parentNode;';
        command += 'Parent.style.height = "100%";';
        command += 'Parent.style.top = "0px";';

        command += 'var Grampa = document.getElementById("' + Enabler.getParameter("varName") + '.if").parentNode.parentNode;';
        command += 'Grampa.style.top = "0px";';
        command += 'Grampa.style.height = "100%";';
        command += 'Grampa.style.zIndex = "9999999999";';

        // Name DIVs for easy debug
        command += 'adDiv.dataset.name = "adDiv";';
        command += 'Parent.dataset.name = "Parent";';
        command += 'Grampa.dataset.name = "Grampa";';

        Enabler.invokeExternalJsFunction(command);
    }
}

window.addEventListener('load', onLoadHandler);