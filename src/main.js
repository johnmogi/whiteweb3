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

  componentDidMount() {
    fetch(API)
      .then((response) => response.json())
      .then((contacts) => this.setState({ contacts }));
  }

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
    const innerUpdate = {
      id: `${id}`,
      name: `${name}`,
      mail: `${mail}`,
      phone: `${phone}`,
      address: `${address}`,
    };
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
    // manual push into state:
    let contacts = this.state.contacts;
    contacts.push(innerUpdate);
    this.setState({ contacts: contacts });
  };

  setFormParams = (event) => {
    let nam = event.target.name;
    let val = event.target.value;
    this.setState({ [nam]: val });
  };

  sortBy = (key) => {
    let ordered = this.state.ordered;
    let contacts = this.state.contacts;
    // a bit complex code since key deosn't inherit value in inner scope object sort
    switch (key) {
      case (key = "id"):
        if (!ordered) {
          this.setState({ ordered: true });
          contacts.sort(function (b, a) {
            return a.id - b.id;
          });
        } else {
          this.setState({ ordered: false });
          contacts.sort(function (a, b) {
            return a.id - b.id;
          });
        }
        break;
      case (key = "name"):
        if (!ordered) {
          this.setState({ ordered: true });
          contacts.sort(function (a, b) {
            a = a.name.toUpperCase();
            b = b.name.toUpperCase();
            return a < b ? -1 : a > b ? 1 : 0;
          });
          break;
        } else {
          this.setState({ ordered: false });
          contacts.reverse(function (a, b) {
            a = a.name.toUpperCase();
            b = b.name.toUpperCase();
            return a < b ? -1 : a > b ? 1 : 0;
          });
          break;
        }
        case (key = "phone"):
          if (!ordered) {
            this.setState({ ordered: true });
            contacts.sort(function (a, b) {
              a = a.phone.toUpperCase();
              b = b.phone.toUpperCase();
              return a < b ? -1 : a > b ? 1 : 0;
            });
            break;
          } else {
            this.setState({ ordered: false });
            contacts.reverse(function (a, b) {
              a = a.phone.toUpperCase();
              b = b.phone.toUpperCase();
              return a < b ? -1 : a > b ? 1 : 0;
            });
            break;
          }
          case (key = "mail"):
            if (!ordered) {
              this.setState({ ordered: true });
              contacts.sort(function (a, b) {
                a = a.mail.toUpperCase();
                b = b.mail.toUpperCase();
                return a < b ? -1 : a > b ? 1 : 0;
              });
              break;
            } else {
              this.setState({ ordered: false });
              contacts.reverse(function (a, b) {
                a = a.mail.toUpperCase();
                b = b.mail.toUpperCase();
                return a < b ? -1 : a > b ? 1 : 0;
              });
              break;
            }
            case (key = "address"):
              if (!ordered) {
                this.setState({ ordered: true });
                contacts.sort(function (a, b) {
                  a = a.address.toUpperCase();
                  b = b.address.toUpperCase();
                  return a < b ? -1 : a > b ? 1 : 0;
                });
                break;
              } else {
                this.setState({ ordered: false });
                contacts.reverse(function (a, b) {
                  a = a.address.toUpperCase();
                  b = b.address.toUpperCase();
                  return a < b ? -1 : a > b ? 1 : 0;
                });
                break;
              }
      default:
    }
    this.setState({ contacts: contacts });
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
              <th onClick={() => this.sortBy("id")}># </th>
              <th onClick={() => this.sortBy("name")}>שם</th>
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
