//$(document).ready(function() {
var channels = ["freecodecamp", "storbeck", "terakilobyte", "habathcx","RobotCaleb","thomasballinger","noobs2ninjas","beohoff"];


/*
<a href="#">
  <li class="item">
    <div class="photo">
      <img src="https://static-cdn.jtvnw.net/jtv_user_pictures/freecodecamp-profile_image-d9514f2df0962329-300x300.png" alt="">
    </div>
    <div class="info">
      <div class="title">
        <h2>FreeCodecamp</h2>
        <span>StarCraft II: : RERUN: StarCraft 2 - Lilbow vs. SortOf (PvZ) - WCS Season 3 Challenger EU</span>
      </div>
    </div>
  </li>
</a>
*/
$.each(channels,function(index, el) {
  var html =  '';
  var link = '';
  var img = '';
  var title = '';
  var span = '';
  $.getJSON('https://api.twitch.tv/kraken/channels/' + el, function (channel) {
    link = '<a href=">' + channel.url + '">';

    if (!channel.logo) {
      img = '<img src="http://static-cdn.jtvnw.net/jtv_user_pictures/xarth/404_user_150x150.png" alt="' + channel.display_name + '\'s Twitch channel' + '">'
    } else {
      img = '<img src="' + channel.logo + '" alt="' + channel.display_name + '\'s Twitch channel' + '">';
    }

    title = '<h2>' + channel.display_name + '</h2>';

    html = link + '<li class="item"><div class="photo">' + img + '</div>';
    html += '<div class="info"><div class="title">' + title;
    //console.log(html);

  }).fail(function () {

    link = '<a href="' + el + '">'
    img = '<img src="' + 'http://placehold.it/60x60?text=?' + '" alt="' + channel.display_name + '\'s Twitch channel' + '">';
    title = '<h2>' + el + '</h2>';

    html = link + '<li class="item"><div class="photo">' + img + '</div>';
    html += '<div class="info"><div class="title">' + title;

  }).done(function () {
    $.getJSON('https://api.twitch.tv/kraken/streams/' + el + '?callback=?', function (stream) {
      //console.log(stream);
      if (!stream.stream) {
        span = '<span>Offline</span>';
      } else {
        span = '<span>' + stream.stream.game + ': ' + stream.stream.channel.status + '</span>';
      }

      html += span + '</div></li></a>';
      $('#all .streams').append(html)
    }).fail(function () {
      span = '<span>Offline</span>';

      html += span + '</div></li></a>';
      console.log(html);
    });
  });

  //html = link + '<li class="item"><div class="photo">' + img + '</div>';
  //html += '<div class="info"><div class="title">' + title + span + '</div></li></a>';
  //console.log(html);
});
