# A?alto Web+

A?alto Web+ provides better user experience for web services (Noppa/Oodi) provided by Aalto University. The modifications to these services are made using so called user scripts that are supported by Firefox and Chrome. User scripts are scripts that make on-the-fly changes to specific web pages on the client side (in this case in the browser), typically to change their appearance or to add or modify functionality. 

Current version includes:

  - automatic logins for Noppa/Oodi (using the in-browser mechanism for storing passwords)
  - search box at the right navigation of Noppa
  - direct redirect to course in Noppa if there's only one search result

As this is a fast weekend hack I've included only the absolute minimum improvements, but expect to see more in the future :)

Got a cool idea? Submit a feature request at https://github.com/anttihirvonen/aaltowebplus/issues.

# Installation

I try to keep latest working version on the master branch, so you don't have to worry about accidentally installing a broken version.

## Firefox

You need the Greasemonkey plugin, because Firefox doesn't support user scripts directly.

1. install [Greasemonkey](https://addons.mozilla.org/fi/firefox/addon/greasemonkey/) if you don't already have it
2. restart browser, otherwise Greasemonkey won't become active
3. navigate to [script](https://github.com/anttihirvonen/aaltowebplus/raw/master/script/aaltowebplus.user.js)
4. installation window should pop up
5. navigate to [Noppa](https://noppa.aalto.fi/noppa/app) - if you are redirected to login page, everything works

## Chrome

Chrome supports user scripts directly, so there's not much to do. 

1. navigate to [script](https://github.com/anttihirvonen/aaltowebplus/raw/master/script/aaltowebplus.user.js)
2. Chrome should inform you about new extension at the bottom of the screen
3. press "Continue" to install
4. navigate to [Noppa](https://noppa.aalto.fi/noppa/app) - if you are redirected to login page, everything works
                                                         
# Upgrading

Remove the old version (instructions below) and follow the installation instructions to upgrade. Since user scripts don't save any data on the hard drive, it's safe to remove old version and install new without any side effects.

# Removing

## Firefox

Click the arrow next to monkey at the upper-right corner of the browser, select "Manage User Scripts..." and press "Remove" on A?alto Web+.

## Chrome

Navigate to chrome://extensions/ and press "Remove" on A?alto Web+.

