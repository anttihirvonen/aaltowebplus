// ==UserScript==
// @name                A?alto Web+
// @namespace	        tag:antti.hirvonen@gmail.com,2011-09-16:aaltowebplus
// @description	        Makes Aalto IT services more usable.
// @include		https://noppa.aalto.fi/*
// @include     https://idp.aalto.fi/idp/Authn/Kerberos
// @include     https://weblogin.tkk.fi/app/login
// @include     https://cardan.aalto.fi/iam/*
// @include     https://oodi.aalto.fi/a/alkusivu.jsp*
// @exclude     https://noppa.aalto.fi/Shibboleth.sso/
// @exclude     https://noppa.aalto.fi/noppa/assets/static/dojo-0.4.3/iframe_history.html
// ==/UserScript==

// A?alto Web+
// by Antti Hirvonen (antti.hirvonen@gmail.com)
// 
// Github: https://github.com/anttihirvonen/aaltowebplus
//
// This script makes Aalto's IT-services more usable by providing automated logins
// for Noppa and Oodi. It also fixes some shortcomings in Noppa. See the Github page
// for more information.
//
// Please submit your feature requests/bug reports/etc. via Github or e-mail!

function doNoppaSearch() {
    var inputValue = document.getElementById("fastsearch-input").value;
    inputValue = inputValue.replace(/ /g, "_");
    inputValue = escape(inputValue);
    window.location.href = "https://noppa.aalto.fi/noppa/haku/" + inputValue;
    return false;
}

function handleInputKeypress(event) {
    if(event.keyCode == 13) {
        doNoppaSearch();
        return false;
    }
}

function addFacebookComments() {
    var ccframe = document.getElementById("courseContentFrame");
    if(ccframe) {
        var fb = document.createElement('div');
        (function(d, s, id) {
                          var js, fjs = d.getElementsByTagName(s)[0];
                          if (d.getElementById(id)) {return;}
                          js = d.createElement(s); js.id = id;
                          js.src = "//connect.facebook.net/en_US/all.js#xfbml=1";
                          fjs.parentNode.insertBefore(js, fjs);
        }(document, "script", "facebook-jssdk"));
        
        var courseRe = /kurssi\/(.*?)(\/|$|\?)/;
        var courseArray = courseRe.exec(window.location.href);
        
        var courseUrl = "https://noppa.aalto.fi/noppa/kurssi/" + courseArray[1];
        
        fb.innerHTML = '<div id="fb-root"></div>\
                        <h3>A?alto Web+ -comments for course ' + courseArray[1] + '</h3>\
                        <div class="fb-comments" data-href="'
                        + courseUrl +
                        '" data-num-posts="2" data-width="500"></div>';
    
        ccframe.appendChild(fb);
    }
}

function addFastSearch() {
    // Add course search bar to right side navi
    var searchContainer = document.createElement('div');
    searchContainer.innerHTML = '<div class="title">A?alto Web+</div>\
                                <div>\
                                    <input id="fastsearch-input" type="text" class="textInput" />\
                                    <input id="fastsearch-submit" type="submit" class="inputButton" value="Hae" />\n\
                                </div>'
    searchContainer.className = "box";
    
    var cont = document.getElementById("additionalNaviContainer");
    if(cont.firstChild) cont.insertBefore(searchContainer, cont.firstChild);
    else cont.appendChild(searchContainer);
    
    document.getElementById("fastsearch-submit").addEventListener("click", doNoppaSearch, true)
    document.getElementById("fastsearch-input").addEventListener("keypress", handleInputKeypress, true);
}

function makeNoppaMoreUsable() {
    addFacebookComments();
    addFastSearch();
    
    // Search results: if only one result, directly redirect
    if(/^https:\/\/noppa\.aalto\.fi\/noppa\/haku/.test(location.href)) {
        if(document.getElementById("crsTableView") && !document.getElementById("informal_2")) {
            var onlyCourse = document.getElementById("informal_1");
            // redirect to course
            window.location.href = onlyCourse.getElementsByTagName('a')[0].href;
        }
    }
}

function autoLoginForm(userfieldName, helpTextContainer)
{
    // Sets autocomplete to value "on" for any element
    var allowAutoComplete = function(element) {
        var iAttrCount = element.attributes.length;
        for (var i = 0; i < iAttrCount; i++) {
            var oAttr = element.attributes[i];
            if (oAttr.name == 'autocomplete') {
                oAttr.value = 'on';
                break;
            }
        }
    }
    
    // Call allow autocomplete on form and it's elements
    var form = document.getElementsByTagName('form')[0];
    allowAutoComplete(form);
    for (var j = 0; j < form.elements.length; j++)
    {
        allowAutoComplete(form.elements[j]);
    }
    
    // Submits login form after browser has filled in password
    var submitLogin = function() {
        var username = document.getElementsByName(userfieldName)[0].value;
        // Submit only, if username has been given
        if(username)
            document.forms[0].submit();
    };
    
    window.addEventListener("load", function() { 
        // Use a setTimeout so browser's password manager has a chance to fill in the password
        setTimeout(submitLogin, 0); 
      }, false);
      
    // Show help
    var helptext = document.createElement('h3');
    helptext.innerHTML = 'A?alto Web+ suggests, that you save your login credentials \
                          into your browser. Your browser will then autocomplete these \
                          values for you, making the login process completely automatic.<br />\
                          <span style="color:red;">DO NOT SAVE YOUR CREDENTIALS ON A PUBLIC COMPUTER.</span>';
    helpTextContainer.appendChild(helptext);
}

// NOPPA SECTION
if(/^https:\/\/noppa\.aalto\.fi/.test(location.href)) {
    // If no element with loginName id is found, we are not logged in - redirect
    loginNameElement = document.getElementById("loginName")
    if(loginNameElement)
        // We are in Noppa!
        makeNoppaMoreUsable();
    else
        window.location.href = "https://noppa.aalto.fi:443/Shibboleth.sso/AALTOLogin?target=https://noppa.aalto.fi/noppa/shibboleth_login"
}

// OODI
if(/https:\/\/oodi\.aalto\.fi\/a\/alkusivu.jsp/.test(location.href)) {
    if(document.getElementsByClassName("aalto-login-student").length && window.top) {
        window.top.location.href = "https://oodi.aalto.fi/a/oodishibboleth_student.jsp";
    }   
}

// OODI(?) LOGIN SELECTOR
if(/^https:\/\/cardan\.aalto\.fi\/iam\/WAYF/.test(location.href)) {
    var select = document.getElementsByName("user_idp")[0];
    select.selectedIndex = 4;
    document.forms[0].submit();
}

// AALTO LOGIN SECTION
if(/^https:\/\/idp.aalto.fi\/idp\/Authn\/Kerberos/.test(location.href)) {
    autoLoginForm("j_username", document.getElementById("infotext"));
}

// OLD TKK WEBLOGIN
if(/^https:\/\/weblogin.tkk.fi\/app\/login/.test(location.href)) {
    autoLoginForm("user", document.getElementById("content").getElementsByTagName("div")[0]);
}