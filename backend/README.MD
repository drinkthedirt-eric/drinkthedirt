### Run locally

```
npx run generate
npm start
```

### Deploy

Run the following commands:
```
aws ecr get-login-password --region us-west-2 | docker login --username AWS --password-stdin 518643290370.dkr.ecr.us-west-2.amazonaws.com
 docker build --tag drinkthedirt_backend .
 docker tag drinkthedirt_backend:latest 518643290370.dkr.ecr.us-west-2.amazonaws.com/drinkthedirt_backend:latest
 docker push 518643290370.dkr.ecr.us-west-2.amazonaws.com/drinkthedirt_backend:latest
```

Then deploy drinkthedirt_backend application in ECS. Capture the public IP address and attach it to the frontend.

### Modify the database

https://www.prisma.io/docs/concepts/components/prisma-migrate
