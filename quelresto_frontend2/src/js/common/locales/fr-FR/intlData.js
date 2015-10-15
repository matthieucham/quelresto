var intlData = {
    'locales':  'fr-FR',
    'messages': {
        // Notify
        'notifyError': 'Une erreur est survenue',

        'from': 'De',
        'to':   'Vers',
        'yes':  'Oui',
        'no':   'Non',

        'civility': {
            'mr':  'M.',
            'mme': 'Mme'
        },

        // Sidebar
        'menuMissives':               'Gestion des remises',
        'menuMissivesAll':            'Toutes',
        'menuMissivesError':          'En erreur',
        'menuMissivesRubis':          'Rubis',
        'menuMissivesDiamond':        'Diamond',
        'menuCreditors':              'Gestion des créanciers',
        'menuCreditorCreate':         'Créer un créancie',
        'menuCreditorsAll':           'Tous',
        'menuCreditorsMissivesError': 'Remises en erreur',
        'menuUsers':                  'Utilisateurs',
        'menuUserCreate':             'Créer un utilisateur',
        'menuUsersAll':               'Tous',
        'menuUsersInactives':         'Inactifs',
        'menuRights':                 'Gestion des droits',

        'btnSubmit':     'Envoyer',
        'btnContinue':   'Continuer',
        'btnAdd':        'Ajouter',
        'btnCancel':     'Annuler',
        'btnArchive':    'Archiver',
        'btnDelete':     'Supprimer',
        'btnCreate':     'Créer',
        'btnModify':     'Modifier',
        'btnUpdate':     'Valider',
        'btnBackToList': 'Retour à la liste',
        'btnBack':       'Retour',

        'tableNoData': 'Aucune donnée à afficher',

        'datepicker': {
            'close':           'Fermer',
            'prev':            'Précédent',
            'next':            'Suivant',
            'monthNames':      ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'],
            'monthNamesShort': ['Janv.', 'Févr.', 'Mars', 'Avril', 'Mai', 'Juin', 'Juil.', 'Août', 'Sept.', 'Oct.', 'Nov.', 'Déc.'],
            'dayNames':        ['dimanche', 'lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi'],
            'dayNamesShort':   ['dim.', 'lun.', 'mar.', 'mer.', 'jeu.', 'ven.', 'sam.'],
            'dayNamesMin':     ['D', 'L', 'M', 'M', 'J', 'V', 'S'],
            'weekHeader':      'Sem.',
            'dateFormat':      'dd/mm/yy',
            'firstDay':        1
        },

        'filter': {
            'labelReference':     'Référence',
            'labelName':          'Nom',
            'labelLastname':      'Nom',
            'labelFirstname':     'Prénom',
            'labelLogin':         'Login',
            'labelEmail':         'Email',
            'labelGender':        'Civilité',
            'labelFemale':        'Femme',
            'labelMale':          'Homme',
            'labelState':         'Status',
            'labelSiret':         'Siren/Siret',
            'labelType':          'Type',
            'labelTypeRubis':     'Rubis',
            'labelTypeDiamond':   'Diamond',
            'labelPermanentFail': 'Erreur permanente',
            'labelTemporaryFail': 'Erreur temporaire',
            'labelDateSend':      'Date d\'émission',
            'labelDateCreated':   'Date de création'
        },

        'permissionScopes': {
            'RUBIS':      'Rubis créancier',
            'DIAMOND':    'Diamond',
            'CRM':        'CRM',
            'OPTION':     'Paramétrage',
            'MANAGER':    'Gestion',
            'SUPERVISOR': 'Superviseur'
        },

        'offers': {
            'RUBIS':      'Rubis créancier',
            'CRM':        'CRM',
            'DIAMOND':    'Diamond'
        },

        'modal': {
            'addFilter':          'Ajouter un filtre',
            'filterSelected':     'Filtre choisi : ',
            'passwordWillBeSent': 'Créer l\'utilisateur :user: et envoyer son mot de passe à :mail: ?',
            'initPassword':       'Réinitialiser le mot de passe de :user: et l\'envoyer à :mail: ?',
            'activateUser':       'Activer l\'utilisateur :user: ?',
            'deactivateUser':     'Désactiver l\'utilisateur :user: ?'
        },

        'missives': {
            'title':              'Liste des remises',
            'tableTitle':         'Référence',
            'tableDDRNumber':     'Nombre de demandes',
            'paymentRequest':     'demande de règlement',
            'paymentRequests':    'demandes de règlement',
            'remittanceRequest':  'demande de remise',
            'remittanceRequests': 'demandes de remise'
        },

        'MissiveStates': {
            'PENDING':               'En attente',
            'WAITING_FOR_SIGNATURE': 'Signature en attente',
            'SIGNED':                'Signée',
            'SENT':                  'Envoyée',
            'PREPARED':              'Préparée',
            'STORED':                'Stockée',
            'TEMPORARY_FAIL':        'Echec temporaire',
            'PERMANENT_FAIL':        'Echec permament'
        },

        'creditors': {
            'title':           'Liste des créanciers',
            'tableTitle':      'Raison sociale',
            'tableSiret':      'Siret/Siren',
            'tableQxban':      'Comptes',
            'loadedCreditors': ':loadedRowCount: créanciers chargés sur :totalRowCount:'
        },

        'creditorCreate': {
            'title':         'Créancier',
            'panelCreditor': 'Identification du créancier',
            'panelAccounts': 'Compte de règlement',
            'panelEbics':    'Connexion EBICS',
            'panelOffers':   'Services',
            'panelUsers':    'Utilisateurs',

            'labelName':      'Raison sociale',
            'labelSiren':     'SIREN/SIRET',
            'labelAddress':   'Adresse',
            'labelICQX':      'ICQX',
            'labelEmail':     'Adresse mail',
            'labelHostId':    'Host ID',
            'labelPartnerId': 'Partner ID',
            'labelUserId':    'User ID',
            'activatedAt':    'Activé le',

            'errorName':         'La raison sociale est obligatoire',
            'errorAddress':      'L\'adresse est obligatoire',
            'errorSiret':        'Le siret est obligatoire',
            'errorICQX':         'Le ICQX est obligatoire',
            'errorMailRequired': 'L\'adresse mail est obligatoire',
            'errorMail':         'L\'adresse mail est incorrecte',
            'errorReference':    'Le libellé du contrat est obligatoire',
            'errorQxban':        'Le QXBAN est obligatoire',

            'notifyCreated':        'Le créancier a été créé',
            'notifyUpdated':        'Le créancier a été mis à jour',
            'notifyDeleted':        'Le créancier a été annulé',
            'notifyAccountDefault': 'Saisissez un compte de règlement par défaut',
            'notifyAccountQxban':   'IBAN invalide'
        },

        'users': {
            'title':                 'Liste des utilisateurs',
            'tableTitle':            'Nom',
            'tableEmail':            'Email',
            'tableLastLogin':        'Dernière connexion',
            'tableNoLogin':          'Aucune connexion',
            'notifyPasswordChanged': 'Le mot de passe utilisateur a été réinitialisé',
            'notifyUserActivated':   'Utilisateur activé',
            'notifyUserDeactivated': 'Utilisateur désactivé',
            'active':                'Actif',
            'inactive':              'Inactif'
        },

        'userCreate': {
            'title':       'Utilisateur',
            'panelUser':   'Identification de l\'utilisateur',
            'panelCreditors': 'Créanciers / Habilitations',
            'panelRights': 'Droits utilisateur',

            'labelLastname':  'Nom',
            'labelFirstname': 'Prénom',
            'labelLogin':     'Login',
            'labelEmail':     'Adresse mail',

            'errorLastname':     'Le nom est obligatoire',
            'errorFirstname':    'Le prénom est obligatoire',
            'errorLogin':        'Le login est obligatoire',
            'errorMailRequired': 'L\'adresse mail est obligatoire',
            'errorMail':         'L\'adresse mail est incorrecte',

            'notifyExists':     'L\'utilisateur est déjà associé',
            'notifyCreated':    'L\'utilisateur a été créé',
            'notifyAssociated': 'L\'utilisateur a été associé au créancier',
            'notifyUpdated':    'L\'utilisateur a été mis à jour',
            'notifyDeleted':    'L\'utilisateur a été désactivé'
        },

        'rightCreate': {
            'title':      'Profils de droits',
            'panelRight': 'Identification du profil',

            'labelName': 'Nom du profil',

            'errorName': 'Le nom du profil est obligatoire',

            'notifyCreated': 'Le profil a été créé',
            'notifyUpdated': 'Le profil a été mis à jour',
            'notifyDeleted': 'Le profil a été désactivé'
        }
    }
};

module.exports = intlData;
