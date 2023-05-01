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

> Project Query includes client data
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

> Mutation query: Add client

```javascript
mutation {
 	addClient(name: "parvesh", email: "mistertandon@gmail.com", phone: "+91-9650780712"){
    id
    name
    email
    phone    
  }
}
```

> Mutation query: Delete client

```javascript
mutation {
 	deleteClient(id: "644f6b1f1051adb9aad5a6a2"){
    name
    email
    phone
  }
}

```