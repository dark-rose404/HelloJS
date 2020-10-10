// LOCAL STORRAGE
const storageCtrl = (function(){


    return {
        storeItem: function(item){
            let items = [];

            if(localStorage.getItem('items') === null){
                items = [];

                items.push(item);

                localStorage.setItem('items', JSON.stringify(items));
            }else {
                items = JSON.parse(localStorage.getItem('items'));
                 
                //push to new item
                items.push(item);

                localStorage.setItem('items', JSON.stringify(items));
            }
        },
        getItemStorage: function(){
            let items; 
            if(localStorage.getItem('items') === null){
                items = [];
            }else {
                items = JSON.parse(localStorage.getItem('items'));
            }
            return items;
        },

        updateItem: function(updatedItem){
            let items = JSON.parse(localStorage.getItem('items'))

            items.forEach((item, index) => {
                if(updatedItem.id === item.id){
                    items.splice(index, 1, updatedItem);
                }
            });
            localStorage.setItem('items', JSON.stringify(items));
        },

        deleteStorage: function(id){
            let items = JSON.parse(localStorage.getItem('items'))

            items.forEach((item, index) => {
                if(id === item.id){
                    items.splice(index, 1);
                }
            });
            localStorage.setItem('items', JSON.stringify(items));
        },

        clearStorage: function(){
            localStorage.removeItem('items');
        }
    }
})();




// ITEM CONTROLLER MODULES
const ItemCtrl = (function(){

     // ITEM CONSTRUCTOR
     const Item = function(id, name, calories){
        this.id = id;
        this.name = name;
        this.calories = calories;
     }

     // DATA STRUCTURE
     const data = {
         items: storageCtrl.getItemStorage()
            //  {id: 0, name: 'dinner goods', calories: 340},
            //  {id: 1, name: 'glocery', calories: 200},
            //  {id: 2, name: 'shaft', calories: 100}
         ,
         currentItem: null, 
         totalCalories: 0
     }

     // PUBLIC METHODS
     return {
         getItems: function(){
            return data.items;
         },

         addItems: function(name, calories){
            // CREATE ID 
            let ID;
            if(data.items.length > 0){
                ID = data.items[data.items.length - 1].id + 1;
            } else {
                ID = 0;
            }
            
            // parse calories to INT
            calories = parseInt(calories);
 
            // create new item 
            let newItem = new Item(ID, name, calories);

            // Add to item data structure
            data.items.push(newItem);

            return newItem;



         },
         getId: function(id){
            let found = null;

            data.items.forEach((item) => {
                if(item.id === id){
                   found = item;
                }
            });
            return found;
         },
         getCurrent: function(){
             return  data.currentItem;
         },


        updateItem: function(name, calories){
            calories = parseInt(calories);

            let found = null;

            data.items.forEach((item) => {
                if(item.id === data.currentItem.id){
                    item.name = name;
                    item.calories = calories;
                    found = item;
                }
            });

            return found;
        },
        
         AddTotal: function(){
            let total = 0;
            data.items.forEach((item) => {
                total += item.calories;
        
            });
            data.totalCalories = total;
            return data.totalCalories;

        },
        setCurrentItem: function(item){
            data.currentItem = item;
        },

        deleteItem: function(id){
            // GET IDS
            const ids = data.items.map((item) => {
                return item.id;
            });

            const index = ids.indexOf(id);

            data.items.splice(index, 1);
        },

        clearAllItems: function(){
            data.items = [];
        },

         logData: function(){
            console.log('logs');
         }
     }
})();





// ---------------------------------------------------------------





// UI CONTROLLER MODULES
const UICtrl = (function(){

    // DOM ELEMENTS 
    const DomItems = {
        itemList: "#item-list",
        AllList: "#item-list li",
        addBtn: ".add-btn",
        delBtn: ".delete-btn",
        clearBtn: ".clear-btn",
        updateBtn: ".update-btn",
        backBtn: ".back-btn",
        itemName: '#item-name',
        itemCalories: '#item-calories',
        totalCalories: '.total-calories',
        cardContent: '.card-content'    
    }

    return {
        // CONSTRUCTING TO USER INTERFACE
        LogUI: function(items){
            let html = "";

            items.forEach(function(item){
                html += `
                <li class="collection-item" id="item-${item.id}">
                    <strong>${item.name}: </strong> <em>${item.calories} Calories</em>
                    <a href="#" class="secondary-content">
                        <i class="fa fa-pencil"></i>
                    </a>
                    </li>
                `;
            });
            document.querySelector(DomItems.itemList).innerHTML = html;
        },
        DomInput: function(){
            return {
                name: document.querySelector(DomItems.itemName).value,
                calories: document.querySelector(DomItems.itemCalories).value 
            } 
            
        },
        addItemUi: function(item){
            // create element
            const li = document.createElement('li');

            li.className = "collection-item";
            li.id = `item-${item.id}`;

            li.innerHTML = `
            <strong>${item.name}: </strong> <em>${item.calories} Calories</em>
            <a href="#" class="secondary-content">
                <i class="fa fa-pencil"></i>
            </a>`;

            document.querySelector(DomItems.itemList).insertAdjacentElement('beforeend', li);
        },

        clearInput: function(){
            document.querySelector(DomItems.itemName).value = "";
            document.querySelector(DomItems.itemCalories).value = "";
            document.querySelector(DomItems.itemName).focus();
        },

        updateItem: function(item){
            let listItems = document.querySelectorAll(DomItems.AllList);

            listItems = Array.from(listItems);

            listItems.forEach((list) => {
                const itemId = list.getAttribute('id');

                if(itemId === `item-${item.id}`){
                    document.querySelector(`#${itemId}`).innerHTML = `
                    <strong>${item.name}: </strong> <em>${item.calories} Calories</em>
                    <a href="#" class="secondary-content">
                        <i class="fa fa-pencil"></i>
                    </a>
                    `;    
                }
            });
            this.clearInput();
        },

        displayTotal: function(total){
            document.querySelector(DomItems.totalCalories).textContent = total;
        },

        DomKeys: function(){
            return DomItems; 
        },

        clearEditState: function(){
            UICtrl.clearInput();
            document.querySelector(DomItems.updateBtn).style.display = "none";
            document.querySelector(DomItems.delBtn).style.display = "none";
            document.querySelector(DomItems.backBtn).style.display = "none";
            document.querySelector(DomItems.addBtn).style.display = "inline";
            
        },

        fillEditForm: function(){
            document.querySelector(DomItems.itemName).value = ItemCtrl.getCurrent().name;
            document.querySelector(DomItems.itemCalories).value = ItemCtrl.getCurrent().calories; 
            this.initEditState();
        },

        deleteItemUI: function(id){
            const itemId = `#item-${id}`;
            const item = document.querySelector(itemId);
            item.remove();
        },

        clearAllItems: function(){
            let list = document.querySelectorAll(DomItems.AllList);

            list = Array.from(list);

            list.forEach((item) => {
                item.remove();
            });
        },

        initEditState: function(){
            document.querySelector(DomItems.updateBtn).style.display = "inline";
            document.querySelector(DomItems.delBtn).style.display = "inline";
            document.querySelector(DomItems.backBtn).style.display = "inline";
            document.querySelector(DomItems.addBtn).style.display = "none";
        }


    }
})();







