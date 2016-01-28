$(function() {
    var tirageId=$('#tid').val();

    // Récup infos tirage
    var tirage;

    $.get('/rest/tirages/'+tirageId+'/', function(resp) {
        updateTirage(resp);
    }, 'json')

    function updateTirage(resp) {
        tirage = resp;
        $('#resultat_jumbo h1').text(tirage.choix);

        // Display stats
        if (resp.statistiques) {
            $('#votes_body').empty();
            var $total = resp.statistiques.total;
            $('#votes_body').append('<ul>');
            var $allLines = '';
            for (var prop in resp.statistiques.votes) {
                var $nbV = resp.statistiques.votes[prop];
                var $chance = (($nbV / $total) * 100).toFixed(1)+'%';
                $allLines += '<li>'+prop+': '+$nbV+' voix ['+$chance+']</li>'
            }
            $('#votes_body ul').append($allLines);


            $('#stats_body').empty();
            $('#stats_body').append('<ul>');
            var $allLines = '';
            for (var prop in resp.statistiques.selections) {
                $allLines += '<li>'+prop+' avait voté pour: '+resp.statistiques.selections[prop]+'</li>'
            }
            $('#stats_body ul').append($allLines);
        }
    }

})
