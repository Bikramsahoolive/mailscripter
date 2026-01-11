export interface mailobj {
    email: string,
    cc: string,
    bcc: string,
    subject: string,
    content: string,
    files: [{
        name: string,
        mimeType: string,
        base64: string
    }]
}