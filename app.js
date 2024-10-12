var currList = document.querySelectorAll(".converter-container select");
var convBtn = document.getElementById("convert");
var amount = document.getElementById("amtFrom")
var convAmt = document.getElementById("converted-amount");
var switchBtn = document.getElementById("switch");
var currFrom = document.querySelector("#from");
var currTo= document.getElementById("to");

loadCurrencyList();

convBtn.addEventListener("click", () => {
  if(amount.value > 0)
    getExchange();
});

async function getExchange() {
    var baseAmt = amount.value;
    var from = currFrom.value;
    var to = currTo.value;

    const url = `https://v6.exchangerate-api.com/v6/${erApi}latest/${from}`;
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
      const result = await response.json();

      var exchangeRate = result.conversion_rates[to];
      var convertedAmt = Math.round((baseAmt * exchangeRate)*100)/100;

      convAmt.innerHTML = `<p>${from} ${baseAmt} = <span>${to} ${convertedAmt}</span></p>`;
    } catch(e) {
      convAmt.innerText = `Something went wrong`;
      console.log(e);
    }
  }
  
  function loadCurrencyList() {
    currList.forEach((dropdown, index) => {
      for(let i=0; i < currencies.length; i++) {
        if(index === 0 && currencies[i].code === "INR") {
          var listOption = `<option value='${currencies[i].code}' selected>${currencies[i].code} - ${currencies[i].description}</option>`;
        }
        else if(index === 1 && currencies[i].code === "USD") {
          var listOption = `<option value='${currencies[i].code}' selected>${currencies[i].code} - ${currencies[i].description}</option>`;
        }
        else {
          var listOption = `<option value='${currencies[i].code}'>${currencies[i].code} - ${currencies[i].description}</option>`;
        }
        dropdown.insertAdjacentHTML("beforeend", listOption);
      }
    });
  }
  
  switchBtn.addEventListener("click", () => {
    var temp = currFrom.value;
    currFrom.value = currTo.value;
    currTo.value = temp;

    if(amount.value > 0)
      getExchange();
    });