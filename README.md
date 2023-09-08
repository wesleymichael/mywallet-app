# My Wallet - Your Digital Wallet

Manage your finances with ease using My Wallet, an intuitive app designed to assist you in managing your personal finances. Keep track of your expenses, check your balance, and plan your budget effectively.

# Deployment
[Feel free to explore!](https://mywallet-rho.vercel.app)

<div>
  <p align="center">
    <img src="public/images/mywallet-usage-mobile.gif" width="300" alt="Mobile Usage" />
  </p>
  <p align="center">
     <img src="public/images/mywallet-usage-tablet.gif" alt="Tablet Usage" />
  </p>
</div>

<br>

## About

Welcome to our financial management app! Here's a brief overview of what we offer:

- 👤 **Secure Sign-in**: Create your account with confidence using your email, password, and name, ensuring your data remains protected right from the start.

- 👤 **Easy Sign-up**: Access your account effortlessly by using your registered email and password, backed by robust security measures.

- 💳 **Track Your Financial Transactions**: Record and manage your financial transactions with ease, allowing you to stay organized and in control.

- 💳 **Monitor Your Balance**: Keep a close eye on your account balance in real-time, so you always know where your finances stand.


## Technologies
The following tools and frameworks were used in the construction of the project:<br>

<p>
  <img style='margin: 5px;' src='https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB'>
  <img style='margin: 5px;' src='https://img.shields.io/badge/axios%20-%2320232a.svg?&style=for-the-badge&color=informational'>
  <img style='margin: 5px;' src='https://img.shields.io/badge/styled-components%20-%2320232a.svg?&style=for-the-badge&color=b8679e&logo=styled-components&logoColor=%3a3a3a'>
  <img style='margin: 5px;' src="https://img.shields.io/badge/react_route%20-%2320232a.svg?&style=for-the-badge&logo=react&logoColor=%2361DAFB"/>
  <img style='margin: 5px;' src='https://img.shields.io/badge/react-icons%20-%2320232a.svg?&style=for-the-badge&color=f28dc7&logo=react-icons&logoColor=%2361DAFB'>
</p>


## How to run
To run this application, follow these steps:

1. Clone the repository to your local machine.

   ```bash
   git clone https://github.com/wesleymichael/mywallet-app.git
   ```

2. Install project dependencies:

   ```bash
   npm install
   ```

3. Clone the back-end repository at [mywallet-server](https://github.com/wesleymichael/mywallet-server.git)
   
4. Follow instructions to run back-end at [mywallet-server](https://github.com/wesleymichael/mywallet-server.git)

5. Configure the environment variable in this front-end repository and insert the server's URL when running the back-end. Follow these steps:

    - In the directory of your front-end project, check if there is a file called .env. If it doesn't exist, create a new file with that name;
    - Open the `.env` and set the REACT_APP_API_URL variable to the URL of the back-end server;
    - Here's an example:

       ```bash
       REACT_APP_API_BASE_URL=http://localhost:5000
       ```  
    -  Make sure to replace http://localhost:5000 with the correct URL of the back-end server if you've made changes to the default server port.

6. Start the front-end aplication:

   ```bash
   npm start
   ```

## Contributions

Contributions are welcome! Feel free to open issues and send pull requests to improve this project.
