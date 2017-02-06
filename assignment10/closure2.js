exports.saveForLater = function(name){

    function printSavedName(){
        return name;
    }
    return printSavedName;
}

exports.executeLater = function(funcToBeExecuted){

    return funcToBeExecuted;
}