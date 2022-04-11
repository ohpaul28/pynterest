# Pynterest!

## Pynterest: Table of Contents
1. Link to live site
2. About it!
3. Try it out!
4. Planned Technologies
5. Features
6. Wireframes
7. Screenshots



## [Pynterest Live Site](https://i1.sndcdn.com/avatars-000198787410-02xwfu-t500x500.jpg)



## About it!

Pynterest is a clone of Pinterest (who would've known). The app will allow users to post, update, or delete photos, explore photos that they may have interest in or photos of similarity via "Pyns". They should also be shown a profile page that will host photos they have added to their 'Saved' category and photos they themselves have posted. The profile page should also contain the "Pyns" they have attached to their own profile.

## Try it out!
1. Clone this repository

    ```bash
    git clone git@github.com:ohpaul28/pynterest.git
    ```

2. Install dependencies

    ```bash
    pipenv install --dev -r dev-requirements.txt && pipenv install -r requirements.txt
    ```

3. Create a **.env** file based on the .env.example file with credentials of your choice.

4. Setup your PostgreSQL user, password and database to match your chosen credentials in the .env file.

5. Enter your shell environment, upgrade and seed your database, and run your flask app

    ```bash
    pipenv shell
    ```

    ```bash
    flask db upgrade
    ```

    ```bash
    flask seed all
    ```

    ```bash
    flask run
    ```

6. To run the React App, go inside the `react-app` directory, `npm install` and `npm start`. This should open your browser automatically but if not, you may navigate to `localhost:3000` to access the application.




## Planned Technologies

<p float="left">
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" style="width:75px;" />
  &nbsp;
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flask/flask-original.svg" style="width:75px;" />
  &nbsp;
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" style="width:75px;" />
  &nbsp;
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg" style="width:75px;" />
  &nbsp;
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" style="width:75px;" />
  &nbsp;
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/heroku/heroku-plain.svg" style="width:75px;" />
  &nbsp;
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-plain-wordmark.svg" style="width:75px;"/>
  &nbsp;
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-plain-wordmark.svg" style="width:75px;" />
  &nbsp;
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-plain.svg" style="width:75px;" />
  &nbsp;
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/aftereffects/aftereffects-original.svg" style="width:75px;" />
  &nbsp;
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/illustrator/illustrator-line.svg" style="width:75px;" />
  &nbsp;
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/xd/xd-line.svg" style="width:75px;" />
  &nbsp;
    
   ![flask-removebg-preview](https://user-images.githubusercontent.com/90789014/162850802-69d3cdfb-bb0f-41b6-b5b8-366a216430ac.png)

</p>


## Features

 - The home page will display photos of interest to the signed in user or if not signed in, random photos from the database.
 - Users can create, read, update, or delete photos.
 - Users can create, read, update, or delete comments.
 - Users can add "Pyns" to their profile to update their "home" feed.
 - Users can follow other users to see their posts.


## Screenshots

<img src="https://i1.sndcdn.com/avatars-000198787410-02xwfu-t500x500.jpg" style="width: 600px;"/>
