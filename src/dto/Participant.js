export default class Participant {

  id = null;
  name = "";
  email = "";
  phone = "";
  edit = false;

  constructor(id, name, email, phone) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.phone = phone;
  }

}