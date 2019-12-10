// javascript for ControversialSales.html //

/* This below code is to view what local storage objects exist for debugging purposes only */
for ( var x = 0; x < localStorage.length; x++ ) {
    console.log( localStorage.key( x ) )
};

// create a variable array for the sales table heading for display of, and captured Sales //
let invHead = new Array();
invHead = [ 'Product', 'Description', 'Size', 'Colour', 'Unit Price',
    'Quantity', 'Ext Cost'
];

// Variables for calculation of total cost, vat and number of items in cart and discount//
// discount active indicator, discount popup window, deliver charges indicator and delivery flag//

let discAmt = 0;
let vatVal = 0;
let totalCost = 0;
let inCart = 0;
let delCost = 0;
let activatedisc = false;
let popup = false;
let delCharge = 0;
let delFlag = false;

//Variables to store modal popup of product images and modal header
let modalheader = '';
let modalPic = '';

//variable for generated order number//
let ordNum = 0;

//delivery options flags//
let coldel = false;
let deldel = false;
let expdel = false;
let normdel = false;

// variable to hold the current sales from local storage 
let cursales = [];

// define the constructor for the local storage sales data
function sales( product, description, size, colour, price, quantity ) {
    this.product = product;
    this.description = description;
    this.size = size;
    this.colour = colour;
    this.price = price;
    this.quantity = quantity;
};

// A check if first time discount has been previously applied//
if ( localStorage.getItem( "firsttimeuser" ) == true ) {
    popup = false;
}

// onload load the sales data created in the catalogue page from local storage //
function loadSales() {
    // create the sales table to display the current items selected for purchase //
    let salesTable = document.createElement( 'table' );
    salesTable.setAttribute( 'id', 'salesTable' );
    salesTable.style = "background: white; margin-left: 80px;"
    let tr = salesTable.insertRow( -1 );

    //Create the table header and populate with details with invHead array //
    for ( let h = 0; h < invHead.length; h++ ) {
        // create the table header //
        let th = document.createElement( 'th' );
        th.style =
            "padding: 5px 10px 5px 10px; border: 1px solid; text-align: center"
        th.innerHTML = invHead[ h ];
        tr.appendChild( th );
    }

    let div = document.getElementById( 'salesList' );
    // add the table to the web page //
    div.appendChild( salesTable );
    // function to load the local storage sales //
    loadTabledata();

    //Create a table for the final order totals
    // will be populated when finalising the order
    // Holds: no of items, discount, Vat, delivery cost and order total
    let invTable = document.createElement( 'table' );
    invTable.setAttribute( 'id', 'invTable' );
    invTable.style =
        "background: white; margin-left: 25%; margin-right: 25% border: 1px;"
    tr = invTable.insertRow( -1 );

    th = document.createElement( 'th' );
    th.style = "text-align: right";
    th.innerHTML = 'Order Details';
    tr.appendChild( th );

    div = document.getElementById( 'invlist' );
    // add the table to the web page //
    div.appendChild( invTable );

    //insert row 0
    let table1 = document.getElementById( 'invTable' );

    let row0 = table1.insertRow( 1 );
    // create the table cells //
    let cellr0c0 = row0.insertCell( 0 );
    cellr0c0.innerHTML = "Number of Items";
    let cellr0c1 = row0.insertCell( 1 );
    cellr0c1.setAttribute( 'id', 'invnoitems' );
    cellr0c1.style = "text-align: right;";
    cellr0c1.innerHTML = inCart;

    let row1 = table1.insertRow( 2 );
    let cellr1c0 = row1.insertCell( 0 );
    cellr1c0.innerHTML = "Discount";
    let cellr1c1 = row1.insertCell( 1 );
    cellr1c1.setAttribute( 'id', 'invdiscount' );
    cellr1c1.style = "text-align: right;";
    cellr1c1.innerHTML = "R" + discAmt.toFixed( 2 );

    let row2 = table1.insertRow( 3 );
    let cellr2c0 = row2.insertCell( 0 );
    cellr2c0.innerHTML = "Vat ";
    let cellr2c1 = row2.insertCell( 1 );
    cellr2c1.setAttribute( 'id', 'invvat' );
    cellr2c1.style = "text-align: right;";
    cellr2c1.innerHTML = "R" + vatVal.toFixed( 2 );

    let row3 = table1.insertRow( 4 );
    let cellr3c0 = row3.insertCell( 0 );
    cellr3c0.innerHTML = "Delivery Cost ";
    let cellr3c1 = row3.insertCell( 1 );
    cellr3c1.setAttribute( 'id', 'invdelivery' );
    cellr3c1.style = "text-align: right;";
    cellr3c1.innerHTML = "R" + delCharge.toFixed( 2 );

    let row4 = table1.insertRow( 5 );
    let cellr4c0 = row4.insertCell( 0 );
    cellr4c0.innerHTML = "Total Cost ";
    let cellr4c1 = row4.insertCell( 1 );
    cellr4c1.setAttribute( 'id', 'invtotal' );
    cellr4c1.style = "text-align: right;";
    cellr4c1.innerHTML = "R" + totalCost.toFixed( 2 );

}

