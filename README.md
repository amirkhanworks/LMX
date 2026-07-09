# Luminox Automation Website

Full 6-page static site. Deploy on GitHub Pages.

## Files
```
index.html       Homepage
product.html     Smart Home Product
services.html    IoT Engineering Services
projects.html    Projects & Portfolio
about.html       About Fahad
contact.html     Contact & Book a Demo
css/style.css    Shared stylesheet
js/main.js       Navigation, filter, form, animations
404.html         Custom error page
```

## Deploy to GitHub Pages
1. Create a new GitHub repo (e.g. `luminoxautomation.github.io` or `luminox-website`)
2. Upload all files maintaining the folder structure
3. Go to repo Settings > Pages > Source: `main` branch, `/ (root)`
4. Site goes live at `https://yourusername.github.io/repo-name`

## Custom Domain (`luminoxautomation.com`)
1. Add a `CNAME` file in root containing: `luminoxautomation.com`
2. In your domain DNS, add: `CNAME www luminoxautomation.github.io`
3. In GitHub Pages settings, set custom domain

## Before Launch
- Replace `FORM_ENDPOINT` in `js/main.js` with your Formspree ID
  - Sign up at formspree.io, create a form, copy the endpoint URL
- Test all pages at mobile (375px) and desktop (1280px)

## Customisation
All colours are CSS variables in `css/style.css` `:root`
All real contact details are already embedded (Fahad's photo, email, phone, LinkedIn)
