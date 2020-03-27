from quelresto_app.models import ParticipantModel

PARTICIPANT_KEY = 'participant'


class RecognizeParticipantMiddleware(object):

    def process_request(self, request):
        participant_uuid = request.COOKIES.get(PARTICIPANT_KEY, None)
        if participant_uuid:
            participant = ParticipantModel.objects.filter(uuid=participant_uuid).first()
            request.participant = participant
        else:
            request.participant = None