// load the local storage sales data into the salesTable for display//
function loadTabledata() {
    let table = document.getElementById( "salesTable" );

    // Setup the local storage in sales array //
    cursales = JSON.parse( localStorage.getItem( "sales" ) );

    // variable i is used for the column index //
    let i = 0;
    // loop thru the sales array and build the sales table //
    cursales.forEach( function( t ) {
        // insert the table rows start at 1 to allow for the header//
        let row = table.insertRow( i + 1 );
        // create the table cells //
        let cell0 = row.insertCell( 0 );
        cell0.setAttribute( 'id', 'product' + ( i ) );

        let cell1 = row.insertCell( 1 );
        cell1.setAttribute( 'id', 'description' + ( i ) );

        let cell2 = row.insertCell( 2 );
        cell2.setAttribute( 'id', 'size' + ( i ) );
        cell2.style = "text-align: center";

        let cell3 = row.insertCell( 3 );
        cell3.setAttribute( 'id', 'colour' + ( i ) );
        cell3.style = "text-align: center";

        let cell4 = row.insertCell( 4 );
        cell4.setAttribute( 'id', 'price' + ( i ) );
        cell4.style = "text-align: right";

        let cell5 = row.insertCell( 5 );
        cell5.setAttribute( 'id', 'Quantity' + ( i ) );
        cell5.style = "text-align: center";

        let cell6 = row.insertCell( 6 );
        cell6.setAttribute( 'id', 'ExtPrice' + ( i ) );
        cell6.style = "text-align: right";

        let cell7 = row.insertCell( 7 );
        cell7.setAttribute( 'id', 'edit' + ( i ) );

        let cell8 = row.insertCell( 8 );
        cell8.setAttribute( 'id', 'save' + ( i ) );

        let cell9 = row.insertCell( 9 );
        cell9.setAttribute( 'id', 'remove' + ( i ) );

        //Create a Remove button to remove items from the sales table //*/
        let edSale = document.createElement( "INPUT" );
        edSale.className = "addBtn";
        edSale.setAttribute( 'type', 'button' );
        edSale.setAttribute( 'value', 'Edit' );
        edSale.setAttribute( 'id', 'editSale' );
        edSale.setAttribute( 'onclick', 'editSale(this)' );

        //Create a save button to save items edited from the sales table //
        let savSale = document.createElement( "INPUT" );
        savSale.className = "addBtn";
        savSale.setAttribute( 'type', 'button' );
        savSale.setAttribute( 'value', 'Save' );
        savSale.setAttribute( 'id', 'savSale' );
        savSale.setAttribute( 'onclick', 'saveSale(this)' );

        //Create a Remove button to remove items from the sales table //
        let remSale = document.createElement( "INPUT" );
        remSale.className = "addBtn";
        remSale.setAttribute( 'type', 'button' );
        remSale.setAttribute( 'value', 'Remove' );
        remSale.setAttribute( 'id', 'remSale' );
        remSale.setAttribute( 'onclick', 'removeSale(this)' );

        // insert the local storage sales data into the sales table // 
        cell0.innerHTML = t.product;
        cell1.innerHTML = t.description;
        cell2.innerHTML = t.size;
        cell3.innerHTML = t.colour;
        // convert the unit price to number //
        let cprice = Number( t.price );
        // display the currency symbols with the unit price fixed to two decimals//
        cell4.innerHTML = "R" + cprice.toFixed( 2 );
        cell5.innerHTML = t.quantity;

        //convert quantity to number
        let qty = Number( t.quantity );
        // Calculate the extended price //
        let extprice = ( qty * t.price );
        cell6.innerHTML = "R" + extprice.toFixed( 2 );

        // Append the button to the sales table //
        cell7.appendChild( edSale );
        cell8.appendChild( savSale );
        cell9.appendChild( remSale );

        // Calculate the total cost of the order
        totalCost = totalCost + extprice;

        //Sum items in Cart //
        inCart = inCart + qty;
        document.getElementById( "totqty" ).innerHTML = "= " +
            inCart;

        //increment the loop
        i = i + 1;
    } );
    // Add the Vat, Total cost, discount and delivery charges to the table //
    //increment the index by one for discount row //
    i = i + 1
    let row1 = table.insertRow( i );
    //Insert the cell for Discount description//
    let r1cell0 = row1.insertCell( 0 );
    r1cell0.setAttribute( 'id', 'distxt' );
    r1cell0.style = "text-align: left;";
    var disc = "Discount ";
    var txt1 = disc.bold();
    r1cell0.innerHTML = txt1;

    //Creat dummy cells to align discount with table column //
    for ( x = 1; x <= 5; x++ ) {
        row1.insertCell( x );
    }

    // Insert cell with discount amount//
    let r1cell6 = row1.insertCell( 6 );
    r1cell6.style = "text-align: right;";
    if ( activatedisc == true && popup == true ) {
        discAmt = ( totalCost * 15 ) / 100;
        discAmt = ( discAmt * -1 );
    } else {
        discAmt = 0;
    }
    r1cell6.innerHTML = "R" + discAmt.toFixed( 2 );
    totalCost = ( totalCost + discAmt );

    // increment the column index i to add vat//
    i = i + 1
    let row2 = table.insertRow( i );

    //Create dummy cells to align vat with table column //
    for ( x = 0; x <= 5; x++ ) {
        row2.insertCell( x );
    }

    //Insert the cell for Vat description//
    let r2cell0 = row2.insertCell( 0 );
    r2cell0.setAttribute( 'id', 'vattxt' + ( i ) );
    r2cell0.style = "text-align: left;";
    var vat = "Vat";
    var txt2 = vat.bold();
    r2cell0.innerHTML = txt2;

    //Insert the cell for Vat value //
    let r2cell6 = row2.insertCell( 6 );
    r2cell6.setAttribute( 'id', 'vatvalue' + ( i ) );
    r2cell6.style = "text-align: right;";
    //Calculate the vat amount //
    vatVal = ( totalCost * 14 ) / 100;
    r2cell6.innerHTML = "R" + vatVal.toFixed( 2 );

    // increment the column index i to add delivery costs //
    i = i + 1
    // Create cell for delivery cost //
    let row3 = table.insertRow( i );

    // Dummy cells to align delivery costs in table//
    for ( x = 0; x <= 5; x++ ) {
        row3.insertCell( x );
    }

    r3cell0 = row3.insertCell( 0 );
    r3cell0.setAttribute( 'id', 'deltxt' + ( i ) );
    r3cell0.style = "text-align: left;";
    var delcst = "Delivery Cost";
    var txt3 = delcst.bold();
    r3cell0.innerHTML = txt3;

    // create the delivery cost cells in the table //
    let r3cell6 = row3.insertCell( 6 );
    r3cell6.setAttribute( 'id', 'delcost' + ( i ) );
    r3cell6.style = "text-align: right; text: bold";
    if ( delFlag == true ) {
        delCost = delCharge;
    } else {
        delCost = 0;
    }
    r3cell6.innerHTML = "R" + delCost.toFixed( 2 );

    // increment the column index i to add total cost //
    i = i + 1
    // Creat cell for total cost //
    let row4 = table.insertRow( i );

    // Dummy cells to align total cost with table//
    for ( x = 0; x <= 5; x++ ) {
        row4.insertCell( x );
    }

    r4cell0 = row4.insertCell( 0 );
    r4cell0.setAttribute( 'id', 'tottxt' + ( i ) );
    r4cell0.style = "text-align: left;";
    var cst = "Total Cost";
    var txt4 = cst.bold();
    r4cell0.innerHTML = txt4;

    // create the total cost cells in the table //
    let r4cell6 = row4.insertCell( 6 );
    r4cell6.setAttribute( 'id', 'totcost' + ( i ) );
    r4cell6.style = "text-align: right; text: bold";
    totalCost = totalCost + vatVal + delCharge;
    r4cell6.innerHTML = "R" + totalCost.toFixed( 2 );
}

