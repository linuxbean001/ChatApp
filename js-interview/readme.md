## Chat Application Backend:

This is a simple Koa backend that runs on http://localhost:3001. The only api endpoint available is /comments

You can check the code yourself and figure out how it works. I suppose you'll be working on the API too, so it is a useful practice too.

But essentially we would like you to create a simple create-react-app (or any other way if you prefer) and work on a simple UI where you can send, receive chat messages. Again there are no websockets, just standard REST. Just a note that every time you send a request it needs to have a x-www-form-url-encoded Content-Type header.

Tasks:

1. User should be able to send messages.
2. User should see messages update on screen, yours and theirs.
3. Messages should have a timestamp near them
4. Chat should update and work in different browser windows.
5. Optionally style it nicely, would like to see how you style your components. But its not that important really. Do it if you fancy
6. Error handling in the app is a bonus.
7. Being able to delete messages is a bonus.
8. Being able to edit previous messages is an extra bonus
9. Have fun :)
