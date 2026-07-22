function Terminal() {
    const cmdLine_ = document.querySelector( "#input-line .cmdline" );
    const outputContainer = document.querySelector( "#container output" );

    if ( !cmdLine_ || !outputContainer ) {
        console.error( "No se encontraron los contenedores de la terminal en el DOM." );
        return;
    }

    addCmdLineListeners();

    function addCmdLineListeners() {
        cmdLine_.addEventListener( "keydown", processNewCommand_ );
    }

    function printText( html ) {
        outputContainer.insertAdjacentHTML( "beforeend", `<div>${html}</div>` );
        window.scrollTo( 0, document.body.scrollHeight );
    }

    function processNewCommand_( e ) {
        if ( e.keyCode === 13 ) {
            e.preventDefault();

            const text = this.value;

            if ( !text.trim() ) {
                printText( "&gt;" );
            } else {
                const safeText = text.replace( /</g, "&lt;" ).replace( />/g, "&gt;" );
                printText( `&gt; ${safeText}` );
            }

            this.value = "";
        }
    }

    document.addEventListener( "click", () => cmdLine_.focus() );

    return {
        addCmdLineListeners
    };
}

$( () => {
    window.term = new Terminal();

    const cmdLine = document.querySelector( "#input-line .cmdline" );
    if (cmdLine) cmdLine.focus();
} );