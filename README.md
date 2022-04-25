# Pynterest!

## Pynterest: Table of Contents
1. Link to live site
2. About it!
3. Try it out!
4. Planned Technologies
5. Features
6. Wireframes
7. Screenshots



## [Pynterest Live Site](https://aa-pynterest.herokuapp.com)



## About it!

Pynterest is a clone of Pinterest (who would've known) made using a Javascript frontend with React-Redux and a Python backend with Flask, SQLAlchemy, and PSQL. The app will allow users to post, update, or delete photos, explore photos that they may have interest in or photos of similarity via "Pyns". They should also be shown a profile page that will host photos they have added to their 'Saved' category and photos they themselves have posted. The profile page should also contain the "Pyns" they have attached to their own profile.

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
  <img src="https://user-images.githubusercontent.com/90789014/162850802-69d3cdfb-bb0f-41b6-b5b8-366a216430ac.png" style="width:75px;" />
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
</p>


## Features

 - The home page will display photos of interest to the signed in user or if not signed in, random photos from the database.
 - Users can create, read, update, or delete Boards(photo albums)
 - Users can create, read, update, or delete Pyns(photos).
 - Users can create, read, or delete comments.
 - Users can add or remove Pyns from their Boards.
 - Users can browse all the Pyns or Boards in the database.


## Screenshots

### Login 
![image](https://user-images.githubusercontent.com/90789014/165000791-9e6e2367-cceb-468d-bd83-2766adfb8ecc.png)

### Sign Up
![image](https://user-images.githubusercontent.com/90789014/165000799-fe166729-c386-4663-bb03-e1b2bea4ee6e.png)

### Homepage(not logged in)
![image](https://user-images.githubusercontent.com/90789014/165000783-91f4d853-a481-4c3e-8094-1d5875ac9c04.png)

### Homepage/Pyns Tab(logged in)
![image](https://user-images.githubusercontent.com/90789014/165000855-8c48b929-d444-41ae-96a6-d8c34d47bc9a.png)

### Boards Tab
![image](https://user-images.githubusercontent.com/90789014/165000838-b3d4ac86-71d4-4450-b9be-5f24feaeab44.png)

### Single Pyn // Comments
![image](https://user-images.githubusercontent.com/90789014/165000868-e5825921-0c95-4dce-9e2c-b7bbfa996a9a.png)

### Posting a Comment
![image](https://user-images.githubusercontent.com/90789014/165000942-b0689bd5-0925-477a-9e50-d9ad3cf551ca.png)

### Deleting a Comment
![image](https://user-images.githubusercontent.com/90789014/165000960-6261383d-5a03-4b75-8670-d9050dfcb752.png)

### Adding to a Board
![image](https://user-images.githubusercontent.com/90789014/165000994-4ed82af6-9716-4f14-8488-49fb57fee19a.png)

### User Profile Page
![image](https://user-images.githubusercontent.com/90789014/165001004-c7018c74-cd08-477d-97ba-ea5cb36fcb24.png)

### Creating a Pyn
![image](https://user-images.githubusercontent.com/90789014/165001034-cb91b29d-0c1a-40f3-8a1b-07e1ff817f39.png)

### Editing a Pyn
![image](https://user-images.githubusercontent.com/90789014/165001045-6a6422f2-484a-4542-b2c5-efc9aa35d340.png)

### Deleting a Pyn
![image](https://user-images.githubusercontent.com/90789014/165001054-01263e3a-be71-4ea9-8ccf-e5cc73bdb130.png)

### Creating a Board
![image](https://user-images.githubusercontent.com/90789014/165001060-d3a6809d-50f4-45f0-88c0-37108c209a01.png)

### Editing a Board
![image](https://user-images.githubusercontent.com/90789014/165001068-284fc6f1-3d6e-4aee-aafb-b25ccfd14368.png)

### Deleting a Board
![image](https://user-images.githubusercontent.com/90789014/165001075-483f77d6-1f94-4504-9422-bc5b36bfe049.png)


## Future Developments

- User follows
- Chat between users
- User favorites
- Infinite scrolling
- Multiple image uploads
- Download/share links
- Slideshow splash page like Pinterest's
