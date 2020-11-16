
# Where'd All My Money Go?
[![License: Unlicense](https://img.shields.io/badge/license-Unlicense-blue.svg)](http://unlicense.org/)

## Description
A progressive web application that allows the user to track their spending and balance whether connected to the internet or not. If the user goes offline, they can still track their expenses and income. When they go back online the database will be updated.

This project utilizes MongoDB to store data regarding any transactions. IndexedDB is also used to store transactions that are logged while offline.

Webpack and Babel were used to bundle, transpile, and minify content to improve performance.


### Built With
- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [Webpack](https://www.npmjs.com/package/webpack/)
- [Webpack-PWA-Manifest](https://www.npmjs.com/package/webpack-pwa-manifest)
- [Babel](https://babeljs.io/docs/en/)
- [MongoDB](https://www.mongodb.com/)
- [Mongoose](https://www.npmjs.com/package/mongoose)
- [IndexedDB](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API)
- [ChartJs](https://www.chartjs.org/)
- [dotenv](https://www.npmjs.com/package/dotenv)
- [Nodemon](https://www.npmjs.com/package/nodemon)

![ScreenshotBudgetTracker](https://user-images.githubusercontent.com/61219066/97111682-a8fddb00-16b6-11eb-8d68-ae6e4a5c3b0b.jpg)


[Link to Deployed Project](https://whered-my-money-go.herokuapp.com/)


## Table of Contents
1. [Installation](#installation)
2. [Usage](#usage)
3. [License](#license)
4. [Contributing](#contributing)
5. [Questions](#questions)
6. [Credits](#credits)


## Installation
To install the necessary dependencies locally, run:
```
npm start
```


## Usage
To use the application, simply navigate to the deployed project and input your transactions. Your balance is displayed at the top of the page and you can input the name of your transactio and an amount. If it is a deposit, click the ```Add Funds``` button. If is it a withdrawal, click the ```Subtract Funds``` button.

Your transactions will be displayed below in a table and below that you will see a chart that shows how your balance has changed over time.

If you go offline, keep using it as normal. When you connect back to the internet, the database will be updated with any transactions that you logged while offline.


## License
This project is licensed under the **unlicense** license.


## Contributing
Have an idea for an improvement? Is something not working properly? Please submit an issue on GitHub. If you see an issue that you'd like to work on, shoot me an email or just submit a pull request.


## Questions
If you have any questions about this project or repository, please open an issue or contact me at [molly.kizer@gmail.com](mailto:molly.kizer@gmail.com).

You can find more of my work at GitHub under my username [LivesInRoom29](https://github.com/LivesInRoom29).


## Credits
* Thanks to the UNH Bootcamp instructor, TAs, and my tutor for the great instruction, resources, and support.
* Thanks to my classmates for all their questions in class and for sharing their experiences in study groups.
* Starter files for this app were provided by Trilogy education Services. (See commit #2, Oct. 18, ["Add Starter Files"](https://github.com/LivesInRoom29/Whered_All_My_Money_Go/commit/34b6d1b4ff0860e8961366ed6594512f092a2f29))