// add the captured sales data to the local storage of sales //
function addSale() {
    //get the option selected for product. // 
    let x = document.getElementById( "descript" ).selectedIndex

    // Check that a valid product has been selected. //
    if ( x == 0 ) {
        alert( "Please select a product from the dropdown list" );
        return false;
    }

    // Get the option selected for size and colour //
    let y = document.getElementById( "size" ).selectedIndex;
    let z = document.getElementById( "colour" ).selectedIndex;

    //convert price to number //
    let newprice = document.getElementById( "price" ).value;
    price = newprice.replace( 'R', '' );
    newprice = Number( price );

    // add the sale into the local storage sales//
    cursales = JSON.parse( localStorage.getItem( "sales" ) );
    let newSale = new sales(
        document.getElementById( "product" ).value,
        document.getElementsByClassName( "opDesc" )[ x ].value,
        document.getElementsByClassName( "opSiz" )[ y ].value,
        document.getElementsByClassName( "opCol" )[ z ].value,
        newprice,
        document.getElementById( "qty" ).value );
    cursales.push( newSale );
    localStorage.setItem( "sales", JSON.stringify( cursales ) );

    //Reset the variables before reloading the sales table//
    discAmt = 0;
    vatVal = 0;
    totalCost = 0;
    inCart = 0;

    //clear the salesTable and reload from local storage //
    clearSalestable();

    // reload the salesTable from local storage //
    loadTabledata();
}

