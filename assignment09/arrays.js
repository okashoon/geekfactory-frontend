exports.sum = function(arr){
    var sum = 0;
    for (var i = 0; i < arr.length; i++){
        sum += arr[i];
    }
    return sum
}

exports.odds = function(arr){
    var odds = [];
    for(var i = 0; i < arr.length; i++){
        if(Math.abs(arr[i]%2)===1) odds.push(arr[i]);
    }
    return odds;
}
exports.find = function(arr, testMatching){
    for(var i =0; i < arr.length; i++){
        if(testMatching(arr[i])) return arr[i];
    }
    return 0;
}
