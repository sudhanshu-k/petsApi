# petsApi
#### API that takes an excel file as input, parses it and stores the data in the database.<br>

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
Then, excel is parsed using xlsx package. First, we use XLSX.read() function to parse excel. Then, we store the name of sheets and create an array to store the response to send back. We itterate over all the sheets and convert their data to json form and we call create() method with the json data and store the returned object in our array. If no error occurs, we send back the array as response.<br>