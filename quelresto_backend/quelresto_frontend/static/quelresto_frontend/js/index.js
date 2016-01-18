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

	$('#btn-save-name').click(function() {
	    createParticipant($('#fld-username').val())
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
        makeMyCookie();
    }
    //$.post('rest/tirages/', function() {log('chargé')}, 'json');
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

function makeMyCookie() {
    $('#enterName').modal('show');
}

function createParticipant(name) {
    $.post('rest/participants/', {'nom': name}, function(resp) {
        Cookies.set('participant', resp.uuid);
        fetchParticipant();
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