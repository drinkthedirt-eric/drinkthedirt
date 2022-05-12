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

1. Go to the ECS console and go to "Task Definitions"
2. Select "deploy_drinkthedirt_2" (NOT _3) and select "Create New Revision"
3. Keep all of the same settings and click through. This will automatically select the latest Docker image you pushed.
4. Go to the "Clusters" section.
5. Select the service and click "Update".
6. Make sure the newest revision is selected, keep all of the same settings, and click "Skip to review".
7. Click update service.
8. Monitor the deployment to make sure it's all good. 

### Modify the database

https://www.prisma.io/docs/concepts/components/prisma-migrate
