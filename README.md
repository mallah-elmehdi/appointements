# Set up DB envirement on Docker
### 1 - Pull mongoDB image
```docker pull mongodb/mongodb-community-server:latest```
### 2 - Create container
```docker run --name mongodb -p 27017:27017 -d mongodb/mongodb-community-server:latest```
### 3 - Run the container
```docker run --name cleanAndSealDentalProgramDB -p 27017:27017 -d mongodb/mongodb-community-server:latest```

# Run the Back End
```cd back-end && npm i && npm start```

# Run the Front End
```cd front-end && npm i && npm start```

# Access the app via
```http://localhost:5173/```
