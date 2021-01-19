import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import EmployeeList from "./Emplist";

class Search extends React.Component {
  state = {
    employees: [],
    employeeArray: [],
    filteredEmployees: [],
    search: "",
    sort: "",
  };

  componentDidMount() {
    this.getEmployees();
  }

  async getEmployees() {
    await fetch("https://randomuser.me/api/?results=20&nat=us")
      .then((data) => data.json())
      .then((data) =>
        this.setState({
          employees: data.results,
        })
      );
  }

  sortEmployeeName = (e) => {
    e.preventDefault();

    // take current state
    let { employees, sort, employeeArray } = this.state;

    // if array is not sorted, sort by name
    !sort
      ? (employeeArray = employees.sort((a, b) =>
          a.name.first > b.name.first ? 1 : -1
        ))
      : (employeeArray = employees.reverse());

    // new state with sorted data
    this.setState({ employees: employeeArray, sort: !sort });
  };

  handleSearchQuery = (e) => {
    console.log(e.target.value);
    const filter = e.target.value;
    const filterList = this.state.employees.filter((input) => {
      let values = Object.values(input).join("").toLowerCase();
      return values.indexOf(filter.toLowerCase()) !== -1;
    });

    this.setState({ filteredEmployees: filterList });
  };

  render() {
    console.log(this.state);
    return (
      <div className="Search">
        <Navbar bg="dark" variant="dark">
          <Navbar.Brand href="#home">Employee Directory</Navbar.Brand>
          <Nav className="mr-auto"></Nav>
          <Form inline>
            <Form.Control
              // value={this.state.search}
              type="text"
              placeholder="Search for Employee"
              name="search"
              onChange={(e) => this.handleSearchQuery(e)}
            />
            <Button variant="outline-light">Search</Button>
          </Form>
        </Navbar>
        <EmployeeList list={this.state.filteredEmployees} />
      </div>
    );
  }
}

export default Search;