// edit invoice table data
function editSale( edSale ) {
    // get the index of edited track - 1 for the header//
    let idx = ( edSale.parentNode.parentNode.rowIndex );
    idx = idx - 1;

    //Remove display of Edit button //
    document.getElementById( "edit" + idx ).style.display = "none";

    // get the current data of the sale being edited. //
    let size = document.getElementById( "size" + idx );
    let colour = document.getElementById( "colour" + idx );
    let quantity = document.getElementById( "Quantity" + idx );

    // Store the current data of the track being edited. //
    let size_data = size.innerHTML;
    let colour_data = colour.innerHTML;
    let quantity_data = quantity.innerHTML;

    // Change the table attributes of the sale items to be edited to allow for input of
    // new data.

    // Clear the inner of table data colour//
    colour.innerHTML = ''
    //?
    colour.setAttribute( 'id', 'colour' + idx )
    colour.style.width = '60px';
    //?
    // Create the options for colour with available colours//
    let selectCol = document.createElement( 'select' );
    selectCol.setAttribute( 'id', 'new_colour' + idx )
    selectCol.style.width = '60px';
    selectCol.value = colour_data;

    //Setup the current colour as default value//
    let curcolour = document.createElement( 'option' );
    curcolour.value = colour_data;
    curcolour.innerHTML = colour_data;

    let colourOpt1 = document.createElement( 'option' );
    colourOpt1.value = "White";
    colourOpt1.innerHTML = "White";

    let colourOpt2 = document.createElement( 'option' );
    colourOpt2.value = "Grey";
    colourOpt2.innerHTML = "Grey";

    let colourOpt3 = document.createElement( 'option' );
    colourOpt3.value = "Black";
    colourOpt3.innerHTML = "Black";

    //Apend the options to the select//
    selectCol.appendChild( curcolour )
    selectCol.appendChild( colourOpt1 );
    selectCol.appendChild( colourOpt2 );
    selectCol.appendChild( colourOpt3 );

    //Append the select to the table element colour//
    colour.appendChild( selectCol );

    // Clear the inner of table data Size//
    size.innerHTML = ''
    //?
    size.setAttribute( 'id', 'size' + idx )
    size.style.width = '100px';
    //?

    // Create the options for colour with available colours//
    let selectSze = document.createElement( 'select' );
    selectSze.setAttribute( 'id', 'new_size' + idx )
    selectSze.style.width = '100px';

    //Setup the current size as the default value//
    let cursize = document.createElement( 'option' );
    cursize.value = size_data;
    cursize.innerHTML = size_data;

    let sizeOpt1 = document.createElement( 'option' );
    sizeOpt1.value = "Small";
    sizeOpt1.innerHTML = "Small";

    let sizeOpt2 = document.createElement( 'option' );
    sizeOpt2.value = "Medium";
    sizeOpt2.innerHTML = "Medium";

    let sizeOpt3 = document.createElement( 'option' );
    sizeOpt3.value = "Large";
    sizeOpt3.innerHTML = "Large";

    let sizeOpt4 = document.createElement( 'option' );
    sizeOpt4.value = "X Large";
    sizeOpt4.innerHTML = "X Large";

    //Append the options to the select//
    selectSze.appendChild( cursize );
    selectSze.appendChild( sizeOpt1 );
    selectSze.appendChild( sizeOpt2 );
    selectSze.appendChild( sizeOpt3 );
    selectSze.appendChild( sizeOpt4 );

    //Append the select of size to the table element size//
    size.appendChild( selectSze );

    //Change the quantity to input//
    quantity.innerHTML = "<input type='number' id='new_quantity" + idx +
        "' style='width: 60px' value='" + quantity_data + "'>";

}

