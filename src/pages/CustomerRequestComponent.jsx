import React from "react";
import ApiHandler from "../utils/ApiHandler";

class CustomerRequestComponent extends React.Component {
  constructor(props) {
    super(props);
    this.formSubmit = this.formSubmit.bind(this);
    this.formRef = React.createRef();
  }

  state = {
    errorRes: false,
    errorMessage: "",
    btnMessage: 0,
    sendData: false,
    customerRequestDataList: [],
    dataLoaded: false,
  };

  async formSubmit(e) {
    e.preventDefault();
    this.setState({ btnMessage: 1 });

    var apiHandler = new ApiHandler();
    var response = await apiHandler.saveCustomerRequest(
      e.target.customer_name.value,
      e.target.phone.value,
      e.target.medicine_details.value
    );

    console.log(response);
    this.setState({
      btnMessage: 0,
      errorRes: response.data.error,
      errorMessage: response.data.message,
      sendData: true,
    });
    this.updateDataAgain();
    this.formRef.current.reset();
  }

  // This method work when our page is ready
  componentDidMount() {
    this.fetchCustomerRequestData();
  }

  async fetchCustomerRequestData() {
    this.updateDataAgain();
  }

  async completeCustomerRequest(
    cus_request_id,
    customer_name,
    phone,
    medicine_details
  ) {
    console.log(cus_request_id);
    var apiHandler = new ApiHandler();
    var customerRequestData = await apiHandler.updateCustomerRequest(
      cus_request_id,
      customer_name,
      phone,
      medicine_details
    );
    console.log(customerRequestData);
    this.updateDataAgain();
  }

  async updateDataAgain() {
    var apiHandler = new ApiHandler();
    var customerRequestData = await apiHandler.fetchCustomerRequest();
    console.log(customerRequestData);
    this.setState({
      customerRequestDataList: customerRequestData.data.data,
      dataLoaded: true,
    });
  }

  render() {
    return (
      <section className="content">
        <div className="container-fluid">
          <div className="block-header">
            <h2>MANAGE CUSTOMER REQUEST</h2>
          </div>
          <div className="row clearfix">
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
              <div className="card">
                <div className="header">
                  <h2>ADD CUSTOMER REQUEST</h2>
                </div>
                <div className="body">
                  <form onSubmit={this.formSubmit} ref={this.formRef}>
                    <label htmlFor="customer_name">Customer Name</label>
                    <div className="form-group">
                      <div className="form-line">
                        <input
                          type="text"
                          id="customer_name"
                          name="customer_name"
                          className="form-control"
                          placeholder="Enter customer name"
                        />
                      </div>
                    </div>
                    <label htmlFor="phone">Phone No</label>
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
                    <label htmlFor="medicine_details">Medicine Details</label>
                    <div className="form-group">
                      <div className="form-line">
                        <input
                          type="text"
                          id="medicine_details"
                          name="medicine_details"
                          className="form-control"
                          placeholder="Enter medicine details"
                        />
                      </div>
                    </div>
                    <button
                      type="submit"
                      className="btn btn-primary m-t-15 waves-effect btn-block"
                      disabled={this.state.btnMessage === 0 ? false : true}
                    >
                      {this.state.btnMessage === 0
                        ? "Add Customer Request"
                        : "Adding Customer Request please wait..."}
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
                  <h2>ALL CUSTOMER REQUEST</h2>
                </div>
                <div className="body table-responsive">
                  <table className="table table-hover">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Phone</th>
                        <th>Medicine Details</th>
                        <th>Status</th>
                        <th>Added on</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.customerRequestDataList.map((item) => (
                        <tr key={item.id}>
                          <td>{item.id}</td>
                          <td>{item.customer_name}</td>
                          <td>{item.phone}</td>
                          <td>{item.medicine_details}</td>
                          <td>{item.status == 0 ? "Pending" : "Completed"}</td>
                          <td>{new Date(item.added_on).toLocaleString()}</td>
                          <td>
                            {item.status == 0 ? (
                              <button
                                className="btn btn-block btn-warning"
                                onClick={() =>
                                  this.completeCustomerRequest(
                                    item.id,
                                    item.customer_name,
                                    item.phone,
                                    item.medicine_details
                                  )
                                }
                              >
                                Complete
                              </button>
                            ) : (
                              <button className="btn btn-block btn-success">
                                COMPLETED
                              </button>
                            )}
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
export default CustomerRequestComponent;
