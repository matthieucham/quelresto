$(function() {
    var tirageId=$('#tid').val();

    // Récup infos tirage
    var tirage;
    var registeredParticipants = [];

    $.get('/rest/restos/', function(resp) {
        makeRestosList(resp);
    },'json')

    $.get('/rest/tirages/'+tirageId+'/', function(resp) {
        updateTirage(resp);
    }, 'json')

    function updateTirage(resp) {
        tirage = resp;
        $('#p-name').text('Clé: '+tirage.code);
        $('#a-logout').text("Tirage initié par "+tirage.master);
        if (tirage.master_uuid == Cookies.get('participant')) {
            $('#pn-shuffle').show()
        } else {
            $('#pn-shuffle').hide()
        }
        // activer les boutons selectionnés
        tirage.selections.forEach( function(sel) {
            var name = sel.nom;
            // Find button with name as value
            if ($('#group-restos button:contains("'+name+'")').length > 0) {
                $('#group-restos button:contains("'+name+'")').addClass("active");
            } else {
                // C'est la suggestion supplémentaire
                $('#inputlg').val(name);
            }
        });
        registeredParticipants = [];
        $('#participants').empty();
        tirage.participants.forEach( function(part) {
            $('#participants').append('<li>'+part+' a voté</li>');
            registeredParticipants.push(part);
        });
        if (resp.etat == 'CLOSE') {
            window.location.href = "/resultat/"+resp.code+'/';
        }
    }

    function makeRestosList(data) {
        data.forEach( function(resto) {
            $('#group-restos').append('<button type="button" class="btn btn-primary outline" data-toggle="button" autocomplete="off">'+resto.nom+'</button>')
        });
        $('#group-restos').append('<input class="form-control input-lg" id="inputlg" type="text" placeholder="Autre proposition"/>');
    }

    $('#btn-selection').click(function() {validateChoices()});

    function validateChoices() {
        // Tous les boutons activés de group-restos + l'input supplémentaire eventuellement
        var sel = [];
        $('#group-restos button.active').each(function(){
            var choice = {"nom": $( this ).text() };
            sel.push(choice);
        })
        if ($('#inputlg').val().length > 0) {
            var choice = {"nom": $('#inputlg').val()};
            sel.push(choice);
        }
        // Envoi au serveur
        $.ajax({
          url: '/rest/tirages/'+tirage.code+'/',
          type: "POST",
          dataType: "json", // expected format for response
          contentType: "application/json", // send as JSON
          data: JSON.stringify({"selections": sel}),
          success: function(resp) {
            $.notify({
                message: 'Sélection enregistrée'
                },{
                    type: 'success'
                });
            updateTirage(resp);
          },
          error: function(resp) {
            $.notify({
                message: 'Echec ! La sélection n\'a pas pu être enregistrée'
                },{
                    type: 'danger'
                });
            updateTirage(resp);
          }
        });
    }

    // start a poller to request participants status as long as the tirage is OPEN
    var pol = window.setInterval(pollTirage, 10000);
    function pollTirage() {
        if (tirage) {
            $.get('/rest/tirages/'+tirage.code+'/', function(resp) {
                if (resp) {
                    if (resp.etat == 'OPEN') {
                        if (resp.participants.length != registeredParticipants.length) {
                           updateTirage(resp);
                        }
                    } else {
                        // CLOSE: Redirect to resultat.html
                        window.location.href = "/resultat/"+resp.code;
                    }
                }
            }, 'json')
        }
    }

    $('#btn-shuffle').click(function() {doTirage('shuffle')});
    $('#btn-elect').click(function() {doTirage('elect')});

    function doTirage(mode) {
        $.ajax({
          url: '/rest/tirages/'+tirageId+'/'+mode+'/',
          type: "POST",
          dataType: "json", // expected format for response
          contentType: "application/json", // send as JSON
          success: function(resp) {
            // CLOSE: Redirect to resultat.html
            window.location.href = "/resultat/"+resp.code+'/';
          },
          error: function(resp) {
            $.notify({message: 'Une erreur est survenue'}, {type: 'danger'});
          }
        });
    }
})
