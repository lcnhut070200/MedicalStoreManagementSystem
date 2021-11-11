import React from "react";
import ApiHandler from "../utils/ApiHandler";

class EmployeeDetailsComponent extends React.Component {
  constructor(props) {
    super(props);
    this.formSubmit = this.formSubmit.bind(this);
    this.formSubmitSalary = this.formSubmitSalary.bind(this);
    this.formSubmitBank = this.formSubmitBank.bind(this);
  }

  state = {
    // Employee
    errorRes: false,
    errorMessage: "",
    btnMessage: 0,
    sendData: false,
    dataLoaded: false,
    employeeList: [],
    name: "",
    joining_date: "",
    phone: "",
    address: "",

    // Salary
    employeeSalaryList: [],
    errorResSalary: false,
    errorMessageSalary: "",
    btnMessageSalary: 0,
    sendDataSalary: false,

    // Employee Bank Account
    employeeBankList: [],
    errorResBank: false,
    errorMessageBank: "",
    btnMessageBank: 0,
    sendDataBank: false,
  };

  async formSubmit(e) {
    e.preventDefault();
    this.setState({ btnMessage: 1 });

    var apiHandler = new ApiHandler();
    var response = await apiHandler.editEmployee(
      e.target.name.value,
      e.target.joining_date.value,
      e.target.phone.value,
      e.target.address.value,
      this.props.match.params.id
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
    this.fetchEmployeeDataByID();
  }

  async fetchEmployeeDataByID() {
    this.updateDataAgain();
  }

  async formSubmitSalary(e) {
    e.preventDefault();
    this.setState({ btnMessageSalary: 1 });

    var apiHandler = new ApiHandler();
    var response = await apiHandler.saveEmpSalary(
      e.target.salary_date.value,
      e.target.salary_amount.value,
      this.props.match.params.id
    );

    console.log(response);
    this.setState({
      btnMessageSalary: 0,
      errorResSalary: response.data.error,
      errorMessageSalary: response.data.message,
      sendDataSalary: true,
    });
    this.updateDataAgain();
  }

  async formSubmitBank(e) {
    e.preventDefault();
    this.setState({ btnMessageBank: 1 });

    var apiHandler = new ApiHandler();
    var response = await apiHandler.saveEmpBank(
      e.target.bank_account_no.value,
      e.target.ifsc_no.value,
      this.props.match.params.id
    );
    console.log(response);
    this.setState({
      btnMessageBank: 0,
      errorResBank: response.data.error,
      errorMessageBank: response.data.message,
      sendDataBank: true,
    });
    this.updateDataAgain();
  }

  async updateDataAgain() {
    var apiHandler = new ApiHandler();
    var employeeData = await apiHandler.fetchEmployeeByID(
      this.props.match.params.id
    );

    var employeeSalary = await apiHandler.fetchEmpSalary(
      this.props.match.params.id
    );

    var employeeBank = await apiHandler.fetchEmpBank(
      this.props.match.params.id
    );

    console.log(employeeBank);

    this.setState({
      name: employeeData.data.data.name,
      joining_date: employeeData.data.data.joining_date,
      phone: employeeData.data.data.phone,
      address: employeeData.data.data.address,
      employeeSalaryList: employeeSalary.data,
      employeeBankList: employeeBank.data,
      dataLoaded: true,
    });
  }

  render() {
    return (
      <section className="content">
        <div className="container-fluid">
          <div className="block-header">
            <h2>EDIT EMPLOYEE #{this.props.match.params.id}</h2>
          </div>
          <div className="row clearfix">
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
              <div className="card">
                <div className="header">
                  <h2>EDIT EMPLOYEE</h2>
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
                              defaultValue={this.state.name}
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
                              defaultValue={this.state.joining_date}
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
                              defaultValue={this.state.phone}
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
                              defaultValue={this.state.address}
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
                        ? "Edit Employee"
                        : "Updating Employee please wait..."}
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

          {/* Add salary */}
          <div className="row clearfix">
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
              <div className="card">
                <div className="header">
                  <h2>ADD EMPLOYEE SALARY</h2>
                </div>
                <div className="body">
                  <form onSubmit={this.formSubmitSalary}>
                    <div className="row">
                      <div className="col-lg-6">
                        <label htmlFor="salary_date">Salary Date</label>
                        <div className="form-group">
                          <div className="form-line">
                            <input
                              type="date"
                              id="salary_date"
                              name="salary_date"
                              className="form-control"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <label htmlFor="salary_amount">Salary Amount</label>
                        <div className="form-group">
                          <div className="form-line">
                            <input
                              type="text"
                              id="salary_amount"
                              name="salary_amount"
                              className="form-control"
                              placeholder="Enter salary amount"
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="btn btn-primary m-t-15 waves-effect btn-block"
                      disabled={
                        this.state.btnMessageSalary === 0 ? false : true
                      }
                    >
                      {this.state.btnMessageSalary === 0
                        ? "Add Salary"
                        : "Adding Salary please wait..."}
                    </button>
                    <br />
                    {this.state.errorResSalary === false &&
                    this.state.sendDataSalary === true ? (
                      <div className="alert alert-success">
                        <strong>Success!</strong>{" "}
                        {this.state.errorMessageSalary}.
                      </div>
                    ) : (
                      ""
                    )}
                    {this.state.errorResSalary === true &&
                    this.state.sendDataSalary === true ? (
                      <div className="alert alert-danger">
                        <strong>Failed!</strong> {this.state.errorMessageSalary}
                        .
                      </div>
                    ) : (
                      ""
                    )}
                  </form>
                </div>
              </div>
            </div>
          </div>

          {/* Employee list*/}
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
                  <h2>EMPLOYEE SALARY</h2>
                </div>
                <div className="body table-responsive">
                  <table className="table table-hover">
                    <thead>
                      <tr>
                        <th>#ID</th>
                        <th>Salary Date</th>
                        <th>Salary Amount</th>
                        <th>Added on</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.employeeSalaryList.map((salary) => (
                        <tr key={salary.id}>
                          <td>{salary.id}</td>
                          <td>{salary.salary_date}</td>
                          <td>{salary.salary_amount}</td>
                          <td>{new Date(salary.added_on).toLocaleString()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          {/* Add employee bank account */}
          <div className="row clearfix">
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
              <div className="card">
                <div className="header">
                  <h2>ADD EMPLOYEE BANK</h2>
                </div>
                <div className="body">
                  <form onSubmit={this.formSubmitBank}>
                    <div className="row">
                      <div className="col-lg-6">
                        <label htmlFor="bank_account_no">
                          Bank Account No.
                        </label>
                        <div className="form-group">
                          <div className="form-line">
                            <input
                              type="text"
                              id="bank_account_no"
                              name="bank_account_no"
                              className="form-control"
                              placeholder="Enter bank account no"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <label htmlFor="ifsc_no">IFSC No.</label>
                        <div className="form-group">
                          <div className="form-line">
                            <input
                              type="text"
                              id="ifsc_no"
                              name="ifsc_no"
                              className="form-control"
                              placeholder="Enter bank account no"
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="btn btn-primary m-t-15 waves-effect btn-block"
                      disabled={this.state.btnMessageBank === 0 ? false : true}
                    >
                      {this.state.btnMessageBank === 0
                        ? "Add Employee Bank"
                        : "Adding Employee Bank please wait..."}
                    </button>
                    <br />
                    {this.state.errorResBank === false &&
                    this.state.sendDataBank === true ? (
                      <div className="alert alert-success">
                        <strong>Success!</strong> {this.state.errorMessageBank}.
                      </div>
                    ) : (
                      ""
                    )}
                    {this.state.errorResBank === true &&
                    this.state.sendDataBank === true ? (
                      <div className="alert alert-danger">
                        <strong>Failed!</strong> {this.state.errorMessageBank}.
                      </div>
                    ) : (
                      ""
                    )}
                  </form>
                </div>
              </div>
            </div>
          </div>

          {/* Employee bank list*/}
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
                  <h2>EMPLOYEE BANK ACCOUNT</h2>
                </div>
                <div className="body table-responsive">
                  <table className="table table-hover">
                    <thead>
                      <tr>
                        <th>#ID</th>
                        <th>Account No.</th>
                        <th>IFSC No.</th>
                        <th>Added on</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.employeeBankList.map((bankDetail) => (
                        <tr key={bankDetail.id}>
                          <td>{bankDetail.id}</td>
                          <td>{bankDetail.bank_account_no}</td>
                          <td>{bankDetail.ifsc_no}</td>
                          <td>
                            {new Date(bankDetail.added_on).toLocaleString()}
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
export default EmployeeDetailsComponent;
