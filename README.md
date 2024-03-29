# storaLink-App


- to start the project: 

## npm install
## npx expo start


if encouter error regarding typescript: 
- (Ctrl+Shift+P or Command+Shift+P) and searching for "TypeScript: Restart TS Server."

## Create local Db

### Specify a Directory

1. Create a new directory:
    ```bash
    mkdir ~/my_mongo_db
    ```

2. Run MongoDB with `--dbpath` (if you put db in Code/storalink_db):
   *use absolute path*
    ```bash
    mongod --dbpath=./Code/storalink_db
    ```

3. After updating the path, run like this (if you put db in Code/storalink_db):
```
mongod --dbpath=./Code/storalink_db
```
---
## Get Dump from Cloud MangoDB:

Copy a MongoDB Atlas database to your local machine for testing, you can use the `mongodump` and `mongorestore` utilities. Here's how:

### Step 1: Install MongoDB Command Line Tools
If you haven't installed the MongoDB command line tools, you can download them from the [official MongoDB website](https://www.mongodb.com/try/download/database-tools).

### Step 2: Get MongoDB Atlas Connection String
1. Log in to your MongoDB Atlas account.
2. Navigate to your cluster dashboard.
3. Click on the "CONNECT" button.
4. Choose "Connect using MongoDB Compass" to get the connection string.

The connection string will look something like this:
```
mongodb+srv://<username>:<password>@cluster0.mongodb.net/<dbname>?retryWrites=true&w=majority
```

### Step 3: Use `mongodump` to Download the Database
Open your terminal and run the following command:
```bash
mongodump --uri "mongodb+srv://<username>:<password>@cluster0.mongodb.net/<dbname>?retryWrites=true&w=majority" --out /path/to/output/folder
```
* this output folder is better not be in your desinated database folder, this is only a dump *
  
Replace `<username>`, `<password>`, `<dbname>`, and `/path/to/output/folder` with your actual MongoDB Atlas username, password, database name, and the folder where you want to store the dump.

### Step 4: Use `mongorestore` to Restore the Database Locally
After you've downloaded the database, you can restore it to your local MongoDB instance using the following command:
```bash
mongorestore --db database/path  ./dump/path
```

### Step 5: Run local db: 
```
mongod --dbpath=./Code/storalink_db
```



### Current Stage/News
1. beta testing (version 4)
2. we will be employing https://tutorial.docusaurus.io/docs/intro for documentation soon
----- 
