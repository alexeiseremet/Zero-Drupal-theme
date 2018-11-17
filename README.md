# README #

***1. Install dependencies:***
* composer require drupal/crop
* composer require drupal/components
* composer require drupal/paragraphs
* composer require drupal/block_field

***2. Enable modules:***
* drush en crop -y
* drush en components -y
* drush en paragraphs -y
* drush en block_field -y
* drush en responsive_image -y
* drush en zero -y
* drush config-set system.theme default zero -y

***3. Install npm plugins and lunch task in assests/npm/ folder:***
* npm install
* npm run [dev / build]

***3. Lunch test task in assests/npm/ folder:***
* phantomjs --webdriver=4444 (optional, for local testing)
* npm run test
