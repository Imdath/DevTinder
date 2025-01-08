# DevTinder APIs

## authRouter

- POST /signup
- POST /login
- POST /logout

## profileRouter

- GET /profile/view
- PATCH /profile/edit
- PATCH /profile/password // Forgot Password API

## connectionRequestRouter

- POST /request/send/:status/:userId (ignored or interested)
- POST /request/review/:status/:requestId (accepted or rejected)

## userRouter

- GET /user/requests/received
- GET /user/connections
- GET /user/feed - Gets you the profiles of other users on platform

Status: ignore, interested, accepted, rejected
