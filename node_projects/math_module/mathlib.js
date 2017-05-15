module.exports = function (){
  return {
    add: function(num1, num2) { 
        return num1 + num2;
    },
    multiply: function(num1, num2) {
        return num1 * num2;
    },
    square: function(num) {
        return num * num;
    },
    random: function(num1, num2) {
        var min = 0;
        var max = 0;
        if (num1 == num2){
            return num1;
        }
        else if (num1 > num2){
            max = num1;
            min = num2;
        }
        else{
            max = num2;
            min = num1;
        }
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
  }
}