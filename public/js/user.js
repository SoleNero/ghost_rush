'use strict';
<<<<<<< HEAD
$( 'document' ).ready( function() {
=======
console.log( "Getting to users.js" );
$( 'document' ).ready( function() {
  console.log( "Let's explore!" );
>>>>>>> cf5ee061d0c3fbcf55bfd395ac09deff67fc2f26

  $.getJSON( '/user_town_lists/false' )
    .done( ( town ) => {
      var card = town;
      card.map( renderCardsWant );
<<<<<<< HEAD
=======
      console.log( town );
>>>>>>> cf5ee061d0c3fbcf55bfd395ac09deff67fc2f26
    } )
    .fail( function( err ) {
      console.log( err );
    } );

  // constructor to get info from db
  function UserTownWant( town ) {
    const obj = town;
    this.id = obj[ "id" ];
    this.townPhoto = obj[ "photo_url" ];
    this.townName = obj[ "name" ];
    this.townShortDesc = obj[ "short_desc" ];
<<<<<<< HEAD
  }

=======
    console.log( "I'm getting to line 25" );
  }
>>>>>>> cf5ee061d0c3fbcf55bfd395ac09deff67fc2f26
  UserTownWant.prototype.populateCard = function populateCard() {
    var townPhoto = "<div class='col s3'>" + "<div class='card small'>" + "<div class='card-image'>" + "<img src= '" + this.townPhoto + "' alt= '" + this.townName + "' class='responsive-img imageSizing'>";
    var townName = "<span class='card-title center-align'>" + this.townName + "</span>" + "</div>";
    var mapLink = "<div class='card-content center-align'>" + "<a href=map.html>Visit Map Page</a>" + "<div class='section'>";
    var deleteLink = "<div class='divider'></div>" + "</div>" + "<div class='card-content'>" + "<a href='#' id='deleteTown'>Delete from List</a></div></div></div></div>";

    $( '.wantTownCard' ).append( townPhoto + townName + mapLink + deleteLink );

    // $('.beenTownCard').append(townPhoto + townName + mapLink + deleteLink);
  };

  function renderCardsWant( obj ) {
    var newCard = new UserTownWant( obj );
    newCard.populateCard();
  }

  // ===javascript rendering for been there===
  $.getJSON( '/user_town_lists/true' )
    .done( ( town ) => {
      var card = town;
      card.map( renderCardsBeen );
<<<<<<< HEAD
=======
      console.log( town );
>>>>>>> cf5ee061d0c3fbcf55bfd395ac09deff67fc2f26
    } )
    .fail( function( err ) {
      console.log( err );
    } );

  // constructor to get info from db

  function UserTownBeen( town ) {
    const obj = town;
    this.id = obj[ "id" ];
    this.townPhoto = obj[ "photo_url" ];
    this.townName = obj[ "name" ];
    this.townShortDesc = obj[ "short_desc" ];
<<<<<<< HEAD
  }

=======
    console.log( "I'm getting to line 25" );
  }
>>>>>>> cf5ee061d0c3fbcf55bfd395ac09deff67fc2f26
  UserTownBeen.prototype.populateCard = function populateCard() {
    var townPhoto = "<div class='col s3'>" + "<div class='card small'>" + "<div class='card-image'>" + "<img src= '" + this.townPhoto + "' alt= '" + this.townName + "' class='responsive-img imageSizing'>";
    var townName = "<span class='card-title center-align'>" + this.townName + "</span>" + "</div>";
    var mapLink = "<div class='card-content center-align'>" + "<a href=map.html>Visit Map Page</a>" + "<div class='section'>";
    var deleteLink = "<div class='divider'></div>" + "</div>" + "<div class='card-content'>" + "<a href='#' id='deleteTown'>Delete from List</a></div></div></div></div>";

    $( '.beenTownCard' ).append( townPhoto + townName + mapLink + deleteLink );
  };

  function renderCardsBeen( obj ) {
    var newCard = new UserTownBeen( obj );
    newCard.populateCard();
  }

<<<<<<< HEAD
  // ====Javascript rendering for info box====
  $.getJSON( '/users/getid' )
    .done( ( user ) => {
=======



  // ====Javascript rendering for info box====
  $.getJSON( '/users/getid' )
    .done( ( user ) => {
      console.log( "user: ", user.data );
>>>>>>> cf5ee061d0c3fbcf55bfd395ac09deff67fc2f26
      const html = "<p class='center-align'>" + user.data.username + "</p>" + "<p class='center-align'>" + user.data.location_city + "</p>" + "<p class='center-align'>" + user.data.location_state + "</p>";
      $( '#profileInfoBox' ).append( html );
    } )
    .fail( function( err ) {
      console.log( err );
    } );

  function UserInfo( user ) {
    const obj = user;
    this.id = obj[ "id" ];
    this.username = obj[ "username" ];
    this.location_city = obj[ "location_city" ];
    this.location_state = obj[ "location_state" ];
<<<<<<< HEAD
  }

=======
    console.log( obj );
  }
>>>>>>> cf5ee061d0c3fbcf55bfd395ac09deff67fc2f26
  // render to user info box
  UserInfo.prototype.populateInfoBox = function populateInfoBox() {
    const html = "<p class='center-align'>" + this.username + "</p>" + "<p class='center-align'>" + this.location_city + "</p>" + "<p class'center-align'>" + this.location_state + "</p>";
    $( '.profileInfoBox' ).html( html );
<<<<<<< HEAD
=======
    console.log( html );
>>>>>>> cf5ee061d0c3fbcf55bfd395ac09deff67fc2f26
  };

  function renderUserInfo( obj ) {
    var newUser = new UserInfo( obj );
    newUser.populateInfoBox();
  }
<<<<<<< HEAD
});
=======

  // })
} );
>>>>>>> cf5ee061d0c3fbcf55bfd395ac09deff67fc2f26
