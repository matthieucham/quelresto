$(function(){

	/*********************************/
	/*       Affectation du menu     */
	/*********************************/
	$('#btn-start-resto').click(function() {startResto()});

	$('#fld-username').change(function() {
	    if ($( this ).val().length > 0) {
	        $('#btn-save-name').prop('disabled', false);
	    } else {
	        $('#btn-save-name').prop('disabled', true);
	    }
	});

	$('#a-logout').click(function() {
	    Cookies.remove('participant');
	    fetchParticipant();
	});

    fetchParticipant();
});

function startResto() {
    console.log('startResto');
    // vérifie si on a un cookie, si non on en créera un.
    var pUuid = Cookies.get('participant');
    if (pUuid == null) {
        $('#enterName').modal('show');
        $('#btn-save-name').click(function() {
	        createParticipant($('#fld-username').val(), true);
	    });
    } else {
        launchTirage();
    }
}

function fetchParticipant() {
    // Recherche le cookie nommé "participant".
    // Si trouvé et toujours valide => rien à faire
    // Sinon, appeler le service rest participants pour initialiser un nouveau cookie de participation.
    var pUuid = Cookies.get('participant');
    if (pUuid == null) {
        $('nav.navbar').hide();
    } else {
        // GET participant with that cookie
        $.get("rest/participants/"+pUuid, function(resp){
                $('#p-name').text("Bonjour "+resp.nom+". Il est ").append("<span id='time'></div>").append(" Bientôt l'heure de manger !");
                $('#a-logout').text("Je ne suis pas "+resp.nom);
                $('nav.navbar').show();
                startTime();
             }, 'json');
    }
}

function launchTirage() {
    // Créer nouveau tirage
    $.post('rest/tirages/', function(resp) {
        var tirageUuid = resp.uuid;
        // Redirect to tirage.html
        window.location.href = "tirage/"+tirageUuid;
    }, 'json');
}

function createParticipant(name, startTirage) {
    $.post('rest/participants/', {'nom': name}, function(resp) {
        Cookies.set('participant', resp.uuid, { expires: 30 });
        fetchParticipant();
        if (startTirage) {
            launchTirage();
        } else {
            // Rejoindre un tirage
        }
    }, 'json')
    $('#enterName').modal('hide');
}

function checkTime(i) {
        return (i < 10) ? "0" + i : i;
    }

function startTime() {
    var today = new Date(),
        h = checkTime(today.getHours()),
        m = checkTime(today.getMinutes()),
        s = checkTime(today.getSeconds());
    document.getElementById('time').innerHTML = h + ":" + m + ":" + s;
    t = setTimeout(function () {
        startTime()
    }, 500);
}