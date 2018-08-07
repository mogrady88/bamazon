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

function bamazonManager(){

inquirer.prompt([
    {
        type: "list",
        message: "What would you like to do?",
        choices: ["See full inventory","See low inventory","Add to inventory","Add products"],
        name: "choice"
    }
]).then(function(userInput){
    switch(userInput.choice){
        case "See full inventory":
        return showInventory();

        case "See low inventory":
        return showLowInventory();

        case "Add to inventory":
        return addInventory();

        case "Add products":
        return addProducts();
    }
})

function showInventory(){
    connection.query("SELECT * FROM products", function(err,res){
        if (err) throw err;
        console.log("================================");
        for(i = 0; i<res.length; i++){
                console.log(res[i].item_id+"- "+res[i].product_name+" - $"+res[i].price+" -"+res[i].stock_quantity+" available");
        }
        console.log("================================");
        console.log(" ");
        console.log(" ");
        bamazonManager();
    })
}

function showLowInventory(){
    connection.query("SELECT * FROM products WHERE stock_quantity < 5", function(err,res){
        if (err) throw err;
        console.log("================================");
        for(i = 0; i<res.length; i++){
                console.log(res[i].item_id+"- "+res[i].product_name+" - $"+res[i].price+" -"+res[i].stock_quantity+" available");
        }
        console.log("================================");
        console.log(" ");
        console.log(" ");
        bamazonManager();
    })
}

function addInventory(){

inquirer.prompt([
    {
        type: "input",
        message: "What product would you like to add inventory to?",
        name: "productChoice"
    },
    {
        type: "input",
        message: "How many items would you like to add?",
        name: "productNum"
    }
]).then(function(userInput){
    var updateStock;
    connection.query("SELECT * FROM products WHERE product_name=?",userInput.productChoice, function(err,res){
        if (err) throw err;
        // updateStock = res.stock_quantity;
        // console.log(res[0].stock_quantity);
        updateStock = parseInt(res[0].stock_quantity);
       
        updateStock += parseInt(userInput.productNum);

    connection.query("UPDATE products SET ? WHERE ?",
        [
        {
        stock_quantity: updateStock
        },
        {
        product_name: userInput.productChoice
        }] 
        , function (err, res){
        if (err) throw err;
        console.log("");
        console.log(userInput.productNum+" "+userInput.productChoice+"(s) added");
        console.log("");
    bamazonManager();
    })
})
})
}

function addProducts(){
    inquirer.prompt([
        {
            type: "input",
            message: "What product would you like to add?",
            name: "userProduct"
        },
        {
            type: "input",
            message: "How many would you like in stock?",
            name: "userStock"
        },
        {
            type: "input",
            message: "How much will these cost?",
            name: "productCost"
        },
        {
            type: "input",
            message: "Which dept will this belong to?",
            name: "productDept"
        }
    ]).then( function(userInput){
        connection.query("INSERT INTO products SET ?",
    {
        product_name: userInput.userProduct,
        stock_quantity: userInput.userStock,
        department_name: userInput.productDept,
        price: userInput.productCost
    }
    , function(err,res){
        console.log(userInput.userProduct+" added to products");
        console.log("");
        bamazonManager();
    })
    })

}

}//end of bamazonManager

bamazonManager();