# mailscripter

`mailscripter` is a powerful and easy-to-use Node.js module designed to handle and automate email-related tasks in your applications. With `mailscripter`, you can easily send emails.

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

click on gear icon and copy script id,

then click on + icon on libraries,
and configure library by pasting the script id and click on lookup.
and name the library.

then paste the code given below and click run button.

```js

function doGet(e){
  return ContentService.createTextOutput("Invalid Request Method GET.");
}
function doPost(e) {
  try {
    var formData = e.parameter; // Get form data from the POST request
    
    var recipient = formData.recipient;
    var subject = formData.subject;
    var body = formData.body;
    MailApp.sendEmail(recipient, subject, body);

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

1. giving Description,
2. execute as me(your-email),
3. who has access as Anyone ,

then deploy and authorize your gmail to send mail permision.

copy the Web App URL and store securly (eg:In .env file).



## Create new instance.

```javascript
const mailer = new mailScripter('your-script-string');//"https://script.google.com/xxxxxxxxxxxxxxx";

```



## Sending an Email

To send an email, use the "sendMail" method. This method requires two parameters:

emailObject: An object containing the following properties:
{
email: The recipient's email address.
subject: The subject of the email.
content: The content of the email.
}

callback function: A function that receives one parameter, which returns the response of the mail send status.

```javascript
  const emailDetails = {
  email: 'recipient@example.com',
  subject: 'Hello from mailscript',
  content: 'This is a test email using mailscript.'
};

mailer.sendMail(emailDetails, (response) => {
    console.log(response) //return a object {status:'success':message:'Email sent successfully.'}
});
```


## Sending an Email with a Promise

Alternatively, you can send an email using the "sendMailInPromise" method, which returns a promise. It takes one parameter, an emailObject : An object containing the following properties:

{
 email: The recipient's email address,
 subject: The subject of the email,
 content: The content of the email,
}

```js

const emailDetails = {
    email: "recipient@example.com",
    subject: "Your Email Subject",
    content: `This is the content of the email.`
};

mailer.sendMailInPromise(emailDetails)
    .then(response => {
        console.log('Mail send status:', response); //return a object {status:'success':message:'Email sent successfully.'}
    })
    .catch(error => {
        console.error('Failed to send email:', error);
    });
```


## Contact 

For any question or concerns, Please contact the maintainer:
-[Bikram Sahoo](<a href="mailto:bikramsahoo@live.in">bikramsahoo@live.in</a>). 