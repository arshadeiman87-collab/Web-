# CertiCanvas — Full Custom Certificate Maker

A responsive React + Vite certificate designer with a Canva-style workflow.

## Demo Login
- Email: `admin@demo.com`
- Password: `admin123`

## Included
- 6 ready-made certificate styles
- Upload Logo, Icon, Signature and Stamp
- Edit certificate title, recipient, course, organization, date and certificate ID
- Save issued certificate records in browser localStorage
- Search and reopen saved certificates
- Export certificate as PDF
- Print certificate
- Responsive web interface
- Electron desktop shell included

## Web setup
```bash
npm install
npm run dev
```
Open the Vite URL shown in the terminal.

## Web production build
```bash
npm run build
npm run preview
```

## Desktop demo
First build the web app:
```bash
npm run build
```
Then:
```bash
npm run desktop
```

For a distributable Windows installer, add a packaging tool such as electron-builder and configure its Windows target.

## Important
This demo stores records in browser localStorage. For a real multi-user production system, connect Supabase/MySQL/Node API for authentication, database storage, cloud assets, roles and backups.
