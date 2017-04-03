'use strict';
$( document ).ready(
  function() {
    const urlParams = new URLSearchParams(window.location.search);

    urlParams.get('id');

    const townID = urlParams.get('id');

    const validateRoute = '/user_town_lists/validate/' + townID;


  // listen for click on div #buttonsContainer
  $("#buttonsContainer").click(buttonsContainerClicked);

  function buttonsContainerClicked() {
    var target = $(event.target);

      // if target is neither #wantToGo nor #beenThere then return
    if ( !target.is( '#wantToGo' ) && !target.is( '#beenThere ' ) ) {
      return;
    }
      // check database for existing entry (users_id && towns_id === true)
    $.getJSON( validateRoute )
      .done( ( data ) => {
        // if entry exists

        const response = data;
        const responseData = response.data

        if ( responseData.length > 0) {
          // townEntry.toggleVisited
          var townEntry = new UserTownEntry(responseData[0]);
          var patchRoute = '/user_town_lists/' + townEntry.id;

          var updatedData = "";

          if ( target.is( '#beenThere' ) ) {
            updatedData = townEntry.beenThere();
          }
          // if event target = #wantToGo
          if ( target.is( '#wantToGo' ) ) {
            updatedData = townEntry.wantToGo();
          }
          // patch to database



          $.ajax( patchRoute, {
            body: updatedData,
            method: 'PATCH'
          } );
         
          return;
        } else {
          var userID = response.userId;
          var townEntryRequest = new NewUserTownEntry(townID,userID);
          // if event target = #beenThere
          var myData = "";

          if ( target.is( '#beenThere' ) ) {
            myData = townEntryRequest.beenThere();
          }
          // if event target = #wantToGo
          if ( target.is( '#wantToGo' ) ) {
            // townEntryRequest.wantToGo();
            myData = townEntryRequest.wantToGo();
          }
          // post to database
          $.ajax({
            url: '/user_town_lists',
            method: 'POST',
            dataType: 'json',
            data: myData,
            context: townEntryRequest,
            complete: function(){
            }
          })
       
        }
      } );

  }

  function NewUserTownEntry( townID, usersID ) {
    this.towns_id = townID;
    this.users_id = usersID;
    // this.visited = false;
    this.visited = true;
  }


  NewUserTownEntry.prototype.beenThere = function() {
    this.visited = true;
        return { 
          "towns_id":this.towns_id, 
          "users_id":this.users_id, 
          "visited":this.visited 
        };
  };
  NewUserTownEntry.prototype.wantToGo = function() {
    this.visited = false;

    return { 
      "towns_id":this.towns_id, 
      "users_id":this.users_id, 
      "visited":this.visited 
    };
  };

  function UserTownEntry( responseObject ) {
    const obj = responseObject;
    this.id = parseInt( obj.id );
    this.towns_id = parseInt( obj[ "towns_id" ] );
    this.users_id = parseInt( obj[ "users_id" ] );
    this.visited = obj[ "visited" ];
  }
  UserTownEntry.prototype.beenThere = function() {
    this.visited = true;
        return { 
          "id":this.id, 
          "towns_id":this.towns_id, 
          "users_id":this.users_id, 
          "visited":this.visited 
        };
  };
  UserTownEntry.prototype.wantToGo = function() {
    this.visited = false;

    return { 
      "id":this.id, 
      "towns_id":this.towns_id, 
      "users_id":this.users_id, 
      "visited":this.visited 
    };
  };
  // .toggleVisited - change true to false and false to true
  UserTownEntry.prototype.toggleVisited = function() {
    if ( this.visited ) {
      this.visited = false;
    } else {
      this.visited = true;
    }
  };
} );
