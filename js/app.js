var channels = ["freecodecamp", "storbeck", "terakilobyte", "habathcx","RobotCaleb","thomasballinger","noobs2ninjas","beohoff", 'brunofin', 'comster404', 'ESL_SC2'];

//For each channel
$.each(channels,function(index, el) {
  //create vars
  var html =  '';
  var link = '';
  var img = '';
  var title = '';
  var span = '';

  //request channel info
  $.getJSON('https://api.twitch.tv/kraken/channels/' + el, function (channel) {

    link = '<a href=">' + channel.url + '">';

    //if request doesn't provide a logo put a custom one, else put the one provided
    if (!channel.logo) {
      img = '<img src="http://static-cdn.jtvnw.net/jtv_user_pictures/xarth/404_user_150x150.png" alt="' + channel.display_name + '\'s Twitch channel' + '">'
    } else {
      img = '<img src="' + channel.logo + '" alt="' + channel.display_name + '\'s Twitch channel' + '">';
    }

    title = '<h2>' + channel.display_name + '</h2>';

    //update html
    html = link + '<li class="item"><div class="photo">' + img + '</div>';
    html += '<div class="info"><div class="title">' + title;

  }).fail(function (channel) {

    //if request fail put custom values and append to DOM
    link = '<a href="' + el + '">'
    img = '<img src="' + 'http://placehold.it/60x60?text=?' + '" alt="' + channel.display_name + '\'s Twitch channel' + '">';
    title = '<h2>' + el + '</h2>';
    span = '<span>Offline</span>';

    html = link + '<li class="item"><div class="photo">' + img + '</div>';
    html += '<div class="info"><div class="title">' + title;
    html += span + '</div></li></a>';
    $('#all .streams').append(html);

  }).done(function () {
    //request stream info
    $.getJSON('https://api.twitch.tv/kraken/streams/' + el + '?callback=?', function (stream) {

      //if not streaming put Offline, otherwise put stream's name
      if (!stream.stream) {
        span = '<span>Offline</span>';
      } else {
        span = '<span>' + stream.stream.game + ': ' + stream.stream.channel.status + '</span>';
      }

      //update html and append it to DOM
      html += span + '</div></li></a>';
      $('#all .streams').prepend(html);
    });
  });
});
