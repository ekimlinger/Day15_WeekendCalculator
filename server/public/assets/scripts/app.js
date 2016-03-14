$(document).ready(function(){
  $('.clear').on('click', clearAll);
  $('.number').on('click', concatNumber);
  $('.sign').on('click', takeSymbol);
  $('.equals').on('click', sendCalc);
  //$('.decimal').on('click', addDecimal);
});
//create new calc object (2 numbers and a sign (*,/,+, or -))
var calculationObj = {
  "x": undefined,
  "y": undefined,
  "sign": undefined
}
var signPressedEquals = false;
function concatNumber(){
  //if a sign button was pressed to calculate,
  //reset the text when trying to enter a new #
  if (signPressedEquals){
    $('.calculation').text('');
  }
  //take new number from button pressed
  $num = $(this).text();
  //take string currently displayed
  $old = $('.calculation').text();
  // removes 0 from front of number
  if($old == "0"){
    $old = '';
  }
  //combine strings
  $('.calculation').html($old + $num);

  signPressedEquals = false;
}

function clearAll(){
  $('.calculation').text('0');
  calculationObj.x = undefined;
  calculationObj.y = undefined;
  calculationObj.sign = undefined;
  signPressedEquals = false;
}

function assignX(){
  calculationObj.x = $('.calculation').text();
  console.log(calculationObj.x);
  $('.calculation').text('0');
}

function assignY(){
  calculationObj.y = $('.calculation').text();
  console.log(calculationObj.y);
  $('.calculation').text('0');
}

function takeSymbol(){
  //set first number if none have been entered
  if (calculationObj.sign == undefined){
    assignX();
    $symbol = $(this).text();
    //sets calculationObj.sign to "divide/add/subtract/multiply"
    switch ($symbol){
      //set symbol according to text
      case ("+"):
        calculationObj.sign = "add";
        break;
      case ("-"):
        calculationObj.sign = "subtract";
        break;
      case ("*"):
          calculationObj.sign = "multiply";
        break;
      case ("/"):
          calculationObj.sign = "divide";
        break;
    }
  } else{
    //run calc through ajax temporarily stores sign
    //in order to recalculate after
    signPressedEquals = true;
    var tempSign = calculationObj.sign;
    sendCalc();
    calculationObj.sign = tempSign;
  }

}
//Assigns Y and sends data to server
function sendCalc (){
  if (calculationObj.sign != undefined){
    //sends 2 numbers and sign to server to be processed
    assignY();
    console.log(calculationObj);
    $.ajax({
      type: "POST",
      url: "/"+ calculationObj.sign,
      data: calculationObj,
      success: function(data){
        displayCalc(data);
      }
    });
  }
}
//Shows number processed from server,
//sets x to that number
function displayCalc(returnObj){
  var number = returnObj["woah"];
  $('.calculation').text(number.toString());
  //reset symbols and numbers
  calculationObj.x = number;
  calculationObj.y = undefined;
  calculationObj.sign = undefined;
}
