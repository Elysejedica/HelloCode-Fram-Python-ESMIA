# HelloCode – Plateforme d’Apprentissage de la Programmation

HelloCode est une plateforme web pour apprendre la programmation à travers des leçons, quiz, exercices de code et suivi de progression.  
Le projet utilise **Django** (backend, API, admin) et **React** (frontend).

---

## Fonctionnalités principales

- Inscription et connexion utilisateur (modèle personnalisé)
- Parcours de leçons par langage
- Quiz interactifs et exercices de code (Python, JavaScript, Java)
- Suivi de la progression et badges
- Interface d’administration Django (gestion des contenus)
- Support du formatage Markdown/HTML pour les leçons (images, listes, etc.)
- Exécution sécurisée de code côté serveur

---

## Structure du projet

```
backend/
├── accounts/                 # Gestion des utilisateurs
│   ├── models.py            # Modèle User personnalisé
│   ├── serializers.py       # Sérialisation des données utilisateur
│   ├── views.py             # Vues pour authentification
│   └── urls.py              # Routes pour authentification
│
├── languages/               # Gestion des langages
│   ├── models.py            # Modèles pour les langages
│   ├── serializers.py       # Sérialisation des langages
│   ├── views.py             # Vues pour les langages
│   └── urls.py              # Routes pour les langages
│
├── learning/                # Gestion de l'apprentissage
│   ├── models.py            # Modèles pour leçons, quiz, exercices
│   ├── serializers.py       # Sérialisation des données d'apprentissage
│   ├── views.py             # Vues pour l'apprentissage
│   └── urls.py              # Routes pour l'apprentissage
│
└── hellocode/              # Configuration Django
|   ├── settings.py          # Paramètres du projet
|   ├── urls.py              # Routes principales
| └── wsgi.py              # Configuration WSGI
frontend/
├── src/
│   ├── pages/              # Pages de l'application
│   │   ├── HomePage.tsx    # Page d'accueil
│   │   ├── LessonPage.tsx  # Page de leçon
│   │   ├── ExercisePage.tsx # Page d'exercices (à créer)
│   │   └── ProfilePage.tsx # Page de profil
│   │
│   ├── components/         # Composants réutilisables
│   │   ├── common/         # Composants communs
│   │   │   ├── Layout.tsx  # Layout principal
│   │   │   └── Navbar.tsx  # Barre de navigation
│   │   │
│   │   └── learning/       # Composants d'apprentissage
│   │       ├── CodeEditor.tsx # Éditeur de code
│   │       └── Quiz.tsx    # Composant de quiz
│   │
│   ├── api/                # Services API
│   │   └── api.ts          # Configuration Axios
│   │
│   ├── contexts/           # Contextes React
│   │   └── AuthContext.tsx # Contexte d'authentification
│   │
│   ├── config.ts           # Configuration globale
│   └── App.tsx             # Composant principal
│
├── public/                 # Fichiers statiques
└── package.json            # Dépendances npm
```

---

## Installation

### 1. **Backend (Django)**

#### a) **Prérequis**
- Python 3.10+
- Java (pour l’exécution de code Java)
- Node.js (pour l’exécution de code JavaScript)
- (Optionnel) [Git](https://git-scm.com/)

#### b) **Installation des dépendances**

Depuis le dossier `backend` :

```sh
python -m venv venv
venv\Scripts\activate  # Sous Windows
pip install -r requirements.txt
```

**Si tu utilises l’édition riche dans l’admin, installe aussi :**
- Pour HTML :  
  ```sh
  pip install django-ckeditor
  ```
- Pour Markdown :  
  ```sh
  pip install django-markdownx
  ```

#### c) **Configuration Django**

- Ajoute `'ckeditor'` ou `'markdownx'` à `INSTALLED_APPS` dans `hellocode/settings.py` selon ton choix.
- Configure `MEDIA_ROOT` et `MEDIA_URL` si tu veux uploader des images.

#### d) **Migrations et superuser**

```sh
python manage.py makemigrations
python manage.py migrate
python manage.py createsuperuser
```

#### e) **Lancer le serveur**

```sh
python manage.py runserver
```

---

### 2. **Frontend (React)**

Depuis le dossier `frontend` :

```sh
npm install
npm start
```

**Pour le rendu Markdown côté React (optionnel mais recommandé) :**
```sh
npm install marked
```
Et dans ton composant :
```tsx
import { marked } from "marked";
<div dangerouslySetInnerHTML={{ __html: marked.parse(lesson.content) }} />
```

---

## Utilisation

- Accède à l’admin Django : [http://localhost:8000/admin/](http://localhost:8000/admin/)
- Ajoute des leçons, quiz, exercices, etc. (le champ de contenu supporte Markdown ou HTML selon ta config)
- Accède à l’interface utilisateur : [http://localhost:5173/](http://localhost:5173/)
- Inscris-toi, progresse, gagne des badges !

---

## Dépendances principales

### **Backend**
- Django
- djangorestframework
- djangorestframework-simplejwt
- django-cors-headers
- Pillow
- django-ckeditor **ou** django-markdownx (édition riche)
- (optionnel) markdownx ou ckeditor pour l’admin

### **Frontend**
- React
- Axios
- marked (pour le rendu Markdown)

---

## Exécution de code

- **Python** : exécuté dans un environnement restreint côté serveur
- **JavaScript** : exécuté via Node.js (doit être installé sur le serveur)
- **Java** : exécuté via javac/java (doit être installé sur le serveur)

---

## Personnalisation

- Pour ajouter des images ou du formatage dans les leçons, utilise le champ Markdown/HTML dans l’admin.
- Pour autoriser l’upload d’images, configure `MEDIA_ROOT` et `MEDIA_URL` dans `settings.py`.

---

## Auteurs

- Projet réalisé par [Ton Nom] dans le cadre de L3 IRD1 ESMIA

---

## Licence

Ce projet est open-source et libre d’utilisation à des fins éducatives.