// Save the edited sale and rebuild the local storage //
function saveSale( savSale ) {
    // get the index of the edited sale //
    let idx = ( savSale.parentNode.parentNode.rowIndex );
    // reduce the index by 1 to cater for the header element //
    idx = idx - 1;
    // Store the new values entered //
    let product_val = document.getElementById( "product" + idx ).value;
    let description_val = document.getElementById( "description" + idx )
        .value;
    let size_val = document.getElementById( "new_size" + idx ).value;

    let colour_val = document.getElementById( "new_colour" + idx ).value;
    let unitprice_val = document.getElementById( "price" + idx ).value;
    let quantity_val = document.getElementById( "new_quantity" + idx ).value;

    // Change the table attributes back to the originale state //
    document.getElementById( "size" + idx ).innerHTML = size_val;
    document.getElementById( "colour" + idx ).innerHTML = colour_val;
    document.getElementById( "Quantity" + idx ).innerHTML =
        quantity_val;


    //Re-dispaly the Edit button //
    document.getElementById( "edit" + idx ).style.display = "block";

    //Reset the variables before reloading the sales table//
    discAmt = 0;
    vatVal = 0;
    totalCost = 0;
    inCart = 0;

    // Reload the local storage //
    reloadsales();

    //clear the salesTable and reload from local storage //
    clearSalestable();

    // reload the salesTable from local storage //
    loadTabledata();

    // Reload the local storage //
    //    reloadsales();
}

// Clear salesTable //
function clearSalestable() {
    // get the number of rows in saleTable //
    var x = document.getElementById( "salesTable" ).rows.length;

    // reduce number by 1 for header //
    x = x - 1;
    i = x
    do {
        // remove the table rows from the bottom up//
        document.getElementById( "salesTable" ).deleteRow( i );
        i--;
    } while ( i > 0 );
}

// Remove the Sale from the sales table and rebuild the local storage //
function removeSale( remSale ) {
    // get the index and remove Sale from sales table //
    salesTable.deleteRow( remSale.parentNode.parentNode.rowIndex );

    // Reload the local storage //
    reloadsales();

    // clear the sales table before it is reloaded//
    clearSalestable();

    // Set the discount, vat total cost to zero and no od items to zero.
    // it will be recalculated when the table is loaded//
    discAmt = 0;
    vatVal = 0;
    totalCost = 0;
    inCart = 0

    // reload the salestable from local storage //
    loadTabledata();

}

// Reload the local storage from the sales table //
function reloadsales() {
    // remove sales from local storage //
    localStorage.removeItem( 'sales' );

    // clear sales array before reloading //
    cursales = [];

    // reload local storage from sales table //
    localStorage.setItem( "sales", JSON.stringify( cursales ) );

    cursales = JSON.parse( localStorage.getItem( "sales" ) );
    // dont include the table heading start at row 1. Exclude the discount, vat,
    // totalcost and delivery charges, therefore reduce the length by 4//
    for ( row = 1; row < salesTable.rows.length - 4; row++ ) {
        let newprice = salesTable.rows[ row ].cells[ 4 ].innerHTML;

        // Strip the currency symbol
        price = newprice.replace( 'R', '' );

        //convert the price to number
        newprice = Number( price );

        let newSale = new sales(
            salesTable.rows[ row ].cells[ 0 ].innerHTML,
            salesTable.rows[ row ].cells[ 1 ].innerHTML,
            salesTable.rows[ row ].cells[ 2 ].innerHTML,
            salesTable.rows[ row ].cells[ 3 ].innerHTML,
            newprice,
            salesTable.rows[ row ].cells[ 5 ].innerHTML );
        cursales.push( newSale );
        localStorage.setItem( "sales", JSON.stringify( cursales ) );
    }

}

