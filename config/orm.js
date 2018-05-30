// import mySql connection
var connection = require("../config/connection.js");

// function to pass values
function printValue(num) {
    var arr = []; 

    for (var i = 0; i < num; i++) {
        arr.push("?");
    }

    return arr.toString();
}

//function to object values to SQL syntax
function objToSql(ob) {
	var arr = [];

	for (var key in ob) {
		arr.push(key + "=" + ob[key]);
	}

	return arr.toString();
}

// object for all SQL statement functions
var orm = {
    selectAll: function(tableInput, cb) {
        var queryString = "SELECT * FROM " + tableInput + ";";
        connection.query(queryString, function(err, result) {
            if (err) {
                throw err;
            }
            cb(result);
        });
    },

    insertOne: function(table, cols, vals, cb) {
        var queryString = "INSERT INTO " + table;
        
        queryString += " (";
        queryString += cols.toString();
        queryString += ") ";
        queryString += "VALUES (";
        queryString += printValue(vals.length);
        queryString += ") ";

        console.log(queryString);

        connection.query(queryString, vals, function(err, result){
            if (err) {
                throw err;
            }

            cb(result);
        });
    },

    updateOne: function(table, condition, cb) {
        var queryString = "UPDATE " + table;

        queryString += " SET ";
        queryString += " devoured= true ";
        queryString += " WHERE ";
        queryString += condition;

        console.log(queryString);
            connection.query(queryString, function(err, result) {
                if (err) {
                    throw err;
                }

                cb(result);
        });
    },

    /*
    deleteOne: function(table, condition, cb) {
        var queryString = "DELETE FROM " + table;
        queryString += " WHERE ";
        queryString += condition;

        connection.query(queryString, function(err, result) {
            if (err) {
                throw err;
            }

            cb(result);
        });
    }*/
};

module.exports = orm;