const butInstall = document.getElementById('buttonInstall');

// Logic for installing the PWA
//Added an event handler to the `beforeinstallprompt` event
window.addEventListener('beforeinstallprompt', (event) => {
    event.preventDefault();
    window.deferredPrompt = event; 
    // remove hidden class from install container
    butInstall.classList.toggle('hidden', false)


});

butInstall.addEventListener('click', async () => {
    console.log('butInstall-clicked');
    const promptEvent = window.deferredPrompt;
    if (!promptEvent) {
      return;
    }
    promptEvent.prompt();

    window.deferredPrompt = null;
    
    butInstall.classList.toggle('hidden', true);
  });


// Added an handler for the `appinstalled` event
window.addEventListener('appinstalled', (event) => {
    console.log('appinstalled', event);
    window.deferredPrompt = null;
  });