// Get the product details when adding a product to sales//
// and setup the details for display in modal Show Product //
function getProd() {
    //get the index of the selected product description //
    let x = document.getElementById( "descript" ).selectedIndex;

    // setup the description for the modal header//
    modalheader = document.getElementById( "descript" )[ x ].value;

    // setup the product code for display in the sales table and image for display in modal//
    if ( x == 1 ) {
        document.getElementById( 'product' ).value = "124536";
        modalPic = "ControversialImages/catalogue1black.jpg";
    }

    if ( x == 2 ) {
        document.getElementById( 'product' ).value = "124537";
        modalPic = "ControversialImages/catalogue2grey.jpg";
    }

    if ( x == 3 ) {
        document.getElementById( 'product' ).value = "124538";
        modalPic = "ControversialImages/catalogue3white.jpg";
    }

    if ( x == 4 ) {
        document.getElementById( 'product' ).value = "124539";
        modalPic = "ControversialImages/catalogue4grey.jpg";
    }

    if ( x == 5 ) {
        document.getElementById( 'product' ).value = "124540";
        modalPic = "ControversialImages/catalogue5black.jpg";
    }
}

// Show the product in the modal window //
function showProd() {
    // Create the image for the modal display//
    let actForm = document.getElementById( "form1" );
    let actImg = document.getElementById( "prodPic" );
    actImg.src = modalPic;
    actImg.alt = "Please select a Product from the dropdown list ";
    actImg.style.height = "250px";
    actImg.style.width = "400px";
    actImg.style.color = "black";
    actImg.style.border = "2px solid";

    // setup the model header
    document.getElementById( 'actHeader' ).innerHTML = modalheader;
    //Show the modal window
    prodImg.showModal();

};

// Show the dialog window if discount applies. Applies to first time registerd users only//
function checkOut() {
    let firstsale = ( localStorage.getItem( "firsttimeuser" ) );
    console.log( firstsale );

    if ( firstsale == 'true' ) {
        // Show the discount window//
        discount.showModal();
    } else {
        // Show the delivery/ collect window
        deliveryMethod();
    }
}

// close the dialog window if cancel button is clicked on the discount popup//
function cancelDisc() {
    activatedisc = false;
    discount.close();
}

// Confirm discount has been selected //
function claimDiscount() {
    //Reset the variables before reloading the sales table//
    activatedisc = true;
    popup = true;
    discAmt = 0;
    vatVal = 0;
    totalCost = 0;
    inCart = 0;

    //Close the window//
    discount.close();

    //clear the salesTable and reload from local storage //
    clearSalestable();

    // reload the salesTable from local storage //
    loadTabledata();

    // Popup delivery method modal//
    deliveryMethod();
}

// Delivery method modal//
function deliveryMethod() {
    deliveryMeth.showModal();

}

// Cancel delivery method//
function cancelDel() {
    delCharge = 0;
    deliveryMeth.close();
}

//Confirm delivery method //
function confirmMethod() {
    coldel = document.getElementById( "collect" ).checked;
    deldel = document.getElementById( "deliver" ).checked;

    //Check that a valid option has been selected//
    if ( coldel == false && deldel == false ) {
        alert( "Please select a valid option" )
    }

    if ( coldel == true ) {
        // set delivery charge to zero//
        delCharge = 0;
        confirmOrder();
    }

    if ( deldel == true ) {
        // Popup address capture window//
        deliveryOption.showModal();
    }

}

