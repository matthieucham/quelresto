import django
import json
from rest_framework.test import APITestCase
from django.contrib.auth.models import User

from quelresto_app.models import RestoModel


class QuelrestoTests(APITestCase):
    def setUp(self):
        django.setup()

        testuser1 = User()
        testuser1.username = 'testuser1'
        testuser1.password = 'testuser1'
        testuser1.email = 'u1@test.com'
        testuser1.save()

        testuser2 = User()
        testuser2.username = 'testuser2'
        testuser2.password = 'testuser2'
        testuser2.email = 'u2@test.com'
        testuser2.save()

        restoA = RestoModel()
        restoA.nom = 'A'
        restoA.save()

        restoB = RestoModel()
        restoB.nom = 'B'
        restoB.save()

        restoC = RestoModel()
        restoC.nom = 'C'
        restoC.save()

    # On peut accèder à la liste des restos
    def test_list_resto(self):
        response = self.client.get('/quelresto/restos/')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.data), 3)
        self.assertEqual(response.data, [{'id': 1, 'nom': 'A'}, {'id': 2, 'nom': 'B'}, {'id': 3, 'nom': 'C'}])

    # On ne peut pas créer de tirage si on n'est pas loggé
    def test_creer_tirage_echec(self):
        response = self.client.post('/quelresto/tirages/')
        self.assertEqual(response.status_code, 401)

    # On peut initialiser un tirage après login. On est master de ce tirage
    def test_creer_tirage(self):
        response = self.init_tirage('testuser1')
        self.assertEqual(response.data.get('etat'), 'OPEN')
        self.assertEqual(len(response.data.get('selections')), 0)
        self.assertEqual(len(response.data.get('participants')), 0)
        self.assertEqual(response.data.get('master'), 'testuser1')

    # On ne peut pas terminer un tirage tant que personne n'a choisi
    def test_terminer_tirage_echec(self):
        self.init_tirage('testuser1')
        try:
            self.client.post('/quelresto/tirages/1/shuffle/')
            self.fail('Aurait du échouer')
        except AssertionError:
            pass

    # On peut envoyer ses choix sur un tirage en court. On ne voit pas les choix des autres.
    def test_envoi_selections(self):
        tid = self.init_tirage('testuser1').data.get('id')
        selections_list = [{'nom': 'A'}, {'nom': 'B'}, {'nom': 'C'}]
        response = self.client.post('/quelresto/tirages/%s/' % tid,
                                    data=json.dumps({'selections': selections_list}),
                                    content_type='application/json')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.data.get('participants')), 1)
        self.assertTrue('testuser1' in response.data.get('participants'))
        self.assertEqual(len(response.data.get('selections')), 3)
        self.logout()
        # # Que voit un visiteur anonyme ?
        # response = self.client.post('/quelresto/tirages/%s/' % tid)
        # self.assertEqual(response.status_code, 200)
        # self.assertEqual(len(response.data.get('master')), 'testuser1')
        # self.assertEqual(len(response.data.get('participants')), 1)
        # self.assertEqual(len(response.data.get('selections')), 0)
        self.login('testuser2')
        selections_list = [{'nom': 'A'}]
        response = self.client.post('/quelresto/tirages/%s/' % tid,
                                    data=json.dumps({'selections': selections_list}),
                                    content_type='application/json')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.data.get('participants')), 2)
        self.assertTrue('testuser1' in response.data.get('participants'))
        self.assertTrue('testuser2' in response.data.get('participants'))
        self.assertEqual(len(response.data.get('selections')), 1)
        # Il faut être master pour terminer le tirage. Après tirage, des statistiques sont présentées.
        response = self.client.post('/quelresto/tirages/%s/shuffle/' % tid)
        self.assertEqual(response.status_code, 403)
        self.logout()
        self.login('testuser1')
        response = self.client.post('/quelresto/tirages/%s/shuffle/' % tid)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data.get('etat'), 'CLOSE')
        self.assertTrue(response.data.get('choix') in ['A', 'B', 'C'])
        stats = response.data.get('statistiques')
        self.assertEquals(stats.get('votes').get('A'), 2)
        self.assertEquals(stats.get('votes').get('B'), 1)
        self.assertEquals(stats.get('votes').get('C'), 1)
        self.assertEquals(stats.get('total'), 4)
        self.assertEquals(len(stats.get('selections').get('testuser1')), 3)
        self.assertEquals(len(stats.get('selections').get('testuser2')), 1)

    def login(self, un):
        user = User.objects.get(username=un)
        self.client.force_authenticate(user=user)

    def logout(self):
        self.client.force_authenticate()

    def init_tirage(self, mastername):
        self.login(mastername)
        response = self.client.post('/quelresto/tirages/')
        self.assertEqual(response.status_code, 201)
        return response
