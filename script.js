    // TODO CONTROLLER - Data Module
let toDoController = (function() { // Module with IFFE 

    let Prio1 = function(id, description) { // function constructor
        this.id = id;
        this.description = description;
    };

    let Prio2 = function(id, description) { // function constructor
        this.id = id;
        this.description = description;
    };

    let Prio3 = function(id, description) { // function constructor
        this.id = id;
        this.description = description;
    };

    let DoneItem = function(id, description) {
        this.id = id;
        this.description = description;
    }

    let data = { // object
        allItems: {
            top: [], // array of all prio1
            med: [], // array of all prio2
            low: [], // array of all prio3
            done: [] // array of all done items
        }
    };

    return { // Accessible from outside the module

        // add Item to the toDo list
        addItem: function(type, des) {
            let newItem;

            // Create new ID
            if(data.allItems[type].length > 0) {
                ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
            } else {
                ID = 0;
            };

            // Create new item based on type (prio 1,2 or 3)
            if (type === 'top') {
                newItem = new Prio1(ID, des);
            } else if (type === 'med') {
                newItem = new Prio2(ID, des);
            } else if (type === 'low') {
                newItem = new Prio3(ID, des);
            } else if (type === 'done') {
                newItem = new DoneItem(ID, des);
            };

            // Push it into our data structure
            data.allItems[type].push(newItem);

            // Return the new element
            return newItem;
        },

        // remove item from toDo / done
        removeItem: function(selEntry) {
            let splitID, type, ID;

            // Remove from current array
                // Get type     
                console.log('remove: ' + selEntry);

                if (selEntry) {
                    // .split devides the string into an array with each element being defined by the selected charater
                    // the selected charater is not part of the array.
                    // ex: top_1 = splitID = [top, 1]
                    // This could be used to devide sentences into words f.ex.
                    splitID = selEntry.split('_');
                    type = splitID[0];
                    ID = splitID[1];
                };

            // Splice erases elements from the array starting at the first argument 
            // and continuing as many as the second argument. Here starting at ID and
            // erasing one
            data.allItems[type].splice(data.allItems[type].ID, 1);
            console.log(data.allItems[type]);

            // for (let i = 0; i < data.allItems[type].length; i++) {
            //     console.log(data.allItems[type][i]);
            // };

            // only display title (h3) if there are entries under that topic
            if (type === 'top' && data.allItems[type].length <= 0) {
                console.log('delete title');
                document.querySelector('#show1').style = 'display: none;';
            } else if (type === 'med' && data.allItems[type].length <= 0) {
                document.querySelector('#show2').style = 'display: none;';
            } else if (type === 'low' && data.allItems[type].length <= 0) {
                document.querySelector('#show3').style = 'display: none;';
            } else if (type === 'done' && data.allItems[type].length <= 0) {
                document.querySelector('.show4').style = 'display: none;';
            };
        }
    };
})();

    // UI CONTROLLER - User Interface Module
let UIController = (function() {

    return { // available from other modules

        // Get user input
        getinput: function() {
            let prio; // added this to be able to see which checkbox is selected

            // check which checkbox is selected 
            if (document.querySelector('.add_type1').checked) {
                prio = 'top'; // needs to be a string value
            } else if (document.querySelector('.add_type2').checked) {
                prio = 'med';
            } else if (document.querySelector('.add_type3').checked) {
                prio = 'low';
            };

            // To be able to return all the different values we create an object
            return { // the function returns the object
                type : prio, // the value of the checkbox
                description : document.querySelector('.add_description').value // the text entered                
            };
        },

        // add to corresponding section of the todo / done
        addListItem: function(obj, type) {
            let html, newHTML, element;
            
            //Create HTML string with placeholder text
            // Once we recieve the obj with data we can then replace them in the placeholder text

            if (type === 'top') {
                element = '.prio1';
                document.querySelector('#show1').style = 'display: block;';
                document.querySelector('.hide').style = 'display: block;';
                // html needs to be on the same line
                // placeholders between %% to make them easier to destinguish
                html = '<li class="item" id="top_%id%"><span class="item_done hidden"><button class="item_done-btn"><i class="fas fa-check"></i></button></span><span class="item_description">%description%</span><span class="item_delete hidden"><button class="item_delete-btn"><i class="far fa-times-circle"></i></button></span></li>';
            } else if (type === 'med') {
                document.querySelector('#show2').style = 'display: block;';
                document.querySelector('.hide').style = 'display: block;';
                element = '.prio2';
                html = '<li class="item" id="med_%id%"><span class="item_done hidden"><button class="item_done-btn"><i class="fas fa-check"></i></button></span><span class="item_description">%description%</span><span class="item_delete hidden"><button class="item_delete-btn"><i class="far fa-times-circle"></i></button></span></li>';
            } else if (type === 'low') {
                document.querySelector('#show3').style = 'display: block;';
                document.querySelector('.hide').style = 'display: block;';
                element = '.prio3';
                html = '<li class="item" id="low_%id%"><span class="item_done hidden"><button class="item_done-btn"><i class="fas fa-check"></i></button></span><span class="item_description">%description%</span><span class="item_delete hidden"><button class="item_delete-btn"><i class="far fa-times-circle"></i></button></span></li>';
            } else if (type === 'done') {
                document.querySelector('.show4').style = 'display: block;';
                document.querySelector('.hide').style = 'display: block;';
                element = '.done_list';
                html = '<li class="item" id="done_%id%"><i class="fas fa-check"></i><span class="item_description">%description%</span><span class="item_delete hidden"><button class="item_delete-btn"><i class="far fa-times-circle"></i></button></span></li>';
            };

            // replace placeholders text with actual data
            // After the first replacement we need to keep working on the same, updated string 
            newHTML = html.replace('%id%', obj.id);
            newHTML = newHTML.replace('%description%', obj.description);
            

            // Insert HTML into DOM
            // .insertAdjecentHTML inserts text (html) before, inside or after the element
            //'beforeend' inserts right before the end of the selected html element, but still inside the element itself
            // each new addition will be added at the end of the selected list
            document.querySelector(element).insertAdjacentHTML('beforeend', newHTML);
        },

        // Clear previous input when submitted
        clearFields: function() {
            document.querySelector('.add_description').value = '';

            if (document.getElementById("top_prio").checked) {
                document.getElementById("top_prio").checked = false;
            } else if (document.getElementById("med_prio").checked) {
                document.getElementById("med_prio").checked = false;
            } else if (document.getElementById("low_prio").checked) {
                document.getElementById("low_prio").checked = false;
            };

            document.querySelector('.add_description').focus();

        }
    };
})();

    // GLOBAL APP CONTROLLER 
