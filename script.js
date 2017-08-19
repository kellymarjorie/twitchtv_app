$(document).ready(function() {
  var logo,
    userStatus,
    streamUrl,
    errorMessage,
    displayName,
    searchQ,
    pageUrl,
    status,
    viewers,
    summary,
      check,
    follow;
  var url1 = "https://wind-bow.glitch.me/twitch-api/";
  var userName = [
    "ESL_SC2",
    "OgamingSC2",
    "cretetion",
    "freecodecamp",
    "storbeck",
    "habathcx",
    "RobotCaleb",
    "joshog",
    "anniebot"
  ];

  // loop through the usernames to use in the streams API call
  var a = function(names) {
    
    for (var i = 0; i < names.length; i++) {
      var url2 = url1 + "streams/" + names[i] + "/?callback=?";
      
      (function(i) {
        $.getJSON(url2).done(function(data) {
          // checks if username is streaming, if not, calls the channels api
          
          if (data.stream === null) {
            var url3 = url1 + "channels/" + names[i] + "/?callback=?";

            (function(i) {
              $.getJSON(url3).done(function(data2) {
                logo = data2.logo;
                pageUrl = data2.url;
                errorMessage = data2.message;
                displayName = data2.display_name;
                status = "offline";

                // checks if username exists, returns error message if true
                if (data2.error) {
                  $("#error").html("Channel does not exist.");
                  
                } else if (logo === null) {
                  // checks if username has a logo, uses placeholder if not
                  $("#display").append(
                  "<tr class='offline'><td>" + 
                    "<i class='fa fa-twitch offline-icon' aria-hidden='true'></i>" + 
                    "</td>" + 
                    "<td><div class='main'>" + 
                    "<span class='title pull-left'><a href='" + pageUrl + "' target='_blank'>" + 
                    displayName + 
                    "</a></span></div></td>" + 
                    "<td>" + "<span class='isOffline pull-right'>" + status + 
                    "</span></div></td></tr>");
                    
                  
                } else {
                  $("#display").append(
                  "<tr class='offline'><td><img src='" + logo + 
                    "'></td><td>" + 
                    "<div class='main'>" + 
                    "<span class='title pull-left'>" + 
                    "<a href='" + pageUrl + "' target='_blank'>" +
                    displayName + 
                    "</a></div></td><td>" + 
                    "<span class='isOffline pull-right'>" + 
                    status + "</span></td></tr>");
                }
              });
            })(i);
          } else {
            logo = data.stream.channel.logo;
            userStatus = data.stream.channel.game;
            streamUrl = data.stream.channel.url;
            displayName = data.stream.channel.display_name;
            viewers = data.stream.viewers;
            summary = data.stream.channel.status;
            status = "online";

            $("#display").append(
              "<tr class='online'><td><img src='" + 
              logo + 
              "'></td><td>" + 
              "<div class='main'>" + 
              "<span class='title'>" +
              "<a href='" + streamUrl +"' target='_blank'>" + 
              displayName + 
              "</span></a><br><span title='" + summary + "'>" + 
              userStatus + "</span></div></td>" + 
              "<td><span id='online' class='isOnline pull-right'>" + 
              status + 
              "</span><br><span class='viewers pull-right'>" + viewers + " watching</span></td></tr>");
          }
        });
      })(i);
    }
  };

  window.onload = a(userName);

  $("#search").click(function() {
    $("#display").html("");
    $("#error").html("");
    $(".filter").hide();
    searchQ = $("#streamerSearch").val();
    searchQ = searchQ.toLowerCase().split(" ");
    a(searchQ);
    $("#info").html("<a href='#'><- Back</a>");
    $(".reload").click(function() {
      reload();
    });
  });
  
  $("#streamerSearch").keypress(function(e) {
    if (e.which == 13) {
      $("#search").click();
    }
  });

  var userCount = userName.length;
  $("#info").text(userCount + " users listed");
  if (userCount == "0") {
    $("#info").html("");
  }
  var reload = function() {
    $("#display").html(' ');
    $(".filter").show();
    window.reload = a(userName);
    $("#streamerSearch").val("");
    $("#error").html("");
    $("#info").text(userCount + " users listed");
  };
  
  $("#btn-online").click(function() {
    $(".offline").hide();
    $(".online").show();
  });
  
  $("#btn-offline").click(function() {
    $(".offline").show();
    $(".online").hide();
  });
  
  $("#btn-all").click(function() {
    $(".offline").show();
    $(".online").show();
  })

});
