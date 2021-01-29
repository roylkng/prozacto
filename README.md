Pre-requisites
Requires mongodb running locally
Requres node vesion 10 or above.

Steps to run the app

1) Run backend server
#go to prozacto directory
$ cd prozacto
# install backend dependecies
$ npm i
# start server
$ npm start



Notes
Have used JWT token for authentication, 2 auth can be added by comparing login device and requesting otp on mail or sms, quite simple to implement but that would require external service.
API payload verification is set true for now.
Document can be shared with any doctor and can also be attached with appointment.
Document can also be uploaded by doctor it can be extended to support prescriptions and can ad external API it order it(have added address in user level)
Shared a post man collection which has all the API's.
