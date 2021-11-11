import React from "react";
import ApiHandler from "../utils/ApiHandler";

class EmployeeComponent extends React.Component {
  constructor(props) {
    super(props);
    this.formSubmit = this.formSubmit.bind(this);
  }

  state = {
    errorRes: false,
    errorMessage: "",
    btnMessage: 0,
    sendData: false,
    dataLoaded: false,
    employeeList: [],
  };

  async formSubmit(e) {
    e.preventDefault();
    this.setState({ btnMessage: 1 });

    var apiHandler = new ApiHandler();
    var response = await apiHandler.saveEmployee(
      e.target.name.value,
      e.target.joining_date.value,
      e.target.phone.value,
      e.target.address.value
    );

    console.log(response);
    this.setState({
      btnMessage: 0,
      errorRes: response.data.error,
      errorMessage: response.data.message,
      sendData: true,
    });
    this.updateDataAgain();
  }

  // This method work when our page is ready
  componentDidMount() {
    this.fetchEmployeeData();
  }

  async fetchEmployeeData() {
    this.updateDataAgain();
  }

  async updateDataAgain() {
    var apiHandler = new ApiHandler();
    var employeeData = await apiHandler.fetchAllEmployee();
    this.setState({
      employeeList: employeeData.data.data,
      dataLoaded: true,
    });
  }

  render() {
    return (
      <section className="content">
        <div className="container-fluid">
          <div className="block-header">
            <h2>MANAGE EMPLOYEE</h2>
          </div>
          <div className="row clearfix">
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
              <div className="card">
                <div className="header">
                  <h2>ADD EMPLOYEE</h2>
                </div>
                <div className="body">
                  <form onSubmit={this.formSubmit}>
                    <div className="row">
                      <div className="col-lg-6">
                        <label htmlFor="name">Name</label>
                        <div className="form-group">
                          <div className="form-line">
                            <input
                              type="text"
                              id="name"
                              name="name"
                              className="form-control"
                              placeholder="Enter name"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <label htmlFor="joining_date">Joining date</label>
                        <div className="form-group">
                          <div className="form-line">
                            <input
                              type="date"
                              id="joining_date"
                              name="joining_date"
                              className="form-control"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-lg-6">
                        <label htmlFor="phone">Phone No.</label>
                        <div className="form-group">
                          <div className="form-line">
                            <input
                              type="text"
                              id="phone"
                              name="phone"
                              className="form-control"
                              placeholder="Enter phone number"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <label htmlFor="address">Address</label>
                        <div className="form-group">
                          <div className="form-line">
                            <input
                              type="text"
                              id="address"
                              name="address"
                              className="form-control"
                              placeholder="Enter amount"
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="btn btn-primary m-t-15 waves-effect btn-block"
                      disabled={this.state.btnMessage === 0 ? false : true}
                    >
                      {this.state.btnMessage === 0
                        ? "Add Employee"
                        : "Adding Employee please wait..."}
                    </button>
                    <br />
                    {this.state.errorRes === false &&
                    this.state.sendData === true ? (
                      <div className="alert alert-success">
                        <strong>Success!</strong> {this.state.errorMessage}.
                      </div>
                    ) : (
                      ""
                    )}
                    {this.state.errorRes === true &&
                    this.state.sendData === true ? (
                      <div className="alert alert-danger">
                        <strong>Failed!</strong> {this.state.errorMessage}.
                      </div>
                    ) : (
                      ""
                    )}
                  </form>
                </div>
              </div>
            </div>
          </div>

          {/* Table  */}
          <div className="row clearfix">
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
              <div className="card">
                <div className="header">
                  {this.state.dataLoaded === false ? (
                    <div className="text-center">
                      <div class="preloader pl-size-xl">
                        <div class="spinner-layer">
                          <div class="circle-clipper left">
                            <div class="circle"></div>
                          </div>
                          <div class="circle-clipper right">
                            <div class="circle"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
                  <h2>ALL EMPLOYEES</h2>
                </div>
                <div className="body table-responsive">
                  <table className="table table-hover">
                    <thead>
                      <tr>
                        <th>#ID</th>
                        <th>Name</th>
                        <th>Joining Date</th>
                        <th>Phone No.</th>
                        <th>Address</th>
                        <th>Added on</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.employeeList.map((employee) => (
                        <tr key={employee.id}>
                          <td>{employee.id}</td>
                          <td>{employee.name}</td>
                          <td>{employee.joining_date}</td>
                          <td>{employee.phone}</td>
                          <td>{employee.address}</td>
                          <td>
                            {new Date(employee.added_on).toLocaleString()}
                          </td>
                          <td>
                            <button className="btn btn-warning">View</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}
export default EmployeeComponent;
