import React, { Component } from "react";
import { Button, Form, Table } from "react-bootstrap";
const API = "http://localhost:3000/api/contacts";

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contacts: [],
      id: null,
      name: "",
      mail: "",
      phone: "",
      address: "",
      valid: false,
      ordered: false,
    };
  }

  fetchContacts = () => {
    fetch(API)
      .then((response) => response.json())
      .then((contacts) => this.setState({ contacts }));
  };

  componentDidMount() {
    this.fetchContacts();
  }

  redraw = () => {
    let valid = this.state.valid;
    if (valid) {
      this.fetchContacts();
      console.log(this.state.contacts);
      fetch(API)
        .then((response) => response.json())
        .then((contacts) => this.setState({ contacts: contacts }));
      let contacts = this.state.contacts
      this.setState({ contacts: contacts });
      this.setState({ valid: false });
    }
  };
  addContact = () => {
    let name = this.state.name;
    let mail = this.state.mail;
    let phone = this.state.phone;
    let address = this.state.address;
    let id = this.state.contacts.length + 1;
    if (!name || !mail || !phone || !address) {
      alert("אחד מהשדות חסרים, בדקו שנית");
      return false;
    }
    if (mail.length < 6) {
      return alert('כתובת הדוא"ל קצרה מדי');
    }
    // this.state.valid = true;
    this.setState({ valid: true });
    const senData = `{"id":${id},"name":"${name}","mail":"${mail}","phone":"${phone}","address":"${address}"}`;
    const innerUpdate = { id: `${id}`, name: `${name}`, mail: `${mail}`, "phone": `${phone}`, "address": `${address}` };

    console.log(senData);

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: senData,
    };
    fetch(API, options)
      .then((response) => response.json())
      .then(() => alert(name + " הרשומה עודכנה, תודה "))
      .catch((err) => alert(err.message));

    let contacts = this.state.contacts
    contacts.push(innerUpdate)
    this.setState({ contacts: contacts });
    console.log("up", contacts)
    // this.redraw();
  };

  setFormParams = (event) => {
    let nam = event.target.name;
    let val = event.target.value;
    this.setState({ [nam]: val });
  };

  sortBy = key => {

    let ordered = this.state.ordered;
    let contacts = this.state.contacts;

    function compare(a, b) {
  // Use toUpperCase() to ignore character casing
  const keyA = a.key.toUpperCase();
  const keyB = b.key.toUpperCase();
console.log(keyA,keyB)
  let comparison = 0;
  if (keyA > keyB) {
    comparison = 1;
  } else if (keyA < keyB) {
    comparison = -1;
  }
  return comparison;
}

contacts.sort(compare);
    // if (!contacts) {
    //   return false;
    // }
    // if (!ordered) {

      
    //   contacts.sort(function (a, b) {
    //  console.log(a)
      
     
    //     return a < b ? -1 : a > b ? 1 : 0;
    //   });
     // this.redraw();
      this.setState({ ordered: true });
  //     return contacts;
  //   } else {
  //     contacts.reverse(function (a, b) {
  //       console.log(a.key)
  //       a = a.key
  //       b = b.key
  //       return a < b ? -1 : a > b ? 1 : 0;
  //     });
  //   //  this.redraw();
  //     this.setState({ ordered: false });
  //   }
  };

  sortById = () => {
    let ordered = this.state.ordered;
    let contacts = this.state.contacts;
    if (!ordered) {
      this.setState({ ordered: true });
      contacts.sort(function (b, a) {
        return a.id - b.id;
      });
    } else {
      contacts.reverse(function (b, a) {
        return a.id - b.id;
      });
      this.redraw();
      this.setState({ ordered: false });
    }
  };

  render() {
    return (
      <div className="Main container">
        <Form className="card col-6">
          <h4>הרשמה לשירות</h4>
          <Form.Group controlId="formBasicName">
            <Form.Label>שם</Form.Label>
            <Form.Control
              type="text"
              placeholder="השם שלכם"
              required
              name="name"
              onChange={this.setFormParams}
            />
          </Form.Group>
          <Form.Group controlId="formBasicPhone">
            <Form.Label>טלפון</Form.Label>
            <Form.Control
              type="text"
              placeholder="הטלפון שלכם "
              required
              name="phone"
              onChange={this.setFormParams}
            />
          </Form.Group>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>מייל</Form.Label>
            <Form.Control
              type="email"
              placeholder="כתובת המייל שלכם"
              name="mail"
              required
              pattern="/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/"
              onChange={this.setFormParams}
            />
            <Form.Text className="text-muted">לעולם לא נשתף אותה</Form.Text>
          </Form.Group>
          <Form.Group controlId="formBasicAddress">
            <Form.Label>כתובת</Form.Label>
            <Form.Control
              type="text"
              placeholder="כתובת"
              required
              name="address"
              onChange={this.setFormParams}
            />
          </Form.Group>

          <Button variant="primary" type="button" onClick={this.addContact}>
            שליחה
          </Button>
        </Form>
        <br />
        <Table striped bordered hover className="col-6">
          <thead>
            <tr>
              <th onClick={this.sortById}># </th>
              <th onClick={() => this.sortBy("name")} >שם</th>
              <th onClick={() => this.sortBy("phone")}>טלפון</th>
              <th onClick={() => this.sortBy("mail")}>מייל</th>
              <th onClick={() => this.sortBy("address")}>כתובת</th>
            </tr>
          </thead>
          <tbody>
            {this.state.contacts.map((c) => (
              <tr key={c.id}>
                <td>{c.id}</td>
                <td>{c.name}</td>
                <td>{c.mail}</td>
                <td>{c.phone}</td>
                <td>{c.address}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    );
  }
}
export default Main;






*-*-*-


  sortBy = key => {

    let ordered = this.state.ordered;
    let contacts = this.state.contacts;

    function compare(a, b) {
  // Use toUpperCase() to ignore character casing
  const keyA = a.key.toUpperCase();
  const keyB = b.key.toUpperCase();
console.log(keyA,keyB)
  let comparison = 0;
  if (keyA > keyB) {
    comparison = 1;
  } else if (keyA < keyB) {
    comparison = -1;
  }
  return comparison;
}

contacts.sort(compare);
    // if (!contacts) {
    //   return false;
    // }
    // if (!ordered) {

      
    //   contacts.sort(function (a, b) {
    //  console.log(a)
      
     
    //     return a < b ? -1 : a > b ? 1 : 0;
    //   });
     // this.redraw();
      this.setState({ ordered: true });
  //     return contacts;
  //   } else {
  //     contacts.reverse(function (a, b) {
  //       console.log(a.key)
  //       a = a.key
  //       b = b.key
  //       return a < b ? -1 : a > b ? 1 : 0;
  //     });
  //   //  this.redraw();
  //     this.setState({ ordered: false });
  //   }
  };
-*-*-*









https://www.sitepoint.com/sort-an-array-of-objects-in-javascript/


This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `yarn build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
# whiteweb3
