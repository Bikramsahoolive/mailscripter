# MailScripter


## Features

`mailscripter` is a powerful and easy-to-use Node.js module designed to handle and automate email-related tasks in your applications. With `mailscripter`, you can easily send emails both Synchronously and Asynchronously.

## Installation

To install the package, run the following command:

```bash
npm install mailscripter
```

## Usage

### Using ES6 import.
```js
import {mailScripter} from 'mailscripter';

```

### Using CommonJS require.
```javascript
const {mailScripter} = require('mailscripter');
```


### Get script-string

To get your-script-string,
 Goto [Google Apps Script](https://script.google.com)  and login with your gmail you want to use for send email.

then create a New Project,
and name the project.
then paste the code given below and click save button.

```js

function doGet(e){
  return ContentService.createTextOutput("Get Method Not Allowed!");
}

function doPost(e) {
  try {
    var formData = e.parameter;
    
    var recipient = formData.recipient;
    var subject = formData.subject;
    var htmlBody = formData.body;
    MailApp.sendEmail(recipient,subject,"",{htmlBody:htmlBody});
    return ContentService.createTextOutput(JSON.stringify({status:"success",message:"Email sent successfully."}))
                         .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({status:"failure",message:error.message}))
                         .setMimeType(ContentService.MimeType.JSON);
  }
}

```

then deploy with New Dployment.

Configure deployment by,

1. press the gear icon and chose Web app.
2. give New Description,
3. Chose Execute as Me(your-email),
4. Chose Who has access as Anyone 

then Click on deploy and Authorize access your gmail to send mail permision.
then chose your Gmail Account, Click on Advanced option and click on `Go to your project name (unsafe)`,
then click on Allow button.

copy the Web app `URL` and store securly in .env file.



## Create a new instance.

```javascript
const mailer = new mailScripter('your-script-string');//"https://script.google.com/xxxxxxxxxxxxxxx";

```



## Sending an Email with callback

To send an email, use the "sendMail()" method. This method requires two parameters:

emailDetails: An object containing the following properties:

```bash
{
email: "The recipient's email address",
subject: "The subject of the email",
content: "The content of the email"
}
```


callback function(Optional): A function that receives one parameter, which returns the response of the mail send status.

```javascript
  const emailDetails = {
  email: 'recipient@example.com',
  subject: 'Hello from mailscript',
  content: 'This is a test email using mailscript Text/ HTML'
};

mailer.sendMail(emailDetails, (response) => {
    console.log(response) //return a object {status:'success':message:'Email sent successfully.'}
});
```


## Sending an Email with Promise

Alternatively, you can send an email using the "sendMailAsync()" method, which returns a promise. It takes one parameter, an emailDetails : An object containing the following properties:

```bash
{
email: "The recipient's email address",
subject: "The subject of the email",
content: "The content of the email"
}
```
You can handel the promise with `.then()` and `.catch()` or with `async/await`.


```js

const emailDetails = {
    email: "recipient@example.com",
    subject: "Your Email Subject",
    content: `This is the content of the email as Text/ HTML.`
};

mailer.sendMailAsync(emailDetails)
    .then(response => {
        console.log('Mail send status:', response); //return a object {status:'success':message:'Email sent successfully.'}
    })
    .catch(error => {
        console.error('Failed to send email:', error);
    });
```

```HTML
<h3 style="color=red;">Also HTML is allowed in emailDetails.content</h3>
```

## Contact 

For any question or concerns, Please contact the maintainer: 
-[Bikram Sahoo](mailto:bikramsahoo@live.in)