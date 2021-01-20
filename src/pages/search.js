import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import EmployeeList from "../pages/Emplist";

class Search extends React.Component {
  state = {
    employees: [],
    empArray: [],
    searchEmp: [],
    search: "",
    sort: "",
  };

  componentDidMount() {
    this.getEmployees();
  }

  async getEmployees() {
     fetch("https://randomuser.me/api/?results=20&nat=us")
      .then((data) => data.json())
      .then((data) =>
        this.setState({
          employees: data.results,
        })
      );
  }

  sortEmployeeName = (e) => {
    e.preventDefault();

    let { employees, sort, empArray } = this.state;

    !sort
      ? (empArray = employees.sort((a, b) =>
          a.name.first > b.name.first ? 1 : -1
        ))
      : (empArray = employees.reverse());

    this.setState({ employees: empArray, sort: !sort });
  };

  handleSearchQuery = (e) => {
    console.log(e.target.value);
    const filter = e.target.value;
    const filterList = this.state.employees.filter((input) => {
      let values = Object.values(input).join("").toLowerCase();
      return values.indexOf(filter.toLowerCase()) !== -1;
    });

    this.setState({ searchEmp: filterList });
  };

  render() {
    console.log(this.state);
    return (
      <div className="Search">
        <Navbar>
          <Navbar.Brand href="#home">Employee Directory</Navbar.Brand>
          <Nav className="mr-auto"></Nav>
          <Form inline>
            <Form.Control
              type="text"
              placeholder="Search for Employee"
              name="search"
              onChange={(e) => this.handleSearchQuery(e)}
            />
            <Button>Search</Button>
          </Form>
        </Navbar>
        <EmployeeList list={this.state.searchEmp} />
      </div>
    );
  }
}

export default Search;