//Display the order confirmation window//
function confirmOrder() {
    // Validate the delivery address Note! only that an address has been captured
    // might not be a valid address.
    if ( deldel == true ) {
        let strno = document.getElementById( 'strno' ).value;

        if ( strno == '' ) {
            alert( "Street Number is required" );
            document.getElementById( "strno" ).focus();
            return false;
        }

        let strname = document.getElementById( 'strname' ).value;

        if ( strname == '' ) {
            alert( "Street Name is required" );
            document.getElementById( "strname" ).focus();
            return false;
        }

        let suburb = document.getElementById( 'suburb' ).value;

        if ( suburb == '' ) {
            alert( "Suburb Name is required" );
            document.getElementById( "suburb" ).focus();
            return false;
        }

        let city = document.getElementById( 'city' ).value;

        if ( city == '' ) {
            alert( "City Name is required" );
            document.getElementById( "city" ).focus();
            return false;
        }

        let pcode = document.getElementById( 'pcode' ).value;

        if ( pcode == '' ) {
            alert( "Postal Code is required" );
            document.getElementById( "pcode" ).focus();
            return false;
        }
    }

    //Setup the order collect/deliver message in finalise order
    let message1 = document.getElementById( 'delMessage' )
    if ( coldel == true ) {
        message1.innerHTML =
            "Your order will be ready for collection in 24 hours";
    } else {
        if ( deldel == true && normdel == true ) {
            message1.innerHTML =
                "Your order will be deliverd by courier with the next 5 working days";
        } else {
            if ( deldel == true && expdel == true ) {
                message1.innerHTML =
                    "Your order will be deliverd by courier with the next 24 hours";
            }
        }
    }

    let table = document.getElementById( "invTable" );

    //clear existing rows if any//
    let norows = document.getElementById( "invTable" ).rows.length;
    for ( let i = 0; i >= norows; i++ ) {
        invTable.deleteRow( i );
    }

    //Setup the invoice totals for display in the invTable
    let cellr0c1 = document.getElementById( 'invnoitems' );
    cellr0c1.innerHTML = inCart;

    let cellr1c1 = document.getElementById( 'invdiscount' );
    cellr1c1.innerHTML = "R" + discAmt.toFixed( 2 );

    let cellr2c1 = document.getElementById( 'invvat' );
    cellr2c1.innerHTML = "R" + vatVal.toFixed( 2 );

    let cellr3c1 = document.getElementById( 'invdelivery' );
    cellr3c1.innerHTML = "R" + delCharge.toFixed( 2 );

    let cellr4c1 = document.getElementById( 'invtotal' );
    cellr4c1.innerHTML = "R" + totalCost.toFixed( 2 );

    //get the order number//
    generateOrdNum();

    //insert the order number into dialog window//
    let confirmhead = document.getElementById( 'OrdNumber' );
    confirmhead.style = "text-align: center;"
    confirmhead.innerHTML = "Your Order Number Is: " + ordNum;
    confirmOrd.showModal();
}

//Close the collect/delivery window on cancel option //
function cancelCol() {
    delCharg = 0;
    confirmOrd.close();
}

// Generate the Order number//
function generateOrdNum() {
    ordNum = Math.floor( ( Math.random() * 100000 ) + 1 );
}

//Close the Delivery address window on cancel option //
function cancelAddr() {
    deladdress.close();
}

// Confirm Deliver charges and get address Note! no validation is done on address//
function confirmOption() {
    delCharge = 0;
    //setup the deliver type express or normal and delivery charge//
    expdel = document.getElementById( "express" ).checked;
    normdel = document.getElementById( "normal" ).checked;

    //Check that an option has been selected//
    if ( expdel == false && normdel == false ) {
        alert( "Please select a valid option" )
        return false;
    }

    delFlag = false;
    if ( expdel == true ) {
        delCharge = 275.00;
        delFlag = true
    }

    if ( normdel == true ) {
        delCharge = 125.00;
        delFlag = true
    }

    //Clear totals before reloading the salestable //
    discAmt = 0;
    vatVal = 0;
    totalCost = 0;
    inCart = 0;

    //clear the salesTable before reloading from local storage //
    clearSalestable();

    // reload the salesTable from local storage //
    loadTabledata();

    //Capture delivery adress//
    deladdress.showModal();
}

//Cancel delivery option
function cancelOption() {
    //Clear totals before reloading the salestable //
    discAmt = 0;
    vatVal = 0;
    totalCost = 0;
    inCart = 0;
    delCharge = 0;

    //clear the salesTable before reloading from local storage //
    clearSalestable();

    // reload the salesTable from local storage //
    loadTabledata();
    deliveryOption.close();
}

//Close the open window and clear the firsttime user local storage,
// to prevent user qualifying again for the discount Note! clearing browser data will 
// reactivate disount option. Should ideally be held in database. 
function closeOrd() {
    localStorage.removeItem( "firsttimeuser" );
    localStorage.setItem( "firsttimeuser", false );

    console.log( 'activated set' );
    call( call );
}

//Open the Thank you window for 3000 ms then close //
function call() {
    console.log( 'final window' );
    console.log( 'Final' );
    finalwindow.showModal();
    setTimeout( wait, 3000 );
}
//Close open windows //
function wait() {
    console.log( 'close' );
    finalwindow.close();
    window.close();

}