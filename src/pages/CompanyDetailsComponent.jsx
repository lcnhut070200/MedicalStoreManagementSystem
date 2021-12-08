import React from "react";
import ApiHandler from "../utils/ApiHandler";

class CompanyDetailsComponent extends React.Component {
  constructor(props) {
    super(props);
    this.formSubmit = this.formSubmit.bind(this);
    console.log(props.match.params.id);
  }

  state = {
    errorRes: false,
    errorMessage: "",
    btnMessage: 0,
    sendData: false,
    companyBank: [],
    name: "",
    license_no: "",
    address: "",
    contact_no: "",
    email: "",
    description: "",
    dataLoaded: false,
  };

  async formSubmit(e) {
    e.preventDefault();
    this.setState({ btnMessage: 1 });

    var apiHandler = new ApiHandler();
    var response = await apiHandler.editCompanyData(
      e.target.name.value,
      e.target.license_no.value,
      e.target.address.value,
      e.target.contact_no.value,
      e.target.email.value,
      e.target.description.value,
      this.props.match.params.id
    );

    console.log(response);
    this.setState({
      btnMessage: 0,
      errorRes: response.data.error,
      errorMessage: response.data.message,
      sendData: true,
    });
  }

  // This method work when our page is ready
  componentDidMount() {
    this.fetchComanyData();
  }

  async fetchComanyData() {
    var apiHandler = new ApiHandler();
    var companyData = await apiHandler.fetchCompanyDetails(
      this.props.match.params.id
    );
    console.log("data >>> ", companyData);
    this.setState({
      companyBank: companyData.data.data.company_bank,
      name: companyData.data.data.name,
      license_no: companyData.data.data.license_no,
      address: companyData.data.data.address,
      contact_no: companyData.data.data.contact_no,
      email: companyData.data.data.email,
      description: companyData.data.data.description,
    });
    this.setState({
      dataLoaded: true,
    });
  }

  AddCompanyBank = () => {
    this.props.history.push(`/addCompanyBank/${this.props.match.params.id}`);
  };

  EditCompanyBank = (company_bank_id) => {
    this.props.history.push(
      `/editCompanyBank/${this.props.match.params.id}/${company_bank_id}`
    );
  };

  async deleteCompanyBank(company_bank_id) {
    var apiHandler = new ApiHandler();
    var response = await apiHandler.deleteCompanyBank(company_bank_id);
    this.fetchComanyData();
  }

  render() {
    return (
      <section className="content">
        <div className="container-fluid">
          <div className="block-header">
            <h2>MANAGE COMPANY</h2>
          </div>
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
                  <h2>EDIT Company</h2>
                </div>
                <div className="body">
                  <form onSubmit={this.formSubmit}>
                    <label htmlFor="email_address">Name</label>
                    <div className="form-group">
                      <div className="form-line">
                        <input
                          type="text"
                          id="name"
                          name="name"
                          className="form-control"
                          placeholder="Enter Company Name"
                          defaultValue={this.state.name}
                        />
                      </div>
                    </div>
                    <label htmlFor="email_address">License No.</label>
                    <div className="form-group">
                      <div className="form-line">
                        <input
                          type="text"
                          id="license_no"
                          name="license_no"
                          className="form-control"
                          placeholder="Enter License No."
                          defaultValue={this.state.license_no}
                        />
                      </div>
                    </div>
                    <label htmlFor="email_address">Address</label>
                    <div className="form-group">
                      <div className="form-line">
                        <input
                          type="text"
                          id="address"
                          name="address"
                          className="form-control"
                          placeholder="Enter Company Address"
                          defaultValue={this.state.address}
                        />
                      </div>
                    </div>
                    <label htmlFor="email_address">Contact No.</label>
                    <div className="form-group">
                      <div className="form-line">
                        <input
                          type="text"
                          id="contact_no"
                          name="contact_no"
                          className="form-control"
                          placeholder="Enter Contact No."
                          defaultValue={this.state.contact_no}
                        />
                      </div>
                    </div>
                    <label htmlFor="email_address">Email</label>
                    <div className="form-group">
                      <div className="form-line">
                        <input
                          type="text"
                          id="email"
                          name="email"
                          className="form-control"
                          placeholder="Enter Company Email"
                          defaultValue={this.state.email}
                        />
                      </div>
                    </div>
                    <label htmlFor="email_address">Description</label>
                    <div className="form-group">
                      <div className="form-line">
                        <input
                          type="text"
                          id="description"
                          name="description"
                          className="form-control"
                          placeholder="Enter Description"
                          defaultValue={this.state.description}
                        />
                      </div>
                    </div>
                    <button
                      type="submit"
                      className="btn btn-primary m-t-15 waves-effect btn-block"
                      disabled={this.state.btnMessage == 0 ? false : true}
                    >
                      {this.state.btnMessage == 0
                        ? "Edit Company"
                        : "Editing Company Please Wait.."}
                    </button>
                    <br />
                    {this.state.errorRes == false &&
                    this.state.sendData == true ? (
                      <div className="alert alert-success">
                        <strong>Success!</strong> {this.state.errorMessage}.
                      </div>
                    ) : (
                      ""
                    )}
                    {this.state.errorRes == true &&
                    this.state.sendData == true ? (
                      <div className="alert alert-danger">
                        <strong>Failed!</strong>
                        {this.state.errorMessage}.
                      </div>
                    ) : (
                      ""
                    )}
                  </form>
                </div>
              </div>
            </div>
          </div>
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
                  <h2>Company Bank</h2>
                  <div className="header-dropdown m-r--5">
                    <button
                      className="btn btn-info"
                      onClick={this.AddCompanyBank}
                    >
                      Add Company
                    </button>
                  </div>
                </div>
                <div className="body table-responsive">
                  <table className="table table-hover">
                    <thead>
                      <tr>
                        <th>#ID</th>
                        <th>Account No.</th>
                        <th>SWIFT Code</th>
                        <th>Added On</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.companyBank.map((company) => (
                        <tr key={company.id}>
                          <td>{company.id}</td>
                          <td>{company.bank_account_no}</td>
                          <td>{company.swift_no}</td>
                          <td>{new Date(company.added_on).toLocaleString()}</td>
                          <td>
                            <button
                              className="btn btn-block btn-warning"
                              onClick={() => this.EditCompanyBank(company.id)}
                            >
                              EDIT
                            </button>
                            <button
                              className="btn btn-block btn-danger"
                              onClick={() => this.deleteCompanyBank(company.id)}
                            >
                              DELETE
                            </button>
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

export default CompanyDetailsComponent;
