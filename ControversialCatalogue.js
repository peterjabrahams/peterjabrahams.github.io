$( document ).ready( function() {
    /* This below code is to view what local storage objects exist for debugging purposes only*/
    for ( var i = 0; i < localStorage.length; i++ ) {
        console.log( localStorage.key( i ) )
    };


    // Declare Global variables//
    // variable to hold invoice detail of sales in local storage //
    let salesInv = [];

    // define the contructor for local storage and setup new local storage for sales //
    function sales( product, description, price, size, colour,
        quantity ) {
        this.product = product;
        this.description = description;
        this.price = price;
        this.size = size;
        this.colour = colour;
        this.quantity = quantity;
    };

    localStorage.setItem( "sales", JSON.stringify( salesInv ) );

    // Variable to check if item is valid //
    validItem = false;

    // variable to accumulate items in cart //
    let totItems = 0;
    // variable to accumulate total price //
    let totalPrice = 0;
    // varaible for product code//
    let prod;
    //variable for product description //
    let desc;

    // variables to hold and determine size selected //
    let size;
    let s1;
    let s2;
    let s3;
    let s4;

    // variables for price
    let pcr;
    let price;

    // varaible to hold colour
    let colour;

    // varaible to hold quantity
    let qty;

    //End Global variables //

    // Get the details of the product selected for purchase 
    // Product 1 //
    $( "#btn1" ).mousedown( function() {
        // get the product, description and price from DOM //
        prod = document.getElementById( "prod1" ).innerHTML;
        desc = document.getElementById( "desc1" ).innerHTML;
        prc = document.getElementById( "prc1" ).innerHTML;

        //setup of price
        price = prc;
        // Function to strip currency and Convert price to number
        stripCurrency( price );

        // Get the size selected from radio button//
        s1 = document.getElementById( "p1b1" ).checked;
        s2 = document.getElementById( "p1b2" ).checked;
        s3 = document.getElementById( "p1b3" ).checked;
        s4 = document.getElementById( "p1b4" ).checked;
        //function to determine selected size //
        getSize( s1, s2, s3, s4 );

        // get the colour selected //
        colour = document.getElementById( "col1" ).value;
        // validate colour //
        valCol( colour, validItem );
        if ( validItem == false ) {
            return;
        }

        //get the quantity selected //
        qty = document.getElementById( "qty1" ).value;
        //convert quantity to number //
        convQty( qty );

        // Validate the quantity //
        valQty( quantity, validItem );
        if ( validItem == false ) {
            return;
        }

        //add sale quantity and setup display of quantity to the in cart //
        totalItems( quantity );
        document.getElementById( "totqty" ).innerHTML =
            "In Cart = " + totItems;

        // Accumulate the total price of goods in cart //
        sumCartItems( quantity, newprice );

        //Load the product into local storage array - sales //
        loadSales( prod, desc, newprice, size, colour,
            quantity );
    } );
    //End Product 1 //

    // Product 2 //
    $( "#btn2" ).mousedown( function() {
        // get the product, description and price from DOM //
        prod = document.getElementById( "prod2" ).innerHTML;
        desc = document.getElementById( "desc2" ).innerHTML;
        prc = document.getElementById( "prc2" ).innerHTML;

        // setup to hold price
        price = prc;
        // Function to strip currency and Convert price to number
        stripCurrency( price );

        // Get the size selected //
        s1 = document.getElementById( "p2b1" ).checked;
        s2 = document.getElementById( "p2b2" ).checked;
        s3 = document.getElementById( "p2b3" ).checked;
        s4 = document.getElementById( "p2b4" ).checked;
        getSize( s1, s2, s3, s4 );

        // get the colour selected //
        colour = document.getElementById( "col2" ).value;
        // validate the colour //
        valCol( colour, validItem );
        if ( validItem == false ) {
            return;
        }

        //get the quantity selected //
        qty = document.getElementById( "qty2" ).value;
        convQty( qty );

        // Validate the quantity //
        valQty( quantity, validItem );
        if ( validItem == false ) {
            return;
        }

        //add sale quantitity and setup display of quantity to in cart //
        totalItems( quantity );
        document.getElementById( "totqty" ).innerHTML =
            "In Cart = " + totItems;

        // Accumulate the total price of goods in cart //
        sumCartItems( quantity, newprice );

        //Load the product into local storage array - sales //
        loadSales( prod, desc, newprice, size, colour,
            qty );

    } );
    // End Product 2//

    // Product 3 //
    $( "#btn3" ).mousedown( function() {
        // get the product, description and price from DOM //
        prod = document.getElementById( "prod3" ).innerHTML;
        desc = document.getElementById( "desc3" ).innerHTML;
        prc = document.getElementById( "prc3" ).innerHTML;

        // setup to hold price
        price = prc;
        // Function to strip currency and Convert price to number
        stripCurrency( price );

        // Get the size selected //
        s1 = document.getElementById( "p3b1" ).checked;
        s2 = document.getElementById( "p3b2" ).checked;
        s3 = document.getElementById( "p3b3" ).checked;
        s4 = document.getElementById( "p3b4" ).checked;
        getSize( s1, s2, s3, s4 );

        // get the colour selected //
        colour = document.getElementById( "col3" ).value;
        // validate colour //
        valCol( colour, validItem );
        if ( validItem == false ) {
            return;
        }

        //get the quantity selected //
        qty = document.getElementById( "qty3" ).value;
        convQty( qty );

        // Validate the quantity //
        valQty( quantity, validItem );
        if ( validItem == false ) {
            return;
        }

        //add sale quantitity and setup display of quantity to in cart //
        totalItems( quantity );
        document.getElementById( "totqty" ).innerHTML =
            "In Cart = " + totItems;

        // Accumulate the total price of goods in cart //
        sumCartItems( quantity, newprice );

        //Load the product into local storage array - sales //
        loadSales( prod, desc, newprice, size, colour,
            qty );

    } );
    // End Product 3//

    // Product 4 //
    $( "#btn4" ).mousedown( function() {
        // get the product, description and price from DOM //
        prod = document.getElementById( "prod4" ).innerHTML;
        desc = document.getElementById( "desc4" ).innerHTML;
        prc = document.getElementById( "prc4" ).innerHTML;

        // setup to hold prce2
        price = prc;
        // Function to strip currency and Convert price to number
        stripCurrency( price );

        // Get the size selected //
        s1 = document.getElementById( "p4b1" ).checked;
        s2 = document.getElementById( "p4b2" ).checked;
        s3 = document.getElementById( "p4b3" ).checked;
        s4 = document.getElementById( "p4b4" ).checked;
        getSize( s1, s2, s3, s4 );

        // get the colour selected //
        colour = document.getElementById( "col4" ).value;
        // validate the colour //
        valCol( colour, validItem );
        if ( validItem == false ) {
            return;
        }

        //get the quantity selected //
        qty = document.getElementById( "qty4" ).value;
        convQty( qty );

        // Validate the quantity //
        valQty( quantity, validItem );
        if ( validItem == false ) {
            return;
        }

        //add sale quantitity and setup display of quantity to in cart //
        totalItems( quantity );
        document.getElementById( "totqty" ).innerHTML =
            "In Cart = " + totItems;

        // Accumulate the total price of goods in cart //
        sumCartItems( quantity, newprice );

        //Load the product into local storage array - sales //
        loadSales( prod, desc, newprice, size, colour,
            qty );

    } );
    // End Product 4//

    // Product 5 //
    $( "#btn5" ).mousedown( function() {
        // get the product, description and price from DOM //
        prod = document.getElementById( "prod5" ).innerHTML;
        desc = document.getElementById( "desc5" ).innerHTML;
        prc = document.getElementById( "prc5" ).innerHTML;

        // setup to hold prce2
        price = prc;
        // Function to strip currency and Convert price to number
        stripCurrency( price );

        // Get the size selected //
        s1 = document.getElementById( "p5b1" ).checked;
        s2 = document.getElementById( "p5b2" ).checked;
        s3 = document.getElementById( "p5b3" ).checked;
        s4 = document.getElementById( "p5b4" ).checked;
        getSize( s1, s2, s3, s4 );

        // get the colour selected //
        colour = document.getElementById( "col5" ).value;
        // validate the colour //
        valCol( colour, validItem );
        if ( validItem == false ) {
            return;
        }

        //get the quantity selected //
        qty = document.getElementById( "qty5" ).value;
        convQty( qty );

        // Validate the quantity //
        valQty( quantity, validItem );
        if ( validItem == false ) {
            return;
        }

        //add sale quantitity and setup display of quantity to in cart //
        totalItems( quantity );
        document.getElementById( "totqty" ).innerHTML =
            "In Cart = " + totItems;

        // Accumulate the total price of goods in cart //
        sumCartItems( quantity, newprice );

        //Load the product into local storage array - sales //
        loadSales( prod, desc, newprice, size, colour,
            qty );

    } );
    // End Product 5//

    // Get the size selected//
    function getSize( s1, s2, s3, s4 ) {
        if ( s1 == true ) {
            size = "Small";
        }
        if ( s2 == true ) {
            size = "Medium";
        }
        if ( s3 == true ) {
            size = "Large";
        }
        if ( s4 == true ) {
            size = "X Large";
        }
        return size;
    }

    //Strip Currency from price and convert price to number//
    function stripCurrency( price ) {
        price = price.replace( 'R', '' );
        newprice = Number( price );
        return newprice;
    };

    // Convert qty to number //
    function convQty( qty ) {
        quantity = Number( qty );
        return quantity;
    }
    // Validate Colour //
    function valCol( colour ) {
        if ( colour == "Select Colour" ) {
            alert( "Please select a valid colour" );
            validItem = false
            return false;
        };
        validItem = true;
    };

    //Validate the quantity //
    function valQty( quantity ) {
        if ( quantity == 0 || quantity > 100 ) {
            alert( "Please select a valid quantity = " +
                quantity );
            validItem = false;
            return false;
        };
        validItem = true;
    };

    // Sum items in cart //
    function totalItems( quantity ) {
        totItems = ( totItems + quantity );
    };

    // Sum total price in cart and display alert//
    function sumCartItems( quantity, newprice ) {
        totalPrice += ( quantity * newprice );
        let alert1 = "Total items in cart  = " + totItems +
            "\n" + "Total value of cart Ex Vat = R" +
            totalPrice.toFixed( 2 );
        alert( alert1 );
        return totalPrice;
    };

    // load sale item to local storage //
    function loadSales( prod, desc, newprice, size, colour,
        quantity ) {
        salesInv = JSON.parse( localStorage.getItem( "sales" ) );
        let newSales = new sales(
            prod,
            desc,
            newprice,
            size,
            colour,
            quantity );
        salesInv.push( newSales );
        localStorage.setItem( "sales", JSON.stringify( salesInv ) );

    }

    // Close the current window and return to home page //
    $( "#closeWin" ).mousedown( function() {
        window.close();
    } );

    // Open the Sales invoice window only if there are invoice lines or display alert.//
    $( "#openWin" ).mousedown( function() {
        if ( salesInv.length == 0 ) {
            alert( "You have no items in your cart" );
        } else {
            window.close();
            window.open( "ControversialSales.html" );
        }
    } );
} );