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

> Mutation query: Update client

```javascript
mutation {
  updateClient(
    id: "645296e76ae48d03cee51b62",
    email: "enggparveshtandon@gmail1.com",
    phone: "+91-9650780713"
  ) {
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

> Mutation query: Add Project

```javascript
mutation {
  addProject(
    name: "project one",
    description: "description one",
    status: NOT_STARTED,
    clientId: "644f4b42a9d98dcaff5d0fa4"
  ) {
    name
  }
}
```

```javascript
mutation {
 	deleteProject(id: "6450a3799eea5c480a001e3f") {
    id
  }
}
```

```javascript
  mutation {
  updateProject(
    id: "6451d3879eccb87ee473a44b",
    name: "project one updated",
    description: "project one updated",
    status: IN_PROGRESS
  ) {
    name
    description
    status
    client {
      name
      email
    }
  }
}

```