import React from "react";
import { Link } from "react-router-dom";
import ApiHandler from "../utils/ApiHandler";

class CompanyEditBankComponent extends React.Component {
  constructor(props) {
    super(props);
    this.formSubmit = this.formSubmit.bind(this);
  }

  state = {
    errorRes: false,
    errorMessage: "",
    btnMessage: 0,
    sendData: false,
    bank_account_no: "",
    ifsc_no: "",
  };

  async formSubmit(e) {
    e.preventDefault();
    this.setState({ btnMessage: 1 });

    var apiHandler = new ApiHandler();
    var response = await apiHandler.editCompanyBankData(
      e.target.bank_account_no.value,
      e.target.ifsc_no.value,
      this.props.match.params.company_id,
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
    this.fetchComanyBankData();
  }

  async fetchComanyBankData() {
    var apiHandler = new ApiHandler();
    var companyData = await apiHandler.fetchCompanyBankDetails(
      this.props.match.params.id
    );
    console.log("data >>> ", companyData);
    this.setState({
      bank_account_no: companyData.data.data.bank_account_no,
      ifsc_no: companyData.data.data.ifsc_no,
    });
    this.setState({
      dataLoaded: true,
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
                  <h2>EDIT COMPANY BANK #{this.props.match.params.id}</h2>
                </div>
                <div className="body">
                  <form onSubmit={this.formSubmit}>
                    <label htmlFor="bank_account_no">Account No</label>
                    <div className="form-group">
                      <div className="form-line">
                        <input
                          type="text"
                          id="bank_account_no"
                          name="bank_account_no"
                          className="form-control"
                          placeholder="Enter Account No"
                          defaultValue={this.state.bank_account_no}
                        />
                      </div>
                    </div>
                    <label htmlFor="ifsc_no">IFSC No</label>
                    <div className="form-group">
                      <div className="form-line">
                        <input
                          type="text"
                          id="ifsc_no"
                          name="ifsc_no"
                          className="form-control"
                          placeholder="Enter ifsc no"
                          defaultValue={this.state.ifsc_no}
                        />
                      </div>
                    </div>
                    <button
                      type="submit"
                      className="btn btn-primary m-t-15 waves-effect btn-block"
                      disabled={this.state.btnMessage === 0 ? false : true}
                    >
                      {this.state.btnMessage === 0
                        ? "Edit Company Bank"
                        : "Updating Company Bank please wait..."}
                    </button>
                    <br />
                    {this.state.errorRes === false &&
                    this.state.sendData === true ? (
                      <div className="alert alert-success">
                        <strong>Success!</strong> {this.state.errorMessage}.
                        <Link
                          to={`/companydetails/${this.props.match.params.company_id}`}
                          className="btn btn-info"
                        >
                          Back to company details
                        </Link>
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
        </div>
      </section>
    );
  }
}
export default CompanyEditBankComponent;
