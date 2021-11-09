import React from "react";
import ApiHandler from "../utils/ApiHandler";

class CompanyAccountComponent extends React.Component {
  constructor(props) {
    super(props);
    this.formSubmit = this.formSubmit.bind(this);
  }

  state = {
    errorRes: false,
    errorMessage: "",
    btnMessage: 0,
    sendData: false,
    companyAccountData: [],
    dataLoaded: false,
    companyList: [],
  };

  async formSubmit(e) {
    e.preventDefault();
    this.setState({ btnMessage: 1 });

    var apiHandler = new ApiHandler();
    var response = await apiHandler.saveCompanyTransactionData(
      e.target.company_id.value,
      e.target.transaction_type.value,
      e.target.transaction_amt.value,
      e.target.transaction_date.value,
      e.target.payment_mode.value
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
    this.fetchComanyAccountData();
  }

  async fetchComanyAccountData() {
    var apiHandler = new ApiHandler();
    var companyData = await apiHandler.fetchCompanyOnly();
    this.updateDataAgain();
    this.setState({
      companyList: companyData.data,
      dataLoaded: true,
    });
  }

  async updateDataAgain() {
    var apiHandler = new ApiHandler();
    var companyAccountData = await apiHandler.fetchAllCompanyAccount();
    this.setState({
      companyAccountData: companyAccountData.data.data,
    });
  }

  viewCompanyDetails = (company_id) => {
    console.log(company_id);
    console.log(this.props);
    this.props.history.push(`/companydetails/${company_id}`);
  };

  render() {
    return (
      <section className="content">
        <div className="container-fluid">
          <div className="block-header">
            <h2>MANAGE COMPANY ACCOUNT</h2>
          </div>
          <div className="row clearfix">
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
              <div className="card">
                <div className="header">
                  <h2>ADD COMPANY ACCOUNT</h2>
                </div>
                <div className="body">
                  <form onSubmit={this.formSubmit}>
                    <div className="row">
                      <div className="col-lg-4">
                        <label htmlFor="company">Company</label>
                        <div className="form-group">
                          <div className="form-line">
                            <select
                              className="form-control show-tick"
                              name="company_id"
                              id="company_id"
                            >
                              {this.state.companyList.map((item) => (
                                <option key={item.id} value={item.id}>
                                  {item.name}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-4">
                        <label htmlFor="transaction_type">
                          Transaction type
                        </label>
                        <div className="form-group">
                          <div className="form-line">
                            <select
                              id="transaction_type"
                              name="transaction_type"
                              className="form-control"
                            >
                              <option value="1">Debit</option>
                              <option value="2">Credit</option>
                            </select>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-4">
                        <label htmlFor="transaction_amt">Amount</label>
                        <div className="form-group">
                          <div className="form-line">
                            <input
                              type="text"
                              id="transaction_amt"
                              name="transaction_amt"
                              className="form-control"
                              placeholder="Enter amount"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-lg-4">
                        <label htmlFor="transaction_date">
                          Transaction Date
                        </label>
                        <div className="form-group">
                          <div className="form-line">
                            <input
                              type="date"
                              id="transaction_date"
                              name="transaction_date"
                              className="form-control"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-4">
                        <label htmlFor="payment_mode">Payment mode</label>
                        <div className="form-group">
                          <div className="form-line">
                            <input
                              type="text"
                              id="payment_mode"
                              name="payment_mode"
                              className="form-control"
                              placeholder="Enter payment mode"
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
                        ? "Add Company Transaction"
                        : "Adding Company Transaction please wait..."}
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
                  <h2>ALL COMPANIES ACCOUNT TRANSACTIONS</h2>
                </div>
                <div className="body table-responsive">
                  <table className="table table-hover">
                    <thead>
                      <tr>
                        <th>#ID</th>
                        <th>Company Name</th>
                        <th>Company ID</th>
                        <th>Transaction Type</th>
                        <th>Amount</th>
                        <th>Date</th>
                        <th>Payment Mode</th>
                        <th>Added on</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.companyAccountData.map((companyaccount) => (
                        <tr key={companyaccount.id}>
                          <td>{companyaccount.id}</td>
                          <td>{companyaccount.company.name}</td>
                          <td>{companyaccount.company.id}</td>
                          <td>
                            {companyaccount.transaction_type == 1
                              ? "Debit"
                              : "Credit"}
                          </td>
                          <td>{companyaccount.transaction_amt}</td>
                          <td>{companyaccount.transaction_date}</td>
                          <td>{companyaccount.payment_mode}</td>
                          <td>
                            {new Date(companyaccount.added_on).toLocaleString()}
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
export default CompanyAccountComponent;
