$(function(){

	/*********************************/
	/*       Affectation du menu     */
	/*********************************/
	$('#btn-start-resto').click(function() {startResto()});

    fetchParticipant();
});

function startResto() {
    console.log('startResto');
    // vérifie si on a un cookie, si non on en créera un.
    makeMyCookie();
    //$.post('rest/tirages/', function() {log('chargé')}, 'json');
}

function fetchParticipant() {
    console.log('zob');
    // Recherche le cookie nommé "participant".
    // Si trouvé et toujours valide => rien à faire
    // Sinon, appeler le service rest participants pour initialiser un nouveau cookie de participation.
    var pUuid = Cookies.get('participant');
    if (pUuid == null) {
        $('nav.navbar').hide();
    } else {
        console.log('hoho');
        $('#p-name').text("ZARMA");
        // GET participant with that cookie
        $.get("rest/participants/"+pUuid, function(resp){
                $('#p-name').text("Bonjour "+resp.nom+". Il est ").append("<span id='time'></div>").append(" Bientôt l'heure de manger !");
                $('nav.navbar').show();
                startTime();
             }, 'json');
    }
}

function makeMyCookie() {
    // TODO modale pour saisir le nom
    $.post('rest/participants/', {'nom': 'César'}, function(resp) {
        Cookies.set('participant', resp.uuid);
        fetchParticipant();
    }, 'json')
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