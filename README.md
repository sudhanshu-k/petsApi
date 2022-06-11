# petsApi
#### API that takes an excel file as input, parses it and stores the data in the database.

### Checkout: 
```
    https://testpetsapi.herokuapp.com/api/pet
```

## Libraries Used
1. **body-parser**: <br>
Node.js body parsing middleware.<br>
Parses incoming request bodies in a middleware before your handlers, available under the req.body property.

2. **dotenv**:<br>
Dotenv helps to load environment variables from a .env file into process.env.

3. **multer**:<br>
Multer is a node.js middleware for handling multipart/form-data , which this API have used for uploading files.

4. **nodemon**:<br>
nodemon is a tool that helps develop Node.js based applications by automatically restarting the node application when file changes in the directory are detected.

5. **xlsx**:<br>
Excel file parser.<br>

## An overview of how excel is being parsed<br>
This API uses multer middleware to upload excel file.<br>
Then, excel is parsed using xlsx package. First, it uses XLSX.read() function to parse excel. Then, stores the name of sheets and create an array to store the response to send back.
```javascript
        const excelFile = XLSX.read(req.file.buffer);
        const nameList = excelFile.SheetNames;
        var savedData = new Array();
```
Then itterates over all the sheets and convert their data to json form and calls create() method with the json data and store the returned object in our array. 
```javascript
        for (let i = 0; i < nameList.length; i++) {
            const jsonData = XLSX.utils.sheet_to_json(
                excelFile.Sheets[nameList[i]]
            );

            savedData.push(await Pets.create(jsonData));
        }
```
If no error occurs, it send back the array as response.<br>
```javascript
        return res.status(201).json(savedData);
```

## Installation and Setup
#### Requirments
You should have the following things installed in your device:
- git
- node
- postman, if you desire to test it.

#### Setup
- Clone Project
```
    git clone https://github.com/sudhanshu-k/petsApi.git
```

- Go to the project directory
```
    cd petsApi
```

- Install Dependencies
```
    npm install
```

- Create .env file, add following:

    * DB_CONN: Database link
    * PORT: Port to run on

- Run:
```
    npm start
```