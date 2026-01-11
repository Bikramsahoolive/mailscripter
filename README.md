# MAILEX


## Features

`mailex` is a powerful and easy-to-use Node.js module designed to handle and automate email-related tasks in your applications. With `mailex`, you can easily send emails and attachments.

## Installation

To install the package, run the following command:

```bash
npm install mailex
```

## Usage

### Using ES6 import.
```js
import {Mailex} from 'mailex';

```

### Using CommonJS require.
```javascript
const {Mailex} = require('mailex');
```


### How to get script-URL.

To get your script-URL,
 Goto [Google Apps Script](https://script.google.com)  and login with your gmail you want to use for send email.

then create a New Project,
and name the project.
then paste the code given below and click save button.

```js

function doGet() {
  return ContentService
    .createTextOutput("GET Method Not Allowed")
    .setMimeType(ContentService.MimeType.TEXT);
}

function doPost(e) {
  try {
    if (!e || !e.parameter) {
      throw new Error("No POST data received");
    }

    var p = e.parameter;

    var recipient = p.recipient;
    var cc = p.cc || "";
    var bcc = p.bcc || "";
    var subject = p.subject;
    var htmlBody = p.body;

    if (!recipient || !subject || !htmlBody) {
      throw new Error("Missing required fields");
    }

    // Handle base64 attachments
    var attachments = [];
    if (p.files) {
      var files = JSON.parse(p.files);

      files.forEach(function(file) {
        var blob = Utilities.newBlob(
          Utilities.base64Decode(file.base64),
          file.mimeType,
          file.name
        );
        attachments.push(blob);
      });
    }

    MailApp.sendEmail({
      to: recipient,
      cc: cc,
      bcc: bcc,
      subject: subject,
      htmlBody: htmlBody,
      attachments: attachments
    });

    // Response
    return ContentService
      .createTextOutput(JSON.stringify({
        status: "success",
        message: "Email sent successfully"
      }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    // Error → HTTP 500 (Apps Script limitation workaround)
    throw new Error(JSON.stringify({
      status: "failure",
      message: err.message
    }));
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
const mailex = new Mailex('your-script-URL');//"https://script.google.com/xxxxxxxxxxxxxxx";

```



## Sending an Email using callback

To send an email, use the "sendMail()" method. This method requires two parameters:

emailDetails: An object containing the following properties:

```bash
{
    email: "The recipient's email address",
    cc: "The recipient's email address", (optional)
    bcc: "The recipient's email address", (optional)
    subject: "The subject of the email",
    content: "The content of the email/HTML",
    files: [{name:"File name",mimeType:"File Mimetype",base64:'File Base64 string'}],Total Size =25mb RAW~18mb (optional)
}
```


callback function(Optional): A function that receives one parameter, which returns the response of the mail send status.

```javascript
  const emailDetails = {
  email: 'recipient@example.com',
  subject: 'Hello from mailscript',
  content: 'This is a test email using mailscript Text/ HTML'
};

mailex.sendMail(emailDetails, (response) => {
    console.log(response) //return a object {status:'success':message:'Email sent successfully.'}
});
```


## Sending an Email using Promise

Alternatively, you can send an email using the "sendMailAsync()" method, which returns a promise. It takes one parameter, an emailDetails : An object containing the following properties:

```bash
{
    email: "The recipient's email address",
    cc: "The recipient's email address", (optional)
    bcc: "The recipient's email address", (optional)
    subject: "The subject of the email",
    content: "The content of the email/HTML",
    files: [{
    name: "File name",
    mimeType: "File Mimetype (image/jpeg, application/pdf)",
    base64: "File Base64 string",}],Total Size =25mb RAW~18mb (optional)
    }]
}
```
You can handel the promise with `.then()` and `.catch()` or with `async/await`.


```js

const emailDetails = {
    email: "recipient@example.com",
    subject: "Your Email Subject",
    content: `This is the content of the email as Text/ HTML.`
};

mailex.sendMailAsync(emailDetails)
    .then(response => {
        console.log('Mail send status:', response); //return a object {status:'success':message:'Email sent successfully.'}
    })
    .catch(error => {
        console.error('Failed to send email:', error);
    });
```

### This module ignore send email for domain test.com/ test.in

## Contact 

For any question or concerns, Please contact the maintainer: 
-[Bikram Sahoo](mailto:bikramsahoo@live.in)