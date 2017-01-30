exports.lengthOfLastWord = function(str){
    var tempCounter = 0;
    var counter = 0;
    if(str==="") return 0;
    for(var i = 0; i < str.length; i++){
        if(str.charAt(i) === ' '){
            tempCounter = 0;
        } else {
            tempCounter++;
            counter = tempCounter;
        }
    }
    return counter;
    
}