let controller = (function(toDoCtrl, UICtrl) {

    let setupEventListener = function() {

        document.querySelector('.add_description').focus(); // so you can start writing straight away
        
        document.querySelector('.add_btn').addEventListener('click', ctrlAddItem);

        // When a key is pressed it doesnt happen on any specific query but on the entire page
        // keypress is for when ANY KEY is pressed
        // by adding an argument to the function we can check which button is pressed, f.ex.
        // keyCode can be used to identify specific keys on the keyboard
        document.addEventListener('keypress', function(event) {
            if(event.keyCode === 13 || event.which === 13) { // ENTER key
                ctrlAddItem();
                console.log('ENTER'); // THIS WORKS 
            }
        });

        document.querySelector('.toDo_list').addEventListener('click', ctrlMoveItem);

        document.querySelector('.done').addEventListener('click', ctrlMoveItem);

        document.querySelector('.save_btn').addEventListener('click', ctrlSaveList);

    }; // end setupEventListener

    const ctrlAddItem = function() {
        
        // 1. Get the text input data 
        let input = UICtrl.getinput();
        console.log(input);

        if(input.description !== '') { // if its not empty
            // 2. Add the item to the TODO Controller
            let newItem = toDoCtrl.addItem(input.type, input.description);

            // 3. Add the new item to the UI
            UICtrl.addListItem(newItem, input.type);


            // 4. Clear the fields 
            UICtrl.clearFields();
        };
        

    }; // end ctrlAddItem

    let ctrlMoveItem = function(event) {
        let selectedEntry;
        // See which button was pressed
        let pressedBtn = event.target.parentNode.className;

        if (pressedBtn === 'item_delete-btn') {
            selectedEntry = event.target.parentNode.parentNode.parentNode.id;
            console.log(selectedEntry);
            ctrlDeleteItem(selectedEntry);   
            toDoCtrl.removeItem(selectedEntry);
        } else if (pressedBtn === 'item_done-btn') {
            selectedEntry = event.target.parentNode.parentNode.parentNode.id;
            ctrlItemDone(selectedEntry);
            toDoCtrl.removeItem(selectedEntry);
        };
    };

    const ctrlDeleteItem = function(selEntry) {
        document.getElementById(selEntry).style = 'display: none;';
    }

    const ctrlItemDone = function(selEntry) {
        // get description from html
        let c = document.getElementById(selEntry).children; // creates an array of children
        let description = c[1].innerText; // second element, inner text

        // create new array with done items
        let newItem = toDoCtrl.addItem('done', description)


        // add item to done array using addListItem()
        UICtrl.addListItem(newItem, 'done');

        document.getElementById(selEntry).style = 'display: none;';

        // console.log('done')
    };

    const ctrlSaveList = function(event) {

            // hide the save button
            document.querySelector('.hide').style = 'display = none;';

            let divContents = document.querySelector(".container").innerHTML;
            
            // create new window
            let printWindow = window.open('', '', 'height=400,width=800');
            printWindow.document.write('<html><head><title>ToDo List</title>');
            printWindow.document.write('<link rel="stylesheet" href="printPDF.css" />'); 
            printWindow.document.write('</head><body><div class="container">');
            printWindow.document.write('<h2>To Do List</h2>');
            printWindow.document.write(divContents);
            printWindow.document.write('</div></body></html>');
            printWindow.document.close();

            // printWindow.print(); 
        
    };

    return {
        init: function() {
            console.log('Application has started');
            setupEventListener();
        }
    }
})(toDoController, UIController); // Passing arguments into module to connect them

// start application
controller.init();