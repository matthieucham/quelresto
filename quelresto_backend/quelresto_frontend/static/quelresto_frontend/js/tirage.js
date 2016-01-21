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
        $('#p-name').text(tirage.uuid+"   Tirage initié par "+tirage.master);
    }

    function makeRestosList(data) {
        data.forEach( function(resto) {
            $('#group-restos').append('<button type="button" class="btn btn-primary outline" data-toggle="button" autocomplete="off">'+resto.nom+'</button>')
        });
        $('#group-restos').append('<input class="form-control input-lg" id="inputlg" type="text" placeholder="Autre proposition"/>');
    }
})
