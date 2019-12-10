$( document ).ready( function() {

    /* This below code is to view what locaol storage objects exist for debugging purposes
     only */
    console.log( 'Start' );
    for ( var x = 0; x < localStorage.length; x++ ) {
        console.log( localStorage.key( x ) )
    };

    // variable to check if login or registered is valid//
    let validlog = 'false';

    // create variable to hold login details for building local storage login/reg details//
    let logdet = [];

    // This function disables the enter key on input  //
    function disableEnterKey( e ) {
        //create a variable to store the key value that was pressed//      
        var entkey;
        // store the key number //
        if ( window.event ) {
            entkey = e.which;
        }
        //if (the enter key) key value 13 is pressed
        if ( entkey == 13 ) {
            //do nothing 
            return false;
        } else {
            //continue as normal.// 
            return true;
        }

    }

    // define the contructor for local storage for email and password //
    function logindet( email, password ) {
        this.email = email;
        this.password = password;
    };

    //Show Alert if dropdown menu option 2 is selected as there is no active catalogue as yet //
    $( "#csAlert1" ).mouseenter( function() {
        alert( "Menu option not Active as yet!" );
    } );

    // on click of registration or login set focus to enter email //
    $( "#myLogin" ).mousedown( function() {
        getLogindetail();
        // get current login details
        let curEmail = document.getElementById(
            "inputEmail" ).value;
        let curPword = document.getElementById(
            "inputPassword" ).value;
        if ( logdet == null && curEmail == "" &&
            curPword == "" ) {
            alert( "Please register to continue" );
            return false;
        }
        myLogin();

    } );

    // User  has already registerd so get details and populate email and password//
    function getLogindetail() {
        // Setup the local storage in logdet array into email and password//
        logdet = JSON.parse( localStorage.getItem( "logindet" ) );

        // setup the local storage email and password we only store one// 

        if ( logdet !== null ) {
            logdet.forEach( function( i ) {
                document.getElementById( "inputEmail" )
                    .value = i.email;
                document.getElementById(
                    "inputPassword" ).value = i.password;
                document.getElementById( "checkBox" ).checked =
                    true;
            } );
        }
    }

    // If login details exist inform user he has been prviously registerd//
    $( "#myReg" ).mousedown( function() {
        getLogindetail();
        if ( logdet !== null ) {
            alert(
                "You are already Registerd as a user."
            )
            return false;
        }
        myLogin();
    } );

    //set the focus to email input and change styling//
    function myLogin() {
        document.getElementById( "inputEmail" ).focus();
        document.getElementById( "inputEmail" ).style.borderColor =
            "green";
        document.getElementById( "inputEmail" ).style.borderStyle =
            "solid";
    }

    // on submit validate the email and password //
    $( "#mySubmit" ).mousedown( function() {
        validateInput();
        if ( validlog == 'true' ) {
            alert( "Login succesfull" );
        }

        $( "*" ).slideUp( 1000 ).slideDown( 1000 );

    } );

    // validate the email and password entered//
    function validateInput() {

        let name = document.getElementById( "inputEmail" ).value;
        let password = document.getElementById( "inputPassword" )
            .value;

        if ( name == null || name == "" ) {
            alert(
                "Email connot be blank. Please enter a valid Email"
            );
            return false;
        } else if ( password.length < 6 ) {
            alert(
                "Password must be at least 6 characters long."
            );
            return false;
        }

        // log the registration to local storage details and flag firstetimeuser as 'true'
        // check if remember me is on then store registration details.
        // firsttimeuser is used is used to allow first time users to claim a discount.
        // note the ideal way as they could claim on every purchase in browser storage is cleared
        // should idealy be stored in DB.
        let x = document.getElementById( "checkBox" ).checked;
        if ( logdet == null && x == true ) {
            //ensure there is only one login id //
            localStorage.removeItem( 'logindet' );
            // clear the array before adding 
            logdet = [];

            // add the input to local storage //
            localStorage.setItem( "logindet", JSON.stringify(
                logdet ) );

            logdet = JSON.parse( localStorage.getItem(
                "logindet" ) );
            let newlogdet = new logindet(
                name,
                password );

            logdet.push( newlogdet );
            localStorage.setItem( "logindet", JSON.stringify(
                logdet ) );

            localStorage.setItem( "firsttimeuser", true );
        }

        // disable the buttons on successfull login or registration
        document.getElementById( "myLogin" ).disabled = true;
        document.getElementById( "myReg" ).disabled = true;
        document.getElementById( "mySubmit" ).disabled = true;
        document.getElementById( "checkBox" ).disabled = true;
        document.getElementById( "inputEmail" ).disabled = true;
        document.getElementById( "inputPassword" ).disabled =
            true;
        document.getElementById( "inputEmail" ).style.borderColor =
            "lightgrey";
        document.getElementById( "inputEmail" ).style.borderStyle =
            "solid";
        validlog = 'true';
    }


    /* Chech if user has logged in or registerd before allowing user to continue
    	User can access contact details only */
    $( "#myAbout" ).mousedown( function() {
        myLogReg( validlog );
    } );

    $( "#myCatalogue" ).mousedown( function() {
        myLogReg( validlog );
    } );

    $( "#myCustomers" ).mousedown( function() {
        myLogReg( validlog );
    } );

    $( "#myTestimonial" ).mousedown( function() {
        myLogReg( validlog );
    } );

    // Show Alert if user has not registered or logged in //
    function myLogReg() {
        if ( validlog != 'true' ) {
            alert( "Please Register or Login to continue." );
            return false;
        }
    }

} );