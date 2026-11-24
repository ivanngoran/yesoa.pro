# yesoa.pro — site vitrine YESOA Multi Service

Site statique (HTML/CSS/JS, sans build). Ouvrir `index.html` ou servir le dossier :

    npx serve .        # ou : python -m http.server

## À compléter
- Formulaire : créer une clé gratuite sur https://web3forms.com (avec l'email qui recevra les demandes)
  et remplacer `VOTRE_CLE_WEB3FORMS` dans index.html. Tant que ce n'est pas fait, le formulaire ouvre le client mail.
- Email de contact (`contact@yesoa.pro`) et horaires si différents
- Photos avant/après : remplacer les visuels temporaires de `assets/img/realisations/` (mêmes noms, format 3:2)
- Mentions légales (`mentions-legales.html`)

## Déploiement
GitHub Pages via le workflow `.github/workflows/pages.yml` (à chaque push sur `main`).
Settings > Pages > Source : « GitHub Actions ».
Domaine yesoa.pro : ajouter un fichier `CNAME` contenant `yesoa.pro` et configurer le DNS
(4 enregistrements A vers 185.199.108-111.153, ou un CNAME `www` vers `<user>.github.io`).
