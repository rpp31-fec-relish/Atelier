# Atelier
Team Relish's Front-End Capstone (FEC) Project

## Overview
Atelier is a fully-functioning front-end web application modeling an e-commerce platform.

## Table of Contents
* [Overview](https://github.com/rpp31-fec-relish/Atelier#overview)
* [Description](https://github.com/rpp31-fec-relish/Atelier#description)
* [Installation](https://github.com/rpp31-fec-relish/Atelier#installation)
* [Usage](https://github.com/rpp31-fec-relish/Atelier#usage)
* [Team Members](https://github.com/rpp31-fec-relish/Atelier#team-members)
* [Roadmap](https://github.com/rpp31-fec-relish/Atelier#roadmap)

## Description
Atelier is made up of 4 widgets--Overview, Related Products & Outfits, Questions & Answers, and Reviews.

The `Overview` widget features the currently-viewed product's image, its styles, an 'Add To Cart' and 'Favorite' button with ways to select specific styles and quantities, and other pertinent information (product description, average reviews, category, cost, etc.). Upon clicking the 'Favorite' button, the currently-viewed product will be added to the 'Your Outfits' carousel.

The `Related Products & Outfits` widget features two carousel sliders--'Related Products' and 'Your Outfits'. The former generates entries for all products related to the currently-viewed product. When clicking the star icon at the top left-hand corner, a comparison modal pops up with features of the currently-viewed product and the product selected. The latter carousel always begins with an option to add or remove the currently-viewed product into 'Your Outfits'. Clicking the 'x' icon will remove the selected product from 'Your Outfits'.

The `Questions & Answers` widget features a functional search bar and existing questions and answers based on the currently-viewed product. Within the Q&A section, users are able to click 'More Answered Questions' to populate more questions if available, react to a provided question or answer whether it was helpful or worth reporting, and an 'Add Answer' and 'Add A Question +' button which pops up a modal form. Both forms take the user's name, e-mail, and question/answer, in addition to a method of uploading files to the 'Add Answer' form.

The `Reviews` widget features a left-hand informational field of the currently-viewed products, including the ratio to which people have recommended the product, a breakdown of how frequently the product was reviewed within a 1-5 rating scale (can be clicked to filter through reviews with certain ratings), and the average consensus on the product's fit, length, comfort, and quality. The middle column of this widget displays the reviews of the currently-viewed product, which can be toggled by 'Most Relevant', 'Newest', and 'Helpful'. The 'More Reviews' button generates more reviews if they exist, and the 'Create Review' button opens a modal window with a form to create a new review. The form expects a rating out of 5 stars, whether the user would recommend the product, a summary and body, the user's name and e-mail, and other ratings based on the fit, length, comfort, and quality.

## Installation
`npm install` all dependencies.

`npm run webpack` & `npm start` to run the app.

`npm test` for testing.

## Usage
Reference as a front-end framework for your own e-commerce applications!

## Team Members
Clayton Watterson -- *Overview*

Mary Miyamoto -- *Related Products & Outfits*

Juan Manuel Acosta -- *Questions & Answers*

Michael Pollens -- *Reviews*