import React from "react";
import ApiHandler from "../utils/ApiHandler";

class CompanyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.formSubmit = this.formSubmit.bind(this);
  }

  state = {
    errorRes: false,
    errorMessage: "",
    btnMessage: 0,
    sendData: false,
  };

  async formSubmit(e) {
    e.preventDefault();
    this.setState({ btnMessage: 1 });

    var apiHandler = new ApiHandler();
    var response = await apiHandler.saveCompanyData(
      e.target.name.value,
      e.target.license_no.value,
      e.target.address.value,
      e.target.contact.value,
      e.target.email.value,
      e.target.description.value
    );

    console.log(response);
    this.setState({
      btnMessage: 0,
    });
    this.setState({
      errorRes: response.data.error,
    });
    this.setState({
      errorMessage: response.data.message,
    });
    this.setState({
      sendData: true,
    });
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
                  <h2>ADD COMPANY</h2>
                </div>
                <div className="body">
                  <form onSubmit={this.formSubmit}>
                    <label htmlFor="name">Name</label>
                    <div className="form-group">
                      <div className="form-line">
                        <input
                          type="text"
                          id="name"
                          name="name"
                          className="form-control"
                          placeholder="Enter company name"
                        />
                      </div>
                    </div>
                    <label htmlFor="license_no">License No</label>
                    <div className="form-group">
                      <div className="form-line">
                        <input
                          type="text"
                          id="license_no"
                          name="license_no"
                          className="form-control"
                          placeholder="Enter company license number"
                        />
                      </div>
                    </div>
                    <label htmlFor="address">Address</label>
                    <div className="form-group">
                      <div className="form-line">
                        <input
                          type="text"
                          id="address"
                          name="address"
                          className="form-control"
                          placeholder="Enter company address"
                        />
                      </div>
                    </div>
                    <label htmlFor="contact">Contact no</label>
                    <div className="form-group">
                      <div className="form-line">
                        <input
                          type="text"
                          id="contact"
                          name="contact"
                          className="form-control"
                          placeholder="Enter company contact number"
                        />
                      </div>
                    </div>
                    <label htmlFor="email">Email</label>
                    <div className="form-group">
                      <div className="form-line">
                        <input
                          type="text"
                          id="email"
                          name="email"
                          className="form-control"
                          placeholder="Enter company email"
                        />
                      </div>
                    </div>
                    <label htmlFor="description">Description</label>
                    <div className="form-group">
                      <div className="form-line">
                        <input
                          type="text"
                          id="description"
                          name="description"
                          className="form-control"
                          placeholder="Enter description"
                        />
                      </div>
                    </div>
                    <br />
                    <button
                      type="submit"
                      className="btn btn-primary m-t-15 waves-effect btn-block"
                      disabled={this.state.btnMessage == 0 ? false : true}
                    >
                      {this.state.btnMessage == 0
                        ? "Add Company"
                        : "Adding Company please wait..."}
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
        </div>
      </section>
    );
  }
}
export default CompanyComponent;
