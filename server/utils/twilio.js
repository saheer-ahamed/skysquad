import client from "twilio";
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
let serviceId;

const createService = () => {
    client(accountSid, authToken).verify.v2.services.create({ friendlyName: 'Sky Squad My Events' })
        .then(service => {
            console.log(`twilio service created`);
            serviceId = service.sid;
        })

};

export const sendOtp = (mobile) => {
    return new Promise((resolve, reject) => {
        client(accountSid, authToken).verify.v2.services(serviceId)
            .verifications
            .create({ to: `+91${mobile}`, channel: 'sms' })
            .then(verification => resolve(true))
            .catch(err => reject(false));
    })
}

export const verifyOtp = (mobile, code) => {
    return new Promise((resolve, reject) => {
        console.log(mobile);
        client(accountSid, authToken).verify.v2.services(serviceId)
            .verificationChecks
            .create({ to: `+91${mobile}`, code: code })
            .then(verification_check => {
                if (verification_check.status === "approved" && verification_check.valid === true) {
                    console.log('set');
                    resolve(true);
                }
                else {
                    console.log('g');
                    reject(false);
                }
            }).catch(err => {reject(err)})
    })
}


export default createService;
