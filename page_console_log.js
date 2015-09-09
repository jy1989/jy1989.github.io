/* ===========================================================
 * page_console_log.js
 * ===========================================================
 * https://github.com/jy1989/page-console-log
 * ========================================================== */
;
(function () {


    var iDiv = document.createElement('div');
    iDiv.id = 'page-console-log';
    //iDiv.style.border = '3px solid #aaa';
    //iDiv.style.padding = '10px';
    //iDiv.style.margin = '5px';
    iDiv.style.height = '300px';
    //iDiv.style.width = '100%';
    iDiv.style.overflowY = 'scroll';
    iDiv.style.background = '#000';
    iDiv.style.color = '#fff';
    var html = document.getElementsByTagName('html')[0];
    html.insertBefore(iDiv, html.childNodes[0]);

    console.log = combineArguments(console.log, 'log');
    console.debug = combineArguments(console.debug, 'debug');
    console.info = combineArguments(console.info, 'info');
    console.warn = combineArguments(console.warn, 'warn');
    console.error = combineArguments(console.error, 'error');


    function combineArguments(old, type) {
        return function () {
            var combinedArray = [old, type].concat(Array.prototype.slice.call(arguments));
            hijackConsole.apply(this, combinedArray);
        };
    }

    function hijackConsole() {
        var oldMethod = arguments[0];
        var consoleType = arguments[1];
        var color = '#f0f0f0';
        if (consoleType == 'debug') {
            color = '#ADD8E6';
        } else if (consoleType == 'info') {
            color = 'green';
        } else if (consoleType == 'warn') {
            color = 'yellow';
        } else if (consoleType == 'error') {
            color = 'red';
        }
        var args = '';
        for (var i = 2; i < arguments.length; i++) {
            var r = '';
            try {
                r = JSON.stringify(arguments[i]);
            } catch (ex) {
                r = ex;
            }
            args += '<div style="padding-left:10px;margin:5px;">' + r + (i != arguments.length - 1 ? "," : "") + '</div>';
        }


        var p = '<div style="color:' + color + ';">console.' + consoleType + ':</div>';
        iDiv.innerHTML = '<div style="color:' + color + ';border-bottom:1px solid #aaa;padding:8px;">' + p + args + '' + '</div>' + iDiv.innerHTML;

        var args = Array.prototype.slice.call(arguments);
        args.shift();
        args.shift();

        oldMethod.apply(console, args);
    }


})();