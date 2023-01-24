$(document).ready(function() {
    $(".add-bot").click(function(e) {
        e.preventDefault();
	var x = Date.now();
        $(".bot-container").append('<div class="row"><div class="col-12"><span class="font-weight-bold">Bot #'+x+'</span></div><div class="mb-2 col-md-6"><label for="BotMarket" class="form-label">Market</label><input type="text" class="form-control" name="Bot_'+x+'_Market"></div><div class="mb-2 col-md-6"><label for="BotSide" class="form-label">Side</label><select class="form-control" name="Bot_'+x+'_Side"><option {% if configuration.PushoverSettings.PushoverEnabled == "buy" %} selected="selected" {% endif %}>buy</option><option {% if configuration.PushoverSettings.PushoverEnabled == "sell" %} selected="selected" {% endif %}>sell</option></select></div><div class="mb-2 col-md-6"><label for="BotTradeValue" class="form-label">Trade value</label><input type="number" class="form-control" name="Bot_'+x+'_TradeValue_"></div><div class="mb-2 col-md-6"><label for="BotPercOpen" class="form-label">Perc Open</label><div class="input-group"><input type="number" class="form-control" name="Bot_'+x+'_PercOpen"><div class="input-group-text">%</div></div></div><div class="mb-2 col-md-6"><label for="BotPercClose" class="form-label">Perc Close</label><div class="input-group"><input type="number" class="form-control" name="Bot_'+x+'_PercClose"><div class="input-group-text">%</div></div></div><div class="mb-2 col-md-6"><label for="BotTakeProfitIn" class="form-label">Take profit in</label><input type="text" class="form-control" name="Bot_'+x+'_TakeProfitIn"></div><div class="mb-2 col-md-6"><label for="BotResetNextTradePrice" class="form-label">Reset next trade price</label><div class="input-group"><input type="number" class="form-control" name="Bot_'+x+'_ResetNextTradePrice"><div class="input-group-text">day(s)</div></div></div><div class="col-12"><a type="button" href="#" class="btn btn-primary delete">Delete bot</a><hr></div></div>');
    });

    $(".bot-container").on("click", ".delete", function(e) {
        e.preventDefault();
        $(this).parent('div').parent('div').remove();
    })
});

$("#config").submit(function () {

  event.preventDefault();
  const myFormData = new FormData(event.target);
  const data = {};
  myFormData.forEach((value, key) => (data[key] = value));

  event.preventDefault()
  $.ajax({
    url: "/checkconfig",
    data: data,
    type: "POST",
    success: function (response) {
      if (response === "ok") {
        swal
          .fire({
            icon: "success",
            title: "Configuration saved.",
          })
          .then((result) => {
            window.location.reload();
          })
      } else {
        swal
          .fire({
            icon: "error",
            title: "Configuration not saved.",
            text: response,
          })
      }
    },
    error: function (error) {
      console.log(error)
    },
  })
})
