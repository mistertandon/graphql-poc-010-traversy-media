npm install express express-graphql graphql mongoose cors colors --save
npm install  nodemon dotenv --save-dev

> Client Query
```javascript
{
  client(id: "1") {
    id
    name
    email
    phone
  }
}
```

> Client List Query
```javascript
{
  clients {
    id
    name
    email
    phone
  }
}
```

> Project Query
```javascript
{
  project(id: "1") {
    id
    name
    description
  }
}

```

> Project List Query
```javascript
{
  projects{
    id
    name
    description
  }
}
```

> > Project Query includes client data
```javascript
{
  projects{
    id
    name
    description
    client {
    	name
  	}
  }
}

```