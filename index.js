// app calls import {rclog} from 'rclog'; rclog('http://myserver:8400/console);
export const rclog = (serverUrl) => {
    // if no console, do nothing
    if (window.console && console) {
        console.__serverUrl = serverUrl; // stash serverUrl
        console.__w = window.open(); // open a new window and store handle in console object
        for (let c in console) {  // foreach console property
            if (typeof console[c] === 'function') { // ... that is a function
                console['orig_'+ c] = console[c];    // preserve original function
                console[c] = function () {  // create replacement function
                    console['orig_'+c](c+':',...arguments); // that calls the original
                    console.__w.document.write(c+': '+JSON.stringify([...arguments])+'<br>'); // then writes to the child window
                    !!console.__serverUrl && fetch(console.__serverUrl ,{     // then posts to a logging server
                        method: 'POST',
                        headers: {
                          'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({cm:c, args:[...arguments]})
                    }).catch(()=>{console.__serverUrl = undefined; return});  // if post fails, do nothing to prevent a recursive log loop
                }
            }
        }
    }
}

