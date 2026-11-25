# yesoa.pro — site vitrine YESOA Multi Service

Site statique (HTML/CSS/JS, sans build). Ouvrir `index.html` ou servir le dossier :

    npx serve .        # ou : python -m http.server

## À compléter
- Formulaire : Web3Forms (clé publique dans index.html, envoi vers contact@yesoa.pro).
- Email de contact (`contact@yesoa.pro`) et horaires si différents
- Photos avant/après : `assets/img/realisations/<nom>-<avant|apres>-<800|1376>.webp` (16:9, WebP)
- Mentions légales (`mentions-legales.html`)

## Déploiement
GitHub Pages via le workflow `.github/workflows/pages.yml` (à chaque push sur `main`).
Settings > Pages > Source : « GitHub Actions ».
Domaine yesoa.pro : ajouter un fichier `CNAME` contenant `yesoa.pro` et configurer le DNS
(4 enregistrements A vers 185.199.108-111.153, ou un CNAME `www` vers `<user>.github.io`).
