$(function() {
    var tirageId=$('#tid').val();

    // Récup infos tirage
    var tirage;

    $.get('../../rest/restos/', function(resp) {
        makeRestosList(resp);
    },'json')

    $.get('../../rest/tirages/'+tirageId+'/', function(resp) {
        updateTirage(resp);
    }, 'json')

    function updateTirage(resp) {
        tirage = resp;
        $('#p-name').text(tirage.uuid);
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

        tirage.participants.forEach( function(part) {
            $('#participants').empty();
            $('#participants').append('<li>'+part+' a voté</li>');
        });
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
            //choice['nom'] = $( this ).text();
            sel.push(choice);
        })
        if ($('#inputlg').val().length > 0) {
            var choice = {"nom": $('#inputlg').val()};
            //choice['nom'] = $('#inputlg').val();
            sel.push(choice);
        }
        // Envoi au serveur
        //$.post('../../rest/tirages/'+tirage.uuid+'/', {selections: JSON.stringify(sel)}, updateTirage, 'json');
        $.ajax({
          url: '../../rest/tirages/'+tirage.uuid+'/',
          type: "POST",
          dataType: "json", // expected format for response
          contentType: "application/json", // send as JSON
          data: JSON.stringify({"selections": sel}),
          success: function(resp) {
            $.notify({
                // options
                message: 'Sélection enregistrée'
                },{
                    // settings
                    type: 'success'
                });
            updateTirage(resp);
          },
          error: function(resp) {
            $.notify({
                message: 'Echec ! La sélection n\'a pas pu être enregistrée''
                },{
                    type: 'danger'
                });
            updateTirage(resp);
          },
        });
    }
})