//---------------------------------------------------------------------------







// MAIN APP CONTROLLER
const App = (function(itemCtrl, uiCtrl, storageCtrl){
    const items = itemCtrl.getItems();

    // EVENTS LOADER

    const LoadEvents = function(){ 

        // GET DOM CONTENTS
        const DomKeys = uiCtrl.DomKeys();


        // CLICK FOR THE SUBMIT 
        document.querySelector(DomKeys.addBtn).addEventListener('click', submitItem);


        document.addEventListener('keypress', function(e){

            if(e.which === 13){
                e.preventDefault();
                return false;
            }
        });
        // LISTENER TO EDIT
        document.querySelector(DomKeys.itemList).addEventListener('click', editPencil);

        // LISTENER FOR EDIT STATE
        document.querySelector(DomKeys.updateBtn).addEventListener('click', updateBtn);

        // BACK BUTTON EVENT
        document.querySelector(DomKeys.backBtn).addEventListener('click', uiCtrl.clearEditState);

        // DELETE BUTTON EVENT
        document.querySelector(DomKeys.delBtn).addEventListener('click', deleteItem);

        // CLEAR ITEM BUTTON
        document.querySelector(DomKeys.clearBtn).addEventListener('click', clearAllBtn);

    }

    const submitItem = function(e){

        const inputs = uiCtrl.DomInput();
        
        // validate
        if(inputs.name !== "" && inputs.calories !== ""){
            const newItem = itemCtrl.addItems(inputs.name, inputs.calories); 
            
            
            // add item to ui
            uiCtrl.addItemUi(newItem);
           

            const totalCalories = itemCtrl.AddTotal();

            uiCtrl.displayTotal(totalCalories);

            //STORAGE
            storageCtrl.storeItem(newItem);
             

            uiCtrl.clearInput(); // CLEAR INPUTS 
        }

    }

    const editPencil = function(e){
        // LISTENER FOR EDIT PENCILS
        if(e.target.classList.contains('fa-pencil')){
            const listId = e.target.parentNode.parentNode.id;

            const listArr = listId.split('-');

            const id = parseInt(listArr[1]);

            const itemEdit =  itemCtrl.getId(id);

            itemCtrl.setCurrentItem(itemEdit);

            uiCtrl.fillEditForm();

           //  uiCtrl.initEditState();

            console.log(itemEdit);
        }
        
    }

    const updateBtn = function(e){

        const input = uiCtrl.DomInput();

        const updateItem = itemCtrl.updateItem(input.name, input.calories);

        uiCtrl.updateItem(updateItem); 

        const totalCalories = itemCtrl.AddTotal();

        uiCtrl.displayTotal(totalCalories);

        storageCtrl.updateItem(updateItem);

        uiCtrl.clearEditState();

        e.preventDefault(); 
    }

    const deleteItem = function(e){

        const currentId = itemCtrl.getCurrent();

        itemCtrl.deleteItem(currentId.id);

        uiCtrl.deleteItemUI(currentId.id); 

        const totalCalories = itemCtrl.AddTotal();

        uiCtrl.displayTotal(totalCalories);

        uiCtrl.clearEditState(); // CLEAR INPUTS 

        storageCtrl.deleteStorage(currentId.id);

        console.log(currentId);

        e.preventDefault();
    }

    const clearAllBtn = function(e){

        itemCtrl.clearAllItems();

        uiCtrl.clearAllItems();

        const totalCalories = itemCtrl.AddTotal();

        uiCtrl.displayTotal(totalCalories);

        storageCtrl.clearStorage();

        uiCtrl.clearEditState(); // CLEAR INPUTS 

        e.preventDefault();
    }

    return {
        init: function(){
            // CONTROLS UI   
            uiCtrl.LogUI(items);
            uiCtrl.clearEditState();
            // LOADS ALL EVENTS
            LoadEvents();
        }
    }
})(ItemCtrl, UICtrl, storageCtrl);


App.init(); 