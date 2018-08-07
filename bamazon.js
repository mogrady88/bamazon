var mysql = require('mysql');
var inquirer = require('inquirer');

var connection = mysql.createConnection({
    host: "localhost",
    root: 3306,
    user: "root",
    password: "root",
    database: "bamazon"
})

connection.connect(function(err){
    
    if (err) throw err;
});

function startBamazon(){
inquirer.prompt([
    {
        type: "list",
        message: "What would you like to do?",
        choices: ["See what's for sale", "Purchase an item"],
        name: "choice"
    }
]).then(function(userInput){
    if (userInput.choice == "Purchase an item"){
        startBid();
    }
    else{
        showTable();
    }
})
}

startBamazon();

function startBid(){
    inquirer.prompt([
        {
            type: "input",
            message: "What is the ID of the product you wish to buy?",
            name: "choiceID"
        },
        {
            type: "input",
            message: "How many of these would you like to purchase?",
            name: "choiceNum"
        }
    ]).then(function(userInput){
        var itemChoice = userInput.choiceID;
        var itemNum = userInput.choiceNum;
        checkBid(itemChoice, itemNum);
        // console.log(userInput.choiceID+" - "+userInput.choiceNum);
    })

}

function showTable(){
    console.log(" ");
    connection.query("SELECT * FROM products", function(err,res){
        if (err) throw err;
        console.log("================================");
        for(i = 0; i<res.length; i++){
                console.log(res[i].item_id+"- "+res[i].product_name+" - $"+res[i].price+" -"+res[i].stock_quantity+" available");
        }
        console.log("================================");
        console.log(" ");
        console.log(" ");
        startBamazon();
    })

}

function checkBid(a, b){
    connection.query("SELECT * FROM products WHERE item_id=?",a, function(err,res){
        if (err) throw err;

        if(b > res.stock_quantity){
            console.log("Sorry! We don't have that many "+res.product_name+"s in stock")
        }
        else{
            var orderTotal = b * res[0].price;
            console.log("Order complete: "+b+" "+res[0].product_name+"(s)");
            console.log("Order Total: $"+orderTotal);
            console.log("Thank you!");
            var updatedTotal = res[0].stock_quantity - b;
            updateProducts(updatedTotal, res[0].product_name);
        }
    })
}

function updateProducts(a, b){
    connection.query("UPDATE products SET ? WHERE ?",
[
    {
        stock_quantity: a
    },
    {
        product_name: b
    }
], function(err,res){
    if(err) throw err;
    console.log("Inventory was updated");
    startBamazon();
})
}