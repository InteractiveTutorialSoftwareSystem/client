# Interactive Tutorial System (Frontend)


# Table of contents
1. [Introduction](#introduction)
2. [Technologies Required](#technologies_required)
    1. [Installation](#installation)
        1. [Node.js](#install_node)
    2. [Version Check](#version_check)
        1. [Node.js](#version_check_node)
3. [Configuration & Setting Up](#setup)
    1. [Cloning Repository](#cloning_repository)
    2. [Installing Dependencies](#install_dependencies)
    3. [Environment File](#environment_file)
4. [Running the Application](#run_app)


## Introduction <a name="introduction"></a>
This repository contains the frontend development of the Interactive Tutorial System project.

Please note that the frontend should be run concurrently with the backend of the project, which can be found [here](https://github.com/InteractiveTutorialSystem/server). Do ensure that you have all the [required technologies](#technologies_required) installed on your machine before proceeding with the [setup](#setup).


## Technologies Required <a name="technologies_required"></a>
This project is created with the following technologies and versions.
- [Node.js] : >= 10.16

If you already have these technologies installed in your machine, follow the steps in the [Version Check](#version_check) segment to check the version installed in your machine. If you have yet to install any, please refer to the [Installation](#installation) segment.


### Installation <a name="installation"></a>
The following are methods to install the required technologies, namely Node.js.


#### Node.js <a name="install_node"></a>
Download the installation file from [link](https://nodejs.org/en/) and install Node.js. To avoid any errors, installing the latest Long Term Support version is recommended. Ensure that npm is installed as well.


### Version Check <a name="version_check"></a>
The following are methods you can use to check the version of your current technologies.


#### Node.js <a name="version_check_node"></a>
Open a command-line application and type in **either one** of the following commands:
```
node --version OR
node -v
```
If your current version of Node.js is older than **10.16.0**, [install](#install_node) the latest Long Term Support version.


## Configuration & Setup <a name="setup"></a>
After you have installed the required technologies, you can proceed to setup the project. If you have yet to install/update the required technologies, please proceed the [Technologies Required](#technologies_required) section to do so.


### Cloning Repository <a name="cloning_repository"></a>
Refer to this [link](https://docs.github.com/en/github/creating-cloning-and-archiving-repositories/cloning-a-repository-from-github/cloning-a-repository) for instructions on how to clone this repository. You can clone the repository using a command-line application or GitHub Desktop.

Alternatively, you can [download](https://github.com/InteractiveTutorialSystem/client/archive/refs/heads/main.zip) the repository.


### Installing Dependencies <a name="install_dependencies"></a>
To install the dependencies, run the following command from the root folder:
```
npm install
```


### Environment File <a name="environment_file"></a>
Create a `.env` file with the following fields in the root folder:
```
REACT_APP_AUTH_URL=''
REACT_APP_TUTORIAL_URL=''

REACT_APP_GOOGLE_CLIENT_ID=''

REACT_APP_STACKEXCHANGE_KEY=''
```
Enter the URLs of the backend Flask applications. An example could be `"http://localhost:5001"` for the `REACT_APP_AUTH_URL` and `"http://localhost:5002"` for the `REACT_APP_TUTORIAL_URL`.

Obtain the Google OAuth 2.0 Credentials from the [Google API Console](https://console.developers.google.com/). For the Authorised JavaScript origins, enter the domain of the application. This could be `http://localhost:3000`. For the Authorised redirect URIs, enter the URIs for OAuth registration and login. These could be `http://localhost:5001/oauth/register` and `http://127.0.0.1:5001/oauth/login`.

The StackExchange Key may be obtained from [Stack Apps](https://stackapps.com/apps/oauth/register).


## Running the Application <a name="run_app"></a>
Your setup is now configured and ready to run. Start the React application in development mode by running the following command from the root folder:
```
npm start
```

The frontend has now been successfully setup and ready to be used concurrently with the backend. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

Once you are done, press ```Ctrl``` + ```C``` to **terminate** the application server. 
