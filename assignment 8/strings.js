exports.lengthOfLastWord = function(str){
    //variable to store number of characters in the present word, and resets to 0 if a space is found
    var tempCounter = 0;
    //counter is assigned to tempCounter only if there is letters, not spaces
    var counter = 0;
    //if string is empty return 0
    if(str==="") return 0;
    //loop through every character in the string
    for(var i = 0; i < str.length; i++){
        //if i'th position is a space, restart the tempCounter
        if(str.charAt(i) === ' '){
            tempCounter = 0;
        } else {
            //if i'th position is not a space: increment tempCounter and assign counter to it
            tempCounter++;
            counter = tempCounter;
        }
    }
    return counter;
    
}